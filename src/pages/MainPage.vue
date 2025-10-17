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
        <ProductList :products="products">
        </ProductList>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"></BasePagination>
      </section>

    </div>
  </main>

</template>

<script>
import { API_BASE_URL } from '@/config';
import ProductList from '../components/ProductList.vue';
import BasePagination from '../components/BasePagination.vue';
import ProductFilter from '../components/ProductFilter.vue';
import productWord from '@/helpers/productWord';
import axios from 'axios';

export default {
  name: 'MainPage',
  filters: { productWord },
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: '',
      filterColorProduct: '',
      page: 1,
      productsPerPage: 3,

      productsData: null,
    };
  },
  computed: {

    products() {
      return this.filteredProducts.slice(this.start, this.end)
        .map(product => {
          return {
            ...product,
            image: product.image // теперь строка, а не объект
          }
        })
    },

    filteredProducts() {
      if (!this.productsData) return [];

      let filtered = this.productsData;

      // фильтр по минимальной цене
      if (this.filterPriceFrom > 0) {
        filtered = filtered.filter(product => product.price >= this.filterPriceFrom);
      }

      // фильтр по максимальной цене
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
      // показываем количество именно отфильтрованных товаров
      return this.filteredProducts.length;
    }
  },

  // данные по курсу, которые меняем на fakestoreapi.com
  // methods: {
  // loadProducts(){
  //   axios
  //     .get(`http://vue-study.dev.creonit.ru/api/products`, {
  //       params: {
  //         page: this.page,
  //         limit: this.productsPerPage,
  //         categoryId: this.filterCategoryId,
  //         minPrice: this.filterPriceFrom,
  //         maxPrice: this.filterPriceTo
  //       }
  //     })
  //     .then(response => this.productsData = response.data);
  // },

  methods: {
    loadProducts() {
      axios.get(API_BASE_URL + '/products')
        .then(response => {
          this.productsData = response.data.map(product => {
            return {
              ...product,
              price: Math.round(product.price * 95),
            };
          });
        });
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
