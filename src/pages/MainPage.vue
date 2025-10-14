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
import products from '../data/products';
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
      filterCategoryId: 0,
      filterColorProduct: '',
      page: 1,
      productsPerPage: 3,

      productsData: null,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }

      if (this.filterColorProduct) {
        // eslint-disable-next-line max-len
        filteredProducts = filteredProducts.filter((product) => product.color === this.filterColorProduct);
      }

      return filteredProducts;
    },

    // данные по курсу, которые меняем на fakestoreapi.com
    // products() {
    //   return this.productsData
    //     ? this.productsData.items.map(product => {
    //       return {
    //         ...product,
    //         image: product.image.file.url
    //       }
    //     })
    //     : [];
    // },
    products() {
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image // теперь строка, а не объект
          }
        })
        : [];
    },

    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },

  // данные по курсу, которые меняем на fakestoreapi.com
  // methods: {
  //   loadProducts() {
  //     axios.get(`http://vue-study.dev.creonit.ru/api/products?page=${this.page}&limit=${this.productsPerPage}`)
  //       .then(response => this.productsData = response.data);
  //   }
  // },

  methods: {
    loadProducts() {
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
          const allProducts = response.data.map(product => {
            return {
              ...product,
              price: Math.round(product.price * 95), // переводим в рубли и округляем
            };
          });

          // ручная пагинация:
          const start = (this.page - 1) * this.productsPerPage;
          const end = start + this.productsPerPage;

          // сохраняем результат в структуре, похожей на старую
          this.productsData = {
            items: allProducts.slice(start, end),
            pagination: {
              total: allProducts.length
            }
          };
        });
    }
  },
  watch: {
    page() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>
