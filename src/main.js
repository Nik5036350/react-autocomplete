var React = require('react');
var Autocomplete = require('./js/autocomplete/autocomplete');

var someData = require('./util/fakeData');

React.render(<Autocomplete data={someData}/>, document.getElementById('ac'));
