import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Results from '@/components/Results.vue';

describe('Results.vue', () => {
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

  it('displays the next page button when there is a next page', () => {
    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: testResults,
            currentPage: 1,
            totalPages: 3,
          },
        },
      },
    });

    expect(wrapper.find('button.next').exists()).to.equal(true);
  });

  it('does not display the next page button when there is not a next page', () => {
    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: testResults,
            currentPage: 3,
            totalPages: 3,
          },
        },
      },
    });

    expect(wrapper.find('button.next').exists()).to.equal(false);
  });

  it('calls the next page function', async () => {
    await new Promise((resolve) => {
      const wrapper = shallowMount(Results, {
        mocks: {
          $store: {
            dispatch(name) {
              expect(name).to.equal('nextPage');
              resolve();
            },
            commit() {},
            state: {
              searchResults: testResults,
              searchTerm: 'search term',
              currentPage: 3,
              totalPages: 5,
            },
          },
        },
      });

      wrapper.find('button.next').trigger('click');
    });
  });

  it('displays the previous page button when there is a previous page', () => {
    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: testResults,
            currentPage: 2,
            totalPages: 5,
          },
        },
      },
    });

    expect(wrapper.find('button.previous').exists()).to.equal(true);
  });

  it('does not display the previous page button when there is not a previous page', () => {
    const wrapper = shallowMount(Results, {
      mocks: {
        $store: {
          state: {
            searchResults: testResults,
            currentPage: 1,
            totalPages: 5,
          },
        },
      },
    });

    expect(wrapper.find('button.previous').exists()).to.equal(false);
  });

  it('calls the previous page function', async () => {
    await new Promise((resolve) => {
      const wrapper = shallowMount(Results, {
        mocks: {
          $store: {
            dispatch(name) {
              expect(name).to.equal('previousPage');
              resolve();
            },
            commit() {},
            state: {
              searchResults: testResults,
              searchTerm: 'search term',
              currentPage: 3,
              totalPages: 5,
            },
          },
        },
      });

      wrapper.find('button.previous').trigger('click');
    });
  });
});
