function cleanString(e) {
  return e.replace(/[\u25c4]/g, "")
}


function getAuthorAndTitle(e) {
  if (e) {
    var t = ""
      , n = e
      , r = e.indexOf(" - ");
    if (r > -1)
      t = e.substr(0, r),
        n = e.substr(r + 3);
    else {
      r = e.indexOf("-");
      if (r > -1)
        t = e.substr(0, r),
          n = e.substr(r + 1);
      else {
        r = e.indexOf(' "');
        if (r > -1) {
          var i = e.indexOf('"', r + 2);
          i > -1 && (t = e.substr(0, r),
            n = e.substring(r + 2, i))
        }
      }
    }
    return t = cleanString(t),
      n = cleanString(n),
    {
      author: t,
      title: n
    }
  }
  return {
    author: null,
    title: null
  }
}

