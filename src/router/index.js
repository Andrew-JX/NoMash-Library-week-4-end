// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import AddBookView from '@/views/AddBookView.vue';
import GetBookCountView from '@/views/GetBookCountView.vue';
import AddBookAPIView from '@/views/AddBookAPIView.vue';
import WeatherView from '@/views/WeatherView.vue';
import GetAllBookAPI from '@/views/GetAllBookAPI.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/getbookcount', name: 'GetBookCount', component: GetBookCountView },
  { path: '/AddBookAPI', name: 'AddBookAPI', component: AddBookAPIView },
  { path: '/WeatherCheck', name: 'Weather', component: WeatherView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI },
  { path: '/GetAllBookAPI', name: 'GetAllBookAPI', component: GetAllBookAPI },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authed = localStorage.getItem('isAuthenticated') === '1';
  if (to.meta.requiresAuth && !authed) next({ name: 'Login' });
  else next();
});

export default router