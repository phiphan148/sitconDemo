<template>
  <div class="update-product-wrapper">
    <div class="accordion update-product-form" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.create-product variant="primary">Create product</b-button>
        </b-card-header>
        <b-collapse id="create-product" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form class="create-product-form" @submit="onSubmit" @reset="onReset">
              <b-form-group id="input-group-erpNumber" label="ErpNumber" label-for="input-erpNumber">
                <b-form-input id="input-erpNumber" v-model="erp_number" placeholder="ErpNumber" required>
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-group-name" label="Product Name" label-for="input-name">
                <b-form-input id="input-name" v-model="name" type="text" placeholder="Name">
                </b-form-input>
              </b-form-group>

              <b-form-group id="input-group-locale" label="Locale" label-for="input-locale">
                <b-form-input id="input-locale" v-model="locale" placeholder="Locale">
                </b-form-input>
              </b-form-group>

              <b-form-textarea id="product-data" v-model="data" placeholder="Product data" rows="2" max-rows="4">
              </b-form-textarea>

              <b-button type="submit" variant="primary">Add</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header"  block v-b-toggle.update-product variant="primary">Update product</b-button>
        </b-card-header>
        <b-collapse id="update-product" accordion="my-accordion" role="tabpanel">
          <b-card-body>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.delete-product variant="primary">Delete product</b-button>
        </b-card-header>
        <b-collapse id="delete-product" accordion="my-accordion" role="tabpanel">
          <b-card-body>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="product-result-list">
      <li
        class="product-item"
        v-for="(product, idx) in products_data.slice().reverse()"
        :key="idx"
      >
        <p><strong>PRODUCT {{ product.id }}:</strong></p>
        <p>Erp_number: {{ product.erp_number }}, Name: {{ product.info.name }}, Locale: {{ product.info.locale }}</p>
        <article class="product-item-data">Data: {{ product.data }}</article>
      </li>
    </div>
  </div>
</template>

<script>
import ProductGridBox from '@mindshift/product-grid-box/dist/productGridBox.umd'
import gql from 'graphql-tag'

const GET_PRODUCTS = gql`
  query getProducts {
    products_data {
    id
    erp_number
    data
     info {
      name
      locale
    }
  }
  }
`

const ADD_PRODUCT = gql`
  mutation updateProduct(
    $name: String!
    $erp_number: Int!
    $locale: String!
    $data: jsonb!
  ) {
    insert_products(
      objects: [
        {
          name: $name
          erp_number: $erp_number
          locale: $locale
        }
      ]
    ) {
      returning {
        id
        name
        erp_number
        locale
      }
    }

    insert_products_data(
      objects: [
        {
          erp_number: $erp_number
          data: $data
        }
      ]
    ) {
      returning {
        id
        erp_number
      }
    }
  }
`

export default {
  name: 'UpdateProduct',
  components: {
    ProductGridBox
  },
  data () {
    return {
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
    onSubmit (e) {
      e.preventDefault()
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
        refetchQueries: ['MyQuery']
      })
    },

    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.erp_number = ''
      this.name = ''
      this.locale = ''
      this.data = ''
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

.collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
