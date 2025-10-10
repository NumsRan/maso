<script setup>
    import { ref } from 'vue'
    import Button from '../button.vue';
    import { useColumnStore } from '@/stores/columnStore';

    // Signal to open Modal
    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false
        },
        showColumnModal: {
            type: Boolean,
            required: true
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
            <form v-else class="modal-body">
                <h1>Edit column</h1>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>