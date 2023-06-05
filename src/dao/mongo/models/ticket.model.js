import mongoose from "mongoose"

const ticketsCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
})

ticketSchema.set("timestamps", {
    createdAt: "purchase_datetime"
})