import { ProductModel } from '../models/productModel.js';

export async function searchProductItem(req,res) {
    var regex = new RegExp(req.params.nom_francais,'i');
    try {
        ProductModel.searchProduct(regex).then((result) =>{
    return  res.status(200).json(result)

    });
    }catch (error) {
        return res.status(400).send("failed login");
    }
}


export async function searchBetterProductItem(req,res) {
    var regex = req.params.nom_francais;
    var sousGroup = req.params.sous_groupe;
    try {
        ProductModel.searchBetterProduct(regex,sousGroup).then((result) =>{
    return  res.status(200).json(result)

    });
    }catch (error) {
        return res.status(400).send("failed login");
    }
}

export async function searchProductItemByItem(req,res) {
    var regex = req.params.id;
    try {
        ProductModel.searchProductById(regex).then((result) =>{
        return  res.status(200).json(result)

    });
    }catch (error) {
        return res.status(400).send(error);
    }
}

export async function search(req,res) {
    ProductModel.find((err,docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data : " + err)
     }).select('nom_francais');
}