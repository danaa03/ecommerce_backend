import {EntitySchema} from "typeorm";

const order = new EntitySchema({
    name: "Order",
    tableName: "orders",
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
            type: "many-to-one",
            target: "User",
            inverseSide: "orders",
            joinColumn: true,
        },
        orderedItems: {
            type: "one-to-many",
            target: "OrderedItem",
            inverseSide: "order",
            eager: true,
        }
    },
})

export default order;