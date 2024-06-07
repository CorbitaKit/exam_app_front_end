import { useUserStore } from '@/stores/user/UserStore'
import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
})
const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  const useStore = useUserStore()
  operation.setContext({
    headers: {
      Authorization: useStore.token ? `Bearer ${useStore.token}` : null,
    },
  });
  return forward(operation);
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})


export default apolloClient




