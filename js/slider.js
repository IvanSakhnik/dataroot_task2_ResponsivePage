

(function ( $ ) {

    $.fn.slider = function( options ) {

        var settings = this.extend ({
            infinite : true,     
            index : 0,            ///////////
            sliderVisible : 1,   ////////////
            slidesToScroll : 1,
            arrows : true,      /////////////
            swipeAble : true,
            pagination : true, //////////
            autoplay : true,  //////////
            autoplaySpeed : 5000  ////////////////
        }, options);


        var slideCount= $(this).find('.slide').length;
        if (settings.sliderVisible>slideCount){
            settings.sliderVisible=slideCount;
        }
        if (settings.index>slideCount-1){
            settings.index=slideCount-1;
        }

        var step = $(this).find('.slide').outerWidth(true);
        $(this).find('.slides-wrapper').css({'position':'relative'});
        $(this).find('.slider').css({'width': step*settings.sliderVisible});
        $(this).find('.slides-wrapper').css({'width': step*settings.sliderVisible+step+settings.sliderVisible*6});
        var element=$(this).find('.slides-wrapper');
        

        if (settings.index!=0){
            for (var i=0; i<settings.index; i++){
                element.find('.slide').eq(0).clone().appendTo(element);
                element.find('.slide').eq(0).remove();
            }
        }

        var currentElement=settings.index;

        if (settings.arrows == true) {
            $(this).find('.prewbutton').css({'display':'block'});  
            $(this).find('.nextbutton').css({'display':'block'});  
            $(this).find('.nextbutton').click(function(){
                ShowNextSlide(element);});
            $(this).find('.prewbutton').click(function(){
                ShowPrewSlide(element);});
        }

        if (settings.swipeAble == true){
            $(this).on('swiperight', function(){
                //alert('hi');
                ShowNextSlide(element);
            });
        }

        if (settings.pagination == true){
            for (var i=0; i<slideCount; i++){
                $('<span class="control-slide"></span>').appendTo($(this).find('.sli-links'))
                $(this).find('.control-slide:last').text(i);
            }
            $(this).find('.control-slide').click(function(){
                    var navElement = parseFloat($(this).text())
                    paginationFunc(navElement, element);
                });
        }

        var ShowNextSlide = function(element){  
            element.animate({'left':-step}, 300, 
                function(){
                    element.find('.slide').eq(0).remove();
                    element.css({'left':0});
                    element.find('.slide').eq(0).clone().appendTo(element);
                    if (currentElement == slideCount-1){
                        currentElement=0;
                    }
                    else{
                        currentElement+=1;
                    }
                });
        }

        var ShowPrewSlide = function(element){
            element.find('.slide').eq(slideCount).remove();
            element.css({'left': -step});
            element.find('.slide').eq(slideCount-1).clone().prependTo(element);
            element.animate({'left':0}, 300, 
                function(){
                    element.css({'left':0});
                    if (currentElement == 0){
                        currentElement=slideCount-1;
                    }
                    else{
                        currentElement-=1;
                    }
                });
        }

        var paginationFunc = function(navElement, element){
            if (navElement > currentElement){
                var count=navElement-currentElement;
                for (var i=0; i<count; i++){
                    ShowNextSlide(element);
                }
            }
            else if (navElement < currentElement){
                var count=currentElement-navElement;
                for (var i=0; i<count; i++){
                    ShowPrewSlide(element);
                }
            }
        }

        var rotator = function(element){
            if (settings.autoplay==true){
                var timer;
                element.find('.slide').eq(0).clone().appendTo(element);
                if (settings.infinite==true){
                    timer=setInterval(function(){
                        ShowNextSlide(element);  
                    }, settings.autoplaySpeed);
                }
            }
            else{
                element.find('.slide').eq(0).clone().appendTo(element);
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
