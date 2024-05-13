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
  /* Efek transisi untuk tombol dan item */
button, .todo-item {
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s, color 0.3s;
}

/* Efek transisi saat hover pada tombol */
.todo-button:hover, .todo-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Efek transisi saat hover pada item todo */
.todo-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Efek transisi untuk checkbox */
.todo-checkbox {
  transition: transform 0.2s;
}

/* Efek transisi saat checkbox dicentang */
.todo-checkbox:checked {
  transform: scale(1.1);
}

/* Efek transisi pada teks todo saat hover */
.todo-text:hover {
  text-decoration: underline;
}

/* Efek transisi pada teks todo yang selesai */
.todo-text.completed {
  transition: color 0.3s;
}

/* Animasi untuk tombol Clear All */
.todo-clear {
  background-color: #ff6666; /* Warna merah */
  color: white; /* Teks putih */
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s, color 0.3s;
}

.todo-clear:hover {
  background-color: #ff4d4d; /* Warna merah gelap */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Animasi saat hover pada tombol filter */
.todo-filter button:hover {
  text-decoration: none;
}

/* Animasi saat filter aktif */
.todo-filter button.active {
  transform: scale(1.05);
}

  </style>