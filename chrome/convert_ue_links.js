function onGot(items) {
  change_links = function (uepath) {
    var references = document.getElementById('references');
    if (references == null) {
      return;
    }
    var links = references.querySelectorAll('tr > td > p');
    for (var i = 3; i < links.length; i = i + 2) {
      var paragraph = links[i];
      var address = paragraph.innerHTML;

      var h_address = uepath + address;       
      paragraph.innerHTML = '<a href="' + h_address + '">' + address + '</a>';

      if (links.length == 4) {
        var cpp_address = h_address.substring(0, h_address.length - 1) + 'cpp';
        cpp_address_m1 = cpp_address.replace('/Public/', '/Private/');
        cpp_address_m2 = cpp_address_m1.replace('/Classes/', '/Private/');
        paragraph.innerHTML = paragraph.innerHTML + ' <a href="' + cpp_address_m2 + '">cpp?</a>';
      }
    }
  };

  change_links(items.uepath);
}

chrome.storage.sync.get("uepath", onGot);
