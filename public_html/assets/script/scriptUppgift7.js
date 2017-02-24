"use strict";
 console.log("loading javascript");

var selectedAmount = document.getElementById("selectAmount");
selectedAmount.addEventListener("change", setIngredientList);

var ingredientList = document.getElementsByClassName("ingredient");
function setIngredientList(){
    var chosenNumber = this.value;
    var mudcake = getMudcake();
    for(var i=0; i<mudcake.length; i++){
        var amount = mudcake[i].baseAmount * (chosenNumber/6);
        mudcake[i].amount = amount;
        ingredientList[i].innerHTML = amount + " " + mudcake[i].unit
                                    + " " + mudcake[i].name;
    }
    document.getElementById("noOfpieces").innerHTML = chosenNumber;
    
    
}
function getMudcake(){
    var butter = new ingredient(50.0, "g", "smör");
    var sugar = new ingredient(1.25, "dl", "strösocker");
    var egg = new ingredient(1.0, "", "ägg");
    var flour = new ingredient(0.5, "dl", "vetemjöl");
    var choco = new ingredient(1.5, "msk", "kakao");
    var vanillaSugar = new ingredient(0.5, "tsk", "vaniljsocker");
    
    var mudcake =[butter, sugar, egg, flour, choco, vanillaSugar];  
    return mudcake;
}

function ingredient(baseAmount, unit, name){
    this.baseAmount = baseAmount;
    this.amount= 0;
    this.unit = unit;
    this.name = name;
    this.getBaseAmount =function(){
        return this.baseAmount;
    };
}

//.value
