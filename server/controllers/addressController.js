
const userSchema = require('../schema/userSchema')
const { v4: uuidv4 } = require('uuid'); 

exports.addAddressPost = async(req, res) => {
    try {
        const userId = req.query.id; 
console.log('address',req.body);
    const newAddress = {
        Street: req.body.Street,
        City: req.body.City,
        State: req.body.State,
        Country : req.body.Country,
        Pincode: req.body.Pincode
    };

    userSchema.updateOne({_id : userId},
        {
            $push : {
                Address : newAddress
            }
        }
        ).then((data) => {
            console.log(data);
            userSchema.findOne({_id : userId}).then((result) => {
                console.log('result address',result);
                let userAddress = {
                     Address : result.Address
                }
                console.log('res.addre',userAddress);
                res.status(200).json(userAddress)
            })
        })

   
        // return res.status(201).json({ message: 'Address added successfully' });
    } catch (error) {
        console.error(error,'err in add address');
        return res.status(500).json({ message: 'Internal server error' });
    }

}

exports.getAddress = (req, res) => {
   userSchema.findOne({_id : req.query.id}).then((data) => {
    console.log(data);
    let addressData = {
        Address : data.Address
    }
    if(addressData.Address.length === 0) {
        res.status(200).json("No Addresses added")
    } else {
        console.log("addressDataaaaaaaa",addressData);
        res.status(200).json(addressData)
    }
    
   })
   .catch((err) => {
    res.status(400).json('error fetching address')
   })
}

exports.deleteAddress = (req,res) => {
    console.log('add del req', req.query);
    userSchema.updateOne({_id : req.params.userId},
        {
            $pull: { Address: { _id: req.params.addressId } }
          },
        )
        .then(() => {
            userSchema.findOne({_id : req.params.userId}).then((data) => {
                console.log(data);
                let addressData = {
                    Address : data.Address
                }
                if(addressData.Address.length === 0) {
                    res.status(200).json("No Addresses added del")
                } else {
                    console.log("addressDataaaaaaaa del",addressData);
                    res.status(200).json(addressData)
                }
                
               })
               .catch((err) => {
                res.status(400).json('error fetching addres s')
               })
        })
}