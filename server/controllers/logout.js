const logout= async(req,res)=>
{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"Logged out successfully",success:true});
    }
    catch(err){
        return res.status(500).json({message:err.message,error:true});
    }
}

module.exports=logout;