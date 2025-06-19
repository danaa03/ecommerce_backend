import { getProductRepo } from '../db/repo.js';
import crypto from 'crypto';

export const addProduct = async(req,res) => {
    try {
        const {name, description, price} = req.body;
        const userId = req.userId;
        const productRepo = getProductRepo();
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
    const productRepo = getProductRepo();
    let products = await productRepo.find();
      products = products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          serialNumber : product.serialNumber,
          description : product.description,
          user: {
            id: product.user.id,
            seller: product.user.name,
            sellersContact: product.user.phone,
          }
      }));
    res.status(200).json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching products" });
  }
};

export const getMyProducts = async (req, res) => {
  const userId = req.userId;
  try {
    const productRepo = getProductRepo();
    let products = await productRepo.find({
      where: {
        user: {id: userId},
      },
    });
      products = products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          serialNumber : product.serialNumber,
          description: product.description,
          user: {
            id: product.user.id,
            seller: product.user.name,
            sellersContact: product.user.phone,
          }
      }));
    res.status(200).json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching products" });
  }
};

export const findProductById = async (productId) => {
  const productRepo = getProductRepo();

  let product = await productRepo.findOne({
    where: { id: productId },
    relations: ["comments", "comments.user", "user"], 
  });
  return product;
}

//display product 
export const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const product = await findProductById(productId);

    if(!product)
      res.status(400).json({msg: "Product not found!"});

    const responseProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        serialNumber : product.serialNumber,
        user: {
          id: product.user.id,
          seller: product.user.name,
          sellersContact: product.user.phone,
        }
    }

    res.status(200).json(responseProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const userId = req.userId;
    const productRepo = getProductRepo();
    console.log("UPDATE product id param:", req.params.id);

    const product = await productRepo.findOne({ 
      where: { 
        id: parseInt(req.params.id),
        user: {id: userId}, //check if the product is the logged in user's product
      }, 
    });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (name !== undefined) 
      product.name = name;
    if (description !== undefined) 
      product.description = description;
    if (price !== undefined) 
      product.price = price;

    await productRepo.save(product);
    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating product" });
  }
};

export const checkProductOwner = async(productId, userId) => {
  try {
    const productRepo = getProductRepo();
    //check if the product was posted by the user 
    const product = await productRepo.findOne({
      where: {
        id: productId,
        user: {id: userId},
      },
    })
    if(product)
      throw new Error("cannot add own product to cart");

    return product;

  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productRepo = getProductRepo();
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
