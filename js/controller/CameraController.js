
import {addFood} from './FoodController.js';



// Initialize the Image Classifier method with DoodleNet.
let classifier;

// A variable to hold the Webcam video we want to classify
let video;

// Two variable to hold the label and confidence of the result
let label;
let confidence;

export function preload() {
  // Create a camera input
  video = createCapture(VIDEO, {
    video: {
      width: 300,
      height: 300,
      aspectRatio: 1
    } 
  });
  // Load the DoodleNet Image Classification model
  classifier = ml5.imageClassifier('MobileNet', video);
}


export function setup() {
  // Create a 'label' and 'confidence' div to hold results
  label = createDiv('Label: ...');
  confidence = createDiv('Confidence: ...');

  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  // Show the first label and confidence


    if(results[0].confidence > 0.5){
        label.html('Label: ' + results[0].label);
        confidence.html('Confidence: ' + nf(results[0].confidence)); 
        
        if(results[0].confidence > 0.8){
            
            label.html('Label: ' + results[0].label);
            confidence.html('Confidence: ' + nf(results[0].confidence));

            addFood(results[0].label);
            //console.log(await buscar(results[0].label) );
        }

    }

  // Call classifyVideo again
  classifyVideo();
}

