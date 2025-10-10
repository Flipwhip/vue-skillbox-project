<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decrCount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" :value="productCount" @change="changeProductCount">

    <button type="button" aria-label="Добавить один товар" @click.prevent="incrCount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCount',
  model: {
    prop: 'productAmount',
    event: 'addCount',
  },
  props: ['productAmount'],
  computed: {
    productCount() {
      return this.productAmount
    }
  },
  methods: {
    addCount(productAmount) {
      this.$emit('addCount', productAmount);
    },
    changeProductCount(event) {
      const value = parseInt(event.target.value) || 1;
      this.addCount(value);
    },
    decrCount() {
      if (this.productAmount > 1) {
        this.addCount(this.productAmount - 1);
      }
    },
    incrCount() {
      this.addCount(this.productAmount + 1);
    }
  }
}
</script>
