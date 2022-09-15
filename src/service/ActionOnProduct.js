import gql from 'graphql-tag'

export const GET_PRODUCTS = gql`
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

export const ADD_PRODUCT = gql`
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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct(
    $id: Int!
    $erp_number: Int!
  ) {
  delete_products_data(where: {erp_number: {_eq: $erp_number}, id: {_eq: $id}}) {
    returning {
       id
    }
  }
  delete_products(where: {erp_number: {_eq: $erp_number}}) {
    returning {
      id
    }
  }
 }
`
