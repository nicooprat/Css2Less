$(document).ready(function() {
  
  $("#farandole").submit(function(event) {
    event.preventDefault();       
    var $form = $( this ),
        term = $form.find( 'textarea[name="css"]' ).val(),
        url = $form.attr('action');
    $.post( url, { css: term },
      function( data ) {
          $( 'textarea[name="less"]' ).empty().append( data );
      }
    );
  });
});