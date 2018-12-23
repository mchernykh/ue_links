chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({uepath: "https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/"}, function() {
    console.log("uepath is set.");
  });
});
