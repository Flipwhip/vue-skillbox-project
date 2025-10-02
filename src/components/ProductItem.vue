<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }}
    </span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="#73B6EA" v-model="currentColor"
            :name="`color-${product.id}`">
          <span class="colors__value" style="background-color: #73B6EA;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="#8BE000" v-model="currentColor"
            :name="`color-${product.id}`">
          <span class="colors__value" style="background-color: #8BE000;">
          </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="#222" v-model="currentColor"
            :name="`color-${product.id}`">
          <span class="colors__value" style="background-color: #222;">
          </span>
        </label>
      </li>
    </ul>
  </li>

</template>

<script>
import gotoPage from '../helpers/gotoPage';
import numberFormat from '../helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product', 'color'],
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  computed: {
    currentColor: {
      get() {
        return this.color;
      },
      set(value) {
        this.$emit('update:color', value);
      },
    },
  },
};

</script>
