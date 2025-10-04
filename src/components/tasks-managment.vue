<script setup>
    import Column from './child-tasks-managment/column.vue';
    import Headers from './child-tasks-managment/headers.vue';

</script>

<template>
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