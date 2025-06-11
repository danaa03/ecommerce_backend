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
        total_amount : {
            default: 0,
            type: "numeric",
            nullable: false,
        },
        created_at: {
            type: "timestamp",
            createDate: true, 
        },
        updated_at: {
            type: "timestamp",
            updateDate: true, 
        },
        address: {
            type: "text",
            nullable: "false",
        },
        phone: {
            type: "varchar",
            nullable: false,
        },
    },

    relations : {
        user : {
            type: "many-to-one",
            target: "User",
            inverseSide: "orders",
            eager: true,
            joinColumn: true,
        },
        orderedItems: {
            type: "one-to-many",
            target: "OrderedItem",
            inverseSide: "order",
        }
    },
})

export default order;