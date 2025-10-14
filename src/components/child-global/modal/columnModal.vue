<script setup>
    import { ref, watch } from 'vue'
    import Button from '@/components/child-global/button.vue';
    import { useColumnStore } from '@/stores/columnStore';
    import { useToastStore } from '@/stores/toastStore';

    // DATA: used for the modal
    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false
        },
        showColumnModal: {
            type: Boolean,
            required: true
        },
        columnData: {
            type: Object,
            defaut: {}
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

    // DATA: used for column
    const columnsStore = useColumnStore()
    const columnName = ref('')

    
    // DATA: initialise fields's value with the data getted by the props columnData
    const newColumnTitle = ref('')
    watch(
        () => props.columnData,
        (newValue) => {
            newColumnTitle.value = newValue?.title || ''
        },
        { immediate: true }
    )

    // DATA: update fields's value on input event
    function getColumnTitle(e) {
        newColumnTitle.value = e.target.value
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

    // FUNCTION: CREATE COLUMN
    function initCreateColumn() {
        if(columnName.value.trim().length > 0) {
            columnsStore.createColumn(columnName.value)
            
            lunchNotification(true, `Column ${columnName.value.toUpperCase()} created successfully!`, success)

            columnName.value = ''
        }
        else {
            lunchNotification(true, `Please fill out the form!`, info)
        }

        emits('closeModal')
    }

    // FUNCTION: UPDATE COLUMN
    function initUpdateColumn(id) {
        if(
            id !== '' &&
            newColumnTitle.value.trim().length > 0
        ) {
            columnsStore.updateColumn(id, newColumnTitle.value)

            lunchNotification(true, `Column updated successfully!`, success)
        }
        else {
            lunchNotification(true, `Please fill out the form!`, info)
        }
        
        emits('closeModal')
    }

    // FUNCTION: DELETE COLUMN
    function initDeleteColumn(id) {
        if(id !== '') {
            columnsStore.deleteColumn(id)
            
            lunchNotification(true, `Column deleted successfully!`, danger)
        }
        else {
            lunchNotification(true, `Column removal error!`, danger)
        }
        
        emits('closeModal')
    }
</script>

<template>
    <div v-if="showModal" class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <p>
                    {{ titleModal }}
                </p>
                <Button @click="closeModal" imgTarget="icon-close" style="background-color: #ec6666;"/>
            </div>
            <form v-if="showColumnModal" @submit.prevent="initCreateColumn" class="modal-body">
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
            <form v-else @submit.prevent="initUpdateColumn(columnData.id)" class="modal-body">
                <div class="modal-column-fields">
                    <input type="text" class="field" placeholder="Insert column's name..." @input="getColumnTitle" :value="columnData.title">
                </div>
                <div class="modal-footer">
                    <Button imgTarget="icon-check" style="background-color: #4eddcf;">
                        <span class="btn-slot">Update</span>
                    </Button>
                    <Button @click="initDeleteColumn(columnData.id)" imgTarget="icon-delete" style="background-color: #e23b3b;">
                        <span class="btn-slot">Delete</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>