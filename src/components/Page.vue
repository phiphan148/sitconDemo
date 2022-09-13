<template>
  <div>
    <div
      class="HomePage__Wrapper"
    >
      <HeroImage></HeroImage>
      <Product></Product>
    </div>
  </div>
</template>

<script>
import Product from './Product.vue'
import HeroImage from './HeroImage.vue'

export default {
  name: 'HomePage',
  components: {
    HeroImage,
    Product
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@mindshift/cake-mindshift-core/src/styling_mixins.less";

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.HomePage__Wrapper {
  margin: 0 auto;

  @media (min-width: @m-breakpoints-sm) {
    max-width: 80rem;
  }
}
</style>
