const dbPromise = indexedDB.open('food',1);
var comidas;
var fruits;
dbPromise.onupgradeneeded = async function (event){ 
    const dataBase = event.target.result;

    dataBase.createObjectStore('fruit',{autoIncrement: true});

}

export async function setFood(food){
    let db = dbPromise.result;
    const transaction = db.transaction(['fruit'], 'readwrite');
    const fruit =  transaction.objectStore('fruit');
     
    console.log('setting')
    console.log(food)
    fruit.add({
        name: food.name,
        nutrients: food.nutrients
    });

}




dbPromise.onsuccess = function(){

    let db = dbPromise.result;
    const transaction = db.transaction(['fruit'], 'readonly');
    const fruit =  transaction.objectStore('fruit');

    let fruitRequest = fruit.getAll();
    
    fruitRequest.onsuccess = function(e){
        fruits = e.target.result;
    };

    
}

export function validate(recibedFood){

    let valide = true;
    let db = dbPromise.result;
    const transaction = db.transaction(['fruit'], 'readonly');
    const fruit =  transaction.objectStore('fruit');

    let fruitRequest = fruit.getAll();
    
    fruitRequest.onsuccess = function(e){
        fruits = e.target.result;
    };


        fruits.forEach(mineFood => {
    
            if( mineFood.name.toUpperCase() === recibedFood.toUpperCase()){
                valide = false;
            }
        });
    


    return valide;
}
