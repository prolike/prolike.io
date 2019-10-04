// animation begins

//intro
var controller = new ScrollMagic.Controller();

TweenMax.set(".slide1", {
    y: 270
})
TweenMax.set("#workflow, #you", {
    opacity: 0,
    y: 70
})
TweenMax.set("#scroll", {
    opacity: 0,
    y: 70
})

TweenMax.set(".fas", {
    y: 300
})

var intro = new TimelineMax()

    .staggerTo("#workflow, #you", .8, {
        opacity: 1,
        y: 70
    }, 1.5)
    .to("#scroll", 1, {
        opacity: 1
    }, "+=.5");

//intro ends

//workshop
TweenMax.set("#workshop", {
    y: 300
})
TweenMax.set("#workshopInfo", {
    y: 340
})

var order = new TimelineMax()

    .to("#workshop", 1, {
        opacity: 1,
        y: 350
    })
    .to("#workshopInfo", 1, {
        opacity: 1,
        y: 350
    }, "-=.1")

//workshop ends

//order
TweenMax.set("#order", {
    y: 300
})
TweenMax.set("#orderInfo", {
    y: 340
})

var order = new TimelineMax()

    .to("#order", 1, {
        opacity: 1,
        y: 350
    })
    .to("#orderInfo", 1, {
        opacity: 1,
        y: 350
    }, "-=.1")

//order ends

//agreement
TweenMax.set("#agreement", {
    y: 300
})
TweenMax.set("#agreementInfo", {
    y: 340
})

var agreement = new TimelineMax()

    .to("#agreement", 1, {
        opacity: 1,
        y: 350
    })
    .to("#agreementInfo", 1, {
        opacity: 1,
        y: 350
    }, "-=.1")

//agreement ends

//mvp

TweenMax.set("#mvp", {
    y: 290
});
TweenMax.set("#min, #txt, #txt2", {
    y: 350
});

var mvp = new TimelineMax()


    .staggerTo("#mvp, #min, #txt, #txt2", 1, {
        opacity: 1,
        y: 350
    }, .6)

//mvp ends

//first release
TweenMax.set("#fr", {
    y: 300
});
TweenMax.set("#frTxt", {
    y: 350
});

var fr = new TimelineMax()

    .staggerTo("#fr, #frTxt", 1, {
        opacity: 1,
        y: 360
    }, 1)

//second release ends

TweenMax.set("#sr", {
    y: 300
});
TweenMax.set("#srTxt", {
    y: 350
});

var sr = new TimelineMax()

    .staggerTo("#sr, #srTxt", 1, {
        opacity: 1,
        y: 360
    }, 1)

//second release ends
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger1"
    })
    //intro
    .setTween(intro)
    //.addIndicators({name: "intro"})
    .addTo(controller);
//workshop
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger2"
    })
    .setTween(workshop)
    //.addIndicators({name: "workshop"})
    .addTo(controller);
//order
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger3"
    })
    .setTween(order)
    //.addIndicators({name: "order"})
    .addTo(controller);
//agreement
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger4"
    })
    .setTween(agreement)
    //.addIndicators({name: "agreement"})
    .addTo(controller);
//mvp
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger5"
    })
    .setTween(mvp)
    //.addIndicators({name: "mvp"})
    .addTo(controller);
//first release
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger6"
    })
    .setTween(fr)
    //.addIndicators({name: "fr"})
    .addTo(controller);
//first release
var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger7"
    })
    .setTween(sr)
    //.addIndicators({name: "sr"})
    .addTo(controller);


// animation ends

// scroll lock begins

$(window).on('load', gsapScrollPanel);


function gsapScrollPanel() {

    var controllerScrollPanel,
        scrollSceneDefaultForward,
        scrollSceneDefaultReverse,
        resizeTimer;


    // If the .slide container exists, set up the slide section animations
    if ($('.slide-container').length) {
        initController();
        handleResize();
    }



    // Initialize the scrollMagic controller
    function initController() {

        // Init new controller
        controllerScrollPanel = new ScrollMagic.Controller();

        // Change behaviour of controller to animate scroll instead of jump
        controllerScrollPanel.scrollTo(function (newpos) {
            TweenMax.to(window, .6, {
                scrollTo: {
                    y: newpos,
                    autoKill: false
                }
            });
        });

        // Init the forward and reverse scenes
        scrollPanelScenes();
    }


    // If window is resized, destroy controller and reset once resize has stopped
    function handleResize() {
        $(window).resize(function () {
            destroyScrollPanels();
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(doneResizing, 500);
        });

        function doneResizing() {
            reInitScrollPanels();
        }
    }


    // Destroy scroll panels
    function destroyScrollPanels() {
        controllerScrollPanel.destroy();
        scrollSceneDefaultForward.destroy();
        scrollSceneDefaultReverse.destroy();
    }


    // Re-init scroll panels
    function reInitScrollPanels() {
        controllerScrollPanel = null;
        scrollSceneDefaultForward = null;
        scrollSceneDefaultReverse = null;
        initController();
    }


    // The forward and reverse scenes
    function scrollPanelScenes() {

        // Create scenes for panels, when scrolling forward
        $('.slide').each(function (index, elem) {
            var $scrollPanel = $(elem);
            var forwardScrollPos = $scrollPanel.offset().top;

            scrollSceneDefaultForward = new ScrollMagic.Scene({
                    offset: 10, // Number of pixels user can scroll before panel snaps into place
                    triggerElement: elem,
                    triggerHook: 1, // Trigger this scene when top of panel enters view
                })
                .on('start', function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        controllerScrollPanel.scrollTo(forwardScrollPos); // If direction is forward, trigger scrollTo
                    } else if (event.scrollDirection == 'REVERSE') {
                        // Do nothing
                    }
                })
                // Prevent problems with momentum scrolling by pausing for a period of time
                .on('enter', function (event) {
                    $('body').addClass('is-locked');
                    setTimeout(function () {
                        $('body').removeClass('is-locked');
                    }, 1200)
                })
                .addTo(controllerScrollPanel);
        })


        // Create scenes for panels, when scrolling reverse
        $('.slide:nth-child(2)').each(function (index, elem) {
            var $scrollPanel = $(elem);
            var reverseScrollPos = $scrollPanel.prev().offset().top;

            scrollSceneDefaultReverse = new ScrollMagic.Scene({
                    offset: -10, // Number of pixels user can scroll before panel snaps into place
                    triggerElement: elem,
                    triggerHook: 0, // Trigger this scene when bottom of panel enters view
                })
                .on('start', function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        // Do nothing
                    } else if (event.scrollDirection == 'REVERSE') {
                        controllerScrollPanel.scrollTo(reverseScrollPos); // If direction is reverse, trigger scrollTo
                    }
                })
                // Prevent problems with momentum scrolling by pausing for a period of time
                .on('leave', function (event) {
                    $('body').addClass('is-locked');
                    setTimeout(function () {
                        $('body').removeClass('is-locked');
                    }, 1200)
                })
                .addTo(controllerScrollPanel);
        })

    }

}