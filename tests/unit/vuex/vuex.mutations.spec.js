import { expect } from 'chai';
import { mutations } from '../../../src/store/index';

describe('Vuex', () => {
  describe('mutations', () => {
    describe('setSearchTerm', () => {
      it('sets a search term', () => {
        const term = 'search term';

        const state = {
          searchTerm: null,
          results: [],
        };

        const { setSearchTerm } = mutations;

        setSearchTerm(state, term);

        expect(state.searchTerm).to.equal(state.searchTerm);
      });
    });

    describe('setSearchResults', () => {
      it('sets search results', () => {
        const results = [
          {
            Title: 'Spiderman',
            Year: '1990',
            imdbID: 'tt0100669',
            Type: 'movie',
            Poster: 'http://test.url/img.jpg',
          },
          {
            Title: 'Spiderman',
            Year: '2010',
            imdbID: 'tt1785572',
            Type: 'movie',
            Poster: 'N/A',
          },
        ];

        const state = {
          searchTerm: null,
          searchResults: [],
        };

        const { setSearchResults } = mutations;

        setSearchResults(state, results);

        expect(state.searchResults).to.deep.equal([
          {
            title: 'Spiderman',
            year: '1990',
            imdbID: 'tt0100669',
            poster: 'http://test.url/img.jpg',
          },
          {
            title: 'Spiderman',
            year: '2010',
            imdbID: 'tt1785572',
          },
        ]);
      });
    });
  });
});
