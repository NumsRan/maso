import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore  = defineStore('toastStore', () => {
    /**
     * @type {isShow: Boolean, message: String}
     */
    const toast = ref({isShow: false, message: ''})

    const toastConfig = (isShow, message) => {
        toast.value.isShow = isShow
        toast.value.message = message
    }

    return {toast, toastConfig}
})