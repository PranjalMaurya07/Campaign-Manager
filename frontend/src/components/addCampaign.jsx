import React, { useState } from "react";
import API from "../api";
import "../styles/addCampaign.css"

const AddCampaign = ({ onAdded }) => {
  const [form, setForm] = useState({
    campaign_name: "",
    date: "",
    impressions: "",
    clicks: "",
    conversions: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/campaign", form);
      alert("Campaign added!");
      setForm({
        campaign_name: "",
        date: "",
        impressions: "",
        clicks: "",
        conversions: "",
      });
      onAdded();
    } catch (err) {
      console.error("Error adding campaign", err);
      alert("Failed to add campaign");
    }
  };

  return (
    <div className="add-campaign-container">
      <h3 className="add-campaign-title">Add Campaign</h3>
      <form onSubmit={handleSubmit} className="add-campaign-form">
        <input
          className="add-campaign-input"
          name="campaign_name"
          placeholder="Campaign Name"
          value={form.campaign_name}
          onChange={handleChange}
          required
        />
        <input
          className="add-campaign-input"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          className="add-campaign-input"
          type="number"
          name="impressions"
          placeholder="Impressions"
          value={form.impressions}
          onChange={handleChange}
          required
        />
        <input
          className="add-campaign-input"
          type="number"
          name="clicks"
          placeholder="Clicks"
          value={form.clicks}
          onChange={handleChange}
          required
        />
        <input
          className="add-campaign-input"
          type="number"
          name="conversions"
          placeholder="Conversions"
          value={form.conversions}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-campaign-button">Add</button>
      </form>
    </div>
  );
};

export default AddCampaign;
