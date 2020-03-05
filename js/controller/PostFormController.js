import {PostService} from '../service/PostService.js';
import {TranslateService} from '../service/TranslateService.js';


export class PostFormController{

    
    constructor(id){
        this.translateService = new TranslateService();
        this.putFormLanguages();        
        this.postService = new PostService();
        if (id === null){
            this.postService.save();
        }
        else{
            this.getTexts(id);
            this.postService.update(id);
        }
    }
    
    async getTexts(id){

        let promesa = await this.postService.getById(id);

        document.querySelector('#title').value = promesa.title;
        document.querySelector('#content').value = promesa.content;
    }
    
    async printTitle(){
        let values = await this.postService.getValuesToTranslate();

        let origen = values.origen;
        let destino= values.destino;
    
        let title = document.querySelector('#title').value;
    
        document.querySelector('#titleT').value = await this.translateService.translate(origen, destino, title);
        
    }
    async printContent(){
    
        let values = await this.postService.getValuesToTranslate();

        let origen = values.origen;
        let destino= values.destino;
        
        let texto = document.querySelector('#content').value;
    
        document.querySelector('#contentT').value = await this.translateService.translate(origen, destino, texto);
        
    }
    async putFormLanguages(){
        let idiomas = await this.translateService.getLanguages();
        idiomas.forEach(idioma=>{
            let optionIdioma = document.createElement('option');
            optionIdioma.setAttribute('value',idioma.code);
            optionIdioma.text = idioma.name;
            document.querySelector('#traducido').options.add(optionIdioma);
            let optionIdioma2 = document.createElement('option');
            optionIdioma2.setAttribute('value',idioma.code);
            optionIdioma2.text = idioma.name;
            
            document.querySelector('#original').options.add(optionIdioma2);
        })

    }


}