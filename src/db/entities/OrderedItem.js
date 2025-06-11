import {EntitySchema} from "typeorm";

const orderedItem = new EntitySchema({
    name: "OrderedItem",
    tableName: "ordered_items",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        price: {
            type: "numeric",
        },
        quantity : {
            type: "int",
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
        order : {
            type: "many-to-one",
            target: "Order",
            inverseSide: "orderedItems",
            eager: true,
            joinColumn: true,
        },
        product : {
            type: "many-to-one",
            target: "Product",
            inverseSide: "orderedItems",
            eager: true,
            joinColumn: true,
        }
    },
})

export default orderedItem;