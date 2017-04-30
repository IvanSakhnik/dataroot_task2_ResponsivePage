

(function ( $ ) {

    $.fn.slider = function( options ) {

        var settings = $.extend ({
            infinite : true,
            index : 0,
            sliderVisible : 6,
            slidesToScroll : 1,
            arrows : true,
            swipeAble : true,
            pagination : true,
            autoplay : true,
            autoplaySpeed : 2000
        }, options);



        var slideCount= $('.slides-wrapper >.slide').length;
        if (settings.sliderVisible>slideCount){
            settings.sliderVisible=slideCount;
        }
        var step = $('.slide').outerWidth(true)
        var slideCount= $('.slides-wrapper >.slide').length;
        $('.slides-wrapper').css({'position':'relative'})
        $('.slider').css({'width':step*settings.sliderVisible+settings.sliderVisible*2})
        $('.slides-wrapper').css({'width':step*settings.sliderVisible+step+settings.sliderVisible*6})


        var animateSlide = function(){
            if ($('.slider').is(':hover')){
                clearInterval(timer);
            }
            $('.slides-wrapper').animate({'left':-step}, 1000, 
                function(){
                    $('.slide').eq(0).remove();
                    $('.slides-wrapper').css({'left':0});
                    $('.slide').eq(0).clone().appendTo('.slides-wrapper');
                });
        };

        if (settings.arrows == true) {
            var $linkArrow = $('<a id="prewbutton" href="#">prew</a><a id="nextbutton" href="#">next</a>').prependTo('#slider-wrap');
            //$('#prewbutton').css({'display':'block'});      
            // $('#nextbutton').click(function(){
            //     animateSlide("next");
            // });
            // $('#prewbutton').click(function(){
            //     animateSlide("prew");
            // });
        }

        var rotator = function(){
            if (settings.autoplay==true){
                var timer;
                $('.slide').eq(0).clone().appendTo('.slides-wrapper');
                if (settings.infinite==true){
                    timer=setInterval(function(){
                        animateSlide()

                    }, settings.autoplaySpeed);
                }
            }
        }

        var make = function(){
            rotator();
        };
        
        return this.each(make);
    };

}( jQuery ));
 



$(document).ready(function(){
    $('.slider-wrap').slider();
});
