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
            joinColumn: true,
            eager: true,
        },
        productImages : {
            type: "one-to-many",
            target: "ProductImage",
            inverseSide: "product",
        },
        comments : {
            type: "one-to-many",
            target: "Comment",
            inverseSide: "product",
        },
        cartItems: {
            type: "one-to-many",
            target: "CartItem",
            inverseSide: "product",
        },
        orderedItems: {
            type: "one-to-many",
            target: "OrderedItem",
            inverseSide: "product",
        }
    },
})

export default product;