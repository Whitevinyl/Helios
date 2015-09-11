/**
 * Created by luketwyman on 20/08/2015.
 */


//-------------------------------------------------------------------------------------------
//  METRICS
//-------------------------------------------------------------------------------------------



function metrics() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = getPixelRatio();

    canvas.width  = width * ratio;
    canvas.height = height * ratio;

    cxa.setTransform(ratio, 0, 0, ratio, 0, 0);

    console.log(width);
    console.log(ratio);

    // UNIT SIZES //
    halfX = Math.round((width * ratio)/2);
    halfY = Math.round((height * ratio)/2);
    fullX = width * ratio;
    fullY = height * ratio;

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

        u = (width * ratio) * 2.6;
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

        u = (height * ratio) * 1.8;
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


function getPixelRatio() {
    var ctx = cxa;
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
}