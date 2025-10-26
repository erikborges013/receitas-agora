import type ICategoria from "@/interfaces/ICategoria";

export async function obterCategorias() {
  const resposta = await fetch("./ingredientes.json");

  const categorias: ICategoria[] = await resposta.json();
  return categorias;
}
