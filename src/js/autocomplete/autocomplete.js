var React = require('react');
var keyControlMixin = require('../mixins/keyControlMixin');

module.exports = React.createClass({
    mixins: [keyControlMixin],
    activeItem: null,
    props: {
        data: React.PropTypes.object
    },

    getInitialState: function () {
        return {
            itemsTotalCount: (function () {
                var count = 0;
                for (var collection in this.props.data) {
                    count += this.props.data[collection].length;
                }
                return count;
            }.bind(this))(),
            activeItem: null,
            isOpen: false,
            activeIndex: 0
        };
    },

    render: function () {
        var items = [];
        if (this.state.isOpen) {
            var index = 0;
            for (var collection in this.props.data) {
                if (!this.props.data[collection].length) {
                    continue;
                }
                var tmp = [];
                tmp.push(<div>HEADER</div>)
                this.props.data[collection].map(function (item) {
                    if (index === this.state.activeIndex) {
                        this.activeItem = item;
                    }
                    tmp.push(<li onClick={this.onItemSelected} data-index={index} onMouseEnter={this.onMouseEnter}  className={ (index === this.state.activeIndex) ? 'active' : ''} dangerouslySetInnerHTML={{__html: this.markSubstring(item.value, this.state.value)}}></li>)
                    index++;
                }.bind(this));
                var list = <ul>{tmp}</ul>
                items.push(list);
            }
        }

        return (
            <div className="b-autocomplete"  ng-form  name="acForm" onKeyDown={this.onKeyUp} ng-keydown="onKeyDown($event)" ng-className="{ 'ac-open': model.showSoggestion === true }" >
                <div>
                    <div ng-keyUp="onKeyUp($event)" className="b-form-elem_wrapper">
                        <input ref="acInput"  className="form-control" onChange={this.onChange} type="text" placeholder="Город или " required />
                        <button type="button" className="close" onClick={this.clearAc} aria-hidden="true" tabindex="-1">&times;</button>
                        <ins></ins>
                    </div>
                </div>
                <div tabindex="1">
                    {items}
                </div>
            </div>
        )
    }
});