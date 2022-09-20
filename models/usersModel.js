import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        firstName: { type: String, required : true},
        lastName: { type: String, required : true},
        email: { type: String, required : true},
        passwordhash : {type : String, required : true} ,
        favoris:{type:Array,default:null,required:false}
});

UserSchema.static('checkUserCredentials', checkUserCredentials);


async function checkUserCredentials(email, password) {
        const user = await this.findOne({ email: email, passwordhash: password });
        if (!user) throw new Error(`Identifiants invalides ou utilisateur inexistant`);
      
        return user;
}

export const UserModel = mongoose.model("user", UserSchema, "user");


