import css from './Footer.module.css';

export default () => (
  <div className={css.footer}>
    <div className={css.footerContent}>
      <span>
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        from Barcelona
      </span>
    </div>
  </div>
);
