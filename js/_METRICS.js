/**
 * Created by luketwyman on 20/08/2015.
 */


//-------------------------------------------------------------------------------------------
//  METRICS
//-------------------------------------------------------------------------------------------



function metrics() {

    var canvasDestW = window.innerWidth;
    var canvasDestH = window.innerHeight;
    canvas.width  = canvasDestW;
    canvas.height = canvasDestH;

    console.log(canvasDestW);

    // UNIT SIZES //
    halfX = Math.round(canvasDestW/2);
    halfY = Math.round(canvasDestH/2);
    fullX = canvasDestW;
    fullY = canvasDestH;

    // DEVICE CHECK //

    if (fullY>(fullX*1.05)) {
        device = "mobile";
    } else if (fullY>(fullX*0.65)) {
        device = "tablet";
    } else {
        device = "desktop";
    }
    console.log(device);

    var u;

    if (device=="mobile") {

        u = canvasDestW*2.6;
        units = (u/1000);

        // TEXT SIZES //
        headerType = Math.round(u/20);
        midType = Math.round(u/80);
        dataType = Math.round(u/120);
        bodyType = Math.round(u/100);
        subType = Math.round(u/90);

        if (camera3D) {
            camera3D.aspect = fullX / (fullX*1.2);
            camera3D.updateProjectionMatrix();
        }

    } else {

        u = canvasDestH*1.8;
        units = (u/800);

        // TEXT SIZES //
        headerType = Math.round(u/12);
        midType = Math.round(u/65);
        dataType = Math.round(u/100);
        bodyType = Math.round(u/100);
        subType = Math.round(u/90);


        if (camera3D) {
            camera3D.aspect = halfX / halfY;
            camera3D.updateProjectionMatrix();
        }
    }



    dx = halfX;
    dy = halfY;
}
