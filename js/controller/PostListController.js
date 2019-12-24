import {PostDao} from '../dao/PostDao.js';

export  class PostListController{

    async  pintar(){
        let postDao = new PostDao;
        let posts = await postDao.getAll();
        posts.forEach(post => {
            this.postDOM(post);
        });
    }

    postDOM(post){
        console.log(post)
    
            let valorTitulo = post.getTitle();
            let valorContent =  post.getContent();
            let valorName = post.getName();
            let valorId = post.getIdBlog();
    
            let articuloPost = document.createElement('article');
            articuloPost.setAttribute('class','articlePost');
    
            let titulo = document.createElement('h2');
            let content = document.createElement('p');
            let autor = document.createElement('h3');
            let edit = document.createElement('button');
            edit.addEventListener('click',function(){                    
              window.location.href = "bloggerForm.html?id="+valorId;
            });
            let del = document.createElement('button');
            del.addEventListener('click',function (){
                fetch('https://www.googleapis.com/blogger/v3/blogs/6332784932555712614/posts/'+valorId, 
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                    }
                })
                .then(function(){
                    window.location.href = "index.html" ;
                });   
                }
            )
            titulo.setAttribute('class','titlePost');
            content.setAttribute('class','contentPost');
            autor.setAttribute('class','autorPost');
    
            let nodeTitulo = document.createTextNode(valorTitulo);
            let nodeContent = document.createTextNode(valorContent);
            let nodeAutor = document.createTextNode(valorName);
            let nodeEdit = document.createTextNode('Editar');
            let nodeDel = document.createTextNode('Eliminar');
            
            titulo.appendChild(nodeTitulo);
            content.appendChild(nodeContent)
            autor.appendChild(nodeAutor)
            edit.appendChild(nodeEdit)
            del.appendChild(nodeDel)
    
            articuloPost.appendChild(titulo);
            articuloPost.appendChild(content);
            articuloPost.appendChild(autor);
            articuloPost.appendChild(edit);
            articuloPost.appendChild(del);
            document.querySelector('#blogs').appendChild(articuloPost);
    
    }
    

}