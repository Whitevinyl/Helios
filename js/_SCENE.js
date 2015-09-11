/**
 * Created by luketwyman on 18/08/2015.
 */

function setupScene() {

    //-------------------------------------------------------------------------------------------
    //  INIT BACKGROUNDS
    //-------------------------------------------------------------------------------------------


    BackgroundList = [

        {
            positions: [new Point3D(40, 8.5, -2)],
            sprite: [new Point(-500, 1000), new Point(-37, 5),new Point(-30, -55), new Point(-15, -60), new Point(0, 0), new Point(20, -20), new Point(40, 3), new Point(46, 40), new Point(300, 1000)],
            color: landCols[1]
        },
        {
            positions: [new Point3D(0, -1.5, -2),new Point3D(0, -14.5, -2)],
            sprite: [new Point(-1500, 200), new Point(-1000, 0), new Point(-700, 50), new Point(30, -90), new Point(200, 0), new Point(390, -20), new Point(1100, 100), new Point(1500, 300)],
            color: landCols[1]
        },
        {
            positions: [new Point3D(40, 8.2, -5)],
            sprite: [new Point(-50, 1000), new Point(-45, 30), new Point(-35, 40), new Point(-15, -5), new Point(0, -40), new Point(45, -27), new Point(60, 25), new Point(68, 20), new Point(75, 60), new Point(120, 100), new Point(300, 120), new Point(300, 1000)],
            color: landCols[2]
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
    //  INIT SCENERY
    //-------------------------------------------------------------------------------------------


    SceneryList = [

        {
            name: "Pagoda1",
            positions: [new Point3D(40, 22, -2)],
            xscale: true
        },
        {
            name: "Pagoda2",
            positions: [new Point3D(40, 22, -2.25)],
            xscale: true
        },
        {
            name: "Pagoda2",
            positions: [new Point3D(40, 22, -2.5)],
            xscale: true
        },
        {
            name: "Sun",
            positions: [new Point3D(0, 110, -25)]
        }


    ];

    //-------------------------------------------------------------------------------------------
    //  INIT CONTROLLERS
    //-------------------------------------------------------------------------------------------


    ControllerList = [


        { // 0
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

        { // 1
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

        { // 2
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

        { // 3
            name: "FilterSynth",
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

        { // 4
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

        { // 5
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

        { // 6
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

        { // 7
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

        { // 8
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

        { // 9
            name: "GardenToSky",
            positions: [new Point3D(38.5, 10, 0.15)],
            size: new Size(25, 55),
            mode: "shiftLeft",
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

        { // 10
            name: "GardenSynth",
            positions: [new Point3D(40, 9.6, -0.15)],
            size: new Size(70, 100),
            mode: "omni",
            slider: {
                minVal: new Point(0,-30),
                maxVal: new Point(9,-10),
                range: new Point(2,0.8),
                value: new Point(0,0),
                origins: [new Point(39,9.6)],
                functions: [SliderFunctions[8],SliderFunctions[9]]
            },
            shards: [


                {
                    position: new Point3D(+0.04, 0.05, 0.05),
                    size: new Size(30, 70),
                    sprite: [new Point(0.4, -0.5), new Point(0.5, 0), new Point(-0.1, 0.5), new Point(-0.5, 0)],
                    color: shardCols[1],
                    vine: 60
                },
                {
                    position: new Point3D(-0.04, 0, 0),
                    size: new Size(35, 100),
                    sprite: [new Point(-0.1, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[0],
                    vine: 100
                }

            ]
        },

        { // 11
            name: "GardenToPagoda",
            positions: [new Point3D(40, 11, 0.15)],
            size: new Size(25, 55),
            mode: "shiftUp",
            event: SkipEvents[3],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        { // 12
            name: "PagodaToGarden",
            positions: [new Point3D(40, 21, 0.15)],
            size: new Size(25, 55),
            mode: "shiftDown",
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

        { // 13
            name: "PagodaToSun",
            positions: [new Point3D(40, 23, 0.15)],
            size: new Size(25, 55),
            mode: "shiftUp",
            event: SkipEvents[4],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        { // 14
            name: "FilterSynth2",
            positions: [new Point3D(40, 21.7, 0.1)],
            size: new Size(70, 80),
            mode: "omni",
            slider: {
                minVal: new Point(-20,500),
                maxVal: new Point(20,12000),
                range: new Point(0.8,0.8),
                value: new Point(0,400),
                origins: [new Point(39.6,21.6)],
                functions: [SliderFunctions[10],SliderFunctions[11]]
            },
            shards: [
                {
                    position: new Point3D(0, 0, -0.1),
                    size: new Size(25, 90),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[2],
                    vine: 90
                },
                {
                    position: new Point3D(0.08, -0.1, 0),
                    size: new Size(19, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[1],
                    vine: 40
                },

                {
                    position: new Point3D(-0.08, 0.1, 0.1),
                    size: new Size(19, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[0],
                    vine: 50
                }

            ]
        },

        { // 15
            name: "PagodaPlayer",
            positions: [new Point3D(41, 21.6, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.5),
                value: new Point(0,-10),
                origins: [new Point(0,21.6)],
                functions: [function(){},SliderFunctions[12]]
            },
            shards: [


                {
                    position: new Point3D(-0.06, 0, -0.1),
                    size: new Size(25, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0.05)],
                    color: shardCols[1],
                    vine: 100
                },
                {
                    position: new Point3D(0.06, 0.1, 0),
                    size: new Size(20, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[0],
                    vine: 50
                }

            ]
        },

        { // 16
            name: "PagodaDrums",
            positions: [new Point3D(39, 21.6, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.5),
                value: new Point(0,-10),
                origins: [new Point(0,21.6)],
                functions: [function(){},SliderFunctions[13]]
            },
            shards: [

                {
                    position: new Point3D(0.06, 0, -0.1),
                    size: new Size(25, 100),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[2],
                    vine: 80
                },
                {
                    position: new Point3D(-0.06, 0, 0),
                    size: new Size(25, 100),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 50
                },
                {
                    position: new Point3D(0.02, -0.06, 0.1),
                    size: new Size(20, 60),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[0],
                    vine: 100
                }

            ]
        },

        { // 17
            name: "SunToPagoda",
            positions: [new Point3D(2, 100, 0.15)],
            size: new Size(25, 55),
            mode: "shiftRight",
            event: SkipEvents[3],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        { // 18
            name: "SunSample1",
            positions: [new Point3D(-1, 99.6, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.8),
                value: new Point(0,-10),
                origins: [new Point(0,99.6)],
                functions: [function(){},SliderFunctions[14]]
            },
            shards: [

                {
                    position: new Point3D(-0.08, -0.05, -0.1),
                    size: new Size(30, 80),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.3), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 80
                },
                {
                    position: new Point3D(0.08, 0.1, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 50
                },
                {
                    position: new Point3D(-0.02, 0.1, 0),
                    size: new Size(27, 60),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[0],
                    vine: 60
                }

            ]
        },

        { // 19
            name: "SunSample2",
            positions: [new Point3D(1, 99.6, 0.1),new Point3D(1, 199.6, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.8),
                value: new Point(0,-10),
                origins: [new Point(0,99.6),new Point(0,199.6)],
                functions: [function(){},SliderFunctions[15]]
            },
            shards: [

                {
                    position: new Point3D(0.07, 0, -0.1),
                    size: new Size(35, 110),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 110
                },
                {
                    position: new Point3D(-0.07, 0.1, 0),
                    size: new Size(35, 110),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 160
                },
                {
                    position: new Point3D(0, -0.1, 0),
                    size: new Size(16, 40),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 70
                }

            ]
        },

        { // 20
            name: "SunReverb",
            positions: [new Point3D(0, 99.6, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,0),
                maxVal: new Point(0,0.16),
                range: new Point(0,0.8),
                value: new Point(0,400),
                origins: [new Point(0,99.6)],
                functions: [function(){},SliderFunctions[16]]
            },
            shards: [


                {
                    position: new Point3D(0.06, 0, 0),
                    size: new Size(36, 75),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[1],
                    vine: 70
                },
                {
                    position: new Point3D(-0.06, -0.1, 0),
                    size: new Size(25, 50),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 60
                }

            ]
        },

        { // 21
            name: "SunToPassage",
            positions: [new Point3D(0, 101, 0.15)],
            size: new Size(25, 55),
            mode: "shiftUp",
            event: SkipEvents[5],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        { // 22
            name: "PassageToSun",
            positions: [new Point3D(0, 199, 0.15)],
            size: new Size(25, 55),
            mode: "shiftDown",
            event: SkipEvents[4],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        { // 23
            name: "PassageSample1",
            positions: [new Point3D(-1, 200, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.8),
                value: new Point(0,-10),
                origins: [new Point(0,200)],
                functions: [function(){},SliderFunctions[17]]
            },
            shards: [

                {
                    position: new Point3D(0, 0.1, -0.1),
                    size: new Size(26, 110),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[2],
                    vine: 110
                },
                {
                    position: new Point3D(-0.07, 0, 0),
                    size: new Size(33, 110),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 160
                },
                {
                    position: new Point3D(0.07, -0.1, 0),
                    size: new Size(19, 50),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 70
                }

            ]
        },

        { // 24
            name: "PassageSample2",
            positions: [new Point3D(-0.35, 199.6, 0.1)],
            size: new Size(70, 110),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.8),
                value: new Point(0,-10),
                origins: [new Point(0,199.6)],
                functions: [function(){},SliderFunctions[18]]
            },
            shards: [

                {
                    position: new Point3D(0.08, 0, -0.1),
                    size: new Size(35, 100),
                    sprite: [new Point(0.1, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[2],
                    vine: 110
                },
                {
                    position: new Point3D(-0.08, -0.1, 0),
                    size: new Size(48, 150),
                    sprite: [new Point(0.2, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1), new Point(-0.49, -0.3)],
                    color: shardCols[1],
                    vine: 150
                },
                {
                    position: new Point3D(-0.16, -0.2, 0),
                    size: new Size(16, 70),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.1), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[0],
                    vine: 70
                }

            ]
        },

        { // 25
            name: "PassageSunSample",
            positions: [new Point3D(0.35, 199.6, 0.1)],
            size: new Size(70, 80),
            mode: "upDown",
            slider: {
                minVal: new Point(0,-20),
                maxVal: new Point(0,25),
                range: new Point(0,0.8),
                value: new Point(0,-10),
                origins: [new Point(0,199.6)],
                functions: [function(){},SliderFunctions[19]]
            },
            shards: [

                {
                    position: new Point3D(0.07, 0, -0.1),
                    size: new Size(35, 110),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[2],
                    vine: 110
                },
                {
                    position: new Point3D(-0.07, 0.1, 0),
                    size: new Size(35, 110),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1],
                    vine: 160
                },
                {
                    position: new Point3D(0, -0.1, 0),
                    size: new Size(16, 40),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.2), new Point(0, 0.5), new Point(-0.5, -0.2)],
                    color: shardCols[0],
                    vine: 70
                }

            ]
        },

        { // 26
            name: "PassageArp2",
            positions: [new Point3D(1, 200, 0.1)],
            size: new Size(70, 80),
            mode: "omni",
            slider: {
                minVal: new Point(2,-45),
                maxVal: new Point(7,3),
                range: new Point(0.5,0.5),
                value: new Point(0,-45),
                origins: [new Point(1,200)],
                functions: [SliderFunctions[20],SliderFunctions[21]]
            },
            shards: [
                {
                    position: new Point3D(0, 0, -0.1),
                    size: new Size(25, 90),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[2],
                    vine: 90
                },
                {
                    position: new Point3D(0.08, -0.1, 0),
                    size: new Size(19, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[1],
                    vine: 40
                },

                {
                    position: new Point3D(-0.08, 0.1, 0.1),
                    size: new Size(19, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, 0), new Point(0, 0.5), new Point(-0.5, 0)],
                    color: shardCols[0],
                    vine: 50
                }

            ]
        },

        { // 27
            name: "PassageToNight",
            positions: [new Point3D(0, 201, 0.15)],
            size: new Size(25, 55),
            mode: "shiftUp",
            event: SkipEvents[6],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        },

        { // 28
            name: "NightToPassage",
            positions: [new Point3D(0, 219, 0.15)],
            size: new Size(25, 55),
            mode: "shiftDown",
            event: SkipEvents[5],
            shards: [

                {
                    position: new Point3D(0, 0, 0),
                    size: new Size(25, 55),
                    sprite: [new Point(0, -0.5), new Point(0.5, -0.15), new Point(0, 0.5), new Point(-0.5, -0.1)],
                    color: shardCols[1]
                }

            ]
        }

    ];

}


SliderFunctions = [

    function(v,t) {
        Player[0].volume.rampTo(v,t); // 0
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
        Noise[0].volume.rampTo(((v*synthGain.x)-35),t); // 2
        Osc[0].volume.rampTo(((v*synthGain.x)-35),t);
        Osc[1].volume.rampTo(((v*synthGain.x)-35),t);
        if (g) {
            rotateDest.x = v * (Math.PI/180);
        }
    },
    function(v,t) {
        Player[1].volume.rampTo(v,t); // 3
    },
    function(v,t,g) {
        Player[2].volume.rampTo(v*2,t);
        if (g) {
            rotateDest.y = -v * (Math.PI/180); // 4
        }
    },
    function(v,t) {
        Player[3].volume.rampTo(v,t); // 5
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
    function(v,t,g) {
        if (Math.round(v)!==slideCurrent) {
            slideCurrent = Math.round(v);
            Osc[2].frequency.rampTo(Tone.Master.noteToFrequency(""+slideScale[Math.round(v)]),0.002); // 8
            Osc[3].frequency.rampTo(Tone.Master.noteToFrequency(""+slideScale2[Math.round(v)]),0.002);
        }
        if (g) {
            //rotateDest.x = (v-4) * (Math.PI/180);
            windDir = (v-2)*2;
        }
    },
    function(v,t) {

        Osc[2].volume.rampTo(v,t);
        Osc[3].volume.rampTo(v,t);
        var f = 320 + ((v + 30) * 180);
        Filter[1].frequency.rampTo(f,t); // 9
    },
    function(v,t,g) {
        controllers[3].Slider.value.x = v;
        setController(controllers[3],g,"x"); // 10
    },
    function(v,t,g) {
        controllers[3].Slider.value.y = v;
        setController(controllers[3],false,"y"); // 11

        if (g) {
            var colVal = ((v-6000)/85);
            masterCol.R = 35 + (colVal);
            if (colVal < 0) {
                colVal *= 0.5;
            }
            masterCol.G = 8 + (colVal);
            if (colVal < 0) {
                colVal *= 0.2;
            }
            masterCol.B = -30 + (colVal);
        }
    },
    function(v,t) {
        Player[4].volume.rampTo(v,t); // 12
    },
    function(v,t) {
        Player[5].volume.rampTo(v,t); // 13
    },
    function(v,t,g) {
        Player[6].volume.rampTo(v,t); // 14
        if (g) {
            sunDest = 155 - (v+20);
        }

    },
    function(v,t) {
        Player[7].volume.rampTo(v,t); // 15
    },
    function(v,t) {
        Reverb.wet.rampTo(v,t); // 16
    },
    function(v,t) {
        Player[8].volume.rampTo(v,t); // 17
    },
    function(v,t) {
        Player[9].volume.rampTo(v,t); // 18
    },
    function(v,t) {
        controllers[19].Slider.value.y = v;
        setController(controllers[19],false,"y"); // 19
    },
    function(v,t) {
        controllers[7].Slider.value.x = v;
        setController(controllers[7],false,"x"); // 19
    },
    function(v,t) {
        controllers[7].Slider.value.y = v;
        setController(controllers[7],false,"y"); // 19
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

function createScenery(scenery) {

    // CREATE THREE.JS POSITION OBJECT //
    var threeController = new THREE.Object3D();
    World3D.add(threeController);
    threeController.position.set(scenery.positions[0].x,scenery.positions[0].y,scenery.positions[0].z);

    // CREATE BACKGROUND //
    return new Scenery(scenery.name,threeController,scenery.positions,scenery.xscale);
}




function createFlickerParticles() {

    for (var i=0; i<8; i++) {
        var p = new Particle(new Point(-halfX + (Math.random()*200),-halfY + (Math.random()*200)),new Vector());
        p.Active = true;
        flickerParticles.push( p );
    }

}

function createFlickerParticles2() {

    for (var i=0; i<14; i++) {
        var p = new Particle(new Point(-150 + (Math.random()*300),-halfY + (Math.random()*fullY)),new Vector(0,10 + (Math.random()*20)));
        p.Active = true;
        flickerParticles2.push( p );
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

function createWind() {
    for (var i=0; i<4; i++) {

        var pa = [];
        var aa = [];
        for (var j=0; j<10; j++) {
            var p = new Particle(new Point(halfX + (Math.random() * fullX), -halfY + (Math.random() * fullY)), new Vector());
            pa.push(p);
            aa.push(0);
        }
        aa.push(0);

        var w = new Wind(pa,aa);
        resetWind(w);
        w.Focus = i*2;
        windParticles.push(w);

    }
}

function createDust() {
    for (var i=0; i<14; i++) {
        var p = new Particle(randomPoint(), new Vector(-(10 + (Math.random()*10)), -3 + (Math.random()*6)));
        dustParticles.push(p);
    }
}

function createRadials() {
    for (var i=0; i<12; i++) {
        var p = new Radial();
        p.Active = true;
        radialParticles.push(p);
    }
}

function createPassage() {
    for (var i=0; i<26; i++) {
        var p = new Passage(randomPoint(), new Vector(-(10 + (Math.random()*10)), -3 + (Math.random()*6)),0.2 + (Math.random()*1.8));
        passageParticles.push(p);
    }
}