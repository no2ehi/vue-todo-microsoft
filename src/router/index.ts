import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TodoListViewVue from "../views/TodoListView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "todos",
    component: TodoListViewVue,
    beforeEnter: (to, _from, next) => {
      if (!to.query) {
        next({ path: "/", query: { page: 1 } });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
