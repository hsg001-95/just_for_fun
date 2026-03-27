import http.server
import socketserver

PORT = 5500

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving HTTP at port {PORT}")
    httpd.serve_forever()
