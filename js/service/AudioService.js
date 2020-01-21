

export async function getTranscript(blob){
    const formData = new FormData();
        
        formData.append('arxiu',blob)
        formData.append('MethodName','transcribe_sync')
        formData.append('params','{}')
        let getTranscription = fetch("http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",{
            method: 'POST',
            body: formData

        }).then(value => {
            return value.json()
        })

        console.log((await getTranscription)[0])
        return (await getTranscription)[0];
        
}