
const speed = 150;
var m;
var wordsArray = $("#p-viewer").text().split(" ");

function byWord() {
    var index = 0;
    const wordInterval = window.setInterval(function(){
        word = wordsArray[index];
        $("#h1-viewer").text(word);
        if(index < wordsArray.length-1) {
            index++;
        } else {
            index = 0;
        }
    }, speed);
}

byWord();


