const Products = require("../models/product.model");


exports.getAllProducts = (req, res) => {
    try {
        Products.find()
        .then((data) => {
            return res.status(200).send({
                message:"Products have been retrieved successfully.",
                data: data,
            });
        })
        .catch((error) => {
            return res.status(400).send({
                message: "Error while retrieving products.",
                error: error,
            });
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error: error,
        });
    }
}

exports.getProductById = (req, res) => {
  
    try {
      
      const productId = req.params.productId;
      Products.findOne({productId: productId})
        .then((data) => { 
          if(!data){
              return res.status(200).send({
                  message: "No product found with the given Id.",
                });
          }
          
          res.status(200).send({
            message: "Product have been retrieved successfully.",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).send({
            message: "Error while retrieving product data.",
            erroe: error,
          });
        });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({
        message: "Internal server error",
        error:error,
      });
    }
  };

exports.addProduct = (req, res) => {
    try {
        const payload = req.body;
        const newProduct = new Products(payload);
        newProduct
        .save()
        .then((data) =>{
            res.status(200).send({
                message:"Product has been added successfully.",
                data: data,
            })
        })
        .catch((error) =>{
            return res.status(400).send({
                message:"Error while adding new product.",
                error: error,
            })
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error: error,
        });
    }
};

exports.updateProduct = (req, res) => {
    try {
        const productId = req.params.productId;
        const payload = req.body;
        Products.updateOne({productId: productId}, {$set: { ...payload}})
        .then((data) =>{
            res.status(200).send({
                message:"Product has been updated successfully.",
                data: data,
            })
        })
        .catch((error) =>{
            return res.status(400).send({
                message:"Error while updating new product.",
                error: error,
            })
        })
        
    } catch (error) {
        console.log("Product update error : ", error);
        res.status(500).send({
            message:"Internal Server Error",
            error: error,
        });
    }
}

exports.deleteProductById = (req, res) => {
  
    try {
      const productId = req.params.productId;
      Products.deleteOne({productId: productId})
        .then((data) => {
          res.status(200).send({
            message: "Product have been deleted successfully.",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).send({
            message: "Error while deleting product data.",
            erroe: error,
          });
        });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send({
        message: "Internal server error",
        error:error,
      });
    }
  };