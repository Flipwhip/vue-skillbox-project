<!-- eslint-disable max-len -->
<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable no-multiple-empty-lines -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts | productWord }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId" :color-product.sync="filterColorProduct" />
      <section class="catalog">
        <ProductList :products="products" />

        <PreloaderAnimation v-if="productsLoading" />

        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button
            @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"></BasePagination>
      </section>

    </div>
  </main>

</template>

<script>
import { API_BASE_URL } from '@/config';
import PreloaderAnimation from '@/components/PreloaderAnimation.vue';
import ProductList from '../components/ProductList.vue';
import BasePagination from '../components/BasePagination.vue';
import ProductFilter from '../components/ProductFilter.vue';
import productWord from '@/helpers/productWord';
import axios from 'axios';

export default {
  name: 'MainPage',
  filters: { productWord },
  components: { PreloaderAnimation, ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: '',
      filterColorProduct: '',
      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,

      productsLoadingFailed: false,
    };
  },
  computed: {

    products() {
      return this.filteredProducts.slice(this.start, this.end)
        .map(product => {
          return {
            ...product,
            image: product.image
          }
        })
    },

    filteredProducts() {
      if (!this.productsData) return [];

      let filtered = this.productsData;

      if (this.filterPriceFrom > 0) {
        filtered = filtered.filter(product => product.price >= this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filtered = filtered.filter(product => product.price <= this.filterPriceTo);
      }

      // здесь позже можно добавить фильтр по категории, цвету и т.п.

      if (this.filterCategoryId) {
        filtered = filtered.filter(
          product => product.category === this.filterCategoryId
        );
      }
      return filtered;
    },

    start() {
      return (this.page - 1) * this.productsPerPage;
    },

    end() {
      return this.start + this.productsPerPage;
    },

    countProducts() {
      return this.filteredProducts.length;
    }
  },

  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + '/products')
          .then(response => {
            this.productsData = response.data.map(product => {
              return {
                ...product,
                price: Math.round(product.price * 95),
              };
            });
          })
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      }, 1000);
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  }
};
</script>
