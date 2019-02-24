import React from 'react';
import Sun from './icons/sun';
import Moon from './icons/moon';

class DarkLightMode extends React.Component {
  state = {
    theme: null,
    hasFocus: false
  };

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  handleClick(event) {
    const checkbox = this.input;
    this.previouslyChecked = checkbox.checked;
    if (event.target !== checkbox && !this.moved) {
      event.preventDefault();
      //   checkbox.focus();
      checkbox.click();
    }
  }

  handleBlur(event) {
    this.setState({ hasFocus: false });
  }

  handleFocus(event) {
    this.setState({ hasFocus: true });
  }

  render() {
    const { theme, hasFocus } = this.state;
    return (
      <div // eslint-disable-line jsx-a11y/interactive-supports-focus
        onClick={this.handleClick.bind(this)}
        onKeyPress={this.handleClick.bind(this)}
        role="button"
        className={`darkLightMode ${hasFocus ? 'focus' : ''}`}
      >
        {theme === 'light' ? <Moon height={24} width={24} /> : <Sun height={24} width={24} />}
        <input
          ref={ref => {
            this.input = ref;
          }}
          type="checkbox"
          checked={theme === 'dark'}
          aria-label="Switch between Dark and Light mode"
          onChange={e => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
      </div>
    );
  }
}

export default DarkLightMode;
