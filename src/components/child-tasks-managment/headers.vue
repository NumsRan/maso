<script setup>
    import { ref } from 'vue'
    import Button from '../child-global/button.vue';

    const currentDate = ref(new Date().toLocaleString('en-US', {
        dateStyle: 'long'
    }))
</script>

<template>
    <div class="header">
        <p class="header-date">{{ currentDate }}</p>
        <div class="header-action">
            <p class="header-title">Product Roadmap</p>
            <Button>
                <span class="slot">ADD TASK</span>
            </Button>
        </div>
    </div>
</template>

<style scoped>
    .header {
        margin-bottom: 16px;
    }

    .header-date {
        font-family: 'Roboto-Light';
        font-size: 1.5em;
        margin-bottom: 8px;
    }

    .header-action {
        display: flex;
        justify-content: space-between;
    }

    div .header-title {
        font-family: 'Roboto-Bold';
        font-size: 2em;
    }

    .slot {
        margin-left: 5px;
    }
</style>