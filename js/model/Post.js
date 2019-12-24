class Post{

    idBlog;
    title;
    content;
    authName;
    
    constructor(){
    }
    getIdBlog() {
        return this.idBlog;
    }
    getTitle() {
        return this.title;
    }
    getContent() {
        return this.content;
    }
    getName(){
        return this.authName;
    }
    setIdBlog(id){
        this.idBlog = id;
    }
    setTitle(title){
        this.title = title;
    }
    setContent(content){
        this.content = content;
    }
    setName(authName){
        this.authName = authName;
    }
}
export {Post};