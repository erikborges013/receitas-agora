<script lang="ts">
import Tag from "./Tag.vue";

export default {
  props: {
    ingredientes: { type: Array as () => String[], required: true },
  },
  components: { Tag },
};
</script>

<template>
  <section>
    <span class="subtitulo-lg sua-lista-texto"> Sua lista: </span>
    <ul v-if="ingredientes!.length" class="ingredientes-sua-lista">
      <li v-for="ingrediente in ingredientes as string[]" :key="ingrediente">
        <Tag :texto="ingrediente" :ativa="true" />
      </li>
    </ul>
    <p v-else class="paragrafo lista-vazia">
      <img
        src="/src/assets/images/icones/lista-vazia.svg"
        alt="Ícone de pesquisa"
      />
      Sua lista está vazia, selecione ingredientes para iniciar.
    </p>
  </section>
</template>

<style scoped>
.sua-lista-texto {
  color: var(--coral, #f0633c);
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
}

.ingredientes-sua-lista {
  display: flex;
  justify-content: center;
  gap: 1rem 1.5rem;
  flex-wrap: wrap;
}

.lista-vazia {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  color: var(--coral, #f0633c);
  text-align: center;
}
</style>
