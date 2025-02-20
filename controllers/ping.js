const getPing = (req, res) => {
  
  res.status(200).json({ message: "✅ Server is alive!" });
}

module.exports = { getPing };
