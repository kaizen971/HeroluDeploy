import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    nom_francais:{
        type: String,
        required: true
    },
    ciqual_code:{
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

export const ProductModel = mongoose.model(
    "Node-Api",
    ProductSchema,
    "posts"
);