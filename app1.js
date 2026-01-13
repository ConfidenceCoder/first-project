let gameseq=[];
let userseq=[];
let started =false;
let level = 0;
let highScore = 0;   // 🔥 NEW

let h2 =document.querySelector('h2');
let btns = ["red","yellow","green","purple"];

document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp();
    }
})

function gameflash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove("flash"); 
    },400)
}
function userflash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove("userflash"); 
    },400)
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText= `Level ${level} | High Score: ${highScore}`;  
    let randomIdx= Math.floor(Math.random() * 4);
    
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameflash(randBtn); 
}

function checkAns(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level > highScore){              
            highScore = level;
        }

        h2.innerHTML = `Game over! Your score was <b>${level}</b><br>
        High Score: <b>${highScore}</b><br>
        Press any key to start`;

        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },300);
        reset();
    }
}

function btnpress(){
    let btp =this;
    userflash(btp);
    userColor = btp.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(butn of allBtns){
    butn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}
