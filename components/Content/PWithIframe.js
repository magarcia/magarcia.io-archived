import { childrenShape } from '../../lib/propTypes';

const PWithIframe = ({ children }) => {
  let width = 700;
  if (typeof window !== 'undefined') {
    width = screen.width - 40; // eslint-disable-line no-restricted-globals
  }
  const height = Math.round((width / 16) * 9);
  if (children[0] === '!(') {
    return (
      <iframe
        src={children[1].props.href}
        title={children[1].props.href}
        frameBorder="0"
        width={width}
        height={height}
        allowFullScreen
      />
    );
  }
  return <p>{children}</p>;
};

PWithIframe.propTypes = {
  children: childrenShape.isRequired
};

export default PWithIframe;
