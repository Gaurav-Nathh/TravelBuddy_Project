import jwt from "jsonwebtoken";

export const verfiyToken = ( req, res, next ) => {
  const token = req.cookies.token;
  if( !token ) return res.status(401).json({ success: false, message: "Unautorized: NO token proviced" });
  try{
    const decoded = jwt.verify( token, process.env.JWT_SECRET );
    if( !decoded ) return res.status(401).json({ success: false, message: "Unauthorized: Invalid toekn"});

    req.userId = decoded.userId
    next();
  } catch ( error ) {
    console.log("Error in verifyToken", error);
return res.status(500).json({ success: false, message: "Server error" }); 
  }
}