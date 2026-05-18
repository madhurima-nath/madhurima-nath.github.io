#!/usr/bin/env python3
"""Dev server that sends Cache-Control: no-store on every response."""
import os
from http.server import SimpleHTTPRequestHandler, HTTPServer

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    server = HTTPServer(('', 8080), NoCacheHandler)
    print('Serving http://localhost:8080 (no-cache)')
    server.serve_forever()
