from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os

HOST = "127.0.0.1"
PORT = 8000

os.chdir(os.path.dirname(os.path.abspath(__file__)))

print(f"Terminal iniciado em http://{HOST}:{PORT}")
print("Pressione Ctrl+C para encerrar.")

server = ThreadingHTTPServer((HOST, PORT), SimpleHTTPRequestHandler)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nServidor encerrado.")
finally:
    server.server_close()
