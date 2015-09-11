/**
 * Created by luketwyman on 03/11/2014.
 */


//-------------------------------------------------------------------------------------------
//  BG
//-------------------------------------------------------------------------------------------


function drawBG() {

    cxa.globalAlpha = 1;

    setColor(landCols[0]);
    //cxa.fillStyle = landCols[0].toString();
    cxa.fillRect(0,0,fullX,fullY);
}


//-------------------------------------------------------------------------------------------
//  INTRO
//-------------------------------------------------------------------------------------------


function drawIntro() {

    cxa.globalAlpha = introAlpha.A/100;

    if (scene===0) {
        cxa.fillStyle = "#000";
        cxa.fillRect(0,0,fullX,fullY);
    }


    cxa.fillStyle = "#fff";
    cxa.strokeStyle = "#fff";
    if (loadReady) {

        cxa.font = "100 " + headerType + "px Raleway";
        cxa.textAlign = "center";
        cxa.fillText("HELIOS | YUME".toUpperCase(),halfX, halfY - (10*units));

        var s = 1 + (Math.random()*0.2);
        var ay = halfY + (30*units);
        cxa.beginPath();
        cxa.moveTo(halfX - ((20*s)*units),ay - ((10*s)*units));
        cxa.lineTo(halfX + ((20*s)*units),ay - ((10*s)*units));
        cxa.lineTo(halfX,ay + ((10*s)*units));
        cxa.closePath();
        cxa.fill();



    } else {
        cxa.font = "400 " + midType + "px Raleway";
        cxa.textAlign = "center";
        cxa.fillText("Loading Sounds".toUpperCase(),halfX, halfY - (4*units));
        cxa.fillRect(halfX - (6*units), halfY + (4*units), 12*units, 2*units );

        cxa.beginPath();
        cxa.moveTo(halfX - (60*units),halfY + (20*units));
        cxa.lineTo(halfX + (60*units),halfY + (20*units));
        cxa.lineTo(halfX + (60*units),halfY + (32*units));
        cxa.lineTo(halfX - (60*units),halfY + (32*units));
        cxa.closePath();
        cxa.stroke();

        cxa.fillRect(halfX - (60*units), halfY + (20*units), ((120/loadTotal)*loadedLoops)*units, 12*units );

    }
}






//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {
    var i;
    var pos;

    drawSun();

    // BACKGROUNDS //
    if (near(scene,1,3)) {
        for (i=(backgrounds.length-1); i>-1; i--) {
            var background = backgrounds[i];
            pos = get2Dfrom3D(background, camera3D);
            setColor(background.Color);
            //cxa.fillStyle = background.Color.toString();
            drawBackground(background,pos);
        }
    }


    // TRIANGLE //
    //if (near(scene,2,1)) {

        drawTriangle();

        // WORMS //
        for (i=0; i< worms.length; i++) {
            drawWorm2(worms[i]);
        }
    //}

    drawPagoda();

    // WIND //
    for (i=0; i< windParticles.length; i++) {
        drawWind(windParticles[i]);
    }
    // WIND //
    for (i=0; i< dustParticles.length; i++) {
        drawDust(dustParticles[i]);
    }

    // PAGODA FLICKERS //
    for (i=0; i< flickerParticles2.length; i++) {
        drawFlickers2(flickerParticles2[i]);
    }

    // RADIAL //
    for (i=0; i< radialParticles.length; i++) {
        drawRadials(radialParticles[i]);
    }

    drawPassage();

    drawExtra();

    // CONTROLLERS / SHARDS //
    for (i=0; i< controllers.length; i++) {
        var controller = controllers[i];
        cxa.globalAlpha = 1;

        for (var j=0; j< controller.Shards.length; j++) {
            var shard = controller.Shards[j];
            pos = get2Dfrom3D(shard, camera3D);
            if (shard.Vine>0) {
                setColor(shardCols[6]);
                drawVine(shard.Vine,pos);
            }
            drawSprite(shard,pos);
        }

        drawArrows(controller);
    }

    drawLensFlare();

    // HUD //
    cxa.globalAlpha = 1;
    setColor(shardCols[4]);
    //cxa.fillStyle = shardCols[4].toString();
    cxa.font = "400 " + midType + "px Raleway";
    cxa.textAlign = "center";
    cxa.fillText("Helios | Yume".toUpperCase(),halfX, fullY - (30*units));
    cxa.fillRect(halfX - (6*units), fullY - (21*units), 12*units, 2*units );

    // FLICKERS //
    for (i=0; i< flickerParticles.length; i++) {
        drawFlickers(flickerParticles[i]);
    }



}



