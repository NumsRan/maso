<script setup>
    import { computed, ref } from 'vue'

    const props = defineProps({
        columnId: {
            type: Number,
            required: true
        }
    })

    let id = 0

    const tasks = ref([
        {id: id++, columnId: 0, title: 'Training Vue.js', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 0, title: 'Training Nuxt.js', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 1, title: 'Training React.js', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 1, title: 'Training Next.js', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 2, title: 'Training TypeScript', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 2, title: 'Training Angular', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 5, title: 'Training PHP', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 5, title: 'Training Symfony', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 5, title: 'Training Laravel', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 6, title: 'Training Python', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 6, title: 'Training Django', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 6, title: 'Training Web Scraping', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 3, title: 'Training Javascript', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
        {id: id++, columnId: 1, title: 'Training DevOps', description: 'Ipsum dolor sit amet consectetur adipisicing elit. Numquam facere corporis at ea est magni repudiandae earum'},
    ])

    const currentTasks = computed(() => {
        return tasks.value.filter((task) => task.columnId === props.columnId)
    })
</script>

<template>
    <div v-for="task in currentTasks" :key="task.id" class="task">
        <h1 class="task-title">{{ task.title }}</h1>
        <p class="task-description">{{ task.description }}</p>
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
        font-family: 'Roboto-Regular';
        font-size: 12px;
    }
</style>