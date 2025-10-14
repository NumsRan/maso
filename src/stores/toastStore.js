import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore  = defineStore('toastStore', () => {
    /**
     * @type {isShow: Boolean, message: String}
     */
    const toast = ref({isShow: false, message: '', color: ''})

    const toastConfig = (isShow, message, color) => {
        toast.value.isShow = isShow
        toast.value.message = message
        toast.value.color = color
    }

    return {toast, toastConfig}
})