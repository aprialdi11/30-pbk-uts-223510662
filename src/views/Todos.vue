<template>
  <div class="app">
    <div class="greeting">
      <h1 class="title">Todo List</h1>
    </div>

    <div class="create-todo">
      <input type="text" placeholder="Enter your todo..." v-model="newTodo">
      <div class="options">
        <label>
          <input type="radio" v-model="todoType" value="personal"> Personal
          <span class="bubble personal"></span>
        </label>
        <label>
          <input type="radio" v-model="todoType" value="college"> College
          <span class="bubble college"></span>
        </label>
      </div>
      <input type="submit" value="Add Todo" @click="addTodo">
    </div>

    <div class="todo-list">
      <div v-for="(todo, index) in todos" :key="index" :class="['todo-item', { 'done': todo.done }]">
        <div>{{ todo.text }}</div>
        <div class="actions">
          <button class="edit" @click="toggleDone(index)">{{ todo.done ? 'Undo' : 'Done' }}</button>
          <button class="delete" @click="deleteTodo(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todoType: 'personal',
      todos: []
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          text: this.newTodo,
          type: this.todoType,
          done: false
        });
        this.newTodo = '';
      }
    },
    toggleDone(index) {
      this.todos[index].done = !this.todos[index].done;
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background-color: #4e73df; /* Warna latar belakang biru */
  padding: 20px;
  min-height: 100vh;
}

.greeting {
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.create-todo,
.todo-list {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: 1px solid #ffffff; /* Garis putih di tepian */
}

.create-todo {
  display: flex;
  flex-direction: column;
}

.create-todo input[type="text"] {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.options label {
  display: flex;
  align-items: center;
}

.options label input[type="radio"] {
  margin-right: 5px;
}

.todo-list .todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.todo-list .todo-item.done {
  background-color: #d4edda;
}

.todo-list .todo-item .actions button {
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.todo-list .todo-item .actions button.edit {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.todo-list .todo-item .actions button.edit:hover {
  background-color: #0056b3;
}

.todo-list .todo-item .actions button.delete {
  background-color: #dc3545;
  color: #fff;
  border: none;
}

.todo-list .todo-item .actions button.delete:hover {
  background-color: #c82333;
}

.bubble {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

.bubble.personal {
  background-color: #007bff;
}

.bubble.college {
  background-color: #ffc107;
}
</style>
