import crypto from "crypto"

export const hachpassword = (password) => {    
    const secret = "This is a company secret 🤫";

    const sha256Hasher = crypto.createHmac("sha256", secret);
    
    const hash = sha256Hasher.update(password);

    return hash.digest("hex");
}


