const video = document.querySelector("video");

let shouldStop = false;
let stopped = false;
const downloadLink = document.getElementById('download');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$("#stop").click(function() {
    shouldStop = true;
    console.log("hi1")
});

var handlesuccess = async function(stream) {
    $("#record").hide();
    $("#stop").show();
    video.srcObject = stream;

    const options = { mimeType: 'video/webm' };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }

        if (shouldStop === true && stopped === false) {
            mediaRecorder.stop();
            stopped = true;
        }
    });

    mediaRecorder.addEventListener('stop', function() {
        console.log("hi")
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'acetest.webm';
    });

    mediaRecorder.start();
};


// ########################################################################################

function startRecord() {
    const constraints = {
        video: {
            width: { exact: 320 },
            height: { exact: 240 }
        },
        audio: true,

    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            $("#record").hide();
            $("#stop").show();
            video.srcObject = stream;
        })
        .catch((e) => {
            console.log(e);
            $("#error").html("Please refresh and allow access to camera")
        });
}