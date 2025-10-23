<template>
  <div class="preload">
    <img src="@/assets/loader.gif" alt="Загрузка..." />
    <span>Загрузка товаров...</span>
  </div>
</template>

<script>
export default {
  name: 'PreloaderAnimation',
}
</script>

<style>
div.preload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  padding: 20px;
  max-width: 150px;
  text-align: center;
  color: #333;
}

.preload img {
  width: 60px;
  /* Размер гифки */
  height: 60px;
  margin-bottom: 12px;
  /* Отступ снизу */
}

.preload span {
  font-weight: 600;
  font-size: 16px;
}
</style>
