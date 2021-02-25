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
        clearInterval(clearInterval);
        $("#title-before").text("");
        $("#title-middle").text(title);
        $("#title-after").text("");
    } 
}, 150);

////////////////////////                     //////////////////////////

