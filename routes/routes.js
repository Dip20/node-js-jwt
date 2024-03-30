const express = require('express');
const router = express.Router();
const { middleware } = require("../middlewares/middleware")
const apiController = require("../controllers/apiController")

router.post('/api/generate-jwt', apiController.generate_jwt)
router.post('/api/verify-jwt', apiController.verify_jwt)

// router.get('/api/user-details', middleware, apiController.user_details)


module.exports = router;
