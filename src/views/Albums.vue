<template>
  <div>
    <h1>Albums</h1>
    <ul>
      <li v-for="album in albums" :key="album.id">
        <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const albums = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
    albums.value = response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
});
</script>


<style>
.album-list {
  list-style-type: none;
  padding: 0;
}

.album-list li {
  margin: 5px 0;
}

.album-list li a {
  text-decoration: none;
  color: #3A82EE;
  padding: 5px;
  border-radius: 3px;
  transition: background-color 0.3s;
}

.album-list li a:hover {
  background-color: #f0f0f0;
}

/* Menyesuaikan dengan tampilan posts.vue */
.posts {
  background: linear-gradient(to bottom, #4e73df, #87b9f5); /* Gradient dari biru langit ke biru muda */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.posts h2 {
  color: #333; /* Warna teks */
}

.posts p {
  color: #666; /* Warna teks sekunder */
}
</style>
