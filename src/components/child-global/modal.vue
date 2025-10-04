<script setup>
    import Button from './button.vue';

    defineProps({
        showModal: {
            type: Boolean,
            default: false
        }
    })

    const emits = defineEmits(['closeModal'])
    const closeModal = () => {
        emits('closeModal')
    }

</script>

<template>
    <div v-if="showModal" class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <p>Add column</p>
                <Button @click="closeModal" imgTarget="icon-close" style="background-color: #ec6666;"/>
            </div>
            <form class="modal-body">
                <input type="text" placeholder="Insert column's name...">
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
        background-color: #1d1f213d;
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
        margin-top: 16px;
    }

    .modal-header p {
        font-family: 'Roboto-Bold';
        font-size: 1.5em;
    }

    .modal-header,
    .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body input {
        width: 100%;
        height: 40px;
        padding: 0 8px;
        border: 1px solid #1d1f21;
    }

    .modal-body input:hover {
        border: .5px  solid #78fff2;
    }

    .modal-footer {
        justify-content: end;
    }

    .modal-footer button:last-child {
        margin-left: 10px;
    }
</style>