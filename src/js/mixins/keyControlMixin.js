var React = require('react');
var keyCodes = require('../constants/keyCodes');

module.exports = {
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            itemsTotalCount: nextProps.data.length
        });
    },
    onMouseEnter: function(e){
        this.setState({
            activeIndex: parseInt(e.target.attributes["data-index"].value)
        });
    },
    onChange: function(){
        this.setState({value: this.refs.acInput.getDOMNode().value});
    },
    markSubstring: function (item, term) {
        var reg;
        try {
            reg = new RegExp(term, 'i');
        } catch (e) {
        }
        if (reg) {
            var match = item.match(reg);
            return item.replace(match, '<b>'+ match+' </b>');
        } else {
            return item;
        }
    },
    onItemSelected: function(){
        this.refs.acInput.getDOMNode().value = this.activeItem;
        this.setState({isOpen: false});
    },
    onKeyUp: function (e) {
        switch (e.keyCode) {
            case keyCodes.down_arrow:
                if(this.state.isOpen) {
                    this.setState({
                        isOpen: true,
                        activeIndex: (this.state.itemsTotalCount-1 > this.state.activeIndex)? ++this.state.activeIndex: 0
                    });
                }else{
                    this.setState({isOpen: true});
                }
                break;
            case keyCodes.up_arrow:
                if(this.state.isOpen) {
                    this.setState({
                        isOpen: true,
                        activeIndex: (this.state.activeIndex > 0)? --this.state.activeIndex: this.state.itemsTotalCount-1
                    });
                }else{
                    this.setState({isOpen: true});
                }
                break;
            case keyCodes.right_arrow:
                //if (this.model.carretPosition === this.model.acInput.value.length) {
                //this.onRighrArrowPressed();
                //}
                break;
            case keyCodes.enter:
                this.onItemSelected();
                break;
            case keyCodes.escape:
                this.setState({isOpen: false});
                //this.onEscapePresseed();
                break;
        }
    }
};
