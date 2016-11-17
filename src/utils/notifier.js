import noty from 'noty';
// todo fix multiple notys in a row

/**
 * Show quick notification
 * @param type alert, error, success...
 * @param message
 */
export default function(type, message) {
  noty({
    theme: 'relax',
    layout: 'bottomCenter',
    timeout: 2000,
    type: type,
    text: message,
    dismissQueue: true,
    animation: {
      open: {height: 'toggle'}, // jQuery animate function property object
      close: {height: 'easeOutBounce'}, // jQuery animate function property object
      easing: 'swing', // easing
      speed: 150 // opening & closing animation speed
    }
  });
}