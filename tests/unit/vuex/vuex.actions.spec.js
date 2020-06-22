// import fetch from 'node-fetch';
import { expect } from 'chai';
import { actions } from '../../../src/store/index';

describe('Vuex', () => {
  describe('actions', () => {
    it('search: works with expected data', async () => {
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
        }),
      });

      // TODO: replace this with Sinon
      let call = 0;
      const commit = (type, data) => {
        call += 1;
        if (call === 1) {
          expect(type).to.equal('setSearchTerm');
          expect(data).to.equal('Spiderman');
        } else if (call === 2) {
          expect(type).to.equal('setSearchResults');
          expect(data).to.deep.equal(results);
        }
      };

      await actions.search({ commit }, 'Spiderman');
    });

    it('search: fetch error', async () => {
      global.fetch = () => {
        throw new Error('fake 404');
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

      await actions.search({ commit }, 'Test search term');
    });
  });
});
