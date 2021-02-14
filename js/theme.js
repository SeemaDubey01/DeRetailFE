  // Toggle the side navigation
  $(document).ready( function() {
  
  $('.sidebar-toggle-top').click( function() {
  //  $('.sidebar').removeClass('halfToggled');
  // $('.top-nav.fixed-top').removeClass('halfToggled');
    $('.sidebar').toggleClass('toggled');
    $('.top-nav.fixed-top').toggleClass('toggled');
  });

  $('.sidebarHalfToggler').click( function() {
    $('.sidebar').toggleClass('halfToggled');
    $('.top-nav').toggleClass('halfToggled');
    $('.sidebar-fixed-nav').toggleClass('halfToggled');
    $('.sidebarHalfToggler').toggleClass('toggled');
  });
  
  /* write current date and time on page */ 
  let d = new Date();
  $('#date-today').html('<b>Date :</b> ' + d.toDateString() + '   <b>Time:</b> ' + d.toTimeString().substr(0,8));

  /* change background color of input boxes */
  inputBgColor();
});

 /* change background color of input boxes */
 function inputBgColor(){
  $('input').focusin(function(){
      $(this).css("background-color","#FFFFCC");
  });
  $('input').focusout(function(){
      $(this).css("background-color","#FFFFFF");
  });
  $('input').focus(function(){$(this).select();})
}