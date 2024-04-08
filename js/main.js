$(function () {
  /* ham 버튼*/
  $('.hd_mid .ham').click(function () {
    $('.hd_mid .mid_menu').css("display","block");
  });
  $('.close_btn').click(function () {
    $('.hd_mid .mid_menu').css("display","none");
  });
  /* mid 메뉴바 */
  $('ul.depth1>li').click(function () {
    $(this).find('ul.depth2').toggleClass('active');
    $(this).siblings().find('ul.depth2').removeClass('active');
  });

  /* 상단 메뉴바 */
  $('header nav ul.gnb').hover(function () {
    $('header nav ul.gnb>li>ul.sub,.nav_bg').show();
  }, function () {
    $('header nav ul.gnb>li>ul.sub,.nav_bg').hide();
  });

  /* top 버튼 */
  $('.top_btn').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });

  /* 모달 클릭 */
  $('.modal .md_bottom .x_btn').click(function () {
    $('.modal').hide();
  })

  /* 스크롤 이벤트 시작 */
  $(window).scroll(function () {
    let st = $(this).scrollTop();
    if (st >= 90) {
      $('header').addClass('hd_fix');

    } else {
      $('header').removeClass('hd_fix');

    }

  });
  //스크롤 이벤트 끝

  /* 휴관일 */
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  $('.main_visual .m_bottom .m_right p span.year').text(year);
  $('.main_visual .m_bottom .m_right p span.month').text(month);

  let lastDay = new Date(year, month, 0).getDate();
  // console.log(lastDay) ... 현재 월의 마지막 날짜 date

  let liTextArr = [];
  // console.log(liTextArr)
  for (i = 1; i <= lastDay; i++) { //월의 1일부터 ~ 마지막 일까지 돌림
    let day = new Date(year, month - 1, i).getDay();
    if (day == 0) { //day 값이 0 이라면 배열에 밀어넣음
      liTextArr.push(i);
    }
  };//일요일 = 0 값을 찾는다.

  for (let i = 0; i < liTextArr.length; i++) {
    $('.m_right ul li').eq(i).text(liTextArr[i]);
  };

  if (liTextArr.length == 5) {
    $('.main_visual .m_bottom .m_right ul').append('<li>' + liTextArr[4] + '</li>')
  }

  /* 인기도서 탭메뉴 */
  $('main article.book_evt section.book .b_all h3').click(function () {
    $(this).parent().addClass('on').siblings().removeClass('on');

  });

  /* 인기도서 순위 리스트 */
  let rankI = 0;
  let inter = setInterval(listInter, 2800);

  //0,1,2,3,4 계속 도는 상황 
  function listInter() {
    if (rankI < 4) {
      rankI++;
    } else {
      rankI = 0;
    }
    rolling(); //호출
    rollImg();
  }

  // 모든 li에 active 삭제 후 인덱스번호(rankI)에만 active 추가되는 상황
  function rolling() {
    $('main article.book_evt section.book .b_all div.on .b_infor ul li').removeClass('active');
    $('main article.book_evt section.book .b_all div.on .b_infor ul li').eq(rankI).addClass('active')
  }


  // 탭메뉴 (h3) 클릭하면 
  // setInterval 멈춤
  // 다시 인덱스번호 rankI가 0으로 돌아간다.
  // setInterval 시작
  $('main article.book_evt section.book .b_all div h3').click(function () {
    clearInterval(inter);
    rankI = 0;
    rolling();
    rollImg();
    inter = setInterval(listInter, 2800);
  });

  // li(순위) 클릭하면
  // setInterval 멈춤
  // 클릭한 li의 인덱스 번호를 받아옴
  // 돌아가는 rank를 현재 인덱스 번호로
  // 호출
  // setInterval시작...
  $('main article.book_evt section.book .b_all div .b_infor ul li').click(function () {
    clearInterval(inter);
    let i = $(this).index();
    rankI = i;
    rolling();
    rollImg();
    inter = setInterval(listInter, 2800);
  });


  /* 순위에 따라 이미지 바뀌기 */
  function rollImg() {
    $('main article.book_evt section.book .b_all .jungang .b_infor .img_box img').attr('src', './imgs/jbook' + rankI + '.jpg');
    $('main article.book_evt section.book .b_all .sanbon .b_infor .img_box img').attr('src', './imgs/sbook' + rankI + '.jpg');
    $('main article.book_evt section.book .b_all .dang_dong .b_infor .img_box img').attr('src', './imgs/ddbook' + rankI + '.jpg');
    $('main article.book_evt section.book .b_all .daeya .b_infor .img_box img').attr('src', './imgs/dybook' + rankI + '.jpg');
    $('main article.book_evt section.book .b_all .bugok .b_infor .img_box img').attr('src', './imgs/bgbook' + rankI + '.jpg');
  };


  /* 문화행사 스와이퍼 */
  let swiper = new Swiper(".eventSwiper", {
    slidesPerView: 1,
    loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // loop : true, 
    // Dafault:  true,
    breakpoints: {
      480: {
        slidesPerView: 1.5,
      },

      625: {
        slidesPerView: 1.8,
      },
      850: {
        slidesPerView: 2.5,
      },
      999: { //99px 이하에서 2.8개만 보임
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 1.5,
      },
      1299: {
        slidesPerView: 2,
      },
      1425: {
        slidesPerView: 2.2,
      },
      1489: {
        slidesPerView: 2.3,
      },
      1630: {
        slidesPerView: 2.8,
        spaceBetween: 70,
      },
    },


  });

  /* 관련 사이트 배너 스와이퍼 */
  let swiper2 = new Swiper(".bnSwiper", {
    slidesPerView: 1.8,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 2000,
    },
    loop: true,

    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      650: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 4,

      },

      1200: {
        slidesPerView: 5,
      },
      1360: {
        slidesPerView: 6,
      },
    },
  });

  /* 도서관 사이트 */
  /* 패밀리사이트 */
  $('footer .f_bottom_mid .near p').click(function () {
    $('footer .f_bottom_mid .near ul').slideToggle();
  })
});//ready end