<template>
  <div class="container">
    <h1 class="app-title">Simple Todo App</h1>
    <div class="todo-input-container">
      <input 
        type="text" 
        v-model="newTodo" 
        class="todo-input" 
        @keyup.enter="addTodo" 
        placeholder="Add new task..."
      />
      <button class="todo-button" @click="addTodo">Add</button>
    </div>

    <!-- Filter untuk tugas -->
    <div class="todo-filter">
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">All</button>
      <button @click="setFilter('active')" :class="{ active: filter === 'active' }">Active</button>
      <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
    </div>

    <!-- Daftar tugas -->
    <ul class="todo-list">
      <li 
        v-for="(todo, index) in filteredTodos" 
        :key="index" 
        class="todo-item" 
      >
        <!-- Checkbox untuk menandai tugas -->
        <input 
          type="checkbox" 
          v-model="todo.completed" 
          class="todo-checkbox"
        />
        
        <!-- Teks tugas, dengan efek hover -->
        <span 
          :class="{ 'completed': todo.completed }" 
          class="todo-text" 
          @dblclick="editTodo(todo)"
        >
          {{ todo.text }}
        </span>
        
        <!-- Tombol untuk menghapus tugas dengan efek hover -->
        <button class="todo-delete" @click="confirmDelete(index)">Delete</button>
      </li>
    </ul>

    <!-- Tombol untuk menghapus semua tugas -->
    <button class="todo-clear" @click="clearTodos">Clear All</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      filter: 'all',
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else {
        return this.todos; // Default: 'all'
      }
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = ''; // Reset input
      }
    },
    confirmDelete(index) {
      // Konfirmasi penghapusan tugas
      const confirmation = confirm("Apakah Anda yakin ingin menghapus tugas ini?");
      if (confirmation) {
        this.deleteTodo(index);
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1); // Hapus tugas
    },
    clearTodos() {
      // Konfirmasi sebelum menghapus semua tugas
      const confirmation = confirm("Apakah Anda yakin ingin menghapus semua tugas?");
      if (confirmation) {
        this.todos = []; // Hapus semua tugas
      }
    },
    setFilter(filter) {
      this.filter = filter; // Set filter
    },
    editTodo(todo) {
      // Mengedit teks tugas dengan prompt
      const newText = prompt("Edit tugas:", todo.text);
      if (newText && newText.trim() !== "") {
        todo.text = newText;
      }
    },
  },
  mounted() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  },
  watch: {
    todos: {
      handler(newTodos) {
        localStorage.setItem('todos', JSON.stringify(newTodos));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px; /* Lebar maksimum kontainer */
  margin: 20px auto; /* Pusatkan */
  padding: 20px; /* Ruang antara isi */
  background: linear-gradient(to right, #36d1dc, #5b86e5); /* Latar belakang gradien */
  border-radius: 10px; /* Tepi yang membulat */
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1); /* Bayangan lembut */
}

.app-title {
  color: white; /* Warna judul */
  text-align: center; /* Pusatkan teks */
  margin-bottom: 20px; /* Ruang antara judul dan komponen lainnya */
}

.todo-input {
  padding: 8px;
  border-radius: 4px; /* Tepi yang membulat */
  border: 1px solid #ddd; /* Batas input */
}

.todo-button {
  padding: 8px 16px;
  border-radius: 4px; /* Tepi membulat */
  border: none;
  background-color: #007bff; /* Warna biru */
  color: white; /* Teks putih */
  cursor: pointer;
}

.todo-button:hover {
  background-color: #0056b3; /* Warna saat hover */
}

.todo-filter {
  display: flex;
  justify-content: center; /* Jarak tombol filter */
  margin: 10px 0; /* Spasi antara komponen */
}

.todo-filter button {
  padding: 8px; /* Ukuran tombol */
  background-color: transparent; /* Tidak ada latar belakang */
  border: none; /* Tidak ada batas */
  color: white; /* Teks putih */
  cursor: pointer; /* Ubah kursor saat hover */
}

.todo-filter button.active {
  text-decoration: underline; /* Tandai filter aktif */
}

.todo-list {
  list-style: none; /* Hilangkan bullet */
  padding: 0; /* Hilangkan padding */
}

.todo-item {
  display: flex; /* Untuk menempatkan elemen saling bersebelahan */
  align-items: center;
  padding: 10px; /* Spasi antara item */
  border-bottom: 1px solid #ddd; /* Batas antar item */
}

.todo-item:last-child {
  border-bottom: none; /* Hilangkan batas untuk item terakhir */
}

.todo-checkbox {
  margin-right: 10px; /* Jarak antara checkbox dan teks */
}

.todo-text {
  flex-grow: 1; /* Agar teks tumbuh mengisi ruang */
  cursor: pointer; /* Ubah kursor saat hover */
}

.todo-text.completed {
  text-decoration: line-through; /* Coret teks jika selesai */
  color: #888; /* Warna yang lebih lembut */
}

.todo-delete {
  background-color: #ff4d4d; /* Warna merah untuk tombol hapus */
  color: white; /* Teks putih */
  border-radius: 4px; /* Tepi yang membulat */
  padding: 8px;
  cursor: pointer;
}

.todo-delete:hover {
  background-color: #e94e4e; /* Warna saat hover */
}
</style>
