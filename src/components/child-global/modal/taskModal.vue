<script setup>
    import { ref, watch } from 'vue'
    import Button from '@/components/child-global/button.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import { useTaskStore } from '@/stores/taskStore';

    // SIGNAL TO OPEN MODAL and other data that the Modal needs
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
        taskData: {
            type: Object,
            default: {}
        },
        titleModal: {
            type: String,
            required: true
        }
    })

    // SIGNAL TO CLOSE MODAL
    const emits = defineEmits(['closeModal'])
    const closeModal = () => {
        emits('closeModal')
    }

    // CREATE TASKS
    const taskStore = useTaskStore()
    const taskTitle = ref('')
    const taskDescription = ref('')

    // Get columns's data store
    const columnStore = useColumnStore()
    const columns = columnStore.columns

    function initCreateTask() {
        if(
            taskTitle.value.trim().length > 0
        ) {
            taskStore.createTask(props.columnData.id, taskTitle.value, taskDescription.value.trim().length > 0? taskDescription.value : '...')

            /**
             * UPDATE column's data
             * Pinia provide a MutableReactiveHandler so we can directly apply changes on columns's properties here
             */
            columns.forEach((column) => {
                if(column.id === props.columnData.id) {
                    column.tasksCount++
                }
            })

            taskTitle.value = ''
            taskDescription.value = ''
            emits('closeModal')
        }
    }

    // UPDATE TASK
    const newTaskTitle = ref('')
    const newTaskDescription = ref('')

    // Get task's data store
    const tasks = taskStore.tasks

    // Initialise fields's value with the data getted by the props taskData
    watch(
        () => props.taskData,
        (newValue) => {
            newTaskTitle.value = newValue?.title || ''
            newTaskDescription.value = newValue?.description || ''
        },
        { immediate: true }
    )

    // Update fields's value on input event
    function getTaskTitle(e) {
        newTaskTitle.value = e.target.value
    }
    
    function getTaskDescription(e) {
        newTaskDescription.value = e.target.value
    }

    function initUpdateTask(id) {
        if(
            newTaskTitle.value.trim().length > 0
        ) {
            taskStore.updateTask(id, newTaskTitle.value, newTaskDescription.value.trim().length > 0? newTaskDescription.value : '...')
                
            emits('closeModal')
            /**
             * UPDATE task's data
             * Pinia provide a MutableReactiveHandler so we can directly apply changes on task's properties here
             */
            // tasks.forEach((task) => {
            //     if(task.id === props.taskData.id) {
            //         task.title = newTaskTitle.value
            //         task.description = newTaskDescription.value.trim().length > 0? newTaskDescription.value : '...'
    
            //     }

            //     emits('closeModal')
            // })
        }
    }

    // DELETE TASK
    function initDeleteTask(id) {
        if(id !== '') {
            taskStore.deleteTask(id)
        }
    }
</script>

<template>
    <div v-if="showModal" class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <p v-if="showTaskModal">
                    {{ titleModal }} <span>on {{ columnData.title }}</span>
                </p>
                <p v-else>
                    {{ titleModal }}
                </p>
                <Button @click="closeModal" imgTarget="icon-close" style="background-color: #ec6666;"/>
            </div>
            <form v-if="showTaskModal" @submit.prevent="initCreateTask" class="modal-body">
                <div class="modal-task-fields">
                    <input type="text" class="field" placeholder="Insert task's name..." v-model="taskTitle">
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
            <form v-else @submit.prevent="initUpdateTask(taskData.id)" class="modal-body">
                <div class="modal-task-fields">
                    <input type="text" class="field" placeholder="Insert task's name..." @input="getTaskTitle" :value="taskData.title">
                    <textarea class="field description" placeholder="Add some description..." @input="getTaskDescription" :value="taskData.description"></textarea>
                </div>
                <div class="modal-footer">
                    <Button style="background-color: #4eddcf;" imgTarget="icon-check">
                        <span class="btn-slot">Update</span>
                    </Button>
                    <Button @click="initDeleteTask(taskData.id)" imgTarget="icon-delete" style="background-color: #e23b3b;">
                        <span class="btn-slot">Delete</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>