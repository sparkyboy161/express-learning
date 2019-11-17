var Product = require('../models/product.model');

module.exports.index = function(req,res){
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 8;
  // var begin = (page-1)*perPage;
  // var end = page*perPage;
  //
  // res.render('product/index.pug',{
  //   products: products.slice(begin,end)
  // });

  Product.find().then(function(products){
    res.render('product/index.pug',{
      products: products
    });
  });
};
