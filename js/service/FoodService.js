import {setFood, validate} from '../database/IndexedDb.js';
import {FoodDao} from '../dao/FoodDao.js';


export class FoodService{
    foodDao;

    constructor(){
        this.foodDao = new FoodDao;
    }
    


    async addFood(food){
    
        if(!validate(food)){
            console.log("Esa comida ya existe en la Base de datos")
        }
        else{
            this.foodDao.buscar(food).then(async function(resp){
                if (resp != null){
                    return await setFood(resp);
                }
                else {
                    console.log("unseteable")
                }
    
            });
    
        }
    }
}