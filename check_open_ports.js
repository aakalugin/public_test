function scan(nameElem, resultElem, hostport, serviceName, uriPath) {
  var url;
  if (hostport.split(":")[1] == 443) {
    url = 'https://' + hostport + uriPath;
  } else {
    url = 'http://' + hostport + uriPath;
  }

  nameElem.textContent = url;

  var image = new Image();
  image.onerror = function() {
    if (!image) {
      return;
    }
    console.log("onerror " + url);
    image = undefined;
    if (resultElem.textContent == '?') {
      resultElem.textContent = "open";
    }
  };
  image.onload = image.onerror;
  //image.onload = function() {
  //  if (!image) {
  //    return;
  //  }
  //  console.log("onload " + url);
  //  image = undefined;
  //  resultElem.textContent = serviceName;
  //}
  image.src = url;
  setTimeout(function() {
    if (!image) {
      return;
    }
    console.log("timeout " + url);
    image = undefined;
    if (resultElem.textContent == '?') {
      resultElem.textContent = "timeout";
    }
  }, 2000);
}

function portscan() {
  scan(document.getElementById("host1name"), document.getElementById("host1result"), "localhost:8000", "web server on 8000", "");
  scan(document.getElementById("host2name"), document.getElementById("host2result"), "localhost:8080", "web server on 8080", "");
  scan(document.getElementById("host3name"), document.getElementById("host3result"), "staff.yandex-team.ru:443", "staff", "");
  scan(document.getElementById("host4name"), document.getElementById("host4result"), "staff1.yandex-team.ru:443", "staff", "");
  scan(document.getElementById("host5name"), document.getElementById("host5result"), "wiki.yandex-team.ru:443", "wiki", "");
}
