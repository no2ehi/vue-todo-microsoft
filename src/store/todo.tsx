import { defineStore } from 'pinia';
import { ref } from 'vue';
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  star: boolean;
}

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([]);

    function fetchTodos(): void {
        todos.value = JSON.parse(localStorage.getItem('todos') ?? '[]');
        // First use store
        if(todos.value.length > 0) {
            console.log('store')
            todos.value = JSON.parse(localStorage.getItem('todos') ?? '[]');
        } else {
            console.log('localStorage')
            todos.value = initializeTodo;
            localStorage.setItem('todos',JSON.stringify(todos.value));
        }
    }

    function addTask(task: Todo) {
        if(task.text.length > 0) {
            todos.value = [...todos.value, task];
            localStorage.setItem('todos',JSON.stringify(todos.value));
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
            localStorage.setItem('todos',JSON.stringify(updatedTodos));
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
            localStorage.setItem('todos',JSON.stringify(updatedTodos));
        }
    }

    function deleteTodo(taskId: number) {
        if(taskId) {
            const editedTodos = todos.value.filter((todo: Todo) => todo.id !== taskId);
            todos.value = editedTodos;
            localStorage.setItem('todos', JSON.stringify(editedTodos));
        
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
            localStorage.setItem('todos',JSON.stringify(updatedTodos));
        }
    }

    return {todos, fetchTodos, addTask, completeTask, starTask, deleteTodo, editTodo};
});

const initializeTodo: Todo[] = [
    {
        id: 1,
        text: 'Create Todo App with vue + TS + pinia',
        completed: false,
        star: false
    },
    {
        id: 2,
        text: 'Create Blog with api',
        completed: true,
        star: false
    },
    {
        id: 3,
        text: 'design todo app',
        completed: false,
        star: true
    },
];
