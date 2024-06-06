// Could be GET or POST/PUT/PATCH/DELETE
function json(){
    fetch('https://dummyjson.com/products/1')
        .then(res => res.json())
        .then(x => jsonTabela(x))
        .then(console.log);
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