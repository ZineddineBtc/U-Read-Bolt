
$("#checkbox-dark-mode").change(function() {
    if (this.checked) {
        $(".bgc-dark-mode").css("background-color", "#212529");
        $(".color-dark-mode").css("color", "#fff");
        $(".btn-outline-dark-mode").removeClass("btn-outline-dark")
                                   .addClass("btn-outline-light");
        $("#btn-start-viewer").removeClass("btn-dark")
                              .addClass("btn-light");
        $("#div-viewer").css("border-color", "#fff");
        $(".h1-dark-mode").css("visibility", "visible");
    } else {
        $(".bgc-dark-mode").css("background-color", "#fff");
        $(".color-dark-mode").css("color", "#000");
        $(".btn-outline-dark-mode").removeClass("btn-outline-light")
                                   .addClass("btn-outline-dark");
        $("#btn-start-viewer").removeClass("btn-light")
                              .addClass("btn-dark");
        $("#div-viewer").css("border-color", "#212529");
        $(".h1-dark-mode").css("visibility", "hidden");
    }
});
let inputSpeed = $("#input-speed").val();
$("#span-btn-go-back-words").html(" "+inputSpeed +" Words Back");
let speed = 1000 / inputSpeed;
function adjustSpeed(event) {
    let v = $("#input-speed").val();
    if(event.data.action === "increase") {
        v++;
    } else if (event.data.action === "decrease") {
        if(v == 1) return;
        v--;
    } else if (event.data.action === "adjust") {
        if($("#input-speed").val() < 1) v = 1;
    }
    $("#input-speed").val(v);
    inputSpeed = v;
    $("#span-btn-go-back-words").html(" "+inputSpeed +" Words Back");
    speed = 1000 / inputSpeed;
}
$("#btn-increase-speed").click({action: "increase"}, adjustSpeed);
$("#btn-decrease-speed").click({action: "decrease"}, adjustSpeed);
$("#input-speed").on("input", {action: "adjust"}, adjustSpeed);

let text = $("#p-viewer").text().replace(/(\r\n|\n|\r)/gm, "");
let pageArray = text.split(/(----------------Page \(\d\) Break----------------)/);
let index = 0, pageIndex = 0, wordInterval, word;
function byWord() {
    if(!running) return;
    wordInterval = window.setInterval(function(){
        wordsArray = pageArray[pageIndex].split(" ");
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
            const totalPages = (pageArray.length/2)-1;
            let p = $("#input-page").val();
            if(pageIndex < totalPages){
                pageIndex += 2;
                p++;
            } else {
                pageIndex = 0;
                p = 1;
            }
            $("#input-page").val(p);
            clearInterval(wordInterval);
            setTimeout(byWord, 4*speed);
        }
    }, speed);
}

let running = false;
const inputIDs = ["btn-decrease-speed", "btn-increase-speed", "input-speed", "input-page", "btn-word-viewer", "btn-lights-viewer", "btn-reviel-viewer"];
function disableInputs(disabled){
    inputIDs.forEach(function(id){
        $("#"+id).attr("disabled", disabled);
    });
}
$("#btn-start-viewer").click(startStop);
function startStop() {
    clearInterval(wordInterval);
    let darkOrLightClass;
    if($("#checkbox-dark-mode").checked) {
        darkOrLightClass = "btn-dark";
    } else {
        darkOrLightClass = "btn-light";
    }   
    if(running) {
        running = !running;
        $("#btn-start-viewer").removeClass("btn-danger").addClass(darkOrLightClass).html("START");                 
        disableInputs(false);
    } else {
        running = !running;
        $("#btn-start-viewer").removeClass(darkOrLightClass).addClass("btn-danger").html("STOP");
        disableInputs(true);
        byWord();
    }
}

$("#btn-go-back-words").click(function() {
    if(running) startStop();
    index -= inputSpeed;
    if(index < 0) {
        pageIndex -= 2;
        if(pageIndex < 0){
            pageIndex = 0;
        } 
        const pageWords = pageArray[pageIndex].split(" ");
        index = pageWords.length + index;
        if(pageIndex == 0){
            index = 0;
        }
        let p = (pageIndex/2) + 1;
        $("#input-page").val(p);
    }
});

$("#btn-go-to-page-beginning").click(function() {
    if(running) startStop();
    index = 0;
});

$("#input-page").on("input", function() {
    index = 0;
    let p;
    if($(this).val() < 1) {
        pageIndex = 0;
        p = 1;
    } else if($(this).val() >= pageArray.length) {
        pageIndex = pageArray.length - 1;
        p = pageArray.length;
    } else {
        p = $(this).val();
        pageIndex = p*2 - 2;
    }
    $(this).val(p);
});
