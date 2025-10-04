<script setup>
    import { ref } from 'vue'
    import Button from '../child-global/button.vue';
    import Task from './task.vue';

    let id = 0

    const columns = ref([
        {id: id++, column: 'User Stories'},
        {id: id++, column: 'Issues & Requests'},
        {id: id++, column: 'Product Backlog'},
        {id: id++, column: 'To Do'},
        {id: id++, column: 'To Test'},
        {id: id++, column: 'Done'},
        {id: id++, column: 'Extrat'}
    ])

    const count = ref([])

    function getTasksCount(tasksCount) {
        count.value.push(tasksCount.value)
    }
</script>

<template>
    <div v-for="column in columns" :key="column.id" class="column">
        <div class="column-header">
            <div class="header-title">
                <p>{{ column.column }}</p>
            </div>
            <div class="header-control">
                <span>{{ count[column.id]? count[column.id][1] : 0 }}</span>
                <img src="@/assets/icons/icon-dot.png" alt="Control">
            </div>
        </div>
        <div class="column-action">
            <Button style="background-color: #4eddcf;"/>
            <span>Add a task</span>
        </div>
        <div class="column-tasks">
            <Task :columnId="column.id" @tasksCount="getTasksCount"/>
        </div>
    </div>
</template>

<style scoped>
    .column {
        width: 250px;
        padding: 8px;
        height: auto;
        font-size: 1.2em;
        margin-right: 16px;
    }

    .column-header, 
    .header-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .column-header,
    .column-action {
        margin-bottom: 16px;
    }

    .header-control img {
        padding-left: 8px;
    }

    .header-control img:hover {
        cursor: pointer;
        opacity: .8;
    }

    .column-action {
        display: flex;
        align-items: center;

        box-shadow: #bababa 0px 2px 4px;
        background-color: #fefefe;
        border-radius: 2px;
        padding: 8px;
    }

    .column-action span {
        margin-left: 8px;
    }
</style>