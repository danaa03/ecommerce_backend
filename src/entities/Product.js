const {EntitySchema} = require("typeorm");

module.exports = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        serialNumber : {
            type: "varchar",
        },
        description : {
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
        user : {
            type: "many-to-one",
            target: "User",
            inverseSide: "products",
            eager: true,
        },
        productImages : {
            type: "one-to-many",
            target: "ProductImage",
            inverseSide: "products",
            eager: true,
            joinColumn: true,
        },
        comments : {
            type: "one-to-many",
            target: "Comment",
            inverseSide: "product",
            eager: true,
            joinColumn: true,
        },
        cartItems: {
            type: "one-to-many",
            target: "CartItem",
            inverseSide: "product",
            eager: true,
            joinColumn: true,
        },
        orderedItems: {
            type: "one-to-many",
            target: "OrderedItem",
            inverseSide: "order",
            joinColumn: true,
            eager: true,
        }
    },
})