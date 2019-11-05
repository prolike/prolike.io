// animation  begins

var controller = new ScrollMagic.Controller();
//intro


var slideArray = document.getElementsByClassName("trigger");

for(var i = 0; i < slideArray.length; i++){

var flow = new TimelineMax()


flow.from(".headings" + i, .8, {
    opacity: 0
})
flow.from(".texts" + i, .9, {
    opacity: 0,
}, "+=.5");


var trig = slideArray[i];
console.log(trig.id)
var scene = new ScrollMagic.Scene({
            triggerElement: trig
        })
        .setTween(flow)
/*         .addIndicators({name: "flow" + i}) */
        .addTo(controller);

}
//intro ends



// Animation for Bootcamp page

var controller = new ScrollMagic.Controller();

var fadeIn = new TimelineMax();

fadeIn.to(".intro", 1, {
    opacity: 1,
})

var fundementalBlock = new TimelineMax()

    .from(".fundementals-block", 2, {
        opacity: 0
    })

var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger"
    })
    //intro
    .setTween(fundementalBlock)
    //.addIndicators({name: "fundementalBlock"})
    .addTo(controller);

      
     