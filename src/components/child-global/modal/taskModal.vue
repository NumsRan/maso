<script setup>
    import { ref } from 'vue'
    import Button from '../button.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import { useTaskStore } from '@/stores/taskStore';

    // Signal to open Modal
    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false
        },
        showTaskModal: {
            type: Boolean,
            required: true
        },
        columnData: {
            type: Object,
            default: {}
        },
        titleModal: {
            type: String,
            required: true
        }
    })

    // Signal to close Modal
    const emits = defineEmits(['closeModal'])
    const closeModal = () => {
        emits('closeModal')
    }

    // Create taks
    const taskStore = useTaskStore()
    const taskName = ref('')
    const taskDescription = ref('')

    function initCreateTask() {
        if(
            taskName.value.trim().length > 0 && 
            taskDescription.value.trim().length > 0
        ) {
            taskStore.createTask(props.columnData.id, taskName.value, taskDescription.value)

            /**
             * UPDATE column's data
             * Pinia provide a MutableReactiveHandler so we can directly apply changes on columns's properties here
             */

            // Get columns's data store
            const columnsStore = useColumnStore()

            const columns = columnsStore.columns
            columns.forEach((column) => {
                if(column.id === props.columnData.id) {
                    column.tasksCount++
                }
            })

            taskName.value = ''
            taskDescription.value = ''
            emits('closeModal')
        }
    }
</script>

<template>
    <div v-if="showModal" class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <p>
                    {{ titleModal }} <span>on {{ columnData.title }}</span>
                </p>
                <Button @click="closeModal" imgTarget="icon-close" style="background-color: #ec6666;"/>
            </div>
            <form v-if="showTaskModal" @submit.prevent="initCreateTask" class="modal-body">
                <div class="modal-task-fields">
                    <input type="text" class="field" placeholder="Insert task's name..." v-model="taskName">
                    <textarea class="field description" placeholder="Add some description..." v-model="taskDescription"></textarea>
                </div>
                <div class="modal-footer">
                    <Button style="background-color: #4eddcf;">
                        <span class="btn-slot">Add</span>
                    </Button>
                    <Button @click="closeModal" imgTarget="icon-close" style="background-color: #ec6666;">
                        <span class="btn-slot">Cancel</span>
                    </Button>
                </div>
            </form>
            <form v-else class="modal-body">
                <h1>Edit task</h1>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>