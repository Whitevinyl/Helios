/**
 * Created by luketwyman on 20/08/2015.
 */

// 3D //
var renderer3D, scene3D, camera3D;
var MasterObject, World3D;

function setup3D() {

    var i;
    renderer3D = new THREE.CanvasRenderer();
    //renderer3D = new THREE.WebGLRenderer();
    scene3D = new THREE.Scene();
    camera3D = new THREE.PerspectiveCamera( 45, halfX / halfY, 0.1, 1000 );


    MasterObject = new THREE.Object3D();
    scene3D.add(MasterObject);

    World3D = new THREE.Object3D();
    MasterObject.add(World3D);

    MasterObject.rotation.x = (Math.PI/180) * -20;
    MasterObject.rotation.y = (Math.PI/180) * -40;

    for (i=0; i<BackgroundList.length; i++) {
        var background = BackgroundList[i];
        backgrounds.push ( createBackground(background) );
    }

    for (i=0; i<SceneryList.length; i++) {
        var scn = SceneryList[i];
        scenery.push ( createScenery(scn) );
    }

    for (i=0; i<ControllerList.length; i++) {
        var controller = ControllerList[i];
        controllers.push ( createController(controller) );
        floatTo(controllers[i],Math.random()*2);
    }

    camera3D.position.set(0,0,4);
}

//-------------------------------------------------------------------------------------------
//  UNIT CONVERSION
//-------------------------------------------------------------------------------------------



function get2Dfrom3D(object,camera) {
    var point = new Point();
    var vector = new THREE.Vector3();
    var threeObj = object;
    if (object.ThreeObject) {
        threeObj = object.ThreeObject;
    }
    threeObj.updateMatrixWorld();
    var matrix = threeObj.matrixWorld;
    vector.setFromMatrixPosition(matrix);
    vector.project(camera);

    point.x = ((vector.x+1)*0.5) * fullX;
    point.y = ((-vector.y+1)*0.5) * fullY;
    return point;
}

function cursorTo3D(mx,my,obj,camera) {
    var point = new Point();
    point.x = ((mx-halfX)/fullX)*2;
    point.y = -(((my-halfY)/fullY))*2;

    var vector1 = new THREE.Vector3();
    obj.ThreeObject.updateMatrixWorld();
    var matrix = obj.ThreeObject.matrixWorld;
    vector1.setFromMatrixPosition(matrix);
    vector1.project(camera);

    var vector = new THREE.Vector3();
    vector.set(point.x,point.y,vector1.z);
    vector.unproject(camera);
    return vector;
}