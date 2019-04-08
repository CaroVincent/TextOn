//////////////
//conversion//
//////////////

var HexToDecimal = function(HEX) {
    var tmp = 0;
    var power = 0;
    var result = 0;
    var currentDigit = 0;

    for (var i = 0; i < HEX.length; i++) {

        currentDigit = HEX.substring(HEX.length-1-i, HEX.length-i);
        currentDigit = HexCharToDecimal(currentDigit);
        currentDigit = currentDigit * Math.pow(16,power);

        power++;
        result += currentDigit;
    }
    return result;
}

var HexCharToDecimal = function(digit) {
    var arr = { "A" : 10, "B" : 11, "C": 12, "D" : 13, "E" : 14, "F": 15 };

    if(digit<10){
        return parseInt(digit);
    }else{
        return arr[digit];
    }
}

var HEXtoRGB = function(HEX) {
    var RED = HEX.substring(0,2);
    var GREEN = HEX.substring(2,4);
    var BLUE = HEX.substring(4,6);

    RED = HexToDecimal(RED);
    GREEN = HexToDecimal(GREEN);
    BLUE = HexToDecimal(BLUE);


    return {r:RED, g:GREEN, b:BLUE}
}

//color brightness
var colorBrightness = function(R,G,B){
    return (R*299 + G*587 + B*114)/1000;
}

//brightness difference
var brightnessDifference = function(R1,G1,B1,  R2,G2,B2){
    return Math.abs(colorBrightness(R1,G1,B1) - colorBrightness(R2,G2,B2));
}

//color difference
var colorDifference = function(R1,G1,B1,  R2,G2,B2){
    //Math.abs() is a better way to get the difference
    return (Math.max(R1,R2)-Math.min(R1,R2)) +
           (Math.max(G1,G2)-Math.min(G1,G2)) +
           (Math.max(B1,B2)-Math.min(B1,B2))
}

var contrastTest = function(R1,G1,B1,  R2,G2,B2){
    if(colorDifference(R1,G1,B1,  R2,G2,B2) > 500 &&
       brightnessDifference(R1,G1,B1,  R2,G2,B2) > 125){
        return true;
    }else{
        return false;
    }
}

