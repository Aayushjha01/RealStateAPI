import expresss from 'express'
import authRoute from './routes/auth.js'

const app = expresss();

app.use(expresss.json())
app.use("/api/auth",authRoute)

app.listen(8800,()=>{
    console.log("Server is running")
})