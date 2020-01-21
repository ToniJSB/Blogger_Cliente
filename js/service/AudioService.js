
export const record = document.querySelector('.record');
export const stop = document.querySelector('.stop');
export const mainSection = document.querySelector('.main-controls');


let respuestaTraducida="";

stop.disabled = true;



if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');

    const constraints = { audio: true };
    let chunks = [];



    let onSuccess = function(stream){
        const mediaRecorder = new MediaRecorder(stream);

        console.log("onsuccess")
        record.addEventListener('click',function(){ 
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
            record.style.background = "red"
            stop.disabled = false;
            record.disabled = true;
        })

        stop.onclick = function() {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            record.style.background = "";
            record.style.color = "";
            // mediaRecorder.requestData();

            stop.disabled = true;
            record.disabled = false;
        }

        mediaRecorder.onstop = function(e) {

            const blob = new Blob(chunks, { 'type' : 'audio/webm; codecs=opus' });
            chunks = [];
            const formData = new FormData();
            
            formData.append('arxiu',blob)
            formData.append('MethodName','transcribe_sync')
            formData.append('params','{}')
            let fetcheado = fetch("http://server247.cfgs.esliceu.net/bloggeri18n/blogger.php",{
                method: 'POST',
                body: formData

            }).then(value => {
                return value.json()
            }).then(respuesta => {
                console.log(respuesta);
            })
            
        }


        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        }
    }

    let onError = function(err) {
        console.log('The following error occured: ' + err);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);


    } else {
        console.log('getUserMedia not supported on your browser!');
    }

