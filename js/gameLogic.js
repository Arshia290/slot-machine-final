class GameLogic {
    constructor() {

        this.paytable = {
            'hv1': { 3: 10, 4: 20, 5: 50 },
            'hv2': { 3: 5,  4: 10, 5: 20 },
            'hv3': { 3: 5,  4: 10, 5: 15 },
            'hv4': { 3: 5,  4: 10, 5: 15 },
            'lv1': { 3: 2,  4: 5,  5: 10 },
            'lv2': { 3: 1,  4: 2,  5: 5 },
            'lv3': { 3: 1,  4: 2,  5: 3 },
            'lv4': { 3: 1,  4: 2,  5: 3 }
        };

        this.paylines = [
            [1, 1, 1, 1, 1], //middle row
            [0, 0, 0, 0, 0], //top row
            [2, 2, 2, 2, 2], //bottom row
            [0, 0, 1, 2, 2], //diagonal down
            [2, 2, 1, 0, 0], //diagonal up
            [0, 1, 2, 1, 0], //V shape
            [2, 1, 0, 1, 2]  //inverted V
        ];

        console.log("GameLogic initialized.");
    }

    calculateWins(currentScreen) {
        const wins = [];
        let totalWin = 0;

        for (let lineIndex = 0; lineIndex < this.paylines.length; lineIndex++) {
            const payline = this.paylines[lineIndex];
            
            const lineSymbols = [];
            for (let col = 0; col < 5; col++) {
                const row = payline[col];
                lineSymbols.push(currentScreen[col][row]);
            }

            const firstSymbol = lineSymbols[0];
            let matchCount = 1;

            for (let i = 1; i < 5; i++) {
                if (lineSymbols[i] === firstSymbol) {
                    matchCount++;
                } else {
                    break;
                }
            }

            if (matchCount >= 3 && this.paytable[firstSymbol] && this.paytable[firstSymbol][matchCount]) {
                const payout = this.paytable[firstSymbol][matchCount];
                wins.push({
                    payline: lineIndex + 1,
                    symbol: firstSymbol,
                    count: matchCount,
                    payout: payout
                });
                totalWin += payout;

                console.log(`WIN! Payline ${lineIndex + 1}: ${firstSymbol} x${matchCount} = ${payout}`);
            }
        }

        console.log(`Total wins: ${totalWin}`);
        return { wins, totalWin };
    }

    formatWinDisplay(winResult) {
        if (winResult.totalWin === 0) {
            return 'Total wins: 0';
        } else {
            let displayText = `Total wins: ${winResult.totalWin}\n`;
            for (const win of winResult.wins) {
                displayText += `- payline ${win.payline}, ${win.symbol} x${win.count}, ${win.payout}\n`;
            }
            return displayText;
        }
    }
}
