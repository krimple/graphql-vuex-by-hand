import Vue from 'vue';
import Vuex from 'vuex';
import apolloClient from '../utils/apollows-client.js';
import gql from 'graphql-tag';

Vue.use(Vuex);
const BOOK_QUERY = gql`
        query Book($bookId: ID!) {
          book(id: $bookId) {
            id
            title
            sales
            author
            description
          }
        }
    `;
const BOOKLIST_QUERY = gql`
         query BookList {
          bookList {
            id
            title
            sales
            author
            description
          }
        }
    `;

const BUMP_BOOK_MUTATION = gql`
      mutation BumpSalesMutation($bookId: ID!) {
          bumpSales(id: $bookId) {
          id
          title
          sales
          author
          description
        }
      }
    `;

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
    console.log('gql', BOOK_QUERY);
    const response = await apolloClient.query({ query: BOOK_QUERY , variables: { bookId: id }});
    commit('setBook', response.data.book);
  },
  async fetchBookList({ commit }) {

    const response = await apolloClient.query({ query: BOOKLIST_QUERY});
    commit('setBookList', response.data.bookList);
  },
  async bumpBookSales({ commit }, id) {
    const response = await apolloClient.mutate({ mutation: BUMP_BOOK_MUTATION, variables: { bookId: id } });
    // ODDBALL THING - the payload data property is the name of the mutation.
    // TODO figure out how to rename the response if at all in GQL or Schema
    commit('setBookList', response.data.bumpSales);
    return response;
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
