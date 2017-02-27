"use strict";

 console.log("loading javascript");
var processing = document.getElementById("processing"); 
var ingredientList = document.getElementsByClassName("ingredient");
var selectedAmount = document.getElementById("selectAmount");
var starList = document.getElementsByClassName("star");
var ratingSection = document.getElementById("votesRating");
var ratingTag = document.getElementById("rating");
var noVotesTag =document.getElementById("noVotes");
 
 window.onload =  setPoints();
 window.onload = setIngredientsFirst();

selectedAmount.addEventListener("change", setIngredientList);

for(var i=0; i<starList.length; i++){
    starList[i].addEventListener("click", clickStar);
    starList[i].addEventListener("mouseover", hoverStar);
    starList[i].addEventListener("mouseout", resetHover);
    console.log("for-loop listener");
}

function clickStar(){
    processing.style.visibility= "visible";
    for(var i=0; i<Number(this.id); i++){
        starList[i].innerHTML = "&starf;";      
    }
    for(var i=0; i<starList.length; i++){
        starList[i].removeEventListener("mouseover", hoverStar);        
        starList[i].removeEventListener("mouseout", resetHover);
        starList[i].removeEventListener("click", clickStar);
    }
    vote(Number(this.id));       
}

function hoverStar(){
    for(var i=0; i<Number(this.id); i++){
        starList[i].innerHTML = "&starf;";      
    }
}

function resetHover(){
    for(var i=0; i<starList.length; i++){
        starList[i].innerHTML = "&star;"; 
    }
}
//this function sets the amount of ingredients when the page is loaded
function setIngredientsFirst(){
    var amount;
    if(localStorage.getItem("cakeSize") === null){
        amount= 12;
    }else{
        amount =localStorage.getItem("cakeSize");
    }
    updateIngredients(amount);
}

//this function changes the amount of ingredients according to users choice
function setIngredientList(){          
    var chosenAmount = this.value;        
    localStorage.setItem("cakeSize", chosenAmount);
    updateIngredients(chosenAmount);
}

//function setting chosen or default amount of ingredients
function updateIngredients(setAmount){
    var mudcake = getMudcake();
    for(var i=0; i<mudcake.length; i++){
        var amount = mudcake[i].baseAmount * (setAmount/6);
        mudcake[i].amount = amount;
        ingredientList[i].innerHTML = amount + " " + mudcake[i].unit
                                    + " " + mudcake[i].name;
    }
    document.getElementById("noOfpieces").innerHTML = setAmount;  
}

//this function creates a list of ingredients for mudcake
function getMudcake(){
    //creating the necessary ingredients for making mudcake
    var butter = new ingredient(50.0, "g", "smör");
    var sugar = new ingredient(1.25, "dl", "strösocker");
    var egg = new ingredient(1.0, "", "ägg");
    var flour = new ingredient(0.5, "dl", "vetemjöl");
    var cocoa = new ingredient(1.5, "msk", "kakao");
    var vanillaSugar = new ingredient(0.5, "tsk", "vaniljsocker");
    //putting ingredients in a list and returning the list
    var mudcake =[butter, sugar, egg, flour, cocoa, vanillaSugar];  
    return mudcake;
}

//this function is used to create ingredient-objects
function ingredient(baseAmount, unit, name){
    this.baseAmount = baseAmount;
    this.amount= 0;
    this.unit = unit;
    this.name = name;
    this.getBaseAmount =function(){
        return this.baseAmount;
    };
}

//ajax-function. Sends vote to API 
function vote(points){  
    var xhttp = new XMLHttpRequest();
	
    xhttp.onreadystatechange = function (){	
	if(this.readyState === 4 && this.status === 200){
            processing.style.visibility= "visible"; 
            setPoints();
	}
    };
    
    xhttp.open("GET",
	"https://edu.oscarb.se/sjk15/api/recipe/?api_key=736ccc4bedd63f0c&recipe=kladdkaka&rating="+points,
	true);
    xhttp.send();
}



//ajax-function. Updates rating
function setPoints(){
    var xhttp = new XMLHttpRequest();
	
    xhttp.onreadystatechange = function (){	
	if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            ratingTag.innerHTML = ""+json.rating.toFixed(1);
            noVotesTag.innerHTML = ""+json.votes;
            console.log(json.rating + " " + json.votes);
            console.log(this.responseText);  
            processing.style.visibility= "hidden";  
	}
    };
    
    xhttp.open("GET",
	"https://edu.oscarb.se/sjk15/api/recipe/?api_key=736ccc4bedd63f0c&recipe=kladdkaka",
	true);
    xhttp.send();
}



var ratingSection = document.getElementById("votesRating");

function processingRequest(){
    //processing.style.backgroundColor = "blue";
    
}



