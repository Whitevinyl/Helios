/**
 * Created by luketwyman on 20/08/2015.
 */


//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------



function mousePress() {

    mouseIsDown = true;
    rolloverCheck();

    downPoint.x = mouseX;
    downPoint.y = mouseY;
    downRotation.x = MasterObject.rotation.y;
    downRotation.y = MasterObject.rotation.x;

    // FOR EACH CONTROLLER //
    for (var i=0; i<controllers.length; i++) {
        var controller = controllers[i];

        if (controller.RollOver) {

            if (controller.Event) {
                controller.Event();
            } else {
                controller.IsPressed = true;
                selectedController = controller;
                selectedControllerPos = clone3D(controller.ThreeObject.position);
                mouseDown3D = cursorTo3D(mouseX,mouseY,controller,camera3D);
            }

            return;
        }
    }


}

function mouseRelease() {
    mouseIsDown = false;
    rotating = false;

    for (var i=0; i<controllers.length; i++) {
        var controller = controllers[i];

        controller.IsPressed = false;

    }
}



function mouseMove(event) {

    var x,y;

    if (touchTakeover==true) {
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.pageX;
        y = event.pageY;
    }

    mouseX = x;
    mouseY = y;


    // 3D DRAG //
    //drag3D();
    rolloverCheck();


    if (selectedController.IsPressed && interactable) {
        dragController(selectedController,true);
    }
}

function rolloverCheck() {


    for (var i=0; i<controllers.length; i++) {
        var controller = controllers[i];
        var pos = get2Dfrom3D(controller, camera3D);
        controller.RollOver = hitBox(pos.x - ((controller.Size.w*0.5)*units), pos.y - ((controller.Size.h*0.5)*units), controller.Size.w*units, controller.Size.h*units);
    }


}

function hitBox(x,y,w,h) { // IS CURSOR WITHIN GIVEN BOUNDARIES
    var mx = mouseX;
    var my = mouseY;
    return (mx>x && mx<(x+w) && my>y && my<(y+h));
}


// DETERMINE CLICK //
function clickOrTouch(event) {

    var x,y;

    if (touchTakeover==true) {
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.pageX;
        y = event.pageY;
    }

    mouseX = x;
    mouseY = y;

    if (mouseIsDown==false) {
        mousePress(event);
    }
}


function drag3D() {
    if (mouseIsDown) {

        rotating = true;

        rotateDest.x = downRotation.x + ((Math.PI/180)*((mouseX - downPoint.x)/10));
        rotateDest.y = downRotation.y + ((Math.PI/180)*((mouseY - downPoint.y)/10));

        // CAP //
        var xLimit = 40;
        var yLimit = 20;

        if (rotateDest.x < (Math.PI/180) * -xLimit) {
            rotateDest.x = (Math.PI/180) * -xLimit;
        }
        if (rotateDest.x > (Math.PI/180) * +xLimit) {
            rotateDest.x = (Math.PI/180) * +xLimit;
        }
        if (rotateDest.y < (Math.PI/180) * -yLimit) {
            rotateDest.y = (Math.PI/180) * -yLimit;
        }
        if (rotateDest.y > (Math.PI/180) * +yLimit) {
            rotateDest.y = (Math.PI/180) * +yLimit;
        }
    }
}

function dragController(controller,toCursor) {

    if (controller.Slider) {
        var objPos = controller.ThreeDest;
        var slider = controller.Slider;

        var enableX = slider.range.x!==0;
        var enableY = slider.range.y!==0;

        var originX = slider.origin.x;
        var originY = slider.origin.y;
        var t = 0.1;

        // UPDATE POSITION & VALUE //
        var newPos = objPos;
        if (toCursor) {
            var cursorPos = cursorTo3D(mouseX,mouseY,controller,camera3D);
            var posDif = new Point(selectedControllerPos.x - mouseDown3D.x,selectedControllerPos.y - mouseDown3D.y );
            newPos = new Point(cursorPos.x + posDif.x, cursorPos.y + posDif.y);
        }

        if (enableX) {
            objPos.x = newPos.x;
            objPos.x = ValueInRange(objPos.x,originX,originX + slider.range.x);
            //slider.value.x = linValue(originX,originX + slider.range.x,slider.minVal.x,slider.maxVal.x,objPos.x);
            slider.value.x = getValue(controller,"x");
            if (slider.functions) {
                slider.functions[0](slider.value.x,t,true);
            }
        }
        if (enableY) {
            objPos.y = newPos.y;
            objPos.y = ValueInRange(objPos.y,originY,originY + slider.range.y);
            //slider.value.y = linValue(originY,originY + slider.range.y,slider.minVal.y,slider.maxVal.y,objPos.y);
            slider.value.y = getValue(controller,"y");
            if (slider.functions) {
                slider.functions[1](slider.value.y,t,true);
            }
        }
    }


}

function getValue(controller,axis) {
    var objPos = controller.ThreeDest;
    var slider = controller.Slider;
    var origin = slider.origin[""+axis];
    return linValue(origin,origin + slider.range[""+axis],slider.minVal[""+axis],slider.maxVal[""+axis],objPos[""+axis]);
}

