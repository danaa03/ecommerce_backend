import {EntitySchema, JoinColumn} from "typeorm";

const cartItem = new EntitySchema({
    name: "CartItem",
    tableName: "cart_items",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        quantity : {
            type: "int",
            default: 0,
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
            joinColumn: true,
            eager: true,
        },
        cart : {
            type: "many-to-one",
            target: "Cart",
            inverseSide: "cartItems",
            joinColumn: true,
        }
    },
})

export default cartItem;