<template>
  <div>
    <h1>Photos in Album</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <ul v-else class="photo-list">
      <li v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const photos = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${route.params.id}/photos`);
    photos.value = response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
  } finally {
    loading.value = false;
  }
});

const showPhoto = (url) => {
  window.open(url, '_blank');
};
</script>

<style>
.loading {
  text-align: center;
  margin-top: 20px;
}
.photo-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.photo-item {
  display: inline-block;
  cursor: pointer;
}
.photo-item img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px;
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.photo-item img:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
