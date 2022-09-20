import { ProductModel } from "../models/productModel.js";
import { UserModel } from "../models/usersModel.js";


export async function favorisUpdate(req,res){
    var favoris = req.params.id_favoris;
    if(req.session.user){
    const user = await UserModel.findOne({email : req.session.user.email});
    if(favoris != null){
    if(!user.favoris.includes(favoris)){
    user.favoris.push(favoris);
    await UserModel.updateOne({email: req.session.user.email},{ $set: {"favoris" : user.favoris}});
    res.status(200).send("Favoris update")
    }
    else{
        return res.status(200).send("Favoris déja ajoutée")
    }
    }
    else{
        return res.status(200).send(["id de l'url introuvable"])
    }
    }else{

        return res.status(200).send(["Authentification failed"])

    }
}


export async function favorisDelete(req,res) {
    var favoris = req.params.id_favoris;
    if(req.session.user){
    const user = await UserModel.findOne({email : req.session.user.email});
    var tab = user.favoris.filter(function(item) { return item != favoris })
    if(favoris != null){
    await UserModel.updateOne({email:req.session.user.email},{ $set: {"favoris" : tab}});
    res.status(200).send("Favoris delete")
    }
    else{
        return res.status(200).send(["id de l'url introuvable"])
    }
    }else{

        return res.status(200).send(["Authentification failed"])

    }
}

export async function favorisByIds(req,res){
    
    if(req.session.user){
    const user = await UserModel.findOne({email : req.session.user.email});
    
    if(user.favoris != null){
    var datas = [];
    if(user.favoris.length > 0){
    for (let i = 0; i < user.favoris.length; i++) {
        await ProductModel.searchProductID(user.favoris[i]).then((result) =>{
            const item = {id: result.ciqual_code,nom : result['nom_francais'], scoreEF:result['impact_environnemental']['Score unique EF']}
            datas.push(item)
        })
    }
    return res.status(200).send(datas)
    }
    }
    else{
        res.status(200).send(["Problème d'authentification"])
    }
    }else{
        res.status(200).send(["Problème d'authentification"])
    }
}


export async function favorisById(req,res){
    var id = req.params.id;
    if(id != null){
        try{
        await ProductModel.searchProductID(id).then((result) =>{
            console.log(result)
            return res.status(200).send(result)
        })
        }
        catch{
            return res.status(200).send(['id non trouvée'])
        }
    }
    else{
        res.status(200).send(["id non manquant"])
    }
}


export async function  checkfavorisById(req,res){
    var id = req.params.id;

    if(req.session.user){

    var email = req.session.user.email;
    if(email){
    const user = await UserModel.findOne({email : email});
        if(user.favoris.includes(id)){
            res.status(200).send(true)
        }
        else{
            res.status(200).send(false)
        }
    }
    else{
      return  res.status(200).send(["Echec d'authentification"])
    }
    }else{
       return res.status(200).send(["Echec d'authentification"])
    }
}