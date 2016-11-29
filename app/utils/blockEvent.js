function blockEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

export default blockEvent;
