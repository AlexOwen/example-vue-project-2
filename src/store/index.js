import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Vuex mutations.
 */
export const mutations = {

  /**
   * Set the search term in the state.
   *
   * @param { object } state The current Vuex state.
   * @param { string } payload A search term.
   */
  setSearchTerm: (state, searchTerm) => {
    state.searchTerm = searchTerm;
  },

  /**
   * Set the results in the state.
   *
   * @param { object } state The current Vuex state.
   * @param { Array } payload An array of movies.
   */
  setSearchResults: (state, results) => {
    const output = [];

    results.forEach((result) => {
      const movie = {};

      if (result.Title) {
        movie.title = result.Title;
      }
      if (result.Year) {
        movie.year = result.Year;
      }
      if (result.imdbID) {
        movie.imdbID = result.imdbID;
      }
      if (result.Poster && result.Poster !== 'N/A') {
        movie.poster = result.Poster;
      }

      output.push(movie);
    });

    state.searchResults = output;
  },

  /**
   * Set the currentPage in the state.
   *
   * @param { object } state The current Vuex state.
   * @param { Number } payload A page number.
   */
  setPage: (state, pageNumber) => {
    if (pageNumber < 1) {
      state.currentPage = 1;
    } else if (pageNumber > state.totalPages) {
      state.currentPage = state.totalPages;
    } else {
      state.currentPage = pageNumber;
    }
  },

  /**
   * Set the totalPages in the state.
   *
   * @param { object } state The current Vuex state.
   * @param { Number } payload A page number.
   */
  setTotalPages: (state, totalPages) => {
    if (totalPages > 0) {
      state.totalPages = totalPages;
    } else {
      state.totalPages = 1;
    }
  },

  /**
   * Set the focusedMovie in the state.
   *
   * @param { object } state The current Vuex state.
   * @param { object } payload A movie.
   */
  setFocusedMovie: (state, movie) => {
    if (movie.error === true) {
      state.focusedMovie = null;
    } else {
      state.focusedMovie = movie;
    }
  },
};

/**
 * Vuex actions.
 */
export const actions = {
  /**
   * Get the search results from the OMDB API.
   *
   * TODO: move API key to external file (not in git).
   * TODO: break the search and fetch results functions out.
   * TODO: cache pages.
   */
  search: async ({ state, commit }, searchTerm) => {
    let data = [];

    commit('setSearchTerm', searchTerm);

    try {
      const responseData = await (await fetch(`http://www.omdbapi.com/?apikey=f667c202&type=movie&s=${searchTerm}&page=${state.currentPage}`)).json();
      data = responseData.Search && Array.isArray(responseData.Search) ? responseData.Search : [];
      commit('setTotalPages', responseData.totalResults ? Math.ceil(responseData.totalResults / 10) : 1);
    } catch (err) {
      console.error('Failed to retrieve results: ', err.message);
    }

    commit('setSearchResults', data);
  },

  /**
   * Increment the page number and fetch new results.
   */
  nextPage: async ({ commit, dispatch, state }) => {
    commit('setPage', state.currentPage + 1);
    await dispatch('search', state.searchTerm);
  },

  /**
   * Decrement the page number and fetch new results.
   */
  previousPage: async ({ commit, dispatch, state }) => {
    commit('setPage', state.currentPage - 1);
    await dispatch('search', state.searchTerm);
  },

  /**
   * Get more details about a movie.
   */
  getMovieDetails: async ({ commit }, imdbID) => {
    let data = {
      error: true,
    };

    try {
      const responseData = await (await fetch(`http://www.omdbapi.com/?apikey=f667c202&type=movie&i=${imdbID}`)).json();

      if (!responseData.Error) {
        data = {
          imdbID: responseData.imdbID,
          title: responseData.Title,
          year: responseData.Year,
          runtime: responseData.Runtime,
          plot: responseData.Plot,
        };
        if (responseData.Poster) data.poster = responseData.Poster;
      }
    } catch (err) {
      console.error('Failed to retrieve results: ', err.message);
    }

    commit('setFocusedMovie', data);
  },
};

export default new Vuex.Store({
  /**
   * The initial values for the Vuex store.
   */
  state: {
    searchTerm: null,
    searchResults: [],
    currentPage: 1,
    totalPages: 1,
    focusedMovie: null,
  },
  mutations,
  actions,
});
