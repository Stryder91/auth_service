import express from 'express';
import { currentUser } from '@common91120/common';

const router = express.Router();

// To know if current user is (still) logged in or not.
router.get('/api/users/currentuser', 
  currentUser,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter }