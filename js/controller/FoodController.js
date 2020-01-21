import {setFood, validate} from '../dao/IndexedDb.js';
import {buscar} from '../dao/FoodDao.js';

export async function addFood(food){

    if(!validate(food)){
        console.log("Esa comida ya existe en la Base de datos")
    }
    else{
        buscar(food).then(function(resp){
            if (resp != null){
                setFood(resp);
            }
            else {
                console.log("unseteable")
            }

        });

    }
}