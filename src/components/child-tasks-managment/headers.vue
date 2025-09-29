<script setup>
    import { ref } from 'vue'
    import Button from '../child-global/button.vue';

    const currentDate = ref(new Date().toLocaleString('en-US', {
        dateStyle: 'long'
    }))
</script>

<template>
    <p class="current-date">{{ currentDate }}</p>
    <div>
        <p class="title">Product Roadmap</p>
        <Button>
            <span class="slot">ADD TASK</span>
        </Button>
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

    .slot {
        margin-left: 5px;
    }
</style>