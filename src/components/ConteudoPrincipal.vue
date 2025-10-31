<script lang="ts">
import BotaoPrincipal from "./BotaoPrincipal.vue";
import MostrarReceitas from "./MostrarReceitas.vue";
import Rodape from "./Rodape.vue";
import SelecionarIngredientes from "./SelecionarIngredientes.vue";
import SuaLista from "./SuaLista.vue";

type Pagina = "SelecionarIngredientes" | "MostrarReceitas";

export default {
  data() {
    return {
      ingredientes: [] as string[],
      conteudo: "SelecionarIngredientes" as Pagina,
    };
  },
  components: {
    SelecionarIngredientes,
    SuaLista,
    BotaoPrincipal,
    Rodape,
    MostrarReceitas,
  },
  methods: {
    adicionarIngredientes(ingrediente: string) {
      this.ingredientes.push(ingrediente);
    },
    removerIngredientes(ingrediente: string) {
      this.ingredientes = this.ingredientes.filter((i) => i !== ingrediente);
    },
    navegar(pagina: Pagina) {
      this.conteudo = pagina;
    },
  },
};
</script>

<template>
  <main class="conteudo-principal">
    <section>
      <SuaLista :ingredientes="ingredientes" />
    </section>
    <SelecionarIngredientes
      v-if="conteudo === 'SelecionarIngredientes'"
      @adicionar-ingrediente="adicionarIngredientes($event)"
      @remover-ingrediente="removerIngredientes($event)"
      @buscar-receitas="navegar('MostrarReceitas')"
    />

    <MostrarReceitas
      v-else-if="conteudo === 'MostrarReceitas'"
      @editar-receitas="navegar('SelecionarIngredientes')"
    />
  </main>
  <Rodape />
</template>

<style scoped>
.conteudo-principal {
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--creme, #fffaf3);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 1300px) {
  .conteudo-principal {
    padding: 5rem 3.75rem;
    gap: 3.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .conteudo-principal {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
}
</style>
