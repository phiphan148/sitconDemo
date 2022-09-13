<template>
  <div
    class="AProductGridBox"
  >
    <div
      class="AProductGridBox__List"
    >
      <li
        class="AProductGridBox__Item"
        v-for="product in products"
        :key="product.erpNumber"
      >
        <div
          class="AProductGridBox__Item--wrapper"
        >
          <product-grid-box
            :locale="product.locale"
            v-bind="product.data"
          />
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import ProductGridBox from '@mindshift/product-grid-box/dist/productGridBox.umd'
import ApolloClient from 'apollo-boost'
import productData from '../data/products.json'

export default {
  name: 'Product',
  components: {
    ProductGridBox
  },
  data () {
    return {
      products: productData
    }
  },
  created () {
    const apolloClient = new ApolloClient({
      // You should use an absolute URL here
      uri: 'https://api.graphcms.com/simple/v1/awesomeTalksClone'
    })
    console.log(apolloClient)
  }
}
</script>

<style>
@import "../../node_modules/@mindshift/product-grid-box/dist/productGridBox.css";
</style>

<style lang="less" scoped>
@import "~@mindshift/cake-mindshift-core/src/variables.less";
@import "~@mindshift/cake-mindshift-core/src/styling_mixins.less";

.AProductGridBox {
  max-width: 100%;
  width: 100%;
  padding: @m-distances-24 0;
  background-color: #204e47;

  &__List {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;

    @media (min-width: @m-breakpoints-sm) {
      padding: 0 0 0 @m-distances-16;
    }

    @media (min-width: @m-breakpoints-md) {
      padding: 0 0 0 @m-distances-24;
    }
  }

  &__Item {
    width: 100%;
    padding: 0;

    @media (min-width: @m-breakpoints-sm) {
      width: calc(50% - @m-distances-24);
      padding: @m-distances-8 @m-distances-16 @m-distances-8 0;
    }

    @media (min-width: @m-breakpoints-md) {
      width: calc(25% - @m-distances-24);
    }
  }
}
</style>
