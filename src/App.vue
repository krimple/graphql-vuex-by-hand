<template>
  <div id="app">
    <h2>The one book</h2>
    <strong> {{ book ? book.title : 'Undefined' }} </strong> by {{ book ? book.author : 'Undefined'}}
    <p> {{ book ? book.description : 'Undefined'}}</p>

    <h2>All the books</h2>
    <ul v-for="book in bookList" :key="book.id">
      <li>
        <strong>{{ book.title }}</strong> by {{ book.author }}
        <p> {{ book.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['book', 'bookList'])
  },
  beforeCreate() {
    this.$store.dispatch('fetchBook', 1);
    this.$store.dispatch('fetchBookList');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
