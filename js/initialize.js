$(document).ready(function () {
  $('#fullpage').fullpage({
    navigation: true,
    fadingEffect: true,
    responsive: true,
    resize: true,
    menu: '#menu',
    anchors: ['home', 'why', 'how', 'what', 'contact'],
  });
});

// Allows for the use to go back to the site from whence they came when pressing on the back button, instead of going back and forth between our front page slides.

$(window).on('click', 'a', function (e) {
  var href = $(e.target).attr('href');
  if (href && href[0] === '#') {
    window.location.replace(e.target.href);
    return false;
  }
});