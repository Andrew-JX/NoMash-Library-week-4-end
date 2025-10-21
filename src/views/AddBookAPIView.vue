<template>
  <div class="container mt-5">
    <h1>Add Book API</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="number" id="isbn" v-model.number="isbn" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Book Name</label>
        <input type="text" id="name" v-model="name" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <div v-if="msg" class="alert alert-success mt-3">{{ msg }}</div>

    <!-- Optional: Display list -->
    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '@/Firebase/init';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '@/components/BookList.vue';

const isbn = ref('');
const name = ref('');
const msg = ref('');

const addBook = async () => {
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value
    });
    msg.value = 'Book added successfully!';
    isbn.value = '';
    name.value = '';
  } catch (e) {
    console.error('Error adding book: ', e);
    msg.value = 'Error adding book!';
  }
};
</script>
