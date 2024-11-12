## Paper-Scissors-Rocks Game
This is a web-based implementation of the classic Paper-Scissors-Rocks game. It allows players to choose their moves, play against the computer, and keep track of their score and streaks. Additionally, it includes a leaderboard that displays the top 10 players based on their performance, and the leaderboard is persisted in a database.


## Setup and Installation
To set up and run this application locally, follow these steps:

### 1. Clone the repository:
```bash
git@github.com:lxndrMr/paper-scissors-rocks.git
```

### 2. Navigate to the project directory:
```bash
cd paper-scissors-rocks
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Create a .env file:
You can copy `.env.sample` as starters and fill in your own values.

### 5. Run the application:
```bash
npm run dev
```

## Usage
To play the game, simply open the application in your web browser. Enter your username and click the "Submit" button. The game will then begin, and you can choose your move. If you win, you will receive a point. If you lose, the game will end, you can restart the game.