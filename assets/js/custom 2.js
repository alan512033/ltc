/* Owl-carousel__案例分享效果__ ------------------------------*/
$(function() {
  if ($('.owl-testimonials').length) {
    $('.owl-testimonials').owlCarousel({
      loop: true,
      nav: true,
      dots: true,
      items: 1,
      margin: 30,
      autoplay: true,
      smartSpeed: 700,
      autoplayTimeout: 6000,
      responsive: {
        0: {
          items: 1,
          margin: 0
        },
        460: {
          items: 1,
          margin: 0
        },
        576: {
          items: 1,
          margin: 20
        },
        992: {
          items: 1,
          margin: 30
        }
      }
    });
  }
});

// Page loading animation
$(window).on('load', function() {
  if ($('.cover').length) {
    $('.cover').parallax({
      imageSrc: $('.cover').data('image'),
      zIndex: '1'
    });
  }

  $("#preloader").animate({
    'opacity': '0'
  }, 600, function() {
    setTimeout(function() {
      $("#preloader").css("visibility", "hidden").fadeOut();
    }, 300);
  });
});

/* Navbar__滾動捲軸Navbar縮小放大 ------------------------------*/
$(window).scroll(function() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    /* affix after scrolling 100px */
    if ($(document).scrollTop() > 100) {
      $('.navbar').addClass('affix bg-light');
    } else {
      $('.navbar').removeClass('affix bg-light');
    }
  } else {
    /* affix after scrolling 100px */
    if ($(document).scrollTop() > 100) {
      $('.navbar').addClass('affix bg-light');
      $('.navbar-collapse').css('top', '54px');
    } else {
      $('.navbar').removeClass('affix bg-light');
      $('.navbar-collapse').css('top', '70px');
    }
  }
});

/* Search Bar 點選效果 ------------------------------*/
//Ref:https://codepen.io/choogoor/pen/NGJVMb
$('.navbar-collapse').on('click', '.search-toggle', function(e) {
  var selector = $(this).data('selector');

  $(selector).toggleClass('show').find('.search-input').focus();
  $(this).toggleClass('active');

  e.preventDefault();
});

/* Banner Button click smoothscroll to section----------------*/
$('button').on('click', function(event) {
  event.preventDefault();

  var hash = $(this).attr('data-target'),
    target = $('#' + hash);

  const linkScroll = $(target).offset().top;

  $('html, body').stop().animate({
      scrollTop: linkScroll - 60
    },
    700,
  );
});

/* NavBar_ change color according to banner background color --------*/
// https://stackoverflow.com/questions/49052546/how-to-get-src-of-current-active-image-inside-bootstrap-carousel
function mediaSize() {
  /* Set the matchMedia */
  if (window.matchMedia('(min-width: 768px)').matches) {
    var src = $('.active').find('div').attr('data-info');
    if (src == "light") {
      $('nav').addClass('navbar-light');
    } else if (src == "dark") {
      $('nav').addClass('navbar-dark');
    } else {
      $('nav').addClass('navbar-light'); /*for no banner's pages*/
    }
    $('#carouselExampleIndicators').on('slid.bs.carousel', function() {
      var src = $('.active').find('div').attr('data-info');
      if (src == "light") {
        $('nav').addClass('navbar-light');
        $('nav').removeClass('navbar-dark');
      } else {
        $('nav').addClass('navbar-dark');
        $('nav').removeClass('navbar-light');
      }
      //   alert(src);
    });
  } else {
    if ($('nav').hasClass("navbar-light")) {

    } else {
      $('nav').addClass('navbar-light');
      $('nav').removeClass('navbar-dark');
    }
  }
};
/* Call the function */
mediaSize();
/* Attach the function to the resize event listener */
window.addEventListener('resize', mediaSize, false);


/* NavBar_ click smoothscroll to section--------*/
//注意！位置順序很重要，可能會導致NavBar換色不順利
function Navsmoothscroll() {
  $('.smoothScroll').on('click', function(event) {
    event.preventDefault();

    var hash = $(this).attr('data-target'),
      target = $('#' + hash);

    const linkScroll = $(target).offset().top;

    $('html, body').stop().animate({
        scrollTop: linkScroll - 60
      },
      700,
    );
  });
};
Navsmoothscroll();

/* Accordion__intro手風琴效果 ------------------------------*/
$(function($) {
  $(".accordion > li:eq(0) a")
    .addClass("active")
    .next()
    .slideDown();

  $(".accordion a").click(function(j) {
    var dropDown = $(this)
      .closest("li")
      .find("p");

    $(this)
      .closest(".accordion")
      .find("p")
      .not(dropDown)
      .slideUp();

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this)
        .closest(".accordion")
        .find("a.active")
        .removeClass("active");
      $(this).addClass("active");
    }

    dropDown.stop(false, true).slideToggle();

    j.preventDefault();
  });
});

