// Mana, vamo usar o dos posts pdp? é pique twitter, vo fzer o visualizar primeiro(pra aparecer na tela bonitinho)
function json(){
    fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(x => console.log(x.posts[0]))
}

function jsonTabela(json){
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    h2.innerHTML = json.title;
    p.innerHTML = json.price;

    document.body.appendChild(h2);
    document.body.appendChild(p);
}
/* { status: 'ok', method: 'GET' } */