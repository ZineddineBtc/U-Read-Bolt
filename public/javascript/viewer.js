
///////////////////////////// Dark Mode //////////////////////////////////
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

///////////////////////////// Speed Adjustment //////////////////////////
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

///////////////////////////// Reading Functions /////////////////////////
let text = $("#p-viewer").text().replace(/(\r\n|\n|\r)/gm, "");
let pageArray = text.split(/(----------------Page \(\d\) Break----------------)/);
let index = 0, sentenceIndex = 0, sentenceWordIndex = 0,
    pageIndex = 0, wordInterval, word;
let lastChecked = "word";
function byWord() {
    if(!running) return;
    if(lastChecked !== "word") index = 0;
    lastChecked = "word";
    wordInterval = window.setInterval(function(){
        wordsArray = pageArray[pageIndex].split(" ");
        word = wordsArray[index];
        $("#span-middle").text(word);
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
function byLights() {
    if(!running) return;
    if(lastChecked !== "lights"){ 
        sentenceIndex = 0; 
        sentenceWordIndex = 0;
        $("#span-middle").text(" ");
    }
    lastChecked = "lights";
    wordInterval = window.setInterval(function(){
        var page = pageArray[pageIndex];
        var sentencesArray = page.split(".");
        var sentence = sentencesArray[sentenceIndex];
        var wordsArray = sentence.split(" ");
        wordsArray[wordsArray.length-1] += ".";
        
        var b="", m="", a="";
        for(var j=0; j<sentenceWordIndex; j++){
            b += wordsArray[j] + " ";
        }
        m = wordsArray[sentenceWordIndex];
        for(var k=sentenceWordIndex+1; k<wordsArray.length; k++){
            a += wordsArray[k] + " ";
        }
        $("#span-before").text(b);
        $("#span-middle").text(m);
        $("#span-after").text(a);
        
        if(sentenceWordIndex < wordsArray.length-1){
            sentenceWordIndex++;
        } else {
            sentenceWordIndex = 0;
            if(sentenceIndex < sentencesArray.length-1){
                sentenceIndex++;
            } else {
                sentenceIndex = 0;
                const totalPages = (pageArray.length/2)-1;
                let p = $("#input-page").val();
                if(pageIndex < totalPages){
                    pageIndex += 2;
                    p++;
                } else {
                    pageIndex = 0;
                    p = 1;
                    $("#input-page").val(p);
                    clearInterval(wordInterval);
                    setTimeout(byLights, 3*speed);
                }
                $("#input-page").val(p);
                clearInterval(wordInterval);
                setTimeout(byLights, 2*speed);
            }
        }
        clearInterval(wordInterval);
        setTimeout(byLights, speed);
    }, speed);
}
function byReviel() {
    if(!running) return;
    if(lastChecked !== "reviel"){ 
        sentenceIndex = 0; 
        sentenceWordIndex = 0;
        $("#span-middle").text(" ");
    }
    lastChecked = "reviel";
    var m = "";
    wordInterval = window.setInterval(function(){
        var page = pageArray[pageIndex];
        var sentencesArray = page.split(".");
        var sentence = sentencesArray[sentenceIndex];
        var wordsArray = sentence.split(" ");
        wordsArray[wordsArray.length-1] += ".";

        console.log("pageIndex: "+ pageIndex);
        console.log("sentenceIndex: "+ sentenceIndex);
        console.log("sentenceWordIndex: " + sentenceWordIndex);

        m += wordsArray[sentenceWordIndex] + " ";
        console.log("m: "+m);

        $("#span-before").text("");
        $("#span-middle").text(m);
        $("#span-after").text("");
        
        if(sentenceWordIndex < wordsArray.length-1){
            sentenceWordIndex++;
        } else {
            clearInterval(wordInterval);
            sentenceWordIndex = 0;
            m = "";
            if(sentenceIndex < sentencesArray.length-1){
                sentenceIndex++;
                clearInterval(wordInterval);
                setTimeout(byReviel, 2*speed);
            } else {
                sentenceIndex = 0;
                const totalPages = (pageArray.length/2)-1;
                let p = $("#input-page").val();
                if(pageIndex < totalPages){
                    pageIndex += 2;
                    p++;
                } else {
                    pageIndex = 0;
                    p = 1;
                    $("#input-page").val(p);
                    clearInterval(wordInterval);
                }
                $("#input-page").val(p);
                setTimeout(byReviel, 2*speed);
            }
        }
    }, speed);
}

/////////////////////////////// Run | Stop /////////////////////////////////
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
        playCheckedType();
    }
}
function playCheckedType(){
    if($('#btn-word-viewer').is(':checked')) {
        byWord();
    } else if($('#btn-lights-viewer').is(':checked')) {
        byLights();
    } else if($('#btn-reviel-viewer').is(':checked')) {
        byReviel();
    }
}

///////////////////////////// Go-back Functions //////////////////////////////
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
