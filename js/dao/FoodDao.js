import {Food} from '../model/Food.js';

export class FoodDao{
    constructor(){
        
    }

    async buscar(comida){
    
        let replaced = comida.replace(" ", "%20");
    
        let fetchs = await fetch('https://api.edamam.com/api/food-database/parser?ingr='+replaced+'&app_id=d29658bd&app_key=2f30e0e54f7acc1e01568e28cb09e401',{
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
    
        })
        let foodJson = await fetchs.json();
    
        let food = new Food();
        food.setName(foodJson.parsed[0].food.label);
        food.setNutrients(foodJson.parsed[0].food.nutrients);
    
        return food;
    }
}
