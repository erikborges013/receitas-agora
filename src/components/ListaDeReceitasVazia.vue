<script lang="ts">
export default {};
</script>

<template>
  <article class="article-sem-receita">
    <p class="paragrafo-lg">
      Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
    </p>
    <img
      class="imagem-sem-receita"
      src="../assets/images/sem-receitas.png"
      alt="Ícone sem receitas"
    />
  </article>
</template>

<style scoped>
.article-sem-receita {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.imagem-sem-receita {
  width: 300px;
}
</style>
