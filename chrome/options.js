function saveOptions(e) {
  e.preventDefault();
  var new_path = document.querySelector("#uepath").value;
  chrome.storage.sync.set({uepath : new_path}, function(){
    console.log("uepath is set");
  });
}

function onDOMloaded() {
  function setCurrentChoice(items) {
    document.querySelector("#uepath").value = items.uepath;
  }
  function resetToDefault() {
    console.log("test");
    var new_path = "https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/"; 
    document.querySelector("#uepath").value = new_path;
    chrome.storage.sync.set({uepath : new_path}, function(){
      console.log("uepath is set to " + new_path);
    });
  }
  chrome.storage.sync.get("uepath", setCurrentChoice);
  document.querySelector("#reset").addEventListener("click", resetToDefault);
}

 
document.addEventListener("DOMContentLoaded", onDOMloaded);
document.querySelector("form").addEventListener("submit", saveOptions);
