import { defineStore } from 'pinia';
import { ref } from 'vue';
import Todo from '../type/todo';
import Category from '../type/category';

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([]);
    const categories = ref<Category[]>([]);
    const loading = ref<boolean>(false);
    let searchResult: Todo[] = ([]);
    let fitlerResult: Todo[] = ([]);

    function fetchTodos(): void {
        if(todos.value.length === 0) {
            todos.value = initializeTodo;
            categories.value = initializeCategories;
        }
    }

    function addTask(task: Todo) {
        if(task.text.length > 0) {
            todos.value = [...todos.value, task];
        }
    }

    function completeTask(taskId: number) {
        if(taskId) {
            const updatedTodos = todos.value.map((todo: Todo) => {
                if(todo.id === taskId) {
                    return { ...todo, completed: !todo.completed}
                }
                return todo;
            })
            todos.value = updatedTodos;
        }
    }

    function starTask(taskId: number) {
        if(taskId) {
            const updatedTodos = todos.value.map((todo: Todo) => {
                if(todo.id === taskId) {
                    return { ...todo, star: !todo.star}
                }
                return todo;
            });
            todos.value = updatedTodos;
        }
    }

    function deleteTodo(taskId: number) {
        if(taskId) {
            const editedTodos = todos.value.filter((todo: Todo) => todo.id !== taskId);
            todos.value = editedTodos;
        
        }
    }

    function editTodo(todo: Todo) {
        if(todo.text.length > 0) {
            const updatedTodos = todos.value.map((oldTodo: Todo) => {
                if(oldTodo.id === todo.id) {
                    return todo;
                }
                return oldTodo;
            });
            todos.value = updatedTodos;
        }
    }

    function searchTodo(text: string) {
        if(text.length > 2) {
            loading.value = true;
            searchResult = todos.value.filter((todo: Todo) => todo.text.toLowerCase().includes(text.toLowerCase()));
            loading.value = false;
            return searchResult;
        }
    }

    function filterTodo(selectedCategories: string[]) {
        if(selectedCategories.length > 0) {
            loading.value = true;
            fitlerResult = todos.value.filter((todo: Todo) => todo.categories.some(cat => selectedCategories.includes(cat)))
            loading.value = false;
            return fitlerResult;
        }
    }

    function addCategories(category: Category) {
        if(category) {
             
        }
    }

    return {todos, categories, fetchTodos, addTask, completeTask, starTask, deleteTodo, editTodo, searchTodo, filterTodo, addCategories, loading, searchResult, fitlerResult};
},
{
    persist: {
        key: 'todos'
    },
  },
  );

const initializeTodo: Todo[] = [
    {
        id: 1,
        text: 'Create Todo App with vue + TS + pinia',
        categories: ['work','programming'],
        completed: false,
        star: false
    },
    {
        id: 2,
        text: 'Create Blog with api',
        categories: ['work','programming'],
        completed: true,
        star: false
    },
    {
        id: 3,
        text: 'design todo app',
        categories: ['work','programming'],
        completed: false,
        star: true
    },
    {
        id: 4,
        text: 'fix car',
        categories: [],
        completed: false,
        star: false
    },
    {
        id: 5,
        text: 'go to gym',
        categories: ['hobbies'],
        completed: true,
        star: false
    },
    {
        id: 6,
        text: 'buy a laptop ',
        categories: ['work'],
        completed: false,
        star: false
    },
    {
        id: 7,
        text: 'Learning English conversation',
        categories: ['work','hobbies'],
        completed: false,
        star: false
    },
    {
        id: 8,
        text: 'Call to mostafa',
        categories: ['work'],
        completed: true,
        star: false
    },
    {
        id: 9,
        text: 'family meeting',
        categories: ['hobbies'],
        completed: false,
        star: true
    },
    {
        id: 10,
        text: 'Call to mostafa',
        categories: ['work'],
        completed: true,
        star: false
    },
    {
        id: 11,
        text: 'family meeting',
        categories: ['hobbies'],
        completed: false,
        star: true
    },
    {
        id: 12,
        text: 'Call to mostafa',
        categories: ['work'],
        completed: true,
        star: false
    },
    {
        id: 13,
        text: 'algorithm',
        categories: ['book'],
        completed: false,
        star: true
    },
    {
        id: 14,
        text: 'learn driving car to my brother',
        categories: ['hobbies'],
        completed: false,
        star: true
    },
];

const initializeCategories: Category[] = [
    {
        id: 1,
        name: 'work'
    },
    {
        id: 2,
        name: 'hobbies'
    },
    {
        id: 1,
        name: 'programming'
    },
    {
        id: 1,
        name: 'book'
    },
]
