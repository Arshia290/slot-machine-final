const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x3282b8,
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

async function initializeGame() {
    console.log("Starting asset loading...");
    
    const assetLoader = new AssetLoader(app);
    
    try {
        const loadedAssets = await assetLoader.loadAssets();
        
        console.log("Assets loaded:", Object.keys(loadedAssets));

        // Initialize Reel System
        console.log("Initializing Reel System...");
        const reelSystem = new ReelSystem();
        reelSystem.createReelSprites(loadedAssets, reelsContainer);

        // Initialize Game Logic
        console.log("Initializing Game Logic...");
        const gameLogic = new GameLogic();

        // Initialize UI
        console.log("Initializing UI...");
        const ui = new UI(app);

        ui.createWinDisplay(uiContainer);

        function calculateAndDisplayWins() {
            const currentScreen = reelSystem.getCurrentScreen();
            const winResult = gameLogic.calculateWins(currentScreen);
            const displayText = gameLogic.formatWinDisplay(winResult);
            ui.updateWinDisplay(displayText);
        }

        calculateAndDisplayWins();

        ui.createSpinButton(loadedAssets, uiContainer, () => {
            ui.setSpinButtonEnabled(false);
            reelSystem.spin();
            calculateAndDisplayWins();
            ui.setSpinButtonEnabled(true);
        });
        
    } catch (error) {
        console.error("Failed to initialize game:", error);
    }
}

// Start the game
initializeGame();

console.log("Pixi.js application initialized.");