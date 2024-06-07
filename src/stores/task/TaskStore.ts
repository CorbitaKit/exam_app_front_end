import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        task: {
            id: 0,
            title: '',
            description: '',
            status: "To Do",
            user_id: 0
        },
        tasks: [],
        action: ''
    }),

    persist: true,

    actions: {
        setTasks (tasks: any) {
            this.tasks = tasks
        },
        addCreatedTaskToList (task: any) {
            this.tasks.push(task)
        },
        updateTask (updated_task: any) {
           this.tasks.forEach(task =>  {
            if (task.id === updated_task.id){
                task.title = updated_task.title
                task.description = updated_task.description
            }
           })
        },
        deleteTask () {
            let index = this.tasks.findIndex(task => task.id === this.task.id)

            if (index !== -1) {
                this.tasks.splice(index, 1)
            }
        },

        resetTask () {
            this.task = {
                id: 0,
                title: '',
                description: '',
                status: "To Do",
                user_id: 0
            }
        },
    },
   
})
