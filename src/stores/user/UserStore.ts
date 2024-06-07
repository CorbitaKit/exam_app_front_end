import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', {

    state: () => ({
        user: null,
        token: ""
        
    }),


    actions: {
        setAuthenticatedUser (auth: any)  {
            this.user = auth.user
            this.token = auth.token
        },
        
       
    },

    persist: true,

    
   
   
})
