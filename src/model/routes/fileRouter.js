const express = require('express');

const router = express.Router();

router.use('/controllers', require('./fileRoutes/controllerRouter'));
router.use('/styles', require('./fileRoutes/styleRouter'));
router.use('/assets', require('./fileRoutes/assetRouter'));

module.exports = router