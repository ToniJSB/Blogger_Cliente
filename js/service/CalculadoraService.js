
export class CalculadoraService{

    constructor(){

    }

    calculate(actividad){

        let sexoIndex = document.querySelector('#sexo').selectedIndex;
        let sexoOption = document.querySelector('#sexo').options;
        let peso = document.querySelector('#peso').value;
        let altura = document.querySelector('#altura').value;
        let edad = document.querySelector('#edad').value;

        if (peso.search(",")){
            peso = peso.replace(",",".")
            console.log(peso)
        }
        else if(peso.search(" ")){
            console.log("no hay coma, con espacions no vale")
        }

        let tmb = (peso*10)+(altura*6.25)-(5*edad);

        if (sexoOption[sexoIndex].value==="H"){
            tmb = tmb+5;
        }else{
            tmb = tmb-161;
        }

        switch(actividad){
            case 'poco':
                console.log(actividad)
                tmb = tmb * 1.2;
                break;
            case 'leve':
                console.log(actividad)
                tmb = tmb * 1.375;
                break;
            case 'moderado':
                console.log(actividad)
                tmb = tmb * 1.55;
                break;
            case 'fuerte':
                console.log(actividad)
                tmb = tmb * 1.725;
                break;
            case 'profesional':
                console.log(actividad)
                tmb = tmb * 1.9;
                break;
            
        }
        document.querySelector('#tmb').innerHTML = tmb;
        document.querySelector('#dropeable').innerHTML = 'ejercicio ' + actividad;

    }

}