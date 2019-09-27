function initMatterApp2(canvas) {

    //Setup Matter JS
    var engine = Matter.Engine.create();
    var world = engine.world;
    // remove gravity
    world.gravity.y = 0;

    var render = Matter.Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 800,
            height: 800,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });

    /** ====================================================< MAIN CODE >==================================================== */

    let gears = window.gears = addGear();
    let key = window.key = addKey();

    // apply pivots for gear and key
    var constraint = Matter.Constraint.create({
        pointA: { x: 550, y: 600 },
        bodyB: gears,
        length: 0
    });
    var constraint_2 = Matter.Constraint.create({
        pointA: { x: 235, y: 600 },
        bodyB: key,
        pointB: { x: -50, y: 0 },
        length: 0
    });

    Matter.World.add(world, [gears, constraint]);
    Matter.World.add(world, [key, constraint_2]);

    Matter.Events.on(engine, 'beforeUpdate', onBeforeUpdate);

    /** ====================================================</ MAIN CODE >==================================================== */
    //Start the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    function addGear() {
        var gearsVerticesArray = [-27, -360.5, 33, -359.5, 62.5, -283, 118, -257.5, 182, -306.5, 219, -292.5, 247, -264.5, 228, -170.5, 256, -141.5, 336, -142.5, 360.5, -87, 287.5, -20, 355, 107.5, 334, 141.5, 254, 138.5, 215.5, 186, 234.5, 280, 182.5, 309, 118.5, 261, 60, 274.5, 17, 359.5, -42.5, 353, -65.5, 274, -104.5, 261, -188.5, 309, -223.5, 289, -245.5, 256, -220.5, 179, -264, 139.5, -344, 137.5, -361.5, 79, -288.5, 12, -289.5, -28, -356.5, -73, -354.5, -113, -330, -142.5, -250, -139.5, -217.5, -191, -233.5, -283, -180, -307.5, -116, -259.5, -77, -270.5, -28, -360.5];
        var gearsStr = "";
        var gearsFactor = 0.4;
        gearsVerticesArray.forEach(element => {
            let modd = element * gearsFactor;
            gearsStr += modd.toString() + " ";
        });

        var gearsVertices = Matter.Vertices.fromPath(gearsStr);
        var gears = Matter.Bodies.fromVertices(500, 600, gearsVertices, {
            isStatic: false,
            render: {
                fillStyle: "#228465",
                strokeStyle: "#356554",
                lineWidth: 1
            }
        }, true);

        return gears;
    }

    function addKey() {
        var keyVerticesArray = [-716, -581.5, -396, -516.5, -170.5, -276, -17, -363.5, 54, -211.5, 1014, -219.5, 1147, -146.5, 1195.5, -43, 969, 158.5, 849, 161.5, 778.5, 103, 638.5, 213, 548, 213.5, 434, 113.5, 297.5, 228, 179.5, 139, 60, 131.5, 9.5, 324, -152.5, 251, -423, 529.5, -597, 579.5, -806, 560.5, -969, 479.5, -1113.5, 325, -1191.5, 129, -1199.5, -81, -1050.5, -408, -908, -519.5, -717, -581.5];
        var keyStr = "";
        var keyFactor = 0.1;
        keyVerticesArray.forEach(element => {
            let modd = element * keyFactor;
            keyStr += modd.toString() + " ";
        });

        var keyVertices = Matter.Vertices.fromPath(keyStr);
        var key = Matter.Bodies.fromVertices(275, 600, keyVertices, {
            isStatic: false,
            render: {
                fillStyle: "#995473",
                strokeStyle: "#457812",
                lineWidth: 1
            }
        }, true);

        key.inertia = Infinity;

        // key.restitution = 0.5;

        return key;
    }

    function onBeforeUpdate(event) {
        // body is static so must manually update velocity for friction to work
        // make compound body rotate constantly
        Matter.Body.setAngularVelocity(gears, 0.04);
        // Matter.Body.setDensuitt
        // Matter.Body.rotate(gears, 0.02);
    }

    /** return data and controllers. */
    return {
        renderer: render,
        engine,
        world,
        render,
        canvas: render.canvas,
    }
};