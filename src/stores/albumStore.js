import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
        // Handle error as needed (e.g., show error message to user)
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        this.photos = response.data;
      } catch (error) {
        console.error(`Error fetching photos for album ${albumId}:`, error);
        // Handle error as needed (e.g., show error message to user)
      }
    },
  },
});
