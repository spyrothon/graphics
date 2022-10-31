export function fuzzysearch(term: string, source: string) {
  var sourceLength = source.length;
  var termLength = term.length;
  if (termLength > sourceLength) {
    return false;
  }
  if (termLength === sourceLength) {
    return term === source;
  }
  outer: for (var i = 0, j = 0; i < termLength; i++) {
    var nch = term.charCodeAt(i);
    while (j < sourceLength) {
      if (source.charCodeAt(j++) === nch) {
        continue outer;
      }
    }

    return false;
  }
  return true;
}
