let playerMove;
let buttons = document.querySelectorAll(".choice");
let playerMoveDisplay = document.getElementById("player");
let botMoveDisplay = document.getElementById("bot");
let playerScoreDisplay = document.getElementById("player-score");
let botScoreDisplay = document.getElementById("computer-score");
let drawNumDisplay = document.getElementById("draw-num");

let movesArray = ["rock", "paper", "scissors"];

let winLoseTable = {
    "rock": "scissors",
    'scissors': 'paper',
    'paper': 'rock'
};

let playerScore = 0;
let botScore = 0;
let drawNum = 0;

let playerMoveHistory = [];

// Function to display moves
function displayMoves(playerMove, botMove) {
    animateElement(playerMoveDisplay, "disappear");
    animateElement(botMoveDisplay, "disappear");

    setTimeout(() => {
        playerMoveDisplay.innerHTML = getIcon(playerMove);
        botMoveDisplay.innerHTML = getIcon(botMove, true);

        animateElement(playerMoveDisplay, "reappear");
        animateElement(botMoveDisplay, "reappear");
    }, 200);
}

// Function to animate element
function animateElement(element, animation) {
    element.style.animation = `${animation} 0.2s linear`;
    element.style.opacity = (animation === "disappear") ? "0" : "1";
}

// Function to get SVG icon based on move
function getIcon(move, isBot = false) {
    let svg;
    switch (move) {
        case 'rock':
            svg = `<svg width="212" height="173" viewBox="0 0 212 173" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M113.5 68.3304L122 73.2398L145.5 73.2398L145.5 17.7643L144 15.8005L132 5L99.5 5L83.5 10.8912L53 40.3472L16.5 41.82L5 53.1115L5.00001 137.552L16.5 148.353L51.5 148.353L83.5 167.99L132 167.99M113.5 68.3304L109.5 59.4936L109.5 38.8744L96.5 38.8744M113.5 68.3304L109.5 73.2398L109.5 85.0222L117 93.859L125 93.859M194.5 93.859L207 83.0584L207 71.767L207 68.3304L194.5 59.4936L185.5 59.4936M194.5 93.859L207 107.114L207 119.878L197 130.188L195 131.17L180 131.17M194.5 93.859L125 93.859M152 59.4936L185.5 59.4936M185.5 59.4936L197 49.184L197 32.0014L185.5 23.6555L150.5 23.6555M125 93.859L113.5 99.2593L107.5 108.587L107.5 114.969L113.5 125.279L125 131.17L132 131.17M180 131.17L197.5 140L198.5 153.262L184 167.99L132 167.99M180 131.17L132 131.17M132 167.99L122 158.662L122 139.516L132 131.17" stroke="#FFAF65" stroke-width="5"/>
                <path d="M88.1822 77.7702L71.1822 91.5163L48.0001 94.35" stroke="#FFAF65" stroke-width="5"/>
            </svg>`;
            break;
        case 'paper':
            svg = `<svg width="270" height="214" viewBox="0 0 270 214" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.3925 134.318L62.3474 134.158L76.3144 131.008L92.142 114.838" stroke="#FFAF65" stroke-width="5"/>
            <path d="M140.648 99.8167L240.978 98.7412M240.978 98.7412L252.977 98.6126L264.089 108.994L264.234 122.493L253.358 134.111L140.364 135.322L237.359 134.282L247.976 145.169L248.003 147.669L248.142 160.668L237.761 171.78L142.266 172.804L207.262 172.107L207.3 175.607L215.885 183.515L216.03 197.014L207.638 207.105L202.138 207.164L86.6446 208.402L52.9375 189.262L16.9396 189.648L6.81687 178.256L5.89503 92.2607L15.7926 82.6541L51.7906 82.2682L127.493 7.45244L142.653 22.2908L142.91 46.2894L113.233 76.6093L127.083 62.46L129.082 62.4386L136.082 62.3635L238.576 61.2648L250.704 73.1355L250.843 86.1348L240.978 98.7412Z" stroke="#FFAF65" stroke-width="5"/>
            </svg>`;
            break;
        case 'scissors':
            svg = `<svg width="278" height="175" viewBox="0 0 278 175" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M129 169.5L83.5 169.5L52.5 149.5H14L5 139.5V55.5L16 44.5H49.5L54 41.5L81 14.5L99.5 5L133 5L145 14.5V23.5M129 169.5H184L196.5 160V145L190.786 139M129 169.5L120.5 158V143.5L129 134.5H186.5L190.786 139M190.786 139L205.5 124.5V113M123.5 137.5L109.5 125V121.5V107L122 96L195 96L205.5 106.5V113M205.5 113C220.333 117.667 250.1 126.9 250.5 126.5C250.9 126.1 261 121.667 266 119.5L271.5 105L261.5 89L145 60L258 60L269 50V34L256.5 23.5H151H145M145 23.5V76L119 75.5L110 65.5V39.5L95.5 39.5" stroke="#FFAF65" stroke-width="5"/>
            <path d="M44.5 96L71 95L92 75.5" stroke="#FFAF65" stroke-width="5"/>
            </svg>`;
            break;
    }
    if (isBot) {
        // Flip the SVG vertically for bot
        svg = svg.replace('<svg', '<svg style="transform: scaleX(-1);"');
    }
    return svg;
}

