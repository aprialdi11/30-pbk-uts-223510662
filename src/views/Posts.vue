<template>
  <div class="container">
    <div class="select-user">
      <label for="user">Select User:</label>
      <select id="user" v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <table v-if="posts.length > 0" class="post-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="posts.length === 0 && !loading" class="loading">No posts found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: null,
      users: [], // Assuming you populate this array with user data
      posts: [], // Assuming you populate this array with posts data
      loading: false
    };
  },
  methods: {
    fetchPosts() {
      // Implement your API call to fetch posts based on selectedUser
      // Example:
      this.loading = true;
      fetch(`http://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
        .then(response => response.json())
        .then(posts => {
          this.posts = posts;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          this.loading = false;
        });
    }
  },
  mounted() {
    // Fetch initial user data or set up as needed
    // Example:
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        this.users = users;
        this.selectedUser = users[0].id; // Select the first user by default
        this.fetchPosts(); // Fetch posts for the default user
      })
      .catch(error => console.error('Error fetching users:', error));
  }
};
</script>

<style>
/* Your CSS styles here */
.select-user {
  margin-bottom: 20px;
}

.select-user label {
  margin-right: 10px;
}

.select-user select {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.post-list {
  margin-top: 20px;
}

.loading {
  margin-top: 20px;
  text-align: center;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

.post-table th {
  background-color: #3A82EE;
  color: #fff;
  font-weight: bold;
  padding: 10px;
}

.post-table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.post-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.post-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.post-table tbody tr:hover {
  background-color: #cceeff;
}
</style>
