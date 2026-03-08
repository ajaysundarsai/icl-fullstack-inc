const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    name: String,
    type: String,
    premium: Number
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;