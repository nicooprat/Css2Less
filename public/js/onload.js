var timer;
var output;
var input;

$(document).ready(function() {
    
    // Editor
    
    var SCSSMode = require("ace/mode/scss").Mode;
    
    output = ace.edit("output");
    
    output.getSession().setMode(new SCSSMode());
    output.setShowPrintMargin(false);
    output.env.editor.renderer.setHScrollBarAlwaysVisible(false);
    output.insert('#hello {\n    color: blue;\n\n    #buddy {\n    	background: red;\n    }\n}');
    
    input = ace.edit("input");
    
    input.getSession().setMode(new SCSSMode());
    input.setShowPrintMargin(false);
    input.env.editor.renderer.setHScrollBarAlwaysVisible(false);    
    input.insert('#hello {\n    color: blue;\n}\n\n#hello #buddy {\n	background: red;\n}');
    input.getSession().on('change', convert);
    
    // Flip
    
    $('#info').click(function(e)
    {
        if( $('body').hasClass('flip') )
        {
        	$('#book').css('display','block');
            setTimeout(function()
        	{
        	    $('body').removeClass('flip');
        	},10);
        }
        else
        {
        	setTimeout(function()
        	{
        	    $('#book').css('display','none');
        	},500);
            $('body').addClass('flip');
        }
                
        $('html,body').animate({scrollTop:0}, 'slow');
        e.preventDefault();
    });
  
});

function convert()
{
    // Reset timer
    if( timer ) clearTimeout( timer );
    
    // Get input & AJAX URL
    var term = input.getSession().getValue(),
        url = '/convert';
        
    // If input is not empty
    if( term )
    {
        // Start timer
        timer = setTimeout(function()
        {        
            // AJAX    
            $.post( url, { css: term },
                function( data ) {
                    // Set output
                    output.getSession().setValue( data );
                }
            );
        },500);
    }
    else
    {
        // Empty output
    	output.getSession().setValue( '' );
    }
}