import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Test from './components/test';
import $ from './jquery';
import ProductTable from './components/Product';

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
var number='1234';
ReactDOM.render(<Test name="叶存松" sex="女" title={number} source="test.json" promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')} >
<span>hello</span>
<span>world</span>
</Test>,document.getElementById('test'));

//Product filter test
ReactDOM.render(<ProductTable url="data.json" promise={$.getJSON('data.json')} ></ProductTable>,document.getElementById("Product"));
