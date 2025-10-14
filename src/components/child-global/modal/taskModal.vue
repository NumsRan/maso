<script setup>
    import { ref, watch } from 'vue'
    import Button from '@/components/child-global/button.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import { useTaskStore } from '@/stores/taskStore';
    import { useToastStore } from '@/stores/toastStore';

    // DATA: used for the modal
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

    // DATA: used for the toast
    const toastStore = useToastStore()
    const info = '#0d6efd'
    const danger = '#db3545'
    const success = '#198754'

    // DATA: used for task
    const taskStore = useTaskStore()
    const taskTitle = ref('')
    const taskDescription = ref('')

    // DATA: Get columns's data store
    const columnStore = useColumnStore()

    // DATA: Get correct column id
    const columnId = ref(null)
    watch(
        () => props.columnData,
        (newValue) => {
            columnId.value = newValue?.id
        }
    )

    // DATA: get new information to update a column
    const newTaskTitle = ref('')
    const newTaskDescription = ref('')

    // DATA: initialise fields's value with the data getted by the props taskData
    watch(
        () => props.taskData,
        (newValue) => {
            newTaskTitle.value = newValue?.title || ''
            newTaskDescription.value = newValue?.description || ''
        },
        { immediate: true }
    )

    // DATA: update fields's value on input event
    function getTaskTitle(e) {
        newTaskTitle.value = e.target.value
    }
    
    function getTaskDescription(e) {
        newTaskDescription.value = e.target.value
    }


    // FUNCTION: NOTIFICATION
    function lunchNotification(isShow, message, type) {
        // Show notification
        toastStore.toastConfig(isShow, message, type)

        // Hide notification
        setTimeout(() => {
            toastStore.toastConfig(false, '')
        }, 5000)
    }

    // FUNCTION: CLOSE MODAL
    const emits = defineEmits(['closeModal'])
    const closeModal = () => {
        emits('closeModal')
    }

    // FUNCTION: CREATE TASK
    function initCreateTask() {
        if(
            taskTitle.value.trim().length > 0
        ) {
            const isTaskCreated = taskStore.createTask(columnId.value, taskTitle.value, taskDescription.value.trim().length > 0? taskDescription.value : '...')
            if(isTaskCreated) {
                columnStore.increaseTaskCount(columnId.value)

                lunchNotification(true, `Task ${taskTitle.value.toUpperCase()} created successfully!`, success)

                taskTitle.value = ''
                taskDescription.value = ''
            }
        }
        else {
            lunchNotification(true, `Please fill out the task name!`, info)
        }

        emits('closeModal')
    }

    // FUNCTION: UPDATE TASK
    function initUpdateTask(id) {
        if(
            id !== '' &&
            newTaskTitle.value.trim().length > 0
        ) {
            taskStore.updateTask(id, newTaskTitle.value, newTaskDescription.value.trim().length > 0? newTaskDescription.value : '...')
            lunchNotification(true, `Task updated successfully!`, success)
        }
        else {
            lunchNotification(true, `Please fill out the task name!`, info)
        }

        emits('closeModal')
    }

    // FUNCTION: DELETE TASK
    function initDeleteTask(id, columnId) {
        if(id !== '') {
            const isTaskDeleted = taskStore.deleteTask(id)
            if(isTaskDeleted) {
                columnStore.decreaseTaskCount(columnId)
                lunchNotification(true, `Task deleted successfully!`, danger)
            }
        }
        else {
            lunchNotification(true, `Task removal error!`, danger)
        }

        emits('closeModal')
    }

    // FUNCTION: MOVE TASK TO THE NEXT STEP
    function initNextStepTask(id, columnId) {
        if(id !== '') {
            const isTaskMoved = taskStore.nextStepTask(id, columnId)
            if(isTaskMoved) {
                columnStore.decreaseTaskCount(columnId)
                columnStore.increaseTaskCount(columnId + 1)
                lunchNotification(true, `Task moved successfully to the NEXT step!`, success)
            }
            else {
                lunchNotification(true, `No column on the next step!`, danger)
            }
        }
        else {
            lunchNotification(true, `No task selected!`, danger)
        }

        emits('closeModal')
    }

    // FUNCTION: MOVE TASK TO THE PREVIOUS STEP
    function initPreviousStepTask(id, columnId) {
        if(id !== '') {
            const isTaskMoved = taskStore.prevStepTask(id, columnId)
            if(isTaskMoved) {
                columnStore.decreaseTaskCount(columnId)
                columnStore.increaseTaskCount(columnId - 1)
                lunchNotification(true, `Task moved successfully to the PREVIOUS step!`, success)
            }
            else {
                lunchNotification(true, `No column on the previous step!`, danger)
            }
        }
        else {
            lunchNotification(true, `No task selected!`, danger)
        }

        emits('closeModal')
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
                <div class="modal-control modal-footer">
                    <Button @click="initPreviousStepTask(taskData.id, taskData.columnId)" style="background-color: #fefefe;" imgTarget="icon-prev" title="Previous step"/>
                    <Button @click="initNextStepTask(taskData.id, taskData.columnId)" style="background-color: #fefefe;" imgTarget="icon-next" title="Next step"/>
                </div>
                <div class="modal-footer">
                    <Button style="background-color: #4eddcf;" imgTarget="icon-check">
                        <span class="btn-slot">Update</span>
                    </Button>
                    <Button @click="initDeleteTask(taskData.id, taskData.columnId)" imgTarget="icon-delete" style="background-color: #e23b3b;">
                        <span class="btn-slot">Delete</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>