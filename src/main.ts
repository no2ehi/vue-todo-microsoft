import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import './style.css'

// Install Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
.use(pinia)
.use(router)
.mount('#app')
