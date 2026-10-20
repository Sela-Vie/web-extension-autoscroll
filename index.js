
// ==============================================
async function toggleOnOff(){
	let [tab] = await chrome.tabs.query({active:true});
	chrome.scripting.executeScript({
		target: {tabId:tab.id},
		func: ()=>{
			// pixels per interval
			let scroll_speed_horizontal = 0;
			let scroll_speed_vertical = 1; 
			let scroll_interval_ms = 100
			setInterval(
				() => window.scrollBy(
					scroll_speed_horizontal, scroll_speed_vertical
				), scroll_interval_ms
			);
			// alert('toggle_on_off');
		}
	});
}
async function updateValues(){
	let [tab] = await chrome.tabs.query({active:true});
	chrome.scripting.executeScript({
		target: {tabId:tab.id},
		func: ()=>{
			alert('update_values');
		}
	});
}

// ==============================================
document.getElementById("toggle_on_off")
	.addEventListener("click", toggleOnOff)
document.getElementById("update_values")
	.addEventListener("click", updateValues)