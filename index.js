const { GoogleGenAI } = require('@google/genai');
const express=require('express');
require('dotenv').config();

const app=express();
const ai=new GoogleGenAI({})
app.use(express.json());

const path = require('path');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat',async(req,res)=>{
    try{
            const userMsg=req.body.message;

            const response=await ai.models.generateContent({
                model:'gemini-2.5-flash',
                contents: userMsg
            });
            res.json({reply:response.text});
    }catch(error){
        console.error("there is error while talking to llm",error);
        res.status(500).json({error:"Failed!!"});

    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));