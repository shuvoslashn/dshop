import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import {
    createServiceController,
    deleteServiceController,
    getServiceController,
    getSingleServiceController,
    servicePhotoController,
    updateServiceController,
} from './../controllers/serviceController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
//* Create Service
router.post(
    '/create-service',
    requireSignIn,
    isAdmin,
    formidable(),
    createServiceController
);

//* Get All Services
router.get('/get-service', getServiceController);

//* Get Single Service
router.get('/get-service/:slug', getSingleServiceController);

//* Get Photo
router.get('/service-photo/:pid', servicePhotoController);

//* Update Service
router.put(
    '/update-service/:pid',
    requireSignIn,
    isAdmin,
    formidable(),
    updateServiceController
);

//* Delete service
router.delete('/delete-service/:pid', deleteServiceController);

export default router;
