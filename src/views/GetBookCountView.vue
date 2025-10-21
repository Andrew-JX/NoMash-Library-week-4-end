<template>
  <div class="container mt-5">
    <h1>Book Counter</h1>
    <button class="btn btn-primary" @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null" class="mt-3">Total number of books: {{ count }}</p>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { count: null, error: null };
  },
  methods: {
    async getBookCount() {
      try {
        const { data } = await axios.get(
          'https://us-central1-fit5032-minyu-week7.cloudfunctions.net/countBooks'
        );
        this.count = data.count;
        this.error = null;
      } catch (err) {
        console.error('Error fetching book count:', err);
        this.error = String(err);
        this.count = null;
      }
    },
  },
};
</script>
