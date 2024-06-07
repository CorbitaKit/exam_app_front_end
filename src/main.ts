import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import apolloClient from './plugins/apollo-client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import vuetify from './plugins/vuetify'
import piniaPersistedState from 'pinia-plugin-persistedstate'


const pinia = createPinia()

const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})
app.use(pinia)

pinia.use(piniaPersistedState)
app.use(router)
app.use(vuetify)
app.mount('#app')
