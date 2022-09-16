<template>
  <div class="update-product-wrapper">
    <div class="accordion update-product-form" role="tablist">
      <!--        CREATE          -->
      <b-card no-body class="mb-1">
        <b-card-header @click="onReset" header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.create-product variant="primary">Add product
          </b-button>
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

              <b-form-group id="input-create-data" label="Data" label-for="input-create-data">
                <b-form-textarea id="product-create-data" v-model="data" placeholder="Product data" rows="2"
                                 max-rows="4">
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
        <b-card-header @click="onReset" header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.update-product variant="primary">Update product
          </b-button>
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

              <b-form-group id="input-update-data" label="Data" label-for="input-update-data">
                <b-form-textarea id="product-update-data" v-model="data" placeholder="Product data" rows="2"
                                 max-rows="4">
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
        <b-card-header @click="onReset" header-tag="header" class="p-1" role="tab">
          <b-button class="update-product-header" block v-b-toggle.delete-product variant="primary">Delete product
          </b-button>
        </b-card-header>
        <b-collapse id="delete-product" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-form class="delete-product-form">
              <b-form-group id="input-delete-id" label="Product ID" label-for="input-delete-id">
                <b-form-input id="input-delete-id" v-model="id" placeholder="Product ID" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="input-delete-erpNumber" label="ErpNumber" label-for="input-delete-erpNumber">
                <b-form-input id="input-delete-erpNumber" v-model="erp_number" placeholder="ErpNumber" required>
                </b-form-input>
              </b-form-group>
              <b-button class="update-product-form-button" @click="onDelete" type="delete" variant="danger">Delete
              </b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <UpdateProductLayout :products-data="products_data"></UpdateProductLayout>
  </div>
</template>

<script>
import {GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from '../service/ActionOnProduct'
import UpdateProductLayout from './UpdateProductLayout.vue'

export default {
  name: 'UpdateProduct',
  components: {
    UpdateProductLayout
  },
  data () {
    return {
      id: '',
      name: '',
      erp_number: '',
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
    makeToast (variant = null, message) {
      this.$bvToast.toast(message, {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        autoHideDelay: 5000,
        solid: true
      })
    },
    checkValidProduct (id, erpNumber) {
      return this.products_data.some(product => product.id.toString() === id && product.erp_number.toString() === erpNumber)
    },
    onSubmit () {
      // eslint-disable-next-line camelcase
      let {name, erp_number, data} = this.$data
      if (data) {
        data = JSON.parse(data)
      }
      this.$apollo.mutate({
        mutation: ADD_PRODUCT,
        variables: {
          name,
          erp_number,
          data
        },
        refetchQueries: ['getProducts']
      }).then(
        result => {
          this.makeToast('success', 'Product ' + result.data.insert_products.returning[0].erp_number + ' is added')
          this.onReset()
        },
        error => {
          this.makeToast('danger', error.message)
        }
      )
    },
    onUpdate () {
      // eslint-disable-next-line camelcase
      let {id, erp_number, name, data} = this.$data
      if (data) {
        data = JSON.parse(data)
      }
      if (name === '') {
        name = this.getDataForFieldName(id, 'name')
      }
      if (data === '') {
        data = this.getDataForFieldName(id, 'data')
      }
      // eslint-disable-next-line camelcase
      const checkValidErpNumber = this.checkValidProduct(id, erp_number)
      if (checkValidErpNumber) {
        this.$apollo.mutate({
          mutation: UPDATE_PRODUCT,
          variables: {
            id,
            name,
            erp_number,
            data
          },
          refetchQueries: ['getProducts']
        }).then(
          result => {
            this.makeToast('success', 'Product ' + result.data.update_products.returning[0].erp_number + ' is updated')
            this.onReset()
          },
          error => {
            this.makeToast('danger', error.message)
          }
        )
      } else {
        this.makeToast('danger', 'The erpNumber does not belong to this ID')
      }
    },

    onReset () {
      this.erp_number = ''
      this.name = ''
      this.data = ''
      this.id = ''
    },

    onDelete () {
      // eslint-disable-next-line camelcase
      const {erp_number, id} = this.$data
      // eslint-disable-next-line camelcase
      const checkValidErpNumber = this.checkValidProduct(id, erp_number)
      if (checkValidErpNumber) {
        this.$apollo.mutate({
          mutation: DELETE_PRODUCT,
          variables: {
            erp_number,
            id
          },
          refetchQueries: ['getProducts']
        }).then(
          result => {
            this.makeToast('success', 'Product ID ' + result.data.delete_products_data.returning[0].id + ' is deleted')
            this.onReset()
          },
          error => {
            this.makeToast('danger', error.message)
          }
        )
      } else {
        this.makeToast('danger', 'The erpNumber does not belong to this ID')
      }
    },

    getDataForFieldName (id, fieldName) {
      const updatedProduct = this.products_data.find(product => product.id.toString() === id)
      if (updatedProduct) {
        return fieldName === 'data' ? updatedProduct[fieldName] : updatedProduct.info[fieldName]
      }
      return ''
    }
  }
}
</script>

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
