<template>
    <div>
      <h1>Daftar Kegiatan</h1>
      <ul>
        <li
          v-for="kegiatan in kegiatanList"
          :key="kegiatan.id"
          :class="{ completed: kegiatan.completed }"
        >
          <input
            type="checkbox"
            v-model="kegiatan.completed"
            @change="toggleCompletion(kegiatan.id)"
          />
          <span v-if="kegiatan.completed" style="text-decoration: line-through;">
            {{ kegiatan.name }}
          </span>
          <span v-else>{{ kegiatan.name }}</span>
          <button @click="removeKegiatan(kegiatan.id)">Batal</button>
        </li>
      </ul>
      <input
        type="text"
        v-model="newKegiatan"
        placeholder="Tambahkan kegiatan baru"
      />
      <button @click="addKegiatan">Tambahkan</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const kegiatanList = ref([
    { id: 1, name: 'Belajar HTML', completed: false },
    { id: 2, name: 'Belajar CSS', completed: false },
  ])
  
  const newKegiatan = ref('')
  
  const addKegiatan = () => {
    if (newKegiatan.value.trim() !== '') {
      kegiatanList.value.push({
        id: Date.now(),
        name: newKegiatan.value,
        completed: false,
      })
      newKegiatan.value = ''
    }
  }
  
  const removeKegiatan = (id) => {
    kegiatanList.value = kegiatanList.value.filter((k) => k.id !== id)
  }
  
  const toggleCompletion = (id) => {
    const kegiatan = kegiatanList.value.find((k) => k.id === id)
    if (kegiatan) {
      kegiatan.completed = !kegiatan.completed
    }
  }
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  