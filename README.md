# Slot Machine Assignment

## Overview
This project is a simple slot machine game built with **JavaScript (ES6)** and **Pixi.js**.  
It was developed as part of a programming assignment to demonstrate knowledge of:
- Pixi.js rendering and asset management
- UI and interactive event handling
- Game logic implementation (reels, paylines, and payouts)
- Responsive scaling and structured project architecture

## Features
- **5x3 Reels**: Displays symbols from predefined reel bands.
- **Spin Button**: Randomizes reel positions on click.
- **Preloader**: Loads all symbol and UI assets with progress feedback.
- **Winning Logic**: Calculates payouts based on paylines and paytable.
- **Dynamic Display**: Shows total wins and detailed breakdown after each spin.
- **Responsive Design**: Game canvas rescales automatically to fit the browser window.
- **Styled UI**: Background image, centered game layout, canvas borders and shadow.

## Project Structure
```
slot-machine-final/
│── index.html
│── style.css
│── assets/
│   ├── symbols (hv1–hv4, lv1–lv4)
│   └── spin_button.png
│── js/
│   ├── assetLoader.js   # Handles preloading of assets
│   ├── reelSystem.js    # Reel bands, reel spin logic, and symbol rendering
│   ├── gameLogic.js     # Paytable, paylines, and win calculation
│   ├── ui.js            # UI components (spin button, win display)
│   └── main.js          # Entry point: initializes app and ties systems together
```

## How to Run

### Option 1: Using http-server (recommended)
1. Install http-server globally:
   ```bash
   npm install -g http-server
   ```
2. Navigate to the project folder:
   ```bash
   cd slot-machine-final
   ```
3. Start the server:
   ```bash
   http-server
   ```
4. Open the provided URL in your browser (usually `http://127.0.0.1:8080`).

### Option 2: Any Local Server
You can also use:
- VSCode Live Server extension
- Python’s built-in server:
  ```bash
  python -m http.server
  ```

## Paytable
| Symbol | 3 of a kind | 4 of a kind | 5 of a kind |
|--------|-------------|-------------|-------------|
| hv1    | 10          | 20          | 50          |
| hv2    | 5           | 10          | 20          |
| hv3    | 5           | 10          | 15          |
| hv4    | 5           | 10          | 15          |
| lv1    | 2           | 5           | 10          |
| lv2    | 1           | 2           | 5           |
| lv3    | 1           | 2           | 3           |
| lv4    | 1           | 2           | 3           |

## Paylines
7 paylines are supported, including horizontal (top, middle, bottom) and diagonal patterns (↘, ↖, V, inverted V). Wins are calculated from **left to right**.
