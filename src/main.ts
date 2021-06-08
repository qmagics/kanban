import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { store, key } from '@/store'
import 'vite-plugin-svg-icons/register';
import element from '@/plugins/element';
import global from '@/plugins/global';

import '@/mocks';

const app = createApp(App)

app.use(global)
app.use(router)
app.use(store, key)
app.use(element)

// permission
import './permission';


app.mount('#app')
