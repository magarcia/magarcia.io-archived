import Moment from 'react-moment';
import css from './MetaInfo.module.css';

export default ({ year, month, day, readingTime, small = false }) => (
  <div className={`${css.postMetaInline} ${small ? css.small : ''}`}>
    <Moment date={`${year}-${month}-${day}`} format="ll" />
    <span className={css.middotDivider} />
    <span className={css.readingTime} title={readingTime.text} />
  </div>
);
