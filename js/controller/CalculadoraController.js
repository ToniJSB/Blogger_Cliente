
export class CalculadoraController{
    idDragged;
    constructor(){
//        this.peso= document.querySelector('#peso').value;
//        this.edad= document.querySelector('#edad').value;
//        this.altura= document.querySelector('#altura').value;
//        this.sexo= document.querySelector('#sexo').value;
    }

    calculate(actividad){

        let sexoIndex = document.querySelector('#sexo').selectedIndex;
        let sexoOption = document.querySelector('#sexo').options;

        let tmb = (document.querySelector('#peso').value*10)+(document.querySelector('#altura').value*6.25)-(5*document.querySelector('#edad').value);

        if (sexoOption[sexoIndex].value==="H"){
            tmb = tmb+5;
        }else{
            tmb = tmb-161;
        }

        switch(actividad){
            case 'poco':
                console.log(actividad)
                console.log('poco')
                tmb = tmb * 1.2;
                break;
            case 'leve':
                console.log(actividad)
                console.log('leve')
                tmb = tmb * 1.375;
                break;
            case 'moderado':
                console.log(actividad)
                console.log('mode')
                tmb = tmb * 1.55;
                break;
            case 'fuerte':
                console.log(actividad)
                console.log('fier')
                tmb = tmb * 1.725;
                break;
            case 'profesional':
                console.log(actividad)
                console.log('pro')
                tmb = tmb * 1.9;
                break;
            
        }
        document.querySelector('#tmb').innerHTML = tmb;
        document.querySelector('#dropeable').innerHTML = 'ejercicio ' + actividad;

    }
    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        
        this.idDragged = ev.dataTransfer.getData("text");
        this.calculate(ev.dataTransfer.getData("text"));
        
    
    }

}