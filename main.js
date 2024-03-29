

// Grab our canvases
const canvas = document.querySelector('#app')
const offscreenCanvas = document.createElement('canvas');
const offscreenCanvas2 = document.createElement('canvas');
const offscreenCanvas3 = document.createElement('canvas');

// init pixi.js
const pixiApp = initPixiApp(canvas);

// init matter.js offscreen
const matterApp = initMatterApp(offscreenCanvas);
const matterApp2 = initMatterApp2(offscreenCanvas2);
const matterApp3 = initMatterApp3(offscreenCanvas3);
/** ====================================================< MAIN CODE >==================================================== */

// Render matter.js as a pixi layer
const matterTexture = PIXI.Texture.from(matterApp.canvas);
const matterSprite = new PIXI.Sprite(matterTexture);
// divide by pixelratio to make it the correct size
matterSprite.scale.x /= window.devicePixelRatio;
matterSprite.scale.y /= window.devicePixelRatio;
pixiApp.stage.addChild(matterSprite);

// Render second matter.js as a pixi layer
const matterTexture2 = PIXI.Texture.from(matterApp2.canvas);
const matterSprite2 = new PIXI.Sprite(matterTexture2);
// divide by pixelratio to make it the correct size
matterSprite2.scale.x /= window.devicePixelRatio;
matterSprite2.scale.y /= window.devicePixelRatio;
pixiApp.stage.addChild(matterSprite2);

// Render third matter.js as a pixi layer
const matterTexture3 = PIXI.Texture.from(matterApp3.canvas);
const matterSprite3 = new PIXI.Sprite(matterTexture3);
// divide by pixelratio to make it the correct size
matterSprite3.scale.x /= window.devicePixelRatio;
matterSprite3.scale.y /= window.devicePixelRatio;
pixiApp.stage.addChild(matterSprite3);

pixiApp.playButton.on("pointerup", matterApp2.startSpin)

/** ====================================================</ MAIN CODE >==================================================== */

const gui = initDatGui();

function onCollisionDetected(event) {
    if (!matterApp2.getSpinPhase()) { return; }
    increaseKillCount();
    playSound();
    updateCollisionText(event.detail.bodyA.label, event.detail.bodyB.label)
}

function onResponseReceived(event) {
    let txt = getTextElement();
    txt.visible = true;
    txt.text = "Yo!!!!!!!!!\nRESPONSE RECEIVED";
}

/** ==================================================== UPDATE CYCE ==================================================== */
requestAnimationFrame(update);
function update(time) {
    // pixiApp.renderer.reset();
    matterSprite.texture.update();
    matterSprite2.texture.update();
    matterSprite3.texture.update();
    // pixiApp.render()

    requestAnimationFrame(update);
}

// add events
document.addEventListener("COLLIDED", onCollisionDetected);
document.addEventListener("RESPONSE_RECEIVED", onResponseReceived);
window.addEventListener('resize', resize);
function resize() {
    matterSprite2.anchor.set(0.5, 0.5);
    matterSprite2.position.set(innerWidth / 2, innerHeight / 2);
};
resize();