<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { useUserStore } from '../../stores/user/UserStore'
import { loginQuery } from '../../graphql/mutations/usermutations' 
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../../stores/task/TaskStore';

const router = useRouter()
const useStore = useUserStore()
const taskStore = useTaskStore()
const { mutate: userLogin, onDone } =  useMutation(loginQuery)

const email = ref()
const password = ref()
const isInvalid = ref(false)

const doLogin = async () => {
    try {
        const input = {
            email: email.value,
            password: password.value
        }

        await userLogin({input})
    }catch(err) {
        console.log(err)
    }
}

onDone(res => {
    if (!res.data.login.token) {
        isInvalid.value = true
    } else {
        useStore.setAuthenticatedUser(res.data.login)
        taskStore.setTasks(res.data.login.user.tasks)
        router?.push({name: 'tasks'})
        
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
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Email" type="email" required />
                            <v-text-field v-model="password" label="Password" type="password" required />
                            <v-row>
                                <v-col>
                                    <v-btn  color="primary" block @click="doLogin">Login</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn color="secondary" block @click="$router.push('/register')">Register</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
                <div style="margin-top: 5px;" v-if="isInvalid">
                    <v-alert color="error" icon="$error" title="Invalid Credentials" />
                </div>
            </v-col>
        </v-row> 
    </v-container>
</template>