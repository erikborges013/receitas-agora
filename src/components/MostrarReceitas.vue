<script lang="ts">
import type IReceitas from "@/interfaces/IReceitas";
import BotaoPrincipal from "./BotaoPrincipal.vue";
import CardReceitas from "./CardReceitas.vue";
import { obterReceitas } from "@/assets/http/Index";
import ListaDeReceitasVazia from "./ListaDeReceitasVazia.vue";
export default {
  data() {
    return {
      receitas: [] as IReceitas[],
    };
  },

  async created() {
    this.receitas = await obterReceitas();
  },

  components: { CardReceitas, BotaoPrincipal, ListaDeReceitasVazia },
  emits: ["editar-receitas"],
};
</script>

<template>
  <section class="sessao-apresentacao">
    <h1 class="cabecalho titulo-receitas">Receitas</h1>
    <p class="paragrafo-lg quantidade-resultados">Resultados encontrados: 8</p>
  </section>
  <section v-if="receitas.length" class="sessao-cards-receitas">
    <p class="paragrafo-lg paragrafo-mostrar-receita">
      Veja as opções de receitas que encontramos com os ingredientes que você
      tem por aí!
    </p>
    <ul class="receitas">
      <li v-for="receita in receitas" :key="receita.nome">
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
