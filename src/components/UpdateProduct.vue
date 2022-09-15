<template>
  <div class="update-product-wrapper">
    <div class="accordion update-product-form" role="tablist">
      <!--        CREATE          -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.create-product variant="primary">Add product</b-button>
        </b-card-header>
        <b-collapse id="create-product" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form class="create-product-form" @submit.prevent="onSubmit" @reset.prevent="onReset">
              <b-form-group id="input-create-erpNumber" label="ErpNumber" label-for="input-create-erpNumber">
                <b-form-input id="input-create-erpNumber" v-model="erp_number" placeholder="ErpNumber" required>
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-create-name" label="Product Name" label-for="input-create-name">
                <b-form-input id="input-create-name" v-model="name" type="text" placeholder="Name">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-create-locale" label="Locale" label-for="input-create-locale">
                <b-form-input id="input-create-locale" v-model="locale" placeholder="Locale">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-create-data" label="Data" label-for="input-create-data">
                <b-form-textarea id="product-create-data" v-model="data" placeholder="Product data" rows="2" max-rows="4">
                </b-form-textarea>
              </b-form-group>

              <b-button class="update-product-form-button" type="submit" variant="primary">Add</b-button>
              <b-button class="update-product-form-button" type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!--        UPDATE          -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header"  block v-b-toggle.update-product variant="primary">Update product</b-button>
        </b-card-header>
        <b-collapse id="update-product" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form class="create-product-form" @submit.prevent="onUpdate" @reset.prevent="onReset">
              <b-form-group id="input-update-id" label="ID" label-for="input-update-id">
                <b-form-input id="input-update-id" v-model="id" placeholder="ID" required>
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-update-erpNumber" label="ErpNumber" label-for="input-update-erpNumber">
                <b-form-input id="input-update-erpNumber" v-model="erp_number" placeholder="ErpNumber" required>
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-update-name" label="Product Name" label-for="input-update-name">
                <b-form-input id="input-create-name" v-model="name" type="text" placeholder="Name">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-update-locale" label="Locale" label-for="input-update-locale">
                <b-form-input id="input-create-locale" v-model="locale" placeholder="Locale">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-update-data" label="Data" label-for="input-update-data">
                <b-form-textarea id="product-update-data" v-model="data" placeholder="Product data" rows="2" max-rows="4">
                </b-form-textarea>
              </b-form-group>

              <b-button class="update-product-form-button" type="submit" variant="primary">Update</b-button>
              <b-button class="update-product-form-button" type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>

      <!--        DELETE          -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.delete-product variant="primary">Delete product</b-button>
        </b-card-header>
        <b-collapse id="delete-product" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form class="delete-product-form">
              <b-form-group id="input-delete-erpNumber" label="ErpNumber" label-for="input-delete-erpNumber">
                <b-form-input id="input-delete-erpNumber" v-model="erp_number" placeholder="ErpNumber" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="input-delete-id" label="Product ID" label-for="input-delete-id">
                <b-form-input id="input-delete-id" v-model="id" placeholder="Product ID" required>
                </b-form-input>
              </b-form-group>
              <b-button class="update-product-form-button" @click="onDelete" type="delete" variant="danger">Delete</b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <div class="product-result-list">
      <li
        class="product-item"
        v-for="(product, idx) in sortData(products_data)"
        :key="idx"
      >
        <p><strong>PRODUCT ID: {{ product.id }}</strong></p>
        <p>Erp_number: {{ product.erp_number }}, Name: {{ product.info.name }}, Locale: {{ product.info.locale }}</p>
        <article class="product-item-data">Data: {{ product.data }}</article>
      </li>
    </div>
  </div>
</template>

<script>
import ProductGridBox from '@mindshift/product-grid-box/dist/productGridBox.umd'
import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../service/ActionOnProduct'

export default {
  name: 'UpdateProduct',
  components: {
    ProductGridBox
  },
  data () {
    return {
      id: '',
      name: '',
      erp_number: '',
      locale: '',
      data: '',
      products_data: []
    }
  },
  apollo: {
    products_data: {
      query: GET_PRODUCTS
    }
  },
  methods: {
    sortData (myArray) {
      return myArray.slice().sort((a, b) => b.id - a.id)
    },
    onSubmit () {
      // eslint-disable-next-line camelcase
      const {name, erp_number, locale, data} = this.$data
      this.$apollo.mutate({
        mutation: ADD_PRODUCT,
        variables: {
          name,
          erp_number,
          locale,
          data
        },
        refetchQueries: ['getProducts']
      })
    },
    onUpdate () {
      // eslint-disable-next-line camelcase
      const {id, name, erp_number, locale, data} = this.$data
      this.$apollo.mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id,
          name,
          erp_number,
          locale,
          data
        },
        refetchQueries: ['getProducts']
      })
    },

    onReset () {
      this.erp_number = ''
      this.name = ''
      this.locale = ''
      this.data = ''
    },

    onDelete () {
      // eslint-disable-next-line camelcase
      const {erp_number, id} = this.$data
      this.$apollo.mutate({
        mutation: DELETE_PRODUCT,
        variables: {
          erp_number,
          id
        },
        refetchQueries: ['getProducts']
      })
    }
  }
}
</script>

<style>
@import "../../node_modules/@mindshift/product-grid-box/dist/productGridBox.css";
</style>

<style lang="less" scoped>
@import "~@mindshift/cake-mindshift-core/src/variables.less";
@import "~@mindshift/cake-mindshift-core/src/styling_mixins.less";

.update-product-wrapper {
  text-align: left;
  padding: @m-distances-16;
}

.update-product-form {
  width: 60%;

  &-button {
    margin: @m-distances-16 0;
  }
}

.update-product-header {
  width: 100%;
  color: white;
  font-weight: bold;
}

.create-product-form {
  .form-group {
    margin-bottom: @m-distances-16;
  }

  #product-data {
    margin: @m-distances-8 0 @m-distances-16 0;
  }
}

.product-result-list {
  width: 90%;
  margin: @m-distances-16 0;
  text-align: left;
  line-height: @m-distances-24;

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
