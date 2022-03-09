import jwt from 'jsonwebtoken';

const auth = async(req,res,next) =>{
    try {
        const token = req.header("x-auth-token");
       
        let decodedValue = jwt.verify(token,process.env.SECRET_KEY);
        req.userId = decodedValue?.id;
        console.log(req.userId)
        next()
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

export default auth;