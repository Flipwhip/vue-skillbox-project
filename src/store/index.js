import Vue from "vue";
import Vuex from "vuex";
import products from "@/data/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardProducts: [{ productId: 1, amount: 2 }],
  },
  mutations: {
    addProductToCart(state, payload) {
      const item = state.cardProducts.find((item) => item.productId === payload.productId);

      if (item) {
        item.amount += payload.amount;
      } else {
        state.cardProducts.push({
          productId: payload.productId,
          amount: payload.amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cardProducts.find((item) => item.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cardProducts = state.cardProducts.filter((item) => item.productId !== productId);
    },
    decrAmount(state, productId) {
      const item = state.cardProducts.find((item) => item.productId === productId);
      if (item && item.amount > 1) {
        item.amount--;
      }
    },
    incrAmount(state, productId) {
      const item = state.cardProducts.find((item) => item.productId === productId);
      if (item) {
        item.amount++;
      }
    },
  },
  //   можно сократить при деструктуризации
  // addProductToCart(state, {productId, amount}){
  //     state.cardProducts.push({
  //       productId,
  //       amount,
  //     })
  //   }
  // }
  getters: {
    cartDetailProducts(state) {
      return state.cardProducts.map((item) => {
        return {
          ...item,
          product: products.find((p) => p.id === item.productId),
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
  },
});
