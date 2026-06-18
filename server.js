const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

try {

const message = req.body.message;

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
parts: [
{
text: message
}
]
}
]
})
}
);

const data = await response.json();

console.log("Gemini Response:", JSON.stringify(data));

if(data.error){
return res.json({
reply: "Gemini Error: " + data.error.message
});
}

const reply =
data.candidates?.[0]?.content?.parts?.[0]?.text;

res.json({
reply: reply || "No response from Gemini"
});

}
catch(error){

console.log(error);

res.json({
reply: "Server Error"
});

}

});

app.get("/", (req,res)=>{
res.send("Critical AI Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("Server Started");
});
