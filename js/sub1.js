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
const hamGnb = document.querySelector("nav.hamGnb")
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


})