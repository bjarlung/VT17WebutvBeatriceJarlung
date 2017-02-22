"use strict";

var id = document.getElementById("idNumber");
id.addEventListener("input", assessId);
 
var year = document.getElementById("leapYear");
year.addEventListener("input", assessYear);
 
var numberSum = document.getElementById("numberSum");
numberSum.addEventListener("input", sumUp);
 
function assessId(){
    var idString =id.value;
    console.log(" "+idString.length);
    if(idString.length === 10 || idString.length === 12){
        if(idString.length === 12){
             idString = idString.slice(2);
             console.log(idString);
        }
        var sum = 0;
        for(var i = 0; i< idString.length; i++){
            var number = parseInt(idString.charAt(i));
            if(i % 2 === 0){
                number *= 2;
            }
            if(number> 9){
                number -=9;
            } 
            sum += number;           
        }
        var output =document.getElementById("idNumberResult");
        if(sum %10 === 0){   
            output.innerHTML = "valid";
            output.style.color = "lightgreen";
        }else{
            output.innerHTML = "not valid";
            output.style.color = "red";
        }  
    }  
}
function assessYear(){
    var yearAsNum = Number(year.value);
    var output =document.getElementById("leapYearResult");
    if((yearAsNum%4===0 && yearAsNum%100 !== 0) || (yearAsNum%400 ===0)){
        output.innerHTML = "yes";
        output.style.color = "lightgreen";
    }else{
            output.innerHTML = "no";
            output.style.color = "red";
    }  
}
function sumUp(){  
    var numberAsString =numberSum.value;
    var sum = 0;
    for(var i =0; i<numberAsString.length; i++){
        var indexNumber =numberAsString[i];
        sum += Number(indexNumber);
    }
    var output =document.getElementById("numberSumResult");
    output.innerHTML = ""+sum;
}
