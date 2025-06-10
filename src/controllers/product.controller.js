import AppDataSource from "../db/data-source.js";
import Product from "../db/entities/Product.js";
import crypto from 'crypto';

export const addProduct = async(req,res) => {
    try {
        const {name, description, price} = req.body;
        const userId = req.userId;
        const productRepo = AppDataSource.getRepository(Product);

        const timestamp = Date.now();
        const randomHex = crypto.randomBytes(4).toString('hex');
        const serialNumber = `PROD-${timestamp}-${randomHex}`;

        const newProduct = productRepo.create({ name, description, price, user: {id:userId}, serialNumber});
        await productRepo.save(newProduct);
        res.status(201).json({msg: "Product created successfully!"});

    } catch (err)
    {
        console.error(err);
        res.status(500).json({msg: "Error while creating product"});
    }
}

export const getProducts = async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching products" });
  }
};

//displays product and commments
export const getProductById = async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);

    const product = await productRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["comments", "comments.user", "user"], 
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const productRepo = AppDataSource.getRepository(Product);

    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) } });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;

    await productRepo.save(product);
    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);

    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) } });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await productRepo.remove(product);
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting product" });
  }
};
