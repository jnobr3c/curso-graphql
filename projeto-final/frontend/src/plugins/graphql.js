import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

//aula 95
Vue.use({
    install(Vue) {
        //Vue.prototype.$api = 'Teste'

        //Apolloink
        const httpLink = createHttpLink({
            uri: 'http://localhost:4000/'
        })

        //Apolloink
        const authLink = setContext((_, { headers }) => {
            const token = localStorage.getItem('token')
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : ''
                }
            }
        })

        Vue.prototype.$api = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        })    
    }                
})