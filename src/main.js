var React = require('react');
var Autocomplete = require('./js/autocomplete/autocomplete');

var someData = ["aaaaaa", "bbbbbbbbb", "cccccccc", "dddddddddd","eeeeeeeeeeeee"];

React.render(<Autocomplete data={someData}/>, document.getElementById('ac'));
