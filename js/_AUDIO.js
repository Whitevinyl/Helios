/**
 * Created by luketwyman on 20/08/2015.
 */

var DrumMeter, ArpOsc, ArpFilter, SlideFilter,  SlideLFO;
var Reverb, Delay;
var Osc = [], LFO = [], Player = [], Gran = [], Noise = [], Filter = [];
var ArpBase = 5;
var ArpScale = ["a","b","c#","d","e","f#"];
var slideOctave = 4;
var slideScale = ["a"+(slideOctave-1),"f#"+(slideOctave-1),"d"+slideOctave,"c#"+slideOctave,"d"+(slideOctave),"a"+slideOctave,"c#"+slideOctave,"d"+slideOctave,"f#"+slideOctave,"g"+slideOctave];
var slideScale2 = ["d"+(slideOctave-2),"d"+(slideOctave-2),"f#"+(slideOctave-2),"f#"+(slideOctave-2),"b"+(slideOctave-3),"b"+(slideOctave-3),"a"+(slideOctave-2),"a"+(slideOctave-2),"g"+(slideOctave-2),"g"+(slideOctave-2)];
var synthGain = new Point(1.1,0);

var slideCurrent = 3;
var loadedLoops = 0;
var loadTotal = 0;

Tone.Transport.bpm.value = 80;

