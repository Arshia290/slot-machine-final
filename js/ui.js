class UI {
    constructor(app) {
        this.app = app;
        this.spinButton = null;
        this.loadedAssets = null;
    }

    createSpinButton(loadedAssets, container, onClick) {
        this.loadedAssets = loadedAssets;

        console.log("Creating spin button...");

        this.spinButton = new PIXI.Sprite(loadedAssets.spinButton);
        this.spinButton.anchor.set(0.5);
        this.spinButton.x = 400;
        this.spinButton.y = 400;
        this.spinButton.width = 100;
        this.spinButton.height = 100;

        this.spinButton.eventMode = 'static';
        this.spinButton.cursor = 'pointer';
        this.spinButton.on('pointerdown', onClick);

        container.addChild(this.spinButton);

        console.log("Spin button created.");
    }

    //Preventing double click issues
    setSpinButtonEnabled(enabled) {
        if (this.spinButton) {
            this.spinButton.eventMode = enabled ? 'static' : 'none';
            this.spinButton.cursor = enabled ? 'pointer' : 'default';
            this.spinButton.alpha = enabled ? 1.0 : 0.5;
        }
    }

    createWinDisplay(container) {
        console.log("Creating win display...");
        
        this.winText = new PIXI.Text('Total wins: 0', {
            fontSize: 18,
            fill: 'white',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: 700
        });
        
        this.winText.x = 50;
        this.winText.y = 480;
        container.addChild(this.winText);
        
        console.log("Win display created!");
    }

    updateWinDisplay(text) {
        if (this.winText) {
            this.winText.text = text;
        }
    }

}