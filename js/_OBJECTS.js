/**
 * Created by luketwyman on 20/08/2015.
 */


//-------------------------------------------------------------------------------------------
//  OBJECTS
//-------------------------------------------------------------------------------------------

function Point( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
}

function Point3D( x, y, z ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

function Vector( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
}

function Size( w, h ) {
    this.w = w || 0;
    this.h = h || 0;
}

function RGBA( r, g, b, a ) {
    this.R = r;
    this.G = g;
    this.B = b;
    this.A = a;

    this.toString = function() {
        return "rgba("+this.R+","+this.G+","+this.B+",1)";
    };

    this.clone = function () {
        return new RGBA(this.R, this.G, this.B, this.A);
    };
}

function Particle(point,vector) {
    this.Position = point || new Point();
    this.Vector = vector || new Vector();
    this.Active = false;
}

function Sprite( points ) {
    this.Points = points || [];
}

function Background( threeObject, positions, sprite, color ) {
    this.ThreeObject = threeObject || MasterObject;
    this.Positions = positions || [new Point()];
    this.Sprite = sprite || new Sprite();
    this.Color = color || new RGBA(Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255),1);
}

function Shard( threeObject, size, sprite, color, xscale, vine ) {
    this.ThreeObject = threeObject || MasterObject;
    this.Size = size || new Size();
    this.Sprite = sprite || new Sprite();
    this.Color = color || new RGBA(Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255),1);
    this.XScale = xscale || false;
    this.Vine = vine || 0;
}

function Controller( name, positions, threeObject, threeFloat, size, mode, slider, event, shards ) {
    this.Name = name || "No Name";
    this.Positions = positions || [new Point()];
    this.ThreeObject = threeObject || MasterObject;
    this.ThreeFloat = threeFloat || MasterObject;
    this.ThreeDest = new Point(this.ThreeObject.position.x, this.ThreeObject.position.y);
    this.Size = size || new Size();
    this.RollOver = false;
    this.Mode = mode || "omni";
    this.ArrowAlpha = 0;
    this.Slider = slider;
    if (slider) {
        this.Slider.origin = this.Slider.origins[0];
    }
    this.Event = event;
    this.Shards = shards || [];
    this.Mod = 0;
    this.IsPressed = false;
}
