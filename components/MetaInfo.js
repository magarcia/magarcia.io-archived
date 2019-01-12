import Moment from 'react-moment';
import PropTypes from 'prop-types';
import css from './MetaInfo.module.css';

const MetaInfo = ({ year, month, day, readingTime, small = false }) => (
  <div className={`${css.postMetaInline} ${small ? css.small : ''}`}>
    <Moment date={`${year}-${month}-${day}`} format="ll" />
    <span className={css.middotDivider} />
    <span className={css.readingTime} title={readingTime.text} />
  </div>
);

MetaInfo.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  readingTime: PropTypes.string.isRequired,
  small: PropTypes.bool
};

MetaInfo.defaultProps = {
  small: false
};

export default MetaInfo;
