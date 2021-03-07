var isSigned;
if($("#is-signed").text() === "signed") {
    isSigned = true;
} else {
    isSigned = false;
}
////////////////////////       Page Header        //////////////////////////

var title = "I bet your eyes won't even catch it";
var titleWords = title.split(" ");
var i=0;
var before="", middle="", after="";
const interval = window.setInterval(function() {
    for(var j=0; j<i; j++){
        before += titleWords[j] + " ";
    }
    middle = titleWords[i];
    for(var k=i+1; k<titleWords.length; k++){
        after += titleWords[k] + " ";
    }
    
    $("#title-before").text(before);
    $("#title-middle").text(middle);
    $("#title-after").text(after);

    before = ""; 
    middle = ""; 
    after  = "";

    if(i < titleWords.length-1) {
        i++;
    } else {
        clearInterval(interval);
        $("#title-before").text("");
        $("#title-middle").text(title);
        $("#title-after").text("");
    } 
}, 150);
////////////////////////       Words        ///////////////////////////
const sentences = [
    {
        index: 0,
        text: 'Will you show me your photo album?'
        },
        {
        index: 1,
        text: 'She greets him every morning as he enters the school building.'
        },
        {
        index: 2,
        text: 'She surprised him with a small gift.'
        },
        {
        index: 3,
        text: 'I seem to have a temperature.'
        },
        {
        index: 4,
        text: 'No. This is my first time. How does it taste?'
        },
        {
        index: 5,
        text: 'Maybe he won\'t become famous.'
        },
        {
        index: 6,
        text: 'Tom never fails to send a birthday present to his father.'
        },
        {
        index: 7,
        text: 'How many people?'
        },
        {
        index: 8,
        text: 'She found him a seat.'
        },
        {
        index: 9,
        text: 'I disagree with you.'
        },
        {
        index: 10,
        text: 'How do I get to Gate 33?'
        },
        {
        index: 11,
        text: 'I believe you.'
        },
        {
        index: 12,
        text: 'She threw him out.'
        },
        {
        index: 13,
        text: 'I am thinking about my children.'
        },
        {
        index: 14,
        text: 'It\'s a cloudy day.'
        },
        {
        index: 15,
        text: 'Are you an only child?'
        },
        {
        index: 16,
        text: 'Eat whatever food you like.'
        },
        {
        index: 17,
        text: 'The audience clapped when the concert was over'
        },
        {
        index: 18,
        text: 'It was a terrible affair.'
        },
        {
        index: 19,
        text: 'I don\'t want to wait that long.'
        },
        {
        index: 20,
        text: 'That boy is smart.'
        },
        {
        index: 21,
        text: 'I can\'t figure out how to delete what I just posted.'
        },
        {
        index: 22,
        text: '4 days. I\'m going back on Friday.'
        },
        {
        index: 23,
        text: 'Many friends came to see me off.'
        },
        {
        index: 24,
        text: 'Do you feel like eating?'
        },
        {
        index: 25,
        text: 'Would you mind sending this letter for me?'
        },
        {
        index: 26,
        text: 'Are you seriously thinking about eating all that?'
        }     
];
var points = Number($("#user-points").text());
var sentence = "";
////////////////////////       Start        //////////////////////////
const speed = 200;
var running = false;
$("#btn-start").click(start);
function start() {
    $("#game-before").text(".");
    if(!running){
        running = true;
        sentence = getRandomSentence();
        if($('#btn-word').is(':checked')) {
            byWord(sentence);
        } else if($('#btn-lights').is(':checked')) {
            byLights(sentence);
        } else if($('#btn-reviel').is(':checked')) {
            byReviel(sentence);
        }
    }
}
function byWord(sentence) {
    var n = 0;
    var index = 0;
    const wordInterval = window.setInterval(function(){
        var wordsArray = sentence.split(" ");
        var m= wordsArray[index];
        $("#game-middle").text(m);
        if(index < wordsArray.length) {
            index++;
        } else {
            index = 0;
            if(n < 3){
                n++;
            } else {
                $("#game-before").text("...");
                $("#game-middle").text("");
                clearInterval(wordInterval);
                running = false;
            }
        }
    }, speed);
}
function byLights(sentence) {
    var n = 0;
    var index = 0;
    const wordInterval = window.setInterval(function(){
        var wordsArray = sentence.split(" ");
        var b="", m="", a="";
        for(var j=0; j<index; j++){
            b += wordsArray[j] + " ";
        }
        m = wordsArray[index];
        for(var k=index+1; k<wordsArray.length; k++){
            a += wordsArray[k] + " ";
        }
        $("#game-before").text(b);
        $("#game-middle").text(m);
        $("#game-after").text(a);

        if(index < wordsArray.length-1) {
            index++;
        } else {
            index = 0;
            if(n < 3){
                n++;
            } else {
                $("#game-before").text("...");
                $("#game-middle").text("");
                $("#game-after").text("");
                clearInterval(wordInterval);
                running = false;
            }
        }
    }, speed);
}
function byReviel(sentence) {
    var n = 0;
    var index = 0;
    var m = "";
    const wordInterval = window.setInterval(function(){
        var wordsArray = sentence.split(" ");
        
        m += wordsArray[index] + " ";

        $("#game-middle").text(m);

        if(index < wordsArray.length-1) {
            index++;
        } else {
            index = 0;
            m = "";
            if(n < 3){
                n++;
            } else {
                $("#game-before").text("...");
                $("#game-middle").text("");
                clearInterval(wordInterval);
                running = false;
            }
        }
    }, speed*0.5);
}
$("#btn-check").click(checkAnswer);
document.querySelector("#text-area-answer").addEventListener("keyup",
    event => {
        if(event.key !== "Enter") return;
        checkAnswer();
        event.preventDefault();
    }
);
function checkAnswer() {
    const sim = similarity($("#text-area-answer").val(), sentence) * 100;
    if(sim > 70) {
        answerCorrect(sim);
    }else {
        $("#h2-result").css("background-color", "#d9534f");
    }
    $("#h2-result").css("color", "white");
    $("#h2-result").text("Result: "+ sim.toFixed(1) +"%");
}
function answerCorrect(sim){
    $("#h2-result").css("background-color", "#5cb85c");
    points = Number(points) + Number(sim.toFixed(1));
    points = points.toFixed(1);
    $("#user-points").text(points);
    if(isSigned) postPointsToServer(points);
    getRandomSentence();
    countDownAndNext(3);
}
function similarity(s1, s2) {
    var longer, shorter;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    } else {
        longer = s1;
        shorter = s2;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
function postPointsToServer(points){
    $.ajax({
        url: "game/"+points,
        type: "POST",
        contentType: "application/json",
        success: function(data){}
    });
}
function countDownAndNext(time){
    const interval = window.setInterval(function(){
        $("#text-area-answer").val("");
        $("#btn-check").html(time);
        if(time==1){
            clearInterval(interval);
            $("#btn-check").html("check");
            start();
        }else{
            time--;
        }
    }, 700);
}
function getRandomSentence(){
    const r = Math.floor(Math.random()*(sentences.length-1)); 
    return sentences[r].text;
}
