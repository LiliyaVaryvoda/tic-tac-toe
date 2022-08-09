window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerTurnSection = document.querySelector('.display')
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const winnerPlayer = document.querySelector('.winnerPlayer');

    let playingBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    const winningPossibilities = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResult() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningPossibilities[i];
            const a = playingBoard[winCondition[0]];
            const b = playingBoard[winCondition[1]];
            const c = playingBoard[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!playingBoard.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                winnerPlayer.innerHTML = 'Player <span class="playerO">O</span> Won';

                playerTurnSection.innerHTML = ""

                break;
            case PLAYERX_WON:
                winnerPlayer.innerHTML = 'Player <span class="playerX">X</span> Won';

                playerTurnSection.innerHTML = ""

                break;
            case TIE:
                winnerPlayer.innerText = 'Tie';
                playerTurnSection.innerHTML = ""
        }
        winnerPlayer.classList.remove('hide');
    };

    const checkTileAvaliability = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };


    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const updateBoard =  (index) => {
        playingBoard[index] = currentPlayer;
    }

    const userStep = (tile, index) => {
        if(checkTileAvaliability(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResult();
            changePlayer();
        }
    }
    
    const resetPlay = () => {
        playingBoard = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        winnerPlayer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userStep(tile, index));
    });

    resetButton.addEventListener('click', resetPlay);
});