function setupAudio() {
    Tone.Master.volume.value = -18;


    Player[0] = new Tone.Player();
    Player[0].load("loops/trimmed/ambient01.mp3",function(player) {
        player.loopEnd = 3;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[0].volume.value = -50;

    Player[1] = new Tone.Player();
    Player[1].load("loops/trimmed/drums01.mp3",function(player) {
        player.loopEnd = 3;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[1].volume.value = -50;

    DrumMeter = new Tone.Meter();

    Player[2] = new Tone.Player();
    Player[2].load("loops/trimmed/tune01.mp3",function(player) {
        player.loopEnd = 9;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[2].volume.value = -50;

    Player[3] = new Tone.Player();
    Player[3].load("loops/trimmed/tune02.mp3",function(player) {
        player.loopEnd = 12;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[3].volume.value = -50;

    Player[4] = new Tone.Player();
    Player[4].load("loops/trimmed/pagoda01.mp3",function(player) {
        player.loopEnd = 19.5;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[4].volume.value = -50;

    Player[5] = new Tone.Player();
    Player[5].load("loops/trimmed/pagodaDrums01.mp3",function(player) {
        player.loopEnd = 3;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[5].volume.value = -50;

    Player[6] = new Tone.Player();
    Player[6].load("loops/trimmed/sun01.mp3",function(player) {
        player.loopEnd = 12;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[6].volume.value = -50;

    Player[7] = new Tone.Player();
    Player[7].load("loops/trimmed/sun02.mp3",function(player) {
        player.loopEnd = 6;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[7].volume.value = -50;

    Player[8] = new Tone.Player();
    Player[8].load("loops/trimmed/passage01c.mp3",function(player) {
        player.loopEnd = 12;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[8].volume.value = -50;

    Player[9] = new Tone.Player();
    Player[9].load("loops/trimmed/passageDrums01.mp3",function(player) {
        player.loopEnd = 3;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[9].volume.value = -50;

    Player[10] = new Tone.Player();
    Player[10].load("loops/trimmed/floaty01.mp3",function(player) {
        player.loopEnd = 9;
        player.loop = true;
        loopsLoaded();
    });
    loadTotal += 1;
    Player[10].volume.value = -50;


    Reverb = new Tone.JCReverb(0.9);
    Reverb.wet.value = 0;

    Delay = new Tone.FeedbackDelay();
    Delay.delayTime.value = 0.05;
    Delay.feedback.value = 0.65;
    Delay.wet.value = 0.5;

    Osc[0] = new Tone.Oscillator(440, "sine");
    Osc[0].volume.value = -60;

    Osc[1] = new Tone.PWMOscillator(293.66,1);
    Osc[1].volume.value = -60;

    Osc[2] = new Tone.Oscillator(440, "sawtooth");
    Osc[2].volume.value = -200;

    Osc[3] = new Tone.Oscillator(440,"sawtooth");
    Osc[3].volume.value = -200;

    Noise[0] = new Tone.Noise();
    Noise[0].volume.value = -50;

    Filter[0] = new Tone.Filter(400);
    Filter[0].gain.value = 15;

    Filter[1] = new Tone.Filter(400);
    Filter[1].gain.value = 15;

    LFO[0] = new Tone.LFO(0.4,-10,10);

    ArpOsc = new Tone.Oscillator(440, "sine");
    ArpOsc.volume.value = -50;
    ArpFilter = new Tone.Filter(1600);

    SlideFilter = new Tone.Filter(5000);
    SlideLFO = new Tone.LFO(3,-300,300);

    Player[1].connect(DrumMeter.input);
    LFO[0].connect(Osc[0].detune);

    Player[0].connect(Filter[0]);
    Player[1].connect(Filter[0]);
    Player[2].connect(Filter[0]);
    Player[3].connect(Filter[0]);
    Player[4].connect(Filter[0]);
    Player[5].connect(Filter[0]);
    Player[6].connect(Filter[0]);
    Player[7].connect(Filter[0]);
    Player[8].connect(Filter[0]);
    Player[9].connect(Filter[0]);
    Player[10].connect(Filter[0]);

    Osc[0].connect(Filter[0]);
    Osc[1].connect(Filter[0]);
    Noise[0].connect(Filter[0]);

    Osc[2].connect(Filter[1]);
    Osc[3].connect(Filter[1]);

    ArpFilter.connect(Delay);
    ArpOsc.connect(ArpFilter);

    Filter[0].connect(Reverb);
    Filter[1].connect(Reverb);
    Reverb.toMaster();
    Delay.toMaster();

    Player[0].sync();
    Player[1].sync();
    Player[2].sync();
    Player[3].sync();
    Player[4].sync();
    Player[5].sync();
    //Player[6].sync();
    //Player[7].sync();
    //Player[8].sync();
    //Player[9].sync();

    Osc[0].sync();
    Osc[1].sync();
    Osc[2].sync();
    Osc[3].sync();
    Noise[0].sync();
    LFO[0].sync();
    ArpOsc.sync();
}


function SynthSet(n) {
    switch (n) {
        case 0:

            LFO[0].disconnect();
            LFO[0].set({
                frequency: 0.4,
                min: -10,
                max: 10
            });
            LFO[0].connect(Osc[0].detune);
            break;
        case 1:

            LFO[0].disconnect();
            LFO[0].set({
                frequency: 3,
                min: -300,
                max: 300
            });
            LFO[0].connect(Filter[1].frequency);
            break;

    }
}


function loopsLoaded() {
    loadedLoops += 1;

    if (loadedLoops==11) {
        getAllLoads();
    }
}

function granLoop(n) {

    if (Gran[n].Volume > -30) {

        var grainNo = Gran[n].CurrentGrain;
        var grain = Gran[n].Grains[grainNo];

        var startPoint = Gran[n].Location - (Gran[n].Spread*0.5) + (Math.random()*Gran[n].Spread);
        startPoint = ValueInRange(startPoint,0.05,grain.Player.duration - (GrainLength*2) - 0.01);
        var endPoint = startPoint + (GrainLength*1.1);

        grain.Player.stop();
        grain.Player.start("+0.01",startPoint,endPoint);
        grain.Envelope.triggerAttackRelease(GrainLength*0.5,"+0.01");


        Gran[n].CurrentGrain += 1;
        if (Gran[n].CurrentGrain === Gran[n].Grains.length) {
            Gran[n].CurrentGrain = 0;
        }

    }
}