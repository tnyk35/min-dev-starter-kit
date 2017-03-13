var jQuery = require('jquery');

/*
 * その３でcommonを共通moduleとして利用する場合にコメントアウトをとってください。
 */
// module.exports = function(msg) {
//   // ここに処理を記述していく
//   (function ($) {
//     $(function () {
//       $('.test').animate({'margin-left': '100px'}, 2000, function () {
//         $('.test').css({color: 'red'});
//       });
//     });
//   }(jQuery));
// };
/*
 * その３ここまで
 */


(function ($) {
  $(function () {
    $('.test').animate({'margin-left': '100px'}, 2000, function () {
      $('.test').css({color: 'red'});
    });
  });
}(jQuery));
