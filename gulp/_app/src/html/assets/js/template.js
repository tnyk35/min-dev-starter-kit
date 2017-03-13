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
  'use strict';

  // ここでnewして実行していく
  $(function () {
    // 複数を別々に扱いたい場合は、eachで全要素にたいしてnewしてやればいい。
    $('.js-test').each(function () {
      new MY_PROJECT.Constructor1($(this));
    });
  });

  // 関数定義
  var MY_PROJECT = MY_PROJECT || {};
  MY_PROJECT.Constructor1 = function ($target) {
    // new時点で実行される部分
    this.$target = $target;
    this.init();
  };

  MY_PROJECT.Constructor1.prototype = {
    // initは、new時点で実行したい関数を記述
    init: function () {
      this.setParameters();
      this.bindEvent();
      this.setTimer();
    },

    // setParametersは、ターゲットの指定や、パラメータを設定する際に利用
    setParameters: function () {
      this.$anyTarget = this.$target; // 無駄な処理をわざとしている
      this.text = 'ほにゃらら';
    },

    // bindEventは、イベントを設定する際に利用
    bindEvent: function () {
      this.$anyTarget.on('click', $.proxy(this._changeColor, this));
    },

    // タイマー処理は別途
    setTimer: function () {
      // setInterval($.proxy(
      //   function () { console.log(this.text); },
      //   this)
      // , 1000);
    },
    // アンスコはプライベート関数にする
    // initに書いてないものはすべてprivateという扱い
    _changeColor: function () {
      this.$anyTarget.css({'color': '#f00'});
    },
  };
})(jQuery);