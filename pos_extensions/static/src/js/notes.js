odoo.define('pos_extentions.notes', function (require) {
"use strict";

var models = require('point_of_sale.models');
var screens = require('point_of_sale.screens');
var core = require('web.core');

var QWeb = core.qweb;
var _t   = core._t;


var OrderlineCancelNoteButton = screens.ActionButtonWidget.extend({
    template: 'OrderlineCancelNoteButton',
    button_click: function(){
        var line = this.pos.get_order().get_selected_orderline();
        if (line) {
            line.set_note("[Ne pas faire]");
        }
    },
});

screens.define_action_button({
    'name': 'cancel_note',
    'widget': OrderlineCancelNoteButton,
    'condition': function(){
        return this.pos.config.iface_orderline_notes;
    },
});
return {
    OrderlineCancelNoteButton: OrderlineCancelNoteButton,
}
});
