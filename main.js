som="";
scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    som=loadSound("music.mp3");
}

function setup()
{
    caixa=createCanvas(500,400);
    caixa.center();
    caixa.position(500,300);
    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video,0,0,500,400);

fill("#FF0000");
stroke("#FF0000");

if(scoreRightWrist > 0.2)
{
    circle(rightWristX,rightWristY,20);

    if(rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 0.5px";
        som.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 1px";
        som.rate(1);
    }
    else if(rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 1.5px";
        som.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 2px";
        som.rate(2);
    }
    else if(rightWristY >400)
    {
        document.getElementById("speed").innerHTML = "Velocidade = 2.5px";
        som.rate(2.5);
    }
}
if(scoreLeftWrist>0.2)
{
circle(leftWristX, leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "Volume = " + volume;
som.setVolume(volume);
}
}
function modelLoaded()
{
    console.log('PoseNet Is Initializeted');
}
function iniciar()
{
    som.play();
    som.setVolume(1);
    som.rate(1);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" lefyWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
    
}