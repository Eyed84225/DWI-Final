let boxes = [...document.querySelectorAll('.box')];
        let resetBtn = document.querySelector('#reset');
        let turnO = true; // Player X starts, will be turn off to on to simuate a turn switch 
        let newGameBtn = document.querySelector('#new-btn');
        let msgContainer = document.querySelector('.msg-container');
        let msg = document.querySelector('#msg');
        //hard coded win patterns
        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];
        //adds an event listener to each box wait for a click, as well as runs a constant turn switch
        boxes.forEach((box) => {
            box.addEventListener('click', function () {
                if (turnO) {
                    box.innerText = 'X';
                    box.style.color = 'black';
                    turnO = false;
                    box.disabled = true;
                    checkWinner();
                } else {
                    box.innerText = 'O';
                    box.style.color = 'black';
                    turnO = true;
                    box.disabled = true;
                    checkWinner();
                }
            });
        });
        //reenables boxes after a game
        const enableBoxes = () => {
            for (let box of boxes) {
                box.disabled = false;
                box.innerText = "";
            }
        };
        //disables a box once it's been clicked on 
        const disableBoxes = () => {
            for (let box of boxes) {
                box.disabled = true;
            }
        };
        //shows a winner banner
        const showWinner = (winner) => {
            msg.innerText = `Congratulations, Winner is ${winner}`;
            msgContainer.classList.remove('hide');
            disableBoxes();
        };
        // checks which player has won by checking the posible win patterns
        const checkWinner = () => {
            let hasWin = false;
            for (let pattern of winPatterns) {
                let pos1Val = boxes[pattern[0]].innerText;
                let pos2Val = boxes[pattern[1]].innerText;
                let pos3Val = boxes[pattern[2]].innerText;

                if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" && 
                    pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    hasWin = true;
                    return;
                }
            }
            //if no one wins then sets a draw to happen
            if (!hasWin) {
                const allBoxes = [...boxes].every((box) => box.innerText !== "");
                if (allBoxes) {
                    msgContainer.classList.remove('hide');
                    msg.innerText = 'Match Drawn';
                }
            }
        };

        const resetGame = () => {
            turnO = true;
            enableBoxes();
            msgContainer.classList.add('hide');
        };

        newGameBtn.addEventListener('click', resetGame);
        resetBtn.addEventListener('click', resetGame);