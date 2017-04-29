
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

    	var make = function(){
    		$('.slider').css({'owerflow':'hidden'})
            //$('.slide').css({'position':'relative'})
                           
            var slideNum=0;
            var slideTime;
            var slideCount=$('.slide').size;
                var animSlide=function(arrow){
                var step = $('.slide').outerWidth();
                if (arrow=='next'){
                    $('.slide').eq(0).animate({'margin-left': -step}, 'slow', function(){
                        //$('.slide').eq(0).css({'margin-left':'0'})
                        $('.slide').eq(0).appendTo('.slider');
                        //$('.slider').css('left',0)
                    });
                rotator();
                };

                /*$('.slide').eq(slideNum).fadeOut(settings.autoplaySpeed);
                if (arrow=='next'){
                    if (slideNum==(slideCount-1)){slideNum=0;}
                    else{slideNum++}
                }
                else if (arrow == 'prew'){
                    if (slideNum ==0){slideNum=slideCount-1;}
                    else{slideNum-=1}
                }
                else{
                    slideNum=arrow;
                }*/
                //$('.slide').eq(slideNum).fadeIn(settings.autoplaySpeed, rotator);
            }

            var pause=false;
            var rotator=function(){
                if (!pause){slideTime=setTimeout(function(){animSlide('next')}, settings.autoplaySpeed);}
                }

            $('#slider-wrap').hover(    
                function(){clearTimeout(slideTime); pause = true;},
                function(){pause = false; rotator();
                });
            rotator();
            }
    	

    	return this.each(make);
	};

}( jQuery ));
 



$(document).ready(function(){
	$('.slider-wrap').slider();
});
