Object.defineProperty(Node.prototype, 'appendChildren', {
    configurable: true,
    value: function(...children) {
        for (const child of children) {
            this.appendChild(child);
        }

        return this;
    }
}); //Criacao de uma funcao para um apendChildren com mais de um parametro

// Mana, vamo usar o dos posts pdp? é pique twitter, vo fzer o visualizar primeiro(pra aparecer na tela bonitinho)
function visualizar(){
    fetch('https://dummyjson.com/posts?limit=10')
        .then(res => res.json())
        .then(json => visuTela(json.posts))
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
    console.log(postDel);
    var id = postDel.innerHTML;

    //Serve para pegar o pai
    postDel.parentNode.style.display = "none"

    fetch('https://dummyjson.com/posts/'+id, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(console.log);
}