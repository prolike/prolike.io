// flow
var controller = new ScrollMagic.Controller();


var slideArray = document.getElementsByClassName("trigger");

for (var i = 0; i < slideArray.length; i++) {

    var flow = new TimelineMax()


    flow.from(".headings" + i, .8, {
        opacity: 0
    })
    flow.from(".texts" + i, .9, {
        opacity: 0,
    }, "+=.5");


    var trig = slideArray[i];
    console.log(trig.id)
    var scene = new ScrollMagic.Scene({
            triggerElement: trig
        })
        .setTween(flow)
        /*         .addIndicators({name: "flow" + i}) */
        .addTo(controller);

}
//flow ends ends



// Animation for Bootcamp page

var controller = new ScrollMagic.Controller();

var fadeIn = new TimelineMax();

fadeIn.to(".intro", 1, {
    opacity: 1,
})

var fundementalBlock = new TimelineMax()

    .from(".fundementals-block", 2, {
        opacity: 0
    })

var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger"
    })
    //intro
    .setTween(fundementalBlock)
    //.addIndicators({name: "fundementalBlock"})
    .addTo(controller);


//bootcamp ends

//boards begins 


//out-commented till the board loads quicker of we come up with a way to pause the animation untill everything is loaded

// var boards = new TimelineMax()


// boards.staggerFrom(".zenbox, .msgBoard, .profile, .newIssue, .closedIssue, .storypoints, .todo, .pipeline, .cont",
//     .6, {
//         x: 300,
//         scale: 0.2,
//         opacity: 0,
//         rotation: 5,
//         ease: Back.easeOut.config(.8),
//         x: -100
//     }, .1);