// Function to determine winner
function getWinner(playerMove, botMove) {
    if (playerMove === botMove) {
        return "draw";
    } else if (winLoseTable[playerMove] === botMove) {
        return "player";
    } else {
        return "bot";
    }
}

// Function to generate bot move
function generateBotMove() {
    let playerMovesPattern = playerMoveHistory.slice(-3).join('');

    // Simple heuristic:
    // If the player frequently repeats a move, the bot counters with the move that beats it
    // If the player frequently alternates between two moves, the bot counters with the move that beats the player's last move
    // If no clear pattern is found, the bot plays randomly
    console.log(playerMovesPattern)
    let predictedMove;
    if (playerMovesPattern.includes('rrr')) {
        predictedMove = 'paper'; // Counter rock with paper
    } else if (playerMovesPattern.includes('ppp')) {
        predictedMove = 'scissors'; // Counter paper with scissors
        console.log(playerMovesPattern.includes('ppp'))
    } else if (playerMovesPattern.includes('sss')) {
        predictedMove = 'rock'; // Counter scissors with rock
    } else if (playerMovesPattern.includes('rpr')) {
        predictedMove = 'scissors'; // Predict that the player will play paper next
    } else if (playerMovesPattern.includes('sps')) {
        predictedMove = 'scissors';
    } else if (playerMovesPattern.includes('prp')) {
        predictedMove = 'paper';
    } else if (playerMovesPattern.includes('psp')) {
        predictedMove = 'rock'; // Predict that the player will play scissors next
    } else if (playerMovesPattern.includes('srs')) {
        predictedMove = 'paper'; // Predict that the player will play rock next
    } else if (playerMovesPattern.includes('rps')) {
        predictedMove = 'rock'; // Predict that the player will play rock next
    } else {
        // If no clear pattern is detected, play randomly
        predictedMove = movesArray[Math.floor(Math.random() * 3)];
    }

    return predictedMove;
}

// Function to update scores
function updateScores(result) {
    switch (result) {
        case "draw":
            drawNum++;
            break;
        case "player":
            playerScore++;
            break;
        case "bot":
            botScore++;
            break;
    }
    updateScoreDisplays();
}

// Function to update score displays
function updateScoreDisplays() {
    animateElement(playerScoreDisplay, "disappear");
    animateElement(botScoreDisplay, "disappear");
    animateElement(drawNumDisplay, "disappear");

    setTimeout(() => {
        playerScoreDisplay.textContent = playerScore;
        botScoreDisplay.textContent = botScore;
        drawNumDisplay.textContent = drawNum;

        animateElement(playerScoreDisplay, "reappear");
        animateElement(botScoreDisplay, "reappear");
        animateElement(drawNumDisplay, "reappear");
    }, 510);
}

// Function to show modal
function showModal(message) {
    let modal = document.getElementById("result-modal");
    let modalText = document.getElementById("modal-text");
    modalText.textContent = message;
    modal.style.display = "block";

    // Close the modal when the user clicks anywhere outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Close the modal when the user clicks on the close button
    let closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.disabled) return;

        playerMove = button.dataset.value;
        playerMoveHistory.push(playerMove.charAt(0));

        let botMove = generateBotMove();

        displayMoves(playerMove, botMove);

        buttons.forEach(button => {
            button.disabled = true;
        });

        let audio = new Audio(`./assets/audio/select.mp3`);
        audio.play();

        setTimeout(() => {
            buttons.forEach(button => {
                button.disabled = false;
            });
            console.log(playerScore, botScore, drawNum);
        }, 500);

        setTimeout(() => {
            let result = getWinner(playerMove, botMove);
            switch(result) {
                case "draw":
                    showModal("It's a draw!");
                    drawNum++;
                    break;
                case "player":
                    showModal("Congratulations! You win!");
                    playerScore++;
                    break;
                case "bot":
                    showModal("Oops! You lose!");
                    botScore++;
                    break;
            }
            updateScores(result);
        }, 510);
    });
});
