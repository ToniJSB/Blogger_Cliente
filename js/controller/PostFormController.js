async function translate(langO, langT, text){

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

function getValuesToTranslate(){
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

 export async function printTitle(){

    let origen = getValuesToTranslate().origen;
    let destino= getValuesToTranslate().destino;

    let title = document.querySelector('#title').value;

    document.querySelector('#titleT').value = await translate(origen, destino, title);
    
}

 export async function printContent(){

    let origen = getValuesToTranslate().origen;
    let destino= getValuesToTranslate().destino;

    let texto = document.querySelector('#content').value;

    document.querySelector('#contentT').value = await translate(origen, destino, texto);
    
}

export function getLanguages(){
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
            let nameOption = optionIdioma.setAttribute('value',idioma.code)
            optionIdioma.text = idioma.name

            document.querySelector('#traducido').options.add(optionIdioma)
            
        })
        idiomas.forEach(idioma=>{
            let optionIdioma = document.createElement('option');
            let nameOption = optionIdioma.setAttribute('value',idioma.code)
            optionIdioma.text = idioma.name
            
            document.querySelector('#original').options.add(optionIdioma)
            
        })
    })
}
