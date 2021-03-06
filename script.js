//Function for changing the colors in the Heading

function friendsColors() {
    let colors = ["100096", "840102", "2004F2", "F6F51D", "ED0002", "8568C7", "3AABB3"]
    let randomColor = colors[Math.floor(Math.random()*colors.length)]; 
    return ("#" + randomColor);
}

const letters = document.querySelectorAll('.letter');

setInterval(function() {
    for (let letter of letters) { 
        letter.style.color = friendsColors()
    }},1500);

// Function for flip card on click 
// Create an array of all cards 
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".game-card");
    let numCards = cards.length;
    console.log(numCards);
    let card1 = null;
    let card2 = null;
    let cardsFlipped = 0;
    let currentScore = 0;
    let lowScore = localStorage.getItem("low-score");
  
    if (lowScore) {
      document.getElementById("best-score").innerText = lowScore;
    }
  
    for (let card of cards) {
      card.addEventListener("click", handleCardClick);
    }
  
    let startBtn = document.getElementById("start-button");
    startBtn.addEventListener("click", startGame);
    console.log(startBtn + "game started")
  
    function handleCardClick(e) {
      if (!e.target.classList.contains("front")) return;
  
      let currentCard = e.target.parentElement;
  
      if (!card1 || !card2) {
        if (!currentCard.classList.contains("flipped")) {
          setScore(currentScore + 1);
        }
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
      }
  
      if (card1 && card2) {
        let gif1 = card1.children[1].children[0].src;
        let gif2 = card2.children[1].children[0].src;
  
        if (gif1 === gif2) {
          cardsFlipped += 2;
          card1.removeEventListener("click", handleCardClick);
          card2.removeEventListener("click", handleCardClick);
          card1 = null;
          card2 = null;
        } else {
          setTimeout(function() {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1 = null;
            card2 = null;
          }, 1000);
        }
      }
  
      if (cardsFlipped === numCards) endGame();
    }
  
    function startGame() {
      setScore(0);  
      start.classList.add("playing");
      let indices = [];
      for (let i = 1; i <= numCards / 2; i++) {
        indices.push(i.toString());
      }
      let pairs = shuffle(indices.concat(indices));
  
      for (let i = 0; i < cards.length; i++) {
        let path = "Images/" + pairs[i] + ".png";
        console.log(path);
        cards[i].children[1].children[0].src = path;
      }
    }
  
    function shuffle(array) {
      let arrayCopy = array.slice();
      for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
        // generate a random index between 0 and idx1 (inclusive)
        let idx2 = Math.floor(Math.random() * (idx1 + 1));
  
        // swap elements at idx1 and idx2
        let temp = arrayCopy[idx1];
        arrayCopy[idx1] = arrayCopy[idx2];
        arrayCopy[idx2] = temp;
      }
      return arrayCopy;
    }
  
    function setScore(newScore) {
      currentScore = newScore;
      document.getElementById("current-score").innerText = currentScore;
    }
  
    function endGame() {
      let end = document.getElementById("end");
      let scoreHeader = end.children[1];
      scoreHeader.innerText = "Your score: " + currentScore;
      let lowScore = +localStorage.getItem("low-score") || Infinity;
      if (currentScore < lowScore) {
        scoreHeader.innerText += " - NEW BEST SCORE!!";
        localStorage.setItem("low-score", currentScore);
      }
      document.getElementById("end").classList.add("game-over");
    }
  });
  