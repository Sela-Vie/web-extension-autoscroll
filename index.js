
// ==============================================

async function toggleOnOff(){
	const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  // get values
  const {
    scroll_speed_horizontal = 0,
    scroll_speed_vertical = 1,
    scroll_interval_ms = 100
  } = await browser.storage.local.get([
    "scroll_speed_horizontal",
    "scroll_speed_vertical",
    "scroll_interval_ms"
  ]);

  // scroll based on values
	await chrome.scripting.executeScript({
    target: { 
      tabId: tab.id 
    },
    func: (
      scroll_speed_horizontal,
      scroll_speed_vertical,
      scroll_interval_ms
    ) => {
      clearInterval(window.__scrollInterval);
      window.__scrollInterval = null;

      // defaults to false(not scrolling) on undefined or null on startup
      if (window.__is_scrolling === false){
        window.__is_scrolling = true
      }else{
        window.__is_scrolling = false
      }

      if(!window.__is_scrolling){
        window.__scrollInterval = setInterval(
          () => window.scrollBy(
            scroll_speed_horizontal, scroll_speed_vertical
          ), scroll_interval_ms
        );
      }
    },
    args:[
      scroll_speed_horizontal,
      scroll_speed_vertical,
      scroll_interval_ms
    ]
  });
}


// ==============================================

async function setValuesDefault(){
  // default values if the keys arent found in storage.local
  const {
    scroll_speed_horizontal = 0,
    scroll_speed_vertical = 1,
    scroll_interval_ms = 100
  } = await browser.storage.local.get([
    "scroll_speed_horizontal",
    "scroll_speed_vertical",
    "scroll_interval_ms"
  ]);

  document.getElementById("scroll_speed_horizontal").value = scroll_speed_horizontal;
  document.getElementById("scroll_speed_vertical").value = scroll_speed_vertical;
  document.getElementById("scroll_interval_ms").value = scroll_interval_ms;
}

async function updateValues(){
	const scroll_speed_horizontal = document.getElementById("scroll_speed_horizontal").value;
	const scroll_speed_vertical = document.getElementById("scroll_speed_vertical").value;
	const scroll_interval_ms = document.getElementById("scroll_interval_ms").value;
	
  await browser.storage.local.set({ "scroll_speed_horizontal": scroll_speed_horizontal });
  await browser.storage.local.set({ "scroll_speed_vertical": scroll_speed_vertical });
  if (scroll_interval_ms >= 0){
    await browser.storage.local.set({ "scroll_interval_ms": scroll_interval_ms });
  }
  
  let [tab] = await chrome.tabs.query({active:true});
	chrome.scripting.executeScript({
		target: {tabId:tab.id},
		func: (scroll_speed_horizontal, scroll_speed_vertical, scroll_interval_ms)=>{
      if (scroll_interval_ms < 0){
        alert("scroll_interval_ms >= 0 pls")
        exit()
      }
      // alert(
      //   'scroll_speed_horizontal: ' + scroll_speed_horizontal + '\n' +
      //   'scroll_speed_vertical: ' + scroll_speed_vertical + '\n' +
      //   'scroll_interval_ms: ' + scroll_interval_ms
      // );
    },
    args: [scroll_speed_horizontal, scroll_speed_vertical, scroll_interval_ms]
	});
  toggleOnOff()
  toggleOnOff()
}

// ==============================================
document.getElementById("toggle_on_off")
	.addEventListener("click", toggleOnOff)
document.getElementById("update_values")
	.addEventListener("click", updateValues)

setValuesDefault()