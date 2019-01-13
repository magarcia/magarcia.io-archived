import Moment from 'react-moment';
import PropTypes from 'prop-types';
import css from './MetaInfo.module.css';

const MetaInfo = ({ date, readingTime, small = false }) => (
  <div className={`${css.postMetaInline} ${small ? css.small : ''}`}>
    <Moment date={date} format="ll" />
    <span className={css.middotDivider} />
    <span className={css.readingTime} title={readingTime} />
  </div>
);

MetaInfo.propTypes = {
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  small: PropTypes.bool
};

MetaInfo.defaultProps = {
  small: false
};

export default MetaInfo;
