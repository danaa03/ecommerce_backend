const {EntitySchema} = require("typeorm");

module.exports = new EntitySchema({
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
        cart : {
            type: "many-to-one",
            target: "Cart",
            inverseSide: "orders",
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