(function ($) {
  $(function () {
    var currentDevice = -1; // 0:PC 1:SP

    /* -------- */
    /* init */
    /* -------- */
    checkDevice();
    smoothScroll();
    spMenu();
    accordion();
    slider();
    /* -------- */
    /* resize */
    /* -------- */
    $(window).resize(function () {
      checkDevice();
    });

    /* -------- */
    /* scrolling */
    /* -------- */
    $(window).scroll(function () {
    });

    /* -------- */
    /* Functions */
    /* -------- */
    // スムーススクロール
    function smoothScroll() {
      $('a[href^="#"]').click(function (e) {
        var href = $(this).attr('href');
        href = href.replace(/(.*)\//g, "");

        if ($(href).length) {
          // スマホのときはfadeOutさせる
          if ( $(this).parents('.js-spMenuTarget').hasClass('-isActive') ) {
            $('.js-spMenuTarget').removeClass('-isActive').fadeOut(300);
          }
          
          var targetTop = $(href).offset().top;
          var headerHeight = $('#header').height();
          $('html,body').animate({scrollTop : targetTop - headerHeight}, 500);
          return false;
        }
  
      });
    }

    // PC/SPチェック
    function checkDevice() {
      if ( $(window).width() > 768 && currentDevice !== 0 ) {
        currentDevice = 0;
      } else if ($(window).width() <= 768 && currentDevice !== 1) {
        currentDevice = 1;
      }
    }


    // アコーディオン
    function accordion() {
      $('.js-accordion').click(function (e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
      });
    }

    // SPメニュー
    function spMenu() {
      $('.js-spMenu').click(function () {
        $('.js-spMenuTarget').addClass('-isActive').fadeIn(300);
      });

      $('.js-spMenuClose').click(function () {
        $('.js-spMenuTarget').removeClass('-isActive').fadeOut(300);
      });
    }

    // スライダーの設定
    function slider() {
      var slider = new Swiper('.js-slider1', {
        recursedirection: 'vertical',
        loop: true,
        speed: 700,
        autoplay: {
          delay: 4000
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        // pagination: {
        //   el: '.js-pagination1',
        // },
    
        // navigation: {
        //   nextEl: '.js-slider1Next',
        //   prevEl: '.js-slider1Prev',
        // },

        // breakpoints: {
        //   769: {
        //     slidesPerView: 'auto'
        //   },
        //   320: {
        //     slidesPerView: 'auto'
        //   }
        // }
      });
    }


    

  });
}(jQuery));
