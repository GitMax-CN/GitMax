/**
 * Open new popup window at the center of the screen
 * @param url
 * @param title
 * @param w
 * @param h
 * @returns {Window}
 */
const popCenterWindow = (url, title, w, h) => {
  let wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  let wTop = window.screenTop ? window.screenTop : window.screenY;
  
  let left = wLeft + (window.innerWidth / 2) - (w / 2);
  let top = wTop + (window.innerHeight / 2) - (h / 2);
  return window.open(url, title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w + ', height=' + h + ', top=' + top + ', left=' + left);
};

/**
 * Get parameter value from URL
 * @param url
 * @param name
 * @returns {*} - returns parameter value if found, other wise return empty string
 */
const getUrlParam = (url, name) => {
  name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
  let regexS = "[\?&]" + name + "=([^&#]*)";
  let regex = new RegExp(regexS);
  let results = regex.exec(url);
  if (results == null)
    return "";
  else
    return results[1];
};

export {getUrlParam, popCenterWindow}