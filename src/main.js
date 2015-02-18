var React = require('react');
var Autocomplete = require('./js/autocomplete/autocomplete');
var Tokenizer = require('./js/tokenizer/autocomplete');

var someData = require('./util/fakeData');

React.render(<Autocomplete data={someData}/>, document.getElementById('ac'));
React.render(<Tokenizer data={someData}/>, document.getElementById('tokenizer'));
