export class TranslateService{

    constructor(){

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
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
        let traducido = await traduce.json();
        return traducido;
    
    }
    
    async getLanguages(){
        let idiomas = fetch('http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php',{
            method: 'POST',
            body: JSON.stringify({
                'MethodName': 'languages',
                'params': ''
            })
        })
        let idiomasJson= (await idiomas).json();
        return await idiomasJson;
    }
}