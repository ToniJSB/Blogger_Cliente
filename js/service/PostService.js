import {PostDao} from '../dao/PostDao.js';

export class PostService{

    constructor(){
        this.postDao = new PostDao();
    }

    getById(id){
        return this.postDao.get(id);
    }

    async getAll(){
        return this.postDao.getAll();
    }

    async save(){
        document.querySelector('#botonPost').value = "save";
        document.querySelector('#botonPost').addEventListener('click',async function() {
            let transalte = await this.getValuesToTranslate();
            let label = ['1 '+transalte.origen + ' 2 '+transalte.destino];
            this.postDao.save(label);
        })
    }

    async update(id){
        console.log(await this.getById(id))
        document.querySelector('#botonPost').value = "update";
        document.querySelector('#botonPost').addEventListener('click',async function() {
            let transalte = await this.getValuesToTranslate();
            let label = ['1 '+transalte.origen + ' 2 '+transalte.destino];
            this.postDao.update(id,label);
        })
    
    }

    async getValuesToTranslate(){
        let originalIndex = document.querySelector('#original').selectedIndex;
        let originalOption = document.querySelector('#original').options;
        
        let translatedIndex = document.querySelector('#traducido').selectedIndex;
        let translatedOption = document.querySelector('#traducido').options;
    
        let lenguas = {
            origen: originalOption[originalIndex].value,
            destino: translatedOption[translatedIndex].value
        }
        console.log(lenguas)
        return lenguas;
    }



}