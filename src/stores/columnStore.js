import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColumnStore = defineStore('columnStore', () => {
    let id = 0

    const columns = ref([])

    const createColumn = (columnName) => {
        columns.value.push({id: id++, title: columnName, tasksCount: 0})
    }

    return { columns, createColumn }
})