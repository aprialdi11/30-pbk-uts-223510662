import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar'; // Pastikan ini adalah cara impor yang benar sesuai dengan konfigurasi Quasar Anda
import 'quasar/dist/quasar.css';
import './main.css';

const app = createApp(App);
app.use(router);
app.use(Quasar); // Pastikan Anda menggunakan Quasar dengan cara yang sesuai

app.mount('#app');
