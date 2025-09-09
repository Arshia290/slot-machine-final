class AssetLoader {
    constructor(app){
        this.app = app;
        this.preloaderText = null;
    }

    createPreloader() {
        this.preloaderText = new PIXI.Text('Loading... 0%', {
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 0xffffff
        });

        this.preloaderText.anchor.set(0.5);
        this.preloaderText.position.set(400,300);
        this.app.stage.addChild(this.preloaderText);

        console.log("Preloader created.");

    }

    async loadAssets() {
        this.createPreloader();

       try {
            const assetNames = ['hv1', 'hv2', 'hv3', 'hv4', 'lv1', 'lv2', 'lv3', 'lv4', 'spinButton'];
            const assetPaths = [
                'assets/hv1_symbol.png',
                'assets/hv2_symbol.png',
                'assets/hv3_symbol.png',
                'assets/hv4_symbol.png',
                'assets/lv1_symbol.png',
                'assets/lv2_symbol.png',
                'assets/lv3_symbol.png',
                'assets/lv4_symbol.png',
                'assets/spin_button.png'
            ];
        
        const loadedAssets = {};

        for (let i = 0; i < assetPaths.length; i++) {
                const progress = Math.round((i / assetPaths.length) * 100);
                this.preloaderText.text = `Loading: ${progress}%`;
                
                const texture = await PIXI.Assets.load(assetPaths[i]);
                loadedAssets[assetNames[i]] = texture;
                
                console.log(`Loaded: ${assetNames[i]}`);
            }

        this.preloaderText.text = 'Loading: 100%';
        await new Promise(resolve => setTimeout(resolve, 500));

        this.app.stage.removeChild(this.preloaderText);

        console.log("All assets loaded successfully.");
        return loadedAssets;
         } catch (error) {
            console.error("Error loading assets:", error);
            this.preloaderText.text = 'Error loading assets';
            throw error;
        }
    }
}