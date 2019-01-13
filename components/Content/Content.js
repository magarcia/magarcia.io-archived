import remark from 'remark';
import reactRender from 'remark-react';
import lowlight from 'remark-react-lowlight';
import githubSchema from 'hast-util-sanitize/lib/github.json';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import { childrenShape } from '../../lib/propTypes';
import Image from './Image';
import PWithIframe from './PWithIframe';
import css from './Content.module.css';
import './highlightjs.css';

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [...(githubSchema.attributes.code || []), 'className']
  })
});

const Content = ({ children }) => (
  <div className={css.postContent}>
    {
      remark()
        .use(reactRender, {
          sanitize: schema,
          remarkReactComponents: {
            code: lowlight({
              ts,
              js
            }),
            img: Image,
            p: PWithIframe
          }
        })
        .processSync(children).contents
    }
  </div>
);

Content.propTypes = {
  children: childrenShape.isRequired
};

export default Content;
