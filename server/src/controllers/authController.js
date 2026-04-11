const User =require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



const loginUser = async(req,res)=>{
    try{
        const {email,password } = req.body;

        //1 Validation 
        if(!email || !password ){
            return res.status(400).json({message:"Email and Password are required"});  
        }

        //2 Check user 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials "}); 
        }

        // console.log("PLAIN:", password);
        // console.log("HASH:", user.password);

        const isMatch = await bcrypt.compare(password ,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"}); 
        }


        //Generating Tokens 
        const token = jwt.sign(
            {   id: user._id,
                role: user.role 
            },
             process.env.JWT_SECRET,

            {  
                expiresIn: "1d",
            }
        );

        res.json({
            message:"Login Successful",
            token,
            user:{
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });

        


    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {registerUser,loginUser};