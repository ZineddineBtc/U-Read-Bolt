$("#checkbox-dark-mode").change(function() {
    if (this.checked) {
        $("#div-viewer").css("background-color", "#212529");
        $("#h1-viewer").css("color", "#fff");
    } else {
        $("#div-viewer").css("background-color", "#fff");
        $("#h1-viewer").css("color", "#212529");
    }
});

let speed = 1000 / $("#input-speed").val();
function adjustSpeed(event) {
    let v = $("#input-speed").val();
    if(event.data.action === "increase"){
        v++;
    } else if (event.data.action === "decrease"){
        if(v == 0) return;
        v--;
    }
    $("#input-speed").val(v);
    speed = 1000 / $("#input-speed").val();
}
$("#btn-increase-speed").click({action: "increase"}, adjustSpeed);
$("#btn-decrease-speed").click({action: "decrease"}, adjustSpeed);

let word;
let text = $("#p-viewer").text().replace(/(\r\n|\n|\r)/gm, "");
let wordsArray = text.split(" ");
var wordInterval;
var index = 0;
function byWord() {
    if(!running) return;
    wordInterval = window.setInterval(function(){
        word = wordsArray[index];
        $("#h1-viewer").text(word);
        if(word[word.length-1] == "."){
            clearInterval(wordInterval);
            setTimeout(byWord, 2*speed);
        } else if(word[word.length-1] == "," || 
                  word[word.length-1] == ";" ||
                  word[word.length-1] == ":" ) {
            clearInterval(wordInterval);
            setTimeout(byWord, speed);
        }
        if(index < wordsArray.length-1) {
            index++;
        } else {
            index = 0;
        }
    }, speed);
}

let running = false;
const inputIDs = ["btn-decrease-speed", "btn-increase-speed", "input-speed", "input-page"];
function disableInputs(disabled){
    inputIDs.forEach(function(id){
        $("#"+id).attr("disabled", disabled);
    });
}
$("#btn-start-viewer").click(function(){
    clearInterval(wordInterval);
    if(running) {
        running = !running;
        $(this).removeClass("btn-danger").addClass("btn-dark").html("START");
        disableInputs(false);
    } else {
        running = !running;
        $(this).removeClass("btn-dark").addClass("btn-danger").html("STOP");
        disableInputs(true);
        byWord();
    }
});



