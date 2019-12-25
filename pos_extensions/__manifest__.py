# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Point of Sale Extensions',
    'version': '1.0.1',
    'category': 'Point Of Sale',
    'sequence': 20,
    'summary': 'Tablet POS: shops and restaurants',
    'description': "",
    'depends': ['point_of_sale'],
    'data': [
        'views/report_saledetails.xml',
        # 'views/pos_restaurant_templates.xml',
    ],
    'demo': [
        
    ],
    # 'qweb': ['static/src/xml/pos.xml'],
    'installable': True,
    'application': False,
    
}