//-------------------------------------------------------------------------------------------
//  DRAW FUNCTIONS
//-------------------------------------------------------------------------------------------


function drawSprite(obj,pos) {

    var size = obj.Size;
    var points = obj.Sprite.Points;
    var x = pos.x;
    var y = pos.y;
    var xs = 1;
    if (obj.XScale===true) {
        xs = rotateScale.x;
    }
    setColor(obj.Color);
    //cxa.fillStyle = obj.Color.toString();
    cxa.beginPath();
    cxa.moveTo( x + (((points[0].x * size.w)*xs)*units), y + ((points[0].y * size.h)*units) );
    for (var k=1; k<points.length; k++) {
        cxa.lineTo( x + (((points[k].x * size.w)*xs)*units), y + ((points[k].y * size.h)*units) );
    }
    cxa.closePath();
    cxa.fill();
}

function drawVine(height,pos) {
    var w = 2*units;
    var h = height*units;


    //cxa.fillStyle = shardCols[6].toString();
    cxa.beginPath();
    cxa.moveTo(pos.x - w, pos.y);
    cxa.lineTo(pos.x, pos.y + (h*units));
    cxa.lineTo(pos.x + w, pos.y);
    cxa.closePath();
    cxa.fill();
}


function drawArrows(obj) {

    // set alpha //
    if (obj.RollOver) {
        if (obj.ArrowAlpha < 100) {
            obj.ArrowAlpha += 5;
        }
    } else {
        if (obj.ArrowAlpha > 0) {
            obj.ArrowAlpha -= 5;
        }
    }

    if (obj.IsPressed) {
        obj.ArrowAlpha = 100;
    }

    // draw arrows //
    if (obj.ArrowAlpha>0 && interactable && !(selectedController.IsPressed && selectedController!==obj)) {

        var mode = obj.Mode;
        var pos = get2Dfrom3D(obj, camera3D);

        var size = 5*units;
        var distance = (8 + (obj.ArrowAlpha * 0.016))*units;
        var alpha = obj.ArrowAlpha/100;
        if (obj.Slider) {
            var floorX = comparison(obj.ThreeDest.x,obj.Slider.origin.x);
            var ceilX = comparison(obj.ThreeDest.x,obj.Slider.origin.x + obj.Slider.range.x);
            var floorY = comparison(obj.ThreeDest.y,obj.Slider.origin.y);
            var ceilY = comparison(obj.ThreeDest.y,obj.Slider.origin.y + obj.Slider.range.y);
        }

        var down = (mode=="upDown" || mode=="omni" || mode=="shiftDown");
        var up = (mode=="upDown" || mode=="omni" || mode=="shiftUp");
        var left = (mode=="leftRight" || mode=="omni" || mode=="shiftLeft");
        var right = (mode=="leftRight" || mode=="omni" || mode=="shiftRight");

        var low = 0.1;


        setColor(shardCols[4]);

        if (down) {

            if (floorY) {
                cxa.globalAlpha = alpha * low;
            } else {
                cxa.globalAlpha = alpha;
            }
            // down
            cxa.beginPath();
            cxa.moveTo(pos.x - size, pos.y + distance);
            cxa.lineTo(pos.x, pos.y + distance + size);
            cxa.lineTo(pos.x + size, pos.y + distance);

            cxa.lineTo(pos.x + size - (2*units), pos.y + distance);
            cxa.lineTo(pos.x, pos.y + distance + size - (2*units));
            cxa.lineTo(pos.x - size + (2*units), pos.y + distance);
            cxa.closePath();
            cxa.fill();

        }

        if (up) {

            if (ceilY) {
                cxa.globalAlpha = alpha * low;
            } else {
                cxa.globalAlpha = alpha;
            }
            // up
            cxa.beginPath();
            cxa.moveTo(pos.x - size, pos.y - distance);
            cxa.lineTo(pos.x, pos.y - distance - size);
            cxa.lineTo(pos.x + size, pos.y - distance);

            cxa.lineTo(pos.x + size - (2*units), pos.y - distance);
            cxa.lineTo(pos.x, pos.y - distance - size + (2*units));
            cxa.lineTo(pos.x - size + (2*units), pos.y - distance);
            cxa.closePath();
            cxa.fill();
        }

        if (left) {

            if (floorX) {
                cxa.globalAlpha = alpha * low;
            } else {
                cxa.globalAlpha = alpha;
            }
            // left
            cxa.beginPath();
            cxa.moveTo(pos.x - distance, pos.y - size);
            cxa.lineTo(pos.x - distance - size, pos.y);
            cxa.lineTo(pos.x - distance, pos.y + size);

            cxa.lineTo(pos.x - distance, pos.y + size - (2*units));
            cxa.lineTo(pos.x - distance - size + (2*units), pos.y);
            cxa.lineTo(pos.x - distance, pos.y - size + (2*units));
            cxa.closePath();
            cxa.fill();

        }

        if (right) {

            if (ceilX) {
                cxa.globalAlpha = alpha * low;
            } else {
                cxa.globalAlpha = alpha;
            }
            // right
            cxa.beginPath();
            cxa.moveTo(pos.x + distance, pos.y - size);
            cxa.lineTo(pos.x + distance + size, pos.y);
            cxa.lineTo(pos.x + distance, pos.y + size);

            cxa.lineTo(pos.x + distance, pos.y + size - (2*units));
            cxa.lineTo(pos.x + distance + size - (2*units), pos.y);
            cxa.lineTo(pos.x + distance, pos.y - size + (2*units));
            cxa.closePath();
            cxa.fill();

        }

        if (mode==="shiftUp" || mode==="shiftDown" || mode==="shiftLeft" || mode==="shiftRight") {
            cxa.globalAlpha = alpha;
            //cxa.fillRect(pos.x - size, pos.y - units, size * 2, 2*units);
            cxa.beginPath();
            cxa.moveTo(pos.x - (2*units), pos.y);
            cxa.lineTo(pos.x, pos.y - (2*units));
            cxa.lineTo(pos.x + (2*units), pos.y);
            cxa.lineTo(pos.x, pos.y + (2*units));
            cxa.closePath();
            cxa.fill();
        }
        /*if (mode==="shiftLeft" || mode==="shiftRight") {
            cxa.globalAlpha = alpha;
            cxa.fillRect(pos.x - units, pos.y - size, 2*units, size * 2);
        }*/

    }
    cxa.globalAlpha = 1;
}

