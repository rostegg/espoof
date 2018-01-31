if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'options'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'options'.");
}
var options = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var serverAddressInput;
  var usernameInput;
  var passwordInput;
  var saveAddressBtn;
  var saveUsernameBtn;
  var savePasswordBtn;
  function init$lambda(items) {
    var address = items['address'];
    var pass = items['pass'];
    var user = items['user'];
    if (address != undefined) {
      serverAddressInput.value = address;
    }
    if (pass != undefined) {
      passwordInput.value = pass;
    }
    if (user != undefined) {
      usernameInput.value = user;
    }
    return Unit;
  }
  function init() {
    browser.storage.local.get().then(init$lambda);
  }
  var jsObject = defineInlineFunction('options.jsObject_5ij4lk$', function (init) {
    var o = {};
    init(o);
    return o;
  });
  function printNotification(title, message) {
    var tmp$ = browser.notifications;
    var o = {};
    o.type = 'basic';
    o.title = title;
    o.message = message;
    o.iconUrl = browser.extension.getURL('icons/email.svg');
    tmp$.create(o);
  }
  function main$lambda$ObjectLiteral() {
  }
  main$lambda$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda(it) {
    if (!Regex_init('^(http|https)://(.*):[0-9]{1,5}').matches_6bul2c$(serverAddressInput.value)) {
      printNotification('Error', 'Invalid server format! (must be http|https://IP(DOMAIN):PORT)');
    }
     else {
      var address = new main$lambda$ObjectLiteral();
      address['address'] = serverAddressInput.value;
      browser.storage.local.set(address);
      printNotification('Success', 'Address successfully saved.');
    }
    return Unit;
  }
  function main$lambda$ObjectLiteral_0() {
  }
  main$lambda$ObjectLiteral_0.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda_0(it) {
    var pass = new main$lambda$ObjectLiteral_0();
    pass['pass'] = passwordInput.value;
    console.log(passwordInput.value);
    browser.storage.local.set(pass);
    printNotification('Success', 'Password successfully saved.');
    return Unit;
  }
  function main$lambda$ObjectLiteral_1() {
  }
  main$lambda$ObjectLiteral_1.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function main$lambda_1(it) {
    var user = new main$lambda$ObjectLiteral_1();
    user['user'] = usernameInput.value;
    browser.storage.local.set(user);
    printNotification('Success', 'Username successfully saved.');
    return Unit;
  }
  function main(args) {
    init();
    saveAddressBtn.onclick = main$lambda;
    savePasswordBtn.onclick = main$lambda_0;
    saveUsernameBtn.onclick = main$lambda_1;
  }
  Object.defineProperty(_, 'serverAddressInput', {
    get: function () {
      return serverAddressInput;
    }
  });
  Object.defineProperty(_, 'usernameInput', {
    get: function () {
      return usernameInput;
    }
  });
  Object.defineProperty(_, 'passwordInput', {
    get: function () {
      return passwordInput;
    }
  });
  Object.defineProperty(_, 'saveAddressBtn', {
    get: function () {
      return saveAddressBtn;
    },
    set: function (value) {
      saveAddressBtn = value;
    }
  });
  Object.defineProperty(_, 'saveUsernameBtn', {
    get: function () {
      return saveUsernameBtn;
    },
    set: function (value) {
      saveUsernameBtn = value;
    }
  });
  Object.defineProperty(_, 'savePasswordBtn', {
    get: function () {
      return savePasswordBtn;
    },
    set: function (value) {
      savePasswordBtn = value;
    }
  });
  _.init = init;
  $$importsForInline$$.options = _;
  _.jsObject_5ij4lk$ = jsObject;
  _.printNotification_puj7f4$ = printNotification;
  _.main_kand9s$ = main;
  var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
  serverAddressInput = Kotlin.isType(tmp$ = document.querySelector('#server-address'), HTMLInputElement) ? tmp$ : throwCCE();
  usernameInput = Kotlin.isType(tmp$_0 = document.querySelector('#username'), HTMLInputElement) ? tmp$_0 : throwCCE();
  passwordInput = Kotlin.isType(tmp$_1 = document.querySelector('#password'), HTMLInputElement) ? tmp$_1 : throwCCE();
  saveAddressBtn = Kotlin.isType(tmp$_2 = document.querySelector('#save-address-btn'), HTMLAnchorElement) ? tmp$_2 : throwCCE();
  saveUsernameBtn = Kotlin.isType(tmp$_3 = document.querySelector('#save-username-btn'), HTMLAnchorElement) ? tmp$_3 : throwCCE();
  savePasswordBtn = Kotlin.isType(tmp$_4 = document.querySelector('#save-password-btn'), HTMLAnchorElement) ? tmp$_4 : throwCCE();
  main([]);
  Kotlin.defineModule('options', _);
  return _;
}(typeof options === 'undefined' ? {} : options, kotlin);
