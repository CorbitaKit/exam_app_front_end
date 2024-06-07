<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { updateTaskQuery } from "../../graphql/mutations/taskmutations";
import { useTaskStore } from "../../stores/task/TaskStore";
import TaskForm from '../../components/task/form.vue'
import { useRouter } from "vue-router";

const taskStore = useTaskStore()
const router = useRouter()
const { mutate: updateTask, onDone } = useMutation(updateTaskQuery)

const submit = async () => {
  try{
        const input = {
            title: taskStore.task.title,
            description: taskStore.task.description
        }

        const id = taskStore.task.id

        await updateTask({input, id})


    }catch(error) {
        console.log(error)
    }
}

onDone(res=> {
  taskStore.updateTask(res.data.updateTask)
  taskStore.resetTask()
  router.push('/tasks')

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
  </v-container>
</template>