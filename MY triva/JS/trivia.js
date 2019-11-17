function loadJSON(url) {

    let xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText).easyMode;
            
            easyMode = myArr;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
let easyMode = [];
loadJSON('../data/data.json');

function timestart(){
    setInterval()
}