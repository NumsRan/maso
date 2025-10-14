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
    const nextStepTask = (taskId, columnId) => {
        const nextColumnId = columnId + 1
        const columns = columnStore.columns
        const isNextColumnExist = columns.filter((column) => column.id === nextColumnId).length

        if(isNextColumnExist) {
            tasks.value.forEach((task) => {
                if(task.id === taskId) {               
                    task.columnId = nextColumnId
                }
            })            
            return true
        }
        else {
            return false
        }
    }
    
    const prevStepTask = (taskId, columnId) => {
        const previousColumnId = columnId - 1
        const columns = columnStore.columns
        const isPreviousColumnExist = columns.filter((column) => column.id === previousColumnId).length

        if(isPreviousColumnExist) {
            tasks.value.forEach((task) => {
                if(task.id === taskId) {
                    task.columnId = previousColumnId
                }
            })
            return true
        }
        else {
            return false
        }
    }

    return { tasks, createTask, updateTask, deleteTask, nextStepTask, prevStepTask }
})