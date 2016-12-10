/**
 * Calls preventDefault and stopPropagation on event
 * @param  {object} event DOM event
 * @return {object} event object
 */
function blockEvent(event) {
  event.preventDefault();
  event.stopPropagation();
  return event;
}

export default blockEvent;
