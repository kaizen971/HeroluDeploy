import mongoose from 'mongoose';

mongoose.connect(
        'mongodb+srv://Kaizen971:Pokemon971971@greensearcher.du860nt.mongodb.net/GreenSearcher?retryWrites=true&w=majority',
        {useNewUrlParser : true, useUnifiedTopology:true},
        (err) =>{
            if(!err) console.log("Mongodb connected");
            else console.log("Connection error :" + err);
        }
)