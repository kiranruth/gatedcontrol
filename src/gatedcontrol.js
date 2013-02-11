(function( $ ) {
    var methods = {
        init : function( options ) {
            var settings = $.extend( {
                  'text': 'Click to open',
                  'ellipses' :true,
                  'fontSize':13 
                }, options);
            $(this).each(function(){
                var control = $(this); 
                control.addClass("control");
                var control_width = control.width();
                var control_height = control.height()+5;               
                control.hide();
                control.wrap('<div class="gateHolder" ></div>')
                var gate_text = settings.text;
                if (settings.ellipses && (settings.text.length*settings.fontSize) > control_width ){
                    gate_text = settings.text.substring(0,control_width/settings.fontSize);
                    gate_text = gate_text + "..";
                }
                $('<div class="gate">'+ gate_text +'</div>').insertBefore(control);
                gate = control.closest(".gateHolder").find(".gate").get(0);
                gateHolder = control.closest(".gateHolder").get(0);
                var gc_css = {
                    "width":control_width+"px",
                    "height":control_height+"px"          
                }
                $(gate).css(gc_css);
                $(gate).css("font-size",settings.fontSize);
                $(gateHolder).css(gc_css);
                data = {
                    "control":control,
                    "gate":gate,
                    "gateHolder":gateHolder,
                    "options":options

                };
                $(this).data("gatedControl",data);
                $(gate).click(function(){
                    methods.open.apply(control)
                });    
        
                
            });
        },
        open :function(){
            $(this).each(function(){
                gate = $(this).data('gatedControl').gate;
                control = $(this).data('gatedControl').control;
                options = $(this).data('gatedControl').options;
                $(gate).slideUp(function(){
                    $(control).fadeIn(function(){
                            if (options && options !== undefined && options.onOpen !== undefined) {
                                 options.onOpen();
                            }        
                    });
                });     
            });
        },

        close :function(){
            $(this).each(function(){
                gate = $(this).data('gatedControl').gate;
                control = $(this).data('gatedControl').control;
                options = $(this).data('gatedControl').options;
                $(control).fadeOut(function(){
                    $(gate).slideDown(function(){
                        if (options && options !== undefined && options.onOpen !== undefined) {
                             options.onClose();
                        }    
                    });
                });                
            });
        }              
    }             
    
$.fn.gatedControl = function(option){
        inpArgs = option;
        if ( methods[option] ) {
              return methods[option].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof option === 'object' || ! option ) {
          return methods.init.apply( this, arguments );
        } else {
          $.error( 'Method ' +  option + ' does not exist on jQuery.tooltip' );
        }

    }    
})( jQuery );