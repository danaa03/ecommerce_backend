import {EntitySchema} from "typeorm";

const user = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id : {
            primary: true,
            type: "int",
            generated: true,
        },
        email : {
            type: "varchar",
            unique: true,
        },
        name : {
            type: "varchar",
            length: 30,
        },
        password : {
            type: "varchar",
            length: 100,
            comment: "CHECK (LENGTH(password) >= 6)",
            transformer: {
                to: (value) => {
                if (value.length < 8) throw new Error("Password too short");
                return value;
                },
                from: (value) => value,
            },
        },
        phone : {
            type: "varchar",
        },
        profilePicture : {
            type: "text",
            nullable: true,
        },
        role : {
            type: "enum",
            enum: ["shopkeeper", "customer"], 
            default: "customer", 
        },
        refreshToken: {
            type: "text",
            nullable: true,
        },
        verificationStatus: {
            type: "enum",
            enum: ["pending", "verified"],
            default: "pending",
        },
        verificationToken: {
            type: "text",
            nullable: true,
        },
        verificationTokenExpires: {
            type: "timestamp",
            nullable: true,
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
            type: "one-to-one",
            target: "Cart",
            inverseSide: "user",
            cascade: true,
        },
        products : {
            type: "one-to-many",
            target: "Product",
            inverseSide: "user",
            cascade: true,
        },
        orders: {
            type: "one-to-many",
            target: "Order",
            inverseSide: "user",
        },
        comments: {
            type: "one-to-many",
            target: "Order",
            inverseSide: "user",
        }
    },
})

export default user;