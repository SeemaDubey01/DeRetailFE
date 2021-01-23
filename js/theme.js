  // Toggle the side navigation
  $(document).ready( function() {
  
  $('.sidebar-toggle-top').click( function() {
    $('.sidebar').toggleClass('toggled');
    $('.top-nav.fixed-top').toggleClass('toggled');
    /*if ($('.sidebar').hasClass('toggled')) {
      $('.sidebar').hide();
    }
    else{
      $('.sidebar').show();
    };*/
  });

});
