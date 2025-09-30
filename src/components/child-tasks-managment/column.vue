<script setup>
    import Button from '../child-global/button.vue';
    import Task from './task.vue';


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
            <Task/>
            <Task/>
            <Task/>
        </div>
    </div>
</template>

<style scoped>
    .column {
        width: 250px;
        padding: 8px;
        height: auto;
        font-size: 1.2em;
        margin-right: 16px;
    }

    .column-header, 
    .header-control {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .column-header,
    .column-action {
        margin-bottom: 16px;
    }

    .header-control img {
        padding-left: 8px;
    }

    .header-control img:hover {
        cursor: pointer;
        opacity: .8;
    }

    .column-action {
        display: flex;
        align-items: center;

        box-shadow: #bababa 0px 2px 4px;
        background-color: #fefefe;
        border-radius: 2px;
        padding: 8px;
    }

    .column-action span {
        margin-left: 8px;
    }
</style>