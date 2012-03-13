var timer;

$(document).ready(function() {

    var SCSSMode = require("ace/mode/scss").Mode;
    
    output = ace.edit("output");
    
    output.getSession().setMode(new SCSSMode());
    output.setShowPrintMargin(false);
    output.insert('#hello {\n    color: blue;\n\n    #buddy {\n    	background: red;\n    }\n}');
    
    input = ace.edit("input");
    
    input.getSession().setMode(new SCSSMode());
    input.setShowPrintMargin(false);
    
    input.insert('#hello {\n    color: blue;\n}\n\n#hello #buddy {\n	background: red;\n}');
    input.getSession().on('change', convert);
  
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