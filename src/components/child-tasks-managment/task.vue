<script setup>
    import { computed } from 'vue'
    import { useTaskStore } from '@/stores/taskStore'

    const props = defineProps({
        columnId: {
            type: Number,
            required: true
        }
    })

    // Get tasks's data from Pinia
    const tasksStore = useTaskStore()

    const currentTasks = computed(() => {
        return tasksStore.tasks.filter((task) => task.columnId === props.columnId)
    })
</script>

<template>
    <div v-for="task in currentTasks" :key="task.id" class="task">
        <h1 class="task-title">{{ task.title }}</h1>
        <p class="task-description">{{ task.description }}</p>
    </div>
</template>

<style scoped>
    .task {
        box-shadow: #bababa 3px 2px 4px;
        border: .5px solid #fefefe;
        background-color: #fefefe;
        margin-bottom: 16px;
        border-radius: 2px;
        padding: 8px;
    }

    .task:hover {
        border: .5px  solid #4eddcf;
        box-shadow: none;
        cursor: pointer;
    }

    .task-title {
        font-family: 'Roboto-Bold';
        margin-bottom: 8px;
        font-size: 16px;
    }

    .task-description {
        font-family: 'Roboto-Regular';
        font-size: 12px;
    }
</style>