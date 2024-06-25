<template>
  <div class="container">
    <!-- Header dengan navigasi -->
    <header>
      <nav>
        <ul>
          <li>
            <!-- Menggunakan RouterLink untuk navigasi -->
            <router-link to="/posts" class="nav-link">Posts</router-link>
          </li>
          <li>
            <router-link to="/todos" class="nav-link">Todos</router-link>
          </li>
          <li>
            <router-link to="/albums" class="nav-link">Albums</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <!-- Konten dinamis yang akan ditampilkan oleh Vue Router -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
// Export default untuk komponen App
export default {
  name: 'App',
};
</script>

<style>
/* Gaya CSS untuk container utama */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #87ceeb, #ffffff); /* Gradient dari biru langit ke putih */
  background-size: cover; /* Mengatur ukuran latar belakang agar menutupi seluruh area */
  background-repeat: no-repeat; /* Menghindari pengulangan latar belakang */
}






/* Gaya CSS untuk bagian header */
header {
  background: linear-gradient(to right, #3A82EE, #3F51B5); /* Gradient horizontal dari kiri ke kanan */
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Gaya CSS untuk daftar navigasi */
nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

/* Gaya CSS untuk setiap item dalam daftar navigasi */
nav ul li {
  margin: 0 15px;
}

/* Gaya CSS untuk RouterLink */
.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

/* Gaya CSS saat hover pada RouterLink */
.nav-link:hover {
  background-color: #6c5ce7;
}

/* Gaya CSS untuk konten utama */
.content {
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Gaya CSS untuk judul utama */
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Gaya CSS untuk daftar foto */
.photo-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 0;
  list-style: none;
}

/* Gaya CSS untuk setiap item foto */
.photo-item {
  cursor: pointer;
}

/* Gaya CSS untuk foto */
.photo-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

/* Gaya CSS saat hover pada foto */
.photo-item img:hover {
  transform: scale(1.05);
}
</style>
