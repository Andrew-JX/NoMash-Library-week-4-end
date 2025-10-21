<!-- src/views/FirebaseSigninView.vue -->
<template>
  <div class="container mt-5">
    <h1>Sign in</h1>

    <p>
      <input type="text" class="form-control mb-2" placeholder="Email" v-model="email" autocomplete="username" />
    </p>

    <p>
      <input type="password" class="form-control mb-2" placeholder="Password" v-model="password"
        autocomplete="current-password" />
    </p>

    <p class="mb-3">
      <button class="btn btn-success me-2" @click="signin">Sign in via Firebase</button>
      <button class="btn btn-outline-secondary" @click="logout" v-if="currentUser">Logout</button>
    </p>

    <div class="mt-3">
      <strong>Current user:</strong>
      <pre class="mb-0">{{ currentUser || 'N/A' }}</pre>
    </div>

    <div class="mt-2" v-if="role">
      <strong>Role:</strong> {{ role }}
    </div>

    <div v-if="err" class="text-danger mt-2">{{ err }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/Firebase/init.js';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const email = ref('');
const password = ref('');
const err = ref('');
const currentUser = ref(null);
const role = ref('');
const router = useRouter();

// simple role mapping demo (for Week 7.2 screenshots)
const roleMap = {
  'admin@example.com': 'admin',
  'user@example.com': 'user'
};

// keep UI in sync with Firebase auth state
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user ? { uid: user.uid, email: user.email } : null;
    role.value = user ? (roleMap[user.email] || 'user') : '';
  });
});

const signin = () => {
  err.value = '';
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      // show in console for the required screenshot
      console.log('Firebase Signin Successful!');
      console.log(auth.currentUser);
      localStorage.setItem('isAuthenticated', '1');
      router.push('/'); // go home
    })
    .catch((error) => {
      console.log(error.code);
      err.value = error.code;
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('isAuthenticated');
      console.log('Signed out');
    })
    .catch((error) => {
      console.log(error.code);
      err.value = error.code;
    });
};
</script>

<style scoped></style>
