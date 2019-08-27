function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a
  // flash, so some of these are just precautions. However in
  // Internet Explorer the element is visible whilst the popup
  // box asking the user for permission for the web page to
  // copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

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
      address_with_slashes = address.replace('&#47;', '/');
      var h_address = address_prefix + address_with_slashes;       
      paragraph.innerHTML = '<a id="header_id_for_clipboard" href="' + h_address + '">' + address + '</a>';
      // paragraph.innerHTML = '<button onclick="copyTextToClipboard(\'' + address_with_slashes + '\')">Copy</button> ' + paragraph.innerHTML;
      
      if (links.length == 4) {
        var cpp_address = h_address.substring(0, h_address.length - 1) + 'cpp';
        cpp_address = cpp_address.replace('/Public/', '/Private/');
        cpp_address = cpp_address.replace('/Classes/', '/Private/');
        paragraph.innerHTML = paragraph.innerHTML + ' <a href="' + cpp_address + '">cpp?</a>';
      }

      var inputElement = document.createElement('input');
      inputElement.type = "button";
      inputElement.value = "Copy";
      inputElement.addEventListener('click', function(){
        copyTextToClipboard(address_with_slashes);
      });

      paragraph.insertBefore(inputElement, paragraph.firstChild);
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
