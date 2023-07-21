const getRandom = async (req, res) => {
  try {
    const apiUrl = `https://api.chucknorris.io/jokes/random`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRandom, getCategory };
