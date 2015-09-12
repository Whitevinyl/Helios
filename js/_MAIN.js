/**
 * Created by luketwyman on 17/08/2015.
 */



// INIT //
var canvas;
var cxa;
var scene = 0;
var TWEEN;
var loadCount = 0;
var loadReady = false;
var introAlpha = new Alpha(100);



// METRICS //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var dx = halfX;
var dy = halfY;
var headerType = 0;
var midType = 0;
var dataType = 0;
var bodyType = 0;
var subType = 0;
var device = "desktop";
var windowFocussed = true;
var triVector = vectorFromAngle(degToRad(30));
var cameraDepth = 4;


// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var touchTakeover = false;
var touch;
var mouseIsDown = false;
var downPoint = new Point();
var downRotation = new Point();
var rotateDest = new Point();
var rotateScale = new Size();
var rotating = false;
var easeRotate = false;
var selectedController = null;
var selectedControllerPos = new Point3D();
var mouseDown3D = new Point3D();
var interactable = false;
var infoAlpha = new Alpha(0);
var infoOver = false;
var infoWidth = 10;
var orderOver = false;
var cancelTween;
var orderDest = 500;
var orderY = 500;
var orderFill = 0;
var panelOpen = false;
var panelPos = new Point(0,-5000);
var closeOver = false;
var linkOver = [];

// COLOR //
var landCols = [];
var landColsLight = [];
var shardCols = [new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1)];
var shardColsDark = [];
var shardColsLight = [new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1)];
var linkCol = new RGBA(30,35,40,1);

var masterCol = new RGBA(-255,-255,-255,0);
var highPass = new RGBA(0,0,0,0);
var lowPass = new RGBA(0,0,0,0);


// SCENE OBJECTS //
var BackgroundList = [];
var ControllerList = [];
var SceneryList = [];
var backgrounds = [];
var controllers = [];
var scenery = [];

var flickerParticles = [];
var flickerParticles2 = [];
var windParticles = [];
var dustParticles = [];
var radialParticles = [];
var passageParticles = [];

var windDir = 0;

var worms = [];
var wormClock = 0;

var floatTweens = [];
var sunDest = 110;

var masterRotate = new Point3D();
var drumLevel = 1;

var passageAlpha = new Alpha(0);
var floatSpeed = new Vector(0,1);

//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------


function loadPalette(pal,paletteURL) {
    var pixelPalette = new PixelPalette(paletteURL);
    pixelPalette.Load(function (palette)  {

        var i;

        switch (pal) {
            case "land":
                landColsLight = palette;
                for (i=0; i<palette.length; i++) {
                    landCols[i] = palette[i].clone();
                }
                break;
            case "shardLight":
                for (i=0; i<shardCols.length; i++) {
                    shardColsLight[i] = shardCols[i].clone();
                }
                break;
            case "shardDark":
                //shardColsDark = palette;
                shardCols = palette;
                for (i=0; i<shardCols.length; i++) {
                    shardColsDark[i] = shardCols[i].clone();
                }
                break;
        }
        getAllLoads();
    });
}

function getAllLoads() {
    loadCount += 1;
    if (loadCount===3) {
        loadComplete();
    }
}

window.onblur = function() {
    windowFocussed = false;
};
window.onfocus = function() {
    windowFocussed = true;
    var i;
    for (i=0; i<floatTweens.length; i++) {
        floatTweens[i].stop();
    }
    floatTweens = [];
    for (i=0; i<controllers.length; i++) {
        floatTo(controllers[i],Math.random()*2);
    }
};

$("html").mouseleave(function(){ // breaks firefox interaction
    mouseRelease();
});


function init() {

    ////////////// SETUP CANVAS ////////////

    canvas = document.getElementById("cnvs");
    var target = canvas;

    // MOUSE //
    target.addEventListener("mousedown", mousePress, false);
    target.addEventListener("mouseup", mouseRelease, false);
    target.addEventListener("mousemove", mouseMove, false);

    // TOUCH //
    target.addEventListener('touchstart', function(event) {
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
            touchTakeover = true;
        } else {
            touchTakeover = false;
        }
        clickOrTouch();
    }, false);
    target.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
        }
        mouseMove(event);
    }, false);
    target.addEventListener('touchend', function(event) {
        mouseRelease();
        touchTakeover = false;
    }, false);

    cxa = canvas.getContext("2d");
    cxa.mozImageSmoothingEnabled = false;
    cxa.imageSmoothingEnabled = false;

    // SET CANVAS & DRAWING POSITIONS //
    metrics();
    setupAudio();


    loadPalette("land","img/land.gif");
    //loadPalette("shardLight","img/shardLight.gif");
    loadPalette("shardDark","img/shardDark.gif");

    draw();
} // END INIT




