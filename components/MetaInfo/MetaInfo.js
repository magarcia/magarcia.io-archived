import Moment from 'react-moment';
import css from './MetaInfo.module.css';
import { postMetadataShape } from '../../lib/propTypes';

const MetaInfo = ({ date, readingTime, small = false }) => (
  <div className={`${css.postMetaInline} ${small ? css.small : ''}`}>
    <Moment date={date} format="ll" />
    <span className={css.middotDivider} />
    <span className={css.readingTime} title={readingTime} />
  </div>
);

MetaInfo.propTypes = postMetadataShape;

MetaInfo.defaultProps = {
  small: false
};

export default MetaInfo;
