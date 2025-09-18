import express from 'express'
import { addProduct, listproduct ,removeproduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js';
let productRoutes=express.Router()

productRoutes.post('/addproduct',upload.fields([
  {name:"image1",maxCount:1},
  {name:"image2",maxCount:1},
  {name:"image3",maxCount:1},
  {name:"image4",maxCount:1}
]),addProduct)
productRoutes.get('/list',listproduct)
productRoutes.delete('/remove/:id',adminAuth,removeproduct)
export default productRoutes
