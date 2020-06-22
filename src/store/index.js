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
};

/**
 * Vuex actions.
 */
export const actions = {
  /**
   * Get the search results from the OMDB API.
   *
   * TODO: move API key to external file (not in git)
   */
  search: async (context, searchTerm) => {
    let data = [];

    context.commit('setSearchTerm', searchTerm);

    try {
      const responseData = await (await fetch(`http://www.omdbapi.com/?apikey=f667c202&type=movie&s=${searchTerm}`)).json();
      data = responseData.Search && Array.isArray(responseData.Search) ? responseData.Search : [];
    } catch (err) {
      console.error('Failed to retrieve results: ', err.message);
    }

    context.commit('setSearchResults', data);
  },
};

export default new Vuex.Store({
  /**
   * The initial values for the Vuex store.
   */
  state: {
    searchTerm: null,
    searchResults: [],
  },
  mutations,
  actions,
});
