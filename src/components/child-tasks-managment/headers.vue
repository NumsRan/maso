<script setup>
    import { ref } from 'vue'

    const currentDate = new Date().toLocaleString('en-US', {
        dateStyle: 'long'
    })
</script>

<template>
    <p class="current-date">{{ currentDate }}</p>
    <div>
        <p class="title">Product Roadmap</p>
        <button>ADD TASKS</button>
    </div>
</template>

<style scoped>
    .current-date {
        font-family: 'Roboto-Light';
        font-size: 1.5em;
        margin-bottom: 16px;
    }

    div {
        display: flex;
        justify-content: space-between;
    }

    div .title {
        font-family: 'Roboto-Bold';
        font-size: 2em;
    }
</style>