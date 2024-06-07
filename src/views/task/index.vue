<script setup lang="ts">
import Header from '../../components/header.vue'
import { useTaskStore } from '@/stores/task/TaskStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const taskStore = useTaskStore()


const getTask = (task: any) => {
  taskStore.task = task
  router.push({name: 'details'})
}

const createTask = () => {
  taskStore.action = 'Create'
  router.push({name: 'create'})
}
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
      <Header/>
      <v-row >
          <v-col cols="12" md="12">
              <v-card>
                  <v-card-title>To Do</v-card-title>
                  <v-list density="compact">
                    <v-list-item v-for="(task, i) in taskStore.tasks" :key="i" :value="task" color="primary">
                      <v-list-item-title v-text="task.title" @click="getTask(task)"></v-list-item-title>
                    </v-list-item>
                  </v-list>
              </v-card>
              <div style="padding-top:5px; align-items: end;">
                <v-btn @click="createTask">Add Task</v-btn>
              </div>
              
          </v-col>
          
      </v-row> 
  </v-container>
</template>