function loadComplete() {


    setupScene();
    setup3D();

    createFlickerParticles();
    createFlickerParticles2();
    createWorms();
    createWind();
    createDust();
    createRadials();
    createPassage();

    selectedController = controllers[0];
    BackgroundList = [];
    ControllerList = [];
    SceneryList = [];

    loadReady = true;


}

function startScene1() {

    scene = 1;

    Tone.Transport.setInterval(function() {
        if (ArpOsc.volume.value > -30) {

            var octave = ArpBase + Math.round(Math.random());
            var index = Math.floor(Math.random()*ArpScale.length);
            ArpOsc.frequency.rampTo(ArpOsc.noteToFrequency("" + ArpScale[index] + octave),0.006);

        }

    },"64n");

    Tone.Transport.start();

    delayTo(introAlpha,"A",0,1,0);

    // INTRO SEQUENCE //

    setTimeout( function() {
        colourTo(masterCol,-160,-120,-70,0,4);
        positionTo(controllers[0], controllers[0].Positions[1],0.1,0);
        positionTo(controllers[3], controllers[3].Positions[1],0.1,0);
        delayTo(MasterObject.rotation,"x",0.07,7,0.4); // vert
        delayTo(MasterObject.rotation,"y",0,5,0.4); // horiz

    },500);

    setTimeout( function() {
        colourTo(masterCol,120,100,100,1,0.2); // FLASH
        bumpFunctions(0.1,true);
        easeRotate = true;
    },6800);
    setTimeout( function() {
        colourTo(masterCol,60,-30,-100,1,1.6);
    },7000);

    setTimeout( function() {
        colourTo(masterCol,-40,-55,-45,1,1.6);
        colourTo(highPass,50,45,0,0,1.6);
        colourTo(lowPass,-255,30,50,0,1.6);
    },8600);

    setTimeout( function() {
        interactable = true;
    },9000);

}





//-------------------------------------------------------------------------------------------
//  LOOP
//-------------------------------------------------------------------------------------------




