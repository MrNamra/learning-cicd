import express from 'express'

const app = express();
const PORT = process.env.PORT ?? 8000

app.get('/', (req, res) => {
    return res.json({
        msg: "Hello from server"
    })
})

app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));