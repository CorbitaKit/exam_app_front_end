<script setup lang="ts">
import { useTaskStore } from "../../stores/task/TaskStore";


const taskStore = useTaskStore()
</script>


<template>
    <v-row >
        <v-col cols="12" md="12">
            <v-card>
                <v-card-title>Task From</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="taskStore.task.title" label="Title" type="text" required />
                        <v-textarea v-model="taskStore.task.description" label="Description"></v-textarea>
                        <v-row>
                            <v-col>
                                <v-btn color="primary" block @click="$emit('submit')">Submit</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn color="error" block @click="$router.push('/tasks')">Cancel</v-btn>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row> 
</template>