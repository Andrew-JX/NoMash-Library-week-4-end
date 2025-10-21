<template>
  <div class="container mt-5">
    <h1 class="mb-3">CountBook API (JSON)</h1>

    <pre v-if="json" class="bg-light p-3 border rounded">{{ json }}</pre>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CountBookAPI',
  data() {
    return {
      json: '',
      error: null,
    };
  },
  async mounted() {
    try {
      //  URL
      const { data } = await axios.get(
        'https://us-central1-fit5032-minyu-week7.cloudfunctions.net/countBooks'
      );
      //  JSON 
      this.json = JSON.stringify(data, null, 2);
    } catch (e) {
      console.error(e);
      this.error = 'Failed to load API.';
    }
  },
};
</script>
