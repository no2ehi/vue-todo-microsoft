import { defineStore } from "pinia";
import { ref } from "vue";
import Todo from "../type/todo";
import Category from "../type/category";

export const useTodoStore = defineStore(
  "todo",
  () => {
    const todos = ref<Todo[]>([]);
    const categories = ref<Category[]>([]);
    const loading = ref<boolean>(false);
    let searchResult: Todo[] = [];
    let fitlerResult: Todo[] = [];

    function fetchTodos(): void {
      if (todos.value.length === 0) {
        todos.value = initializeTodo;
        categories.value = initializeCategories;
      }
    }

    function addTask(task: Todo) {
      if (task.text.length > 0) {
        todos.value = [task, ...todos.value];
      }
    }

    function completeTask(taskId: number) {
      if (taskId) {
        const updatedTodos = todos.value.map((todo: Todo) => {
          if (todo.id === taskId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        todos.value = updatedTodos;
      }
    }


    function starTask(taskId: number) {
      if (taskId) {
        const updatedTodos = todos.value.map((todo: Todo) => {
          if (todo.id === taskId) {
            return { ...todo, star: !todo.star };
          }
          return todo;
        });
        todos.value = updatedTodos;
      }
    }

    function deleteTodo(taskId: number) {
      if (taskId) {
        const editedTodos = todos.value.filter(
          (todo: Todo) => todo.id !== taskId
        );
        todos.value = editedTodos;
      }
    }

    function deleteDueDate(taskId: number) {
      if (taskId) {
        const editedTodos = todos.value.map(
          (todo: Todo) => todo.id === taskId ? {...todo, dueDate: ''} : todo
        );
        todos.value = editedTodos;
      }
    }

    function editTodo(todo: Todo) {
      if (todo.text.length > 0) {
        const updatedTodos = todos.value.map((oldTodo: Todo) => {
          if (oldTodo.id === todo.id) {
            return todo;
          }
          return oldTodo;
        });
        todos.value = updatedTodos;
      }
    }

    function searchTodo(text: string) {
      if (text.length) {
        loading.value = true;
        if (fitlerResult.length > 0) {
          searchResult = fitlerResult.filter((todo: Todo) =>
            todo.text.toLowerCase().includes(text.toLowerCase())
          );
          loading.value = false;
          return searchResult;
        }
        searchResult = todos.value.filter((todo: Todo) =>
          todo.text.toLowerCase().includes(text.toLowerCase())
        );
        loading.value = false;
        return searchResult;
      }
    }

    function clearSearchTodo() {
      searchResult = [];
    }

    function filterTodo(selectedCategories: string[]) {
      if (selectedCategories.length > 0) {
        loading.value = true;
        fitlerResult = todos.value.filter((todo: Todo) =>
          todo.categories.some((cat) => selectedCategories.includes(cat.name))
        );
        loading.value = false;
        return fitlerResult;
      }
    }

    function clearFilterTodo() {
      fitlerResult = [];
    }

    function addCategories(selectedTodoId: number, selectedcategory: Category) {
      if (selectedTodoId && selectedcategory) {
        let findTodo = todos.value.find((todo) => todo.id === selectedTodoId);
        let checkCategory = findTodo?.categories.filter(
          (category) => category.id === selectedcategory.id
        );
        if (findTodo && !((checkCategory?.length ?? 0) > 0)) {
          findTodo.categories.push(selectedcategory);
        }
      }
    }

    function sortTodos(type) {

    }

    return {
      todos,
      categories,
      fetchTodos,
      addTask,
      completeTask,
      starTask,
      deleteTodo,
      editTodo,
      searchTodo,
      filterTodo,
      addCategories,
      loading,
      searchResult,
      clearSearchTodo,
      fitlerResult,
      clearFilterTodo,
      deleteDueDate
    };
  },
  {
    persist: {
      key: "todos",
    },
  }
);

const initializeTodo: Todo[] = [
  {
    id: 1,
    text: "Create Todo App with vue + TS + pinia",
    categories: [
      { id: 1, name: "work" },
      { id: 3, name: "programming" },
    ],
    completed: false,
    star: false,
dueDate: '',
  },
  {
    id: 2,
    text: "Create Blog with api",
    categories: [
      { id: 1, name: "work" },
      { id: 3, name: "programming" },
    ],
    completed: true,
    star: false,
dueDate: '',
  },
  {
    id: 3,
    text: "design todo app",
    categories: [
      { id: 1, name: "work" },
      { id: 3, name: "programming" },
    ],
    completed: false,
    star: true,
dueDate: '',
  },
  {
    id: 4,
    text: "fix car",
    categories: [],
    completed: false,
    star: false,
dueDate: '',
  },
  {
    id: 5,
    text: "go to gym",
    categories: [{ id: 2, name: "hobbies" }],
    completed: true,
    star: false,
dueDate: '',
  },
  {
    id: 6,
    text: "buy a laptop ",
    categories: [{ id: 1, name: "work" }],
    completed: false,
    star: false,
dueDate: '',
  },
  {
    id: 7,
    text: "Learning English conversation",
    categories: [
      { id: 1, name: "work" },
      { id: 2, name: "hobbies" },
    ],
    completed: false,
    star: false,
    dueDate: '2023-05-25T10:30',
  },
  {
    id: 8,
    text: "Call to mostafa",
    categories: [{ id: 1, name: "work" }],
    completed: true,
    star: false,
dueDate: '',
  },
  {
    id: 9,
    text: "family meeting",
    categories: [{ id: 2, name: "hobbies" }],
    completed: false,
    star: true,
dueDate: '',
  },
  {
    id: 10,
    text: "Call to mostafa",
    categories: [{ id: 1, name: "work" }],
    completed: true,
    star: false,
dueDate: '',
  },
  {
    id: 11,
    text: "family meeting",
    categories: [{ id: 2, name: "hobbies" }],
    completed: false,
    star: true,
dueDate: '',
  },
  {
    id: 12,
    text: "Call to mostafa",
    categories: [{ id: 1, name: "work" }],
    completed: true,
    star: false,
dueDate: '',
  },
  {
    id: 13,
    text: "algorithm",
    categories: [{ id: 4, name: "book" }],
    completed: false,
    star: true,
dueDate: '',
  },
  {
    id: 14,
    text: "Driving car",
    categories: [{ id: 2, name: "hobbies" }],
    completed: false,
    star: true,
dueDate: '',
  },
  {
    id: 15,
    text: "sell car",
    categories: [{ id: 2, name: "hobbies" },{ id: 2, name: "work" }],
    completed: false,
    star: true,
dueDate: '',
  },
  {
    id: 16,
    text: "register a new car",
    categories: [{ id: 2, name: "hobbies" }],
    completed: true,
    star: false,
dueDate: '',
  },
  {
    id: 17,
    text: "learn speaking english completely",
    categories: [{ id: 2, name: "hobbies" }],
    completed: false,
    star: true,
    dueDate: '2023-05-28T10:30',
  },
  {
    id: 18,
    text: "read about svelte.js",
    categories: [{ id: 2, name: "hobbies" }],
    completed: true,
    star: false,
    dueDate: '2023-04-21T09:56',
  },
  {
    id: 19,
    text: "learn driving car to my brother",
    categories: [{ id: 2, name: "hobbies" }],
    completed: false,
    star: true,
    dueDate: '2023-06-10T08:45',
  },
];

const initializeCategories: Category[] = [
  {
    id: 1,
    name: "work",
  },
  {
    id: 2,
    name: "hobbies",
  },
  {
    id: 3,
    name: "programming",
  },
  {
    id: 4,
    name: "book",
  },
];
