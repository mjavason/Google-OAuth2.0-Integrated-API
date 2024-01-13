import { passportConfig } from '../../../config/passport.config';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send('logging in');
});

router.get(
  '/google',
  passportConfig.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/google/redirect',
  passportConfig.authenticate('google'),
  (req: Request, res: Response) => {
    res.send('redirect with google');
  }
);

router.get('/logout', (req: Request, res: Response) => {
  res.send('logging out');
});

export default router;
