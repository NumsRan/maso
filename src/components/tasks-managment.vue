<script setup>
    import Column from '@/components/child-tasks-managment/column.vue';
    import Headers from '@/components/child-tasks-managment/headers.vue';
    import Toast from '@/components/child-global/toast/toast.vue';
    import { useToastStore } from '@/stores/toastStore';

    // Get toast's data from Pinia
    const toastStore = useToastStore()
    const toast = toastStore.toast

</script>

<template>
    <Toast :toastData="toast"/>
    <section class="container">
        <section class="head">
            <Headers/>
        </section>
        <section class="data">
            <Column/>
        </section>
    </section>
</template>

<style>
    .head {
        padding: 8px;
    }

    .data {
        display: flex;
        height: calc(100vh - 100px);
    }

    .btn-slot {
        margin-left: 5px;
    }
</style>