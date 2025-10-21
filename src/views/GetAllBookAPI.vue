<template>
  <div class="container mt-5">
    <h1 class="mb-3">All Books (JSON)</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <pre v-else class="bg-light p-3 border rounded">{{ pretty }}</pre>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '@/Firebase/init';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const loading = ref(true);
const error = ref(null);
const books = ref([]);

const pretty = computed(() => JSON.stringify(books.value, null, 2));

onMounted(async () => {
  try {
    const q = query(collection(db, 'books'), orderBy('isbn'), limit(200));
    const snap = await getDocs(q);
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error(e);
    error.value = 'Failed to fetch books.';
  } finally {
    loading.value = false;
  }
});
</script>
