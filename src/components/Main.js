require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <div className="notice">这是我的主页，my react list start!</div>
        <h1>测试</h1>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
