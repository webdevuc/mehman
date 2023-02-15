/*--------------sticky header------------*/
$(window).on("scroll", function () {
  if ($(document).scrollTop() > 50) {
    $("header").addClass("shrink");
  } else {
    $("header").removeClass("shrink");
  }

  // var pNav = $('.profile-navigation').offset().top;
  if ($(window).scrollTop() > 631) {
    $(".profile-navigation").addClass("sticky");
  } else {
    $(".profile-navigation").removeClass("sticky");
  }
});

/* ------------------ ANIMACTION -----------------*/
var wow = new WOW({
  animateClass: "animated",
  offset: 100,
  callback: function (box) {
    console.log("WOW: animating <" + box.tagName.toLowerCase() + ">");
  },
}).init();

/*-----------------signup js-------------*/

$(document).ready(function () {
  $("#hide").click(function () {
    $(".signup").hide();
  });
  $("#show").click(function () {
    $(".signup").show();
  });
});

function sidetoggle() {
  $(".search-media .me-grid-photo").click(function () {
    $(this).find(".details").slideToggle();
    $(this).addClass("active");
  });
}

/* ------------------ list SLIDER-----------------*/

var owl = $("#sliders");
owl.owlCarousel({
  loop: true,
  margin: 20,
  //center:true,
  autoplayTimeout: 5000,
  smartSpeed: 450,
  dots: true,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    800: {
      items: 4,
    },
  },
});
/*------------------about slider------------------*/

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
if (slider) {
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  };
}

// Scroll to specific values
// scrollTo is the same
// window.scroll({
//   top: 2500,
//   left: 0,
//   behavior: 'smooth'
// });

// // Scroll certain amounts from current position
// window.scrollBy({
//   top: 100, // could be negative value
//   left: 0,
//   behavior: 'smooth'
// });

$("#mediamaster").click(() => {
  window.scrollTo({ top: $("#photos").offset().top - 80, behavior: "smooth" });
});

function Home_init() {
  $(function ($) {
    $(".book-details1").click(function () {
      $(".selectbox1").addClass("select1");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").removeClass("economy");

      $(".selectbox2").removeClass("select2");
    });

    $(".hrtlCenter").click(function () {
      $(".selectbox1").removeClass("select1");
    });

    $(".book-details2").click(function () {
      $(".selectbox1").removeClass("select1");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").removeClass("economy");

      $(".selectbox2").addClass("select2");
    });

    $(".hrtlCenter").click(function () {
      $(".selectbox2").removeClass("select2");
    });

    $(".adult-details").click(function () {
      $(".selectbox1").removeClass("select1");
      $(".selectbox2").removeClass("select2");
      $(".book-peron2").removeClass("economy");
      $(".book-peron1").addClass("bookon");
    });

    $(".adult-btn a").click(function () {
      $(".book-peron1").removeClass("bookon");
    });

    $(".class-details").click(function () {
      $(".selectbox1").removeClass("select1");
      $(".selectbox2").removeClass("select2");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").addClass("economy");
    });

    $(".economy-btn a").click(function () {
      $(".book-peron2").removeClass("economy");
    });

    $(".dates").click(() => {
      $(".selectbox1").removeClass("select1");
      $(".selectbox2").removeClass("select2");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").removeClass("economy");
    });

    $(document).on("click", function (event) {
      //   if(!$(event.target).closest(".search-result-box").length){
      //     $(".selectbox1").removeClass("select1");
      //     $(".selectbox2").removeClass("select2");
      //     $(".book-peron1").removeClass("bookon");
      //     $(".book-peron2").removeClass("economy");
      //   }
    });

    $(".trip_type").on("click", function (event) {
      $(".selectbox1").removeClass("select1");
      $(".selectbox2").removeClass("select2");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").removeClass("economy");
    });
  });

  $(function ($) {
    $(".book-details3").click(function () {
      $(".selectbox3").addClass("select3");
      $(".book-peron3").removeClass("bookon1");
      $(".book-peron4").removeClass("economy");

      $(".selectbox4").removeClass("select4");
    });

    $(".hrtlCenter1").click(function () {
      $(".selectbox3").removeClass("select3");
    });

    $(".book-details4").click(function () {
      $(".selectbox3").removeClass("select3");
      $(".book-peron3").removeClass("bookon1");
      $(".book-peron4").removeClass("economy");

      $(".selectbox4").addClass("select4");
    });

    $(".hrtlCenter1").click(function () {
      $(".selectbox4").removeClass("select4");
    });

    $(".adult-details1").click(function () {
      $(".selectbox3").removeClass("select3");
      $(".selectbox4").removeClass("select4");
      // $(".book-peron4").removeClass("economy");
      $(".book-peron3").addClass("bookon1");
    });

    $(".adult-btn a").click(function () {
      $(".book-peron3").removeClass("bookon1");
    });

    $(".class-details").click(function () {
      $(".selectbox1").removeClass("select1");
      $(".selectbox2").removeClass("select2");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").addClass("economy");
    });

    $(".economy-btn a").click(function () {
      $(".book-peron2").removeClass("economy");
    });

    $(".dates").click(() => {
      $(".selectbox1").removeClass("select1");
      $(".selectbox2").removeClass("select2");
      $(".book-peron1").removeClass("bookon");
      $(".book-peron2").removeClass("economy");
    });

    $(".depart-input .create-inputbox").click(() => {
      $(".selectbox3").removeClass("select3");
      $(".selectbox4").removeClass("select4");
      $(".book-peron3").removeClass("bookon1");
      // $(".book-peron2").removeClass("economy");
    });

    $(".alert-email").click(() => {
      $(".selectbox3").removeClass("select3");
      $(".selectbox4").removeClass("select4");
      $(".book-peron3").removeClass("bookon1");
    });
  });
}
