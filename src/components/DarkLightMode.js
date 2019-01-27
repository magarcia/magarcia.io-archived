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
      return;
    }

    this.setState({ checked: checkbox.checked });
  }

  handleBlur(event) {
    this.setState({ hasFocus: false });
  }

  handleFocus(event) {
    this.setState({ hasFocus: true });
  }

  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        className={`darkLightMode ${this.state.hasFocus && 'focus'}`}
      >
        {this.state.theme === 'light' ? (
          <Moon height={24} width={24} title="Switch to Dark mode" />
        ) : (
          <Sun height={24} width={24} title="Switch to Light mode" />
        )}
        <input
          ref={ref => {
            this.input = ref;
          }}
          type="checkbox"
          checked={this.state.theme === 'dark'}
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
