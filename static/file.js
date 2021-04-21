$("#file_upload").on("submit", function(event) {
    event.preventDefault();
    f = $("#file")[0].files[0];

    $.ajax({
        data: {
            fname: f.name,
            ftype: f.type
        },
        url: "/s3_signature",
        method: "POST",
        success: function(data) {
            data = JSON.parse(data);
            console.log(data);
            uploadfile(f, data.data, data.url);
        }
    })
});

function uploadfile(file, s3Data, url) {
    var postData = new FormData();
    for (key in s3Data.fields) {
        postData.append(key, s3Data.fields[key]);
    }
    postData.append('file', file);

    $.ajax({
        data: postData,

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

        url: s3Data.url,
        processData: false,
        contentType: false,
        method: "POST",
        success: function() {
            console.log("uploaded!");
            $("#image").attr("src", url)
        }

    })
}

// $("#file").change(function() {
//     f = $("#file")[0].files[0];
//     $.ajax({
//         data: {
//             fname: f.name,
//             ftype: f.type
//         },
//         url: "/s3_signature",
//         method: "POST",
//         success: function(data) {
//             console.log(data);
//             uploadfile(f, data.data, data.url);
//         }
//     })
// })