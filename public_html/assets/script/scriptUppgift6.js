"use strict";

var noButtonList= document.getElementsByClassName("calc__number");
var signButtonList= document.getElementsByClassName("calc__sign");
var results= document.getElementById("results");
var display = document.getElementById("result");

var calcArray = [];
var tempIndex = 0;
var output = "";

for(var i = 0; i<noButtonList.length; i++){
    noButtonList[i].addEventListener("click", addNumber);
}
for(var i = 0; i<signButtonList.length; i++){
    signButtonList[i].addEventListener("click", addSign);
}

function addNumber(){
    //inserting in array 
    if(this.innerHTML !=="0"){
        if(tempIndex %2 === 0){
            calcArray.push(this.innerHTML);
            console.log("if-sats: "+calcArray.join("+")+ ". tempIndex: "+ tempIndex);
            tempIndex++;
        }else{
            calcArray[tempIndex-1] += this.innerHTML;
            console.log("else-sats: "+calcArray.join("+")+ ". tempIndex: "+ tempIndex);
        }     
        updateDisplay(this.innerHTML);
    }
}

function addSign(){
    if(tempIndex %2 !== 0){
        tempIndex++;
        if(this.innerHTML === "="){
            var answer = eval(output);
            results.innerHTML += output+" = "+answer+"<br>";        
            display.innerHTML = answer;
            calcArray= [];
            output = "";           
        }else{
            updateDisplay(this.innerHTML);
        }       
    }    
}

function updateDisplay(value){
    output += value;
    display.innerHTML = output;
}
