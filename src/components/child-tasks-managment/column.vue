<script setup>
    import Button from '../child-global/button.vue';


</script>

<template>
    <div class="column">
        <div class="column-header">
            <div class="header-title">
                <p>To-Do</p>
            </div>
            <div class="header-control">
                <span>6</span>
                <img src="@/assets/icons/icon-dot.png" alt="Control">
            </div>
        </div>
        <div class="column-action">
            <Button style="background-color: #78fff2;"/>
            <span>Add a task</span>
        </div>
        <div class="column-tasks">

        </div>
    </div>
</template>

<style scoped>
    .column {
        width: 200px;
        height: auto;
        font-size: 1.2em;
    }

    .column-header, 
    .header-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .column-header {
        margin-bottom: 16px;
    }

    .header-control span {
        margin-right: 8px;
    }

    .column-action {
        display: flex;
        align-items: center;

        background-color: #fefefe;
        padding: 8px;
    }

    .column-action span {
        margin-left: 8px;
    }
</style>