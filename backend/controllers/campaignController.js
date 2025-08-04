const db = require("../config/connection");

const getAllCampaigns = (req, res) => {
  db.query(
    "SELECT * FROM campaigns WHERE user_id = ?",
    [req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
};

const createCampaign = (req, res) => {
  const { campaign_name, date, impressions, clicks, conversions } = req.body;

  db.query(
    "INSERT INTO campaigns (user_id, campaign_name, date, impressions, clicks, conversions) VALUES (?, ?, ?, ?, ?, ?)",
    [req.userId, campaign_name, date, impressions, clicks, conversions],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Insert failed" });
      res.status(201).json({ message: "Campaign created successfully" });
    }
  );
};

const updateCampaign = (req, res) => {
  const { id } = req.params;
  const { campaign_name, date, impressions, clicks, conversions } = req.body;

  db.query(
    "UPDATE campaigns SET campaign_name = ?, date = ?, impressions = ?, clicks = ?, conversions = ? WHERE id = ? AND user_id = ?",
    [campaign_name, date, impressions, clicks, conversions, id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed" });
      res.json({ message: "Campaign updated successfully" });
    }
  );
};

const deleteCampaign = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM campaigns WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Delete failed" });
      res.json({ message: "Campaign deleted successfully" });
    }
  );
};

module.exports = {
  getAllCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
