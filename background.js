chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    function: () => {
      chrome.storage.sync.get("previous_tab_data", ({ previous_tab_data }) => {
        const el_url = document.getElementById('post-url');
        const el_title = document.getElementById('post-title');
        fetch(`https://szmer.info/iframely/oembed?url=${previous_tab_data.url}`).then(e => {
          if (e.status === 200) return e.json();
          return false;
        }).then(data => {
          if (data) {
            el_url.value = data.url ? data.url : previous_tab_data.url;
            el_title.value = data.title ? data.title : previous_tab_data.title;
            document.querySelector('[id^="comment-textarea-"]').value = data.description ? data.description : '';
          } else {
            el_url.value = previous_tab_data.url;
            el_title.value = previous_tab_data.title;
          }
        });
      });
    },
  });
}, {
  url: [{
    hostContains: 'szmer.info'
  }],
});
