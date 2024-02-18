const express= require("express")
const app =express()
require("dotenv").config()
app.use(express.json());
const cors = require("cors")
const fileUpload = require('express-fileupload');
const userRoutes = require("./routes/userRoutes")
const sellerRoutes = require("./routes/sellerRoutes")
const productRoutes = require("./routes/productRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const cloudinaryRoutes = require("./cloudinary/cloudinaryRoutes")
const port = process.env.PORT
const connectToMongoDB = require("./db/conn")
connectToMongoDB()
app.use(cors())
app.use(fileUpload());

app.use("/user",userRoutes)
app.use("/seller",sellerRoutes)
app.use("/product",productRoutes)
app.use("/payment",paymentRoutes )
// app.use("/cloudinary",cloudinaryRoutes)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})