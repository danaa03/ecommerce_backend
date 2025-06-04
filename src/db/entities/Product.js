import {EntitySchema} from "typeorm";

const product = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        name : {
            type: "varchar",
        },
        price : {
            type : "numeric",
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
        user : { //shopkeeper scenario
            type: "many-to-one",
            target: "User",
            inverseSide: "products",
            eager: true,
            joinColumn: true,
        },
        productImages : {
            type: "one-to-many",
            target: "ProductImage",
            inverseSide: "product",
            eager: true,
        },
        comments : {
            type: "one-to-many",
            target: "Comment",
            inverseSide: "product",
            eager: true,
        },
        cartItems: {
            type: "one-to-many",
            target: "CartItem",
            inverseSide: "product",
            eager: true,
        },
        orderedItems: {
            type: "one-to-many",
            target: "OrderedItem",
            inverseSide: "product",
            eager: true,
        }
    },
})

export default product;