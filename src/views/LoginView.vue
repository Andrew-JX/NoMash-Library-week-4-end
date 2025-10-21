<template>
  <div class="container mt-5">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label" for="u">Username</label>
        <input id="u" v-model="u" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="p">Password</label>
        <input id="p" type="password" v-model="p" class="form-control" />
      </div>
      <button class="btn btn-primary" type="submit">Sign in</button>
      <div v-if="msg" class="text-danger mt-2">{{ msg }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const u = ref('');
const p = ref('');
const msg = ref('');
const router = useRouter();

// hardcoded demo
const login = () => {
  if (u.value === 'admin' && p.value === 'secret') {
    localStorage.setItem('isAuthenticated', '1');
    router.push('/about');
  } else {
    msg.value = 'Invalid credentials';
  }
};
</script>
