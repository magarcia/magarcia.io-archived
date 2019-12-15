import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import styles from './about.module.css';

const jobs = [
  {
    company: 'New Relic',
    time: 'September 2019 - Present',
    positions: [
      {
        title: 'Software Engineer'
        // description: 'Fullstack development of a platform built using a microservices architecture.'
      }
    ],
    stacks: ['JavaScript', 'React (ES6)', 'CSS']
  },
  {
    company: 'ThoughtWorks',
    time: 'Marth 2017 - September 2019',
    positions: [
      {
        title: 'Software Consultant',
        description: 'Fullstack development of a platform built using a microservices architecture.'
      }
    ],
    stacks: ['Spring (Java)', 'React (ES6)', 'Python', 'AWS', 'Docker', 'Jenkins', 'TeamCity']
  },
  {
    company: 'OpenSuse',
    department: 'Google Summer of Code',
    time: 'May 2016 - August 2016',
    positions: [
      {
        title: 'Frontend Developer',
        description:
          'Migration of Jangouts, videoconferencing web app, from AngularJS (ECMAScript 5) to Angular 2 (TypeScript) and add a test suit.'
      }
    ],
    stacks: [
      'Angular2',
      'WebRTC',
      'Janus-Gateway',
      'Typescript',
      'Webkpack',
      'Jasmine',
      'Karma',
      'Bootstrap'
    ]
  },
  {
    company: 'Medtep Inc.',
    time: 'March 2011 - February 2017',
    positions: [
      {
        title: 'Senior Frontend Developer',
        time: '2013 - February 2017',
        description: 'Lead the migration of the platform to a SPA architecture.'
      },
      {
        title: 'Fullstack Developer',
        time: 'March 2011 - 2013',
        description:
          'Development of the platform across the whole stack, design and implementation of the RESTful API, and integration with third party API.'
      }
    ],
    stacks: [
      'Django (Python)',
      'AngularJS (CoffeeScript)',
      'MySQL',
      'PostgreSQL',
      'Docker',
      'Google Cloud Platform'
    ]
  },
  {
    company: 'Universitat Politècnica de Catalunya',
    department: 'Computer Architecture Department',
    time: 'March 2009 - April 2011',
    positions: [
      {
        title: 'Scholarship Holder on Systems Administration',
        description:
          "Part-time system administration and helpdesk at the Computer Architecture Department (Departament d'Arquitectura de Computadors, DAC)."
      }
    ],
    stacks: ['GNU/Linux', 'PostgreSQL', 'Bacula']
  }
];

const About = ({ location }) => {
  return (
    <Layout location={location} title="About">
      <SEO />
      <main>
        <h1>
          <mark>Martin Garcia</mark>
        </h1>
        <p>I am passionate about creating unique, modern and functional applications.</p>
        <p>
          Particularly interested in developing web and cloud applications, I am continuously
          looking for new challenges and improve my skills.
        </p>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        {jobs.map(job => (
          <div key={job.company} className={styles.jobEntry}>
            <div className={styles.company}>
              <h3>{job.company}</h3>
              {job.department && <p>{job.department}</p>}
              <div className={styles.time}>{job.time}</div>
            </div>

            <div className={styles.positions}>
              {job.positions.map(position => (
                <div key={position.title} className={styles.position}>
                  <h4>{position.title}</h4>
                  {position.time && <div className={styles.time}>{position.time}</div>}
                  <p>{position.description}</p>
                </div>
              ))}
              <p className={styles.stack}>
                <b>Stack</b>: {job.stacks.join(', ')}.
              </p>
            </div>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default About;
