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

export async function search(req,res) {
    ProductModel.find((err,docs) => {
       if(!err) res.send(docs);
       else console.log("Error to get data : " + err)
    })
}