function drawBackground(obj,pos) {

    var points = obj.Sprite.Points;
    var x = pos.x;
    var y = pos.y;

    cxa.beginPath();
    cxa.moveTo( x + ((points[0].x)*units), y + ((points[0].y)*units) );
    for (var k=1; k<points.length; k++) {
        var db = 1;
        if (points[k].y<0) {
            db = drumLevel;
        }

        cxa.lineTo( x + ((points[k].x)*units), y + ((points[k].y * db)*units) );
    }
    cxa.lineTo( x + (1500*units), y + (1000*units) );
    cxa.lineTo( x - (1500*units), y + (1000*units) );
    cxa.closePath();
    cxa.fill();
}

function drawFlickers(p) {

    var origin = get2Dfrom3D(World3D,camera3D);

    var x = origin.x + (p.Position.x*units);
    var y = origin.y + (p.Position.y*units);
    var vx = p.Vector.x*2;
    var vy = p.Vector.y*2;
    var h = 0;
    if (Player[0].volume.value>5) {

        h = (Player[0].volume.value-5) / 8;


        setColor(shardCols[4]);
        cxa.beginPath();
        cxa.moveTo( x - (vx*units), y - ((vy+h)*units) );
        cxa.lineTo( x + (vx*units), y + ((vy-h)*units) );
        cxa.lineTo( x + (vx*units), y + ((vy+h)*units) );
        cxa.lineTo( x - (vx*units), y - ((vy-h)*units) );
        cxa.closePath();
        cxa.fill();

    }
}

