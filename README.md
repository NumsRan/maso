# MASO
A dedicated platform to manage the entire lifecycle of a project, from the first exchanges to the delivery of an application.

## Screeshoot of the application
![alt text](image.png)

## Tools used for
* vue@3.5.22
* vite@7.1.7
* pinia@3.0.3

## Features currently available on the app
**Please note:** The current version is only the front-end portion of the application. There are no back-end features and no permanent data backup.
(Application under development)

We use Pinia as a state management pattern to make data accessible from any component.

### Column's feature
We created and used a store named **useColumnStore** for all the data and functionality of a column

PS : All data is stored in a array

```Javascript
    import { useColumnStore } from '@/stores/columnStore';
```

* Create, Update and Delete a column using **createColumn()**, **updateColumn()** and **deleteColumn()** methods

```Javascript
    export const useColumnStore = defineStore('columnStore', () => {
        let id = 0

        const columns = ref([])

        const createColumn = (columnName) => {
            columns.value.push({id: id++, title: columnName, tasksCount: 0})
        }

        const updateColumn = (columnId, newColumnName) => {
            columns.value.forEach((column) => {
                if(column.id === columnId) {
                    column.title = newColumnName
                }
            })
        }

        const deleteColumn = (columnId) => {
            // In a real use case, I must delete all tasks linked to this column before deleting the column itself
            columns.value = columns.value.filter(column => column.id !== columnId)
        }

        return { columns, createColumn, updateColumn, deleteColumn }
    })
```

In a modal, we call these methods using the following system

Eg. : 
To create a column, we get the name of the new column using the **columnName** variable and the **v-modal** directive on the input field.
The store provided by Pinia is stored into the **columnsStore** variable.
Next, we initialize the column creation functionality by running **initCreateColumn()** when the form is submitted.

```Javascript
    // CREATE COLUMN
    const columnsStore = useColumnStore()
    const columnName = ref('')

    function initCreateColumn() {
        if(columnName.value.trim().length > 0) {
            columnsStore.createColumn(columnName.value)
    
            columnName.value = ''
            emits('closeModal')
        }
    }
```

### Task's feature
We created and used a store named **useTaskStore** for all the data and functionality of a task

PS : All data is stored in a array

```Javascript
    import { useTaskStore } from '@/stores/taskStore';
```

* Create, Update and Delete a task using **createTask()**, **updateTask()** and **deleteTask()** methods

```Javascript
    export const useTaskStore = defineStore('taskStore', () => {
        let id = 0

        const tasks = ref([])
        const columnStore = useColumnStore()

        const createTask = (columnId, taskName, taskDescription) => {
            tasks.value.push({id: id++, columnId: columnId, title: taskName, description: taskDescription})
        }

        const updateTask = (taskId, newTaskName, newTaskDescription) => {
            tasks.value.forEach((task) => {
                if(task.id === taskId) {
                    task.title = newTaskName
                    task.description = newTaskDescription
                }
            })
        }

        const deleteTask = (taskId) => {
            tasks.value = tasks.value.filter(task => task.id !== taskId)
        }
        
        // Moving a task to the next or the previous step
        const nextStepTask = (taskId) => {
            tasks.value.forEach((task) => {
                if(task.id === taskId) {
                    const nextColumnId = task.columnId + 1
                    const columns = columnStore.columns
                    columns.forEach((column) => {
                        if(column.id === nextColumnId) {
                            task.columnId = nextColumnId
                        }
                    })
                }
            })
        }
        
        const prevStepTask = (taskId) => {
            tasks.value.forEach((task) => {
                if(task.id === taskId) {
                    const nextColumnId = task.columnId - 1
                    const columns = columnStore.columns
                    columns.forEach((column) => {
                        if(column.id === nextColumnId) {
                            task.columnId = nextColumnId
                        }
                    })
                }
            })
        }

        return { tasks, createTask, updateTask, deleteTask, nextStepTask, prevStepTask }
    })
```

* We move the position of the task using **nextStepTask()** and **prevStepTask()** methods by updating the column id

In a modal, we call these methods using the following system