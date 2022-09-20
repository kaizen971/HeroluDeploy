import { UserModel } from "../models/usersModel.js";
import { hachpassword } from "../Utils/utils.js";

export async function connexion(req, res) {
    const {email ,password} = req.body;
    let messageError = [];

    if(!req.body.email){
        messageError.push("Champs vide email")
    }
    if(!req.body.password){
        messageError.push("Mot de passe vide")
    }
    if(req.body.password != req.body.password){
        messageError.push("Mot de passe non identique")
    }
    if(messageError.length != 0 ){
        res.status(200).json(messageError)
    }
    else{
    const passwordhash = hachpassword(password);
    try {
    const loggedUser = await UserModel.checkUserCredentials(email,passwordhash);
    // Sauvegarde de session
    req.session.user = loggedUser;

    return res.status(200).send(["connexion reussie",req.session.user.firstName,req.session.user.lastName])
    } catch (error) {
    return res.status(400).send("failed login");
    }
    }
}


export async function inscription(req, res) {
    let messageError = [];
    console.log(req.body)
    if(!req.body.firstName){
        messageError.push("Champs vide firstName")
    }
    if(!req.body.lastName){
        messageError.push("Champs vide lastName")
    }
    if(!req.body.email){
        messageError.push("Champs vide email")
    }
    if(!req.body.password){
        messageError.push("Mot de passe non identique")
    }
    if(req.body.password != req.body.password_confirm){
        messageError.push("Mot de passe non identique")
    }
    if(messageError.length != 0 ){
       return res.status(200).json(messageError)
    }
    else{
    let data = req.body
    const user = await UserModel.findOne({ email : req.body.email });
    if(!user){
    const {firstName, lastName , email ,password} = data;
    const passwordhash = hachpassword(password);
    const User = await UserModel.create({ firstName, lastName , email ,passwordhash });
    await User.save();
    req.session.user = User;
    res.status(200).send(["Inscription réussie",firstName,lastName,email])
    }else{
        messageError.push(["Email déjà existant"])
        res.status(200).json(messageError)
    }}
}