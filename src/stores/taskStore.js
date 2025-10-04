import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
    let id = 0

    const tasks = ref([])

    const createTask = (columnId, taskName, taskDescription) => {
        tasks.value.push({id: id++, columnId: columnId, title: taskName, description: taskDescription})
    }

    return { tasks, createTask }
})