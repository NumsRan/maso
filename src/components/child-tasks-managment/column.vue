<script setup>
    import { ref } from 'vue'
    import Button from '@/components/child-global/button.vue';
    import Task from '@/components/child-tasks-managment/task.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import TaskModal from '@/components/child-global/modal/taskModal.vue';
    import ColumnModal from '@/components/child-global/modal/columnModal.vue';

    // Get column's data from Pinia
    const columnsStore = useColumnStore()

    // Control Modal state
    const modalState = ref(false)
    const columnModalState = ref(false)
    const columnData = ref({})
</script>

<template>
    <ColumnModal :showModal="columnModalState" :showColumnModal="false" :columnData="columnData" titleModal="Update column" @closeModal="columnModalState = false"/>
    <TaskModal :showModal="modalState" :showTaskModal="true" :columnData="columnData" titleModal="Create a task" @closeModal="modalState = false"/>
    <div v-if="columnsStore.columns.length > 0" v-for="column in columnsStore.columns" :key="column.id" class="column">
        <div class="column-header">
            <div class="header-title">
                <p>{{ column.title }}</p>
            </div>
            <div class="header-control">
                <span>{{ column.tasksCount }}</span>
                <a @click.prevent="columnModalState = true; columnData = column">
                    <img src="@/assets/icons/icon-dot.png" alt="Control">
                </a>
            </div>
        </div>
        <div class="column-action">
            <Button style="background-color: #4eddcf;" @click="modalState = true; columnData = column;"/>
            <span>Add a task</span>
        </div>
        <div class="column-tasks">
            <Task :columnId="column.id"/>
        </div>
    </div>
    <div v-else class="notification-text">
        <p>Start using app by creating column...</p>
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
    .header-control,
    .header-control a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }

    .column-header,
    .column-action {
        margin-bottom: 16px;
    }

    .header-control a {
        padding-left: 8px;
    }

    .header-control a:hover {
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

    .notification-text {
        width: 100%;
        padding: 8px;
    }

    .notification-text p {
        text-align: center;
    }
</style>