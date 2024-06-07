<script setup lang="ts">
import { useUserStore } from "../stores/user/UserStore";
import { logoutQuery } from '../graphql/mutations/usermutations'
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
const { mutate: userLogout, onDone } = useMutation(logoutQuery)
const doLogout = async () => {
    const email = userStore.user.email
    try {
        await userLogout({email})
    }catch(error) {
        console.log(error)
    }
}

onDone(res => {
    userStore.$reset()
    localStorage.clear()
    router.push('/')

})
</script>

<template>
    <v-row>
        <v-col cols="6">
            <h1>{{ userStore.user.name }}</h1>
        </v-col>
        <v-col cols="6">
            <v-btn  color="primary" block @click="doLogout">Logout</v-btn>

        </v-col>
    </v-row>
</template>