/*! Window Blind Animation for Text - v0.1.0 - 2013-07-13
* https://github.com/noslouch/text-blinds
* Copyright (c) 2013 noSlouch; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.awesome = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.awesome = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.awesome.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.awesome.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].awesome = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
