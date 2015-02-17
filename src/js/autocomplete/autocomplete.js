var React = require('react');
var keyControlMixin = require('../mixins/keyControlMixin');

module.exports = React.createClass({
    mixins: [keyControlMixin],
    activeItem: null,
    props: {
        data: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            itemsTotalCount: this.props.data.length,
            value: '',
            isOpen: false,
            activeIndex: 0
        };
    },

    render: function () {

        var items = this.state.isOpen && this.props.data.map(function (item, index) {
                if (index === this.state.activeIndex) {
                    this.activeItem = item;
                }
                return <li onClick={this.onItemSelected} data-index={index} onMouseEnter={this.onMouseEnter}  className={ (index === this.state.activeIndex) ? 'active' : ''} dangerouslySetInnerHTML={{__html: this.markSubstring(item, this.state.value)}}></li>
            }.bind(this));

        return (
            <div className="b-autocomplete"  ng-form  name="acForm"  onKeyDown={this.onKeyUp} ng-keydown="onKeyDown($event)" ng-className="{ 'ac-open': model.showSoggestion === true }" >
                <div>
                    <div ng-keyUp="onKeyUp($event)" className="b-form-elem_wrapper">
                        <input ref="acInput"  className="form-control" onChange={this.onChange} type="text" placeholder="Город или " required />
                        <button type="button" className="close" ng-click="cleanAc()" ng-show="model.acText !== ''" aria-hidden="true" tabindex="-1">&times;</button>
                        <ins></ins>
                    </div>
                </div>
                <div tabindex="1">
                    <ul>
                        {items}
                    </ul>
                </div>

            </div>
        )
    }
});