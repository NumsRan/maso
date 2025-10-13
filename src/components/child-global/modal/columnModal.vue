<script setup>
    import { ref, watch } from 'vue'
    import Button from '@/components/child-global/button.vue';
    import { useColumnStore } from '@/stores/columnStore';

    // SIGNAL TO OPEN MODAL
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

    // SIGNAL TO CLOSE MODAL
    const emits = defineEmits(['closeModal'])
    const closeModal = () => {
        emits('closeModal')
    }

    // CREATE COLUMN
    const columnsStore = useColumnStore()
    const columnName = ref('')

    function initCreateColumn() {
        if(columnName.value.trim().length > 0) {
            columnsStore.createColumn(columnName.value)
    
            columnName.value = ''
            emits('closeModal')
        }
    }

    // UPDATE COLUMN
    const newColumnTitle = ref('')

    // Initialise fields's value with the data getted by the props columnData
    watch(
        () => props.columnData,
        (newValue) => {
            newColumnTitle.value = newValue?.title || ''
        },
        { immediate: true }
    )

    // Update fields's value on input event
    function getColumnTitle(e) {
        newColumnTitle.value = e.target.value
    }

    function initUpdateColumn(id) {
        if(
            id !== '' &&
            newColumnTitle.value.trim().length > 0
        ) {
            columnsStore.updateColumn(id, newColumnTitle.value)

            emits('closeModal')
        }
    }

    // DELETE COLUMN
    function initDeleteColumn(id) {
        if(id !== '') {
            columnsStore.deleteColumn(id)
            
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