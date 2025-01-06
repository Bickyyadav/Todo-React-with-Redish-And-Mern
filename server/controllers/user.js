import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const registry = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    //if any field is empty
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    //finding the user is already registered or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "The Email is Already Registered",
      });
    }
    //before creating the if we have to hash the password
    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashpassword,
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "All field is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: " passsword doesnot match",
      });
    }
//creating jsonwebtoken  userid form the user is the name while extracting inline no 52 and we have written in curl bracket expired data
const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
// saving the cookie in the browser cookie and this httpsonly samesite is the restriction in the browser 

    res.status(201).cookie("token",token,{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24*60*60*1000,
    }).json({
      success: true,
      message: "user login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Welcome back  ${User.fullName}`,
    });
  }
};


// if we donot write req because is is not used anywhere so we write _ in the place of req
export const  logout = (_,res)=>{
    try {
        return res.status(200).cookie("token","",{ maxAge:0 }).json({
            success: true, 
            message: "you are successfully logout "
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, you are not login.",
          });
        
    }
}