function drawFlickers2(p) {

    var origin = get2Dfrom3D(scenery[0],camera3D);

    var x = origin.x + (p.Position.x*units);
    var y = origin.y + (p.Position.y*units);
    var h = 0;
    if (Player[5].volume.value>5) {

        h = (Player[5].volume.value-5) / 12;


        setColor(shardCols[4]);
        cxa.fillRect(x - (h*units),y - (100*units), (h*2) * units, 200 * units);

    }
}

function drawWind(p) {

    var origin = get2Dfrom3D(backgrounds[0],camera3D);
    var sprite = p.Sprite;

    var x = origin.x + ((p.Position.x + 500) * units);
    var y = origin.y + ((p.Position.y - 100) * units);

    setColor(shardCols[4]);

    cxa.beginPath();
    cxa.moveTo(x + (sprite[0].x * units),y + (sprite[0].y * units) );
    for (var j=0; j< sprite.length; j++) {
        cxa.lineTo(x + (sprite[j].x * units), y + (sprite[j].y * units));
    }
    cxa.closePath();
    cxa.fill();
}

function drawDust(p) {
    var size = 4 * units;
    var origin = get2Dfrom3D(backgrounds[0],camera3D);

    var x = origin.x + (p.Position.x * units);
    var y = origin.y + ((p.Position.y - 100) * units);

    setColor(shardCols[4]);
    cxa.fillRect(x - (size* 0.5), y - (size* 0.5), size, size );

}

function drawSun() {

    var origin = get2Dfrom3D(scenery[3],camera3D);
    var x = origin.x;
    var y = origin.y;
    var r;

    setRGBA(200,180,160,1);


    r = Math.random()*50;
    cxa.beginPath();
    cxa.arc(x,y,((Reverb.wet.value*2500) + r)*units,0,2*Math.PI);
    cxa.closePath();
    cxa.fill();

    setColor(shardCols[4]);


    r = Math.random()*10;
    cxa.beginPath();
    cxa.arc(x,y,(180 + r)*units,0,2*Math.PI);
    cxa.closePath();
    cxa.fill();

}

function drawRadials(p) {

    var origin = get2Dfrom3D(scenery[3],camera3D);
    var x = origin.x + (p.Position.x*units);
    var y = origin.y + (p.Position.y*units);
    var vx = p.Vector.x;
    var vy = p.Vector.y;
    var r =  1 + (( Player[7].volume.value + 20 ) / 11.25);

    setRGBA(180,80,90,1);
    cxa.beginPath();
    cxa.moveTo(x - ((vy*50)*units), y + ((vx*50)*units));
    cxa.lineTo(x + ((vx*r)*units), y + ((vy*r)*units));
    cxa.lineTo(x + ((vy*50)*units), y - ((vx*50)*units));
    cxa.lineTo(x + ((vx*1)*units), y + ((vy*1)*units));
    cxa.closePath();
    cxa.fill();

}

