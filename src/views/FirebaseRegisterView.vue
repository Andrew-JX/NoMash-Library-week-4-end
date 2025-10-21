<template>
  <div class="container mt-5">
    <h1>Create an Account</h1>
    <p>
      <input type="text" placeholder="Email" v-model="email" class="form-control mb-2" />
    </p>
    <p>
      <input type="password" placeholder="Password" v-model="password" class="form-control mb-2" />
    </p>
    <p>
      <button class="btn btn-primary" @click="register">Save to Firebase</button>
    </p>
    <div v-if="err" class="text-danger mt-2">{{ err }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/Firebase/init.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const err = ref('');
const router = useRouter();

const register = () => {
  err.value = '';
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Register Successful!');
      router.push('/FireLogin');
    })
    .catch((error) => {
      console.log(error.code);
      err.value = error.code;
    });
};
</script>
