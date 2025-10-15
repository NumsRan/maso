<script setup>
    const props = defineProps({
        imgTarget: {
            type: String,
            default: 'icon-add'
        }
    })
    
    const target = new URL(`/src/assets/icons/${props.imgTarget}.png`, import.meta.url).href
</script>

<template>
    <button>
        <img :src="target" alt="Add">
        <slot></slot>
    </button>
</template>

<style scoped>
    button {
        background-color: #1d1f21;
        border-radius: 5px;
        color: #ffffff;
        border: none;
        padding: 8px;
        cursor: pointer;

        display: flex;
        align-items: center;
    }

    button:hover {
        opacity: .8;
    }

    img {
        width:18px
    }
</style>