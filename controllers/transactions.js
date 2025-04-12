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
    // Шукаємо чи є залишок із таким id та порівнюємо з 0
    const chemical = await Inventory.findOne({ chemicalId });

    if (!chemical) {
      return res.status(404).json({ message: "ЗЗР не знайдено" });
    }

    if (type === "expense" && chemical.currentStock < quantity) {
      return res.status(400).json({
        message: `Недостатньо залишку. Можна використати тільки ${chemical.currentStock}`,
      });
    }

    // Додаємо трнсакцію
    const newTransaction = await Transactions.create({
      chemicalId,
      type,
      quantity,
      description,
      date: date ? new Date(date) : new Date(),
    });

    // Оновлюємо залишок

    const updatedStock =
      type === "income"
        ? chemical.currentStock + quantity
        : chemical.currentStock - quantity;

    await Inventory.findByIdAndUpdate(chemical._id, {
      currentStock: updatedStock,
      new: true,
    });

    res
      .status(201)
      .json({ message: "Операцію додано успішно", newTransaction });
  } catch (error) {
    next(error);
  }
};

const removeTransaction = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Шукаємо транзакцію і отримуємо з неї chemicalId, type, quantity
    const receivedTransaction = await Transactions.findOne({
      _id: id,
    });

    if (receivedTransaction === null) {
      return res.status(400).json({ message: "Такої операції не знайдено" });
    }
    const { chemicalId, type, quantity } = receivedTransaction;

    // Видаляємо транзакцію
    await Transactions.findByIdAndDelete(id);

    // Повертаємо залишки у попереднє значення після видалення транзакції
    const { _id, currentStock } = await Inventory.findOne({ chemicalId }); //Потрібно { _id, currentStock } замінити на response, щоб можна було перевірити на null (Це коли ми видалимо ЗЗР тоді видалиться і залишок і тут станеться помилка)

    if (type === "income") {
      await Inventory.findByIdAndUpdate(_id, {
        currentStock: currentStock - quantity,
        new: true,
      });
    } else if (type === "expense") {
      await Inventory.findByIdAndUpdate(_id, {
        currentStock: currentStock + quantity,
        new: true,
      });
    }

    return res.json({ message: "Операцію успішно видалено" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTransactions, addTransaction, removeTransaction };