function drawLensFlare() {
    var origin = get2Dfrom3D(scenery[3],camera3D);

    var x = halfX - ((origin.x - halfX)*0.7);
    var y = halfY - (60*units) - ((origin.y - halfY)*0.7);

    setRGBA(210,220,255,1);
    cxa.globalAlpha = 0.5;
    cxa.beginPath();
    cxa.moveTo(x - (20*units), y - (5*units));
    cxa.lineTo(x + (20*units), y - (5*units));
    cxa.lineTo(x, y + (31*units));
    cxa.closePath();
    cxa.fill();

    x = halfX - ((origin.x - halfX)*0.9);
    y = halfY - (60*units) - ((origin.y - halfY)*0.9);

    setRGBA(255,220,230,1);
    cxa.beginPath();
    cxa.moveTo(x - (40*units), y - (10*units));
    cxa.lineTo(x + (40*units), y - (10*units));
    cxa.lineTo(x, y + (55*units));
    cxa.closePath();
    cxa.fill();

    cxa.globalAlpha = 1;

}

function drawPassage() {
    if (passageAlpha.A>0) {
        var i;
        setColor(shardCols[4]);
        cxa.globalAlpha = passageAlpha.A/100;
        for (i=0; i< passageParticles.length; i++) {
            var p =passageParticles[i];

            var s = p.Z;
            var su = s * units;
            var x = halfX + (p.Position.x * units);
            var y = halfY + (p.Position.y * units);

            cxa.fillRect(x - (1*su), y - ( (1 + ((Player[9].volume.value + 20) * 2))*su), 2*su,( (2 + ((Player[9].volume.value + 20) * 4))*su));



        }
        cxa.globalAlpha = 1;
    }
}

