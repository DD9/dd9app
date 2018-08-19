const flashContainer = $('.flasher');
const callbackFlashTime = 1500;
const reqFlashTime = 2500;

function flash(status, message) {
  // Show
  flashContainer.addClass(status);
  flashContainer[0].innerHTML = `<div class="flash-text">${message}</div>`;
  flashContainer.removeClass('closed');

  // Timeout
  const timeout = setTimeout(function() {
    flashContainer.addClass('closed');
    flashContainer.removeClass(status);
    }, callbackFlashTime);

  // Click through
  flashContainer.on('click', function() {
    clearTimeout(timeout);
    flashContainer.addClass('closed');
    flashContainer.removeClass(status);
  });
}

// Global NodeJS-express flash integration mimics JS flashes
const nodeFlash = $('.node-flash');
nodeFlash.addClass('slider');
const timeout = setTimeout(function() { nodeFlash.addClass('closed'); }, reqFlashTime);
flashContainer.on('click', function() {
  clearTimeout(timeout);
  flashContainer.addClass('closed');
});

export default flash