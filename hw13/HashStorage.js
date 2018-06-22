function HashStorage (){
    this.storage = {},
    this.addValue = function(key,value){
        this.storage[key] = value
    }
    this.getValue = function(key){
        return this.storage[key]
    }
    this.deleteValue = function(key){
        delete this.storage[key]
    }
    this.getKeys = function(){
        var keys = Object.keys(this.storage);
        return keys
    }
}
var drinkStorage = new HashStorage ('Название', 'Информация');