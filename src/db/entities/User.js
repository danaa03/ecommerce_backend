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
        },
        password : {
            type: "varchar",
        },
        phone : {
            type: "varchar",
        },
        profilePicture : {
            type: "text",
            nullable: true,
        },
        status : {
            type: "enum",
            enum: ["pending", "active"], //checks if the user is logged in or not to determine what cart we need to show
            default: "pending", //signed out by default
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
    },
})

export default user;