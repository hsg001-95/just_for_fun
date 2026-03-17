import http.server
import socketserver
import base64
import os

PORT = 5500

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/save_screenshot':
            length = int(self.headers.get('content-length', 0))
            body = self.rfile.read(length)
            
            data_str = body.decode('utf-8')
            if data_str.startswith('data:image/png;base64,'):
                base64_data = data_str.split(',')[1]
                image_data = base64.b64decode(base64_data)
                
                # Save quietly to current working directory
                filepath = os.path.join(os.getcwd(), 'She_Said_Yes_screenshot.png')
                with open(filepath, 'wb') as f:
                    f.write(image_data)
                
                self.send_response(200)
                self.send_header('Content-Type', 'text/plain')
                self.end_headers()
                self.wfile.write(b'Saved successfully')
            else:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Invalid data')
        else:
            self.send_response(404)
            self.end_headers()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving custom HTTP server with silent save feature at port {PORT}")
    httpd.serve_forever()
