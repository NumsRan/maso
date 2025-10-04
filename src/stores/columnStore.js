import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColumnStore = defineStore('columnStore', () => {
    // const columns = ref([])
    
    let id = 0

    const columns = ref([
        {id: id++, title: 'User Stories'},
        {id: id++, title: 'Issues & Requests'},
        {id: id++, title: 'Product Backlog'},
        {id: id++, title: 'To Do'},
        {id: id++, title: 'To Test'},
        {id: id++, title: 'Done'},
        {id: id++, title: 'Extrat'}
    ])

    const createColumn = (newColumn) => {
        columns.value.push({id: id++, title: newColumn, tasksCount: 0})
    }

    return { columns, createColumn }
})