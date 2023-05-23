import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SearchView from '../views/SearchView.vue';
import TodoListViewVue from '../views/TodoListView.vue';
import FilteredView from '../views/FilteredView.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'todos', component: TodoListViewVue, beforeEnter: (to, from, next) => {
    if (!to.query.page) {
      next({ path: '/', query: { page: 1 } });
    } else {
      next();
    }
  } },
  { path: '/search/:term', name: 'search', component: SearchView },
  { path: '/filtered/:selectedCategories', name: 'filter', component: FilteredView },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
