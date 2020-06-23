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

    describe('setPage', () => {
      it('sets the page', () => {
        const state = {
          currentPage: 1,
          totalPages: 10,
        };

        const { setPage } = mutations;
        setPage(state, 2);

        expect(state.currentPage).to.equal(2);
      });

      it('sets the page to the maximum if the requested page is greater than the maximum', () => {
        const state = {
          currentPage: 1,
          totalPages: 10,
        };

        const { setPage } = mutations;
        setPage(state, 11);

        expect(state.currentPage).to.equal(10);
      });

      it('sets the page to 1 if the requested page is less than 1', () => {
        const state = {
          currentPage: 1,
          totalPages: 10,
        };

        const { setPage } = mutations;
        setPage(state, 0);

        expect(state.currentPage).to.equal(1);
      });
    });

    describe('setTotalPages', () => {
      it('sets the total pages', () => {
        const state = {
          totalPages: 10,
        };

        const { setTotalPages } = mutations;
        setTotalPages(state, 5);

        expect(state.totalPages).to.equal(5);
      });
    });
  });
});
