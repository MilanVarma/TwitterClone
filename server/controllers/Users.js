import Users from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUser = async(req,res) =>{
    const {firstname,lastname,email,username,password} = req.body;

    const ExistUser = await Users.findOne({username:username})
    const ExistEmail = await Users.findOne({email:email})

    const saltRounds = await bcrypt.genSalt(4);
    const HashPass = await bcrypt.hash(password,saltRounds);


    if(ExistUser){
        res.send({message:"Username exists"})
    }
    else if(ExistEmail){
        res.send({message:"Email is taken"})
    }
    else{
        const NewUser = await Users({firstname,lastname,email,username,password:HashPass});
        try {
            await NewUser.save()
            res.status(200).send({message:"User Added"})
        } catch (error) {
            res.status(400).send({message:error})
        }
    }

}

export const login = async(req,res) => {
    const { username, password } = req.body;

    const userExist = await Users.findOne({username:username})

    if(userExist){
        const storedPassword = userExist.password;
        const isPasswordCorrect = await bcrypt.compare(password,storedPassword);

        if(isPasswordCorrect){
                const token = jwt.sign({id:userExist._id},process.env.SECRET_KEY)
                res.send({message:"Logged In",
                token:token,
                id:userExist._id,
                name:userExist.firstname,
                last:userExist.lastname,
                email:userExist.email,
                username:userExist.username
                })
        }
        else{
            res.send({message:"Password Incorrect"})
        }
    }
    else{
        res.send({message:"User doesnt Exist"})
    }


}

export const getSingleUser = async(req,res) => {
    const {id} = req.params;

    const User = await Users.findById({ _id:id});
    if(User){
        res.status(200).send(User)
    }
    else{
        res.status(400).send({message:"Invalid Id"})
    }


}