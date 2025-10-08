import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardProducts: [
      {productId: 1, amount: 2}
    ]
  },
  mutations: {
    addProductToCart(state, payload){
      const item = state.cardProducts.find(item => item.productId === payload.productId)

      if(item){
        item.amount+= payload.amout
      } else {
    state.cardProducts.push({
        productId: payload.productId,
        amount: payload.amout,
        })
      }
    }
  }
  //   можно сократить при деструктуризации
  // addProductToCart(state, {productId, amount}){
  //     state.cardProducts.push({
  //       productId,
  //       amount,
  //     })
  //   }
  // }

  }
);
