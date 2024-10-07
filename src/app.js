import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.init.js';
import { loadGameAssets } from './init/assets.init.js';

const app = express();

// http서버 개설
const server = createServer(app);

const PORT = 3000;

// json파싱 미들웨어
app.use(express.json());

// html을 url로 사용할 수 있게하는 미들웨어
app.use(express.urlencoded({ extended: false }));

// 정적 폴더
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Socket IO 연결을 위해 서버 전달
initSocket(server);

app.get('/', (req, res, next) => {
  res.send('hello world');
});

server.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);

  // 서버가 실행 될 때 실행 될 파일
  try {
    const assets = await loadGameAssets();
    console.log('Assets loaded successfully');
  } catch (err) {
    console.error('Failed to load game assets: ', err);
  }
});
