$("#file_upload").on("submit", function(event) {
    event.preventDefault();
    fd = new FormData();

    file = $("#file")[0].files[0];
    fd.append("file", file);

    $.ajax({
        beforeSend: function() {
            var percentVal = '0%';
            $("#perc").html(percentVal);
        },
        xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function(data) {
                var perc = Math.round((data.loaded / data.total) * 100);
                $('#perc').text(perc + '%');
            };
            return xhr;
        },

        data: fd,
        processData: false,
        contentType: false,
        url: "/file",
        method: "POST",
        success: function(data) {
            console.log(data);
        }
    })
});


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