const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb'
}))
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/upload', (req, res) => {

  // 将接收到的base64字符串转换为Buffer
  const img = req.body.imageData;
  const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64Data, 'base64');

  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': dataBuffer.length
  });

  // 发送图片响应
  res.end(dataBuffer);
});

app.listen(3000, () => console.log('Server is running on port 3000'));