// TODO: properly mock 'fetch'
import { expect } from 'chai';
import { actions } from '../../../src/store/index';

describe('Vuex', () => {
  describe('actions', () => {
    describe('search', () => {
      it('works with expected data', async () => {
        const results = [
          {
            Title: 'Italian Spiderman',
            Year: 2007,
            imdbID: 'tt2705436',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg',
          },
          {
            Title: 'Superman, Spiderman or Batman',
            Year: 2011,
            imdbID: 'tt2084949',
            Type: 'movie',
            Poster: 'https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg',
          },
        ];

        global.fetch = () => ({
          json: () => ({
            Search: results,
            totalResults: 2,
          }),
        });

        const state = {
          currentPage: 1,
        };

        // TODO: replace this with Sinon
        let call = 0;
        const commit = (type, data) => {
          call += 1;
          if (call === 1) {
            expect(type).to.equal('setSearchTerm');
            expect(data).to.equal('Spiderman');
          } else if (call === 2) {
            expect(type).to.equal('setTotalPages');
            expect(data).to.equal(1);
          } else if (call === 3) {
            expect(type).to.equal('setSearchResults');
            expect(data).to.deep.equal(results);
          }
        };

        await actions.search({ commit, state }, 'Spiderman');
      });

      it('does not fail when there is a fetch error', async () => {
        global.fetch = () => {
          throw new Error('fake 404');
        };

        const state = {
          currentPage: 1,
        };

        // TODO: replace this with Sinon
        let call = 0;
        const commit = (type, data) => {
          call += 1;
          if (call === 1) {
            expect(type).to.equal('setSearchTerm');
            expect(data).to.equal('Test search term');
          } else if (call === 2) {
            expect(type).to.equal('setSearchResults');
            expect(data).to.deep.equal([]);
          }
        };

        await actions.search({ commit, state }, 'Test search term');
      });
    });

    describe('nextPage', () => {
      it('calls the setPage mutator', () => {
        const state = {
          currentPage: 1,
        };

        const commit = (type, data) => {
          expect(type).to.equal('setPage');
          expect(data).to.equal(2);
        };

        const dispatch = () => {};

        actions.nextPage({ commit, dispatch, state });
      });

      it('calls the search action', () => {
        const state = {
          currentPage: 1,
          searchTerm: 'search term',
        };

        const commit = () => {};

        const dispatch = (type, data) => {
          expect(type).to.equal('search');
          expect(data).to.equal('search term');
        };

        actions.nextPage({ commit, dispatch, state });
      });
    });

    describe('previousPage', () => {
      it('calls the setPage mutator', () => {
        const state = {
          currentPage: 2,
        };

        const commit = (type, data) => {
          expect(type).to.equal('setPage');
          expect(data).to.equal(1);
        };

        const dispatch = () => {};

        actions.previousPage({ commit, dispatch, state });
      });

      it('calls the search action', () => {
        const state = {
          currentPage: 2,
          searchTerm: 'search term',
        };

        const commit = () => {};

        const dispatch = (type, data) => {
          expect(type).to.equal('search');
          expect(data).to.equal('search term');
        };

        actions.previousPage({ commit, dispatch, state });
      });
    });
  });
});
