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
    clearAc: function(){
        this.refs.acInput.getDOMNode().value = '';
        this.setState({selectedItems: []});
        this.refs.acInput.getDOMNode().focus();
    },
    onItemSelected: function(){
        this.refs.acInput.getDOMNode().value = this.state.activeItem.value;
        this.state.selectedItems.push(this.state.activeItem);
        this.setState({isOpen: false});
    },
    getCaretPosition: function (oField) {

    // Initialize
    var iCaretPos = 0;

    // IE Support
    if (window.document.selection) {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = window.document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart === 0) {
        iCaretPos = oField.selectionStart;
    }
    // Return results
    return (iCaretPos);
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
                e.preventDefault();
                break;
            case keyCodes.right_arrow:
                if (this.getCaretPosition(this.refs.acInput.getDOMNode()) === this.refs.acInput.getDOMNode().value.length) {
                    this.onItemSelected();
                }
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
