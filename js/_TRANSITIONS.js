/**
 * Created by luketwyman on 04/09/2015.
 */


SkipEvents = [

    function() { // TO THE SKY // 0



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,20,0,0,1,t);
        colourTo(highPass,0,-15,-15,0,t);
        colourTo(lowPass,10,0,10,0,t);
        colourTo(landCols[0],220,200,180,0,t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz

        if (scene ===1) {

            var drumPos = new Point3D(controllers[0].Slider.origins[1].x + (controllers[0].ThreeDest.x - controllers[0].Slider.origins[0].x),controllers[0].Positions[2].y,controllers[0].Positions[2].z);
            var masterPos = new Point3D(controllers[2].Positions[1].x,controllers[2].Slider.origins[1].y  + (controllers[2].ThreeDest.y - controllers[2].Slider.origins[0].y),controllers[2].Positions[1].z);

            positionTo(controllers[0], drumPos,t*m,0,"expo");
            positionTo(controllers[2], masterPos,t*m,0,"expo");

        }

        positionTo(World3D,new Point3D(0,-14,0),t,0,"quint");

        controllers[0].Slider.origin = controllers[0].Slider.origins[1];
        controllers[2].Slider.origin = controllers[2].Slider.origins[1];

        Reverb.wet.rampTo(0,t);

        automate(controllers[3],"x",-10,t,0); // synth
        automate(controllers[3],"y",10000,t,0); // filter
        automate(controllers[1],"y",-10,t,0);
        automate(controllers[6],"y",20,t,0); // player
        automate(controllers[7],"y",-20,t,0); // arp
        automate(controllers[7],"x",4,t,0);
        if (scene > 1) {
            automate(controllers[10],"y",-60,t,0);
        }


        scene = 2;
    },

    function() { // TO THE GROUND // 1

        SynthSet(0);

        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,-15,-35,-37.5,1,t);
        colourTo(highPass,50,45,0,0,t);
        colourTo(lowPass,-255,30,50,0,t);
        colourToColour(landCols[0],landColsLight[0],t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",degToRad(-8),t,0); // horiz

        var drumPos = new Point3D(controllers[0].Slider.origins[0].x + (controllers[0].ThreeDest.x - controllers[0].Slider.origins[1].x),controllers[0].Positions[1].y,controllers[0].Positions[1].z);
        var masterPos = new Point3D(controllers[2].Positions[0].x,controllers[2].Slider.origins[0].y  + (controllers[2].ThreeDest.y - controllers[2].Slider.origins[1].y),controllers[2].Positions[0].z);

        positionTo(controllers[0], drumPos,t*m,0,"expo");
        positionTo(controllers[2], masterPos,t*m,0,"expo");
        positionTo(World3D,new Point3D(0,0,0),t,0,"quint");

        controllers[0].Slider.origin = controllers[0].Slider.origins[0];
        controllers[2].Slider.origin = controllers[2].Slider.origins[0];

        automate(controllers[3],"x",0,t,0); // synth
        automate(controllers[3],"y",5750,t,0); // filter
        automate(controllers[1],"y",8,t,0);
        automate(controllers[6],"y",-20,t,0);
        automate(controllers[7],"y",-45,t,0);
        automate(controllers[7],"x",4,t,0);

        scene = 1;
    },

    function() { // TO THE GARDEN // 2

        if (scene < 3) {
            SynthSet(1);


        }



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,-50,-40,-10,1,t);
        colourTo(highPass,-20,-5,0,0,t);
        colourTo(lowPass,10,0,10,0,t);
        //colourTo(landCols[0],170,170,170,1,t);
        colourToColour(landCols[0],landColsLight[0],t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz

        delayTo(synthGain, "x",1.1,t,0);

        positionTo(World3D,new Point3D(-40,-10,0),t,0,"quint");


        Reverb.wet.rampTo(0.2,t);

        if (scene < 3) {
            // whatever controller 3 is at, duplicate it //
            setValue(controllers[14],"x",controllers[3].Slider.value.x);
            setValue(controllers[14],"y",controllers[3].Slider.value.y);
            setPosition(controllers[14],"x");
            setPosition(controllers[14],"y");
        }

        automate(controllers[14],"x",0,t,0,false); // filter
        automate(controllers[14],"y",600,t,0,false); // filter
        automate(controllers[2],"y",20,t,0);
        automate(controllers[0],"x",-20,t,0);
        automate(controllers[6],"y",-20,t,0);
        automate(controllers[7],"y",-45,t,0);
        automate(controllers[7],"x",4,t,0);
        automate(controllers[10],"x",4.4,t,0);
        automate(controllers[10],"y",-12,t,0);
        automate(controllers[15],"y",-20,t,0);
        automate(controllers[16],"y",-20,t,0);

        scene = 3;
    },

    function() { // TO THE PAGODA // 3

        //if (scene < 3) {
        //    SynthSet(1);
        //}



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,35,5,-30,1,t);
        colourTo(highPass,0,-5,-15,0,t);
        colourTo(lowPass,10,0,10,0,t);
        colourTo(landCols[0],200,200,170,0,t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz

        delayTo(synthGain, "x",1.6,t,0);

        positionTo(World3D,new Point3D(-40,-22,0),t,0,"quint");

        Reverb.wet.rampTo(0,t);




        automate(controllers[2],"y",15,t,0); // ambient
        automate(controllers[14],"x",0,t,0,false); // synth
        automate(controllers[14],"y",6000,t,0,false); // filter
        automate(controllers[10],"y",-60,t,0);
        automate(controllers[15],"y",25,t,0);
        automate(controllers[16],"y",-15,t,0); // drums
        if (scene > 4) {
            //Reverb.roomSize.rampTo(0.5,t);

            Player[0].start();
            Player[1].start();
            Player[2].start();
            Player[3].start();
            Player[4].start();
            Player[5].start();

            setTimeout(function() {

                Player[6].stop();
                Player[7].stop();
                Player[8].stop();
                Player[9].stop();
            },t*1000);

            automate(controllers[18],"y",-20,t,0);
            automate(controllers[19],"y",-20,t,0);
            automate(controllers[20],"y",0,t,0);
        }


        scene = 4;
    },

    function() { // TO THE SUN // 4



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,20,10,0,1,t);
        colourTo(highPass,40,40,20,0,t);
        colourTo(lowPass,10,-30,0,0,t);
        colourTo(landCols[0],200,200,170,0,t);
        //colourTo(landCols[0],170,170,170,1,t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz



        delayTo(synthGain, "x",1.1,t,0);


        if (scene < 5) {
            Player[6].start();
            Player[7].start();
            Player[8].start();
            Player[9].start();

            setTimeout(function() {
                Player[0].stop();
                Player[1].stop();
                Player[2].stop();
                Player[3].stop();
                Player[4].stop();
                Player[5].stop();
            },t*1000);
        }


        positionTo(World3D,new Point3D(0,-100,0),t,0,"quint");

        //Reverb.wet.rampTo(0.2,t);
        //Reverb.roomSize.rampTo(0.9,t);
        sunDest = 110;

        if (scene > 5) {

            delayTo(passageAlpha,"A",0,t*0.5,0);

            setValue(controllers[19],"y",controllers[25].Slider.value.y);
            setPosition(controllers[19],"y");
        }

        automate(controllers[14],"x",-10,t,0,false); // synth
        automate(controllers[14],"y",8000,t,0,false); // filter
        automate(controllers[2],"y",-20,t,0);
        automate(controllers[10],"y",-60,t,0);
        automate(controllers[15],"y",-20,t,0);
        automate(controllers[16],"y",-20,t,0);
        automate(controllers[18],"y",25,t,0);
        automate(controllers[19],"y",-20,t,0);
        automate(controllers[23],"y",-20,t,0);
        automate(controllers[24],"y",-20,t,0);
        automate(controllers[26],"x",2,t,0);
        automate(controllers[26],"y",-45,t,0);

        scene = 5;
    },

    function() { // TO THE PASSAGE // 5



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,-60,-50,-30,1,t);
        colourTo(highPass,-20,0,0,0,t);
        colourTo(lowPass,-40,-30,20,0,t);
        colourTo(landCols[0],120,130,150,1,t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz

        delayTo(passageAlpha,"A",100,t,0);

        positionTo(World3D,new Point3D(0,-200,0),t,0,"quint");


        //Reverb.wet.rampTo(0.2,t);
        //Reverb.roomSize.rampTo(0.9,t);
        sunDest = 110;

        if (scene < 6) {
            setValue(controllers[25],"y",controllers[19].Slider.value.y);
            setPosition(controllers[25],"y");
        }

        automate(controllers[14],"x",-10,t,0,false); // synth
        automate(controllers[14],"y",8000,t,0,false); // filter
        automate(controllers[18],"y",-20,t,0,false);

        automate(controllers[20],"y",0,t,0);
        automate(controllers[23],"y",25,t,0);
        automate(controllers[24],"y",-20,t,0);
        automate(controllers[25],"y",25,t,0);
        scene = 6;
    },

    function() { // TO THE NIGHT // 6



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,-60,-50,-30,1,t);
        colourTo(highPass,-20,0,0,0,t);
        colourTo(lowPass,-40,-30,20,0,t);
        colourTo(landCols[0],0,10,20,1,t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz

        delayTo(passageAlpha,"A",0,t,0);

        positionTo(World3D,new Point3D(0,-220,0),t,0,"quint");


        //Reverb.wet.rampTo(0.2,t);
        //Reverb.roomSize.rampTo(0.9,t);




        automate(controllers[20],"y",0,t,0);
        automate(controllers[23],"y",-20,t,0);
        automate(controllers[24],"y",-20,t,0);
        automate(controllers[25],"y",-20,t,0);
        scene = 6;
    }

];