import {getTranscript} from '../service/AudioService.js';
import {TranslateService} from '../service/TranslateService.js';


export const record = document.querySelector('.record');
export const stop = document.querySelector('.stop');
export const mainSection = document.querySelector('.main-controls');

let translateService = new TranslateService();


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

        mediaRecorder.onstop = async function(e) {

            const blob = new Blob(chunks, { 'type' : 'audio/webm; codecs=opus' });
            let valor = await getTranscript(blob);
            document.querySelector('#content').value = valor.transcripcio 
            let translatedIndex = document.querySelector('#traducido').selectedIndex;
            let translatedOption = document.querySelector('#traducido').options;
            let destino= translatedOption[translatedIndex].value

            document.querySelector('#contentT').value = await translateService.translate('es', destino, valor.transcripcio); 
            chunks = [];
            
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
