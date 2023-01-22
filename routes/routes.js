import express from 'express';
const router = express.Router();
import { search, searchProductItem, searchProductItemByItem,searchBetterProductItem} from '../controllers/search.js';
import { authMiddleware } from '../middlewares.js';
import {connexion, inscription} from '../controllers/user.js'
import { favorisByIds, checkfavorisById , favorisDelete, favorisUpdate,favorisById } from '../controllers/favoris.js';
import LogoutController from "../controllers/logout.js"
import {searchPlacesByLongitudeLatitude} from '../controllers/localisation.js'



router.get('/search', search);

router.get('/search/:nom_francais', searchProductItem);

router.get('/searchBetterProduct/:nom_francais/:sous_groupe', searchBetterProductItem);


router.get('/searchProductById/:id', searchProductItemByItem);

router.get('/localisationPlace', searchPlacesByLongitudeLatitude);

router.post('/inscription', inscription);

router.get('/logout', LogoutController);

router.post('/connexion',connexion);

router.post('/favoris/update/:id_favoris', authMiddleware ,favorisUpdate);

router.post('/favoris/delete/:id_favoris', authMiddleware , favorisDelete);

router.get('/favoris', favorisByIds);

router.get('/favoris/id/:id', favorisById);

router.get('/checkfavoris/:id', authMiddleware ,checkfavorisById);





export default router;