import crypto from "crypto"

export const hachpassword = (password) => {    
    const secret = "This is a company secret 🤫";

    const sha256Hasher = crypto.createHmac("sha256", secret);
    
    const hash = sha256Hasher.update(password);

    return hash.digest("hex");
}

export const getImportantWords = (str) => {
    const importantWords = [];
    const determinants = ["à", "aux", "de", "-", "des","au"];
  
    // Split the string into an array of words
    const words = str.split(" ");
  
    // Iterate over the array of words
    for (const word of words) {
      // Check if the word is not a determinant
      if (!determinants.includes(word)) {
        importantWords.push(new RegExp(word));
      }
    }
    
    importantWords.sort();
  
    return importantWords;
  }