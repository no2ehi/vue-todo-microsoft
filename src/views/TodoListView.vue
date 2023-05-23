<script setup lang="ts">
// vue
import { onMounted, ref, watch } from 'vue';

import { useRoute } from 'vue-router';
import { useTodoStore } from '../store/todo';

//components
import SortTask from '../components/sort/SortTask.vue';
import Pagination from '../components/pagination/Pagination.vue';

// types
import Todo from '../type/todo';
import Category from '../type/category';
import PaginationData from '../type/paginationData';

// icons
import { StarIcon } from '@heroicons/vue/24/outline';
import { ChevronRightIcon, ListBulletIcon, TrashIcon, PlusIcon, TagIcon } from '@heroicons/vue/24/solid';

const todoStore = useTodoStore();
todoStore.fetchTodos();

const route = useRoute()

const categories = ref<Category[]>(todoStore.categories);
const allTodos = ref<Todo[]>(todoStore.todos);
const todos = ref<Todo[]>(allTodos.value.filter((task: Todo) => !task.completed) || []);
const todosCompleted = ref<Todo[]>(allTodos.value.filter((task: Todo) => task.completed) || []);
const sortTodos = ref<boolean>(false);
const newTodo = ref<string>('');
const showEdit = ref<Boolean>(false);
const selectedEditTodo = ref<Todo | null>(null);
const showListCategory = ref<boolean>(false);

const paginationData: PaginationData = {
    currentPage: 1,
    pageSize: 5, 
    totalCount: allTodos.value.length
}

function addTask(): void {
    if(newTodo.value.trim().length > 0) {
        let newTask = {
            id: Date.now(),
            text: newTodo.value,
            completed: false,
            star: false,
        }
        todoStore.addTask(newTask);
        allTodos.value=todoStore.todos;
        todos.value = allTodos.value.filter((todo: Todo) => !todo.completed);
    }
    newTodo.value = '';
}

function completedTodoHandler(todoId?: number | null): void {
    if(todoId){
        todoStore.completeTask(todoId);
        allTodos.value=todoStore.todos;
        todos.value = allTodos.value.filter((task: Todo) => !task.completed) || [];
        todosCompleted.value = allTodos.value.filter((task: Todo) => task.completed) || [];
        selectedEditTodo.value = allTodos.value.find((todo: Todo) => todo.id === todoId) || null;
    }
}

function starTodoHandler(todoId?: number | null): void {
    if(todoId) {
        todoStore.starTask(todoId);
        allTodos.value=todoStore.todos;
        todos.value = allTodos.value.filter((task: Todo) => !task.completed) || [];
        todosCompleted.value = allTodos.value.filter((task: Todo) => task.completed) || [];
        selectedEditTodo.value = allTodos.value.find((todo: Todo) => todo.id === todoId) || null;
    }
}

function showEditTodo(todo: Todo):void {
    showEdit.value = true;
    selectedEditTodo.value = todo;
}

function editTodoHandler(todo?: Todo | null): void {
    if(todo && todo.text.length > 0) {
        todoStore.editTodo(todo);
    } else if(todo) {
        // delete todo when the text of todo is empty
        todoStore.deleteTodo(todo.id);
        showEdit.value = false;
        selectedEditTodo.value = null;
        allTodos.value=todoStore.todos;
        todos.value = allTodos.value.filter((task: Todo) => !task.completed) || [];
        todosCompleted.value = allTodos.value.filter((task: Todo) => task.completed) || [];
    }
}

function deleteTodoHandler(todoId?: number | null): void{
    if(todoId) {
        todoStore.deleteTodo(todoId);
        allTodos.value=todoStore.todos;
        todos.value = allTodos.value.filter((task: Todo) => !task.completed) || [];
        todosCompleted.value = allTodos.value.filter((task: Todo) => task.completed) || [];
        selectedEditTodo.value = allTodos.value.find((todo: Todo) => todo.id === todoId) || null;
    }
}

function sortedTodo(type: boolean) {
    sortTodos.value = type;
}

function paginationTodo() {
    const startIndex = (Number(route.query.page) - 1) * paginationData.pageSize
    const endIndex = startIndex + paginationData.pageSize
    const pagedTodos = allTodos.value.slice(startIndex, endIndex);
    todos.value = pagedTodos.filter((task: Todo) => !task.completed) || [];
    todosCompleted.value = pagedTodos.filter((task: Todo) => task.completed) || [];
}

function toggleListCategory() {
    showListCategory.value = !showListCategory.value;
}

function addCategories(category: Category) {
    if(category){
        todoStore.addCategories(category);
        showListCategory.value = false;
    }
}

onMounted(() => {
    paginationTodo()
});

watch(() => route.query.page, () => {
    paginationTodo()
});

watch(sortTodos, () => {
    if(sortTodos.value) {
        // ascending
        allTodos.value = allTodos.value.sort((a, b) => a.text.localeCompare(b.text)); 
    } else {
        // descending
        allTodos.value =  allTodos.value.sort((a, b) => b.text.localeCompare(a.text));
    }
    todos.value = allTodos.value.filter((task: Todo) => !task.completed) || [];
    todosCompleted.value = allTodos.value.filter((task: Todo) => task.completed) || [];
});



</script>

