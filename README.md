nodejs >=18
npm install 安装依赖
npm start 启动node服务：index.js

/api/init 创建浏览器实例
/api/chat 推理
/api/destroy 销毁实例

openai账号密码设置(index.js)：
new ChatGPTAPIBrowser({
    email: "xx@xx.com",
    password: "xxxx",
});
