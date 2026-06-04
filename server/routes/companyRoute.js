import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCompany, deleteCompany, getCompany, getCompanyById ,updateCompany } from '../controllers/companyController.js';
import { singleUpload } from '../middlewares/multer.js';


const router = express.Router();

router.route('/register').post(isAuthenticated,singleUpload,createCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated,singleUpload ,updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

export default router;