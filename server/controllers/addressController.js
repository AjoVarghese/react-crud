const userSchema = require("../schema/userSchema");

exports.addAddressPost = async (req, res) => {
  try {
    const userId = req.query.id;
    const newAddress = {
      Street: req.body.Street,
      City: req.body.City,
      State: req.body.State,
      Country: req.body.Country,
      Pincode: req.body.Pincode,
    };

    userSchema
      .updateOne(
        { _id: userId },
        {
          $push: {
            Address: newAddress,
          },
        }
      )
      .then((data) => {
        userSchema.findOne({ _id: userId }).then((result) => {
          let userAddress = {
            Address: result.Address,
          };
          res.status(200).json(userAddress);
        });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAddress = (req, res) => {
  userSchema
    .findOne({ _id: req.query.id })
    .then((data) => {
      let addressData = {
        Address: data.Address,
      };
      if (addressData.Address.length === 0) {
        res.status(200).json("No Addresses added");
      } else {
        res.status(200).json(addressData);
      }
    })
    .catch((err) => {
      res.status(400).json("error fetching address");
    });
};

exports.deleteAddress = (req, res) => {
  userSchema
    .updateOne(
      { _id: req.params.userId },
      {
        $pull: { Address: { _id: req.params.addressId } },
      }
    )
    .then(() => {
      userSchema
        .findOne({ _id: req.params.userId })
        .then((data) => {
          let addressData = {
            Address: data.Address,
          };
          if (addressData.Address.length === 0) {
            res.status(200).json("No Addresses added del");
          } else {
            res.status(200).json(addressData);
          }
        })
        .catch((err) => {
          res.status(400).json("error fetching addres s");
        });
    });
};
