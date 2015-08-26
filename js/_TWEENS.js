/**
 * Created by luketwyman on 05/11/2014.
 */




function colourTo(col,r,g,b,a,t) {

    t = t || 1000;

    var cPos = {red: col.R, green: col.G, blue: col.B, alpha: col.A };

    var colTween = new TWEEN.Tween(cPos);
    colTween.to({ red: r, green: g, blue: b, alpha: a  }, t*1000);
    colTween.start();

    colTween.onUpdate(function() {
        col.R = this.red;
        col.G = this.green;
        col.B = this.blue;
        col.A = this.alpha;
    });

    colTween.easing( TWEEN.Easing.Quadratic.InOut );
}

function colourToColour(col,col2,t) {

    t = t || 1000;

    var cPos = {red: col.R, green: col.G, blue: col.B, alpha: col.A };

    var colTween = new TWEEN.Tween(cPos);
    colTween.to({ red: col2.R, green: col2.G, blue: col2.B, alpha: col2.A  }, t*1000);
    colTween.start();

    colTween.onUpdate(function() {
        col.R = this.red;
        col.G = this.green;
        col.B = this.blue;
        col.A = this.alpha;
    });

    colTween.easing( TWEEN.Easing.Quadratic.InOut );
}

function paletteTo(pal1,pal2,t) {

    var length = pal1.length;
    if (length > pal2.length) {
        length = pal2.length;
    }
    for (var i=0; i<length; i++) {
        colourToColour(pal1[i],pal2[i],t);
    }
}


function delayTo(obj,value,to,t,d) {

    var pos = { x: obj[""+value] };

    var tween = new TWEEN.Tween(pos);
    tween.to( { x: to }, t*1000 );
    tween.delay(d*1000);
    tween.start();

    tween.onUpdate(function() {
        obj[""+value] = this.x;
    });

    tween.easing( TWEEN.Easing.Quadratic.InOut );
    //tween.easing( TWEEN.Easing.Quintic.InOut );
}

function positionTo(pos,to,t,d,ease) {

    ease = ease || "quint";

    var tPos;
    if (pos.ThreeObject) {
        tPos = pos.ThreeObject.position;
    } else {
        tPos = pos.position;
    }
    var startPos = { x: tPos.x, y: tPos.y, z: tPos.z };

    var tween = new TWEEN.Tween(startPos);
    tween.to( { x: to.x, y: to.y, z: to.z }, t*1000 );
    tween.delay(d*1000);
    tween.start();

    tween.onUpdate(function() {
        tPos.x = this.x;
        tPos.y = this.y;
        tPos.z = this.z;

        if (pos.ThreeDest) {
            pos.ThreeDest.x = this.x;
            pos.ThreeDest.y = this.y;
        }

    });

    if (ease==="quad") {
        tween.easing( TWEEN.Easing.Quadratic.InOut );
    } else if (ease==="cube") {
        tween.easing( TWEEN.Easing.Cubic.InOut );
    } else if (ease==="quart") {
        tween.easing( TWEEN.Easing.Quartic.InOut );
    } else if (ease==="quint") {
        tween.easing( TWEEN.Easing.Quintic.InOut );
    } else if (ease==="expo") {
        tween.easing( TWEEN.Easing.Exponential.InOut );
    }

}

function worldTo(pos,to,t,d) {

    var tPos;
    if (pos.ThreeObject) {
        tPos = pos.ThreeObject.position;
    } else {
        tPos = pos.position;
    }
    var startPos = { x: tPos.x, y: tPos.y, z: tPos.z };

    var tween = new TWEEN.Tween(startPos);
    tween.to( { x: to.x, y: to.y, z: to.z }, t*1000 );
    tween.delay(d*1000);
    tween.start();

    tween.onUpdate(function() {
        tPos.x = this.x;
        tPos.y = this.y;
        tPos.z = this.z;

        if (pos.ThreeDest) {
            pos.ThreeDest.x = this.x;
            pos.ThreeDest.y = this.y;
        }

    });

    tween.easing( TWEEN.Easing.Quadratic.InOut );
    //tween.easing( TWEEN.Easing.Quintic.InOut );
}

function floatTo(obj,d) {

    var pos = { y: obj.ThreeFloat.position.y };
    var to;
    if (obj.ThreeFloat.position.y>0) {
        to = -0.02;
    } else {
        to = 0.02;
    }

    var tween = new TWEEN.Tween(pos);
    tween.to( { y: to }, 2000 );
    tween.delay(d*1000);
    tween.start();
    floatTweens.push(tween);

    tween.onUpdate(function() {
        obj.ThreeFloat.position.y = this.y;
    });

    tween.onComplete(function() {
       // if (windowFocussed) {
            floatTo(obj,0);
        //}
    });

    tween.easing( TWEEN.Easing.Sinusoidal.InOut );
}

