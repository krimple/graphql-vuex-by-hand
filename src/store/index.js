import Vue from 'vue';
import Vuex from 'vuex';
import apolloClient from '../utils/apollows-client.js';
import gql from 'graphql-tag';

Vue.use(Vuex);

export const mutations = {
  setBook(state, book) {
    state.book = book;
  },
  setBookList(state, bookList) {
    state.bookList = bookList;
  }
};

export const actions = {
  async fetchBook({ commit }, id) {
    const BOOK_QUERY = gql`
        query Book($bookId: ID!) {
          book(id: $bookId) {
            id
            title
            author
            description
          }
        }
    `;
    console.log('gql', BOOK_QUERY);
    debugger;
    const response = await apolloClient.query({ query: BOOK_QUERY , variables: { bookId: id }});
    commit('setBook', response.data.book);
  },
  async fetchBookList({ commit }) {
    const BOOKLIST_QUERY = gql`
         query BookList {
          bookList {
            id
            title
            author
            description
          }
        }
    `;
    const response = await apolloClient.query({ query: BOOKLIST_QUERY});
    commit('setBookList', response.data.bookList);
  }
};

export const state = {
  book: null,
  bookList: [],
};

export default new Vuex.Store({
  mutations,
  actions,
  state,
});
