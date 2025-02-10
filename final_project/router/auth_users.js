const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    { id: 1, username: 'doodles23', password: 'password1' },
    { id: 2, username: 'booklover5', password: 'password2' },
    { id: 3, username: 'booknerd2', password: 'password3' },
    { id: 4, username: 'sentientreader6', password: 'password4' },
    { id: 5, username: 'allknowingenthusiast89', password: 'password5' },
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return users.find(user => user.username === username && user.password === password);
}

const authenticatedUser = (username,password)=>{
    
    let usersList = Object.values(users);
    let user = usersList.find(b => b.username==username)
   if (user) {
     
     if (users.password === password) {
     
       return true;
     }
   }

   return false;
 }

 //only registered users can login
 regd_users.post("/login", (req,res) => {
   const { username, password } = req.body;
 
  
   if (!username || !password) {
     return res.status(400).json({ message: 'Please provide a valid username and password' });
   }
   const user = users.find(u => u.username === username && u.password === password);
 
   
   if (username === user.username && password === user.password) {
     const accessToken = jwt.sign({ username, userPassword: password }, "secretKey", { expiresIn: '1h' });
 
    
     req.session.accessToken = accessToken;
 
     return res.status(200).json({ message: 'Login successful',accessToken });
   } else {
     return res.status(401).json({ message: 'Invalid username or password' });
   }
 });
 regd_users.get("/auth/review/", (req,res) => {
   if (!req.session.accessToken) {
     return res.status(401).json({ message: 'Unauthorized' });
   }
 
   try {
     const decodedToken = jwt.verify(req.session.accessToken, "secretKey");
     const { username } = decodedToken;
     return res.status(200).json({ message: `Hello ${username}, you are authenticated to access this route.` });
   } catch (err) {
     return res.status(401).json({ message: 'Unauthorized' });
   }
 });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