function drawPagoda() {

    var x, y, origin;
    var xs = 1;
    /*if (scenery[0].XScale===true) {
        xs = rotateScale.x;
    }*/

    origin = get2Dfrom3D(scenery[2],camera3D);
    x = origin.x;
    y = origin.y;


    var yh = Math.random()*5;

    setColor(shardCols[5]);
    cxa.beginPath();
    cxa.moveTo( x - ((140*xs)*units), y - ((120+yh)*units) ); // tl
    cxa.lineTo( x, y - ((80+yh)*units) );
    cxa.lineTo( x + ((140*xs)*units), y - ((120+yh)*units) );
    cxa.lineTo( x + ((140*xs)*units), y - ((80-yh)*units) );
    cxa.lineTo( x, y - ((40-yh)*units) );
    cxa.lineTo( x - ((140*xs)*units), y - ((80-yh)*units) );
    cxa.closePath();
    cxa.fill();


    setColor(landCols[2]);
    pagodaHeader(x,y - (5*units),180,60,xs);



    setColor(shardCols[5]);
    drawVine(100,new Point(x - (60*units),y - (5*units)));
    drawVine(140,new Point(x - (56*units),y - (5*units)));
    drawVine(70,new Point(x + (80*units),y - (5*units)));
    drawVine(90,new Point(x + (90*units),y - (5*units)));
    drawVine(180,new Point(x - (132*units),y - (5*units)));
    drawVine(120,new Point(x - (145*units),y - (5*units)));

    cxa.lineWidth = 2* units;
    var ps1 = new Point(x + (60*units),y - (5*units));
    var ps2 = new Point(x + (155*units),y - (5*units));

    cxa.beginPath();
    cxa.moveTo(ps1.x, ps1.y);
    cxa.bezierCurveTo(ps1.x, ps1.y+(100*units), ps2.x, ps1.y+(100*units), ps2.x, ps2.y);
    cxa.stroke();
    cxa.lineWidth = 1;










    // MID //
    origin = get2Dfrom3D(scenery[1],camera3D);
    x = origin.x;
    y = origin.y;

    setColor(landCols[2]);
    pagodaHeader(x,y - (60*units),100,32,xs);


    cxa.beginPath();
    cxa.moveTo( x - ((60*xs)*units), y - (80*units) ); // tl
    cxa.lineTo( x + ((60*xs)*units), y - (80*units) );
    cxa.lineTo( x , y - (100*units) );
    cxa.closePath();
    cxa.fill();

    cxa.beginPath();
    cxa.moveTo( x - ((140*xs)*units), y ); // tl
    cxa.lineTo( x - ((140*xs)*units), y + (120*units) );
    cxa.lineTo( x - ((110*xs)*units), y + (130*units) );
    cxa.lineTo( x - ((100*xs)*units), y + (140*units) );
    cxa.lineTo( x - ((100*xs)*units), y );
    cxa.closePath();
    cxa.fill();

    cxa.beginPath();
    cxa.moveTo( x + ((140*xs)*units), y ); // tl
    cxa.lineTo( x + ((140*xs)*units), y + (160*units) );
    cxa.lineTo( x + ((130*xs)*units), y + (170*units) );
    cxa.lineTo( x + ((107*xs)*units), y + (175*units) );
    cxa.lineTo( x + ((100*xs)*units), y + (180*units) );
    cxa.lineTo( x + ((100*xs)*units), y );
    cxa.closePath();
    cxa.fill();

    setColor(shardCols[3]);
    cxa.beginPath();
    cxa.moveTo( x - ((140*xs)*units), y - (5*units) ); // tl
    cxa.lineTo( x - ((140*xs)*units), y + (15*units) );
    cxa.lineTo( x - ((120*xs)*units), y + (10*units) );
    cxa.lineTo( x - ((107*xs)*units), y + (30*units) );
    cxa.lineTo( x - ((100*xs)*units), y + (20*units) );
    cxa.lineTo( x - ((100*xs)*units), y - (5*units) );

    cxa.moveTo( x + ((140*xs)*units), y - (5*units) ); // tl
    cxa.lineTo( x + ((140*xs)*units), y + (40*units) );
    cxa.lineTo( x + ((130*xs)*units), y + (55*units) );
    cxa.lineTo( x + ((107*xs)*units), y + (50*units) );
    cxa.lineTo( x + ((100*xs)*units), y + (60*units) );
    cxa.lineTo( x + ((100*xs)*units), y - (5*units) );
    cxa.closePath();
    cxa.fill();

    // green //
    //setColor(shardCols[6]);
    setRGBA(105,130,115,1);
    cxa.beginPath();
    cxa.moveTo( x - ((20*xs)*units), y - (5*units) ); // tl
    cxa.lineTo( x + ((20*xs)*units), y + (10*units) );
    cxa.lineTo( x + ((40*xs)*units), y + (6*units) );
    cxa.lineTo( x + ((70*xs)*units), y + (17*units) );
    cxa.lineTo( x + ((75*xs)*units), y + (19*units) );
    cxa.lineTo( x + ((100*xs)*units), y + (13*units) );

    cxa.lineTo( x + ((130*xs)*units), y - (5*units) );
    cxa.closePath();
    cxa.fill();


    setRGBA(120,140,130,1);
    cxa.beginPath();
    cxa.moveTo( x + ((90*xs)*units), y - (5*units) ); // tl
    cxa.lineTo( x + ((60*xs)*units), y + (10*units) );
    cxa.lineTo( x + ((50*xs)*units), y + (40*units) );
    cxa.lineTo( x + ((65*xs)*units), y + (14*units) );

    cxa.lineTo( x + ((90*xs)*units), y - (3*units) );

    cxa.lineTo( x + ((80*xs)*units), y + (15*units) );
    cxa.lineTo( x + ((75*xs)*units), y + (55*units) );
    cxa.lineTo( x + ((85*xs)*units), y + (20*units) );
    cxa.closePath();
    cxa.fill();

    setColor(shardCols[5]);
    cxa.fillRect(x-(145*units),y-(40*units),290*units,44*units);

    // FRONT //
    origin = get2Dfrom3D(scenery[0],camera3D);
    x = origin.x;
    y = origin.y;



    drawVine(50,new Point(x - (90*units),y - (5*units)));
    drawVine(60,new Point(x - (65*units),y - (5*units)));
    drawVine(120,new Point(x + (85*units),y - (5*units)));
    drawVine(50,new Point(x + (160*units),y - (5*units)));
    drawVine(170,new Point(x + (130*units),y - (5*units)));

    cxa.lineWidth = 2* units;
    ps1 = new Point(x + (130*units),y - (5*units));
    ps2 = new Point(x + (165*units),y - (5*units));

    cxa.beginPath();
    cxa.moveTo(ps1.x, ps1.y);
    cxa.bezierCurveTo(ps1.x, ps1.y+(80*units), ps2.x, ps1.y+(80*units), ps2.x, ps2.y);
    cxa.stroke();
    cxa.lineWidth = 1;

    //setColor(landCols[1]);
    pagodaHeader(x,y,200,60,xs);

    cxa.beginPath();
    cxa.moveTo( x - ((60*xs)*units), y - (45*units) ); // tl
    cxa.lineTo( x + ((60*xs)*units), y - (45*units) );
    cxa.lineTo( x , y - (65*units) );
    cxa.closePath();
    cxa.fill();

    cxa.beginPath();
    cxa.moveTo( x - ((140*xs)*units), y - (5*units) ); // tl
    cxa.lineTo( x - ((130*xs)*units), y + (8*units) );
    cxa.lineTo( x - ((120*xs)*units), y + (3*units) );
    cxa.lineTo( x - ((107*xs)*units), y + (5*units) );
    cxa.lineTo( x - ((105*xs)*units), y + (3*units) );
    cxa.lineTo( x - ((100*xs)*units), y - (5*units) );

    cxa.moveTo( x + ((140*xs)*units), y - (5*units) ); // tl
    cxa.lineTo( x + ((140*xs)*units), y - (5*units) );
    cxa.lineTo( x + ((130*xs)*units), y + (8*units) );
    cxa.lineTo( x + ((120*xs)*units), y + (2*units) );
    cxa.lineTo( x + ((110*xs)*units), y + (5*units) );
    cxa.lineTo( x + ((100*xs)*units), y - (5*units) );
    cxa.closePath();
    cxa.fill();

    setColor(shardCols[3]);
    cxa.beginPath();
    cxa.moveTo( x - ((50*xs)*units), y - (30*units) ); // tl
    cxa.lineTo( x , y - (20*units) );
    cxa.lineTo( x + ((50*xs)*units), y - (30*units) );
    //cxa.lineTo( x , y - (40*units) );
    cxa.closePath();
    cxa.fill();



}



