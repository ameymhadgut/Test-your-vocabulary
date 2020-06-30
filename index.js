
var startMsg = 'Press start to begin';
var gameMsg = 'Enter words below starting with ';
var scoreMsg = 'Your score: ';
var words = [];
var spanElementStart = '<span class="badge badge-pill badge-dark">';
var spanElementEnd = '</span></br>';
var letter;
//var txt;
var score = 0;
var wordlist;


$(document).ready(function() { 
    initMain(0);
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: ""
      };
      firebase.initializeApp(config);
      const db = firebase.database();
      console.log(db);

    $.ajax({
        url: '',
        dataType: "jsonp",
        jsonpCallback: "_getword",
        cache: false,
        timeout: 5000,
        success: function(data) {
            wordlist = data;
            console.log(wordlist);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
});

function getRandomChar() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    result = characters.charAt(Math.floor(Math.random() * charactersLength));
    return result.toLowerCase();
 }

function initMain(mode) {
        $('#letterMsg').html(startMsg);
        $('#gameScreen').hide();
        $('#playAgainButton').hide();
        if(mode == 1) {
            score = 0;
            words.length = 0;
            $('#startButton').show();
            $('#letterMsg').show();
            $('#scoreMsg').hide();
        }
}

function initGame() {
    var score = 0;
    $('#startButton').hide();
    $('#gameScreen').show();
    $('#wordsList').show();
    letter = getRandomChar();
    $('#letterMsg').html(gameMsg+'"'+letter+'"');
    startTimer();
    $('#timer').show();
    console.log(letter);
}

$(document).on("keypress", "input", function(e){
    if(e.which == 13){
        var inputVal = $(this).val();
        onEnterWord(inputVal);
        $(this).val('');
    }
});

function onEnterWord(inputVal) {
    words.push(inputVal);
    showWords(inputVal);
    if(inputVal.toLowerCase().startsWith(letter) && wordlist.hasOwnProperty(inputVal.toLowerCase())){
        console.log('valid');
        score++;
    }
}

function showWords(word) {
    var txt = spanElementStart + word + spanElementEnd;
    $(txt).appendTo('#wordsList');
}

function startTimer() {
    var timer = "30";
    var interval = setInterval(function() {
    var seconds = parseInt(timer, 10);
    --seconds;
    $('.countdown').html(seconds);
    timer = seconds;
    if(seconds == 0) {
        console.log('Timeout Logic here');
        console.log(words);
        clearInterval(interval);
        endGame();
    }
    }, 1000);
}

function endGame() {
    $('#gameScreen').val(''); 
    $('#gameScreen').hide();
    $('#letterMsg').hide();
    $('#timer').hide();
    $('#wordsList').hide();
    $('#wordsList').empty();
    $('#scoreMsg').html(scoreMsg+score);
    $('#scoreMsg').show();
    $('#playAgainButton').show();
}