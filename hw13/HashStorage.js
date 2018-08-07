"use strict";
function HashStorage (){
    this.storage = {};
    this.addValue = function(key,value){
        this.storage[key] = value
    };
    this.getValue = function(key){
        return this.storage[key]
    };
    this.deleteValue = function(key){
        if (key in this.storage){
        delete this.storage[key];
        return true;
    } else return false
    };
    this.getKeys = function(){
        var keys = Object.keys(this.storage);
        return keys
    }
}
var drinkStorage = new HashStorage ();
function addDrink() {
    var drinkName=prompt('Введите название напитка',' ');
    var drinkAlcohol=confirm(' Введенный напиток алкогольный? Да - Ок, нет - отмена');
    var drinkRecipe=prompt('Введите рецепт данного напитка',' ');
    var drinkInfo={ alc:drinkAlcohol, txt:drinkRecipe };
    drinkStorage.addValue(drinkName, drinkInfo);
    console.log(drinkStorage.storage)
}
function getDrink() {
    var drinkName=prompt('Введите название нужного вам напитка',' ');
    if (drinkName in drinkStorage.storage) 
    alert ('Напиток ' + drinkName + '\nАлкогольный ' + drinkStorage.getValue(drinkName).alc + '\nРецепт ' 
    +drinkStorage.getValue(drinkName).txt);
    else alert('Введенный напиток отсутствует')
}
function deleteDrink() {
    var drinkName=prompt('Введите название напитка',' ');
    if (drinkName in drinkStorage.storage) {
        drinkStorage.deleteValue(drinkName); 
    alert ('Название ' + drinkName + ' удален') }
    else alert('Введенный напиток отсутствует')
}
function getAll() {
    alert('Перечень введенных напитоков' + '\n' + drinkStorage.getKeys())
}
