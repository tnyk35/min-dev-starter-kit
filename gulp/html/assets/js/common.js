(function ($) {
  $(function () {
    $('.test').animate({'margin-left': '100px'}, 2000, function () {
      $('.test').css({color: 'red'});
    });
  });
}(jQuery));
