const Inventory = require("../models/inventory");

const getInventorys = async (req, res, next) => {
  try {
    const inventorysList = await Inventory.find()
      .populate("chemicalId", "name")
      .exec();

    res.send(inventorysList);
  } catch (error) {
    next(error);
  }
};

const addChemicals = async (req, res, next) => {
  const { name, description, unit } = req.body;

  try {
    // Перевірка, чи добриво з такою назвою вже існує
    const findChemical = await Chemical.findOne({ name });
    if (findChemical) {
      return res
        .status(400)
        .json({ message: "ЗЗР із такою назвою вже є у списку" });
    }

    // Створення нового добрива
    const сhemical = await Chemical.create({ name, description, unit });

    res.status(201).json({ message: "ЗЗР успіжно додано до списку", сhemical });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInventorys };
