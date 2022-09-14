import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueApollo, { ApolloProvider } from 'vue-apollo'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'https://vast-dory-34.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'Uz85rbC68tJXnzxMhbubUcSTIVSNMyKl9IW7CsUOQeTQQWEnJ3yBGsP7f64jGg1r'
  }
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const apolloProvider = new ApolloProvider({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
