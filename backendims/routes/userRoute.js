import express from 'express'
import { resisterUser } from '../controllers/userController.js';

const router=express.Router();

router.get('/',(req,res)=>{
    res.send("hello from user route");
})

router.post('/register',resisterUser);



export default router;