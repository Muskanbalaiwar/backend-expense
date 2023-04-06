const User=require('../models/shopData');

exports.postData=async(req,res,next)=>{
  try{
    const name=req.body.name;
    const des=req.body.description;
    const price=req.body.price;
    const quantity=req.body.quantity
    //console.log(amount);

    const data=await User.create({name:name,description:des,price:price,quantity:quantity})
    res.status(201).json({details:data});}
    catch(err){
        console.log(err);
    }
}

exports.getAll=async(req,res,next)=>{
try{
    const data=await User.findAll();
    res.status(201).json({details:data});}

    catch(err){console.log(err)}
}

exports.put1=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const quantity=req.body.quantity;
        const data=await User.update({
            quantity:req.body.quantity-1
        },
        {where:{ id:req.params.id}}
        )
        console.log('data updated')
    res.status(201).json({details:data});
    }
    catch(err){console.log(err)}

}
