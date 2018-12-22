function saveOptions(e) {
  e.preventDefault();
  var store = {}
  store["uepath"] = document.querySelector("#uepath").value;
  browser.storage.sync.set(store);
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#uepath").value = result[Object.keys(result)[0]] || "https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("uepath");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
