  // Toggle the side navigation
  $(document).ready( function() {
  
  $('.sidebar-toggle-top').click( function() {
    $('.sidebar').toggleClass('toggled');
    $('.top-nav.fixed-top').toggleClass('toggled');
  });

  $('.sidebarHalfToggler').click( function() {
    $('.sidebar').toggleClass('halfToggled');
   // $('.sidebar-brand').toggleClass('halfToggled');
    $('.top-nav').toggleClass('halfToggled');
    $('.sidebar-fixed-nav').toggleClass('halfToggled');
    $('.sidebarHalfToggler').toggleClass('toggled');
  });
});
