require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class ReduxDemo extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return <div className="index"><div className="notice">redux Test 20161201</div></div>;
    }
}

export default ReduxDemo;