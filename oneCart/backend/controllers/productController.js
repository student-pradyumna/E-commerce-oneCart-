 
import uploadCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req, res) => {
  try {
    let { name, description, price, category, subCategory, sizes, bestseller } = req.body

    let image1 = await uploadCloudinary(req.files.image1[0].path)
    let image2 = await uploadCloudinary(req.files.image2[0].path)
    let image3 = await uploadCloudinary(req.files.image3[0].path)
    let image4 = await uploadCloudinary(req.files.image4[0].path)

    let productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true' ? true : false,
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    }

    const newProduct = await Product.create(productData)

    return res.status(201).json({ product: newProduct })
  } catch (err) {
    console.log("AddProduct error:", err)
    return res.status(500).json({ message: `AddProduct error ${err}` })
  }
}


export const listproduct = async (req, res) => {
  try {
    const products = await Product.find()   // ✅ Use model name
    
    
    return res.status(200).json( products ) // ✅ send as "products"
  } catch (err) {
    console.log("ListProduct Error:", err)
    return res.status(500).json({ message: `ListProduct error ${err}` })
  }
}

export const removeproduct=async (req,res)=>{
  try{
    let{id}=req.params;
    const product=await Product.findByIdAndDelete(id)
    return res.status(200).json(product)
  }catch(err){
     console.log("Remove product Error ")
   return res.status(500).json({ message:`RemoveProduct error ${err}`})
  }

}
 
