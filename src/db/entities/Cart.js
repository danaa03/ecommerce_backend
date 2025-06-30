import {EntitySchema} from "typeorm";

const cart = new EntitySchema({
    name: "Cart",
    tableName: "carts",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
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
            type: "one-to-one",
            target: "User", //FK for user
            inverseSide: "cart",
            joinColumn: true, //auto-creates foreign key userId in the carts table
            eager: true, //when we fetch a cart this will automatically fetch the associated user too
        },
        cartItems : {
            type: "one-to-many",
            target: "CartItem",
            inverseSide: "cart",
            eager: true,
        },
    },
})

export default cart;
