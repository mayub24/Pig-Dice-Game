/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// STATE variables tell us the condition of a system.
// State variable is used to remember the condition of something.
// Ex. We want to do certain things when the game is being played


let scores, roundScore, currentPlayer, playingGame, lastDice;
currentPlayer = 0;
initialize();

// RANDOMLY GENERATED NUMBERS FROM 1 - 6 (Math Object)

// console.log(Math.random()); // Gives random number between 0 n 1
// console.log(Math.random() * 6); // Gives us random numbers between 0 and 5

// dice = (Math.floor(Math.random() * 6) + 1);
// console.log(dice);

// SELECTING ELEMENTS FROM HTML FILE

//document.querySelector(`#current-${currentPlayer}`).innerHTML = `<em>${dice}</em>`; // innerHTMl allows us to use HTML tags as strings.


//document.querySelector(`#current-${currentPlayer}`).textContent = dice;

// let select = document.querySelector('#score-0').textContent; // Storing value inside a variable.
// console.log(select);

// ADDING EVENT LISTENERS (onclick, etc)
let rollDice = document.querySelector('.btn-roll');
rollDice.addEventListener('click', myFunction); // Since we call a function like this --> 'button()' therefore we dont put the parentheses in the addEventListener function!


// Getting winning score from HTML
let winScore = document.querySelector('#numb');
let butnSelect = document.querySelector('#butn');
butnSelect.addEventListener('click', function () {
    if (winScore.value === "") {
        alert("Please enter a value for Winning Score!");
    }
    else {
        alert(`Players will win when the score reaches ${winScore.value}!`);
    }

});

function myFunction() {
    // rollDice.style.backgroundColor = 'yellow';
    // rollDice.style.fontWeight = 'bold';
    if (playingGame) // default condition of playingGame is set to true
    {
        // 1.Random number
        //let dice = document.querySelector(`#current-${currentPlayer}`).textContent;
        let dice = (Math.floor(Math.random() * 6) + 1);
        let dice2 = (Math.floor(Math.random() * 6) + 1);


        console.log(dice);
        console.log(dice2);

        //2. Display the result
        let randomDice = document.querySelector(`.dice`); // Selecting class of dice image from HTML
        let randomDice2 = document.querySelector(`.dice2`);
        randomDice.style.display = 'block'; // Displaying the dice after button is clicked.
        randomDice2.style.display = 'block';
        randomDice.src = `./images/dice-${dice}.png`; // Since dice prints number from 1-6, we implement it inside an img src to print different values each time.
        randomDice2.src = `./images/dice-${dice2}.png`;

        //3. Update the round score (only if the rolled number was > 1)
        //dice !== 1 ? 


        let specificPlayer = document.querySelector(`#current-${currentPlayer}`);
        if (dice !== 1 && dice2 !== 1) // If this is OR, it means if one of the dices rolls 1...keep adding the values. BUT WE NEED TO STOP ADDING VALUES WHEN 1 DICE ROLLS 1 (USE "AND")
        {
            // Add to total player score
            //let newDice = dice2;
            roundScore += dice + dice2;
            specificPlayer.textContent = roundScore;
        }
        else if (dice === 1 || dice2 === 1) {
            console.log(`Dice 1: ${dice}`);
            console.log(`Dice 2: ${dice2}`);
            // Next player turn
            if (currentPlayer === 0) // If the player rolling is 0
            {
                alert("Player 1 has Rolled a 1!\n\nIt's Player 2's turn!");
                roundScore = 0; // Reset score to be added
                specificPlayer.textContent = roundScore; // Since 1 is rolled, now the score of the current player goes back to 0...
                document.querySelector(`.player-0-panel`).classList.remove("active"); // Adds active which is defined in css.
                document.querySelector(`.player-1-panel`).classList.add("active"); // Adds active which is defined in css.
                currentPlayer = 1; // Change the player to 1
    
            }
            else if (currentPlayer === 1) // If the player rolling is 1...
            {
                /* document.querySelector('.dice').style.display = 'none'; (WE CAN USE THIS TO REMOVE THE DICE AFTER 1 PLAYER LOOSES) */
                alert("Player 2 has Rolled a 1!\n\nIt's Player 1's turn!");

                roundScore = 0; // If this line is not entered, then the same score from player 0 will be used for player 1. (THEREFORE WE NEED TO RESET THE SCORES)
                specificPlayer.textContent = roundScore;
                document.querySelector(`.player-1-panel`).classList.remove("active");
                document.querySelector(`.player-0-panel`).classList.add("active");
                currentPlayer = 0; // Change player to 0
            }


            /* SHORTER: currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0 */

        }

    }

}

let holdDice = document.querySelector('.btn-hold');
holdDice.addEventListener('click', diceHolder);

