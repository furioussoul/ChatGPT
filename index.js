import {createRequire} from "module";
import {ChatGPTAPIBrowser} from "chatgpt";

const require = createRequire(import.meta.url);
const express = require("express");
const puppeteer = require("puppeteer");

const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

let api, browser, page;

async function chatgptFunction(query) {
    // use puppeteer to bypass cloudflare (headful because of captchas)
    if (api) {
        return await api.sendMessage(
            `${query}`
        );
    }
}

app.get("/api/init", (req, res) => {
    (async () => {
        if (!api) {
            api = new ChatGPTAPIBrowser({
                email: "roxiestraka91@outlook.com",
                password: "aiW5mMXQmV",
            });
            await api.initSession();
        }

        return res.json({
            message: 'ok'
        });
    })()
})

app.get("/api/destroy", (req, res) => {
    (async () => {
        await browser.close();
    })()
})


app.post("/api/chat", (req, res) => {
    const {query} = req.body;

    (async () => {
        let result = await chatgptFunction(query);
        return res.json({
            message: result
        });
    })();
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