function pagodaHeader(x,y,w,h,xs) {

    var yh = Math.random()*5;
    yh = 0;

    cxa.beginPath();
    cxa.moveTo( x - (((w*1.05)*xs)*units), y - (((h*1.15)+yh)*units) ); // tl
    cxa.lineTo( x - (((w*0.9)*xs)*units), y - (((h*0.82)+yh)*units) );
    cxa.lineTo( x + (((w*0.9)*xs)*units), y - (((h*0.82)+yh)*units) );
    cxa.lineTo( x + (((w*1.05)*xs)*units), y - (((h*1.15)+yh)*units) ); // tr
    cxa.lineTo( x + (((w*0.95)*xs)*units), y + (yh*units) );
    cxa.lineTo( x - (((w*0.95)*xs)*units), y + (yh*units) );
    cxa.closePath();
    cxa.fill();

}

function drawWorm2(w) {
    var j, k;
    if (Player[3].volume.value>5) {
        setColor(shardCols[4]);
        cxa.globalAlpha = 1;
        if (w.Sprites.length) {
            for (j=0; j< w.Sprites.length; j++) {

                var s = w.Sprites[j];
                cxa.beginPath();
                cxa.moveTo(halfX + (s[0].x*units), halfY + (s[0].y*units));
                for (k=1; k< s.length; k++) {
                    cxa.lineTo(halfX + (s[k].x*units), halfY + (s[k].y*units));
                }
                cxa.closePath();
                cxa.fill();
            }
        }
    }
}

