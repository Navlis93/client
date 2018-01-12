$ = require('jquery')

# Public: Wraps the DOM Nodes within the provided range with a highlight
# element of the specified class and returns the highlight Elements.
#
# normedRange - A NormalizedRange to be highlighted.
# cssClass - A CSS class to use for the highlight (default: 'annotator-hl')
#
# Returns an array of highlight Elements.
exports.highlightRange = (normedRange, cssClass='annotator-hl', color='', replace=undefined, annotation=undefined) ->
  white = /^\s*$/

  # A custom element name is used here rather than `<span>` to reduce the
  if color
    style = "style='background-color: ##{color}'"
  else
    style = ''
  # likelihood of highlights being hidden by page styling.
  hl = $("<hypothesis-highlight class='#{cssClass}' #{style}></hypothesis-highlight>")
  # Ignore text nodes that contain only whitespace characters. This prevents
  # spans being injected between elements that can only contain a restricted
  # subset of nodes such as table rows and lists. This does mean that there
  # may be the odd abandoned whitespace node in a paragraph that is skipped
  # but better than breaking table layouts.
  nodes = $(normedRange.textNodes()).filter((i) -> not white.test @nodeValue)
  if annotation?
    annotation.originals = nodes

  if replace
    newNode = $(document.createTextNode(replace))
    nodes.first().replaceWith(newNode)
    nodes.slice(1).remove()
    nodes = newNode
  res = nodes.wrap(hl).parent().toArray()
  refreshSpaces(normedRange.commonAncestor)
  return res


refreshSpaces = (element) ->
  # make sure that spaces inbetween elements are handled correctly
  if not element.oldWhiteSpace?
    element.oldWhiteSpace = [element.style.whiteSpace]
  window.requestAnimationFrame( ->
    if element.oldWhiteSpace?
      element.style.whiteSpace = element.oldWhiteSpace[0]
      element.oldWhiteSpace = undefined
  )
  element.style.whiteSpace = "pre"

exports.removeHighlights = (highlights, originals) ->
  for h in highlights when h.parentNode?
    refreshSpaces(h.parentNode)
    if originals?
      $(h).replaceWith(originals)
    else
      $(h).replaceWith(h.childNodes)


# Get the bounding client rectangle of a collection in viewport coordinates.
# Unfortunately, Chrome has issues[1] with Range.getBoundingClient rect or we
# could just use that.
# [1] https://code.google.com/p/chromium/issues/detail?id=324437
exports.getBoundingClientRect = (collection) ->
  # Reduce the client rectangles of the highlights to a bounding box
  rects = collection.map((n) -> n.getBoundingClientRect())
  return rects.reduce (acc, r) ->
    top: Math.min(acc.top, r.top)
    left: Math.min(acc.left, r.left)
    bottom: Math.max(acc.bottom, r.bottom)
    right: Math.max(acc.right, r.right)
