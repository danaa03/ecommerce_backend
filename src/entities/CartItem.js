const {EntitySchema} = require("typeorm");

module.exports = new EntitySchema({
    name: "CartItem",
    tableName: "cart_items",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        image_path: {
            type: "varchar",
        },
        created_at: {
            type: "timestamp",
            createDate: true, 
        },
        updated_at: {
            type: "timestamp",
            updateDate: true, 
        },
    },

    relations : {
        product : {
            type: "many-to-one",
            target: "Product",
            inverseSide: "cartItems",
        },
        cart : {
            type: "many-to-one",
            target: "Cart",
            inverseSide: "cartItems",
        },
    },
})