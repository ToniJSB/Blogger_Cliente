
import {Post} from '../model/Post.js'
export class PostDao{
    constructor(){

    }
    get(idPost){
        
        let postGetted = fetch('https://www.googleapis.com/blogger/v3/blogs/6332784932555712614/posts/'+idPost+'?access_token=' + localStorage.getItem('accesToken'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function (promiseJson) {
            return promiseJson.json();
        }).then(function (responseJson) {
            console.log(responseJson)
            let response = {
                title: responseJson.title,
                content: responseJson.content
            };
            return response;
            
        });

        return postGetted;

    }

    async getAll(){
        let arrayPromises = [];

        let promiseJson = await fetch('https://www.googleapis.com/blogger/v3/blogs/6332784932555712614/posts?access_token=' + localStorage.getItem('accesToken'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        let responseJson = await promiseJson.json();
        
        let posts = await responseJson.items;
        posts.forEach(post => {
            let postOobject = new Post();
            postOobject.setIdBlog(post.id);
            postOobject.setTitle(post.title);
            postOobject.setContent(post.content);
            postOobject.setName(post.author.displayName);

            arrayPromises.push(postOobject);

        })

        return arrayPromises;
    }

    async save(/*translates */){
            let paramsFetch = {
                method: 'POST',
                body: JSON.stringify({
                    'kind': 'blogger#post',
                    'title': document.querySelector('#titleT').value, 
                    'content': document.querySelector('#contentT').value,
//                    'labels': translates
                }),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesToken'),
                    'Content-Type': 'application/json'
                }

            };
            await fetch('https://www.googleapis.com/blogger/v3/blogs/6332784932555712614/posts/', paramsFetch).then(function(){
                window.location.replace("./index.html")
            });

    }
    async update(idPost/*, translates*/){
        
        let paramsFetch = {
            method: 'PUT',
            body: JSON.stringify({
                'kind': 'blogger#post',
                'title': document.querySelector('#titleT').value, 
                'content': document.querySelector('#contentT').value,
//                'labels': translates

            }),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accesToken'),
                'Content-Type': 'application/json'
            }
        };
        await fetch('https://www.googleapis.com/blogger/v3/blogs/6332784932555712614/posts/'+idPost, paramsFetch) .then(function(){
            window.location.replace("./index.html")
        });
    
    }




}