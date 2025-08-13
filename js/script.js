  const w3 = document.getElementById("word3");
  const wordList = ["DESIGNER", "ANNA"];

  gsap.set(".word", { opacity: 0, y: 50 });
  gsap.set(".sub", { opacity: 0 });

  const tl = gsap.timeline();

  tl.to("#word1", { opacity: 1, y: 0, duration: 0.4, ease: "steps(1)" })
    .to("#word2", { opacity: 1, y: 0, duration: 0.4, ease: "steps(1)" }, "+=0.2")
    .call(() => {
      typeSequentially(wordList, w3, 100, () => {
        tl.play(); // 타이핑 후 타임라인 계속
      });
      tl.pause(); // 타이핑 중엔 일시정지
    }, null, "+=0.2")
    .to("#word4", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "steps(1)",
      onComplete: rotateStar
    }, "+=0.5")
    .to(".sub", { opacity: 1, duration: 1 }, "+=0.3");

  function rotateStar() {
    gsap.to("#mainIcon", {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center"
    });
  }

  // ✨ 타이핑 효과 함수 (ANNA만 보라색 처리)
  function typeSequentially(arr, el, speed, onComplete) {
    let idxW = 0;

    const nextWord = () => {
      const word = arr[idxW];
      let idxC = 0;

      const tick = () => {
        const current = word.slice(0, idxC + 1);

        // 🔥 ANNA일 때만 보라색 스타일 적용
        if (word === "ANNA") {
          el.innerHTML = `<span style="color: #ac5eff;">${current}</span>`;
        } else {
          el.textContent = current;
        }

        idxC++;
        if (idxC < word.length) {
          setTimeout(tick, speed);
        } else {
          idxW++;
          if (idxW < arr.length) {
            setTimeout(() => {
              el.textContent = "";
              nextWord();
            }, 600);
          } else {
            if (onComplete) onComplete();
          }
        }
      };

      el.style.opacity = 1;
      gsap.to(el, { y: 0, duration: 0.1, ease: "steps(1)" });
      tick();
    };

    nextWord();
  }


// (옵션) 빠져나갈 때 다시 투명하게 돌아오고 싶으면 leaveBack 콜백 쓰지 않아도 scrub만으로 자동 역애니메이션 됩니다.




window.addEventListener("scroll", () => {
    const section = document.querySelector(".profile-section");
    const photo = document.querySelector(".profile-photo");
    const tags = document.querySelectorAll(".tag");
    const right = document.querySelector(".right");

    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (sectionTop < triggerPoint) {
      photo.style.opacity = 1;
      photo.style.transform = "translateY(0)";

      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.opacity = 1;
          tag.style.transform = "translateY(0px)";
        }, i * 200); // 순차적으로 등장
      });

      right.style.opacity = 1;
      right.style.transform = "translateY(50px)";
    }
  });

gsap.registerPlugin(ScrollTrigger);




