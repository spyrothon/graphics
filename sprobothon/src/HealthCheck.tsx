import http from "http";

export default http.createServer(function (req, res) {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("Alive!");
  res.end();
});
