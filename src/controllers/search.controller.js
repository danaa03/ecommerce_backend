import { getProductRepo } from "../db/repo.js";

export const searchProducts = async(req,res) => {
    try {
        const {keywords} = req.query;
        const productRepo = getProductRepo();
        let products;
        products = await productRepo.find({});
        if(!keywords) //if empty return all products
        {
            return res.status(201).json({msg: "All products ", products});
        }
        else {
            const searchTerms = keywords.toLowerCase().split(' ').filter(Boolean); //extra spaces filtered out
            const results = products.filter(product =>
            searchTerms.some(keyword =>
            product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword)
            ));
            res.status(201).json({msg: "Filtered products returned successfully", results})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Error searching for product"})
    }
};