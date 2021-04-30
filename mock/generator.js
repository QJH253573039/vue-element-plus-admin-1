import Express from "express";
import bodyParser from "body-parser";
import os from "os";
import routes from "./mock";

const app = Express();
const port = process.argv[4] || 3000;

// 设置允许请求的header 解决跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization," +
    " Accept, X-Requested-With,token,language");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});


function getNetworkInterface() {
  const host = os.networkInterfaces();
  let alias = "";
  for (let h in host) {
    let face = host[h];
    face.forEach(item => {
      if (item.family === "IPv4" && item.address !== "127.0.0.1" && !item.internal && item.netmask === "255.255.255.0") {
        alias = item.address;
      }
    });
  }
  return alias;
}

const address = getNetworkInterface();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

for (let route in routes) {
  const [method, path] = route.split(" ");
  const m = method.toLowerCase();
  app[m](path, routes[route]);
}
app.listen(port, (e) => {
  console.log("\x1B[32m", "Service running successfully", "\x1B[39m", "\n");
  console.log("\x1B[32m", "You can now access the interface service!", "\x1B[39m", "\n");
  console.log(`     Local          : http://localhost:${port}`);
  console.log(`     On Your Network: http://${address}:${port}`);
});