function diceHolder() {
    // holdDice.style.backgroundColor = 'yellow';
    // holdDice.style.fontWeight = 'bold';

    if (playingGame) {
        // ADDING CURRENT SCORE TO GLOBAL SCORE
        scores[currentPlayer] += roundScore; // Adds numbers 1-6 into the scores[0] value.
        document.querySelector(`#score-${currentPlayer}`).textContent = scores[currentPlayer]; // Changing text content of global variable to the total added values.

        if (scores[currentPlayer] >= winScore.value) {
            alert(`Player ${currentPlayer + 1} has won!`);
            const winner = document.querySelector(`#name-${currentPlayer}`);
            winner.textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            //winner.style.textDecoration = 'italic';
            winner.style.color = 'red';
            playingGame = false;
            //BEST WAY TO EDIT CSS IN JS
            // document.querySelectorAll(`.player-${currentPlayer}-panel`).classList.toggle('winner');
            // document.querySelector(`.player-${currentPlayer}-panel`).classList.toggle('active');
            document.querySelector(`.player-${currentPlayer}-panel`).style.backgroundColor = '#66ff60';
        }
        else {
            // CHANGE USER TURN AFTER USER 0 HAS PRESSED HOLD
            if (currentPlayer === 0) {
                roundScore = 0;
                document.querySelector(`#current-${currentPlayer}`).textContent = roundScore;
                document.querySelector(`.player-0-panel`).classList.remove("active"); // Adds active which is defined in css.
                document.querySelector(`.player-1-panel`).classList.add("active"); // Adds active which is defined in css.
                currentPlayer = 1;
                //document.querySelector(`#name-0`).style.fontWeight = "";
            }
            else if (currentPlayer === 1) {
                roundScore = 0;
                document.querySelector(`#current-${currentPlayer}`).textContent = roundScore;
                document.querySelector(`.player-1-panel`).classList.remove("active"); // Adds active which is defined in css.
                document.querySelector(`.player-0-panel`).classList.add("active"); // Adds active which is defined in css.
                currentPlayer = 0;
                // document.querySelector(`#name-${currentPlayer}`).style.fontWeight = "";
            }
        }
    }
}





// DRY(DONT REPEAT YOURSELF) METHOD
function playerInfo() {

    if (currentPlayer === 0) // If the player rolling is 0
    {
        alert("Player 1 has Rolled a 1!\n\nPlayer 1 has been reset.");
        alert("Player 2: Press enter to begin!");
        roundScore = 0; // Reset score to be added
        specificPlayer.textContent = roundScore; // Since 1 is rolled, now the score of the current player goes back to 0...
        document.querySelector(`.player-0-panel`).classList.remove("active"); // Adds active which is defined in css.
        document.querySelector(`.player-1-panel`).classList.add("active"); // Adds active which is defined in css.
        currentPlayer = 1; // Change the player to 1
    }
    else if (currentPlayer === 1) // If the player rolling is 1...
    {
        /* document.querySelector('.dice').style.display = 'none'; (WE CAN USE THIS TO REMOVE THE DICE AFTER 1 PLAYER LOOSES) */
        alert("Player 2 has Rolled a 1!\n\nPlayer 2 has been reset.");
        alert("Player 1: Press enter to begin!");

        roundScore = 0; // If this line is not entered, then the same score from player 0 will be used for player 1. (THEREFORE WE NEED TO RESET THE SCORES)
        specificPlayer.textContent = roundScore;
        document.querySelector(`.player-1-panel`).classList.remove("active");
        document.querySelector(`.player-0-panel`).classList.add("active");
        currentPlayer = 0; // Change player to 0
    }

    /* SHORTER: currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0 */
}




function initialize() {
    // USE LET AND CONST SUHAIB!
    // CHANGING CSS USING DOM
    //SETTING CURRENT AND ACTIVE VALUES TO 0.
    scores = [0, 0];
    roundScore = 0;
    playingGame = true;

    document.querySelector('#score-0').style.color = 'white';
    document.querySelector('#score-0').style.backgroundColor = 'red';
    document.querySelector('#score-0').innerHTML = 0;


    document.querySelector('#score-1').style.color = 'white';
    document.querySelector('#score-1').style.backgroundColor = 'red';
    document.querySelector('#score-1').innerHTML = 0;

    // FOR CURRENT VALUES
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    let imeg = document.querySelector('.dice');
    imeg.style.display = 'none'; // STYLE COMES FIRST ALL THE TIME!

    let imeg2 = document.querySelector(`.dice2`);
    imeg2.style.display = 'none';
}

function init() {

    let choose = prompt(`Do you want to play again?\n\nPress 'Y = YES' or 'N = NO'`);
    switch (choose) {
        case 'Y':
            initialize();
            document.querySelector(`.player-${currentPlayer}-panel`).classList.add("active");
            document.querySelector(`.player-0-panel`).style.backgroundColor = '';
            document.querySelector(`.player-1-panel`).style.backgroundColor = '';
            document.querySelector('#score-1').innerHTML = 0;
            document.querySelector('#score-0').innerHTML = 0;
            document.querySelector('#current-0').textContent = '0';
            document.querySelector('#current-1').textContent = '0';
            var playr = document.querySelector(`#name-${currentPlayer}`);
            document.querySelector(`.player-${currentPlayer}-panel`).style.backgroundColor = '';
            playr.textContent = `Player ${currentPlayer + 1}`;
            playr.style.color = "";
            rollDice.style.backgroundColor = "";
            rollDice.style.fontWeight = "";
            holdDice.style.backgroundColor = '';
            holdDice.style.fontWeight = '';
        case 'N':
            break;
        default: alert("Please choose valid option!");
            break;
    }
    console.log(currentPlayer);
}


document.querySelector('.btn-new').addEventListener('click', init);