<template>
  <div class="mt-5">
    <h2>Book List (ISBN > 1000)</h2>
    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between">
        {{ book.isbn }} - {{ book.name }}
        <div>
          <button class="btn btn-sm btn-warning me-2" @click="updateBook(book.id)">Update</button>
          <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/Firebase/init';
import {
  collection, query, where, orderBy, limit,
  getDocs, doc, updateDoc, deleteDoc
} from 'firebase/firestore';

const books = ref([]);

const fetchBooks = async () => {
  books.value = [];
  const q = query(
    collection(db, 'books'),
    where('isbn', '>', 1000),
    orderBy('isbn'),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((d) => {
    books.value.push({ id: d.id, ...d.data() });
  });
};

const updateBook = async (id) => {
  const newName = prompt('Enter new book name:');
  if (newName) {
    await updateDoc(doc(db, 'books', id), { name: newName });
    fetchBooks();
  }
};

const deleteBook = async (id) => {
  if (confirm('Are you sure?')) {
    await deleteDoc(doc(db, 'books', id));
    fetchBooks();
  }
};

onMounted(fetchBooks);
</script>
