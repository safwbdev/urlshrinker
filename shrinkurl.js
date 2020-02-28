var endpoint = "https://www.jsonstore.io/298661374cb33c46551985b798a30d84d0d8914b2a1e5478a238a27edb57a79a";

function shorturl(){

    var url = document.getElementById("urlinput").value;

    if(url){            

    var longurl = validateUrl(url);
    
    generateHash();
    
    sendRequest(longurl);

    var newLink = window.location.origin + "/#" + window.location.hash.substr(1);

    $("#shortlink")
    .html(`<div class="col s12">
                <div class="copy-link">
                    <input type="text" value="${newLink}" id="shrunkurl" onclick="copyUrl()" readonly/>
                    <button onclick="copyUrl()" class="waves-effect waves-light btn" alt="copy to clipboard">
                        <i class="material-icons">content_copy</i>
                    </button>&nbsp;
                    <a class="waves-effect waves-light btn" target="_blank" href="${newLink}" alt="preview">
                        <i class="material-icons">open_in_new</i>
                    </a>
                </div>
            </div>
            <div class="col s12 ori-url">
                <h5>Original URL : <a href="${longurl}" target="_blank">${longurl}</a></h5>
            </div>
    `);
    $('#urlinput').val('');

} else {
        alert(`Don't leave the field blank`);
    }
}

function validateUrl(url){

    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");

    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function randomize() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function generateHash(){
    if (window.location.hash == ""){
        window.location.hash = randomize();
    }
}

function sendRequest(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })
}


var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}

function copyUrl() {
    var copiedUrl = document.getElementById("shrunkurl");
    copiedUrl.select();
    copiedUrl.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("URL Copied to clipboard");
}