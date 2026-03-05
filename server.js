
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use("/admin", express.static(path.join(__dirname,"admin")));

const dataDir = path.join(__dirname,"data");

function read(file){
  return JSON.parse(fs.readFileSync(path.join(dataDir,file)));
}

function write(file,data){
  fs.writeFileSync(path.join(dataDir,file),JSON.stringify(data,null,2));
}

let products = read("products.json");
let orders = read("orders.json");
let repairs = read("repairs.json");

app.get("/api/products",(req,res)=>res.json(products));

app.post("/api/products",(req,res)=>{
 const p=req.body;
 p.id=Date.now();
 products.push(p);
 write("products.json",products);
 res.json({success:true});
});

app.post("/api/order",(req,res)=>{
 const o=req.body;
 o.id=Date.now();
 orders.push(o);
 write("orders.json",orders);
 res.json({success:true});
});

app.get("/api/orders",(req,res)=>res.json(orders));

app.post("/api/repair",(req,res)=>{
 const r=req.body;
 r.id=Date.now();
 repairs.push(r);
 write("repairs.json",repairs);
 res.json({success:true});
});

app.get("/api/repairs",(req,res)=>res.json(repairs));

app.listen(3000,()=>{
 console.log("V11 REAL MOBILE SHOP SYSTEM RUNNING http://localhost:3000");
});
