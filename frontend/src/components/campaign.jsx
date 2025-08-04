import React, { useEffect, useState } from "react";
import API from "../api";
import AddCampaign from "./addCampaign";
import "../styles/campaign.css"

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    campaign_name: "",
    date: "",
    impressions: "",
    clicks: "",
    conversions: ""
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await API.get("/campaign");
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      }
    };

    fetchCampaigns();
  }, [refresh]);

  const filteredCampaigns = campaigns.filter((c) =>
    c.campaign_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (campaign) => {
    setEditingId(campaign.id);
    setEditData({ ...campaign });
  };

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/campaign/${id}`, editData);
      setEditingId(null);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/campaign/${id}`);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="campaign-container">
      <h2 className="title">All Campaigns</h2>
      <AddCampaign onAdded={() => setRefresh(!refresh)} />

      <input
        className="search-input"
        type="text"
        placeholder="Search by campaign name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-container">
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((c) =>
              editingId === c.id ? (
                <tr key={c.id}>
                  <td><input name="campaign_name" value={editData.campaign_name} onChange={handleChange} /></td>
                  <td><input type="date" name="date" value={editData.date} onChange={handleChange} /></td>
                  <td><input name="impressions" value={editData.impressions} onChange={handleChange} /></td>
                  <td><input name="clicks" value={editData.clicks} onChange={handleChange} /></td>
                  <td><input name="conversions" value={editData.conversions} onChange={handleChange} /></td>
                  <td>
                    <button className="btn save" onClick={() => handleUpdate(c.id)}>Save</button>
                    <button className="btn cancel" onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={c.id}>
                  <td>{c.campaign_name}</td>
                  <td>{c.date}</td>
                  <td>{c.impressions}</td>
                  <td>{c.clicks}</td>
                  <td>{c.conversions}</td>
                  <td>
                    <button className="btn edit" onClick={() => handleEditClick(c)}>Edit</button>
                    <button className="btn delete" onClick={() => handleDelete(c.id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <button className="logout-btn" onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>
    </div>
  );
};

export default CampaignList;
