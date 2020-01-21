export class TranslateService{

    
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
    
    async getLanguages(){
        let idiomas = fetch('http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php',{
            method: 'POST',
            body: JSON.stringify({
                MethodName: 'languages',
                params: ''
            })
        })
        let idiomasJson= (await idiomas).json();
        return await idiomasJson;
    }
}