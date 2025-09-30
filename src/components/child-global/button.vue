<script setup>

</script>

<template>
    <button>
        <img src="@/assets/icons/icon-add.png" alt="Add">
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
</style>