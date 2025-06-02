import {EntitySchema} from "typeorm";

const comment = new EntitySchema({
    name: "Comment",
    tableName: "comments",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        content : {
            type: "varchar",
        },
        pictures : {
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
        product : {
            type: "many-to-one",
            target: "Product",
            inverseSide: "comments",
        },
    },
})

export default comment;