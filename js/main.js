window.addEventListener("load", ()=> {

//header 스크롤 이벤트
const header = document.querySelector("#header");

window.addEventListener("scroll", ()=> {
  let headerScroll = window.scrollY;
  if(headerScroll > 30){
    header.classList.add("on")
  }else if(headerScroll <30){
    header.classList.remove("on")
  }
})

//주메뉴
const gnbMenu = document.querySelectorAll("nav.gnb > ul > li");
const subMenu = document.querySelectorAll("nav.gnb > ul > li > ul")
const headerBorder = document.querySelector(".header_bottom")
const headerWrap = document.querySelector(".header_wrap");

for(let i=0; i<gnbMenu.length; i++){
  // 마우스오버
  gnbMenu[i].addEventListener("mouseover", (e)=> {
    headerWrap.classList.add("on");
    headerBorder.classList.add("on")
    subMenu.forEach(item=>{
      item.classList.add("on")
    })
    gnbMenu.forEach(item=> {
      item.style.overflow = "visible"
    })
  })
  // 주메뉴 포커스 
  gnbMenu[i].children[0].addEventListener("focus", (e)=>{
    headerWrap.classList.add("on")
    headerBorder.classList.add("on")
    subMenu.forEach(item=>{
      item.classList.add("on")
    })
  })
  // 마우스아웃
  gnbMenu[i].addEventListener("mouseout", (e)=> {
    headerWrap.classList.remove("on");
    headerBorder.classList.remove("on")
    subMenu.forEach(item=>{
      item.classList.remove("on")
    })
    // gnbMenu.forEach(item=> {
    //   item.style.overflow = "hidden"
    // })
  })
  // 주메뉴 blur
  gnbMenu[i].children[0].addEventListener("blur", (e)=>{
    headerWrap.classList.remove("on")
    headerBorder.classList.remove("on")
    subMenu.forEach(item=>{
      item.classList.remove("on")
    })
  })
}

// 햄버거 메뉴
const hamBtn = document.querySelector("div.hamburger")
const bg =  document.querySelector("div.bg")
const body =  document.querySelector("body")
const navGnb = document.querySelector("nav.gnb")

hamBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  hamBtn.classList.toggle("on")
  if(hamBtn.classList.contains("on")){
    bg.classList.add("on")
    body.classList.add("on")
    navGnb.classList.add("on")
  }else{
    bg.classList.remove("on")
    body.classList.remove("on")
    navGnb.classList.remove("on")
  }
})

// 언어 설정 
const langBtn = document.querySelector("div.language > span")
const langLi = document.querySelector("div.language > ul")
langBtn.addEventListener("click", (e) => {
  langLi.classList.toggle("on")
})

// 배너 슬라이드 
// 기차 앞뒤로 이미지를 복제, 하지만 인덱스는 0,1로 고정
// 하지만 화면상으로는 첫번째 이미지 앞에 복제된 이미지가 보이므로, 모든 이벤트 전에 -1W만큼 기차를 움직여줘야함 
// next를 클릭했을 때 bnnIdx가 1씩 증가하지만, 실제로 움직여야하는 기차의 범위는 bnnW * bnnIdx+1이다. 
// 왜냐! 이미 0번 클릭했을 때(디폴트) 1번 이동을 한 상태이고 1번 클릭했을 때는 제일 첫번째 이미지 기준으로 2번 이동해야하기 때문에 
//만약 bnnIdx가 2(복제된 이미지))보다 크면, 진짜 이미지의 인덱스인 0으로 돌아가야하고 그때 transition 0초안에 진짜 첫번째 이미지 위치로 이동 (setTimeout)
// prev를 클릭했을 때는 bnnIdx가 1씩 증감되지만, 실제로 움직여야하는 범위는 bnnW *bnnIdx+1


