
import org.w3c.dom.HTMLAnchorElement
import org.w3c.dom.HTMLInputElement
import kotlin.browser.document

external val browser: dynamic

val serverAddressInput = document.querySelector("#server-address") as HTMLInputElement
val usernameInput = document.querySelector("#username") as HTMLInputElement
val passwordInput = document.querySelector("#password") as HTMLInputElement
var saveAddressBtn = document.querySelector("#save-address-btn") as HTMLAnchorElement
var saveUsernameBtn = document.querySelector("#save-username-btn") as HTMLAnchorElement
var savePasswordBtn = document.querySelector("#save-password-btn") as HTMLAnchorElement

fun init(){
    browser.storage.local.get().then({ items ->
        var address = items["address"]
        var pass = items["pass"]
        var user = items["user"]
        if (address != undefined){
            serverAddressInput.value = address
        }
        if (pass != undefined){
            passwordInput.value = pass
        }
        if (user != undefined){
            usernameInput.value = user
        }
    })
}

inline fun jsObject(init: dynamic.() -> Unit): dynamic {
    val o = js("{}")
    init(o)
    return o
}

fun printNotification(title:String,message:String){
    browser.notifications.create(jsObject {
        type="basic"
        this.title = title
        this.message = message
        iconUrl = browser.extension.getURL("icons/email.svg")
    })
}