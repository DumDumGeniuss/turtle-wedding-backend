import { version } from '../../package.json';
import { Router } from 'express';
import config from '../config/config';
import photo from './photo';
import files from './files';

let router = Router();

router.get('/', (req, res) => {
	res.json({ version });
});

router.use('/photos', photo);
router.use('/files', files);

export default router;
