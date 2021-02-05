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
  
  /* write current date and time on page */ 
  let d = new Date();
  $('#date-today').html('<b>Date :</b> ' + d.toDateString() + '   <b>Time:</b> ' + d.toTimeString().substr(0,8));
  
});
