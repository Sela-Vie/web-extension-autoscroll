// pixels per interval
let scroll_speed_horizontal = 0;
let scroll_speed_vertical = 1; 
let scroll_interval_ms = 100

setInterval(
    () => window.scrollBy(
        scroll_speed_horizontal, scroll_speed_vertical
    ), scroll_interval_ms
);