function startRecord() {
    const constraints = {
        video: true,
        audio: true
    };

    const video = document.querySelector("video");

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            $("#record").html("Stop record");
            video.srcObject = stream;
        })
        .catch(() => {
            $("#error").html("Please refresh and allow access to camera")
        });
}