const express = require("express");
const { engine } = require("express/lib/application.js");
const app = express();
const port  = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
require("./db/conn.js");
const Signup = require("./models/signups.js");
const Register = require("./models/registers.js");
const Contect = require("./models/contects.js");
const { error } = require("console");

const static_path = path.join(__dirname,"../public");
const views_path = path.join(__dirname, "../templetes/views");
const partials_path = path.join(__dirname, "../templetes/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("views", views_path);
app.set("view engine", "hbs");
hbs.registerPartials(partials_path);






// Serve images from the 'templetes/views' directory
const images_path = path.join(__dirname, "../templetes/views");
app.use("/images", express.static(images_path));


app.get("/", (req,res)=>{
    res.render("index")
    //res.send("There is some problem")
});
app.get("/login.hbs", (req,res)=>{
    res.render("login")
    //res.send("There is some problem")
});

// customer  signup
app.get("/signup.hbs", (req,res)=>{
    res.render("signup")
    //res.send("There is some problem")
});

app.get("/register.hbs", (req,res)=>{
    res.render("register")
})

app.post("/signup", async (req,res)=>{
    try{

       const password=req.body.password;
       const cpassword = req.body.confirmpassword;
       const email = req.body.email;
       const mobile = req.body.mobile;
       
       if(password===cpassword){

        const customersignup = new Signup({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            mobileNo:mobile,
            email:req.body.email,
            password:password,
            confirmpassword:cpassword

        })
        const existingUser = await Signup.findOne({ $or: [{email}, { mobile }] });
        if (existingUser) {
            return res.status(400).render("signup", {
                errorMessage: "Email or mobile number already exists"
            });
        }

        const customerregistred = await customersignup.save();
        res.status(201).render("login")
       }else{
        res.status(400).render("signup", {
            errorMessage: "Passwords do not match" // Pass the error message to the signup view
        });
       }

        
    }catch(error){
      res.status(400).send(error)
    }
   
    
});

// customer login 

app.post("/login", async (req,res)=>{
   try{
         const email = req.body.email;
         const password = req.body.password;
         const userexist = await Signup.findOne({email:email});

         if(userexist.password===password){
            res.status(201).render("repairservice");
         }else{
          return   res.status(400).render("login",{
            errorMessage: "Invalid login detail"
          });
         }

         
   }catch(error){
    return   res.status(400).render("login",{
        errorMessage: "Invalid login detail"
      })
   }
})

// service partner register

app.post("/register", async (req,res)=>{
    try{

       const password=req.body.password;
       const cpassword = req.body.confirmpassword;
       const email = req.body.email;
       const mobile = req.body.mobile;
       
       if(password===cpassword){

        const serviceregister = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            mobileNo:mobile,
            service:req.body.service,
            address:req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,

            email:req.body.email,
            password:password,
            confirmpassword:cpassword

        })
        const existingUser = await Register.findOne({ $or: [{email}, { mobile }] });
        if (existingUser) {
            return res.status(400).render("register", {
                
                errorMessage: "Email or mobile number already rexist "
            });
        }

        const serviceregistered = await serviceregister.save();
        res.status(201).render("register",{
            errorMessage: "your response succesfully Recorded "
        })
       }else{
        res.status(400).render("register", {
            errorMessage: "Passwords do not match" // Pass the error message to the signup view
        });
       }

        
    }catch(error){
      res.status(400).send(error)
    }
   
    
});

app.post("/contect", async (req,res)=>{
    try{

           const email=req.body.email
           const mobile=req.body.mobile
        const contectregister = new Contect({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:email,
            mobileNo:mobile,
            
            address:req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,

            
            date:req.body.date,
            ftime:req.body.ftime,
            ttime:req.body.ttime,
            comment:req.body.comment,
             video:req.body.video

        })
        
        const existingUser = await Contect.findOne({ $or: [{email}, {mobile}] });
        if (existingUser) {
            return res.status(400).render("contect", {
                
                errorMessage: "You already send your request"
            });
        }

        const contectregistered = await contectregister.save();
        res.status(201).render("contect",{
            errorMessage: "your response succesfully Recorded "
        })
       

        
    }catch(error){
      res.status(400).send(error)
      console.log(error)
    }
   
    
});

// app.get("/repairservice.hbs", (req,res)=>{
//     res.render("repairservice")
//     //res.send("There is some problem")
// });

app.get("/contect.hbs", (req,res)=>{
    res.render("contect")
    //res.send("There is some problem")
});

app.listen(port,()=>{
    console.log(`server run on ${port}`);
})