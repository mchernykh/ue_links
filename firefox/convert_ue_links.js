function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(result) {
  var path = result[Object.keys(result)[0]] || "https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/";

  change_links = function () {
    var references = document.getElementById('references');
    if (references == null) {
      return;
    }
    var links = references.querySelectorAll('tr > td > p');
    for (var i = 3; i < links.length; i = i + 2) {
      var paragraph = links[i];
      var address = paragraph.innerHTML;

      var address_prefix = path;
      var h_address = address_prefix + address;       
      paragraph.innerHTML = '<a href="' + h_address + '">' + address + '</a>';

      if (links.length == 4) {
        var cpp_address = h_address.substring(0, h_address.length - 1) + 'cpp';
        cpp_address = cpp_address.replace('/Public/', '/Private/');
        cpp_address = cpp_address.replace('/Classes/', '/Private/');
        paragraph.innerHTML = paragraph.innerHTML + ' <a href="' + cpp_address + '">cpp?</a>';
      }
    }
  };

  var state = document.readyState;
  if(state === 'interactive' || state === 'complete') {
    change_links();
  } else {
    document.addEventListener("DOMContentLoaded", change_links, false);
  }
}

var getting = browser.storage.sync.get("uepath");
getting.then(onGot, onError);
