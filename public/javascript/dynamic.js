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
const gameSentences = [
    "I bet you won't even catch it.",
    "Hello you, how have you been these days?",
    "Never gonna give you up, never gonna let you down."
];
var sentenceIndex = 0;
////////////////////////       Start        //////////////////////////
const speed = 150;
var running = false;
$("#btn-start").click(function() {
    $("#game-before").text("");
    running = true;
    if(running){
        if($('#btn-word').is(':checked')) {
            byWord();
        } else if($('#btn-lights').is(':checked')) {
            byLights();
        } else if($('#btn-reviel').is(':checked')) {
            byReviel();
        }
    }
});
function byWord() {
    var n = 0;
    var index = 0;
    const wordInterval = window.setInterval(function(){
        const sentence = gameSentences[sentenceIndex];
        var wordsArray = sentence.split(" ");
        var m="";
        m = wordsArray[index];
        
        $("#game-middle").text(m);

        if(index < wordsArray.length-1) {
            index++;
        } else {
            index = 0;
            if(n < 2){
                n++;
            } else {
                $("#game-before").text("...");
                $("#game-middle").text("");
                clearInterval(wordInterval);
            }
        }
    }, speed);
}
function byLights() {
    var n = 0;
    var index = 0;
    const wordInterval = window.setInterval(function(){
        const sentence = gameSentences[sentenceIndex];
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
            if(n < 2){
                n++;
            } else {
                $("#game-before").text("...");
                $("#game-middle").text("");
                $("#game-after").text("");
                clearInterval(wordInterval);
            }
        }
    }, speed);
}
function byReviel() {
    var n = 0;
    var index = 0;
    var m = "";
    const wordInterval = window.setInterval(function(){
        const sentence = gameSentences[sentenceIndex];
        var wordsArray = sentence.split(" ");
        
        m += wordsArray[index] + " ";

        $("#game-middle").text(m);

        if(index < wordsArray.length-1) {
            index++;
        } else {
            index = 0;
            m = "";
            if(n < 2){
                n++;
            } else {
                $("#game-before").text("...");
                $("#game-middle").text("");
                clearInterval(wordInterval);
            }
        }
    }, speed*0.5);
}
$("#btn-check").click(function() {
    const sim = similarity(
        $("#text-area-answer").val(), gameSentences[sentenceIndex]) * 100;
    if(sim > 70) {
        $("#h2-result").css("background-color", "green");
    }else {
        $("#h2-result").css("background-color", "red");
    }
    $("#h2-result").css("color", "white");
    $("#h2-result").text("Result: "+ sim.toFixed(1) +"%");
});
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
