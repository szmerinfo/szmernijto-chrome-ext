SzmerSzer.addEventListener("click", async () => {
  let [ tab ] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.local.set({ previous_tab_data: tab });
  chrome.tabs.create({url: "https://szmer.info/create_post"});
});
