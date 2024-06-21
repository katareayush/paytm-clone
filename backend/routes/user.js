const express = require('express');
const router = express.Router();    
const zod = require('zod');
const { User } = require('../db');
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
});


router.post('/signup', async (req, res) => {
   const body = req.body;
   const {success} = signupSchema.safeParse(req.body);
   if(!success){
    return res.json({ message : "Email Already taken / Incorrect inputs"

    })
   }

   const user = User.findOne({
    username: body.username
   })

   if(user._id) {
    return res.json({
        message: "Email already taken"
    })
   }

   const dbUser = await User.create(body);
   const token = jwt.sign({userId: dbUser._id}, JWT_SECRET);

   res.json({
    message: "User Created",
    token: token
   })

});



module.exports = router;