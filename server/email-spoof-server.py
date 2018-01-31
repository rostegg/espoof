import argparse
from signal import signal, SIGINT
from http.server import BaseHTTPRequestHandler, HTTPServer
import sys
import json
import base64
import time
from socket import *

default_ip  = "localhost"
default_http_port = 8081
default_smtp_port = 25

# smtp commands
hello_command = 'EHLO hostname\r\n'
marker = "MARKER"
endmsg = "\r\n.\r\n"
mail_from = "MAIL FROM:<%s>\r\n"
rcpt_to = "RCPT TO:<%s>\r\n"
data_command = "DATA\r\n"
quit = "QUIT\r\n"
auth_command = "AUTH PLAIN "
auth_end = "\r\n"


header_template = """From: %s
To: %s
Subject: %s
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=%s
--%s
""" 

body_template = """Content-Type: text/plain
Content-Transfer-Encoding:8bit

%s
--%s
""" 

attach_template = """Content-Type: %s; name=\"%s\"
Content-Transfer-Encoding:base64
Content-Disposition: attachment; filename=%s
	
%s
--%s--
"""

class HTTPServer_RequestHandler(BaseHTTPRequestHandler):
	def _set_headers(self):
		self.send_response(200)
		self.send_header('Access-Control-Allow-Origin', '*')                
		self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
		self.send_header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Connection")
		self.end_headers()
	def do_OPTIONS(self):
		self._set_headers()


	def do_POST(self):
		print("- Recived POST request from %s"%(self.client_address[0]))
		print("- Headers: \n%s\n"%(str(self.headers)))
		self._set_headers()
		content_length = int(self.headers['Content-Length'])
		post_data = self.rfile.read(content_length)
		j = json.loads(post_data.decode('utf-8'))
		global smtp_result
		if results.sip!= None:
			if results.sport!= None:
				smtp_result =send_mail_request(j,results.sip,results.sport)
			else:
				smtp_result = send_mail_request(j,results.sip,default_smtp_port)
		else:
			if results.sport!= None:
				smtp_result = send_mail_request(j,default_ip, results.sport)
			else:
				smtp_result = send_mail_request(j,default_ip, default_smtp_port)
		if smtp_result[0]:
			self.wfile.write(("Message was successfully sent. %s"%(smtp_result[1])).encode())
		else:
			self.wfile.write(("Message can not be sent: %s"%(smtp_result[1])).encode())


def send_mail_request(data,ip,port):
	try:
		sckt = socket(AF_INET, SOCK_STREAM)
		sckt.connect((ip,port))
		recv = sckt.recv(1024).decode()
		print("- Connected to SMTP server, response: %s"%(recv))
		if recv[:3] != "220":
			print("- SMTP server rejected request...")
			return (False,"SMTP server rejected request with error code %s."%(recv[:3]))
		else:
			sckt.send(hello_command.encode())
			recv = sckt.recv(1024).decode()
			print("- Sended 'HELLO' command.. Response: %s"%(recv))
			if recv[:3] != "250":
				print('- Server reject connection with code 250...')
				return (False,"SMTP server rejected request after HELLO with error code %s."%(recv[:3]))
			else:
				if 'user' in data and 'pass' in data:
					auth_str = ("\x00"+data['user']+"\x00"+data['pass']).encode()
					b64_auth_str =base64.b64encode(auth_str)
					sckt.send(auth_command.encode()+b64_auth_str+auth_end.encode())
					print("- Response after authentication of <%s>: \n%s"%(data['user'],sckt.recv(1024).decode()))
				sckt.send((mail_from%(data['from'])).encode())
				sckt.send((rcpt_to%(data['to'])).encode())
				sckt.send(data_command.encode())
				sckt.send((header_template%(data['sign'],data['to'],data['subject'],marker,marker)).encode())
				sckt.send((body_template%(data['text'],marker)).encode())
				# here change filename
				if 'file' in data:
					sckt.send((attach_template%(data['contentType'],data['file_name'],data['file_name'],data['file'],marker)).encode())
				sckt.send(endmsg.encode())
				print("- Response after sending message body: \n%s"%(sckt.recv(1024).decode()))
				sckt.send(quit.encode())
				print("- Response after QUIT command: \n%s"%(sckt.recv(1024).decode()))
				sckt.close()
				return (True,"SMTP server sent message.")
	except:
		print("Unexpected error: %s"%(sys.exc_info()[0]))
		return(False,"Unexpected error: %s"%(sys.exc_info()[0]))
	        
def sigint_handler(signum, frame):
	sys.exit(1)

def run_http_server(ip,port):
	print('- Starting http-server on %s:%s'%(ip,port))
	server_address = (ip,port)
	httpd = HTTPServer(server_address, HTTPServer_RequestHandler) 
	print('- Server is runing, waiting for requests...')
	httpd.serve_forever()

def main(argv):
	print ("""                        _ __                          ____
  ___  ____ ___  ____ _(_) /  _________  ____  ____  / __/
 / _ \/ __ `__ \/ __ `/ / /  / ___/ __ \/ __ \/ __ \/ /_  
/  __/ / / / / / /_/ / / /  (__  ) /_/ / /_/ / /_/ / __/  
\___/_/ /_/ /_/\__,_/_/_/  /____/ .___/\____/\____/_/     
                               /_/                        
                                  
   ________  ______   _____  _____
  / ___/ _ \/ ___/ | / / _ \/ ___/
 (__  )  __/ /   | |/ /  __/ /    
/____/\___/_/    |___/\___/_/     
                                  
                        __        __         
   ____ ___  ____ _____/ /__     / /_  __  __
  / __ `__ \/ __ `/ __  / _ \   / __ \/ / / /
 / / / / / / /_/ / /_/ /  __/  / /_/ / /_/ / 
/_/ /_/ /_/\__,_/\__,_/\___/  /_.___/\__, /  
                                    /____/   
                    __                  
   _________  _____/ /____  ____ _____ _
  / ___/ __ \/ ___/ __/ _ \/ __ `/ __ `/
 / /  / /_/ (__  ) /_/  __/ /_/ / /_/ / 
/_/   \____/____/\__/\___/\__, /\__, /  
                         /____//____/   
""")
	parser = argparse.ArgumentParser()
	parser.add_argument('-i','--hip', action='store', dest='hip', help='The address on which the server will be deployed (by default localhost)')
	parser.add_argument('-p','--hport', action='store', dest='hport', type=int,help='Port on which the server will be deployed (by default 8081)')
	parser.add_argument('-s','--sip', action='store', dest='sip', help='The address of SMTP server (by default localhost)')
	parser.add_argument('-d','--sport', action='store', dest='sport', type=int,help='Port of SMTP server (by default 25)')
	global results
	results=parser.parse_args()
	signal(SIGINT, sigint_handler)

	if results.hip != None :
		if results.hport != None :
			run_http_server(results.hip,results.hport)
		else:
			run_http_server(results.hip,default_http_port)
	else:
		if results.hport != None :
			run_http_server(default_ip, results.hport)
		else:
			run_http_server(default_ip, default_http_port)

if __name__ == "__main__":
	main(sys.argv[1:])
