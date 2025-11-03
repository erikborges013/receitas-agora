import type ICategoria from "@/interfaces/ICategoria";
// Importe sua NOVA interface
import type ReceitasDaIa from "@/interfaces/ReceitasDaIa";
import Groq from "groq-sdk";
import { createApi } from "unsplash-js";

// Imagem de fallback caso Unsplash falhe
const IMAGEM_FALLBACK = "panqueca.png";

// Interface para o que o Groq vai nos retornar (sem imagem)
type GroqReceita = {
  nome: string;
  ingredientes: string[];
  Receita: string; // Seu novo campo
};

// REMOVA O 'export' da classe
class buscarEmApi {
  public groq: Groq;
  private unsplash: any;

  constructor() {
    // Clientes são inicializados AQUI, no construtor
    this.groq = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    this.unsplash = createApi({
      accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    });
  }

  async obterCategorias() {
    const resposta = await fetch("./ingredientes.json");
    const categorias: ICategoria[] = await resposta.json();
    return categorias;
  }

  async obterReceitas(ingredientes: string[]): Promise<ReceitasDaIa[]> {
    const ingredientesFormatados = ingredientes.join(", ");

    // Prompt APRIMORADO para funcionar com 'json_object' e seu novo campo 'Receita'
    const systemPrompt = `
      Você é um assistente de culinária.
      Responda APENAS com um objeto JSON com a chave "receitas".
      O formato deve ser:
      {
        "receitas": [
          { 
            "nome": "Nome da Receita", 
            "ingredientes": ["ingrediente1", "ingrediente2"], 
            "Receita": "O passo-a-passo completo da receita aqui." 
          }
        ]
      }
      Gere 2 a 3 receitas que usem PRINCIPALMENTE os ingredientes fornecidos.
    `;

    try {
      // --- PASSO 1: Obter receitas do Groq (usando 'this.groq') ---
      const completion = await this.groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Gere receitas usando estes ingredientes: ${ingredientesFormatados}`,
          },
        ],
        // CORREÇÃO: "openai/..." não é um modelo Groq.
        model: "openai/gpt-oss-safeguard-20b",
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      const respostaConteudo = completion.choices[0]?.message?.content;
      if (!respostaConteudo) {
        throw new Error("A IA não retornou conteúdo.");
      }
      console.log("Resposta da IA: ", respostaConteudo);

      let receitasDoGroq: GroqReceita[] = [];
      try {
        const parsedJson = JSON.parse(respostaConteudo);

        // Lógica de parsing robusta
        if (parsedJson.receitas && Array.isArray(parsedJson.receitas)) {
          // Caso 1: A IA seguiu o prompt: { "receitas": [...] }
          receitasDoGroq = parsedJson.receitas;
        } else if (Array.isArray(parsedJson)) {
          // Caso 2: A IA ignorou o prompt e retornou um array: [...]
          receitasDoGroq = parsedJson;
        } else {
          throw new Error("Formato JSON inesperado da IA.");
        }
      } catch (parseError) {
        console.error(
          "Erro ao parsear JSON da IA:",
          respostaConteudo,
          parseError
        );
        return [];
      }

      // --- PASSO 2: Buscar imagens no Unsplash (usando 'this.unsplash') ---
      // Sua lógica 'colocarImagem' foi movida para cá e corrigida

      const receitasCompletas = await Promise.all(
        receitasDoGroq.map(async (receitaGroq) => {
          let urlImagemFinal = IMAGEM_FALLBACK; // Começa com o fallback

          try {
            const resultado = await this.unsplash.search.getPhotos({
              query: `${receitaGroq.nome} receita prato culinária`,
              perPage: 1,
              orientation: "squarish",
            });

            const urlImagemUnsplash =
              resultado.response?.results[0]?.urls.regular;
            if (urlImagemUnsplash) {
              urlImagemFinal = urlImagemUnsplash; // URL real do Unsplash
            }
          } catch (imgError) {
            console.error(
              `Erro ao buscar imagem para '${receitaGroq.nome}':`,
              imgError
            );
            // Se der erro, urlImagemFinal continua sendo o FALLBACK
          }

          // Monta o objeto final que corresponde à interface ReceitasDaIa
          const receitaFinal: ReceitasDaIa = {
            ...receitaGroq,
            imagem: urlImagemFinal,
          };
          return receitaFinal;
        })
      );

      console.log("Resultado final", receitasCompletas);
      return receitasCompletas;
    } catch (error) {
      console.error("Erro ao buscar receitas do Groq:", error);
      return [];
    }
  }
}

// --- CORREÇÃO DO ERRO 'THIS' ---
// Exporte uma INSTÂNCIA da classe (Singleton)
const api = new buscarEmApi();
export default api;
