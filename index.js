let deckId
let yourScoreCount = 0
let computerScoreCount = 0

const newDeckBtn = document.getElementById("new-deck")
const drawBtn = document.getElementById("draw")
const cardsDiv = document.getElementById("cards")
const cardSlots = document.getElementById("card-slots")
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining-cards")
const yourScoreEl = document.getElementById("your-score")
const computerScoreEl = document.getElementById("computer-score")


newDeckBtn.addEventListener("click", handleClick)
drawBtn.addEventListener("click", drawNewCards)

async function handleClick(){
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await response.json()
    remainingCards.textContent=`Remaining cards:"${data.remaining}"`
    deckId = data.deck_id
    console.log(deckId)
    
    
}

async function drawNewCards () {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    console.log(data)
    cardsDiv.children[0].innerHTML=` <img src = "${data.cards[0].image}" class="card"/> `
    cardsDiv.children[1].innerHTML=` <img src = "${data.cards[1].image}" class="card"/> `
    
    const winnerText = determineTheWinner(data.cards[0], data.cards[1])   
    header.textContent = winnerText
    remainingCards.textContent=`Remaining cards:"${data.remaining}"`

    if (data.remaining===0) {
        drawBtn.disabled = true
       if (computerScoreCount>yourScoreCount){
        header.textContent= "Computer won the game!"
       }else if (computerScoreCount<yourScoreCount){
        header.textContent= "You won the game!"
       }else {
        header.textContent= "It's a war!"
       }
}

}




function determineTheWinner (card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {   
        computerScoreCount++
        computerScoreEl.textContent = `Computer score:${computerScoreCount}`
        return "Computer is a winner!"
    } else if (card1ValueIndex < card2ValueIndex) {
        yourScoreCount++
        yourScoreEl.textContent = `Your score:${yourScoreCount}`
        return "You are a winner"
    } else {
        return "It's a tie!"
    }  
  
}
