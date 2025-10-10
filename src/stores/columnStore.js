import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColumnStore = defineStore('columnStore', () => {
    let id = 0

    const columns = ref([])

    const createColumn = (columnName) => {
        columns.value.push({id: id++, title: columnName, tasksCount: 0})
    }

    const updateColumn = (columnId, newColumnName) => {
        columns.value.forEach((column) => {
            if(column.id === columnId) {
                column.title = newColumnName
            }
        })
    }

    const deleteColumn = (columnId) => {
        // In a real use case, I must delete all tasks linked to this column before deleting the column itself
        columns.value = columns.value.filter(column => column.id !== columnId)
    }

    return { columns, createColumn, updateColumn, deleteColumn }
})