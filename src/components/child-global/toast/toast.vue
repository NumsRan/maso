<script setup>
    import Button from '@/components/child-global/button.vue';

</script>

<template>
    <div class="toast-container">
        <div class="toast-header">
            <div>
                <img src="@/assets/icons/icon-maso.png" alt="Logo">
                <p>MASO</p>
            </div>
            <Button @click="closeModal" imgTarget="icon-close-toast" style="background-color: #fefefe;"/>
        </div>
        <div class="toast-content">
            <p>Column created successfully!</p>
        </div>
    </div>
</template>

<style scoped>
    .toast-container {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 300px;
        height: 100px;
        border-radius: 5px;
        background-color: #fefefe;
        box-shadow: #bababa 3px 2px 4px;
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