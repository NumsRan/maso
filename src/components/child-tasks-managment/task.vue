<template>
    <div class="task">
        <h1 class="task-title">Training Vue.js</h1>
        <p class="task-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum</p>
    </div>
</template>

<style scoped>
    .task {
        box-shadow: #bababa 3px 2px 4px;
        border: .5px solid #fefefe;
        background-color: #fefefe;
        margin-bottom: 16px;
        border-radius: 2px;
        padding: 8px;
    }

    .task:hover {
        border: .5px  solid #78fff2;
        box-shadow: none;
        cursor: pointer;
    }

    .task-title {
        font-family: 'Roboto-Bold';
        margin-bottom: 8px;
        font-size: 16px;
    }

    .task-description {
        font-family: 'Roboto-Medium';
        font-size: 12px;
    }
</style>