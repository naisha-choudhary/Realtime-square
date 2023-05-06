noseX = 0;
noseY = 0;
rightWristX = 0;
leftWristX = 0;
difference = 0;

function setup() {
    canvas = createCanvas(700,550);
    canvas.position(700,150);
    video= createCapture(VIDEO);
    video.size(550,550);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log("poseNet has started working");
}

function gotPoses(results) {
  if(results.length >0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("NoseX = "+ noseX + " NoseY = " + noseY);

    rightWristX = results[0].pose.rightWrist.x;
    leftWristX = results[0].pose.leftWrist.x;
    difference = floor(leftWristX-rightWristX);
    console.log("RightWrist = " + rightWristX + " LeftWrist = "+ leftWristX  + " Difference = " + difference);
  }
}

function draw() {
  background('grey');
  document.getElementById("status").innerHTML = "Length of the side of the square is = " +difference+"px";
  fill('#f5843d');
  stroke('#f20707');
  square(noseX,noseY,difference);
}