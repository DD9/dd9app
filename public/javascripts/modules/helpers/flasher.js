const flashContainer = $('.flasher');

function flash(status, message) {
  // Show
  flashContainer.addClass(status);
  flashContainer[0].innerHTML = `<div class="flash-text">${message}</div>`;
  flashContainer.removeClass('closed');

  // Timeout
  const timeout = setTimeout(function() {
    flashContainer.addClass('closed');
    flashContainer.removeClass(status);
    }, 3150);

  // Click through
  flashContainer.on('click', function() {
    clearTimeout(timeout);
    flashContainer.addClass('closed');
    flashContainer.removeClass(status);
  });
}

// Global NodeJS flash functionality
const nodeFlash = $('.node-flash');
nodeFlash.addClass('slider');
const timeout = setTimeout(function() { nodeFlash.addClass('closed'); }, 3150);
flashContainer.on('click', function() {
  clearTimeout(timeout);
  flashContainer.addClass('closed');
});

export default flash