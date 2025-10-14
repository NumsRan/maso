import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useColumnStore } from '@/stores/columnStore'

export const useTaskStore = defineStore('taskStore', () => {
    let id = 0

    const tasks = ref([])
    const columnStore = useColumnStore()

    const createTask = (columnId, taskName, taskDescription) => {
        const isTaskCreated = tasks.value.push({id: id++, columnId: columnId, title: taskName, description: taskDescription})
        return isTaskCreated? true : false
    }

    const updateTask = (taskId, newTaskName, newTaskDescription) => {
        tasks.value.forEach((task) => {
            if(task.id === taskId) {
                task.title = newTaskName
                task.description = newTaskDescription
            }
        })
    }

    const deleteTask = (taskId) => {
        tasks.value = tasks.value.filter(task => task.id !== taskId)
        return tasks.value? true : false
    }
    
    // Moving a task to the next or the previous step
    const nextStepTask = (taskId) => {
        tasks.value.forEach((task) => {
            if(task.id === taskId) {
                const nextColumnId = task.columnId + 1
                const columns = columnStore.columns
                columns.forEach((column) => {
                    if(column.id === nextColumnId) {
                        task.columnId = nextColumnId
                    }
                })
            }
        })
        return tasks.value? true : false
    }
    
    const prevStepTask = (taskId) => {
        tasks.value.forEach((task) => {
            if(task.id === taskId) {
                const nextColumnId = task.columnId - 1
                const columns = columnStore.columns
                columns.forEach((column) => {
                    if(column.id === nextColumnId) {
                        task.columnId = nextColumnId
                    }
                })
            }
        })
        return tasks.value? true : false
    }

    return { tasks, createTask, updateTask, deleteTask, nextStepTask, prevStepTask }
})