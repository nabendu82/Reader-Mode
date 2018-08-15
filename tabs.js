// Zoom constants. Define Max, Min, increment and default values
const ZOOM_INCREMENT = 0.2;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.3;
const DEFAULT_ZOOM = 1;


function getCurrentWindowTabs() {
  return browser.tabs.query({currentWindow: true});
}

document.addEventListener("click", (e) => {
  function callOnActiveTab(callback) {
    getCurrentWindowTabs().then((tabs) => {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab, tabs);
        }
      }
    });
}

if (e.target.id === "tabs-create-reader") {
  callOnActiveTab((tab) => {
    browser.tabs.toggleReaderMode(tab.id)
      .then()
      .catch(error => alert(error));
  });
}

else if (e.target.id === "tabs-add-zoom") {
  callOnActiveTab((tab) => {
    var gettingZoom = browser.tabs.getZoom(tab.id);
    gettingZoom.then((zoomFactor) => {
      //the maximum zoomFactor is 3, it can't go higher
      if (zoomFactor >= MAX_ZOOM) {
        alert("Tab zoom factor is already at max!");
      } else {
        var newZoomFactor = zoomFactor + ZOOM_INCREMENT;
        //if the newZoomFactor is set to higher than the max accepted
        //it won't change, and will never alert that it's at maximum
        newZoomFactor = newZoomFactor > MAX_ZOOM ? MAX_ZOOM : newZoomFactor;
        browser.tabs.setZoom(tab.id, newZoomFactor);
      }
    });
  });
}

else if (e.target.id === "tabs-decrease-zoom") {
  callOnActiveTab((tab) => {
    var gettingZoom = browser.tabs.getZoom(tab.id);
    gettingZoom.then((zoomFactor) => {
      //the minimum zoomFactor is 0.3, it can't go lower
      if (zoomFactor <= MIN_ZOOM) {
        alert("Tab zoom factor is already at minimum!");
      } else {
        var newZoomFactor = zoomFactor - ZOOM_INCREMENT;
        //if the newZoomFactor is set to lower than the min accepted
        //it won't change, and will never alert that it's at minimum
        newZoomFactor = newZoomFactor < MIN_ZOOM ? MIN_ZOOM : newZoomFactor;
        browser.tabs.setZoom(tab.id, newZoomFactor);
      }
    });
  });
}

else if (e.target.id === "tabs-default-zoom") {
  callOnActiveTab((tab) => {
    var gettingZoom = browser.tabs.getZoom(tab.id);
    gettingZoom.then((zoomFactor) => {
      if (zoomFactor == DEFAULT_ZOOM) {
        alert("Tab zoom is already at the default zoom factor");
      } else {
        browser.tabs.setZoom(tab.id, DEFAULT_ZOOM);
      }
    });
  });
}


  e.preventDefault();
});


