import {PostDao} from '../dao/PostDao.js';

export class PostFormController{

    postDao = new PostDao();


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
    async translate(langO, langT, text){
    
        let traduce = await fetch('http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php',{
            method: 'POST',
            body: JSON.stringify({
                'MethodName': 'translate',
                'params': {
                    'source': langO,
                    'target': langT,
                    'text': text
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        })
        return await traduce.json();
    
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
    
        document.querySelector('#titleT').value = await this.translate(origen, destino, title);
        
    }
    
    async printContent(){
    
        let values = this.getValuesToTranslate();

        let origen = values.origen;
        let destino= values.destino;
        
        let texto = document.querySelector('#content').value;
    
        document.querySelector('#contentT').value = await this.translate(origen, destino, texto);
        
    }
    
    getLanguages(){
        let idiomas = fetch('http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php',{
            method: 'POST',
            body: JSON.stringify({
                MethodName: 'languages',
                params: ''
            })
        }).then(function(idiomasJson){
            console.log(idiomasJson)
            return idiomasJson.json();
        }).then(function(idiomas) {
            idiomas.forEach(idioma=>{
                let optionIdioma = document.createElement('option');
                let nameOption = optionIdioma.setAttribute('value',idioma.code);
                optionIdioma.text = idioma.name;
                document.querySelector('#traducido').options.add(optionIdioma);
            })
            idiomas.forEach(idioma=>{
                let optionIdioma = document.createElement('option');
                let nameOption = optionIdioma.setAttribute('value',idioma.code);
                optionIdioma.text = idioma.name;
                
                document.querySelector('#original').options.add(optionIdioma);
                
            })
        })
    }
}
