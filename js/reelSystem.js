class ReelSystem {
    constructor() {
        this.reelBands = [
            ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
            ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
            ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
            ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
            ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
        ];
        
        //Starting position as described in the assignment instructions
        this.currentPositions = [0, 0, 0, 0, 0];

        this.SYMBOL_SIZE = 80; // Size of each symbol in pixels
        this.GRID_START_X = 200; // X position of the grid start
        this.GRID_START_Y = 100; // Y position of the grid start

        this.symbolSprites = [];
        this.loadedAssets = null;

        console.log("ReelSystem initialized.");
    }


    getVisibleSymbols(reelIndex, position) {
        const band = this.reelBands[reelIndex];
        const visibleSymbols = [];

        for (let i = 0; i < 3; i++) {
            const symbolIndex = (position + i) % band.length;
            visibleSymbols.push(band[symbolIndex]);
        }

        return visibleSymbols;
    }

    createReelSprites(loadedAssets, container) {
        this.loadedAssets = loadedAssets;

        for(let col = 0; col < 5; col++) {
            this.symbolSprites[col] = [];
            const visibleSymbols = this.getVisibleSymbols(col, this.currentPositions[col]);

            for(let row = 0; row < 3; row++) {
                const symbolKey = visibleSymbols[row];
                const sprite = new PIXI.Sprite(loadedAssets[symbolKey]);

                sprite.x = this.GRID_START_X + (col * (this.SYMBOL_SIZE + 10));
                sprite.y = this.GRID_START_Y + (row * (this.SYMBOL_SIZE + 10));
                sprite.width = this.SYMBOL_SIZE;
                sprite.height = this.SYMBOL_SIZE;

                this.symbolSprites[col][row] = sprite;
                container.addChild(sprite);
            }
        }

        this.logCurrentGrid();
    }

    logCurrentGrid() {
        console.log("Current Reel Grid:", this.currentPositions);
        for (let reel = 0; reel < 5; reel++) {
            const symbols = this.getVisibleSymbols(reel, this.currentPositions[reel]);
            console.log(`Reel ${reel + 1}: ${symbols.join(', ')}`);
        }
    }

    spin() {

        for(let col = 0; col < 5; col++) {
            this.currentPositions[col] = Math.floor(Math.random() * this.reelBands[col].length);
        }

        console.log("New positions after spin:", this.currentPositions);
        this.updateReelSprites();
    }

    updateReelSprites() {

        for(let col = 0; col < 5; col++) {
            const visibleSymbols = this.getVisibleSymbols(col, this.currentPositions[col]);

            for(let row = 0; row < 3; row++) {
                const symbolKey = visibleSymbols[row];
                this.symbolSprites[col][row].texture = this.loadedAssets[symbolKey];
            }
        }
    }

     getCurrentScreen() {
        const screen = [];
        for (let col = 0; col < 5; col++) {
            screen[col] = this.getVisibleSymbols(col, this.currentPositions[col]);
        }
        return screen;
    }
 }