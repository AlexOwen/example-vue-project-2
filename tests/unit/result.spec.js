import chai from 'chai';
import chaiDOM from 'chai-dom';
import { shallowMount } from '@vue/test-utils';
import Result from '@/components/Result.vue';

chai.use(chaiDOM);
const { expect } = chai;

describe('Result.vue', () => {
  const testProps = {
    result: {
      title: 'Test Title',
      year: '1988',
      poster: 'http://localhost/test.jpg',
      imdbID: 'testID',
    },
  };

  it('displays the title', () => {
    const wrapper = shallowMount(Result, {
      propsData: testProps,
    });

    expect(wrapper.find('.title').text()).to.equal(testProps.result.title);
  });

  it('displays the year', () => {
    const wrapper = shallowMount(Result, {
      propsData: testProps,
    });

    expect(wrapper.find('.year').text()).to.equal(testProps.result.year);
  });

  it('displays the poster', () => {
    const wrapper = shallowMount(Result, {
      propsData: testProps,
    });

    expect(wrapper.find('.poster').element).to.have.attr('src', testProps.result.poster);
  });

  it('does not display the poster when it is not available', () => {
    const noPosterProps = {
      result: {
        title: 'Test Title',
        year: '1988',
      },
    };

    const wrapper = shallowMount(Result, {
      propsData: noPosterProps,
    });

    expect(wrapper.find('.poster').exists()).to.equal(false);
  });

  it('gets more details about a movie when clicked', async () => {
    await new Promise((resolve) => {
      const wrapper = shallowMount(Result, {
        propsData: testProps,
        mocks: {
          $store: {
            dispatch(name, data) {
              expect(name).to.equal('getMovieDetails');
              expect(data).to.equal('testID');
              resolve();
            },
          },
        },
      });

      wrapper.find('div.result').trigger('click');
    });
  });
});