const bnnNextBtn = document.querySelector("ul.pagination a.btn_next");
const bnnPrevBtn = document.querySelector("ul.pagination a.btn_prev");
const bannerFrame = document.querySelector(".banner_frame");
const bannerSection = document.querySelectorAll(".banner_frame >section");
const bnnRoll = document.querySelectorAll("ul.pagination>li.roll");
const play = document.querySelector("ul.pagination>li.play");
let bnnIdx = 0;
let slideCount= bannerSection.length;
const firstEl = bannerSection[0].cloneNode(true);
const lastEl = bannerSection[bannerSection.length-1].cloneNode(true); 
bannerFrame.append(firstEl);
bannerFrame.insertBefore(lastEl,bannerFrame.firstElementChild);
let bnnW = body.offsetWidth;
bannerSection.forEach(item => {
  item.style.width = `${bnnW}px`
})
console.log(bnnW);

// 문서 창 크기가 변경되면 자동으로 그 문서의 width값을 가져와주는 이벤트 
window.addEventListener("resize", () =>{
  bnnW = body.offsetWidth;
  bannerSection.forEach(item => {
    item.style.width = `${bnnW}px`
  })
})

bannerFrame.style.width = `${100*4}%`;
bannerFrame.style.left = `${-bnnW}px`;

// next버튼
bnnNextBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  bnnIdx ++
  bannerFrame.style.left = `${-bnnW*(bnnIdx+1)}px`;
  bannerFrame.style.transition ="0.5s"

  if(bnnIdx == slideCount) {
    setTimeout(function(){
      bannerFrame.style.left = `${-bnnW}px`
      bannerFrame.style.transition ="0s"
    },500)
    bnnIdx = 0; 
  }

  bnnRoll.forEach(item => {
    item.classList.remove("on")
  })
  bnnRoll[bnnIdx].classList.add("on")
})
// prev버튼 
bnnPrevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  bnnIdx--;

  bannerFrame.style.left = `${-bnnW*(bnnIdx+1)}px`;
  bannerFrame.style.transition ="0.5s"
  if(bnnIdx < 0) {
    bnnIdx = slideCount-1;
    setTimeout(function(){
      bannerFrame.style.left = `${-bnnW*slideCount}px`
      bannerFrame.style.transition ="0s"
    },500)
  }

  bnnRoll.forEach(item => {
    item.classList.remove("on")
  })
  bnnRoll[bnnIdx].classList.add("on")
})

// 오토배너
function autoBanner (){
  bnnIdx ++; 
  bannerFrame.style.left = `${-bnnW*(bnnIdx+1)}px`;
  bannerFrame.style.transition ="0.5s"
  
  if(bnnIdx == slideCount) {
    bnnIdx = 0; 
    setTimeout(function(){
      bannerFrame.style.left = `${-bnnW}px`
      bannerFrame.style.transition ="0s"
    },500)
  }

  bnnRoll.forEach(item => {
    item.classList.remove("on")
  })
  bnnRoll[bnnIdx].classList.add("on")
  autoBnn = setTimeout(autoBanner, 5000)
}
let autoBnn = setTimeout(autoBanner, 5000)

// 재생/멈춤 버튼
play.addEventListener("click", (e) => {
  play.classList.toggle("on")
  if(e.currentTarget.classList.contains("on")){
    clearTimeout(autoBnn)
  }else{
    autoBnn = setTimeout(autoBanner, 5000)
  }
})

// content1 캐러셀
const cont1prevBtn = document.querySelector("div.menu a.btn_cont_prev")
const cont1nextBtn = document.querySelector("div.menu a.btn_cont_next")
const slideFrame = document.querySelector("div.menu > ul")
const menuItem = document.querySelectorAll("div.menu > ul >li")
let slideW = window.innerWidth;
let itemWidth = document.querySelector("div.menuSlide > ul >li").offsetWidth;
window.addEventListener("resize",() => {
  slideW = window.innerWidth;
  itemWidth = document.querySelector("div.menuSlide > ul >li").offsetWidth;
})

