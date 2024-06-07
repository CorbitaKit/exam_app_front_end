<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { registerQuery } from '../../graphql/mutations/usermutations'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { mutate: register, onDone } = useMutation(registerQuery)
const router = useRouter()
const name = ref()
const email = ref()
const password = ref()
const errors = ref([])
const doRegister = async () => {
    try{
        const input = {
            name: name.value,
            email: email.value,
            password: password.value
        }

        await register({input})
    }catch(error) {
        console.log(error)
    }
}

onDone(res=> {
   if (res.data.createUser.errors) {
        errors.value = res.data.createUser.errors
   } else {
        router.push('/')
   }
})

</script>

<style scoped>
.v-card {
  max-width: 100%;
  margin: 0 auto;
}

.v-container{
  width:500px;
  
}
</style>
<template>
    <v-container>
        <v-row >
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Email" type="email" required />
                            <v-text-field v-model="name" label="Name" type="text" required />
                            <v-text-field v-model="password" label="Password" type="password" required />
                            <v-row>
                                <v-col>
                                    <v-btn @click="doRegister" color="primary" block>Register</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
                <div style="margin-top: 5px;" v-if="errors">
                    <v-alert v-for="(error, i) in errors" :key="i"  color="error" icon="$error" :title="error" style="margin-bottom:2px;"/>
                </div>
            </v-col>
        </v-row> 
  </v-container>
</template>