
import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLTextAreaElement
import kotlin.browser.document

external val browser: dynamic

val fromMail = document.querySelector("#from-mail") as HTMLInputElement
val toMail = document.querySelector("#to-mail") as HTMLInputElement
val subject = document.querySelector("#subject") as HTMLInputElement
val signature = document.querySelector("#sign") as HTMLInputElement
val text = document.querySelector("#body-mail") as HTMLTextAreaElement
var clearBtn = document.querySelector("#clear-btn") as HTMLButtonElement
var sendBtn = document.querySelector("#send-btn") as HTMLButtonElement
var attachBtn = document.querySelector("#attach-btn") as HTMLInputElement

fun printNotification(title:String,message:String){
    browser.notifications.create(jsObject {
        type="basic"
        this.title = title
        this.message = message
        iconUrl = browser.extension.getURL("icons/email.svg")
    })
}


inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}