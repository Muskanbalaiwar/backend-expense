const User=require('../models/user');
console.log('controller');
exports.postData=async(req,res,next)=>{
    console.log('hello data')
    const amount=req.body.amn;
    const des=req.body.dec;
    const category=req.body.crt;
    //console.log(amount);

    const data=await User.create({amount:amount,description:des,category:category})
    res.status(201).json({details:data});
}

exports.getAll=async(req,res,next)=>{
console.log('get all')
    const data=await User.findAll();
    res.status(201).json({details:data});
}

exports.delete=async(req,res,next)=>{
    const id=req.params.id;
    await User.destroy({where :{id:id}});
    res.sendStatus(201);
  }

  exports.getData=async(req,res,next)=>{
    const id=req.params.id;
    const data=await User.findByPk(id);
    res.status(201).json({details:data});
}


