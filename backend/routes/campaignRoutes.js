const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign } = require('../controllers/campaignController');

router.get('/', verifyToken, getAllCampaigns);
router.post('/', verifyToken, createCampaign);
router.put('/:id', verifyToken, updateCampaign);
router.delete('/:id', verifyToken, deleteCampaign);

module.exports = router;
