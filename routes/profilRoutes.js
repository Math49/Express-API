import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('backoffice/profil', { title: 'Profil', user: req.user });
});

export default router;