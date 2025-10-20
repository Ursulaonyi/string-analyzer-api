const express = require('express');
const controller = require('../controllers/stringController');

const router = express.Router();

// Specific routes FIRST, then dynamic routes
router.get('/filter-by-natural-language', controller.filterByNaturalLanguage);
router.post('/', controller.createString);
router.get('/', controller.getAllStrings);
router.get('/:stringValue', controller.getSpecificString);
router.delete('/:stringValue', controller.deleteString);

module.exports = router;