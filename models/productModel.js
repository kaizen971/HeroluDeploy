import mongoose from "mongoose";
import { getImportantWords } from "../Utils/utils.js";

const ProductSchema = new mongoose.Schema({
    nom_francais:{
        type: String,
        required: true
    },
    ciqual_code:{
        type: String,
        required: true
    },
    sous_groupe:{
        type: String,
        required: true
    },
    impact_environnemental:{
        type: Object,
        required: true
    }
});




ProductSchema.static('searchProduct', searchProduct);
ProductSchema.static('searchProductID', searchProductID);
ProductSchema.static('searchProductById', searchProductById);
ProductSchema.static('searchBetterProduct', searchBetterProduct);


async function searchProduct(regex) {
        const search = await this.find({nom_francais: regex }).select('nom_francais');
        if (!search) throw new Error(`Produit non disponible`);
        return search;
}

async function searchProductID(regex) {
    const searchById = await this.findOne({ciqual_code: regex });

    if (!searchById) throw new Error(`Produit non disponible`);
    return searchById;
}

async function searchProductById(regex) {
    try {

    const searchById = await this.findOne({_id: regex });
    if (!searchById) throw new Error(`Produit non disponible`);
    return searchById;

} catch (error) {
    console.log(error)
}
}

async function searchBetterProduct(regex,sousGroup) {
    const importantWordsTab = getImportantWords(regex)
    console.log(importantWordsTab);
    const search = await this.find({$and: [
        {$and:[
        {"nom_francais": importantWordsTab[0]},
        {"nom_francais": importantWordsTab[1]}
        ]
        },
        {"sous_groupe": sousGroup},
        {"impact_environnemental.Score unique EF.synthese": { "$lt": 1.20 } }
      ]}).select('nom_francais sous_groupe impact_environnemental');
    if (!search) throw new Error(`Produit non disponible`);
    return search;
}

export const ProductModel = mongoose.model(
    "Node-Api",
    ProductSchema,
    "posts"
);