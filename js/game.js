const numDivs = 36;
const maxHits = 10;
const maxMisses = 10;

let hits = 0;
let misses = 0;
let firstHitTime = 0;
let totalPlayedScore = 0;

function round() {
  //OK FIXME: надо бы убрать "target" прежде чем искать новый
  let divSelector = randomDivId();
  if ($(divSelector).hasClass("miss")) {
  $(divSelector).removeClass("miss");
  }
  $("target").removeClass("miss");
  $(divSelector).addClass("target");
  // OK TODO: помечать target текущим номером
  $(divSelector).text(hits+1);
  // OK - чекай init() FIXME: тут надо определять при первом клике firstHitTime
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  //OK FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  if (misses < 10) {
  totalPlayedScore = hits - misses;
  }
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-score-played").text(totalPlayedScore);
  $("#win-message").addClass("d-block");
  $(".col").addClass("d-none");
}

function handleClick(event) {
  //OK FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(event.target).text(null);
  if ($(event.target).hasClass("target")) {
    $(this).removeClass("target miss");
    $(".col").removeClass("miss");
    hits = hits + 1;
    round();
  }
  else {
    $(".col").removeClass("target");
    $(".col").text(null);
    $(event.target).addClass("miss");
   //(this).addClass("miss");
    $("target").text(hits);
    misses = misses + 1;
    round();
  }

  //OK TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  //OK TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
  firstHitTime = getTimestamp();
  round();
  $(".game-field").click(handleClick);
  $("#button-start").addClass('d-none')
  })
  $("#button-reload").click(function() {
    location.reload();
  });
}


$(document).ready(init);
