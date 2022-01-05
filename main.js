status1="";
video="";
input="";
objects = [];

function setup(){
    canvas = createCanvas(350, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(350, 300);
}

function start(){
    object = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("object_name_input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
}

function draw(){
    image(video, 0, 0, 350, 300)

    if(status1 != ""){
        object.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
        
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%");
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == input){
            video.stop();
            document.getElementById("status").innerHTML = input + "Found";
            synth = window.SpeechSynthesis;
            utterThis = new SpeechSynthesisUtterance(input + "Found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("number_of_objects").innerHTML = input + "not found";
        }
        }
    }
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}