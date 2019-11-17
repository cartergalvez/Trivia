//get injection div
let injectArea = document.getElementById('replace');
let difficulty = 1;
let finalScoreDisplay=0;


function loadHtml(url) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    console.log(url);
    xmlhttp.onload = function () {
        if (xmlhttp.status == 200) {
            let myArr = this.responseText;
            if (url === "../options.html") {
                Oppage(myArr);
            }
            else if(url === "../endgame.html"){
                endgame(myArr);
            }
            else if (url === "../home.html") {
                performHome(myArr)
            }
            else if (url === '../trivia.html' && difficulty === 1) {
                gamePage(myArr, easyMode);
            }
            else if (url === '../trivia.html' && difficulty === 2) {
                gamePage(myArr, mediumMode);
            }
            else if (url === '../trivia.html' && difficulty === 3) {
                gamePage(myArr, hardMode);
            }

        }

    }
    xmlhttp.send();
};






function loadJSON(url) {

    let xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            easyMode = JSON.parse(this.responseText).easyMode;
            mediumMode = JSON.parse(this.responseText).mediumMode;
            hardMode = JSON.parse(this.responseText).hardMode;
            // console.log(easyMode);
            // console.log(mediumMode);
            // console.log(hardMode);

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
let easyMode = [];
let mediumMode = [];
let hardMode = [];
let randomQ = [];
loadJSON('../data/data.json');

function endgame(info){
    injectArea.innerHTML=info;
    let finalscore = document.getElementById('finalscore')
    finalscore.innerText = finalScoreDisplay ;
}
function Optionspage(info) {
    let replaceMe = document.getElementById('replace');
    replaceMe.innerHTML = info;

}
function play(){
    let audio = document.getElementById("audio");
        audio.play();
}

function performHome(info) {
    injectArea.innerHTML = info;

    let opBtn = document.getElementById('opBtn');
    //------btn's events------------//
    opBtn.addEventListener('click', function (e) {
        loadHtml("../options.html")
    });
    let playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', function (e) {
        loadHtml("../trivia.html")
        document.body.classList.add('triviaBG');
        document.body.classList.remove('greyBG');
    });
}
function Oppage(info) {
    injectArea.innerHTML = info;
    let easyBtn = document.getElementById('easyBtn');
    let mediumBtn = document.getElementById('mediumBtn');
    let hardBtn = document.getElementById('hardBtn');
    let mainBtn = document.getElementById('mainBtn');
    easyBtn.addEventListener('click', function (e) {
        difficulty = 1;
    });
    mediumBtn.addEventListener('click', function (e) {
        difficulty = 2;
    });
    hardBtn.addEventListener('click', function (e) {
        difficulty = 3;
    });
    mainBtn.addEventListener('click', function (e) {
        loadHtml('../home.html');
    });
        let musicBtn = document.getElementById('musicBtn');
        musicBtn.addEventListener('click',function(e){
            audio.play();

        })
}


loadHtml('../home.html')

function gamePage(info, arr) {
   
    for(let i=0;i<20;i++){
    let rNum =  Math.floor(Math.random()*arr.length)
        randomQ.push(arr[rNum]);
        arr.splice(rNum, 1);
       
    }
    injectArea.innerHTML = info;
    interval = setInterval(updateTime, 1000)
    let correct = document.getElementById('correct');
    let counter = document.getElementById('counter');
    let totalScore = 0;
    let totalQuestions = 20;
    let timer = 31;
    let qNum = 0;
    let question = document.getElementById('question');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let finalscore = document.getElementById('finalscore')

    a1.addEventListener('click',function(e){
       checkAnswer(a1.innerText);
    });
    a2.addEventListener('click', function (e) {
        checkAnswer(a2.innerText);
    });
    a3.addEventListener('click', function (e) {
        checkAnswer(a3.innerText);
    });
    a4.addEventListener('click', function (e) {
        checkAnswer(a4.innerText);
    });
    displayQuestion(randomQ[qNum]);

    function displayQuestion(obj) {
        console.log(obj);
        question.innerText = obj.Q;
        a1.innerText = obj.a1;
        a2.innerText = obj.a2;
        a3.innerText = obj.a3;
        a4.innerText = obj.a4;
       
    
    }
    function checkAnswer(answer) {
        if (answer === randomQ[qNum].c) {
            totalScore++;
        }
       
        correct.innerText = `${totalScore}/${totalQuestions}`;
        counter.innerText = timer;
        timer = 31;
        nextQuestion();
    }
    function nextQuestion() {
        qNum++;
        if (qNum < totalQuestions) {
            displayQuestion(randomQ[qNum]);
        }
        else {
            clearInterval(interval);
            finalScoreDisplay = `${totalScore}/${totalQuestions}`;
            loadHtml("../endgame.html");
            
        }
    }
    function updateTime() {
        timer--;
        if (timer == 0) {
            timer = 31;
            counter.innerText = timer;
            nextQuestion();
        }
        else {
            counter.innerText = timer;
        }
    }

    //all game logic in this gamePage function
}

