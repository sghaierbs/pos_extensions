odoo.define('pos_extensions.models', function (require) {
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

	/* 
		this requires updates in order to request for the manager password
		this changes needs to be moved to pos_modifications module 
		because the developer replaced the whole modules.js file 
	*/

	// var _super_order = models.Order.prototype;
	// models.Order = models.Order.extend({
	//     set_quantity: function(quantity, keep_price){
	//         this.order.assert_editable();
	//         if(quantity === 'remove'){
	//         	return this.gui.ask_password(users[i].pos_security_pin).then(function(){
 //                    this.order.remove_orderline(this);
 //                    return;
 //                });
	//             return;
	//         }else{
	//             var quant = parseFloat(quantity) || 0;
	//             var unit = this.get_unit();
	//             if(unit){
	//                 if (unit.rounding) {
	//                     this.quantity    = round_pr(quant, unit.rounding);
	//                     var decimals = this.pos.dp['Product Unit of Measure'];
	//                     this.quantity = round_di(this.quantity, decimals)
	//                     this.quantityStr = field_utils.format.float(this.quantity, {digits: [69, decimals]});
	//                 }else {
	//                     this.quantity    = round_pr(quant, 1);
	//                     this.quantityStr = this.quantity.toFixed(0);
	//                 }
	//             }else{
	//                 this.quantity    = quant;
	//                 this.quantityStr = '' + this.quantity;
	//             }
	//         }

	//         // just like in sale.order changing the quantity will recompute the unit price
	//         if(! keep_price && ! this.price_manually_set){
	//             this.set_unit_price(this.product.get_price(this.order.pricelist, this.get_quantity()));
	//             this.order.fix_tax_included_price(this);
	//         }
	//         this.trigger('change', this);
	//     },
	// });

});
