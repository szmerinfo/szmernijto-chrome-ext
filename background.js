chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    function: () => {
      chrome.storage.local.get("previous_tab_data", ({ previous_tab_data }) => {
        if (window.location.href.includes('szmer.info/create_post') && previous_tab_data) {
          fetch(`https://szmer.info/api/v3/post/site_metadata?url=${previous_tab_data.url}`).then(e => {
            if (e.status === 200) return e.json();
            return false;
          }).then(data => {
            const el_url = document.getElementById('post-url');
            el_url.value = data && data.url ? data.url : previous_tab_data.url;
            el_url.dispatchEvent(new Event('input', { 'bubbles': true, 'cancelable': true }));
  
            const el_title = document.getElementById('post-title');
            el_title.value = data && data.title ? data.title : previous_tab_data.title;
            el_title.dispatchEvent(new Event('input', { 'bubbles': true, 'cancelable': true }));
            
            chrome.storage.local.remove("previous_tab_data");
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
