const Policy = require("../models/Policy");

const getPolicies = async (req, res, next) => {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (err) {
        next(err);
    }
};

const createPolicy = async (req, res, next) => {
    try {
        const policy = new Policy(req.body);
        const savedPolicy = await policy.save();
        res.status(201).json(savedPolicy);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePolicy = async (req, res, next) => {
    try {
        const updated = await Policy.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Policy not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deletePolicy = async (req, res, next) => {
    try {
        const deleted = await Policy.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Policy not found" });
        res.json({ message: "Policy deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy
};
