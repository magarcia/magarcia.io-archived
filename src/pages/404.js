import React from 'react';
import Layout from '../components/Layout';
import lost from '../assets/lost.svg';

export default ({ location }) => (
  <Layout location={location} title="magarcia">
    <img src={lost} alt="Lost" style={{ width: '45rem', position: 'absolute' }} />
    <h1 style={{ fontSize: '23rem' }}>404</h1>
  </Layout>
);
