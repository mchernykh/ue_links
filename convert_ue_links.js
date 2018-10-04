function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(result) {
  var path = result[Object.keys(result)[0]] || "https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/";

  window.addEventListener("load", function () {
    var references = document.getElementById('references');
    if (references == null) {
      return;
    }
    var descs = references.getElementsByTagName('td');
    if (descs.length != 4) {
      return;
    }

    var link_cell = descs[descs.length - 1];
    var elem = references.querySelectorAll('tr:last-child >td:last-child > p');
    var paragraph = elem[0];
    var address = paragraph.innerHTML;

    var address_prefix = path;
    var h_address = address_prefix + address;       
    paragraph.innerHTML = '<a href="' + h_address + '">' + address + '</a>';

    cpp_address = h_address.substring(0, h_address.length - 1) + 'cpp';
    cpp_address = cpp_address.replace('/Public/', '/Private/');
    cpp_address = cpp_address.replace('/Classes/', '/Private/');
    paragraph.innerHTML = paragraph.innerHTML + ' <a href="' + cpp_address + '">cpp?</a>';

  }, false);
}

var getting = browser.storage.sync.get("uepath");
getting.then(onGot, onError);
