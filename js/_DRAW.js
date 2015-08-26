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
//  FOREGROUND
//-------------------------------------------------------------------------------------------




function drawScene() {
    var i;
    var pos;


    for (i=(backgrounds.length-1); i>-1; i--) {
        var background = backgrounds[i];
        pos = get2Dfrom3D(background, camera3D);
        setColor(background.Color);
        //cxa.fillStyle = background.Color.toString();
        drawBackground(background,pos);
    }

    for (i=0; i< controllers.length; i++) {
        var controller = controllers[i];
        cxa.globalAlpha = 1;

        for (var j=0; j< controller.Shards.length; j++) {
            var shard = controller.Shards[j];
            pos = get2Dfrom3D(shard, camera3D);
            if (shard.Vine>0) {
                drawVine(shard,pos);
            }
            drawSprite(shard,pos);
        }

        drawArrows(controller);
    }

    cxa.globalAlpha = 1;
    setColor(shardCols[4]);
    //cxa.fillStyle = shardCols[4].toString();
    cxa.font = "400 " + midType + "px Raleway";
    cxa.textAlign = "center";
    cxa.fillText("Helios | Yume".toUpperCase(),halfX, fullY - (30*units));
    cxa.fillRect(halfX - (6*units), fullY - (21*units), 12*units, 2*units );

    //cxa.fillRect(testPoint.x - (40*units), testPoint.y - (20*units), 80*units, 40*units );


    /*for (i=0; i< testObjects.length; i++) {
        var point = point2Dfrom3D(testObjects[i]);
        cxa.fillRect( halfX + (point.x) - (2*units), halfY + (point.y) - (2*units), 4*units, 4*units );
    }*/

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

function drawVine(obj,pos) {
    var w = 2*units;
    var h = obj.Vine*units;

    setColor(shardCols[6]);
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
    if (AmbientPlayer.volume.value>5) {

        h = (AmbientPlayer.volume.value-5) / 8;


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


