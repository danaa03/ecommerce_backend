import AppDataSource from "../db/data-source.js";
import Comment from "../db/entities/Comment.js";
import Product from "../db/entities/Product.js";

export const addComment = async(req,res) => {
    try {
        const {productId, content} = req.body;
        if (!productId || !content) {
            return res.status(400).json({ message: "Product ID and content are required." });
        }
        const userId = req.userId;

        const productRepo = AppDataSource.getRepository(Product);
        
        //user should not be able to post a comment on their own product
        const product = await productRepo.findOne({
            where: { id: productId },
        });

        if (!product) {
        return res.status(404).json({ message: "Product not found." });
        }

        if (product.user.id === userId) {
        return res.status(403).json({ message: "You cannot comment on your own product." });
        }
        const commentRepo = AppDataSource.getRepository(Comment);

        const newComment = commentRepo.create({ content, user: {id:userId}, product: {id: productId}});
        await commentRepo.save(newComment);
        res.status(201).json({msg: "Comment posted successfully!"});

    } catch (err)
    {
        console.error(err);
        res.status(500).json({msg: "Error while posting comment"});
    }
}

export const updateComment = async (req, res) => {
  try {
    const userId = req.userId;
    const commentId = parseInt(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ msg: "Content is required" });
    }

    const commentRepo = AppDataSource.getRepository(Comment);

    const comment = await commentRepo.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.user.id !== userId) {
      return res.status(403).json({ msg: "You are not authorized to update this comment" });
    }

    comment.content = content;
    await commentRepo.save(comment);

    res.status(200).json({ msg: "Comment updated successfully", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const commentId = parseInt(req.params.id);

    const commentRepo = AppDataSource.getRepository(Comment);

    const comment = await commentRepo.findOne({
      where: { id: commentId }, //not specifying relations as eager was already set to true
    });

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    console.log("comment.user.id: ", comment.user.id, " userid: ",userId )

    if (comment.user.id !== userId) {
      return res.status(403).json({ msg: "You are not authorized to delete this comment" });
    }

    await commentRepo.remove(comment);
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (!productId) {
      return res.status(400).json({ msg: "Product ID is required" });
    }

    const commentRepo = AppDataSource.getRepository(Comment);

    const comments = await commentRepo.find({
      where: { product: { id: productId } },
      order: { created_at: "DESC" }, 
      relations: ["user"], 
    });

      let commentsResponse = comments.map(comment => ({
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          user: {
            id: comment.user.id,
            email: comment.user.email,
            name: comment.user.name,
          }
      }));

    res.status(200).json(commentsResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching comments" });
  }
};