// 1. Scroll animaition
$(function(){
    $('.animate').scrolla({
        mobile: true,  
        once: false 
    });
 });
 

 $(function(){

    gsap.registerPlugin(ScrollTrigger);  

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() { 

        //02. 가로스크롤되게    
            let list = gsap.utils.toArray(".works ul li");
            let scrollTween = gsap.to(list, {
                xPercent: -100 * (list.length - 1), 
                ease:"none",
                scrollTrigger: {
                    trigger: '.works',
                    pin: true,
                    scrub: 1,
                    start:  'center center',
                    end : '300%',
                    //markers:true
                }
            });

    //03.imgBox모션
       gsap.utils.toArray('.works ul li .imgBox').forEach(function(imgBox){
         
          //03-1:imgBox커지게 => 화면 오른쪽에서  커지기시작에서 중앙에서 끝
          gsap.timeline({
            scrollTrigger: {
                trigger: imgBox,
                containerAnimation:  scrollTween, //가로스크롤에서 트리거시점을 잡아주려면 필수
                start:'center right', // 가로스크롤에서 left는 top으로 간주
                end : 'center center',
                scrub: true,  //값을 1보다 true가 더 부드러움
                //markers:true
            }
          })
          .to(imgBox, {'clip-path': 'inset(0%)', ease:'none', duration:1},0)

        //03-2.imgBox작아지게 => 화면중앙에서 작아지기시작해서 왼쪽에서 끝
        gsap.timeline({
            scrollTrigger:{
                trigger: imgBox,
                containerAnimation: scrollTween,
                start: 'center center',
                end :'center left',
                scrub:true,
                //markers:true
            }
        })
        .to(imgBox, {'clip-path': 'inset(30%)', ease:'none', duration:1},0)

       });//03.imgBox.end

    //04.textBox
    gsap.utils.toArray(".works ul li .textBox").forEach(function (textBox) { 
        // 4-1. textBox => 투명도 1로 바꿔주고 x축으로 이동
        gsap.timeline({
            scrollTrigger: {
                trigger: textBox,
                containerAnimation: scrollTween,
                start: 'center 70%',
                end: 'center 40%',
                scrub: true,
                //markers: true,
            },
        })
        .to(textBox,{'opacity': '1','x': -100},0)

        // 4-2. textBox => 글씨 다시 투명도 0
        gsap.timeline({ 
            scrollTrigger: {
                trigger: textBox, 
                containerAnimation: scrollTween,
                start: 'center 30%',
                end: 'center 20%', 
                scrub: true,
               // markers: true,
            },

        })
        .to(textBox,{'opacity': '0'},0)
    
     //05.counter텍스트 변경
    gsap.utils.toArray('.num').forEach(function(text){
        let num = text.getAttribute('data-text')//getAttribute()=> ()의 요소의 속성값을 가져와서 변수num에 대입
        let counter = document.querySelector('.counter .now');

        ScrollTrigger.create({
            trigger: text,
            start:'0 center',
            end:'100% center',
            scrub: true,
            containerAnimation: scrollTween,
           // markers: true,
            onEnter: self => counter.innerText = num,  //스크롤위치가 start를 지나 앞으로 이동할 때 .counter .now에 적어준다
            onEnterBack: self =>counter.innerText = num//스크롤위치가 end를 지나 뒤로 이동할 때
            //self는 window객체 자신을 반환
        });
    })
     }); //04.textBox.end
    }//responsive.end   
});//matchMedia.end
});//Query.end




  
  window.addEventListener("scroll", () => {
  const section = document.querySelector(".about-section");
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.85;

  if (sectionTop < triggerPoint) {
    section.classList.add("on");
  }
});
gsap.registerPlugin(ScrollTrigger);


const bgs = ["#bg1", "#bg2", "#bg3"];

bgs.forEach((selector, i) => {
  const bg = document.querySelector(selector);

  // 해당 패널 구간에서 배경 opacity 1로 나타남
  gsap.to(bg, {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: `#panel${i + 1}`,   // 각 패널 id에 맞춤
      start: "top center",
      end: "top top",
      scrub: true,
      // markers: true, // 디버깅용
      containerAnimation: null // 가로스크롤 등 별도 컨테이너 없으면 null 또는 제거
    }
  });

  // 다음 패널 구간에서 현재 배경 opacity 0으로 사라짐
  if (bgs[i + 1]) {
    gsap.to(bg, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: `#panel${i + 2}`,
        start: "top center",
        end: "top top",
        scrub: true,
        immediateRender: false,
      }
    });
  } else {
    // 마지막 bg는 project 섹션 끝나면 서서히 사라지도록
    gsap.to(bg, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".project",
        start: "bottom center",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
      }
    });
  }
});


    // 패널 내부 content 페이드 인 아웃 제어
    gsap.utils.toArray(".panel").forEach((panel) => {
      const content = panel.querySelector(".content");

      ScrollTrigger.create({
        trigger: panel,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => content.classList.add("active"),
        onLeaveBack: () => content.classList.remove("active"),
      });
    });

    




const items = document.querySelectorAll(".accordion .item");

items.forEach((item) => {
  const title = item.querySelector(".title");
  title.addEventListener("click", () => {
    // 다른 활성화된 아이템 비활성화
    items.forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });
    // 클릭한 아이템 토글
    item.classList.toggle("active");
  });
});
