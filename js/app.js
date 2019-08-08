/* this is a function for shuffuling the cards using append child method and 
the fact that when you append a node, it's moved from its old place. */
var ul = document.querySelector('ul');
var shuffle;
 (shuffle = function(){  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[Math.random() * i | 0]);
}
})();


//game timer: the Timer starts after your first try.

var second = 0, minute = 0;
var timer = document.querySelector("#timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML ='<i class="fas fa-stopwatch"></i> ' + minute+"mins : "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


function stopTimer() {
  clearInterval(interval);
}


  // number of moves 
  const stars = document.getElementById('star');
 function removeStar(){
  if (c === 10 || c === 18 || c === 24) {
    stars.removeChild(stars.lastChild);
  }
 }

  const moves = document.getElementById('moves');
  var c = 0;
 


function counter(){
  moves.innerHTML = 'moves: ' + (++c);
  if(c == 1){
    second = 0;
    minute = 0; 
    hour = 0;
    startTimer();
}
  removeStar();
}



/* this is a restart button , it will restart the game including timer and shuffle the card again */
const restart = document.querySelectorAll('.replay');
restart.forEach(function (res) {res.addEventListener("click",function(){
  shuffle();
  removeClasses();
  c = 0;
  matching = 0;
  moves.innerHTML = 'moves: 0 ';
  win.classList.add('wins');
  win.style.display = 'none';
  reward.removeChild(reward.lastChild);
});
});



/* function to set cards backword when restarting using remove classes method */
function removeClasses() {

    for (var i = 0; i < cards.length; i++) {
          cards[i].classList.remove('flip','matched','transformation');
          openedCards.length = 0;
          stars.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star">'
          second = 0;
           minute = 0;
           hour = 0;
           timer.innerHTML = '<i class="fas fa-stopwatch"></i> ' + minute+"mins : "+second+"secs";
           stopTimer();
    }

  }







// an event listening for all the cards
const cards = document.querySelectorAll(".card");
cards.forEach(function (card){card.addEventListener("click",flipcard);});


// flipping cards and setting game rules
const correct = new Audio();
 correct.src = "/sounds/matched.mp3"
 correct.volume = 0.2;
var openedCards = [];

function flipcard() {
  var len = openedCards.length;
  openedCards.push(this);          
  if (len < 2) { 
  this.classList.add('transformation');
  setTimeout(function(_this){ _this.classList.add('flip');},300,this); 
}
   if(len = 2){

      if(openedCards[0].innerHTML === openedCards[1].innerHTML){
          setTimeout(matched,300);
          correct.play();
          counter();


      } else {
         setTimeout(unmatched,700);
         counter();

      }
  } 

};


var matching = 0;
const win = document.getElementById('win');
const reward = document.getElementById('rewards');

function  matched(){
  openedCards[0].classList.add('matched');
  openedCards[1].classList.add('matched');
  openedCards.length = 0;

  matching = matching + 1;
  if (matching > 7 ){
    win.style.display = "block";
    stopTimer();
    reward.append('you Won! with ' + c + ' moves in ' + minute+" mins:"+second+" secs and you got " + stars.childElementCount + " out of 3 stars"  );

  }
  
}


// a function for when the two revealed cards don't match
function unmatched(){
  openedCards[0].classList.remove('flip','transformation');
  openedCards[1].classList.remove('flip','transformation');
  openedCards.length = 0;
}

