const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x0a0a0a,
    antialias: true
});

document.getElementById('game-container').appendChild(app.view);

const gameContainer = new PIXI.Container();
const reelsContainer = new PIXI.Container();
const uiContainer = new PIXI.Container();

app.stage.addChild(gameContainer);
gameContainer.addChild(reelsContainer);
gameContainer.addChild(uiContainer);

//Resize handling
function resize() {
    const gameWidth = 800;
    const gameHeight = 600;
    
    const scaleX = window.innerWidth / gameWidth;
    const scaleY = window.innerHeight / gameHeight;
    const scale = Math.min(scaleX, scaleY);
    
    app.renderer.resize(gameWidth * scale, gameHeight * scale);
    gameContainer.scale.set(scale);
}

window.addEventListener('resize', resize);
resize();

console.log("Game initialized successfully.");