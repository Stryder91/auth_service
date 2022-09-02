import express, { Request } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// To know if current user is (still) logged in or not.
router.get('/api/users/currentuser', (req, res) => {
  // !req.session || !req.session.jwt
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    );
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null});
  }


  

});

export { router as currentUserRouter }