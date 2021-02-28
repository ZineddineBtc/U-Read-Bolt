
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

$("#checkbox-dark-mode").change(function(){
    if (this.checked) {
        $("#div-viewer").css("background-color", "#212529");
        $("#h1-viewer").css("color", "#fff");
    } else {
        $("#div-viewer").css("background-color", "#fff");
        $("#h1-viewer").css("color", "#212529");
    }
});


