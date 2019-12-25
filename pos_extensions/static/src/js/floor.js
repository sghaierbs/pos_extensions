odoo.define('pos_extensions.floors', function (require) {
"use strict";

	var PosBaseWidget = require('point_of_sale.BaseWidget');
	var chrome = require('point_of_sale.chrome');
	var gui = require('point_of_sale.gui');
	var PopupWidget = require('point_of_sale.popups');
	var models = require('point_of_sale.models');
	var screens = require('point_of_sale.screens');
	var core = require('web.core');
	var rpc = require('web.rpc');

	var modelsPrototype = models.PosModel.prototype.models;
	var Restaurant = require('pos_restaurant.floors');

	var QWeb = core.qweb;
	var _t = core._t;

	for(var i=0; i<modelsPrototype.length; i++){
        var model=modelsPrototype[i];
        
        if(model.model === 'restaurant.table'){
            model.fields.push('tmp_customer_count');
            
        }
    }


	// var TableWidget = Restaurant.TableWidget.include({
	// 	init: function(parent, options){
	//         this._super(parent, options);
	//         console.log('#### setting customer count')
	//         this.table.tmp_customer_count = 1;
	//     },
	//     click_handler: function(){
	//         var self = this;
	//         var floorplan = this.getParent();
	//         if (floorplan.editing) {
	//             setTimeout(function(){  // in a setTimeout to debounce with drag&drop start
	//                 if (!self.dragging) {
	//                     if (self.moved) {
	//                         self.moved = false;
	//                     } else if (!self.selected) {
	//                         self.getParent().select_table(self);
	//                     } else {
	//                         self.getParent().deselect_tables();
	//                     }
	//                 }
	//             },50);
	//             console.log('##### open table if ',this);
	//         } else {
	//             var orders = this.pos.get_table_orders(this.table)
	//             console.log('##### order from table ',orders)
	//             if(!orders.length){
	//                 this.gui.show_popup('number', {
	//                     'title':  _t('Guests ?'),
	//                     'cheap': true,
	//                     'value':   self.tmp_customer_count,
	//                     'confirm': function(value) {
	//                         console.log('#### value1 ',typeof(value));
	//                         if(!value.length){
	//                         	this.gui.show_popup('number','Vous devez saisir une valeur numérique');
	//                         }else{
	//                         	value = parseInt(value);
	// 	                        console.log('#### value ',value);
	// 	                        self.table.tmp_customer_count = value;
	// 	                        floorplan.pos.set_table(self.table);	
	//                         }
	//                     },
	//                 });
	//             }else{
	//                 floorplan.pos.set_table(self.table);
	//             }
	//         }
	//     },
	// });

	var ConfirmOnlyPopupWidget = PopupWidget.extend({
	    template: 'ConfirmOnlyPopupWidget',
	});
	gui.define_popup({name:'confirm-only', widget: ConfirmOnlyPopupWidget});

	var TableGuestsButton = Restaurant.TableGuestsButton.include({
	    button_click: function() {
	        var self = this;
	        this.gui.show_popup('number', {
	            'title':  _t('Guests ?'),
	            'cheap': true,
	            'value':   this.pos.get_order().customer_count,
	            'confirm': function(value) {
	            	// allow 0 as value
	                value = parseInt(value);
	                self.pos.get_order().set_customer_count(value);
	                self.renderElement();
	            },
	        });
	    },
	});


	var ActionpadWidget = screens.ActionpadWidget.include({
	    renderElement: function() {
	        var self = this;
	        this._super();
	        // unbind parent function listener 
	        this.$('.pay').off('click').click(function(){
	            var order = self.pos.get_order();
	            /*
	            	check if the customer_count attribute is not set by the cashier
	             	and the guests feature is activated
	             */
	            if(!order.customer_count_updated && self.pos.config.iface_floorplan){
	            	self.gui.show_popup('confirm-only',{
	                    'title': _t('Couverts'),
	                    'body':  _t("Vous devez définir le nombre de couverts pour cette commande"),
	                    confirm: function(){
	                        if (self.getParent().action_buttons && self.getParent().action_buttons.guests) {
					            self.getParent().action_buttons.guests.button_click();
					        }
	                    },
	                });
	            }else{
	            	var has_valid_product_lot = _.every(order.orderlines.models, function(line){
		                return line.has_valid_product_lot();
		            });
		            if(!has_valid_product_lot){
		                self.gui.show_popup('confirm',{
		                    'title': _t('Empty Serial/Lot Number'),
		                    'body':  _t('One or more product(s) required serial/lot number.'),
		                    confirm: function(){
		                        self.gui.show_screen('payment');
		                    },
		                });
		            }else{
		                self.gui.show_screen('payment');
		            }
	            }

	        });
	        this.$('.set-customer').click(function(){
	            self.gui.show_screen('clientlist');
	        });
	    }
	});


	var _super_order = models.Order.prototype;
	models.Order = models.Order.extend({
	    initialize: function() {
	        this.customer_count_updated = false;
	        _super_order.initialize.apply(this,arguments);
	    },
	    set_customer_count: function(count) {
	        this.customer_count_updated = true;
	        _super_order.set_customer_count.apply(this,arguments);
	    },
	});


});