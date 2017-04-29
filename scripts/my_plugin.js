
(function ( $ ) {

	$.fn.slider = function( options ) {

    	var settings = $.extend ({
    		infinite : true,
    		index : 0,
    		sliderVisible : 1,
    		slidesToScroll : 1,
    		arrows : true,
    		swipeAble : true,
    		pagination : true,
    		autoplay : true,
    		autoplaySpeed : 5000
    	}, options);

    	var make = function() {
            $(this).css('overflow', 'hidden');
        };

    	return this.each(make);
	};

}( jQuery ));
 



$(document).ready(function(){
	$('.best-proposition__content').slider();
});
