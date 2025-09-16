<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <ul class="catalog__list">
    <!-- // eslint-disable-next-line vue/require-v-for-key, vue/require-v-for-key -->
    <ProductItem v-for='product in products' :key="product.id" :product="product" />
  </ul>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products'],
};

</script>
