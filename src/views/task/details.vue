<script setup lang="ts">
import { useTaskStore } from '../../stores/task/TaskStore'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useMutation } from '@vue/apollo-composable'
import { deleteTaskQuery } from '../../graphql/mutations/taskmutations'
import { useRouter } from 'vue-router'
const taskStore = useTaskStore()
const router = useRouter()
const { mutate: deleteTask, onDone } = useMutation(deleteTaskQuery)
const doDelete = () => {
    Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            
            try{
                const id = parseInt(taskStore.task.id)
                deleteTask({id})
            }catch(error) {
                console.log(error)
            }
        }
    });
}

onDone(res => {
    taskStore.deleteTask()
    taskStore.resetTask()
    router.push('/tasks')
})
</script>

<template>
    <v-container>
        <v-card
       
        class="mx-auto"
        :subtitle="taskStore.task.description"
        :title="taskStore.task.title"
      >
        <template v-slot:actions>
          <v-btn text="Update" @click="$router.push('/update')"></v-btn>
          <v-btn text="Delete" @click="doDelete"></v-btn>
          <v-btn text="Cancel" @click="$router.push('/tasks')"></v-btn>
        </template>
      </v-card>
    </v-container>
</template>