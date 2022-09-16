<template>
  <div class="product-result-list">
    <b-card
      v-for="(product, idx) in sortData(productsData)"
      :key="idx"
      no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="product.data.image" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="'Product ID: ' + product.id">
            <b-card-text>
              <p>ERP_NUMBER: {{ product.erp_number }}</p>
              <p>{{ product.info.name }}</p>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'UpdateProductLayout',
  props: {
    productsData: Array
  },
  methods: {
    sortData (myArray) {
      return myArray.slice().sort((a, b) => b.id - a.id)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@mindshift/cake-mindshift-core/src/variables.less";
@import "~@mindshift/cake-mindshift-core/src/styling_mixins.less";

.product-result-list {
  width: 90%;
  margin: @m-distances-16 0;
  text-align: left;
  line-height: @m-distances-24;
  display: flex;
  flex-wrap: wrap;
  gap: @m-distances-16;

  li {
    list-style: none;
    margin-bottom: @m-distances-16;
  }
   p {
     margin: 0;
     padding: 0;
   }
}

.product-item-data {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
