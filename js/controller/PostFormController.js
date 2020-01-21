import {PostDao} from '../dao/PostDao.js';
import {getTranscript} from '../service/AudioService.js';
import {TranslateService} from '../service/TranslateService.js';


export class PostFormController{

    postDao = new PostDao();
    translateService = new TranslateService();
    


    constructor(id){
        if (id === null){
            this.postDao.save();
        }
        else{
            this.getTexts(id);
            this.postDao.update(id);
        }
    }
    async getTexts(id){

        let promesa = await this.postDao.get(id);

        document.querySelector('#title').value = promesa.title;
        document.querySelector('#content').value = promesa.content;
    }

    getValuesToTranslate(){
        let originalIndex = document.querySelector('#original').selectedIndex;
        let originalOption = document.querySelector('#original').options;
        
        let translatedIndex = document.querySelector('#traducido').selectedIndex;
        let translatedOption = document.querySelector('#traducido').options;
        let lenguas = {
            origen: originalOption[originalIndex].value,
            destino: translatedOption[translatedIndex].value
        }
        return lenguas;
    }

    
    async printTitle(){
        let values = this.getValuesToTranslate();

        let origen = values.origen;
        let destino= values.destino;
    
        let title = document.querySelector('#title').value;
    
        document.querySelector('#titleT').value = await this.translateService.translate(origen, destino, title);
        
    }
    async printContent(){
    
        let values = this.getValuesToTranslate();

        let origen = values.origen;
        let destino= values.destino;
        
        let texto = document.querySelector('#content').value;
    
        document.querySelector('#contentT').value = await this.translateService.translate(origen, destino, texto);
        
    }
    async getLanguages(){
        let idiomas = await this.translateService.getLanguages();
        idiomas.forEach(idioma=>{
            let optionIdioma = document.createElement('option');
            optionIdioma.setAttribute('value',idioma.code);
            optionIdioma.text = idioma.name;
            document.querySelector('#traducido').options.add(optionIdioma);
        })
        idiomas.forEach(idioma=>{
            let optionIdioma = document.createElement('option');
            optionIdioma.setAttribute('value',idioma.code);
            optionIdioma.text = idioma.name;
            
            document.querySelector('#original').options.add(optionIdioma);
            
        })

    }

}