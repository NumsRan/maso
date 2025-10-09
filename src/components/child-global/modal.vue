<script setup>
    import { ref } from 'vue'
    import Button from './button.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import { useTaskStore } from '@/stores/taskStore';

    // Signal to open Modal
    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false
        },
        columnModal: {
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

    // Create column
    const columnsStore = useColumnStore()
    const columnName = ref('')

    function initCreateColumn() {
        if(columnName.value.trim().length > 0) {
            columnsStore.createColumn(columnName.value)
    
            columnName.value = ''
            emits('closeModal')
        }
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
                    {{ titleModal }}
                    <span v-if="!columnModal"> on {{ columnData.title }}</span>
                </p>
                <Button @click="closeModal" imgTarget="icon-close" style="background-color: #ec6666;"/>
            </div>
            <form v-if="columnModal" @submit.prevent="initCreateColumn" class="modal-body">
                <div class="modal-column-fields">
                    <input type="text" class="field" placeholder="Insert column's name..." v-model="columnName">
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
            <form v-else @submit.prevent="initCreateTask" class="modal-body">
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
        </div>
    </div>
</template>

<style scoped>
    .modal-container {
        width: 100vw;
        height: 100vh;
        background-color: #00040a9c;
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        width: 30%;
        min-width: 450px;
        min-height: 100px;
        background-color: #fefefe;
        box-shadow: #1d1f21 2px 2px 8px;
    }

    .modal-header,
    .modal-body {
        padding: 8px;
    }

    .modal-footer {
        margin-top: 8px;
    }

    .modal-header p {
        font-family: 'Roboto-Bold';
        font-size: 1.5em;
    }

    .modal-header p span {
        font-family: 'Roboto-Light';
    }

    .modal-header,
    .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body .field {
        width: 100%;
        height: 40px;
        padding: 0 8px;
        margin-bottom: 8px;
        border: 1px solid #1d1f21;
    }

    .modal-body .field:hover {
        border: .5px  solid #78fff2;
    }

    .modal-body .field.description {
        padding: 8px;
        height: 80px;
    }

    .modal-footer {
        justify-content: end;
    }

    .modal-footer button:last-child {
        margin-left: 10px;
    }
</style>