btnNum = 0 
cont1nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  btnNum ++; 
  if(slideW < 1025){
    if (btnNum >= menuItem.length-4){
      btnNum = menuItem.length-4;
      e.currentTarget.classList.add("disabled");
    }
    slideFrame.style.transform = `translateX(${-btnNum*(itemWidth+17)}px)`; 
    cont1prevBtn.classList.remove("disabled");
  } else{
    if (btnNum >= menuItem.length-6){
      btnNum = menuItem.length-6;
      e.currentTarget.classList.add("disabled");
    }
    slideFrame.style.transform = `translateX(${-btnNum*(itemWidth+17)}px)`; 
    cont1prevBtn.classList.remove("disabled");
  }
})
cont1prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  btnNum --; 
  if(btnNum <=0) {
    btnNum = 0;
    e.currentTarget.classList.add("disabled");
   }
  slideFrame.style.transform = `translateX(${-btnNum*(itemWidth+17)}px)`; 
  cont1nextBtn.classList.remove("disabled");
})

// content2 캐러셀
const cont2prevBtn = document.querySelector("div.brand a.btn_cont_prev")
const cont2nextBtn = document.querySelector("div.brand a.btn_cont_next")
const brandFrame = document.querySelector("div.brand > ul")
const brandItem = document.querySelectorAll("div.brand > ul >li")

btnNum = 0 
cont2nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  btnNum ++; 
  if(slideW < 1025){
    if (btnNum >= brandItem.length-4){
      btnNum = brandItem.length-4;
      e.currentTarget.classList.add("disabled");
    }
    brandFrame.style.transform = `translateX(${-btnNum*(itemWidth+17)}px)`; 
    cont2prevBtn.classList.remove("disabled");
  } else{
    if (btnNum >= brandItem.length-6){
      btnNum = brandItem.length-6;
      e.currentTarget.classList.add("disabled");
    }
    brandFrame.style.transform = `translateX(${-btnNum*(itemWidth+17)}px)`; 
    cont2prevBtn.classList.remove("disabled");
  }
})
cont2prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  btnNum --; 
  if(btnNum <=0) {
    btnNum = 0;
    e.currentTarget.classList.add("disabled");
   }
  brandFrame.style.transform = `translateX(${-btnNum*(itemWidth+17)}px)`; 
  cont2nextBtn.classList.remove("disabled");
})

// 스크롤 이벤트 - content1/content2 스르륵 등장
const cont1scroll = document.querySelector(".content1 ul")
const cont2scroll = document.querySelector(".content2 ul")
const cont3scroll = document.querySelector(".cont3_inner")
const cont4scroll = document.querySelector(".cont4_inner")
body.addEventListener("wheel", (e) => {
  let scrollPosition = window.scrollY;
  console.log(scrollPosition)
  if(e.deltaY > 0) {
    if(bnnW <769){
      if(scrollPosition >=200 && scrollPosition <900){
        cont2scroll.classList.add("on")
      }else if(scrollPosition >=900 && scrollPosition <1800){
        cont3scroll.classList.add("on")
      }else if(scrollPosition >=1800){
        cont4scroll.classList.add("on")
      }
    }
    if(bnnW >769 && bnnW <1025){
      if(scrollPosition >=340 && scrollPosition <800){
        cont2scroll.classList.add("on")
      }else if(scrollPosition >=800 && scrollPosition <2100){
        cont3scroll.classList.add("on")
      }else if(scrollPosition >=2100){
        cont4scroll.classList.add("on")
      }
    }else{
      if (scrollPosition >= 100 && scrollPosition < 700){
        cont1scroll.classList.add("on")
      }else if(scrollPosition >= 700 && scrollPosition < 1000){
        cont2scroll.classList.add("on")
      } else if(scrollPosition >= 1000 && scrollPosition <2000){
        cont3scroll.classList.add("on")
      } else if (scrollPosition >=2000) {
        cont4scroll.classList.add("on")
      }
    }
  }else if(e.deltaY < 0) {
    if(bnnW <769){
      if(scrollPosition <=500){
        cont2scroll.classList.add("on")
      }else if(scrollPosition <=900){
        cont3scroll.classList.add("on")
      }else if(scrollPosition <=2000){
        cont4scroll.classList.add("on")
      }
    }
    if(bnnW >769 && bnnW <1025){
      if(scrollPosition <=400){
        cont2scroll.classList.remove("on")
      }else if(scrollPosition <=1000){
        cont3scroll.classList.remove("on")
      }else if(scrollPosition <=2100){
        cont4scroll.classList.remove("on")
      }
    }else{
      if (scrollPosition <= 100){
        cont1scroll.classList.remove("on")
        cont2scroll.classList.remove("on")
      }else if(scrollPosition <= 1000){
        cont3scroll.classList.remove("on")
      } else if (scrollPosition <=2300) {
        cont4scroll.classList.remove("on")
      }
    }
  }
})

