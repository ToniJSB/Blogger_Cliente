import {CalculadoraService} from '../service/CalculadoraService.js';

export class CalculadoraController{

    constructor(){
        this.calculadoraService = new CalculadoraService();
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
        this.calculadoraService.calculate(ev.dataTransfer.getData("text"));
        
    
    }

}