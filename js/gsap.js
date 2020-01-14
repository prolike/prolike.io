// flow

// var controller = new ScrollMagic.Controller();

// var slideArray = document.getElementsByClassName("trigger");

// for (var i = 0; i < slideArray.length; i++) {

//     var flow = new TimelineMax()

//     flow.from(".headings" + i, .8, {
//         opacity: 0
//     })
//     flow.from(".texts" + i, .9, {
//         opacity: 0,
//     }, "-=.5");

//     var trig = slideArray[i];
//     console.log(trig.id)
//     var scene = new ScrollMagic.Scene({
//             triggerElement: trig
//         })
//         .setTween(flow)
//         /*         .addIndicators({name: "flow" + i}) */
//         .addTo(controller);

// }
//flow ends ends

// Animation for Bootcamp page

var controller = new ScrollMagic.Controller();

var fadeIn = new TimelineMax();

fadeIn.to(".intro", 1, {
  opacity: 1
});

var fundementalBlock = new TimelineMax().from(".fundementals-block", 2, {
  opacity: 0
});

var scene = new ScrollMagic.Scene({
  triggerElement: "#trigger"
})
  //intro
  .setTween(fundementalBlock)
  //.addIndicators({name: "fundementalBlock"})
  .addTo(controller);

//bootcamp ends

//boards begins

/* var board = new TimelineMax();

board
  .fromTo(
    "button",
    0.3,
    {
      scaleY: 0,
      scaleX: 0.05
    },
    {
      scaleY: 1,
      transformOrigin: "left top",
      ease: Back.easeOut
    },
    "=+.5"
  )
  .to(
    "button",
    0.8,
    {
      scaleX: 1,
      ease: Power4.easeInOut
    },
    "=+.05"
  );

  $("button").mouseenter(function(){
    TweenLite.to(this, .5, {css:{color: "white"}})
  })
  
  $("button").mouseleave(function(){
    TweenLite.to(this, .5, {css:{color: "#FFC400"}})
  })
 */
//out-commented till the board loads quicker or we come up with a way to pause the animation untill everything is loaded

// var project = new TimelineMax()

// project.staggerFrom(".zenbox, .msgBoard, .profile, .newIssue, .closedIssue, .storypoints, .todo, .pipeline, .cont",
//     .6, {
//         x: 300,
//         scale: 0.2,
//         opacity: 0,
//         rotation: -10,
//         transformOrigin: "left top",
//         ease: Back.easeOut.config(.8),
//         x: -100
//     }, .1,
//     "=+.25");

// boards ends

// project buttons
