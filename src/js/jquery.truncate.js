!(function ($) {
  var chop = /(\s*\S+|\s)$/,
    start = /^(\S*)/;
  ($.truncate = function (html, options) {
    return $("<div></div>").append(html).truncate(options).html();
  }),
    ($.fn.truncate = function (options) {
      $.isNumeric(options) && (options = { length: options });
      var o = $.extend({}, $.truncate.defaults, options);
      return this.each(function () {
        var self = $(this);
        o.noBreaks && self.find("br").replaceWith(" ");
        var text = self.text(),
          excess = text.length - o.length;
        if ((o.stripTags && self.text(text), o.words && excess > 0)) {
          var truncated = text.slice(0, o.length).replace(chop, "").length;
          excess =
            o.keepFirstWord && 0 === truncated
              ? text.length - start.exec(text)[0].length - 1
              : text.length - truncated - 1;
        }
        excess < 0 ||
          (!excess && !o.truncated) ||
          $.each(self.contents().get().reverse(), function (i, el) {
            var $el = $(el),
              text,
              length = $el.text().length;
            return length <= excess
              ? ((o.truncated = !0), (excess -= length), void $el.remove())
              : 3 === el.nodeType
              ? (o.finishBlock
                  ? $(el.splitText(length)).replaceWith(o.ellipsis)
                  : $(el.splitText(length - excess - 1)).replaceWith(o.ellipsis),
                !1)
              : ($el.truncate($.extend(o, { length: length - excess })), !1);
          });
      });
    }),
    ($.truncate.defaults = {
      stripTags: !1,
      words: !1,
      keepFirstWord: !1,
      noBreaks: !1,
      finishBlock: !1,
      length: 1 / 0,
      ellipsis: "…",
    });
})(jQuery);
