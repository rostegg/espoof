
import org.w3c.files.FileReader
import org.w3c.files.get
import org.w3c.xhr.XMLHttpRequest

fun main(args: Array<String>) {
    sendBtn.onclick = { sendMail() }
    clearBtn.onclick =  { clear() }
}

fun sendMail(){
    if (validateFields()){
        browser.storage.local.get().then({ items ->
            val message: dynamic = object{}
            message["from"] = fromMail.value
            message["to"] = toMail.value
            message["sign"] = signature.value
            message["text"] = text.value
            message["subject"] = subject.value
            if (items["user"] != undefined && items["pass"]!= undefined){
                message["user"] = items["user"]
                message["pass"] = items["pass"]
            }
            var selectedFile = attachBtn.files!!
            if (selectedFile.length > 0){
                var fileToConvert = selectedFile!![0]
                var fileReader = FileReader()
                fileReader.onload= {

                    var base64 = fileReader.result
                    var contentType = Regex("data:(.*);").find(base64)?.groupValues!![1]
                    var data = Regex("base64,(.*)").find(base64)?.groupValues!![1]
                    message["contentType"] = contentType
                    message["file"] = data
                    message["file_name"] = fileToConvert!!.name
                    sendRequest(message)
                }
                fileReader.readAsDataURL(fileToConvert!!)
            }
            else{
                sendRequest(message)
            }
        })
    }
    else{
        printNotification("Error", "It looks like some fields are empty")
    }

}

fun validateFields():Boolean{
    return fromMail.value != "" &&
            toMail.value != "" &&
            signature.value !="" &&
            text.value !="" &&
            subject.value !=""
}

fun sendRequest(request:dynamic){
    browser.storage.local.get().then({ items ->
        if (items["address"] != undefined){
            var xhttp :dynamic= XMLHttpRequest()
            xhttp.open("POST",items["address"])
            xhttp.onload=fun(){
                printNotification("Answer from server", "${xhttp.response}")
            }
            xhttp.onerror = fun(){
                printNotification("Error", "Error occurred while sending request.")
            }
            xhttp.send(JSON.stringify(request))
        }
        else{
            printNotification("Error", "Address of spoof server is undefined. First, add address in options.")
        }
    })
}

fun clear(){
    fromMail.value=""
    toMail.value=""
    signature.value=""
    text.value=""
    attachBtn.value=""
    subject.value=""
}