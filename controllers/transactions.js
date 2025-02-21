const Inventory = require("../models/inventory");
const Transactions = require("../models/transactions");

const getTransactions = async (req, res, next) => {
  try {
    const transactionsList = await Transactions.find()
      .populate("chemicalId", "name")
      .exec();

    res.send(transactionsList);
  } catch (error) {
    next(error);
  }
};

const addTransaction = async (req, res, next) => {
  const { chemicalId, type, quantity, description, date } = req.body;

  try {
    // Додаємо трнсакцію
    const newTransaction = await Transactions.create({
      chemicalId,
      type,
      quantity,
      description,
      date: date ? new Date(date) : new Date(),
    });

    // Оновлюємо залишок
    const chemical = await Inventory.findOne({ chemicalId });

    if (type === "income") {
      await Inventory.findByIdAndUpdate(chemical._id, {
        currentStock: (chemical.currentStock += quantity),
        new: true,
      });
    } else if (type === "expense") {
      await Inventory.findByIdAndUpdate(chemical._id, {
        currentStock: (chemical.currentStock -= quantity),
        new: true,
      });
    }
    res
      .status(201)
      .json({ message: "Операцію додано успішно", newTransaction });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTransactions, addTransaction };
