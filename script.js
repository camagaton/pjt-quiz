// dados iniciais
let quadro = {
  a1:'', a2:'', a3:'',
  b1:'', b2:'', b3:'',
  c1:'', c2:'', c3:''
};
let vez = '';
let mensagem = '';
let jogando= false;

reset();

//eventos
document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click',itemClick);
});
//funcoes
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(quadro[item] === ''){
        quadro[item] = vez;
        renderQuadro();
        toggPlayer();
    }
}

function reset(){
    mensagem = '';
    let random = Math.floor(Math.random() * 2);
    vez = (random === 0) ? 'x' : 'o';
    for(let i in quadro){
        quadro[i] = '';
    }

    jogando = true;
    renderQuadro();
    renderInfo();
}

function renderQuadro(){
    for(let i in quadro){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = quadro[i];
    }
    checkGame();
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = mensagem;
}

function toggPlayer(){
    vez = (vez === 'x') ? 'o':'x';
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        mensagem = ' O x Venceu';
        jogando = false;
    }else if(checkWinnerFor('o')){
        mensagem = 'O o venceu';
        jogando = false;
    }else if(isFull()){
        mensagem = 'Deu empate';
        jogando = false;
    }
}

function checkWinnerFor(vez){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b2,c2',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(',');
        let haswon = pArray.every(option => quadro[option]=== vez);
        if(haswon){
            return true;
        }
    }
    return false;
}

function isFull(){
    for (let i in quadro){
        if(quadro === ''){
            return false;
        }
    }
    return true;
}
