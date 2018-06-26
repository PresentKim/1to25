// Element Control
var ElementControl = function(elementId, data, fomatter, filter) {
  this.element = document.getElementById(elementId);
  this.fomatter = isFunction(fomatter) ? fomatter : DefaultFomatter;
  this.filter = isFunction(filter) ? filter : DefaultFilter;
  this.setData(data ? data : 0);
};

ElementControl.prototype.setData = function(data, ignore, fomatter) {
  this.data = data;
  if (!ignore) {
    this.element.innerText = isFunction(fomatter) ? fomatter(data) : this.fomatter(data);
  }
};

ElementControl.prototype.getData = function() {
  return this.data;
};

ElementControl.prototype.getElement = function() {
  return this.element;
};

// Fomatters
var DefaultFomatter = function(data) {
  return data;
}

var CellFomatter = function(data) {
  return data == 0 ? '' : data;
}

var TimeFomatter = function(data) {
  var pad2 = function(number) {
    for (var result = number + ''; 2 > result.length; result = '0' + result);
    return result;
  }

  return (
    pad2(Math.floor(data % (1000 * 60 * 60) / (1000 * 60))) + ':' +
    pad2(Math.floor(data % (1000 * 60) / 1000)) + ':' +
    pad2(Math.floor(data % 1000 / 10))
  );
}

// Filter
var DefaultFilter = function(data) {
  return data;
}

// other functions
function isFunction(v) {
  var getType = {};
  return v && getType.toString.call(v) === '[object Function]';
}

var createElement = function(tag, attributes) {
  var element = document.createElement(tag);
  if (attributes) {
    if (attributes.id != undefined)
      element.setAttribute('id', attributes.id);
    if (attributes.class != undefined)
      element.setAttribute('class', attributes.class);
  }
  return element;
};
