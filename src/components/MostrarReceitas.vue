<script lang="ts">
import type receitasDaIA from "@/interfaces/ReceitasDaIa";
import BotaoPrincipal from "./BotaoPrincipal.vue";
import CardReceitas from "./CardReceitas.vue";
import api from "@/assets/http/Index";
import ListaDeReceitasVazia from "./ListaDeReceitasVazia.vue";
import type { PropType } from "vue";
// Não precisamos mais desta função de filtro!
// import { itensDeLista1EstaoEmLista2 } from "@/operacoes/listas";

export default {
  data() {
    return {
      receitasEncontradas: [] as receitasDaIA[],
    };
  },

  props: {
    ingredientes: { type: Array as PropType<string[]>, required: true },
  },

  async created() {
    const receitas = await api.obterReceitas(this.ingredientes);

    this.receitasEncontradas = receitas;
  },

  components: { CardReceitas, BotaoPrincipal, ListaDeReceitasVazia },
  emits: ["editar-receitas"],
};
</script>

<template>
  <section class="sessao-apresentacao">
    <h1 class="cabecalho titulo-receitas">Receitas</h1>
    <p class="paragrafo-lg quantidade-resultados">
      Resultados encontrados: {{ receitasEncontradas.length }}
    </p>
  </section>
  <section v-if="receitasEncontradas.length" class="sessao-cards-receitas">
    <p class="paragrafo-lg paragrafo-mostrar-receita">
      Veja as opções de receitas que encontramos com os ingredientes que você
      tem por aí!
    </p>
    <ul class="receitas">
      <li v-for="receita in receitasEncontradas" :key="receita.nome">
        <CardReceitas :receita="receita" />
      </li>
    </ul>
  </section>
  <section v-else>
    <ListaDeReceitasVazia />
  </section>
  <BotaoPrincipal texto="Editar lista" @click="$emit('editar-receitas')" />
</template>

<style scoped>
.titulo-receitas {
  color: var(--verde-medio, #3d6d4a);
  display: block;
  margin-bottom: 1.5rem;
}

.quantidade-resultados {
  color: var(--verde-claro);
}

.receitas {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.paragrafo-mostrar-receita {
  margin-bottom: 35px;
  text-align: center;
}

.sessao-apresentacao {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.sessao-cards-receitas {
  margin-bottom: 2rem;
}
</style>
