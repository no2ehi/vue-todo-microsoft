import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import './style.css'

const app = createApp(App)
const pinia = createPinia();

// Install Pinia
app.use(pinia)

createApp(App).mount('#app')