/* isotope __ portfolio效果__ ------------------------------*/
$(function() {
  if ($('.iso-box-wrapper').length > 0) {

    var $container = $('.iso-box-wrapper').isotope({
      layoutMode: 'fitRows',
      itemSelector: '.iso-box'
    });

    //filter items on button click
    $('.filter-wrapper li a').click(function() {

      var $this = $(this),
        filterValue = $this.attr('data-filter');

      $container.isotope({
        filter: filterValue,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false,
        }
      });

      // don't proceed if already selected
      if ($this.hasClass('selected')) {
        return false;
      }

      var filter_wrapper = $this.closest('.filter-wrapper');
      filter_wrapper.find('.selected').removeClass('selected');
      $this.addClass('selected');

      return false;
    });
  }
});

/* GoTop效果 ------------------------------*/
$(function() {
  /* 按下GoTop按鈕時的事件 */
  $('.gotop').click(function() {
    $('html,body').animate({
      scrollTop: 0
    }, 'slow'); /* 返回到最頂上 */
    return false;
  });

  // 偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('.gotop').fadeIn();
    } else {
      $('.gotop').fadeOut();
    }
  });
});

/* Navbar hover to open dropdown-menu ------------------------------*/
// Ref: https://stackoverflow.com/questions/42183672/how-to-implement-a-navbar-dropdown-hover-in-bootstrap-v4/42183824
function toggleDropdown(e) {
  const _d = $(e.target).closest('.dropdown'),
    _m = $('.dropdown-menu', _d);
  setTimeout(function() {
    const shouldOpen = e.type !== 'click' && _d.is(':hover');
    _m.toggleClass('show', shouldOpen);
    _d.toggleClass('show', shouldOpen);
    $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
  }, e.type === 'mouseleave' ? 300 : 0);
}
$('body')
  .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
  .on('click', '.dropdown-menu a', toggleDropdown);

/* Comparison Slider -------------------------------*/
// Ref: https://codepen.io/MarioDesigns/pen/KvXZPK
$(document).ready(function() {
  // If the comparison slider is present on the page lets initialise it, this is good you will include this in the main js to prevent the code from running when not needed
  if ($(".comparison-slider")[0]) {
    let compSlider = $(".comparison-slider");

    //let's loop through the sliders and initialise each of them
    compSlider.each(function() {
      let compSliderWidth = $(this).width() + "px";
      $(this).find(".resize img").css({ width: compSliderWidth });
      drags($(this).find(".cs-handle"), $(this).find(".resize"), $(this));
    });

    //if the user resizes the windows lets update our variables and resize our images
    $(window).on("resize", function() {
      let compSliderWidth = compSlider.width() + "px";
      compSlider.find(".resize img").css({ width: compSliderWidth });
    });
  }
});

// This is where all the magic happens
// This is a modified version of the pen from Ege Görgülü - https://codepen.io/bamf/pen/jEpxOX - and you should check it out too.
function drags(dragElement, resizeElement, container) {
  // clicp the image and move the slider on interaction with the mouse or the touch input
  dragElement.on("mousedown vmousedown", function(e) {
      //add classes to the emelents - good for css animations if you need it to
      dragElement.addClass("draggable");
      resizeElement.addClass("resizable");
      //create vars
      var dragWidth = dragElement.outerWidth(),
          xPosition = dragElement.offset().left + dragWidth - e.pageX,
          containerOffset = container.offset().left,
          containerWidth = container.outerWidth(),
          minLeft = containerOffset - 20,
          maxLeft = containerOffset + containerWidth - dragWidth + 20;

      dragElement.parents().on("mousemove vmousemove", function(e) {
          leftValue = e.pageX + xPosition - dragWidth;

        // stop the divider from going over the limits of the container
        if (leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        let widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";

        $(".draggable").css("left", widthValue).on("mouseup vmouseup", function() {
          $(this).removeClass("draggable");
          resizeElement.removeClass("resizable");
        });

        $(".resizable").css("width", widthValue);

      }).on("mouseup vmouseup", function(e){
        dragElement.removeClass("draggable");
        resizeElement.removeClass("resizable");
      });
      e.preventDefault();
    }).on("mouseup vmouseup", function(e) {
      // stop clicping the image and move the slider
      dragElement.removeClass("draggable");
      resizeElement.removeClass("resizable");
    });
}
