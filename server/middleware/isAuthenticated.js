import jwt from "jsonwebtoken"

 export const isAuthenticated = async (req,res,next)=>{
    try {
        // ------------this token is comming from the browser token
        const token = req.cookies.token
        if(!token){
            return res.status(200).json({
                success: true,
                message: "User not authenticated"
            })
        }

        // verify the token is write or not 
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        // if decode nahi huwa to 
        if(!decode){
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }


        //do log of decode we will get userid
        req.id= decode.userId   //const req = {id:""}
        next();
        
    } catch (error) {
        console.log("🚀 ~ isAuthenticated ~ error:", error)
        
    }
}
