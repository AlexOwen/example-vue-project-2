import chai from 'chai';
import chaiDOM from 'chai-dom';
import { shallowMount } from '@vue/test-utils';
import MovieDetail from '@/components/MovieDetail.vue';

chai.use(chaiDOM);
const { expect } = chai;

describe('MovieDetail.vue', () => {
  const testProps = {
    movie: {
      imdbID: 'tt0076759',
      title: 'Star Wars: Episode IV - A New Hope',
      year: '1977',
      runtime: '121 min',
      plot: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    },
  };

  it('displays the title', () => {
    const wrapper = shallowMount(MovieDetail, {
      propsData: testProps,
    });

    expect(wrapper.find('.title').text()).to.equal(testProps.movie.title);
  });

  it('displays the year', () => {
    const wrapper = shallowMount(MovieDetail, {
      propsData: testProps,
    });

    expect(wrapper.find('.year').text()).to.equal(testProps.movie.year);
  });

  it('displays the runtime', () => {
    const wrapper = shallowMount(MovieDetail, {
      propsData: testProps,
    });

    expect(wrapper.find('.runtime').text()).to.equal(testProps.movie.runtime);
  });

  it('displays the plot', () => {
    const wrapper = shallowMount(MovieDetail, {
      propsData: testProps,
    });

    expect(wrapper.find('.plot').text()).to.equal(testProps.movie.plot);
  });

  it('displays the poster', () => {
    const wrapper = shallowMount(MovieDetail, {
      propsData: testProps,
    });

    expect(wrapper.find('.poster').element).to.have.attr('src', testProps.movie.poster);
  });

  it('does not display the poster when it is not available', () => {
    const noPosterProps = {
      movie: {
        imdbID: 'tt0076759',
        title: 'Star Wars: Episode IV - A New Hope',
        year: '1977',
        runtime: '121 min',
        plot: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
      },
    };

    const wrapper = shallowMount(MovieDetail, {
      propsData: noPosterProps,
    });

    expect(wrapper.find('.poster').exists()).to.equal(false);
  });
});
