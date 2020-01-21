export class Food{

    name;
    _PESO_MODELO = 100;
    nutrients;
    
    constructor(){
    }

    getName() {
        return this.name;
    }
    getNutrients(){
        return this.nutrients;
    }
    setName(name){
        this.name = name;
    }
    setNutrients(nutrients){
        this.nutrients = nutrients;
    }
}
