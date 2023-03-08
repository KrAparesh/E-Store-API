const Product = require('../models/product');

const getAllProducts = async(req, res) => {

    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const objectQuery = {};

    if(featured) {
        objectQuery.featured = featured;
    }
    if(company) {
        objectQuery.company = company;
    }
    if(name) {
        objectQuery.name = {$regex: name, $options: 'i'}; 
    }
    
    if(numericFilters) {
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)) {
                objectQuery[field] = {[operator]:Number(value)}
            }
        });
    }

    let result = Product.find(objectQuery);
   
    // Sorting the products
    if(sort) {
        const sortList = sort.split(',').join(' ');
        console.log(sortList);
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    // Getting the fields
    if(fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit
    
    result = result.skip(skip).limit(limit);
    
    const products = await result;
    res.status(200).json({products , nbHits: products.length });
}

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({ price: {$gt: 30} }).sort("price").select('name price');
    res.status(200).json({ products, nbHits: products.length });
    
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}