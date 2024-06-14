(function( $ ) {
	'use strict';

	$(document).ready(function() {

		var enquiryButton = $('#enquiryButton');
		var enquiryModal = $('#enquiryModal');
		var enquiryModalSKU = enquiryModal.find('input[name="sku"]');
		var enquiryModalProduct = enquiryModal.find('input[name="product"]');

	    enquiryButton.on('click', function() {
		    insertProductIntoForm();
		    insertSKUIntoForm();
	    	enquiryModal.show();
		    enquiryModal.modal('show');
	    });

	    $('#enquiryClose').on('click', function() {
	    	enquiryModal.hide();
	    	$('.modal-backdrop').remove();
		    enquiryModal.modal('hide');
	    });
	
	    var checkVariations = $('.variations_form');
	    if(checkVariations.length > 0 && enquiryButton.length > 0) {
	    	enquiryButton.hide();

	    	var availableVariations = $(checkVariations.data('product_variations'));
	    	var variationText = $('<div id="variationText"></div>');
	    	variationText.insertBefore(enquiryButton);

		    $(document).on('change', '.variations select', function(e) {
		    	var _this = $(this);
		    	var optionSelected = _this.find('option:selected');
		    	var sku = $('.sku').text();

		    	if(sku.length > 0 && sku !== "N/A") {
		    		availableVariations.each(function(i, val) {
		    			console.log(val.sku);
		    			console.log(sku);
		    			if(val.sku === sku) {
		    				var description = val.variation_description;
		    				var price = val.price_html;

		    				variationText.html(price + description);

		    				variationText.fadeIn();
		    				enquiryButton.fadeIn();
		    				return false;
		    			}
		    		});
		    		
		    	} else {
		    		variationText.hide();
		    		enquiryButton.hide();
		    	}
		    });

	    }

		var insertSKUIntoForm = function() {
			var sku = $('.sku').text();
		    if(typeof sku != "undefined"){
		    	enquiryModalSKU.val(sku);
		    	enquiryModalSKU.attr('value', sku);
		    }
	    };
	    
	    var insertProductIntoForm = function() {
	    	var product = $('.single-product h1').text();
	    	if(typeof product != "undefined"){
		    	enquiryModalProduct.val(product);
		    	enquiryModalProduct.attr('value', product);
		    }
	    };

	    insertProductIntoForm();
	    insertSKUIntoForm();

	});

})( jQuery );
