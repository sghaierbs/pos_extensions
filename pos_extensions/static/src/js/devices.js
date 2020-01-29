odoo.define('pos_extensions.devices', function (require) {
"use strict";

	var core = require('web.core');
	var mixins = require('web.mixins');
	var rpc = require('web.rpc');
	var Session = require('web.Session');
	var PosBaseWidget = require('point_of_sale.BaseWidget');
	var devices = require('point_of_sale.devices');

	var QWeb = core.qweb;
	var _t = core._t;


	var ProxyDevice = devices.ProxyDevice.include({
	    print_sale_details: function() {
	        var self = this;
	        rpc.query({
	                model: 'report.point_of_sale.report_saledetails',
	                method: 'get_sale_details',
	            })
	            .then(function(result){
	                var env = {
	                    widget: new PosBaseWidget(self),
	                    company: self.pos.company,
	                    pos: self.pos,
	                    products: result.products,
	                    payments: result.payments,
	                    taxes: result.taxes,
	                    customer_count:result.customer_count,
	                    returns:result.returns,
	                    categories:result.categories,
	                    total_paid: result.total_paid,
	                    date: (new Date()).toLocaleString(),
	                };
	                var report = QWeb.render('SaleDetailsReport', env);
	                self.print_receipt(report);
	            });
	    },
	});

});