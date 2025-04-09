import createApp from "./CreateApp";
import http from "http";
import { Server } from "socket.io";


const app = createApp();
const server = http.createServer(app);
const port = 4000;

const io = new Server(server, {
  cors: {
    origin: "*", // لو شغال لوكال ممكن تخليه مفتوح لكل النطاقات
  },
});

// ========= SOCKETS ============








server.listen(port, () => {
  console.log("Example app listening at http://localhost:4000")
});

