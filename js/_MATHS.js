/**
 * Created by luketwyman on 20/08/2015.
 */


//-------------------------------------------------------------------------------------------
//  MATHS
//-------------------------------------------------------------------------------------------

function ValueInRange(value,floor,ceiling) {
    var fl = floor;
    var ce = ceiling;
    if (fl > ce) {
        fl = ceiling;
        ce = floor;
    }
    if (value < fl) {
        value = fl;
    }
    if (value > ce) {
        value = ce;
    }
    return value;
}

function logValue(minpos,maxpos,minval,maxval,position) {
    var minlval = Math.log(minval);
    var maxlval = Math.log(maxval);
    var scale = (maxlval - minlval) / (maxpos - minpos);
    return Math.exp((position - minpos) * scale + minlval);
}

function linValue(minpos,maxpos,minval,maxval,position) {
    var scale = (maxval - minval) / (maxpos - minpos);
    return (position - minpos) * scale + minval;
}

function linPosition(minpos,maxpos,minval,maxval,value) {
    var scale = (maxval - minval) / (maxpos - minpos);
    return minpos + (value - minval) / scale;
}

function comparison(a,b,precision) {
    precision = precision || 50;
    return Math.round(a*precision) === Math.round(b*precision);
}

function clone3D(point3d) {
    return new Point3D(point3d.x,point3d.y,point3d.x);
}


// pseudo 3d //

function degToRad(deg) {
    return deg * (Math.PI/180);
}

function getRadius(a,b) {
    return Math.sqrt((a*a)+(b*b));
}

function angleFromVector(a,b) {
    return Math.atan2(a,b);
}

function randomAngle() {
    return Math.random()*(Math.PI*2)
}

function vectorFromAngle(angle) {
    return new Vector(Math.cos(angle),Math.sin(angle));
}

function pointWithRotation(rotation,radius) {
    var x = (Math.cos(rotation)) * radius;
    var y = (Math.sin(rotation)) * radius;
    return new Point(x,y);
}

function point2Dfrom3D(point3d) {

    var rotation = masterRotate;

    var xRad = getRadius(point3d.y, point3d.z);
    var yRad = getRadius(point3d.x, point3d.z);

    var xAngle = angleFromVector(point3d.y,point3d.z);
    var yAngle = angleFromVector(point3d.x,point3d.z);

    var xPos = pointWithRotation(rotation.y + xAngle,xRad).x;
    var yPos = pointWithRotation(rotation.x + yAngle,yRad).y;
    //yPos = pointWithRotation(rotation.y + xAngle,xRad).y;

    var scale = 30;
    //return perspectiveOffset(xPos*scale,yPos*scale,point3d.z*scale);

    return new Point(xPos*scale,yPos*scale);
}

function perspectiveOffset(x,y,z) {
    var vector = normaliseVector(new Vector(x,y));
    return new Point(x + (vector.x*z),y + (vector.y*z));
}

function normaliseVector(v) {
    var m = Math.sqrt((v.x * v.x) + (v.y * v.y));
    return new Point(v.x / m, v.y / m);
}