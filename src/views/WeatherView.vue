<template>
  <div class="container mt-5">
    <h1 class="mb-3">Weather</h1>

    <!-- 搜索城市 -->
    <div class="input-group mb-3">
      <input v-model="city" type="text" class="form-control" placeholder="e.g. Clayton, AU"
        @keyup.enter="searchByCity" />
      <button class="btn btn-primary" @click="searchByCity">Search</button>
    </div>

    <!-- 当前天气展示 -->
    <div v-if="weatherData" class="card p-3">
      <h2 class="h5 mb-2">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <div class="d-flex align-items-center">
        <img :src="iconUrl" alt="Weather Icon" width="60" height="60" class="me-3" />
        <div class="fs-4">{{ temperature }} °C</div>
      </div>
      <div class="text-muted mt-2">{{ weatherData.weather[0].description }}</div>
    </div>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
      error: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
        await this.fetchWeatherData(url);
      });
    },
    async searchByCity() {
      if (!this.city) return;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        this.city
      )}&appid=${API_KEY}&units=metric`;
      await this.fetchWeatherData(url);
    },
    async fetchWeatherData(url) {
      try {
        const { data } = await axios.get(url);
        this.weatherData = data;
        this.error = null;
      } catch (e) {
        console.error(e);
        this.error = 'Failed to fetch weather.';
        this.weatherData = null;
      }
    },
  },
};
</script>
