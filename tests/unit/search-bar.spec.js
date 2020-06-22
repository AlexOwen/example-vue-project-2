import chai from 'chai';
import chaiDOM from 'chai-dom';
import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';

chai.use(chaiDOM);
const { expect } = chai;

describe('SearchBar.vue', () => {
  it('renders an input box', () => {
    const wrapper = shallowMount(SearchBar);

    expect(wrapper.exists('input')).to.equal(true);
  });

  it('renders a search button', () => {
    const wrapper = shallowMount(SearchBar);

    expect(wrapper.exists('button')).to.equal(true);
  });

  it('calls a search function', async () => {
    await new Promise((resolve) => {
      const wrapper = shallowMount(SearchBar, {
        mocks: {
          $store: {
            dispatch(name, data) {
              expect(name).to.equal('search');
              expect(data).to.equal('search term');
              resolve();
            },
          },
        },
      });

      wrapper.find('input').setValue('search term').then(() => {
        wrapper.find('button').trigger('click');
      });
    });
  });

  it('the search button is disabled if there is no term in the box', async () => {
    const wrapper = shallowMount(SearchBar);

    await wrapper.find('input').setValue('');
    expect(wrapper.find('button').element).to.have.attr('disabled', 'disabled');
  });

  it('the search button is enabled if there is a term in the box', async () => {
    const wrapper = shallowMount(SearchBar);

    await wrapper.find('input').setValue('search term');
    expect(wrapper.find('button').element).to.not.have.attr('disabled');
  });
});
