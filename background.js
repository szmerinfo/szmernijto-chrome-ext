chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    function: () => {
      chrome.storage.sync.get("previous_tab_data", ({ previous_tab_data }) => {
        if (window.location.href.includes('szmer.info/create_post') && previous_tab_data) {
          fetch(`https://szmer.info/iframely/oembed?url=${previous_tab_data.url}`).then(e => {
            if (e.status === 200) return e.json();
            return false;
          }).then(data => {
            document.getElementById('post-url').value = data && data.url ? data.url : previous_tab_data.url;
            document.getElementById('post-title').value = data && data.title ? data.title : previous_tab_data.title;
            document.querySelector('[id^="comment-textarea-"]').value = data && data.description ? data.description : '';
            chrome.storage.sync.remove("previous_tab_data");
          });
        }
      });
    },
  });
}, {
  url: [{
    hostContains: 'szmer.info'
  }],
});