// 스크롤 이벤트 top 버튼 
const topBtn = document.querySelector("a.top");

topBtn.addEventListener("click", e=>{
  e.preventDefault();
  window.scroll({
    left:0,
    top:0,
    behavior: "smooth"
  })
})

window.addEventListener("scroll", (e) => {
  let scroll = window.scrollY; 
  // console.log(scroll)
  if (scroll >= 0 && scroll < 500){
    topBtn.classList.add("on");
  }else{
    topBtn.classList.remove("on");
  }
  // if (scroll >= 200 && scroll < 700){
  //   cont1scroll.classList.add("on")
  // }else if(scroll >= 700 && scroll < 1000){
  //   cont2scroll.classList.add("on")
  // } else if(scroll >= 1000 && scroll <2000){
  //   cont3scroll.classList.add("on")
  // } else if (scroll >=2000) {
  //   cont4scroll.classList.add("on")
  // }
})

// tablet 화면 
// 햄버거 gnbMenu li를 클릭하면 하위ul이 나온다
const hamGnbItem = document.querySelectorAll("nav.hamGnb > ul > li")

hamGnbItem.forEach((item,index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.currentTarget.classList.toggle("on")

    hamGnbItem.forEach((item,index2) => {
      if(index !== index2){
        item.classList.remove("on")
      }
    })
  })
})

// mobile 화면 
// menu pagination을 클릭하면 캐러셀 이동
const cont1Roll = document.querySelectorAll(".content1 .menu_roll > li");
const cont2Roll = document.querySelectorAll(".content2 .menu_roll > li");
let slideWidth = document.querySelector(".menuSlide").offsetWidth;
// console.log(slideWidth)
// window.addEventListener("resize",() => {
//   slideWidth = document.querySelector("div.menuSlide").offsetWidth;
// })
let rollIdx = 0 
for(let i=0; i<cont1Roll.length; i++){
  cont1Roll[i].addEventListener("click",(e) => {
    rollIdx ++;
    if(rollIdx>1)rollIdx=0
    slideFrame.style.transform = `translateX(${-slideWidth*rollIdx}px)`; 

    cont1Roll.forEach(item => {
    item.classList.remove("on")
    })
    cont1Roll[i].classList.add("on");
  })
}
for(let i=0; i<cont2Roll.length; i++){
  cont2Roll[i].addEventListener("click",(e) => {
    rollIdx ++;
    if(rollIdx>1)rollIdx=0
    brandFrame.style.transform = `translateX(${-slideWidth*rollIdx}px)`; 

    cont2Roll.forEach(item => {
    item.classList.remove("on")
    })
    cont2Roll[i].classList.add("on");
  })
}


})


// cont1Roll[1].addEventListener("click", (e)=> {
//   slideFrame.style.transform = `translateX(${-slideWidth}px)`; 

//   cont1Roll.forEach(item => {
//     item.classList.remove("on")
//   })
//   cont1Roll[1].classList.add("on");
// })
// cont1Roll[0].addEventListener("click", (e)=> {
//   slideFrame.style.transform = `translateX(${-slideWidth}px)`; 

//   cont1Roll.forEach(item => {
//     item.classList.remove("on")
//   })
//   cont1Roll[0].classList.add("on");
// })