<template>
    <div class="w-4/5 flex bg-[#0b0b0b] overflow-none ">
        <div class="flex flex-col flex-grow pt-4 h-screen ">
            
            <div class="px-6">

                <div class="flex items-center mb-4 mr-2">
                    <div class="flex flex-grow items-center">
                        <ListBulletIcon class="h-6 w-6 text-blue-400" />
                        <h2 class="text-[#78bafd] text-xl ml-2">Front-end</h2>
                    </div>
                    <SortTask @sort="sortedTodo"/>
                    <Pagination :totalCount="paginationData.totalCount" :pageSize="paginationData.pageSize"/>
                </div>

                <div class="flex items-center bg-[#252423] rounded mb-3 mr-2">
                    <PlusIcon class="h-5 w-5 text-blue-400 ml-2" />
                    <input @keydown.enter="addTask" v-model="newTodo" class="flex-grow px-3 placeholder-blue-400 outline-none border-none bg-[#252423] text-white focus:outline-none" type="text" placeholder="add task...">
                    <button @click="addTask"  class="ml-auto py-0.5 m-3 px-4 rounded border border-slate-600 text-slate-200">Add</button>
                </div>
            </div>

            <div class="overflow-y-scroll px-6 pb-20">
                <div v-for="todo in todos" class="transition-all flex items-center px-3 py-4 rounded bg-[#2d2b2a] hover:bg-[#3b3a39] text-white cursor-pointer mb-2" @click.self="showEditTodo(todo)">
                    <button @click.stop="completedTodoHandler(todo.id)">
                        <div :class="['w-5 h-5 rounded-full transition-all', todo.completed ? 'bg-blue-400' : 'border border-blue-400 hover:bg-blue-400']">
                        </div>
                    </button>
                    <div class="flex-grow mx-4" @click.self="showEditTodo(todo)">{{ todo.text }}</div>
                    <button @click.stop="starTodoHandler(todo.id)">
                        <StarIcon :class="['h-6 w-6 text-blue-500', todo.star ? 'fill-blue-500' : '']" />
                    </button>
                </div>

                <div class="mt-2">
                    <div class="flex items-center mb-4">
                        <ChevronRightIcon class="h-5 w-5 text-stone-200" />
                        <h2 class="text-stone-200  ml-2">Completed</h2>
                    </div>

                    <div v-for="todo in todosCompleted" class="transition-all flex items-center px-3 py-4 rounded bg-[#2d2b2a] hover:bg-[#3b3a39] text-white cursor-pointer mb-2" @click="showEditTodo(todo)">
                        <button @click="completedTodoHandler(todo.id)">
                            <div :class="['w-5 h-5 rounded-full transition-all', todo.completed ? 'bg-blue-400 hover:bg-transparent hover:border hover:border-blue-400' : 'border border-blue-400 ']"></div>
                        </button>
                        <div class="flex-grow mx-4 line-through decoration-1 text-stone-300">{{ todo.text }}</div>
                        <button @click="starTodoHandler(todo.id)">
                            <StarIcon :class="['h-6 w-6 text-blue-500', todo.star ? 'fill-blue-500' : '']" />
                        </button>
                    </div>

                </div>
            </div>

        </div>

        <div v-if="showEdit && selectedEditTodo" class="w-[360px] min-h-screen  bg-[#252423] p-4">

            <div class="transition-all flex items-center px-3 py-4 rounded bg-[#2d2b2a] hover:bg-[#3b3a39] text-white cursor-pointer mb-2">
                <button @click="completedTodoHandler(selectedEditTodo?.id)">
                    <div :class="['w-5 h-5 rounded-full transition-all', selectedEditTodo?.completed ? 'bg-blue-400 hover:bg-transparent hover:border hover:border-blue-400' : 'border border-blue-400 hover:border-3']"></div>
                </button>

                <textarea @blur="editTodoHandler(selectedEditTodo)" type="text" v-model="selectedEditTodo.text" class=" h-auto w-full mx-2 resize-none decoration-1 text-stone-300 outline-none focus:outline-none bg-transparent" :class="selectedEditTodo?.completed ? 'line-through' : ''"  ></textarea>

                <button @click="starTodoHandler(selectedEditTodo?.id)">
                    <StarIcon :class="['h-6 w-6 text-blue-500', selectedEditTodo?.star ? 'fill-blue-500' : '']" />
                </button>
                
            </div>

            <div class="transition-all flex flex-col  px-3 py-4 rounded bg-[#2d2b2a] hover:bg-[#3b3a39] text-white cursor-pointer mb-2">
                <div class="flex justify-between mb-2 relative">
                    <div class="flex items-center">
                        <TagIcon class="w-4 h-4 mr-2 text-white" />
                        <h2 class="text-white">Categories:</h2>
                    </div>
                    <button @click="toggleListCategory" class="w-6 h-6 bg-blue-500 rounded-full hover:scale-110"><PlusIcon class="w-5 h-5 text-white mx-auto" /></button>

                    <div v-if="showListCategory" class="absolute top-7 right-2 w-[150px] h-auto flex flex-col bg-[#0b0b0b] border border-blue-400 rounded-md py-2 px-4 shadow">
                        <div v-for="category in categories" @click="addCategories(category)" :key="category.id" class="py-1.5">{{ category.name }}</div>
                    </div>

                </div>
                    <div v-for="(category, index) in selectedEditTodo.categories" :key="index" class="flex items-center">
                        <PlusIcon class="w-3 h-3 text-blue-400 mr-2" />{{ category }}
                    </div>
            </div>

            <div>
                <button class="flex items-center justify-center mt-8 text-white" @click="deleteTodoHandler(selectedEditTodo?.id)"><TrashIcon class='h-5 w-5 text-stone-300 mr-3'/>Delete Todo</button>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>