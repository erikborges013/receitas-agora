<script lang="ts">
import type receitasDaIA from "@/interfaces/ReceitasDaIa";
import type { PropType } from "vue";

export default {
  props: {
    receita: { type: Object as PropType<receitasDaIA>, required: true },
  },
  computed: {
    caminhoDaImagem() {
      const imagem = this.receita.imagem;
      if (imagem.startsWith("http")) {
        return imagem; // URL do Unsplash
      }
      return `/imagens/receitas/${imagem}`; // Imagem de fallback local
    },
  },
};
</script>

<template>
  <article class="card-receita">
    <div class="container-imagem-receita">
      <img
        class="image-receita"
        :src="caminhoDaImagem"
        alt="Imagem de alho assado"
      />
    </div>
    <div class="container-nome-receita">
      <p class="nome-receita paragrafo-lg">{{ receita.nome }}</p>
    </div>
  </article>
</template>

<style scoped>
.card-receita {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3);
  border-radius: 16px 16px 16px 16px;
  height: 246px;
  max-width: 282px;
  min-width: 282px;
  box-sizing: border-box;
}

.container-imagem-receita {
  max-width: 282px;
  height: 150px;
  overflow: hidden;
  border: none;
  border-radius: 16px 16px 0 0;
}

.image-receita {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.container-nome-receita {
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
  justify-content: center;
}

.nome-receita {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  text-align: center;
}
</style>
