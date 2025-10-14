<script setup>
    import Button from '@/components/child-global/button.vue';
    import { useToastStore } from '@/stores/toastStore';

    // LUNCH TOAST
    const props = defineProps({
        toastData: {
            type: Object,
            default: {isShow: false, message: '', color: ''}
        }
    })

    // Get toast's data from Pinia
    const toastStore = useToastStore()
</script>

<template>
    <transition name="toast">
        <div v-if="toastData.isShow" class="toast-container">
            <div class="toast-header">
                <div>
                    <img src="@/assets/icons/icon-maso.png" alt="Logo">
                    <p>MASO</p>
                </div>
                <Button @click="toastStore.toastConfig(false, '')" imgTarget="icon-close-toast" style="background-color: #fefefe;"/>
            </div>
            <div class="toast-content">
                <p :style="{color: toastData.color}">{{ toastData.message }}</p>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .toast-container {
        z-index: 1000;
        position: fixed;
        right: 10px;
        bottom: 10px;
        width: 300px;
        height: 100px;
        border-radius: 5px;
        background-color: #fefefe;
        box-shadow: #bababa 3px 2px 4px;
    }

    /* SHOW TOAST */
    .toast-enter-from { 
        opacity: 0; 
        transform: translateX(350px); 
    }

    .toast-enter-active { 
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .toast-enter-to { 
        opacity: 1; 
        transform: translateX(0); 
    }

    /* HIDE TOAST */
    .toast-leave-from {
        opacity: 1;
        transform: translateX(0);
    }

    .toast-leave-active {
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .toast-leave-to {
        opacity: 0;
        transform: translateX(350px);
    }

    .toast-header,
    .toast-content {
        padding: 8px;
    }

    .toast-header,
    .toast-header div {
        display: flex;
        align-items: center;
    }

    .toast-header {
        justify-content: space-between;
        border-bottom: 1px solid #b4b4b4;
    }

    .toast-header p {
        font-family: 'Roboto-Bold';
    }

    .toast-header img {
        width: 20px;
        margin-right: 8px;
    }

    .toast-content p {
        font-family: 'Roboto-Medium';
    }
</style>