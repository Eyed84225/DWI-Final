//array for the pieces
arrPieces = [
    ['br','bk','bb','bq','BK','bb','bk','br'],
    ['bp','bp','bp','bp','bp','bp','bp','bp'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['wp','wp','wp','wp','wp','wp','wp','wp'],
    ['wr','wk','wb','WK','wq','wb','wk','wr']
]

//create a pointer to the secret span
var secretSpan = document.getElementById("selectedSquare");

//function to make checkersBoard
        function buildcheckersBoard(){
            let checkersBoard = document.getElementById("divCheckersBoard");
            //loop to create 8 rows
            for(let i=0; i < 8; i++){
                //inner loop to create 8 columns
                for(let j=0; j < 8; j++){
                    // create a div for each square
                    let checkerSquare = document.createElement('div');
                    //add the css class to the div
                    checkerSquare.className = 'checkerSquare';
                    //add an id to know where the pieces are 
                    checkerSquare.setAttribute("id","div" + i + j);

                    //use modules to alter the color
                    //if the is a remainder is 0 then the number is even
                    if ((i+j) % 2 == 1){
                        // if number is odd then that square is black
                        checkerSquare.style.backgroundColor = "black";
                        //add an event listen to wait for the user to click on a piece and move it to another square
                        checkerSquare.addEventListener("click", movePiece);

                    }

                    //add the square to the checkersBoard
                    checkersBoard.appendChild(checkerSquare);

                    //checks to see if any area in the array is null and if not will add a checkers piece to that area
                    if (arrPieces[i][j]){
                        // pass 3 arguments - piece, the css class to set the correct color, the div where the piece is to added
                        createPiece("piece" + i + j, "checkerPiece-" + arrPieces[i][j], checkerSquare);
                    }
                }
            }
        }
        buildcheckersBoard();

        //function to create the pieces
        function createPiece(id, pieceClass, theSquare){
            //create a new div
            var newPiece = document.createElement("div");
            //set the id to know what piece is being worked on
            newPiece.setAttribute("id", id);
            //apply the standard piece class
            newPiece.classList.add("checkerPiece");
            //use the value passed to make it a white or black piece
            newPiece.classList.add(pieceClass);
            //add a event listener to wait for the piece to be clicked on
            newPiece.addEventListener("click", savePieceId);
            //add the piece to the square
            theSquare.appendChild(newPiece)
        }

        //function to move the pieces
        function movePiece(event){
            console.log("move function called")
            //what square was clicked
            var newSquareId = event.target.id
            //remove any prefix
            newSquareId = newSquareId.replace("piece", "").replace("div", "")
            //get the id of the piece the user wants to move
            var selPieceId = secretSpan.textContent;
            //make sure that the user is trying to move the to a different square 
            if (newSquareId != selPieceId){
                //create a pointer to the old square
                var oldSquare = document.getElementById("div" + selPieceId);
                //create a pointer to the old piece
                var oldPiece = document.getElementById("piece" + selPieceId);
                //get the color of the old piece
                var oldPieceColorClass = oldPiece.classList[1];
                //remove the old piece from the board
                oldSquare.removeChild(oldPiece);
                //create a pointer to the new square
                var newSquare = document.getElementById("div" + newSquareId);
                //create the new piece on the square
                createPiece("piece" + newSquareId, oldPieceColorClass, newSquare);
                //clear the content from the span
                secretSpan.textContent = "";
            }
        }

        function savePieceId(event){
            console.log("Save id called");
            //var to hold the id of the piece.
            var selectedPieceId = event.target.id;
            //remove the word 'piece' from the id to just have the row and col #
            selectedPieceId = selectedPieceId.replace("piece", "");
            //store the id in the secret span
            secretSpan.textContent = selectedPieceId;
            console.log("Selected Piece is " + selectedPieceId);

        }