function drawTriangle() {
    if (ArpOsc.volume.value>-20) {

        setColor(shardCols[5]);
        cxa.globalAlpha = 1;

        var v = triVector;
        var r = (160 + (Math.random()*10))*units;
        var x = halfX;
        var y = halfY + (20*units);
        var w = ((ArpOsc.volume.value + 20) * (2.5 + (Math.random()*1.5))) * units;

        if (scene < 4) {

            // OUTSIDE //
            cxa.beginPath();
            cxa.moveTo(x - (r * v.x), y + (r * v.y));
            cxa.lineTo(x, y - r);
            cxa.lineTo(x + (r * v.x), y + (r * v.y));


            // INSIDE //
            cxa.lineTo(x + ((r - w) * v.x), y + ((r - w) * v.y));
            cxa.lineTo(x, y - (r - w));
            cxa.lineTo(x - ((r - w) * v.x), y + ((r - w) * v.y));


            cxa.closePath();
            cxa.fill();
        } else {
            setColor(shardCols[4]);
            /*cxa.fillRect(x - ((r)* v.x), y - ((r)* v.x),w * v.x, r * v.x * 2);
            cxa.fillRect(x + ((r - w)* v.x), y - ((r)* v.x),w * v.x, r * v.x * 2);*/
            cxa.fillRect(x - (w* v.x), 0,w * v.x * 2, fullY);

        }



    }
}

function drawExtra() {

    setColor(shardCols[6]);
    cxa.lineWidth = 2* units;
    var ps1 = get2Dfrom3D(controllers[7],camera3D);
    var ps2 = get2Dfrom3D(controllers[6],camera3D);

    cxa.beginPath();
    cxa.moveTo(ps1.x, ps1.y);
    cxa.bezierCurveTo(ps1.x, ps1.y+(240*units), ps2.x, ps1.y+(240*units), ps2.x, ps2.y);
    cxa.stroke();
    cxa.lineWidth = 1;
}


// PASS COLOUR OBJECT //
function setColor(col) {

    // master color filter //
    var red = Math.round(col.R + masterCol.R);
    var green = Math.round(col.G + masterCol.G);
    var blue = Math.round(col.B + masterCol.B);
    var alpha = col.A + masterCol.A;

    // high & low pass color filters //
    var av = ((red + green + blue) / 3);
    var hp = av/255;
    var lp = 1 - (av/255);
    red += Math.round((highPass.R*hp) + (lowPass.R*lp));
    green += Math.round((highPass.G*hp) + (lowPass.G*lp));
    blue += Math.round((highPass.B*hp) + (lowPass.B*lp));

    buildColour(red,green,blue,alpha);
}


// PASS MANUAL R G B A //
function setRGBA(r,g,b,a) {
    var red = Math.round(r + masterCol.R);
    var green = Math.round(g + masterCol.G);
    var blue = Math.round(b + masterCol.B);
    var alpha = a + masterCol.A;

    // high & low pass color filters //
    var av = ((red + green + blue) / 3);
    var hp = av/255;
    var lp = 1 - (av/255);
    red += Math.round((highPass.R*hp) + (lowPass.R*lp));
    green += Math.round((highPass.G*hp) + (lowPass.G*lp));
    blue += Math.round((highPass.B*hp) + (lowPass.B*lp));

    buildColour(red,green,blue,alpha);
}


function buildColour(red,green,blue,alpha) {
    // RANGE //
    if (red<0) {
        red = 0;
    }
    if (red>255) {
        red = 255;
    }
    if (green<0) {
        green = 0;
    }
    if (green>255) {
        green = 255;
    }
    if (blue<0) {
        blue = 0;
    }
    if (blue>255) {
        blue = 255;
    }
    if (alpha<0) {
        alpha = 0;
    }
    if (alpha>1) {
        alpha = 1;
    }
    cxa.fillStyle = cxa.strokeStyle = "rgba("+red+","+green+","+blue+","+alpha+")";
}




//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


