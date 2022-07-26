// const crypto = require("crypto")

// // Defining the algorithm
// let algorithm = "sha256"

// // Defining the key
// let key = "GeeksForGeeks"

// // Creating the digest in hex encoding
// let digest1 = crypto.createHash(algorithm).update(key).digest("hex")

// // Creating the digest in base64 encoding
// let digest2 = crypto.createHash(algorithm).update(key).digest("base64")

// // Printing the digests
// console.log("In hex Encoding : \n " + digest1 + "\n")
// console.log("In base64 encoding: \n " + digest2)



// var crypto = require('crypto');

// // change to 'md5' if you want an MD5 hash
// var hash = crypto.createHash('sha1');

// // change to 'binary' if you want a binary hash.
// hash.setEncoding('hex');

// // the text that you want to hash
// console.log(hash.write('hello world'));

// // very important! You cannot read from the stream until you have called end()
// hash.end();

// // and now you get the resulting hash
// var sha1sum = hash.read();
// console.log(sha1sum)


// const fs = require("fs");


// const one = {
//     key: "hello",
//     status: true
// }

// var two = JSON.stringify(one)

// fs.writeFileSync("licence7.json", two, (err) => {
//     if (err) {
//       console.log("error");
//     }
//   });

//   let data = fs.readFileSync("./licence7.json", "utf-8");
//   let result =  JSON.parse(data);
//   console.log(result.key)

const crypto = require('crypto');
const fs = require('fs');

const fileBuffer = fs.readFileSync('licence7.json');
const hashSum = crypto.createHash('sha256');
hashSum.update(fileBuffer);

const hex = hashSum.digest('hex');

console.log(hex);