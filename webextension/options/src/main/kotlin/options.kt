fun main(args: Array<String>) {
    init()

    saveAddressBtn.onclick = {
        if (!Regex("^(http|https)://(.*):[0-9]{1,5}").matches(serverAddressInput.value)){
            printNotification("Error", "Invalid server format! (must be http|https://IP(DOMAIN):PORT)")
        }
        else{
            val address: dynamic = object{}
            address["address"] = serverAddressInput.value
            browser.storage.local.set(address)
            printNotification("Success", "Address successfully saved.")
        }

    }
    savePasswordBtn.onclick = {
        val pass: dynamic = object{}
        pass["pass"] = passwordInput.value
        console.log(passwordInput.value)
        browser.storage.local.set(pass)
        printNotification("Success", "Password successfully saved.")
    }
    saveUsernameBtn.onclick = {
        val user: dynamic = object{}
        user["user"] = usernameInput.value
        browser.storage.local.set(user)
        printNotification("Success", "Username successfully saved.")
    }
}