/**
 * Smooth scroll to window Y position
 * @param  {Number} [scrollTargetY=0] the target scrollY property of the window
 * @param  {Number} [speed=2000] time in pixels per second
 * @return {Undefined} scrolls on global window, returns nothing
 */
export default function smoothScrollY(scrollTargetY = 0, speed = 2000) {
  const { requestAnimationFrame, scrollY, scrollTo } = window;
  const timing = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
  let currentTime = 0;

  // animation loop
  function tick() {
    currentTime += 1 / 60;

    const time = currentTime / timing;
    const factor = easeInOutQuint(time);

    if (time < 1) {
      requestAnimationFrame(tick);
      scrollTo(0, scrollY + ((scrollTargetY - scrollY) * factor));
    } else {
      scrollTo(0, scrollTargetY);
    }
  }

  // initial call to kick off animation
  tick();
}

/**
 * Timing function
 * @param  {Number} [num=0] timing
 * @return {Number} modified timing
 */
function easeInOutQuint(num = 0) {
  const doubled = num * 2;
  if (doubled < 1) {
    return 0.5 * (doubled ** 5);
  }
  return 0.5 * (((doubled - 2) ** 5) + 2);
}