function draw() {
    if (scene===0) {
        drawIntro();
    }
    if (scene>0) {
        update();
        drawBG();
        drawScene();
        if (!interactable) {
            drawIntro();
        }
    }
    requestAnimationFrame(draw);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------



function update() {
    if (TWEEN) {
        TWEEN.update();
    }
    renderer3D.render(scene3D, camera3D);

    // EASE ROTATE //
    if (easeRotate) {
        MasterObject.rotation.y += easeTo(MasterObject.rotation.y, rotateDest.x, 8, 100);
        MasterObject.rotation.x += easeTo(MasterObject.rotation.x, rotateDest.y, 8, 100);
    }

    // FOR EACH CONTROLLER //
    for (var i=0; i<controllers.length; i++) {
        var controller = controllers[i];
        controller.ThreeObject.position.x += easeTo(controller.ThreeObject.position.x, controller.ThreeDest.x, 20, 100);
        controller.ThreeObject.position.y += easeTo(controller.ThreeObject.position.y, controller.ThreeDest.y, 20, 100);
    }

    scenery[3].ThreeObject.position.y += easeTo(scenery[3].ThreeObject.position.y, sunDest, 20, 100);

    orderY += easeTo(orderY, orderDest, 10, 100);

    masterRotate.y += degToRad(0.5);

    scaleRotate();
    updateFlicker();
    updateFlicker2();
    updateWorm2();
    updateWind();
    updateDust();
    updateRadial();
    updatePassage();

    var meter = DrumMeter.getLevel();
    if (meter>0.01) {
        drumLevel = 1 + (meter*0.1);
    }

}

function easeTo(from,to,speed,precision) {
    if (Math.round(from*precision) !== (Math.round(to*precision))) {
        return (((to - from)/100)*speed);
    }
    return 0;
}


function scaleRotate() {
    var xr = MasterObject.rotation.y;
    if (xr < 0) {xr = -MasterObject.rotation.y;}
    var yr = MasterObject.rotation.y;
    if (yr < 0) {yr = -MasterObject.rotation.y;}
    rotateScale.x = 1 - (xr * 0.5);
    rotateScale.y = 1 - (yr * 0.5);
}


function updateFlicker() {
    for (var i=0; i<flickerParticles.length; i++) {
        var p = flickerParticles[i];
        if (p.Active) {

            p.Position.x += p.Vector.x;
            p.Position.y += p.Vector.y;

            var changeSpeed = 0.5;
            var topSpeedX = 20;
            var topSpeedY = 17;

            if (p.Position.x>(50*units)) {
                p.Vector.x -= changeSpeed * (0.5+Math.random());
            }
            if (p.Position.x<(-50*units)) {
                p.Vector.x += changeSpeed * (0.5+Math.random());
            }
            if (p.Position.y>0) {
                p.Vector.y -= changeSpeed * (0.5+Math.random());
            }
            if (p.Position.y<0) {
                p.Vector.y += changeSpeed * (0.5+Math.random());
            }

            p.Vector.x = ValueInRange(p.Vector.x,-topSpeedX,topSpeedX);
            p.Vector.y = ValueInRange(p.Vector.y,-topSpeedY,topSpeedY);
        }
    }
}

function updateFlicker2() {
    for (var i=0; i<flickerParticles2.length; i++) {
        var p = flickerParticles2[i];
        if (p.Active) {

            p.Position.y -= p.Vector.y;
            var y = p.Position.y * units;

            if (y < -fullY) {
                p.Position.y = (fullY/units);
                p.Position.x = -100 + (Math.random()*200);
            }

        }
    }
}

function updateRadial() {
    for (var i=0; i<radialParticles.length; i++) {
        var p = radialParticles[i];
        if (p.Active) {

            p.Angle += p.Speed;
            if (p.Angle>360) {
                p.Angle -= 360;
            }
            p.Vector = vectorFromAngle(degToRad(p.Angle));
            p.Position = pointWithRotation(degToRad(p.Angle), p.Rad);
        }
    }
}

function updatePassage() {
    if (passageAlpha.A>0 && Player[9].volume.value >= -21) {

        for (var i=0; i<passageParticles.length; i++) {
            var p = passageParticles[i];

            p.Position.y += (floatSpeed.y + ((Player[9].volume.value + 20) * 0.3) ) * p.Z;

            if (p.Position.y > (fullY/units)) {
                p.Position.y = - (fullY/units);
                p.Position.x = (-halfX + (Math.random()*fullX) )/units;
            }
        }

    }

}

function updateWind() {
    var i,k;

    var peak = 2;
    for (i=0; i<windParticles.length; i++) {
        var p = windParticles[i];

        // RESET //
        if ((p.Focus > p.Particles.length)) {

            resetWind(p);

        }

        // UPDATE //
        var speed = 0.15;
        p.Amp[p.Focus] += speed;
        if (p.Focus > 0) {
            if (p.Amp[p.Focus - 1] > 0) {
                p.Amp[p.Focus - 1] -= speed;
            }
        }
        if (p.Amp[p.Focus] >= 1) {
            p.Focus += 1;
        }

        var sprite = [];
        var wp = p.Particles[0];
        var h = p.Amp[0] * peak;

        sprite.push(new Point(wp.Position.x, wp.Position.y) );
        sprite.push(new Point(wp.Position.x, wp.Position.y) );

        for (k=1; k<p.Particles.length; k++) {
            wp = p.Particles[k];
            h = p.Amp[k] * peak;
            if (k===(p.Particles.length-1)) {
                h = 0;
            }
            sprite.push(new Point(wp.Position.x, wp.Position.y - h) );
        }

        for (k=(p.Particles.length-1); k>0; k--) {
            wp = p.Particles[k];
            h = p.Amp[k] * peak;
            if (k===(p.Particles.length-1)) {
                h = 0;
            }
            sprite.push(new Point(wp.Position.x, wp.Position.y + h) );
        }

        p.Sprite = sprite;


    }
}

function resetWind(p) {
    p.Focus = 0;
    p.Particles[0].Vector.x = - (70 + (Math.random()*30));
    p.Particles[0].Vector.y = Math.random()*20;
    p.Particles[0].Position = new Point();
    p.Position = randomPoint(100,50);
    p.Amp[p.Amp.length-1] = 0;

    for (var j=1; j< p.Particles.length; j++) {
        p.Particles[j].Vector.x = p.Particles[j-1].Vector.x;
        p.Particles[j].Vector.y = p.Particles[j-1].Vector.y - windDir - (Math.random()*10);

        p.Particles[j].Position.x = p.Particles[j-1].Position.x + p.Particles[j].Vector.x;
        p.Particles[j].Position.y = p.Particles[j-1].Position.y + p.Particles[j].Vector.y;
    }
}

function updateDust() {
    var i;
    for (i=0; i<dustParticles.length; i++) {
        var p = dustParticles[i];

        p.Position.x += p.Vector.x;
        p.Position.y += p.Vector.y;

        //p.Position.y = ValueInRange(p.Position.y,-150,150);

        p.Vector.x = fluctuate(p.Vector.x,0.5);
        p.Vector.y = fluctuate(p.Vector.y,0.5);
        p.Vector.x = ValueInRange(p.Vector.x,-3,-10);
        p.Vector.y = ValueInRange(p.Vector.y,-3,3);

        if (p.Position.y < -150) {
            p.Vector.y = 0.5;
        }
        if (p.Position.y > 150) {
            p.Vector.y = -0.5;
        }

        if (p.Position.x < -halfX) {
            p.Position.x = fullX;
        }
    }
}

function updateWorm2() {

    var step = 20;
    var length = 11;

    var h = 0;
    var i, j, k;
    if (Player[3].volume.value>5) {
        h = (Player[3].volume.value - 5) / 2;
    }

    for (i=0; i<worms.length; i++) {
        var w = worms[i];
        if (w.Active) {

            w.Position.x += w.Vector.x;
            w.Position.y += w.Vector.y;

            // POSITION PARTICLES //
            var positions = [];
            for (j=0; j<w.Particles.length; j++) {
                var p = w.Particles[j];
                p.Position.x += -1 + (Math.random()*2);
                p.Position.y += -1 + (Math.random()*2);
                p.Position.x = ValueInRange(p.Position.x,-45,45);
                p.Position.y = ValueInRange(p.Position.y,-45,45);
                if (wormClock===step) {
                    positions.push(new Point(w.Position.x + p.Position.x, w.Position.y + p.Position.y));
                }

                // WRITE TAIL //
                if (w.History.length>1) {
                    var tailVector = new Vector(w.History[1][j].x - w.History[0][j].x, w.History[1][j].y - w.History[0][j].y);
                    w.Tails[j] = new Point(w.History[0][j].x + ((tailVector.x/step)*wormClock), w.History[0][j].y + ((tailVector.y/step)*wormClock));
                }

                // WRITE SPRITE //
                if (w.History.length===length) {
                    var sprite = [];
                    var chunk = 1/length;
                    var slice = chunk/step;
                    var m = 1;
                    sprite.push(new Point(w.Position.x + p.Position.x, w.Position.y + p.Position.y + h) );
                    sprite.push(new Point(w.Position.x + p.Position.x, w.Position.y + p.Position.y - h) );
                    for (k=(length-1); k>=0; k--) {
                        m = (chunk*k) - (slice*wormClock);
                        sprite.push(new Point(w.History[k][j].x, w.History[k][j].y - (h*m)) );
                    }
                    /*sprite.push(new Point(w.Tails[j].x, w.Tails[j].y - h) );
                    sprite.push(new Point(w.Tails[j].x, w.Tails[j].y + h) );*/
                    sprite.push(new Point(w.Tails[j].x, w.Tails[j].y) );

                    for (k=1; k<length; k++) {
                        m = (chunk*k) - (slice*wormClock);
                        sprite.push(new Point(w.History[k][j].x, w.History[k][j].y + (h*m)) );
                    }
                    w.Sprites[j] = sprite;
                }


            }

            // WRITE POSITION SNAPSHOT //
            if (wormClock===step) {
                w.History.push(positions);
                if (w.History.length>length) {
                    w.History.shift();
                }
            }

            var changeSpeed = 0.06;
            var topSpeedX = 10;
            var topSpeedY = 9;

            if (w.Position.x>(50*units)) {
                w.Vector.x -= changeSpeed * (0.5+Math.random());
            }
            if (w.Position.x<(-50*units)) {
                w.Vector.x += changeSpeed * (0.5+Math.random());
            }
            if (w.Position.y>0) {
                w.Vector.y -= changeSpeed * (0.5+Math.random());
            }
            if (w.Position.y<0) {
                w.Vector.y += changeSpeed * (0.5+Math.random());
            }

            w.Vector.x = ValueInRange(w.Vector.x,-topSpeedX,topSpeedX);
            w.Vector.y = ValueInRange(w.Vector.y,-topSpeedY,topSpeedY);
        }
    }

    // CLOCK //
    wormClock += 1;
    if (wormClock > step) {
        wormClock = 0;
    }
}