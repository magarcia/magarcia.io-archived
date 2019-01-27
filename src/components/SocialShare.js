import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SocialShare.css';

const NETWORKS = [
  {
    name: 'Twitter',
    urlBuilder: (title, url) =>
      `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=martinprins`,
    logo: require('../assets/twitter.svg') // eslint-disable-line global-require
  },
  {
    name: 'Facebook',
    urlBuilder: (_, url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    logo: require('../assets/facebook.svg') // eslint-disable-line global-require
  },
  {
    name: 'LinkedIn',
    urlBuilder: (title, url) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&source=https%3A//www.linkedin.com/in/martingarciamonterde/`,
    logo: require('../assets/linkedin.svg') // eslint-disable-line global-require
  }
];
export default class SocialShare extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  state = {
    visible: false,
    ssr: true
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.setState({
      visible: window.pageYOffset > 90,
      ssr: false
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.setState({
      visible: window.pageYOffset > 90
    });
  }

  render() {
    const { title, url } = this.props;
    const { visible, ssr } = this.state;
    return (
      <aside className={`aside ${visible ? 'visible' : ''} ${ssr ? 'ssrAnimation' : ''}`}>
        {NETWORKS.map(({ name, urlBuilder, logo }) => (
          <a
            title={`Share on ${name}`}
            key={name}
            aria-label={`Share on ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            href={urlBuilder(title, url)}
          >
            <img src={logo} width={24} height={24} alt={name} />
          </a>
        ))}
      </aside>
    );
  }
}
