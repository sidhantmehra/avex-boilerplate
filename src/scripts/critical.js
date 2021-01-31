async function checkifExist(url) {
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        throw new Error("Not found");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function loadjscssfile(filename, filetype) {
  if (filetype == "js") {
    //if filename is a external JavaScript file
    var exist = await checkifExist(filename);
    if (exist) {
      var fileref = document.createElement("script");
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);
    }
  } else if (filetype == "css") {
    //if filename is an external CSS file
    var exist = await checkifExist(filename);
    if (exist) {
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }
  }
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
