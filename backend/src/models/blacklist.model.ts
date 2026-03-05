import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })

const blackListModel = mongoose.model("blacklistTokens", blackListSchema)
export default blackListModel