<script setup>
    import { ref } from 'vue'
    import Button from '../child-global/button.vue';
    import Task from './task.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import Modal from '../child-global/modal.vue';

    const columnsStore = useColumnStore()

    // Control Modal state
    const modalState = ref(false)
    const columnData = ref({})

    const count = ref([])

    function getTasksCount(tasksCount) {
        count.value.push(tasksCount.value)
    }
</script>

<template>
    <Modal :showModal="modalState" :columnModal="false" :columnData="columnData" titleModal="Add a task" @closeModal="modalState = false"/>
    <div v-for="column in columnsStore.columns" :key="column.id" class="column">
        <div class="column-header">
            <div class="header-title">
                <p>{{ column.title }}</p>
            </div>
            <div class="header-control">
                <span>{{ count[column.id]? count[column.id][1] : 0 }}</span>
                <img src="@/assets/icons/icon-dot.png" alt="Control">
            </div>
        </div>
        <div class="column-action">
            <Button style="background-color: #4eddcf;" @click="modalState = true; columnData = column;"/>
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