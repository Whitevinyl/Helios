/**
 * Created by luketwyman on 17/08/2015.
 */



// INIT //
var canvas;
var cxa;
var scene = 0;
var TWEEN;
var loadCount = 0;


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
var thisTick = 0;
var windowFocussed = true;


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
var controlRotation = new Point3D();
var selectedController = null;
var selectedControllerPos = new Point3D();
var mouseDown3D = new Point3D();
var interactable = false;


// COLOR //
var landCols = [];
var landColsLight = [];
var shardCols = [new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1), new RGBA(255,255,255,1)];
var shardColsDark = [];
var shardColsLight = [];

var masterCol = new RGBA(-255,-255,-255,0);
var highPass = new RGBA(0,0,0,0);
var lowPass = new RGBA(0,0,0,0);


// SCENE OBJECTS //
var BackgroundList = [];
var ControllerList = [];
var backgrounds = [];
var controllers = [];

var flickerParticles = [];
var flickerPool = [];

var floatTweens = [];


var masterRotate = new Point3D();
var testObjects = [];
var testMountain = 50;
var drumLevel = 1;


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
                shardColsDark = palette;
                shardCols = palette;
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

    // MOUSE //
    canvas.addEventListener("mousedown", mousePress, false);
    canvas.addEventListener("mouseup", mouseRelease, false);
    canvas.addEventListener("mousemove", mouseMove, false);

    // TOUCH //
    canvas.addEventListener('touchstart', function(event) {
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
            touchTakeover = true;
        } else {
            touchTakeover = false;
        }
        clickOrTouch();
    }, false);
    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
        }
        mouseMove(event);
    }, false);
    canvas.addEventListener('touchend', function(event) {
        mouseRelease();
        touchTakeover = false;
    }, false);

    cxa = canvas.getContext("2d");
    cxa.mozImageSmoothingEnabled = false;
    cxa.imageSmoothingEnabled = false;

    // SET CANVAS & DRAWING POSITIONS //
    metrics();
    loadPalette("land","img/land.gif");
    loadPalette("shardLight","img/shardLight.gif");
    loadPalette("shardDark","img/shardDark.gif");

} // END INIT




function loadComplete() {

    setupAudio();
    setupScene();
    setup3D();

    createFlickerParticles();
    //createTestObjects();

    scene = 1;
    selectedController = controllers[0];
    BackgroundList = [];
    ControllerList = [];

    draw();

    setTimeout( function() {
        colourTo(masterCol,-160,-120,-70,0,4);
        positionTo(controllers[0], controllers[0].Positions[1],0.1,0);
        positionTo(controllers[3], controllers[3].Positions[1],0.1,0);
        delayTo(MasterObject.rotation,"x",0.07,10,0.5); // vert
        delayTo(MasterObject.rotation,"y",0,6,0.5); // horiz

    },500);



    setTimeout( function() {
        colourTo(masterCol,120,100,100,1,0.2); // FLASH
        bumpFunctions(0.1,true);
        easeRotate = true;
    },8000);
    setTimeout( function() {
        colourTo(masterCol,60,-30,-100,1,2);
        //colourTo(masterCol,33,-10,-10,1,4);
        //paletteTo(shardCols,shardColsDark,3);
    },8200);

    setTimeout( function() {
        colourTo(masterCol,-40,-55,-45,1,2);
        colourTo(highPass,50,45,0,0,2);
        colourTo(lowPass,-255,30,50,0,2);
        //delayTo(controlRotation,"z",0,12,0); // z spin
    },10200);

    setTimeout( function() {
        interactable = true;
    },12000);

    /*setTimeout( function() {
        positionTo(controllers[1], controllers[1].Positions[1],4,0);
        positionTo(controllers[3], controllers[3].Positions[1],4,0);
        colourTo(masterCol,60,-30,-100,1,2);
    },18000);

    setTimeout( function() {
        colourTo(masterCol,5,0,0,1,4);
        delayTo(controlRotation,"z",2,12,0); // z spin
    },24000);*/

    /*setTimeout( function() {
        colourTo(masterCol,0,12,20,1,4);
        colourTo(highPass,-40,-40,-40,0,4);
        colourTo(lowPass,100,100,100,0,4);
    },30000);*/

    /*setTimeout( function() {
        colourTo(highPass,35,30,0,0,4);
        colourTo(lowPass,-200,40,60,0,4);
    },30000);*/

    /*setTimeout( function() {
        colourTo(masterCol,-40,-55,-45,1,4);
        colourTo(highPass,50,45,0,0,3);
        colourTo(lowPass,-255,30,50,0,3);
        //delayTo(controlRotation,"z",0,12,0); // z spin
    },37000);*/

}





//-------------------------------------------------------------------------------------------
//  LOOP
//-------------------------------------------------------------------------------------------




function draw() {
    if (scene==1) {
        update();
        drawBG();
        drawScene();
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
        /*if (controlRotation.z>0) {
            controllers[i].ThreeObject.rotation.z += (Math.PI / 180) * controlRotation.z;
        }*/

        controller.ThreeObject.position.x += easeTo(controller.ThreeObject.position.x, controller.ThreeDest.x, 12, 100);
        controller.ThreeObject.position.y += easeTo(controller.ThreeObject.position.y, controller.ThreeDest.y, 12, 100);

    }

    masterRotate.y += degToRad(0.5);
    //masterRotate.x += degToRad(0.1);

    scaleRotate();
    updateFlicker(new Point(halfX,halfY));

    var meter = DrumMeter.getLevel();
    //var meter = DrumMeter.getDb();
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


function updateFlicker(origin) {
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

