import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Results from '@/components/Results.vue';

describe('Results.vue', () => {
  it('displays nothing when a search has not been run yet', () => {
    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: [],
            searchTerm: null,
          },
        },
      },
    });

    expect(wrapper.find('ul').exists()).to.equal(false);
    expect(wrapper.find('.no-results').exists()).to.equal(false);
  });

  it('displays a message when no results are found', () => {
    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: [],
            searchTerm: 'Test search term',
          },
        },
      },
    });

    expect(wrapper.find('ul').exists()).to.equal(false);
    expect(wrapper.find('.no-results').exists()).to.equal(true);
  });

  it('displays a list of results', () => {
    const testResults = [
      {
        title: 'Spiderman',
        year: '1990',
        poster: 'N/A',
      },
      {
        title: 'Spiderman',
        year: '2010',
        poster: 'N/A',
      },
    ];

    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: testResults,
            searchTerm: 'Test search term',
          },
        },
      },
    });

    expect(wrapper.findAll('li').length).to.equal(2);
    expect(wrapper.find('.no-results').exists()).to.equal(false);
  });
});
