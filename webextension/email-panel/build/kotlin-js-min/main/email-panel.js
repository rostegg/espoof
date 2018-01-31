if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'email-panel'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'email-panel'.");
}
this['email-panel'] = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var equals = Kotlin.equals;
  var fromMail;
  var toMail;
  var subject;
  var signature;
  var text;
  var clearBtn;
  var sendBtn;
  var attachBtn;
  function printNotification(title, message) {
    var tmp$ = browser.notifications;
    var o = {};
    o.type = 'basic';
    o.title = title;
    o.message = message;
    o.iconUrl = browser.extension.getURL('icons/email.svg');
    tmp$.create(o);
  }
  function main$lambda(it) {
    sendMail();
    return Unit;
  }
  function main$lambda_0(it) {
    clear();
    return Unit;
  }
  function main(args) {
    sendBtn.onclick = main$lambda;
    clearBtn.onclick = main$lambda_0;
  }
  function sendMail$lambda$ObjectLiteral() {
  }
  sendMail$lambda$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: []};
  function sendMail$lambda$lambda(closure$fileReader, closure$message, closure$fileToConvert) {
    return function (it) {
      var tmp$, tmp$_0;
      var base64 = closure$fileReader.v.result;
      var contentType = ensureNotNull((tmp$ = Regex_init('data:(.*);').find_905azu$(base64)) != null ? tmp$.groupValues : null).get_za3lpa$(1);
      var data = ensureNotNull((tmp$_0 = Regex_init('base64,(.*)').find_905azu$(base64)) != null ? tmp$_0.groupValues : null).get_za3lpa$(1);
      closure$message['contentType'] = contentType;
      closure$message['file'] = data;
      closure$message['file_name'] = ensureNotNull(closure$fileToConvert.v).name;
      sendRequest(closure$message);
      return Unit;
    };
  }
  function sendMail$lambda(items) {
    var message = new sendMail$lambda$ObjectLiteral();
    message['from'] = fromMail.value;
    message['to'] = toMail.value;
    message['sign'] = signature.value;
    message['text'] = text.value;
    message['subject'] = subject.value;
    if (items['user'] != undefined && items['pass'] != undefined) {
      message['user'] = items['user'];
      message['pass'] = items['pass'];
    }
    var selectedFile = ensureNotNull(attachBtn.files);
    if (selectedFile.length > 0) {
      var fileToConvert = {v: ensureNotNull(selectedFile)[0]};
      var fileReader = {v: new FileReader()};
      fileReader.v.onload = sendMail$lambda$lambda(fileReader, message, fileToConvert);
      fileReader.v.readAsDataURL(ensureNotNull(fileToConvert.v));
    }
     else {
      sendRequest(message);
    }
    return Unit;
  }
  function sendMail() {
    if (validateFields()) {
      browser.storage.local.get().then(sendMail$lambda);
    }
     else {
      printNotification('Error', 'It looks like some fields are empty');
    }
  }
  function validateFields() {
    return !equals(fromMail.value, '') && !equals(toMail.value, '') && !equals(signature.value, '') && !equals(text.value, '') && !equals(subject.value, '');
  }
  function sendRequest$lambda$lambda(closure$xhttp) {
    return function () {
      printNotification('Answer from server', closure$xhttp.v.response.toString());
    };
  }
  function sendRequest$lambda$lambda_0() {
    printNotification('Error', 'Error occurred while sending request.');
  }
  function sendRequest$lambda(closure$request) {
    return function (items) {
      if (items['address'] != undefined) {
        var xhttp = {v: new XMLHttpRequest()};
        xhttp.v.open('POST', items['address']);
        xhttp.v.onload = sendRequest$lambda$lambda(xhttp);
        xhttp.v.onerror = sendRequest$lambda$lambda_0;
        return xhttp.v.send(JSON.stringify(closure$request));
      }
       else {
        return printNotification('Error', 'Address of spoof server is undefined. First, add address in options.'), Unit;
      }
    };
  }
  function sendRequest(request) {
    browser.storage.local.get().then(sendRequest$lambda(request));
  }
  function clear() {
    fromMail.value = '';
    toMail.value = '';
    signature.value = '';
    text.value = '';
    attachBtn.value = '';
    subject.value = '';
  }
  _.printNotification_puj7f4$ = printNotification;
  _.main_kand9s$ = main;
  _.sendMail = sendMail;
  _.validateFields = validateFields;
  _.sendRequest_za3rmp$ = sendRequest;
  _.clear = clear;
  var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
  fromMail = Kotlin.isType(tmp$ = document.querySelector('#from-mail'), HTMLInputElement) ? tmp$ : throwCCE();
  toMail = Kotlin.isType(tmp$_0 = document.querySelector('#to-mail'), HTMLInputElement) ? tmp$_0 : throwCCE();
  subject = Kotlin.isType(tmp$_1 = document.querySelector('#subject'), HTMLInputElement) ? tmp$_1 : throwCCE();
  signature = Kotlin.isType(tmp$_2 = document.querySelector('#sign'), HTMLInputElement) ? tmp$_2 : throwCCE();
  text = Kotlin.isType(tmp$_3 = document.querySelector('#body-mail'), HTMLTextAreaElement) ? tmp$_3 : throwCCE();
  clearBtn = Kotlin.isType(tmp$_4 = document.querySelector('#clear-btn'), HTMLButtonElement) ? tmp$_4 : throwCCE();
  sendBtn = Kotlin.isType(tmp$_5 = document.querySelector('#send-btn'), HTMLButtonElement) ? tmp$_5 : throwCCE();
  attachBtn = Kotlin.isType(tmp$_6 = document.querySelector('#attach-btn'), HTMLInputElement) ? tmp$_6 : throwCCE();
  main([]);
  return _;
}(typeof this['email-panel'] === 'undefined' ? {} : this['email-panel'], kotlin);

//# sourceMappingURL=email-panel.js.map
