const Chemical = require("../models/chemicals");
const Inventory = require("../models/inventory");

const getChemicals = async (req, res, next) => {
  try {
    const chemicalsList = await Chemical.find().exec();

    res.send(chemicalsList);
  } catch (error) {
    next(error);
  }
};

const addChemicals = async (req, res, next) => {
  const { name, description, unit, initialBalances } = req.body;

  try {
    // Перевірка, чи добриво з такою назвою вже існує
    const findChemical = await Chemical.findOne({ name });
    if (findChemical) {
      return res
        .status(400)
        .json({ message: "ЗЗР із такою назвою вже є у списку" });
    }

    // Створення нового добрива
    const chemical = await Chemical.create({
      name,
      description,
      unit,
      initialBalances,
    });

    // Додавання нового добрива відразу до залишків
    await Inventory.create({
      chemicalId: chemical._id,
      currentStock: initialBalances,
    });

    res.status(201).json({ message: "ЗЗР успіжно додано до списку", chemical });
  } catch (error) {
    next(error);
  }
};

const removeChemicals = async (req, res, next) => {
  const { id } = req.params;
  try {
    const chemical = await Chemical.findByIdAndDelete(id);

    if (chemical === null) {
      return res.status(400).json({ message: "Такого ЗЗР не знайдено" });
    }
    const { _id } = await Inventory.findOne({ chemicalId: id });
    await Inventory.findByIdAndDelete(_id);

    return res.json({ message: "ЗЗР видалено" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getChemicals, addChemicals, removeChemicals };
