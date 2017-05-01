

(function ( $ ) {

    $.fn.slider = function( options ) {

        var settings = this.extend ({
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


        var slideCount= $(this).find('.slide').length;
        if (settings.sliderVisible>slideCount){
            settings.sliderVisible=slideCount;
        }
        var step = $(this).find('.slide').outerWidth(true);
        $(this).find('.slides-wrapper').css({'position':'relative'});
        $(this).find('.slider').css({'width': step*settings.sliderVisible});
        $(this).find('.slides-wrapper').css({'width': step*settings.sliderVisible+step+settings.sliderVisible*6});
        var element=$(this).find('.slides-wrapper');

        if (settings.arrows == true) {
            $(this).find('.prewbutton').css({'display':'block'});  
            $(this).find('.nextbutton').css({'display':'block'});  
            $(this).find('.nextbutton').click(function(){
                ShowNextSlide(element, 0);});
            $(this).find('.prewbutton').click(function(){
                ShowPrewSlide(element);});
        }

        var ShowNextSlide = function(element, timer){
            /*var tmp=timer;
            element.find('.slide').hover(function(){
                clearInterval(timer);
            },
                function(){timer=tmp;});  */   
            element.animate({'left':-step}, 500, 
                function(){
                    element.find('.slide').eq(0).remove();
                    element.css({'left':0});
                    element.find('.slide').eq(0).clone().appendTo(element);
                });
        };

        var ShowPrewSlide = function(element){
            element.find('.slide').eq(slideCount).remove();
            element.css({'left': -step});
            element.find('.slide').eq(slideCount-1).clone().prependTo(element);
            element.animate({'left':0}, 500, 
                function(){
                    element.css({'left':0});
                });
        }

       /* if (settings.pagination == true){
            $(this).find(".control-slide:first").addClass("active");
         
            $(this).find('.control-slide').click(function(){
                var goToNum = parseFloat($(this).text());
                animSlide(goToNum);
            });
        }*/

        var rotator = function(element){
            if (settings.autoplay==true){
                var timer;
                element.find('.slide').eq(0).clone().appendTo(element);
                if (settings.infinite==true){
                    timer=setInterval(function(){
                        ShowNextSlide(element, timer);  
                    }, settings.autoplaySpeed);
                }
            }
        }

        var make = function(){
            var element = $(this).find('.slides-wrapper');
            rotator(element);
        };
        
        return this.each(make);
    };

}( jQuery ));
 

$(document).ready(function(){
    $('.slider-first-wrap').slider({sliderVisible : 3});
    $('.slider-second-wrap').slider({sliderVisible : 4});
});
