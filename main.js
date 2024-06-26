Object.defineProperty(Node.prototype, 'appendChildren', {
    configurable: true,
    value: function(...children) {
        for (const child of children) {
            this.appendChild(child);
        }

        return this;
    }
}); //Criacao de uma funcao para um apendChildren com mais de um parametro

//Var globais
var cont = 0;
var idTotal = 0;
var novoId = 0
initIdIncrementApi();


function visualizar(){
    fetch('https://dummyjson.com/posts?limit=10&skip=' + cont)
        .then(res => res.json())
        .then(json => visuTela(json.posts))
    cont += 10;
}

function visuTela(posts){
    console.log(posts);
    let id = [];
    let userId = [];
    let tt = [];
    let body = [];
    let ps = [];
    let tags = [] 
    //reactions == likes: , dislikes: }
    let reactions = [];
    let likes = [];
    let dislikes = [];
    let views = [];

    //Icons 
    let imgUp = document.createElement("img");
    imgUp.style.width = "30px"; imgUp.style.margin = "0 7px";
    imgUp.src = "img/thumbs-up-solid.svg";
    let imgDown = document.createElement("img");
    imgDown.style.width = "30px"; imgDown.style.margin = "0 7px";
    imgDown.src = "img/thumbs-down-solid.svg";

    const divPosts = document.querySelector("#posts");
    const divPost = []

    const btnDelete = []

    for(let i = 0; i < posts.length; i++){
        divPost[i] = document.createElement("div");
        divPost[i].className = "post container p-3 bg-secondary rounded text-light mb-1";

        id[i] = document.createElement("span");
        id[i].style.display = "none";
        id[i].id = "postId" + posts[i].id; id[i].innerHTML = posts[i].id

        userId[i] = document.createElement("span");
        userId[i].style.display = "none";
        userId[i].id = "userId" + posts[i].userId; userId[i].innerHTML = posts[i].userId

        tt[i] = document.createElement("h3");
        tt[i].innerHTML = posts[i].title;

        body[i] = document.createElement("p");
        body[i].innerHTML = posts[i].body

        ps[i] = document.createElement("p");
        for(let t = 0; t < posts[i].tags.length; t++){
            tags[t] = document.createElement("span");
            tags[t].className = "badge text-bg-dark";
            tags[t].innerHTML = posts[i].tags[t]
            ps[i].appendChild(tags[t]);
        }

        reactions[i] = document.createElement("div");
        reactions[i].className = "bottom d-flex justify-content-between";
        //like
        let span = document.createElement("span")
        span.appendChild(imgUp);
        likes[i] = posts[i].reactions.likes
        span.innerHTML += likes[i];
        
        span.appendChild(imgDown);
        dislikes[i] = posts[i].reactions.dislikes
        span.innerHTML += dislikes[i];

        let span2 = document.createElement("span");
        span2.innerHTML += "views: " + posts[i].views;
        reactions[i].appendChild(span);
        reactions[i].appendChild(span2);

        btnDelete[i] = document.createElement("button");
        btnDelete[i].className = "btn btn-danger";
        btnDelete[i].id = posts[i].id
        btnDelete[i].innerHTML = "Deletar"

        reactions[i].appendChild(btnDelete[i]);

        divPost[i].appendChildren(id[i], userId[i], tt[i], body[i], ps[i], reactions[i])

        divPosts.appendChild(divPost[i]);
    }
    for(let b = 0; b < btnDelete.length; b++){
        btnDelete[b].setAttribute('onclick', 'deletar(' + btnDelete[b].id + ')');
    }
}

function deletar(postId){
    var postDel = document.querySelector("span#postId" + postId);
    var id = postDel.innerHTML;

    //Serve para pegar o pai
    postDel.parentNode.style.display = "none"

    fetch('https://dummyjson.com/posts/'+id, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(console.log);
}

function botaoCriar() {
    var post = []; 
  
    const body = document.getElementById('body').value;
    const title = document.getElementById('title').value;
    const tags = document.getElementById('tags').value;
    // Obtém o total de posts existentes
    novoId = idTotal + 1; //O "auto-increment do crud"
    idTotal = novoId; //Colocar o novo ID incrementado como valor final

    fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 5,
          tags: [ tags ],
          id: novoId
          /* other post data */
        })
    })
    .then(res => res.json());
    


    var objetodados = { 
        id: novoId, 
        body: body,  
        reactions: {likes: 0, dislikes: 0}, 
         tags: [ tags ],
         title: title,
         userId: 5, 
         views: 0
    }; 
    post = [objetodados]; 

    visuTela(post);
}

function initIdIncrementApi(){ //Puxa da api o ID final
    fetch('https://dummyjson.com/posts')
        .then(res => res.json()).then(valor => passarValorParaVariavel(valor.total))
}
function passarValorParaVariavel(total){ //Passa o valor do id para a variavel global
    idTotal = total;
}

function atualizar() { 
    var postsAtt; 

    const postId = document.getElementById('postId').value;
    const bodyAtt = document.getElementById('bodyAtt').value;
    const titleAtt = document.getElementById('titleAtt').value;
    const tagsAtt = document.getElementById('tagsAtt').value;


    /* updating title of post with id 1 */
    fetch(`https://dummyjson.com/posts/${postId}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        title: titleAtt,
        body: bodyAtt,
        userId: 5,
        tags: [ tagsAtt ],
        id: postId
        })
    })
    .then(res => res.json())
    .then(console.log);

    var objetodadosAtt = { 
        id: postId, 
        body: bodyAtt,  
        reactions: {likes: 0, dislikes: 0}, 
        tags: [ tags ],
        title: titleAtt,
        userId: 5, 
        views: 3
    }; 

    console.log(objetodadosAtt)
    attVisu(postId, bodyAtt, titleAtt, tagsAtt);
}

function attVisu(id, bodyAtt, titleAtt, tagAtt){
    var idElement = document.querySelector("span#postId" + id);
    var div = idElement.parentNode;

    var body = div.querySelector("p");
    var title = div.querySelector("h3");
    var tags = div.querySelectorAll("span.badge");

    body.innerHTML = bodyAtt;
    title.innerHTML = titleAtt;

    tags[0].innerHTML = tagAtt;
    for(let i = 1; i < tags.length; i++){
        tags[i].innerHTML = "";
        tags[i].style.display = "none";

    }
}
