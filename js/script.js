const toyButtons = document.getElementsByClassName('toy__button');
const startButton = document.querySelector('.toy__control--red');
const gameOverText = document.querySelector('.game-over');

let playing = false
let gameover = false

let PCMoves = []
let PlayerMoves = []
let round = "PC"

const min = 1
const max = 5

Array.from(toyButtons).forEach(button => {
    button.addEventListener('click', () => {
        if (playing) {
            move(button)
        }
    })
})

const addBright = (id) => {
    document.getElementById(id).classList.add("bright");
}

function removeBright(id){
    document.getElementById(id).classList.remove("bright");
}

startButton.addEventListener('click', () => {
    PCMoves = []
    PlayerMoves = []
    gameOverText.classList.add("hidden");

    if (!playing) {
        playing = true
        const randomButton = Math.floor(Math.random() * (max - min) + min)
        PCMoves.push(randomButton)
        
        setTimeout(() => {
            setTimeout(() => addBright(PCMoves[0]), 100)

            setTimeout(() => removeBright(PCMoves[0]), 1000)
        }, 1000)

        round = "Player"
    }
})

const move = (button) => {
    addBright(button.id)

    setTimeout(() => removeBright(button.id), 1000)

    if (playing && round === "Player") {
        PlayerMoves.push(Number(button.id))
    }

    if (PlayerMoves[PlayerMoves.length - 1] !== PCMoves[PlayerMoves.length - 1]) {
        gameover = true
        gameOverText.classList.remove("hidden");
        playing = false
    } 

    if (PlayerMoves.length === PCMoves.length) {
        round = "PC"

        PlayerMoves = []
    }

    let PCMovesFunc = []

    setTimeout((() => {
        if (round === "PC") {
            const randomButton = Math.floor(Math.random() * (max - min) + min)
            PCMoves.push(randomButton)
    
            PCMovesFunc = PCMoves.map(move => {
                function makeMove(){
                    setTimeout(() => addBright(move), 100)
    
                    setTimeout(() => removeBright(move), 1000)
                }
    
                return makeMove
            })
    
            PCMovesFunc.forEach((func, idx) => {
                setTimeout(func, 1000 * idx)
            }) 
    
            round = "Player"
        }
    }), 1000)
}