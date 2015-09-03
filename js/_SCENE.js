/**
 * Created by luketwyman on 18/08/2015.
 */

function setupScene() {

    //-------------------------------------------------------------------------------------------
    //  INIT BACKGROUNDS
    //-------------------------------------------------------------------------------------------


    BackgroundList = [

        {
            positions: [new Point3D(0, -1.5, -2),new Point3D(0, -14.5, -2)],
            sprite: [new Point(-1500, 200), new Point(-1000, 0), new Point(-700, 50), new Point(30, -90), new Point(200, 0), new Point(390, -20), new Point(1100, 100), new Point(1500, 300)],
            color: landCols[1]
        },
        {
            positions: [new Point3D(0, -1, -6),new Point3D(0, -14, -6)],
            sprite: [new Point(-1500, 200), new Point(-1000, 0), new Point(-700, 50), new Point(-100, -120), new Point(50, 20), new Point(330, -20), new Point(1100, 100), new Point(1500, 300)],
            color: landCols[2]
        },
        {
            positions: [new Point3D(0, -1, -12),new Point3D(0, -14, -12)],
            sprite: [new Point(-1500, 200), new Point(-1000, 0), new Point(-700, 30), new Point(20, -10), new Point(150, -50), new Point(350, -20), new Point(650, 30),new Point(850, 10), new Point(1500, 300)],
            color: landCols[3]
        },
        {
            positions: [new Point3D(0, -1, -18),new Point3D(0, -14, -18)],
            sprite: [new Point(-1500, 200), new Point(-9000, 10), new Point(-700, 50), new Point(-550, -20), new Point(-450, 15),new Point(50, -100), new Point(90, -70), new Point(410, -15), new Point(550, -20),new Point(1100, 100), new Point(1500, 300)],
            color: landCols[4]
        }


    ];

    //-------------------------------------------------------------------------------------------
    //  INIT CONTROLLERS
    //-------------------------------------------------------------------------------------------


    ControllerList = [


        {
            name: "Left",
            positions: [new Point3D(-1, 20, -0.1), new Point3D(-1, 1, -0.1), new Point3D(-1, 14, -0.1)],
            size: new Size(40, 80),
            mode: "leftRight",
            slider: {
                minVal: new Point(-20,0),
                maxVal: new Point(25,0),
                range: new Point(0.6,0),
                value: new Point(0,0),
                origins: [new Point(-1,1),new Point(-1.2,1)],
                functions: [SliderFunctions[3],function(){}]
            },
            shards: [

                {
                    position: new Point3D(-0.05, -0.1, -0.05),
                    size: new Size(30, 90),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 50
                },
                {
                    position: new Point3D(0.05, 0.1, 0.05),
                    size: new Size(25, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 40
                }

            ]
        },

        {
            name: "Top",
            positions: [new Point3D(0.37, 0.85, -0.2)],
            size: new Size(40, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-10),
                maxVal: new Point(0,10),
                range: new Point(0,0.5),
                value: new Point(0,0),
                origins: [new Point(0,0.7)],
                functions: [function(){},SliderFunctions[4]]
            },
            shards: [

                {
                    position: new Point3D(-0.06, -0.05, -0.1),
                    size: new Size(24, 60),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 40
                },
                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(32, 90),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 80
                },
                {
                    position: new Point3D(0.06, 0.05, 0.1),
                    size: new Size(26, 65),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 70
                }

            ]
        },

        {
            name: "Master",
            positions: [new Point3D(0, -0.3, -0.1),new Point3D(0.2, 14.5, -0.1)],
            size: new Size(70, 120),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.4),
                value: new Point(0,50),
                origins: [new Point(0,-0.45),new Point(0,14.35)],
                functions: [function(){},SliderFunctions[0]]
            },
            shards: [

                {
                    position: new Point3D(-0.2, 0, -0.2),
                    size: new Size(30, 90),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 50
                },
                {
                    position: new Point3D(0, 0.1, -0.1),
                    size: new Size(40, 100),
                    sprite: [new Point(-0.1, -0.5), new Point(0.5, -0.2), new Point(0.25, 0.4), new Point(-0.1, 0.5), new Point(-0.5, 0.1)],
                    color: shardCols[2],
                    vine: 40
                },
                {
                    position: new Point3D(0.1, 0.1, -0.1),
                    size: new Size(25, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 60
                },
                {
                    position: new Point3D(-0.05, 0, 0),
                    size: new Size(60, 120),
                    sprite: [new Point(-0.1, -0.5), new Point(0.5, -0.2), new Point(0.25, 0.4), new Point(-0.1, 0.5), new Point(-0.5, 0.1)],
                    color: shardCols[1],
                    xscale: true,
                    vine: 50
                },
                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(34, 150),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.25)],
                    color: shardCols[1],
                    vine: 100
                },
                {
                    position: new Point3D(0.2, -0.2, 0.08),
                    size: new Size(18, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.25)],
                    color: shardCols[1]
                },
                {
                    position: new Point3D(-0.05, 0, 0.05),
                    size: new Size(33, 90),
                    sprite: [new Point(-0.1, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, 0.1)],
                    color: shardCols[4],
                    xscale: true,
                    vine: 70
                },
                {
                    position: new Point3D(-0.2, 0.1, 0.1),
                    size: new Size(25, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 85
                },
                {
                    position: new Point3D(-0.05, 0, 0.15),
                    size: new Size(50, 90),
                    sprite: [new Point(-0.1, -0.5), new Point(0.5, -0.2), new Point(0.25, 0.4), new Point(-0.1, 0.5), new Point(-0.5, 0.1)],
                    color: shardCols[0],
                    xscale: true,
                    vine: 50
                },
                {
                    position: new Point3D(-0.02, -0.2, 0.2),
                    size: new Size(26, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[0],
                    vine: 40
                }

            ]
        },

        {
            name: "Right",
            positions: [new Point3D(0.8, 20, 0.1), new Point3D(0.8, -0.5, 0.1), new Point3D(0.8, -15, 0.1)],
            size: new Size(70, 80),
            mode: "omni",
            slider: {
                minVal: new Point(-20,500),
                maxVal: new Point(20,12000),
                range: new Point(0.8,0.8),
                value: new Point(0,400),
                origins: [new Point(0.4,-0.6)],
                functions: [SliderFunctions[2],SliderFunctions[1]]
            },
            shards: [

                {
                    position: new Point3D(0.06, 0, -0.1),
                    size: new Size(30, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 40
                },
                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 60
                },
                {
                    position: new Point3D(-0.1, 0.1, 0),
                    size: new Size(20, 50),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 30
                }

            ]
        },

        {
            name: "SkipUp",
            positions: [new Point3D(0, 1.25, 0.14),new Point3D(0, -14, 0.14)],
            size: new Size(25, 55),
            mode: "shiftUp",
            event: SkipEvents[0],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        {
            name: "SkipDown",
            positions: [new Point3D(0, 13, 0.15)],
            size: new Size(25, 55),
            mode: "shiftDown",
            event: SkipEvents[1],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        {
            name: "Player2",
            positions: [new Point3D(0.8, 14, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.5),
                value: new Point(0,-10),
                origins: [new Point(0,14)],
                functions: [function(){},SliderFunctions[5]]
            },
            shards: [

                {
                    position: new Point3D(0.06, 0, -0.1),
                    size: new Size(30, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 40
                },
                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 100
                },
                {
                    position: new Point3D(-0.06, 0.1, 0),
                    size: new Size(20, 50),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 50
                }

            ]
        },

        {
            name: "Arp",
            positions: [new Point3D(-0.9, 14.6, -0.15)],
            size: new Size(70, 80),
            mode: "omni",
            slider: {
                minVal: new Point(2,-45),
                maxVal: new Point(7,3),
                range: new Point(0.8,0.8),
                value: new Point(0,0),
                origins: [new Point(-1.3,14.5)],
                functions: [SliderFunctions[6],SliderFunctions[7]]
            },
            shards: [

                {
                    position: new Point3D(0.05, 0, -0.05),
                    size: new Size(24, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 70
                },
                {
                    position: new Point3D(-0.07, 0.05, 0),
                    size: new Size(25, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 60
                },
                {
                    position: new Point3D(0, 0, 0.05),
                    size: new Size(24, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 50
                }

            ]
        },

        {
            name: "SkipSun",
            positions: [new Point3D(2, 14, 0.15)],
            size: new Size(25, 55),
            mode: "shiftRight",
            event: SkipEvents[2],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        {
            name: "SkipFromSun",
            positions: [new Point3D(22, 10, 0.15)],
            size: new Size(25, 55),
            mode: "shiftRight",
            event: SkipEvents[0],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        {
            name: "GardenSynth",
            positions: [new Point3D(20, 9.6, -0.15)],
            size: new Size(70, 80),
            mode: "omni",
            slider: {
                minVal: new Point(0,-30),
                maxVal: new Point(9,-10),
                range: new Point(2,0.8),
                value: new Point(0,0),
                origins: [new Point(19,9.6)],
                functions: [SliderFunctions[8],SliderFunctions[9]]
            },
            shards: [

                {
                    position: new Point3D(0.05, 0, -0.05),
                    size: new Size(24, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 70
                },
                {
                    position: new Point3D(-0.07, 0.05, 0),
                    size: new Size(25, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 60
                },
                {
                    position: new Point3D(0, 0, 0.05),
                    size: new Size(24, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 50
                }

            ]
        }

    ];

}


SliderFunctions = [

    function(v,t) {
        AmbientPlayer.volume.rampTo(v,t); // 0
    },
    function(v,t,g) {
        Filter[0].frequency.rampTo(v,t); // 1
        if (g) {
            var colVal = (v/240) - 50;
            masterCol.R = colVal + (v/600);
            masterCol.G = colVal-10;
            masterCol.B = (v/480) - 50;
        }
    },
    function(v,t,g) {
        Noise[0].volume.rampTo(((v*1.1)-35),t); // 2
        Osc[0].volume.rampTo(((v*1.1)-35),t);
        Osc[1].volume.rampTo(((v*1.1)-35),t);
        if (g) {
            rotateDest.x = v * (Math.PI/180);
        }
    },
    function(v,t) {
        DrumPlayer.volume.rampTo(v,t); // 3
    },
    function(v,t,g) {
        TunePlayer.volume.rampTo(v*2,t);
        if (g) {
            rotateDest.y = -v * (Math.PI/180); // 4
        }
    },
    function(v,t) {
        TunePlayer2.volume.rampTo(v,t); // 5
    },
    function(v,t,g) {
        ArpBase = Math.round(v);
        if (g) {
            rotateDest.x = ((v-4)*6) * (Math.PI/180); // 6
        }
    },
    function(v,t) {
        ArpOsc.volume.rampTo(v,t); // 7
    },
    function(v,t) {
        if (Math.round(v)!==slideCurrent) {
            slideCurrent = Math.round(v);
            Osc[2].frequency.rampTo(Tone.Master.noteToFrequency(""+slideScale[Math.round(v)]),0.002);
            Osc[3].frequency.rampTo(Tone.Master.noteToFrequency(""+slideScale2[Math.round(v)]),0.002);
        }
    },
    function(v,t) {

        Osc[2].volume.rampTo(v,t);
        Osc[3].volume.rampTo(v,t);
        var f = 320 + ((v + 30) * 180);
        Filter[1].frequency.rampTo(f,t); // 11
    }
];

SkipEvents = [

    function() { // TO SCENE 2 //



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
        automate(controllers[6],"y",20,t,0);
        automate(controllers[7],"y",-20,t,0);
        automate(controllers[7],"x",4,t,0);
        if (scene > 1) {
            automate(controllers[10],"y",-60,t,0);
        }


        scene = 2;
    },

    function() { // TO SCENE 1 //

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

    function() { // TO GARDEN SCENE //

        if (scene < 4) {
            SynthSet(1);
        }



        var t = 2.5;
        var m = 1.1;

        colourTo(masterCol,20,20,-5,1,t);
        colourTo(highPass,0,-5,-15,0,t);
        colourTo(lowPass,10,0,10,0,t);
        colourTo(landCols[0],200,200,170,0,t);

        delayTo(rotateDest,"x",0,t,0); // vert
        delayTo(rotateDest,"y",0,t,0); // horiz

        positionTo(World3D,new Point3D(-20,-10,0),t,0,"quint");

        Reverb.wet.rampTo(0.2,t);

        automate(controllers[2],"y",20,t,0);
        automate(controllers[0],"x",-20,t,0);
        automate(controllers[3],"y",600,t,0); // filter
        automate(controllers[6],"y",-20,t,0);
        automate(controllers[7],"y",-45,t,0);
        automate(controllers[7],"x",4,t,0);
        automate(controllers[10],"x",5,t,0);
        automate(controllers[10],"y",-12,t,0);

        scene = 4;
    }

];

function bumpFunctions(t,g) {

    console.log("bump: "+g);

    t = t || 0.1;

    for (var i=0; i<controllers.length; i++ ) {

        var controller = controllers[i];
        console.log(controller.Name);


        if (controller.Slider) {
            if (g) {
                dragController(controller,false);
            }
            controller.Slider.functions[0](controller.Slider.value.x,t,g);
            controller.Slider.functions[1](controller.Slider.value.y,t,g);
        }
    }
}


//-------------------------------------------------------------------------------------------
//  CREATE SCENE OBJECTS
//-------------------------------------------------------------------------------------------


function createController(controller) {

    // CREATE THREE.JS POSITION OBJECT //
    var threeController = new THREE.Object3D();
    World3D.add(threeController);
    threeController.position.set(controller.positions[0].x,controller.positions[0].y,controller.positions[0].z);
    var threeFloat = new THREE.Object3D();
    threeController.add(threeFloat);


    // CREATE SHARDS WITH RELATIVE POSITION OBJECTS //
    var shards = [];
    for (var j=0; j<controller.shards.length; j++) {
        var shard = controller.shards[j];

        var threeShard = new THREE.Object3D();
        threeFloat.add(threeShard);
        threeShard.position.set(shard.position.x,shard.position.y,shard.position.z);

        var xscale = false;
        if (shard.xscale) { xscale = shard.xscale; }
        shards.push (new Shard(threeShard,shard.size, new Sprite(shard.sprite),shard.color,xscale,shard.vine));
    }
    // CREATE CONTROLLER //
    return new Controller(controller.name,controller.positions,threeController,threeFloat,controller.size,controller.mode,controller.slider,controller.event,shards);
}



function createBackground(background) {

    // CREATE THREE.JS POSITION OBJECT //
    var threeController = new THREE.Object3D();
    World3D.add(threeController);
    threeController.position.set(background.positions[0].x,background.positions[0].y,background.positions[0].z);

    // CREATE BACKGROUND //
    return new Background(threeController,background.positions,new Sprite(background.sprite),background.color);
}


function createFlickerParticles() {

    for (var i=0; i<8; i++) {
        var p = new Particle(new Point(-halfX + (Math.random()*200),-halfY + (Math.random()*200)),new Vector());
        p.Active = true;
        flickerParticles.push( p );
    }

}

function createWorms() {

    for (var i=0; i<2; i++) {

        var pa = [];
        for (var j=0; j<4; j++) {
            var p = new Particle(new Point(-30 + (Math.random()*60),-30 + (Math.random()*60)),new Vector());
            pa.push(p);
        }
        var w = new Worm(new Point(-halfX + (Math.random()*200),-halfY + (Math.random()*200)),new Vector(),pa);
        w.Active = true;
        worms.push(w);
    }
}
