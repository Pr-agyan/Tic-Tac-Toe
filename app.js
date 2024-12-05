let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts
let gameActive = true; // Game is active by default

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.innerText !== "") return;

        // Mark the box and switch turns
        box.innerText = turnO ? "O" : "X";
        box.classList.add("disabled");
        turnO = !turnO;

        // Check for a winner
        checkWinner();
    });
});

// Show the winning message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    gameActive = false; // Stop the game
};

// Check for a winner or draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [pos1, pos2, pos3] = pattern;
        let pos1Val = boxes[pos1].innerText;
        let pos2Val = boxes[pos2].innerText;
        let pos3Val = boxes[pos3].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            highlightWinningBoxes(pattern); // Optional: Highlight winning boxes
            return;
        }
    }

    // Check for a draw
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        gameActive = false;
    }
};

// Optional: Highlight winning boxes
const highlightWinningBoxes = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].style.backgroundColor = "#9acd32"; // Light green for winning boxes
    });
};

// Reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("disabled");
        box.style.backgroundColor = ""; // Reset background color
    });
    msgContainer.classList.add("hide");
    msg.innerText = "";
    turnO = true;
    gameActive = true;
};

// Attach event listeners to reset buttons
resetbtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
