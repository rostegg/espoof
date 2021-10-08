# ESpoof

[![Compatibility](https://img.shields.io/badge/python-3.5-brightgreen.svg)](https://github.com/rostegg/email-spoofing-server)
[![License Badge](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rostegg/email-spoofing-server/blob/master/LICENSE)

![ServerExample](../assets/example_run.png?raw=true)

# Server usage
```
python3 email-spoof-server.py
Options:
    -i, --hip               The address on which the server will be deployed (by default localhost)
    -p, --hport             Port on which the server will be deployed (by default 8081)
    -s, --sip               The address of SMTP server (by default localhost)
    -d, --sport             Port of SMTP server (by default 25)
    -c, --certificate       Path to SSL certificate for https connection (can be generated using openssl)  
```

# Webextension usage
:warning: Extension was just experiment with KotlinToJs, better write webextensions in JS to avoid problems with the correct work of the extensions

You can install [webextension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions) from package or temporarily install the addon by adding a manifest.json file (tutorial for firefox [here](https://developer.mozilla.org/en-US/docs/Tools/about%3Adebugging))

## Build
```
chmod +x webextension/build.sh
sh webextension/build.sh
```
Or just use command in 'webextension' directory: `./gradlew runDceKotlinJs --continuous`

Extension was tested only on Firefox

After installation in the sidebar, the message sending panel will appear

![ExtensionExample](../assets/webext_run.PNG?raw=true)

After installation, you need to configure the options in the options section

![OptionsExample](../assets/webext_option.png?raw=true)

More examples in "Example of usage" section

# How it work

A http server is being deployed, which receives requests (in json format) to send a message.
Then the connection to the SMTP server opens, which sends the [SMTP commands](http://www.samlogic.net/articles/smtp-commands-reference.htm) via socket, replacing the header "MAIL FROM"

# Message format

You can access the server using POST request with json data:
```
{
  "from":"from@mail.com" <email, from which the letter will come>
  "to": "to@mail.com" <email, where to send message>
  "sign": "Adam <from@mail.com>" <signature of message>
  "subject": "Test information" <subject of letter>
  "text": "This is a test message" <body of letter>
  "user": "user" <optional parameter, require if SMTP server authentication enabled>
  "pass": "password" <optional parameter, require if SMTP server authentication enabled>
  "file": "JVBERi0xLjcKJeLjz9MKOSAwIG9iago8PCAvVHlwZSAvUG...." <optional parameter, base64 content of attachment file>
  "contentType": "aplication/pdf" <optional parameter, MIME type of file>
  "file_name": "file.pdf" <optional parameter, name of attachment file>
}
```
# Access to server through https
If you want to access the server from webextension via https, first you need to add a certificate
In firefox it can be done simply: 
    - FireFox -> Options -> Advanced -> Certificates -> View Certificates -> Servers -> Add Exception.

# Example of usage

* Run email-spoof-server.py (for SMTP server i use [Postfix](https://en.wikipedia.org/wiki/Postfix_(software)))
* Run extension and fill in the necessary fields in the settings section 
* Fill in the fields in the message sending panel, for example:


![Usage1](../assets/example_1.png?raw=true)

* The server responds to the message

![Usage2](../assets/example_2.png?raw=true)

* A status message will appear in the browser

![Usage3](../assets/example_3.PNG?raw=true)

* Enjoy

![Usage3](../assets/example_4.png?raw=true)



