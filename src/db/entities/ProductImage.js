import {EntitySchema} from "typeorm";

const productImages =  new EntitySchema({
    name: "ProductImage",
    tableName: "product_images",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        image_path: {
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
            inverseSide: "productImages",
            joinColumn: true,
            eager: true,
        },
    },
})

export default productImages;