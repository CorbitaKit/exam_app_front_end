<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { createTaskQuery } from "../../graphql/mutations/taskmutations";
import { useTaskStore } from "../../stores/task/TaskStore";
import TaskForm from '../../components/task/form.vue'
import { useUserStore } from "../../stores/user/UserStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore()
const taskStore = useTaskStore()
const router = useRouter()
const { mutate: createTask, onDone } = useMutation(createTaskQuery)

const errors =  ref([])

const submit = async () => {
    try{
        const input = {
            title: taskStore.task.title,
            description: taskStore.task.description,
            status: 'To Do',
            user_id: parseInt(userStore.user.id, 10)
        }

        await createTask({input})


    }catch(error) {
        console.log(error)
    }
}

onDone(res=>{
    if (res.data.createTask.errors) {
        errors.value = res.data.createTask.errors
    } else {
        taskStore.addCreatedTaskToList(res.data.createTask)
        taskStore.resetTask()
        router.push('/tasks')
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
        <TaskForm @submit="submit"/>

        <div style="margin-top: 5px;" v-if="errors">
            <v-alert v-for="(error, i) in errors" :key="i"  color="error" icon="$error" :title="error" style="margin-bottom:2px;"/>
        </div>
  </v-container>
</template>