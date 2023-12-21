// Create Web server
// 2.1.1 - 02/04/2018 - LF - Ajout de la route pour la suppression d'un commentaire
// 2.1.0 - 02/04/2018 - LF - Ajout de la route pour la modification d'un commentaire
// 2.0.0 - 02/04/2018 - LF - Ajout de la route pour la création d'un commentaire
// 1.0.0 - 02/04/2018 - LF - Création initial

// import
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comments');

// routes
router.post('/', auth, commentsCtrl.createComment); // Création d'un commentaire
router.put('/:id', auth, commentsCtrl.modifyComment); // Modification d'un commentaire
router.delete('/:id', auth, commentsCtrl.deleteComment); // Suppression d'un commentaire

module.exports = router; // Export du module