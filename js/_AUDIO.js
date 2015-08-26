/**
 * Created by luketwyman on 20/08/2015.
 */

var Master;
var DroneOsc, DroneFilter, DroneNoise, DroneLFO, DronePWMO, AmbientPlayer, DrumPlayer, TunePlayer, DrumMeter;
var loadedLoops = 0;


function setupAudio() {
    //Master = Tone.Master();
    Tone.Master.volume.value = -15;
    Tone.Transport.bpm = 80;

    Tone.Transport.setInterval(function(time){
        //backgrounds[1].Sprite.Points[3].y = 50 - (Math.random()*100);
        console.log(time);
    }, "8n");

    AmbientPlayer = new Tone.Player();
    AmbientPlayer.load("loops/long/ambient05.mp3",function(player) {
        console.log(player.buffer.duration);
        player.loopEnd = 3;
        player.loop = true;
        loopsLoaded();
    });
    AmbientPlayer.volume.value = -50;
    AmbientPlayer.sync();

    DrumPlayer = new Tone.Player();
    DrumPlayer.load("loops/long/drums03b.mp3",function(player) {
        console.log(player.buffer.duration);
        player.loopEnd = 3;
        player.loop = true;
        loopsLoaded();
    });
    DrumPlayer.volume.value = -50;
    DrumPlayer.sync();

    DrumMeter = new Tone.Meter();
    //DrumMeter.smoothing = 100;

    TunePlayer = new Tone.Player();
    TunePlayer.load("loops/long/tune01.mp3",function(player) {
        console.log(player.buffer.duration);
        player.loopEnd = 9;
        player.loop = true;
        loopsLoaded();
    });
    TunePlayer.volume.value = -50;
    TunePlayer.sync();

    /*DrumPlayer.onended = function() {
        console.log("drum");
    };
    DrumPlayer.onloop = function() {
        console.log("drum");
    };*/


    DroneOsc = new Tone.Oscillator(440);
    DroneOsc.volume.value = -50;

    DronePWMO = new Tone.PWMOscillator(293.66,1);
    DronePWMO.volume.value = -50;

    DroneNoise = new Tone.Noise();
    DroneNoise.volume.value = -50;

    DroneFilter = new Tone.Filter(400,"lowpass");
    DroneFilter.gain.value = 15;

    DroneLFO = new Tone.LFO(0.4,-10,10);



    DrumPlayer.connect(DrumMeter.input);
    DroneLFO.connect(DroneOsc.detune);
    AmbientPlayer.chain(DroneFilter);
    TunePlayer.chain(DroneFilter);
    DrumPlayer.chain(DroneFilter);
    DroneOsc.chain(DroneFilter);
    DronePWMO.chain(DroneFilter);
    DroneNoise.chain(DroneFilter);
    DroneFilter.toMaster();
    DronePWMO.start();
    DroneOsc.start();
    DroneNoise.start();
    DroneLFO.start();


}

function loopsLoaded() {
    loadedLoops += 1;

    if (loadedLoops==3) {
        /*AmbientPlayer.start();
        DrumPlayer.start();
        TunePlayer.start();*/


        Tone.Transport.start();

    }
}