window.onload = ()=> { 

    setInterval(() => {
        //console.log();
        console.log(contrastTest(textR.value,textG.value,textB.value,
            fondR.value,fondG.value,fondB.value));

        console.log(brightnessDifference(textR.value,textG.value,textB.value,
            fondR.value,fondG.value,fondB.value));

        console.log(colorDifference(textR.value,textG.value,textB.value,
            fondR.value,fondG.value,fondB.value));

        

        //contrastTest(textR.value,textG.value,textB.value,
        //             fondR.value,fondG.value,fondB.value);


    }, 1000);

    //text RGB value
    var textR = document.getElementById("textR");
    var textG = document.getElementById("textG");
    var textB = document.getElementById("textB");
    //text HEX value
    var textHEX = document.getElementById("textHEX");


    //fond RGB value
    var fondR = document.getElementById("fondR");
    var fondG = document.getElementById("fondG");
    var fondB = document.getElementById("fondB");
    //fond HEX value
    var fondHEX = document.getElementById("fondHEX");


    //Preview div
    var preview = document.getElementById("preview");


    /////////
    //TEXTE//
    /////////

    //Texte RGB
    textR.addEventListener("input", ()=>{
        var RED = parseInt(textR.value);
        
        RED = RED.toString(16).toUpperCase();
        if(RED == "NAN"){
            RED = "00"; 
        }else if(RED.length==1){
            RED = "0" + RED;
        }else if(RED.length>2){
            RED = "FF"; 
        }
        textHEX.value = RED + textHEX.value.substring(2,6);
        preview.style.color = "#" + textHEX.value;

            //update result
            if(contrastTest(textR.value,textG.value,textB.value,
                fondR.value,fondG.value,fondB.value)){
                preview.innerHTML = "<p>Bon contraste !!!</p>";
            }else{
                preview.innerHTML = "<p>Mauvais contraste !!!</p>";
            }

    });
    textG.addEventListener("input", ()=>{
        var GREEN = parseInt(textG.value);
        
        GREEN = GREEN.toString(16).toUpperCase();
        if(GREEN == "NAN"){
            GREEN = "00"; 
        }else if(GREEN.length==1){
            GREEN = "0" + GREEN;
        }else if(GREEN.length>2){
            GREEN = "FF"; 
        }
        textHEX.value = textHEX.value.substring(0,2) + GREEN + textHEX.value.substring(4,6);
        preview.style.color = "#" + textHEX.value;

        //update result
        if(contrastTest(textR.value,textG.value,textB.value,
                        fondR.value,fondG.value,fondB.value)){
            preview.innerHTML = "<p>Bon contraste !!!</p>";
        }else{
            preview.innerHTML = "<p>Mauvais contraste !!!</p>";
        }
    });
    textB.addEventListener("input", ()=>{
        var RED = parseInt(textB.value);
        
        RED = RED.toString(16).toUpperCase();
        if(RED == "NAN"){
            RED = "00"; 
        }else if(RED.length==1){
            RED = "0" + RED;
        }else if(RED.length>2){
            RED = "FF"; 
        }
        textHEX.value = textHEX.value.substring(0,4) + RED;
        preview.style.color = "#" + textHEX.value;

        //update result
        if(contrastTest(textR.value,textG.value,textB.value,
                        fondR.value,fondG.value,fondB.value)){
            preview.innerHTML = "<p>Bon contraste !!!</p>";
        }else{
            preview.innerHTML = "<p>Mauvais contraste !!!</p>";
        }
    });

    //texte HEX
    textHEX.addEventListener("input", ()=>{
        preview.style.color = "#" + textHEX.value;
        if(textHEX.value.length == 6){
            var textRGB = HEXtoRGB(textHEX.value);
            textR.value = textRGB.r;
            textG.value = textRGB.g;
            textB.value = textRGB.b;
            //update result
            if(contrastTest(textR.value,textG.value,textB.value,
                            fondR.value,fondG.value,fondB.value)){
                preview.innerHTML = "<p>Bon contraste !!!</p>";
            }else{
                preview.innerHTML = "<p>Mauvais contraste !!!</p>";
            }
        }

    });    


    ////////
    //FOND//
    ////////

    //Fond RGB
    fondR.addEventListener("input", ()=>{
        var RED = parseInt(fondR.value);
        
        RED = RED.toString(16).toUpperCase();
        if(RED == "NAN"){
            RED = "00"; 
        }else if(RED.length==1){
            RED = "0" + RED;
        }else if(RED.length>2){
            RED = "FF"; 
        }
        fondHEX.value = RED + fondHEX.value.substring(2,6);
        preview.style.backgroundColor = "#" + fondHEX.value;

        //update result
        if(contrastTest(textR.value,textG.value,textB.value,
                        fondR.value,fondG.value,fondB.value)){
            preview.innerHTML = "<p>Bon contraste !!!</p>";
        }else{
            preview.innerHTML = "<p>Mauvais contraste !!!</p>";
        }
    });
    fondG.addEventListener("input", ()=>{
        var GREEN = parseInt(fondG.value);
        
        GREEN = GREEN.toString(16).toUpperCase();
        if(GREEN == "NAN"){
            GREEN = "00"; 
        }else if(GREEN.length==1){
            GREEN = "0" + GREEN;
        }else if(GREEN.length>2){
            GREEN = "FF"; 
        }
        fondHEX.value = fondHEX.value.substring(0,2) + GREEN + fondHEX.value.substring(4,6);
        preview.style.backgroundColor = "#" + fondHEX.value;

        //update result
        if(contrastTest(textR.value,textG.value,textB.value,
                        fondR.value,fondG.value,fondB.value)){
            preview.innerHTML = "<p>Bon contraste !!!</p>";
        }else{
            preview.innerHTML = "<p>Mauvais contraste !!!</p>";
        }
    });
    fondB.addEventListener("input", ()=>{
        var RED = parseInt(fondB.value);
        
        RED = RED.toString(16).toUpperCase();
        if(RED == "NAN"){
            RED = "00"; 
        }else if(RED.length==1){
            RED = "0" + RED;
        }else if(RED.length>2){
            RED = "FF"; 
        }
        fondHEX.value = fondHEX.value.substring(0,4) + RED;
        preview.style.backgroundColor = "#" + fondHEX.value;

        //update result
        if(contrastTest(textR.value,textG.value,textB.value,
                        fondR.value,fondG.value,fondB.value)){
            preview.innerHTML = "<p>Bon contraste !!!</p>";
        }else{
            preview.innerHTML = "<p>Mauvais contraste !!!</p>";
        }
    });

    //Fond HEX
    fondHEX.addEventListener("input", ()=>{
        preview.style.backgroundColor = "#" + fondHEX.value;
        if(fondHEX.value.length == 6){
            var fondRGB = HEXtoRGB(fondHEX.value);
            fondR.value = fondRGB.r;
            fondG.value = fondRGB.g;
            fondB.value = fondRGB.b;
            //update result
            if(contrastTest(textR.value,textG.value,textB.value,
                            fondR.value,fondG.value,fondB.value)){
                preview.innerHTML = "<p>Bon contraste !!!</p>";
            }else{
                preview.innerHTML = "<p>Mauvais contraste !!!</p>";
            }
        }
    });

 }