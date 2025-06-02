const {EntitySchema} = require("typeorm");

module.exports = new EntitySchema({
    name: "OrderedItem",
    tableName: "ordered_items",
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
        order : {
            type: "many-to-one",
            target: "Order",
            inverseSide: "orderedItems",
        },
        product : {
            type: "many-to-one",
            target: "Product",
            inverseSide: "orderedItems"
        }
    },
})