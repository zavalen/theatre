"use strict";

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
;
/**
 * Swiper 5.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 20, 2020
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Swiper = factory());
}(this, (function () { 'use strict';

    /**
     * SSR Window 2.0.0
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2020, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: May 12, 2020
     */
    /* eslint-disable no-param-reassign */
    function isObject(obj) {
        return (obj !== null &&
            typeof obj === 'object' &&
            'constructor' in obj &&
            obj.constructor === Object);
    }
    function extend(target, src) {
        if (target === void 0) { target = {}; }
        if (src === void 0) { src = {}; }
        Object.keys(src).forEach(function (key) {
            if (typeof target[key] === 'undefined')
                { target[key] = src[key]; }
            else if (isObject(src[key]) &&
                isObject(target[key]) &&
                Object.keys(src[key]).length > 0) {
                extend(target[key], src[key]);
            }
        });
    }

    var doc = typeof document !== 'undefined' ? document : {};
    var ssrDocument = {
        body: {},
        addEventListener: function () { },
        removeEventListener: function () { },
        activeElement: {
            blur: function () { },
            nodeName: '',
        },
        querySelector: function () {
            return null;
        },
        querySelectorAll: function () {
            return [];
        },
        getElementById: function () {
            return null;
        },
        createEvent: function () {
            return {
                initEvent: function () { },
            };
        },
        createElement: function () {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () { },
                getElementsByTagName: function () {
                    return [];
                },
            };
        },
        createElementNS: function () {
            return {};
        },
        importNode: function () {
            return null;
        },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: '',
        },
    };
    extend(doc, ssrDocument);

    var win = typeof window !== 'undefined' ? window : {};
    var ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: '',
        },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: '',
        },
        history: {
            replaceState: function () { },
            pushState: function () { },
            go: function () { },
            back: function () { },
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener: function () { },
        removeEventListener: function () { },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return '';
                },
            };
        },
        Image: function () { },
        Date: function () { },
        screen: {},
        setTimeout: function () { },
        clearTimeout: function () { },
        matchMedia: function () {
            return {};
        },
    };
    extend(win, ssrWindow);

    /**
     * Dom7 2.1.5
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * http://framework7.io/docs/dom.html
     *
     * Copyright 2020, Vladimir Kharlampidi
     * The iDangero.us
     * http://www.idangero.us/
     *
     * Licensed under MIT
     *
     * Released on: May 15, 2020
     */

    var Dom7 = function Dom7(arr) {
      var self = this;
      // Create array-like object
      for (var i = 0; i < arr.length; i += 1) {
        self[i] = arr[i];
      }
      self.length = arr.length;
      // Return collection with methods
      return this;
    };

    function $(selector, context) {
      var arr = [];
      var i = 0;
      if (selector && !context) {
        if (selector instanceof Dom7) {
          return selector;
        }
      }
      if (selector) {
          // String
        if (typeof selector === 'string') {
          var els;
          var tempParent;
          var html = selector.trim();
          if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
            var toCreate = 'div';
            if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
            if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
            if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
            if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
            if (html.indexOf('<option') === 0) { toCreate = 'select'; }
            tempParent = doc.createElement(toCreate);
            tempParent.innerHTML = html;
            for (i = 0; i < tempParent.childNodes.length; i += 1) {
              arr.push(tempParent.childNodes[i]);
            }
          } else {
            if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
              // Pure ID selector
              els = [doc.getElementById(selector.trim().split('#')[1])];
            } else {
              // Other selectors
              els = (context || doc).querySelectorAll(selector.trim());
            }
            for (i = 0; i < els.length; i += 1) {
              if (els[i]) { arr.push(els[i]); }
            }
          }
        } else if (selector.nodeType || selector === win || selector === doc) {
          // Node/element
          arr.push(selector);
        } else if (selector.length > 0 && selector[0].nodeType) {
          // Array of elements or instance of Dom
          for (i = 0; i < selector.length; i += 1) {
            arr.push(selector[i]);
          }
        }
      }
      return new Dom7(arr);
    }

    $.fn = Dom7.prototype;
    $.Class = Dom7;
    $.Dom7 = Dom7;

    function unique(arr) {
      var uniqueArray = [];
      for (var i = 0; i < arr.length; i += 1) {
        if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
      }
      return uniqueArray;
    }

    // Classes and attributes
    function addClass(className) {
      if (typeof className === 'undefined') {
        return this;
      }
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
          if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.add(classes[i]); }
        }
      }
      return this;
    }
    function removeClass(className) {
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
          if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.remove(classes[i]); }
        }
      }
      return this;
    }
    function hasClass(className) {
      if (!this[0]) { return false; }
      return this[0].classList.contains(className);
    }
    function toggleClass(className) {
      var classes = className.split(' ');
      for (var i = 0; i < classes.length; i += 1) {
        for (var j = 0; j < this.length; j += 1) {
          if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.toggle(classes[i]); }
        }
      }
      return this;
    }
    function attr(attrs, value) {
      var arguments$1 = arguments;

      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) { return this[0].getAttribute(attrs); }
        return undefined;
      }

      // Set attrs
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          // eslint-disable-next-line
          for (var attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
          }
        }
      }
      return this;
    }
    // eslint-disable-next-line
    function removeAttr(attr) {
      for (var i = 0; i < this.length; i += 1) {
        this[i].removeAttribute(attr);
      }
      return this;
    }
    function data(key, value) {
      var el;
      if (typeof value === 'undefined') {
        el = this[0];
        // Get value
        if (el) {
          if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
            return el.dom7ElementDataStorage[key];
          }

          var dataKey = el.getAttribute(("data-" + key));
          if (dataKey) {
            return dataKey;
          }
          return undefined;
        }
        return undefined;
      }

      // Set value
      for (var i = 0; i < this.length; i += 1) {
        el = this[i];
        if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
        el.dom7ElementDataStorage[key] = value;
      }
      return this;
    }
    // Transforms
    // eslint-disable-next-line
    function transform(transform) {
      for (var i = 0; i < this.length; i += 1) {
        var elStyle = this[i].style;
        elStyle.webkitTransform = transform;
        elStyle.transform = transform;
      }
      return this;
    }
    function transition(duration) {
      if (typeof duration !== 'string') {
        duration = duration + "ms"; // eslint-disable-line
      }
      for (var i = 0; i < this.length; i += 1) {
        var elStyle = this[i].style;
        elStyle.webkitTransitionDuration = duration;
        elStyle.transitionDuration = duration;
      }
      return this;
    }
    // Events
    function on() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var eventType = args[0];
      var targetSelector = args[1];
      var listener = args[2];
      var capture = args[3];
      if (typeof args[1] === 'function') {
        (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
        targetSelector = undefined;
      }
      if (!capture) { capture = false; }

      function handleLiveEvent(e) {
        var target = e.target;
        if (!target) { return; }
        var eventData = e.target.dom7EventData || [];
        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }
        if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
        else {
          var parents = $(target).parents(); // eslint-disable-line
          for (var k = 0; k < parents.length; k += 1) {
            if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
          }
        }
      }
      function handleEvent(e) {
        var eventData = e && e.target ? e.target.dom7EventData || [] : [];
        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }
        listener.apply(this, eventData);
      }
      var events = eventType.split(' ');
      var j;
      for (var i = 0; i < this.length; i += 1) {
        var el = this[i];
        if (!targetSelector) {
          for (j = 0; j < events.length; j += 1) {
            var event = events[j];
            if (!el.dom7Listeners) { el.dom7Listeners = {}; }
            if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
            el.dom7Listeners[event].push({
              listener: listener,
              proxyListener: handleEvent,
            });
            el.addEventListener(event, handleEvent, capture);
          }
        } else {
          // Live events
          for (j = 0; j < events.length; j += 1) {
            var event$1 = events[j];
            if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
            if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
            el.dom7LiveListeners[event$1].push({
              listener: listener,
              proxyListener: handleLiveEvent,
            });
            el.addEventListener(event$1, handleLiveEvent, capture);
          }
        }
      }
      return this;
    }
    function off() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var eventType = args[0];
      var targetSelector = args[1];
      var listener = args[2];
      var capture = args[3];
      if (typeof args[1] === 'function') {
        (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
        targetSelector = undefined;
      }
      if (!capture) { capture = false; }

      var events = eventType.split(' ');
      for (var i = 0; i < events.length; i += 1) {
        var event = events[i];
        for (var j = 0; j < this.length; j += 1) {
          var el = this[j];
          var handlers = (void 0);
          if (!targetSelector && el.dom7Listeners) {
            handlers = el.dom7Listeners[event];
          } else if (targetSelector && el.dom7LiveListeners) {
            handlers = el.dom7LiveListeners[event];
          }
          if (handlers && handlers.length) {
            for (var k = handlers.length - 1; k >= 0; k -= 1) {
              var handler = handlers[k];
              if (listener && handler.listener === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (!listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              }
            }
          }
        }
      }
      return this;
    }
    function trigger() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var events = args[0].split(' ');
      var eventData = args[1];
      for (var i = 0; i < events.length; i += 1) {
        var event = events[i];
        for (var j = 0; j < this.length; j += 1) {
          var el = this[j];
          var evt = (void 0);
          try {
            evt = new win.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true,
            });
          } catch (e) {
            evt = doc.createEvent('Event');
            evt.initEvent(event, true, true);
            evt.detail = eventData;
          }
          // eslint-disable-next-line
          el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
          el.dispatchEvent(evt);
          el.dom7EventData = [];
          delete el.dom7EventData;
        }
      }
      return this;
    }
    function transitionEnd(callback) {
      var events = ['webkitTransitionEnd', 'transitionend'];
      var dom = this;
      var i;
      function fireCallBack(e) {
        /* jshint validthis:true */
        if (e.target !== this) { return; }
        callback.call(this, e);
        for (i = 0; i < events.length; i += 1) {
          dom.off(events[i], fireCallBack);
        }
      }
      if (callback) {
        for (i = 0; i < events.length; i += 1) {
          dom.on(events[i], fireCallBack);
        }
      }
      return this;
    }
    function outerWidth(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          // eslint-disable-next-line
          var styles = this.styles();
          return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
        }
        return this[0].offsetWidth;
      }
      return null;
    }
    function outerHeight(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          // eslint-disable-next-line
          var styles = this.styles();
          return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
        }
        return this[0].offsetHeight;
      }
      return null;
    }
    function offset() {
      if (this.length > 0) {
        var el = this[0];
        var box = el.getBoundingClientRect();
        var body = doc.body;
        var clientTop = el.clientTop || body.clientTop || 0;
        var clientLeft = el.clientLeft || body.clientLeft || 0;
        var scrollTop = el === win ? win.scrollY : el.scrollTop;
        var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
        return {
          top: (box.top + scrollTop) - clientTop,
          left: (box.left + scrollLeft) - clientLeft,
        };
      }

      return null;
    }
    function styles() {
      if (this[0]) { return win.getComputedStyle(this[0], null); }
      return {};
    }
    function css(props, value) {
      var i;
      if (arguments.length === 1) {
        if (typeof props === 'string') {
          if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
        } else {
          for (i = 0; i < this.length; i += 1) {
            // eslint-disable-next-line
            for (var prop in props) {
              this[i].style[prop] = props[prop];
            }
          }
          return this;
        }
      }
      if (arguments.length === 2 && typeof props === 'string') {
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }
        return this;
      }
      return this;
    }
    // Iterate over the collection passing elements to `callback`
    function each(callback) {
      // Don't bother continuing without a callback
      if (!callback) { return this; }
      // Iterate over the current collection
      for (var i = 0; i < this.length; i += 1) {
        // If the callback returns false
        if (callback.call(this[i], i, this[i]) === false) {
          // End the loop early
          return this;
        }
      }
      // Return `this` to allow chained DOM operations
      return this;
    }
    function filter(callback) {
      var matchedItems = [];
      var dom = this;
      for (var i = 0; i < dom.length; i += 1) {
        if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
      }
      return new Dom7(matchedItems);
    }
    // eslint-disable-next-line
    function html(html) {
      if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : undefined;
      }

      for (var i = 0; i < this.length; i += 1) {
        this[i].innerHTML = html;
      }
      return this;
    }
    // eslint-disable-next-line
    function text(text) {
      if (typeof text === 'undefined') {
        if (this[0]) {
          return this[0].textContent.trim();
        }
        return null;
      }

      for (var i = 0; i < this.length; i += 1) {
        this[i].textContent = text;
      }
      return this;
    }
    function is(selector) {
      var el = this[0];
      var compareWith;
      var i;
      if (!el || typeof selector === 'undefined') { return false; }
      if (typeof selector === 'string') {
        if (el.matches) { return el.matches(selector); }
        else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
        else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

        compareWith = $(selector);
        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) { return true; }
        }
        return false;
      } else if (selector === doc) { return el === doc; }
      else if (selector === win) { return el === win; }

      if (selector.nodeType || selector instanceof Dom7) {
        compareWith = selector.nodeType ? [selector] : selector;
        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) { return true; }
        }
        return false;
      }
      return false;
    }
    function index() {
      var child = this[0];
      var i;
      if (child) {
        i = 0;
        // eslint-disable-next-line
        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1) { i += 1; }
        }
        return i;
      }
      return undefined;
    }
    // eslint-disable-next-line
    function eq(index) {
      if (typeof index === 'undefined') { return this; }
      var length = this.length;
      var returnIndex;
      if (index > length - 1) {
        return new Dom7([]);
      }
      if (index < 0) {
        returnIndex = length + index;
        if (returnIndex < 0) { return new Dom7([]); }
        return new Dom7([this[returnIndex]]);
      }
      return new Dom7([this[index]]);
    }
    function append() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var newChild;

      for (var k = 0; k < args.length; k += 1) {
        newChild = args[k];
        for (var i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            var tempDiv = doc.createElement('div');
            tempDiv.innerHTML = newChild;
            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (var j = 0; j < newChild.length; j += 1) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    }
    function prepend(newChild) {
      var i;
      var j;
      for (i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof Dom7) {
          for (j = 0; j < newChild.length; j += 1) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }
      return this;
    }
    function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return new Dom7([this[0].nextElementSibling]);
          }
          return new Dom7([]);
        }

        if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
        return new Dom7([]);
      }
      return new Dom7([]);
    }
    function nextAll(selector) {
      var nextEls = [];
      var el = this[0];
      if (!el) { return new Dom7([]); }
      while (el.nextElementSibling) {
        var next = el.nextElementSibling; // eslint-disable-line
        if (selector) {
          if ($(next).is(selector)) { nextEls.push(next); }
        } else { nextEls.push(next); }
        el = next;
      }
      return new Dom7(nextEls);
    }
    function prev(selector) {
      if (this.length > 0) {
        var el = this[0];
        if (selector) {
          if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
            return new Dom7([el.previousElementSibling]);
          }
          return new Dom7([]);
        }

        if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
        return new Dom7([]);
      }
      return new Dom7([]);
    }
    function prevAll(selector) {
      var prevEls = [];
      var el = this[0];
      if (!el) { return new Dom7([]); }
      while (el.previousElementSibling) {
        var prev = el.previousElementSibling; // eslint-disable-line
        if (selector) {
          if ($(prev).is(selector)) { prevEls.push(prev); }
        } else { prevEls.push(prev); }
        el = prev;
      }
      return new Dom7(prevEls);
    }
    function parent(selector) {
      var parents = []; // eslint-disable-line
      for (var i = 0; i < this.length; i += 1) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }
      return $(unique(parents));
    }
    function parents(selector) {
      var parents = []; // eslint-disable-line
      for (var i = 0; i < this.length; i += 1) {
        var parent = this[i].parentNode; // eslint-disable-line
        while (parent) {
          if (selector) {
            if ($(parent).is(selector)) { parents.push(parent); }
          } else {
            parents.push(parent);
          }
          parent = parent.parentNode;
        }
      }
      return $(unique(parents));
    }
    function closest(selector) {
      var closest = this; // eslint-disable-line
      if (typeof selector === 'undefined') {
        return new Dom7([]);
      }
      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }
      return closest;
    }
    function find(selector) {
      var foundElements = [];
      for (var i = 0; i < this.length; i += 1) {
        var found = this[i].querySelectorAll(selector);
        for (var j = 0; j < found.length; j += 1) {
          foundElements.push(found[j]);
        }
      }
      return new Dom7(foundElements);
    }
    function children(selector) {
      var children = []; // eslint-disable-line
      for (var i = 0; i < this.length; i += 1) {
        var childNodes = this[i].childNodes;

        for (var j = 0; j < childNodes.length; j += 1) {
          if (!selector) {
            if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
          } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
            children.push(childNodes[j]);
          }
        }
      }
      return new Dom7(unique(children));
    }
    function remove() {
      for (var i = 0; i < this.length; i += 1) {
        if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
      }
      return this;
    }
    function add() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dom = this;
      var i;
      var j;
      for (i = 0; i < args.length; i += 1) {
        var toAdd = $(args[i]);
        for (j = 0; j < toAdd.length; j += 1) {
          dom[dom.length] = toAdd[j];
          dom.length += 1;
        }
      }
      return dom;
    }

    var Methods = {
      addClass: addClass,
      removeClass: removeClass,
      hasClass: hasClass,
      toggleClass: toggleClass,
      attr: attr,
      removeAttr: removeAttr,
      data: data,
      transform: transform,
      transition: transition,
      on: on,
      off: off,
      trigger: trigger,
      transitionEnd: transitionEnd,
      outerWidth: outerWidth,
      outerHeight: outerHeight,
      offset: offset,
      css: css,
      each: each,
      html: html,
      text: text,
      is: is,
      index: index,
      eq: eq,
      append: append,
      prepend: prepend,
      next: next,
      nextAll: nextAll,
      prev: prev,
      prevAll: prevAll,
      parent: parent,
      parents: parents,
      closest: closest,
      find: find,
      children: children,
      filter: filter,
      remove: remove,
      add: add,
      styles: styles,
    };

    Object.keys(Methods).forEach(function (methodName) {
      $.fn[methodName] = $.fn[methodName] || Methods[methodName];
    });

    var Utils = {
      deleteProps: function deleteProps(obj) {
        var object = obj;
        Object.keys(object).forEach(function (key) {
          try {
            object[key] = null;
          } catch (e) {
            // no getter for object
          }
          try {
            delete object[key];
          } catch (e) {
            // something got wrong
          }
        });
      },
      nextTick: function nextTick(callback, delay) {
        if ( delay === void 0 ) delay = 0;

        return setTimeout(callback, delay);
      },
      now: function now() {
        return Date.now();
      },
      getTranslate: function getTranslate(el, axis) {
        if ( axis === void 0 ) axis = 'x';

        var matrix;
        var curTransform;
        var transformMatrix;

        var curStyle = win.getComputedStyle(el, null);

        if (win.WebKitCSSMatrix) {
          curTransform = curStyle.transform || curStyle.webkitTransform;
          if (curTransform.split(',').length > 6) {
            curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
          }
          // Some old versions of Webkit choke when 'none' is passed; pass
          // empty string instead in this case
          transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
        } else {
          transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
          matrix = transformMatrix.toString().split(',');
        }

        if (axis === 'x') {
          // Latest Chrome and webkits Fix
          if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
          // Crazy IE10 Matrix
          else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
          // Normal Browsers
          else { curTransform = parseFloat(matrix[4]); }
        }
        if (axis === 'y') {
          // Latest Chrome and webkits Fix
          if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
          // Crazy IE10 Matrix
          else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
          // Normal Browsers
          else { curTransform = parseFloat(matrix[5]); }
        }
        return curTransform || 0;
      },
      parseUrlQuery: function parseUrlQuery(url) {
        var query = {};
        var urlToParse = url || win.location.href;
        var i;
        var params;
        var param;
        var length;
        if (typeof urlToParse === 'string' && urlToParse.length) {
          urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
          params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
          length = params.length;

          for (i = 0; i < length; i += 1) {
            param = params[i].replace(/#\S+/g, '').split('=');
            query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
          }
        }
        return query;
      },
      isObject: function isObject(o) {
        return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
      },
      extend: function extend() {
        var args = [], len$1 = arguments.length;
        while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

        var to = Object(args[0]);
        for (var i = 1; i < args.length; i += 1) {
          var nextSource = args[i];
          if (nextSource !== undefined && nextSource !== null) {
            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
              var nextKey = keysArray[nextIndex];
              var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
              if (desc !== undefined && desc.enumerable) {
                if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                  Utils.extend(to[nextKey], nextSource[nextKey]);
                } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                  to[nextKey] = {};
                  Utils.extend(to[nextKey], nextSource[nextKey]);
                } else {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
        }
        return to;
      },
    };

    var Support = (function Support() {
      return {
        touch: !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch)),

        pointerEvents: !!win.PointerEvent && ('maxTouchPoints' in win.navigator) && win.navigator.maxTouchPoints >= 0,

        observer: (function checkObserver() {
          return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
        }()),

        passiveListener: (function checkPassiveListener() {
          var supportsPassive = false;
          try {
            var opts = Object.defineProperty({}, 'passive', {
              // eslint-disable-next-line
              get: function get() {
                supportsPassive = true;
              },
            });
            win.addEventListener('testPassiveListener', null, opts);
          } catch (e) {
            // No support
          }
          return supportsPassive;
        }()),

        gestures: (function checkGestures() {
          return 'ongesturestart' in win;
        }()),
      };
    }());

    var SwiperClass = function SwiperClass(params) {
      if ( params === void 0 ) params = {};

      var self = this;
      self.params = params;

      // Events
      self.eventsListeners = {};

      if (self.params && self.params.on) {
        Object.keys(self.params.on).forEach(function (eventName) {
          self.on(eventName, self.params.on[eventName]);
        });
      }
    };

    var staticAccessors = { components: { configurable: true } };

    SwiperClass.prototype.on = function on (events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') { return self; }
      var method = priority ? 'unshift' : 'push';
      events.split(' ').forEach(function (event) {
        if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
        self.eventsListeners[event][method](handler);
      });
      return self;
    };

    SwiperClass.prototype.once = function once (events, handler, priority) {
      var self = this;
      if (typeof handler !== 'function') { return self; }
      function onceHandler() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

        self.off(events, onceHandler);
        if (onceHandler.f7proxy) {
          delete onceHandler.f7proxy;
        }
        handler.apply(self, args);
      }
      onceHandler.f7proxy = handler;
      return self.on(events, onceHandler, priority);
    };

    SwiperClass.prototype.off = function off (events, handler) {
      var self = this;
      if (!self.eventsListeners) { return self; }
      events.split(' ').forEach(function (event) {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
          self.eventsListeners[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler || (eventHandler.f7proxy && eventHandler.f7proxy === handler)) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    };

    SwiperClass.prototype.emit = function emit () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      var self = this;
      if (!self.eventsListeners) { return self; }
      var events;
      var data;
      var context;
      if (typeof args[0] === 'string' || Array.isArray(args[0])) {
        events = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      var eventsArray = Array.isArray(events) ? events : events.split(' ');
      eventsArray.forEach(function (event) {
        if (self.eventsListeners && self.eventsListeners[event]) {
          var handlers = [];
          self.eventsListeners[event].forEach(function (eventHandler) {
            handlers.push(eventHandler);
          });
          handlers.forEach(function (eventHandler) {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    };

    SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
      var instance = this;
      if (!instance.modules) { return; }
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName];
        // Extend params
        if (module.params) {
          Utils.extend(instanceParams, module.params);
        }
      });
    };

    SwiperClass.prototype.useModules = function useModules (modulesParams) {
        if ( modulesParams === void 0 ) modulesParams = {};

      var instance = this;
      if (!instance.modules) { return; }
      Object.keys(instance.modules).forEach(function (moduleName) {
        var module = instance.modules[moduleName];
        var moduleParams = modulesParams[moduleName] || {};
        // Extend instance methods and props
        if (module.instance) {
          Object.keys(module.instance).forEach(function (modulePropName) {
            var moduleProp = module.instance[modulePropName];
            if (typeof moduleProp === 'function') {
              instance[modulePropName] = moduleProp.bind(instance);
            } else {
              instance[modulePropName] = moduleProp;
            }
          });
        }
        // Add event listeners
        if (module.on && instance.on) {
          Object.keys(module.on).forEach(function (moduleEventName) {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        }

        // Module create callback
        if (module.create) {
          module.create.bind(instance)(moduleParams);
        }
      });
    };

    staticAccessors.components.set = function (components) {
      var Class = this;
      if (!Class.use) { return; }
      Class.use(components);
    };

    SwiperClass.installModule = function installModule (module) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

      var Class = this;
      if (!Class.prototype.modules) { Class.prototype.modules = {}; }
      var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
      Class.prototype.modules[name] = module;
      // Prototype
      if (module.proto) {
        Object.keys(module.proto).forEach(function (key) {
          Class.prototype[key] = module.proto[key];
        });
      }
      // Class
      if (module.static) {
        Object.keys(module.static).forEach(function (key) {
          Class[key] = module.static[key];
        });
      }
      // Callback
      if (module.install) {
        module.install.apply(Class, params);
      }
      return Class;
    };

    SwiperClass.use = function use (module) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

      var Class = this;
      if (Array.isArray(module)) {
        module.forEach(function (m) { return Class.installModule(m); });
        return Class;
      }
      return Class.installModule.apply(Class, [ module ].concat( params ));
    };

    Object.defineProperties( SwiperClass, staticAccessors );

    function updateSize () {
      var swiper = this;
      var width;
      var height;
      var $el = swiper.$el;
      if (typeof swiper.params.width !== 'undefined') {
        width = swiper.params.width;
      } else {
        width = $el[0].clientWidth;
      }
      if (typeof swiper.params.height !== 'undefined') {
        height = swiper.params.height;
      } else {
        height = $el[0].clientHeight;
      }
      if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
        return;
      }

      // Subtract paddings
      width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
      height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

      Utils.extend(swiper, {
        width: width,
        height: height,
        size: swiper.isHorizontal() ? width : height,
      });
    }

    function updateSlides () {
      var swiper = this;
      var params = swiper.params;

      var $wrapperEl = swiper.$wrapperEl;
      var swiperSize = swiper.size;
      var rtl = swiper.rtlTranslate;
      var wrongRTL = swiper.wrongRTL;
      var isVirtual = swiper.virtual && params.virtual.enabled;
      var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
      var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
      var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
      var snapGrid = [];
      var slidesGrid = [];
      var slidesSizesGrid = [];

      function slidesForMargin(slideIndex) {
        if (!params.cssMode) { return true; }
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }

      var offsetBefore = params.slidesOffsetBefore;
      if (typeof offsetBefore === 'function') {
        offsetBefore = params.slidesOffsetBefore.call(swiper);
      }

      var offsetAfter = params.slidesOffsetAfter;
      if (typeof offsetAfter === 'function') {
        offsetAfter = params.slidesOffsetAfter.call(swiper);
      }

      var previousSnapGridLength = swiper.snapGrid.length;
      var previousSlidesGridLength = swiper.snapGrid.length;

      var spaceBetween = params.spaceBetween;
      var slidePosition = -offsetBefore;
      var prevSlideSize = 0;
      var index = 0;
      if (typeof swiperSize === 'undefined') {
        return;
      }
      if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
        spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
      }

      swiper.virtualSize = -spaceBetween;

      // reset margins
      if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
      else { slides.css({ marginRight: '', marginBottom: '' }); }

      var slidesNumberEvenToRows;
      if (params.slidesPerColumn > 1) {
        if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
          slidesNumberEvenToRows = slidesLength;
        } else {
          slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
        }
        if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
          slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
        }
      }

      // Calc slides
      var slideSize;
      var slidesPerColumn = params.slidesPerColumn;
      var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
      var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
      for (var i = 0; i < slidesLength; i += 1) {
        slideSize = 0;
        var slide = slides.eq(i);
        if (params.slidesPerColumn > 1) {
          // Set slides order
          var newSlideOrderIndex = (void 0);
          var column = (void 0);
          var row = (void 0);
          if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
            var groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
            var slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
            var columnsInGroup = groupIndex === 0
              ? params.slidesPerGroup
              : Math.min(Math.ceil((slidesLength - groupIndex * slidesPerColumn * params.slidesPerGroup) / slidesPerColumn), params.slidesPerGroup);
            row = Math.floor(slideIndexInGroup / columnsInGroup);
            column = (slideIndexInGroup - row * columnsInGroup) + groupIndex * params.slidesPerGroup;

            newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
            slide
              .css({
                '-webkit-box-ordinal-group': newSlideOrderIndex,
                '-moz-box-ordinal-group': newSlideOrderIndex,
                '-ms-flex-order': newSlideOrderIndex,
                '-webkit-order': newSlideOrderIndex,
                order: newSlideOrderIndex,
              });
          } else if (params.slidesPerColumnFill === 'column') {
            column = Math.floor(i / slidesPerColumn);
            row = i - (column * slidesPerColumn);
            if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
              row += 1;
              if (row >= slidesPerColumn) {
                row = 0;
                column += 1;
              }
            }
          } else {
            row = Math.floor(i / slidesPerRow);
            column = i - (row * slidesPerRow);
          }
          slide.css(
            ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
            (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
          );
        }
        if (slide.css('display') === 'none') { continue; } // eslint-disable-line

        if (params.slidesPerView === 'auto') {
          var slideStyles = win.getComputedStyle(slide[0], null);
          var currentTransform = slide[0].style.transform;
          var currentWebKitTransform = slide[0].style.webkitTransform;
          if (currentTransform) {
            slide[0].style.transform = 'none';
          }
          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = 'none';
          }
          if (params.roundLengths) {
            slideSize = swiper.isHorizontal()
              ? slide.outerWidth(true)
              : slide.outerHeight(true);
          } else {
            // eslint-disable-next-line
            if (swiper.isHorizontal()) {
              var width = parseFloat(slideStyles.getPropertyValue('width'));
              var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
              var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
              var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
              var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
              var boxSizing = slideStyles.getPropertyValue('box-sizing');
              if (boxSizing && boxSizing === 'border-box') {
                slideSize = width + marginLeft + marginRight;
              } else {
                slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
              }
            } else {
              var height = parseFloat(slideStyles.getPropertyValue('height'));
              var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
              var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
              var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
              var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
              var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');
              if (boxSizing$1 && boxSizing$1 === 'border-box') {
                slideSize = height + marginTop + marginBottom;
              } else {
                slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
              }
            }
          }
          if (currentTransform) {
            slide[0].style.transform = currentTransform;
          }
          if (currentWebKitTransform) {
            slide[0].style.webkitTransform = currentWebKitTransform;
          }
          if (params.roundLengths) { slideSize = Math.floor(slideSize); }
        } else {
          slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
          if (params.roundLengths) { slideSize = Math.floor(slideSize); }

          if (slides[i]) {
            if (swiper.isHorizontal()) {
              slides[i].style.width = slideSize + "px";
            } else {
              slides[i].style.height = slideSize + "px";
            }
          }
        }
        if (slides[i]) {
          slides[i].swiperSlideSize = slideSize;
        }
        slidesSizesGrid.push(slideSize);


        if (params.centeredSlides) {
          slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
          if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
          if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
          if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
          if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
          if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
          slidesGrid.push(slidePosition);
        } else {
          if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
          if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
          slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }

        swiper.virtualSize += slideSize + spaceBetween;

        prevSlideSize = slideSize;

        index += 1;
      }
      swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
      var newSlidesGrid;

      if (
        rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
        $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
      }
      if (params.setWrapperSize) {
        if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      }

      if (params.slidesPerColumn > 1) {
        swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
        swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
        if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        if (params.centeredSlides) {
          newSlidesGrid = [];
          for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
            var slidesGridItem = snapGrid[i$1];
            if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
            if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
          }
          snapGrid = newSlidesGrid;
        }
      }

      // Remove last grid elements depending on width
      if (!params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
          var slidesGridItem$1 = snapGrid[i$2];
          if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
          if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
            newSlidesGrid.push(slidesGridItem$1);
          }
        }
        snapGrid = newSlidesGrid;
        if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }
      if (snapGrid.length === 0) { snapGrid = [0]; }

      if (params.spaceBetween !== 0) {
        if (swiper.isHorizontal()) {
          if (rtl) { slides.filter(slidesForMargin).css({ marginLeft: (spaceBetween + "px") }); }
          else { slides.filter(slidesForMargin).css({ marginRight: (spaceBetween + "px") }); }
        } else { slides.filter(slidesForMargin).css({ marginBottom: (spaceBetween + "px") }); }
      }

      if (params.centeredSlides && params.centeredSlidesBounds) {
        var allSlidesSize = 0;
        slidesSizesGrid.forEach(function (slideSizeValue) {
          allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize -= params.spaceBetween;
        var maxSnap = allSlidesSize - swiperSize;
        snapGrid = snapGrid.map(function (snap) {
          if (snap < 0) { return -offsetBefore; }
          if (snap > maxSnap) { return maxSnap + offsetAfter; }
          return snap;
        });
      }

      if (params.centerInsufficientSlides) {
        var allSlidesSize$1 = 0;
        slidesSizesGrid.forEach(function (slideSizeValue) {
          allSlidesSize$1 += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
        });
        allSlidesSize$1 -= params.spaceBetween;
        if (allSlidesSize$1 < swiperSize) {
          var allSlidesOffset = (swiperSize - allSlidesSize$1) / 2;
          snapGrid.forEach(function (snap, snapIndex) {
            snapGrid[snapIndex] = snap - allSlidesOffset;
          });
          slidesGrid.forEach(function (snap, snapIndex) {
            slidesGrid[snapIndex] = snap + allSlidesOffset;
          });
        }
      }

      Utils.extend(swiper, {
        slides: slides,
        snapGrid: snapGrid,
        slidesGrid: slidesGrid,
        slidesSizesGrid: slidesSizesGrid,
      });

      if (slidesLength !== previousSlidesLength) {
        swiper.emit('slidesLengthChange');
      }
      if (snapGrid.length !== previousSnapGridLength) {
        if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
        swiper.emit('snapGridLengthChange');
      }
      if (slidesGrid.length !== previousSlidesGridLength) {
        swiper.emit('slidesGridLengthChange');
      }

      if (params.watchSlidesProgress || params.watchSlidesVisibility) {
        swiper.updateSlidesOffset();
      }
    }

    function updateAutoHeight (speed) {
      var swiper = this;
      var activeSlides = [];
      var newHeight = 0;
      var i;
      if (typeof speed === 'number') {
        swiper.setTransition(speed);
      } else if (speed === true) {
        swiper.setTransition(swiper.params.speed);
      }
      // Find slides currently in view
      if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
        if (swiper.params.centeredSlides) {
          swiper.visibleSlides.each(function (index, slide) {
            activeSlides.push(slide);
          });
        } else {
          for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            var index = swiper.activeIndex + i;
            if (index > swiper.slides.length) { break; }
            activeSlides.push(swiper.slides.eq(index)[0]);
          }
        }
      } else {
        activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
      }

      // Find new height from highest slide in view
      for (i = 0; i < activeSlides.length; i += 1) {
        if (typeof activeSlides[i] !== 'undefined') {
          var height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      }

      // Update Height
      if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
    }

    function updateSlidesOffset () {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
      }
    }

    function updateSlidesProgress (translate) {
      if ( translate === void 0 ) translate = (this && this.translate) || 0;

      var swiper = this;
      var params = swiper.params;

      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;

      if (slides.length === 0) { return; }
      if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

      var offsetCenter = -translate;
      if (rtl) { offsetCenter = translate; }

      // Visible Slides
      slides.removeClass(params.slideVisibleClass);

      swiper.visibleSlidesIndexes = [];
      swiper.visibleSlides = [];

      for (var i = 0; i < slides.length; i += 1) {
        var slide = slides[i];
        var slideProgress = (
          (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
        ) / (slide.swiperSlideSize + params.spaceBetween);
        if (params.watchSlidesVisibility || (params.centeredSlides && params.autoHeight)) {
          var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
          var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
          var isVisible = (slideBefore >= 0 && slideBefore < swiper.size - 1)
                    || (slideAfter > 1 && slideAfter <= swiper.size)
                    || (slideBefore <= 0 && slideAfter >= swiper.size);
          if (isVisible) {
            swiper.visibleSlides.push(slide);
            swiper.visibleSlidesIndexes.push(i);
            slides.eq(i).addClass(params.slideVisibleClass);
          }
        }
        slide.progress = rtl ? -slideProgress : slideProgress;
      }
      swiper.visibleSlides = $(swiper.visibleSlides);
    }

    function updateProgress (translate) {
      var swiper = this;
      if (typeof translate === 'undefined') {
        var multiplier = swiper.rtlTranslate ? -1 : 1;
        // eslint-disable-next-line
        translate = (swiper && swiper.translate && (swiper.translate * multiplier)) || 0;
      }
      var params = swiper.params;
      var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      var progress = swiper.progress;
      var isBeginning = swiper.isBeginning;
      var isEnd = swiper.isEnd;
      var wasBeginning = isBeginning;
      var wasEnd = isEnd;
      if (translatesDiff === 0) {
        progress = 0;
        isBeginning = true;
        isEnd = true;
      } else {
        progress = (translate - swiper.minTranslate()) / (translatesDiff);
        isBeginning = progress <= 0;
        isEnd = progress >= 1;
      }
      Utils.extend(swiper, {
        progress: progress,
        isBeginning: isBeginning,
        isEnd: isEnd,
      });

      if (params.watchSlidesProgress || params.watchSlidesVisibility || (params.centeredSlides && params.autoHeight)) { swiper.updateSlidesProgress(translate); }

      if (isBeginning && !wasBeginning) {
        swiper.emit('reachBeginning toEdge');
      }
      if (isEnd && !wasEnd) {
        swiper.emit('reachEnd toEdge');
      }
      if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
        swiper.emit('fromEdge');
      }

      swiper.emit('progress', progress);
    }

    function updateSlidesClasses () {
      var swiper = this;

      var slides = swiper.slides;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var activeIndex = swiper.activeIndex;
      var realIndex = swiper.realIndex;
      var isVirtual = swiper.virtual && params.virtual.enabled;

      slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

      var activeSlide;
      if (isVirtual) {
        activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
      } else {
        activeSlide = slides.eq(activeIndex);
      }

      // Active classes
      activeSlide.addClass(params.slideActiveClass);

      if (params.loop) {
        // Duplicate to all looped slides
        if (activeSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl
            .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
            .addClass(params.slideDuplicateActiveClass);
        } else {
          $wrapperEl
            .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
            .addClass(params.slideDuplicateActiveClass);
        }
      }
      // Next Slide
      var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
      if (params.loop && nextSlide.length === 0) {
        nextSlide = slides.eq(0);
        nextSlide.addClass(params.slideNextClass);
      }
      // Prev Slide
      var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
      if (params.loop && prevSlide.length === 0) {
        prevSlide = slides.eq(-1);
        prevSlide.addClass(params.slidePrevClass);
      }
      if (params.loop) {
        // Duplicate to all looped slides
        if (nextSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl
            .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicateNextClass);
        } else {
          $wrapperEl
            .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicateNextClass);
        }
        if (prevSlide.hasClass(params.slideDuplicateClass)) {
          $wrapperEl
            .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicatePrevClass);
        } else {
          $wrapperEl
            .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
            .addClass(params.slideDuplicatePrevClass);
        }
      }
    }

    function updateActiveIndex (newActiveIndex) {
      var swiper = this;
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      var slidesGrid = swiper.slidesGrid;
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      var previousIndex = swiper.activeIndex;
      var previousRealIndex = swiper.realIndex;
      var previousSnapIndex = swiper.snapIndex;
      var activeIndex = newActiveIndex;
      var snapIndex;
      if (typeof activeIndex === 'undefined') {
        for (var i = 0; i < slidesGrid.length; i += 1) {
          if (typeof slidesGrid[i + 1] !== 'undefined') {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
              activeIndex = i;
            } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
              activeIndex = i + 1;
            }
          } else if (translate >= slidesGrid[i]) {
            activeIndex = i;
          }
        }
        // Normalize slideIndex
        if (params.normalizeSlideIndex) {
          if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
        }
      }
      if (snapGrid.indexOf(translate) >= 0) {
        snapIndex = snapGrid.indexOf(translate);
      } else {
        var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
        snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
      }
      if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
      if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
          swiper.snapIndex = snapIndex;
          swiper.emit('snapIndexChange');
        }
        return;
      }

      // Get real index
      var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

      Utils.extend(swiper, {
        snapIndex: snapIndex,
        realIndex: realIndex,
        previousIndex: previousIndex,
        activeIndex: activeIndex,
      });
      swiper.emit('activeIndexChange');
      swiper.emit('snapIndexChange');
      if (previousRealIndex !== realIndex) {
        swiper.emit('realIndexChange');
      }
      if (swiper.initialized || swiper.params.runCallbacksOnInit) {
        swiper.emit('slideChange');
      }
    }

    function updateClickedSlide (e) {
      var swiper = this;
      var params = swiper.params;
      var slide = $(e.target).closest(("." + (params.slideClass)))[0];
      var slideFound = false;
      if (slide) {
        for (var i = 0; i < swiper.slides.length; i += 1) {
          if (swiper.slides[i] === slide) { slideFound = true; }
        }
      }

      if (slide && slideFound) {
        swiper.clickedSlide = slide;
        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
        } else {
          swiper.clickedIndex = $(slide).index();
        }
      } else {
        swiper.clickedSlide = undefined;
        swiper.clickedIndex = undefined;
        return;
      }
      if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
        swiper.slideToClickedSlide();
      }
    }

    var update = {
      updateSize: updateSize,
      updateSlides: updateSlides,
      updateAutoHeight: updateAutoHeight,
      updateSlidesOffset: updateSlidesOffset,
      updateSlidesProgress: updateSlidesProgress,
      updateProgress: updateProgress,
      updateSlidesClasses: updateSlidesClasses,
      updateActiveIndex: updateActiveIndex,
      updateClickedSlide: updateClickedSlide,
    };

    function getTranslate (axis) {
      if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

      var swiper = this;

      var params = swiper.params;
      var rtl = swiper.rtlTranslate;
      var translate = swiper.translate;
      var $wrapperEl = swiper.$wrapperEl;

      if (params.virtualTranslate) {
        return rtl ? -translate : translate;
      }
      if (params.cssMode) {
        return translate;
      }

      var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
      if (rtl) { currentTranslate = -currentTranslate; }

      return currentTranslate || 0;
    }

    function setTranslate (translate, byController) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var wrapperEl = swiper.wrapperEl;
      var progress = swiper.progress;
      var x = 0;
      var y = 0;
      var z = 0;

      if (swiper.isHorizontal()) {
        x = rtl ? -translate : translate;
      } else {
        y = translate;
      }

      if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
      }

      if (params.cssMode) {
        wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
      } else if (!params.virtualTranslate) {
        $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)"));
      }
      swiper.previousTranslate = swiper.translate;
      swiper.translate = swiper.isHorizontal() ? x : y;

      // Check if we need to update progress
      var newProgress;
      var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
      }
      if (newProgress !== progress) {
        swiper.updateProgress(translate);
      }

      swiper.emit('setTranslate', swiper.translate, byController);
    }

    function minTranslate () {
      return (-this.snapGrid[0]);
    }

    function maxTranslate () {
      return (-this.snapGrid[this.snapGrid.length - 1]);
    }

    function translateTo (translate, speed, runCallbacks, translateBounds, internal) {
      var obj;

      if ( translate === void 0 ) translate = 0;
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;
      if ( translateBounds === void 0 ) translateBounds = true;
      var swiper = this;

      var params = swiper.params;
      var wrapperEl = swiper.wrapperEl;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      var minTranslate = swiper.minTranslate();
      var maxTranslate = swiper.maxTranslate();
      var newTranslate;
      if (translateBounds && translate > minTranslate) { newTranslate = minTranslate; }
      else if (translateBounds && translate < maxTranslate) { newTranslate = maxTranslate; }
      else { newTranslate = translate; }

      // Update progress
      swiper.updateProgress(newTranslate);

      if (params.cssMode) {
        var isH = swiper.isHorizontal();
        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        } else {
          // eslint-disable-next-line
          if (wrapperEl.scrollTo) {
            wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = -newTranslate, obj.behavior = 'smooth', obj ));
          } else {
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
          }
        }
        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(newTranslate);
        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionEnd');
        }
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(newTranslate);
        if (runCallbacks) {
          swiper.emit('beforeTransitionStart', speed, internal);
          swiper.emit('transitionStart');
        }
        if (!swiper.animating) {
          swiper.animating = true;
          if (!swiper.onTranslateToWrapperTransitionEnd) {
            swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) { return; }
              if (e.target !== this) { return; }
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
              swiper.onTranslateToWrapperTransitionEnd = null;
              delete swiper.onTranslateToWrapperTransitionEnd;
              if (runCallbacks) {
                swiper.emit('transitionEnd');
              }
            };
          }
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
        }
      }

      return true;
    }

    var translate = {
      getTranslate: getTranslate,
      setTranslate: setTranslate,
      minTranslate: minTranslate,
      maxTranslate: maxTranslate,
      translateTo: translateTo,
    };

    function setTransition (duration, byController) {
      var swiper = this;

      if (!swiper.params.cssMode) {
        swiper.$wrapperEl.transition(duration);
      }

      swiper.emit('setTransition', duration, byController);
    }

    function transitionStart (runCallbacks, direction) {
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var params = swiper.params;
      var previousIndex = swiper.previousIndex;
      if (params.cssMode) { return; }
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      var dir = direction;
      if (!dir) {
        if (activeIndex > previousIndex) { dir = 'next'; }
        else if (activeIndex < previousIndex) { dir = 'prev'; }
        else { dir = 'reset'; }
      }

      swiper.emit('transitionStart');

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit('slideResetTransitionStart');
          return;
        }
        swiper.emit('slideChangeTransitionStart');
        if (dir === 'next') {
          swiper.emit('slideNextTransitionStart');
        } else {
          swiper.emit('slidePrevTransitionStart');
        }
      }
    }

    function transitionEnd$1 (runCallbacks, direction) {
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var previousIndex = swiper.previousIndex;
      var params = swiper.params;
      swiper.animating = false;
      if (params.cssMode) { return; }
      swiper.setTransition(0);

      var dir = direction;
      if (!dir) {
        if (activeIndex > previousIndex) { dir = 'next'; }
        else if (activeIndex < previousIndex) { dir = 'prev'; }
        else { dir = 'reset'; }
      }

      swiper.emit('transitionEnd');

      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === 'reset') {
          swiper.emit('slideResetTransitionEnd');
          return;
        }
        swiper.emit('slideChangeTransitionEnd');
        if (dir === 'next') {
          swiper.emit('slideNextTransitionEnd');
        } else {
          swiper.emit('slidePrevTransitionEnd');
        }
      }
    }

    var transition$1 = {
      setTransition: setTransition,
      transitionStart: transitionStart,
      transitionEnd: transitionEnd$1,
    };

    function slideTo (index, speed, runCallbacks, internal) {
      var obj;

      if ( index === void 0 ) index = 0;
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;
      var swiper = this;
      var slideIndex = index;
      if (slideIndex < 0) { slideIndex = 0; }

      var params = swiper.params;
      var snapGrid = swiper.snapGrid;
      var slidesGrid = swiper.slidesGrid;
      var previousIndex = swiper.previousIndex;
      var activeIndex = swiper.activeIndex;
      var rtl = swiper.rtlTranslate;
      var wrapperEl = swiper.wrapperEl;
      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }

      var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
      var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
      if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

      if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
        swiper.emit('beforeSlideChangeStart');
      }

      var translate = -snapGrid[snapIndex];

      // Update progress
      swiper.updateProgress(translate);

      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        for (var i = 0; i < slidesGrid.length; i += 1) {
          if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
            slideIndex = i;
          }
        }
      }
      // Directions locks
      if (swiper.initialized && slideIndex !== activeIndex) {
        if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
          return false;
        }
        if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
          if ((activeIndex || 0) !== slideIndex) { return false; }
        }
      }

      var direction;
      if (slideIndex > activeIndex) { direction = 'next'; }
      else if (slideIndex < activeIndex) { direction = 'prev'; }
      else { direction = 'reset'; }


      // Update Index
      if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
        swiper.updateActiveIndex(slideIndex);
        // Update Height
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
        swiper.updateSlidesClasses();
        if (params.effect !== 'slide') {
          swiper.setTranslate(translate);
        }
        if (direction !== 'reset') {
          swiper.transitionStart(runCallbacks, direction);
          swiper.transitionEnd(runCallbacks, direction);
        }
        return false;
      }
      if (params.cssMode) {
        var isH = swiper.isHorizontal();
        var t = -translate;
        if (rtl) {
          t = wrapperEl.scrollWidth - wrapperEl.offsetWidth - t;
        }
        if (speed === 0) {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        } else {
          // eslint-disable-next-line
          if (wrapperEl.scrollTo) {
            wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = t, obj.behavior = 'smooth', obj ));
          } else {
            wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
          }
        }
        return true;
      }

      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (!swiper.animating) {
          swiper.animating = true;
          if (!swiper.onSlideToWrapperTransitionEnd) {
            swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
              if (!swiper || swiper.destroyed) { return; }
              if (e.target !== this) { return; }
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
              swiper.onSlideToWrapperTransitionEnd = null;
              delete swiper.onSlideToWrapperTransitionEnd;
              swiper.transitionEnd(runCallbacks, direction);
            };
          }
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
        }
      }

      return true;
    }

    function slideToLoop (index, speed, runCallbacks, internal) {
      if ( index === void 0 ) index = 0;
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var newIndex = index;
      if (swiper.params.loop) {
        newIndex += swiper.loopedSlides;
      }

      return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideNext (speed, runCallbacks, internal) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var params = swiper.params;
      var animating = swiper.animating;
      var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup;
      if (params.loop) {
        if (animating) { return false; }
        swiper.loopFix();
        // eslint-disable-next-line
        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }
      return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slidePrev (speed, runCallbacks, internal) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      var params = swiper.params;
      var animating = swiper.animating;
      var snapGrid = swiper.snapGrid;
      var slidesGrid = swiper.slidesGrid;
      var rtlTranslate = swiper.rtlTranslate;

      if (params.loop) {
        if (animating) { return false; }
        swiper.loopFix();
        // eslint-disable-next-line
        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      }
      var translate = rtlTranslate ? swiper.translate : -swiper.translate;
      function normalize(val) {
        if (val < 0) { return -Math.floor(Math.abs(val)); }
        return Math.floor(val);
      }
      var normalizedTranslate = normalize(translate);
      var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
      var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

      var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
      var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
      if (typeof prevSnap === 'undefined' && params.cssMode) {
        snapGrid.forEach(function (snap) {
          if (!prevSnap && normalizedTranslate >= snap) { prevSnap = snap; }
        });
      }
      var prevIndex;
      if (typeof prevSnap !== 'undefined') {
        prevIndex = slidesGrid.indexOf(prevSnap);
        if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
      }
      return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideReset (speed, runCallbacks, internal) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;

      var swiper = this;
      return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideToClosest (speed, runCallbacks, internal, threshold) {
      if ( speed === void 0 ) speed = this.params.speed;
      if ( runCallbacks === void 0 ) runCallbacks = true;
      if ( threshold === void 0 ) threshold = 0.5;

      var swiper = this;
      var index = swiper.activeIndex;
      var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
      var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);

      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      if (translate >= swiper.snapGrid[snapIndex]) {
        // The current translate is on or after the current snap index, so the choice
        // is between the current index and the one after it.
        var currentSnap = swiper.snapGrid[snapIndex];
        var nextSnap = swiper.snapGrid[snapIndex + 1];
        if ((translate - currentSnap) > (nextSnap - currentSnap) * threshold) {
          index += swiper.params.slidesPerGroup;
        }
      } else {
        // The current translate is before the current snap index, so the choice
        // is between the current index and the one before it.
        var prevSnap = swiper.snapGrid[snapIndex - 1];
        var currentSnap$1 = swiper.snapGrid[snapIndex];
        if ((translate - prevSnap) <= (currentSnap$1 - prevSnap) * threshold) {
          index -= swiper.params.slidesPerGroup;
        }
      }
      index = Math.max(index, 0);
      index = Math.min(index, swiper.slidesGrid.length - 1);

      return swiper.slideTo(index, speed, runCallbacks, internal);
    }

    function slideToClickedSlide () {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;

      var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
      var slideToIndex = swiper.clickedIndex;
      var realIndex;
      if (params.loop) {
        if (swiper.animating) { return; }
        realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
        if (params.centeredSlides) {
          if (
            (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
            || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
          ) {
            swiper.loopFix();
            slideToIndex = $wrapperEl
              .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
              .eq(0)
              .index();

            Utils.nextTick(function () {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else if (slideToIndex > swiper.slides.length - slidesPerView) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else {
        swiper.slideTo(slideToIndex);
      }
    }

    var slide = {
      slideTo: slideTo,
      slideToLoop: slideToLoop,
      slideNext: slideNext,
      slidePrev: slidePrev,
      slideReset: slideReset,
      slideToClosest: slideToClosest,
      slideToClickedSlide: slideToClickedSlide,
    };

    function loopCreate () {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      // Remove duplicated slides
      $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

      var slides = $wrapperEl.children(("." + (params.slideClass)));

      if (params.loopFillGroupWithBlank) {
        var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
        if (blankSlidesNum !== params.slidesPerGroup) {
          for (var i = 0; i < blankSlidesNum; i += 1) {
            var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
            $wrapperEl.append(blankNode);
          }
          slides = $wrapperEl.children(("." + (params.slideClass)));
        }
      }

      if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

      swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
      swiper.loopedSlides += params.loopAdditionalSlides;
      if (swiper.loopedSlides > slides.length) {
        swiper.loopedSlides = slides.length;
      }

      var prependSlides = [];
      var appendSlides = [];
      slides.each(function (index, el) {
        var slide = $(el);
        if (index < swiper.loopedSlides) { appendSlides.push(el); }
        if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
        slide.attr('data-swiper-slide-index', index);
      });
      for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
        $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
      for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
        $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
      }
    }

    function loopFix () {
      var swiper = this;

      swiper.emit('beforeLoopFix');

      var activeIndex = swiper.activeIndex;
      var slides = swiper.slides;
      var loopedSlides = swiper.loopedSlides;
      var allowSlidePrev = swiper.allowSlidePrev;
      var allowSlideNext = swiper.allowSlideNext;
      var snapGrid = swiper.snapGrid;
      var rtl = swiper.rtlTranslate;
      var newIndex;
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;

      var snapTranslate = -snapGrid[activeIndex];
      var diff = snapTranslate - swiper.getTranslate();

      // Fix For Negative Oversliding
      if (activeIndex < loopedSlides) {
        newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
        newIndex += loopedSlides;
        var slideChanged = swiper.slideTo(newIndex, 0, false, true);
        if (slideChanged && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      } else if (activeIndex >= slides.length - loopedSlides) {
        // Fix For Positive Oversliding
        newIndex = -slides.length + activeIndex + loopedSlides;
        newIndex += loopedSlides;
        var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
        if (slideChanged$1 && diff !== 0) {
          swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      swiper.emit('loopFix');
    }

    function loopDestroy () {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var params = swiper.params;
      var slides = swiper.slides;
      $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + ",." + (params.slideClass) + "." + (params.slideBlankClass))).remove();
      slides.removeAttr('data-swiper-slide-index');
    }

    var loop = {
      loopCreate: loopCreate,
      loopFix: loopFix,
      loopDestroy: loopDestroy,
    };

    function setGrabCursor (moving) {
      var swiper = this;
      if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
      var el = swiper.el;
      el.style.cursor = 'move';
      el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
      el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
      el.style.cursor = moving ? 'grabbing' : 'grab';
    }

    function unsetGrabCursor () {
      var swiper = this;
      if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
      swiper.el.style.cursor = '';
    }

    var grabCursor = {
      setGrabCursor: setGrabCursor,
      unsetGrabCursor: unsetGrabCursor,
    };

    function appendSlide (slides) {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var params = swiper.params;
      if (params.loop) {
        swiper.loopDestroy();
      }
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { $wrapperEl.append(slides[i]); }
        }
      } else {
        $wrapperEl.append(slides);
      }
      if (params.loop) {
        swiper.loopCreate();
      }
      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
    }

    function prependSlide (slides) {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var activeIndex = swiper.activeIndex;

      if (params.loop) {
        swiper.loopDestroy();
      }
      var newActiveIndex = activeIndex + 1;
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { $wrapperEl.prepend(slides[i]); }
        }
        newActiveIndex = activeIndex + slides.length;
      } else {
        $wrapperEl.prepend(slides);
      }
      if (params.loop) {
        swiper.loopCreate();
      }
      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
      swiper.slideTo(newActiveIndex, 0, false);
    }

    function addSlide (index, slides) {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var params = swiper.params;
      var activeIndex = swiper.activeIndex;
      var activeIndexBuffer = activeIndex;
      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
      }
      var baseLength = swiper.slides.length;
      if (index <= 0) {
        swiper.prependSlide(slides);
        return;
      }
      if (index >= baseLength) {
        swiper.appendSlide(slides);
        return;
      }
      var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

      var slidesBuffer = [];
      for (var i = baseLength - 1; i >= index; i -= 1) {
        var currentSlide = swiper.slides.eq(i);
        currentSlide.remove();
        slidesBuffer.unshift(currentSlide);
      }

      if (typeof slides === 'object' && 'length' in slides) {
        for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
          if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
        }
        newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
      } else {
        $wrapperEl.append(slides);
      }

      for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
        $wrapperEl.append(slidesBuffer[i$2]);
      }

      if (params.loop) {
        swiper.loopCreate();
      }
      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeSlide (slidesIndexes) {
      var swiper = this;
      var params = swiper.params;
      var $wrapperEl = swiper.$wrapperEl;
      var activeIndex = swiper.activeIndex;

      var activeIndexBuffer = activeIndex;
      if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides;
        swiper.loopDestroy();
        swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
      }
      var newActiveIndex = activeIndexBuffer;
      var indexToRemove;

      if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
        for (var i = 0; i < slidesIndexes.length; i += 1) {
          indexToRemove = slidesIndexes[i];
          if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
          if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
        }
        newActiveIndex = Math.max(newActiveIndex, 0);
      } else {
        indexToRemove = slidesIndexes;
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
        newActiveIndex = Math.max(newActiveIndex, 0);
      }

      if (params.loop) {
        swiper.loopCreate();
      }

      if (!(params.observer && Support.observer)) {
        swiper.update();
      }
      if (params.loop) {
        swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
      } else {
        swiper.slideTo(newActiveIndex, 0, false);
      }
    }

    function removeAllSlides () {
      var swiper = this;

      var slidesIndexes = [];
      for (var i = 0; i < swiper.slides.length; i += 1) {
        slidesIndexes.push(i);
      }
      swiper.removeSlide(slidesIndexes);
    }

    var manipulation = {
      appendSlide: appendSlide,
      prependSlide: prependSlide,
      addSlide: addSlide,
      removeSlide: removeSlide,
      removeAllSlides: removeAllSlides,
    };

    var Device = (function Device() {
      var platform = win.navigator.platform;
      var ua = win.navigator.userAgent;

      var device = {
        ios: false,
        android: false,
        androidChrome: false,
        desktop: false,
        iphone: false,
        ipod: false,
        ipad: false,
        edge: false,
        ie: false,
        firefox: false,
        macos: false,
        windows: false,
        cordova: !!(win.cordova || win.phonegap),
        phonegap: !!(win.cordova || win.phonegap),
        electron: false,
      };

      var screenWidth = win.screen.width;
      var screenHeight = win.screen.height;

      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
      var edge = ua.indexOf('Edge/') >= 0;
      var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
      var windows = platform === 'Win32';
      var electron = ua.toLowerCase().indexOf('electron') >= 0;
      var macos = platform === 'MacIntel';

      // iPadOs 13 fix
      if (!ipad
        && macos
        && Support.touch
        && (
          (screenWidth === 1024 && screenHeight === 1366) // Pro 12.9
          || (screenWidth === 834 && screenHeight === 1194) // Pro 11
          || (screenWidth === 834 && screenHeight === 1112) // Pro 10.5
          || (screenWidth === 768 && screenHeight === 1024) // other
        )
      ) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        macos = false;
      }

      device.ie = ie;
      device.edge = edge;
      device.firefox = firefox;

      // Android
      if (android && !windows) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
      }
      if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
      }
      // iOS
      if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
      }
      if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
      }
      if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.ipod = true;
      }
      // iOS 8+ changed UA
      if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
          device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
      }

      // Webview
      device.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || win.navigator.standalone))
        || (win.matchMedia && win.matchMedia('(display-mode: standalone)').matches);
      device.webview = device.webView;
      device.standalone = device.webView;

      // Desktop
      device.desktop = !(device.ios || device.android) || electron;
      if (device.desktop) {
        device.electron = electron;
        device.macos = macos;
        device.windows = windows;
        if (device.macos) {
          device.os = 'macos';
        }
        if (device.windows) {
          device.os = 'windows';
        }
      }

      // Pixel Ratio
      device.pixelRatio = win.devicePixelRatio || 1;

      // Export object
      return device;
    }());

    function onTouchStart (event) {
      var swiper = this;
      var data = swiper.touchEventsData;
      var params = swiper.params;
      var touches = swiper.touches;

      if (swiper.animating && params.preventInteractionOnTransition) {
        return;
      }
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; }
      var $targetEl = $(e.target);

      if (params.touchEventsTarget === 'wrapper') {
        if (!$targetEl.closest(swiper.wrapperEl).length) { return; }
      }
      data.isTouchEvent = e.type === 'touchstart';
      if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
      if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
      if (data.isTouched && data.isMoved) { return; }
      if (params.noSwiping && $targetEl.closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
        swiper.allowClick = true;
        return;
      }
      if (params.swipeHandler) {
        if (!$targetEl.closest(params.swipeHandler)[0]) { return; }
      }

      touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      var startX = touches.currentX;
      var startY = touches.currentY;

      // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

      var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
      var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
      if (
        edgeSwipeDetection
        && ((startX <= edgeSwipeThreshold)
        || (startX >= win.screen.width - edgeSwipeThreshold))
      ) {
        return;
      }

      Utils.extend(data, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: undefined,
        startMoving: undefined,
      });

      touches.startX = startX;
      touches.startY = startY;
      data.touchStartTime = Utils.now();
      swiper.allowClick = true;
      swiper.updateSize();
      swiper.swipeDirection = undefined;
      if (params.threshold > 0) { data.allowThresholdMove = false; }
      if (e.type !== 'touchstart') {
        var preventDefault = true;
        if ($targetEl.is(data.formElements)) { preventDefault = false; }
        if (
          doc.activeElement
          && $(doc.activeElement).is(data.formElements)
          && doc.activeElement !== $targetEl[0]
        ) {
          doc.activeElement.blur();
        }

        var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if (params.touchStartForcePreventDefault || shouldPreventDefault) {
          e.preventDefault();
        }
      }
      swiper.emit('touchStart', e);
    }

    function onTouchMove (event) {
      var swiper = this;
      var data = swiper.touchEventsData;
      var params = swiper.params;
      var touches = swiper.touches;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; }
      if (!data.isTouched) {
        if (data.startMoving && data.isScrolling) {
          swiper.emit('touchMoveOpposite', e);
        }
        return;
      }
      if (data.isTouchEvent && e.type !== 'touchmove') { return; }
      var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
      var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;
      if (e.preventedByNestedSwiper) {
        touches.startX = pageX;
        touches.startY = pageY;
        return;
      }
      if (!swiper.allowTouchMove) {
        // isMoved = true;
        swiper.allowClick = false;
        if (data.isTouched) {
          Utils.extend(touches, {
            startX: pageX,
            startY: pageY,
            currentX: pageX,
            currentY: pageY,
          });
          data.touchStartTime = Utils.now();
        }
        return;
      }
      if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
        if (swiper.isVertical()) {
          // Vertical
          if (
            (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
            || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
          ) {
            data.isTouched = false;
            data.isMoved = false;
            return;
          }
        } else if (
          (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
          || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
        ) {
          return;
        }
      }
      if (data.isTouchEvent && doc.activeElement) {
        if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
          data.isMoved = true;
          swiper.allowClick = false;
          return;
        }
      }
      if (data.allowTouchCallbacks) {
        swiper.emit('touchMove', e);
      }
      if (e.targetTouches && e.targetTouches.length > 1) { return; }

      touches.currentX = pageX;
      touches.currentY = pageY;

      var diffX = touches.currentX - touches.startX;
      var diffY = touches.currentY - touches.startY;
      if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

      if (typeof data.isScrolling === 'undefined') {
        var touchAngle;
        if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
          data.isScrolling = false;
        } else {
          // eslint-disable-next-line
          if ((diffX * diffX) + (diffY * diffY) >= 25) {
            touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
            data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
          }
        }
      }
      if (data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      if (typeof data.startMoving === 'undefined') {
        if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
          data.startMoving = true;
        }
      }
      if (data.isScrolling) {
        data.isTouched = false;
        return;
      }
      if (!data.startMoving) {
        return;
      }
      swiper.allowClick = false;
      if (!params.cssMode && e.cancelable) {
        e.preventDefault();
      }
      if (params.touchMoveStopPropagation && !params.nested) {
        e.stopPropagation();
      }

      if (!data.isMoved) {
        if (params.loop) {
          swiper.loopFix();
        }
        data.startTranslate = swiper.getTranslate();
        swiper.setTransition(0);
        if (swiper.animating) {
          swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
        }
        data.allowMomentumBounce = false;
        // Grab Cursor
        if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(true);
        }
        swiper.emit('sliderFirstMove', e);
      }
      swiper.emit('sliderMove', e);
      data.isMoved = true;

      var diff = swiper.isHorizontal() ? diffX : diffY;
      touches.diff = diff;

      diff *= params.touchRatio;
      if (rtl) { diff = -diff; }

      swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
      data.currentTranslate = diff + data.startTranslate;

      var disableParentSwiper = true;
      var resistanceRatio = params.resistanceRatio;
      if (params.touchReleaseOnEdges) {
        resistanceRatio = 0;
      }
      if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
        disableParentSwiper = false;
        if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
      } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
      }

      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      }

      // Directions locks
      if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }
      if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }


      // Threshold
      if (params.threshold > 0) {
        if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
          if (!data.allowThresholdMove) {
            data.allowThresholdMove = true;
            touches.startX = touches.currentX;
            touches.startY = touches.currentY;
            data.currentTranslate = data.startTranslate;
            touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
            return;
          }
        } else {
          data.currentTranslate = data.startTranslate;
          return;
        }
      }

      if (!params.followFinger || params.cssMode) { return; }

      // Update active index in free mode
      if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      if (params.freeMode) {
        // Velocity
        if (data.velocities.length === 0) {
          data.velocities.push({
            position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
            time: data.touchStartTime,
          });
        }
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
          time: Utils.now(),
        });
      }
      // Update progress
      swiper.updateProgress(data.currentTranslate);
      // Update translate
      swiper.setTranslate(data.currentTranslate);
    }

    function onTouchEnd (event) {
      var swiper = this;
      var data = swiper.touchEventsData;

      var params = swiper.params;
      var touches = swiper.touches;
      var rtl = swiper.rtlTranslate;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesGrid = swiper.slidesGrid;
      var snapGrid = swiper.snapGrid;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; }
      if (data.allowTouchCallbacks) {
        swiper.emit('touchEnd', e);
      }
      data.allowTouchCallbacks = false;
      if (!data.isTouched) {
        if (data.isMoved && params.grabCursor) {
          swiper.setGrabCursor(false);
        }
        data.isMoved = false;
        data.startMoving = false;
        return;
      }
      // Return Grab Cursor
      if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(false);
      }

      // Time diff
      var touchEndTime = Utils.now();
      var timeDiff = touchEndTime - data.touchStartTime;

      // Tap, doubleTap, Click
      if (swiper.allowClick) {
        swiper.updateClickedSlide(e);
        swiper.emit('tap click', e);
        if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
          swiper.emit('doubleTap doubleClick', e);
        }
      }

      data.lastClickTime = Utils.now();
      Utils.nextTick(function () {
        if (!swiper.destroyed) { swiper.allowClick = true; }
      });

      if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        return;
      }
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;

      var currentPos;
      if (params.followFinger) {
        currentPos = rtl ? swiper.translate : -swiper.translate;
      } else {
        currentPos = -data.currentTranslate;
      }

      if (params.cssMode) {
        return;
      }

      if (params.freeMode) {
        if (currentPos < -swiper.minTranslate()) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        if (currentPos > -swiper.maxTranslate()) {
          if (swiper.slides.length < snapGrid.length) {
            swiper.slideTo(snapGrid.length - 1);
          } else {
            swiper.slideTo(swiper.slides.length - 1);
          }
          return;
        }

        if (params.freeModeMomentum) {
          if (data.velocities.length > 1) {
            var lastMoveEvent = data.velocities.pop();
            var velocityEvent = data.velocities.pop();

            var distance = lastMoveEvent.position - velocityEvent.position;
            var time = lastMoveEvent.time - velocityEvent.time;
            swiper.velocity = distance / time;
            swiper.velocity /= 2;
            if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
              swiper.velocity = 0;
            }
            // this implies that the user stopped moving a finger then released.
            // There would be no events with distance zero, so the last event is stale.
            if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
              swiper.velocity = 0;
            }
          } else {
            swiper.velocity = 0;
          }
          swiper.velocity *= params.freeModeMomentumVelocityRatio;

          data.velocities.length = 0;
          var momentumDuration = 1000 * params.freeModeMomentumRatio;
          var momentumDistance = swiper.velocity * momentumDuration;

          var newPosition = swiper.translate + momentumDistance;
          if (rtl) { newPosition = -newPosition; }

          var doBounce = false;
          var afterBouncePosition;
          var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
          var needsLoopFix;
          if (newPosition < swiper.maxTranslate()) {
            if (params.freeModeMomentumBounce) {
              if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                newPosition = swiper.maxTranslate() - bounceAmount;
              }
              afterBouncePosition = swiper.maxTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.maxTranslate();
            }
            if (params.loop && params.centeredSlides) { needsLoopFix = true; }
          } else if (newPosition > swiper.minTranslate()) {
            if (params.freeModeMomentumBounce) {
              if (newPosition - swiper.minTranslate() > bounceAmount) {
                newPosition = swiper.minTranslate() + bounceAmount;
              }
              afterBouncePosition = swiper.minTranslate();
              doBounce = true;
              data.allowMomentumBounce = true;
            } else {
              newPosition = swiper.minTranslate();
            }
            if (params.loop && params.centeredSlides) { needsLoopFix = true; }
          } else if (params.freeModeSticky) {
            var nextSlide;
            for (var j = 0; j < snapGrid.length; j += 1) {
              if (snapGrid[j] > -newPosition) {
                nextSlide = j;
                break;
              }
            }

            if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
              newPosition = snapGrid[nextSlide];
            } else {
              newPosition = snapGrid[nextSlide - 1];
            }
            newPosition = -newPosition;
          }
          if (needsLoopFix) {
            swiper.once('transitionEnd', function () {
              swiper.loopFix();
            });
          }
          // Fix duration
          if (swiper.velocity !== 0) {
            if (rtl) {
              momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
            } else {
              momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
            }
            if (params.freeModeSticky) {
              // If freeModeSticky is active and the user ends a swipe with a slow-velocity
              // event, then durations can be 20+ seconds to slide one (or zero!) slides.
              // It's easy to see this when simulating touch with mouse events. To fix this,
              // limit single-slide swipes to the default slide duration. This also has the
              // nice side effect of matching slide speed if the user stopped moving before
              // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
              // For faster swipes, also apply limits (albeit higher ones).
              var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
              var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
              if (moveDistance < currentSlideSize) {
                momentumDuration = params.speed;
              } else if (moveDistance < 2 * currentSlideSize) {
                momentumDuration = params.speed * 1.5;
              } else {
                momentumDuration = params.speed * 2.5;
              }
            }
          } else if (params.freeModeSticky) {
            swiper.slideToClosest();
            return;
          }

          if (params.freeModeMomentumBounce && doBounce) {
            swiper.updateProgress(afterBouncePosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
              swiper.emit('momentumBounce');
              swiper.setTransition(params.speed);
              setTimeout(function () {
                swiper.setTranslate(afterBouncePosition);
                $wrapperEl.transitionEnd(function () {
                  if (!swiper || swiper.destroyed) { return; }
                  swiper.transitionEnd();
                });
              }, 0);
            });
          } else if (swiper.velocity) {
            swiper.updateProgress(newPosition);
            swiper.setTransition(momentumDuration);
            swiper.setTranslate(newPosition);
            swiper.transitionStart(true, swiper.swipeDirection);
            if (!swiper.animating) {
              swiper.animating = true;
              $wrapperEl.transitionEnd(function () {
                if (!swiper || swiper.destroyed) { return; }
                swiper.transitionEnd();
              });
            }
          } else {
            swiper.updateProgress(newPosition);
          }

          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        return;
      }

      // Find current slide
      var stopIndex = 0;
      var groupSize = swiper.slidesSizesGrid[0];
      for (var i = 0; i < slidesGrid.length; i += (i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup)) {
        var increment$1 = (i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup);
        if (typeof slidesGrid[i + increment$1] !== 'undefined') {
          if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment$1]) {
            stopIndex = i;
            groupSize = slidesGrid[i + increment$1] - slidesGrid[i];
          }
        } else if (currentPos >= slidesGrid[i]) {
          stopIndex = i;
          groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
        }
      }

      // Find current slide size
      var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
      var increment = (stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup);

      if (timeDiff > params.longSwipesMs) {
        // Long touches
        if (!params.longSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        if (swiper.swipeDirection === 'next') {
          if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + increment); }
          else { swiper.slideTo(stopIndex); }
        }
        if (swiper.swipeDirection === 'prev') {
          if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + increment); }
          else { swiper.slideTo(stopIndex); }
        }
      } else {
        // Short swipes
        if (!params.shortSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
        if (!isNavButtonTarget) {
          if (swiper.swipeDirection === 'next') {
            swiper.slideTo(stopIndex + increment);
          }
          if (swiper.swipeDirection === 'prev') {
            swiper.slideTo(stopIndex);
          }
        } else if (e.target === swiper.navigation.nextEl) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    }

    function onResize () {
      var swiper = this;

      var params = swiper.params;
      var el = swiper.el;

      if (el && el.offsetWidth === 0) { return; }

      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Save locks
      var allowSlideNext = swiper.allowSlideNext;
      var allowSlidePrev = swiper.allowSlidePrev;
      var snapGrid = swiper.snapGrid;

      // Disable locks on resize
      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;

      swiper.updateSize();
      swiper.updateSlides();

      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }

      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.run();
      }
      // Return locks after resize
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;

      if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
    }

    function onClick (e) {
      var swiper = this;
      if (!swiper.allowClick) {
        if (swiper.params.preventClicks) { e.preventDefault(); }
        if (swiper.params.preventClicksPropagation && swiper.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }

    function onScroll () {
      var swiper = this;
      var wrapperEl = swiper.wrapperEl;
      var rtlTranslate = swiper.rtlTranslate;
      swiper.previousTranslate = swiper.translate;
      if (swiper.isHorizontal()) {
        if (rtlTranslate) {
          swiper.translate = ((wrapperEl.scrollWidth - wrapperEl.offsetWidth) - wrapperEl.scrollLeft);
        } else {
          swiper.translate = -wrapperEl.scrollLeft;
        }
      } else {
        swiper.translate = -wrapperEl.scrollTop;
      }
      // eslint-disable-next-line
      if (swiper.translate === -0) { swiper.translate = 0; }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      var newProgress;
      var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (swiper.translate - swiper.minTranslate()) / (translatesDiff);
      }
      if (newProgress !== swiper.progress) {
        swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
      }

      swiper.emit('setTranslate', swiper.translate, false);
    }

    var dummyEventAttached = false;
    function dummyEventListener() {}

    function attachEvents() {
      var swiper = this;
      var params = swiper.params;
      var touchEvents = swiper.touchEvents;
      var el = swiper.el;
      var wrapperEl = swiper.wrapperEl;

      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
      if (params.cssMode) {
        swiper.onScroll = onScroll.bind(swiper);
      }

      swiper.onClick = onClick.bind(swiper);

      var capture = !!params.nested;

      // Touch Events
      if (!Support.touch && Support.pointerEvents) {
        el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          el.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
          el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
          if (touchEvents.cancel) {
            el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
          }
          if (!dummyEventAttached) {
            doc.addEventListener('touchstart', dummyEventListener);
            dummyEventAttached = true;
          }
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          el.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        el.addEventListener('click', swiper.onClick, true);
      }
      if (params.cssMode) {
        wrapperEl.addEventListener('scroll', swiper.onScroll);
      }

      // Resize handler
      if (params.updateOnWindowResize) {
        swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
      } else {
        swiper.on('observerUpdate', onResize, true);
      }
    }

    function detachEvents() {
      var swiper = this;

      var params = swiper.params;
      var touchEvents = swiper.touchEvents;
      var el = swiper.el;
      var wrapperEl = swiper.wrapperEl;

      var capture = !!params.nested;

      // Touch Events
      if (!Support.touch && Support.pointerEvents) {
        el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
          if (touchEvents.cancel) {
            el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
          }
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          el.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        el.removeEventListener('click', swiper.onClick, true);
      }

      if (params.cssMode) {
        wrapperEl.removeEventListener('scroll', swiper.onScroll);
      }

      // Resize handler
      swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
    }

    var events = {
      attachEvents: attachEvents,
      detachEvents: detachEvents,
    };

    function setBreakpoint () {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var initialized = swiper.initialized;
      var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
      var params = swiper.params;
      var $el = swiper.$el;
      var breakpoints = params.breakpoints;
      if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }

      // Get breakpoint for window width and update parameters
      var breakpoint = swiper.getBreakpoint(breakpoints);

      if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
        var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
        if (breakpointOnlyParams) {
          ['slidesPerView', 'spaceBetween', 'slidesPerGroup', 'slidesPerGroupSkip', 'slidesPerColumn'].forEach(function (param) {
            var paramValue = breakpointOnlyParams[param];
            if (typeof paramValue === 'undefined') { return; }
            if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
              breakpointOnlyParams[param] = 'auto';
            } else if (param === 'slidesPerView') {
              breakpointOnlyParams[param] = parseFloat(paramValue);
            } else {
              breakpointOnlyParams[param] = parseInt(paramValue, 10);
            }
          });
        }

        var breakpointParams = breakpointOnlyParams || swiper.originalParams;
        var wasMultiRow = params.slidesPerColumn > 1;
        var isMultiRow = breakpointParams.slidesPerColumn > 1;
        if (wasMultiRow && !isMultiRow) {
          $el.removeClass(((params.containerModifierClass) + "multirow " + (params.containerModifierClass) + "multirow-column"));
        } else if (!wasMultiRow && isMultiRow) {
          $el.addClass(((params.containerModifierClass) + "multirow"));
          if (breakpointParams.slidesPerColumnFill === 'column') {
            $el.addClass(((params.containerModifierClass) + "multirow-column"));
          }
        }

        var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

        if (directionChanged && initialized) {
          swiper.changeDirection();
        }

        Utils.extend(swiper.params, breakpointParams);

        Utils.extend(swiper, {
          allowTouchMove: swiper.params.allowTouchMove,
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,
        });

        swiper.currentBreakpoint = breakpoint;

        if (needsReLoop && initialized) {
          swiper.loopDestroy();
          swiper.loopCreate();
          swiper.updateSlides();
          swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
        }

        swiper.emit('breakpoint', breakpointParams);
      }
    }

    function getBreakpoint (breakpoints) {
      // Get breakpoint for window width
      if (!breakpoints) { return undefined; }
      var breakpoint = false;

      var points = Object.keys(breakpoints).map(function (point) {
        if (typeof point === 'string' && point.indexOf('@') === 0) {
          var minRatio = parseFloat(point.substr(1));
          var value = win.innerHeight * minRatio;
          return { value: value, point: point };
        }
        return { value: point, point: point };
      });

      points.sort(function (a, b) { return parseInt(a.value, 10) - parseInt(b.value, 10); });
      for (var i = 0; i < points.length; i += 1) {
        var ref = points[i];
        var point = ref.point;
        var value = ref.value;
        if (value <= win.innerWidth) {
          breakpoint = point;
        }
      }
      return breakpoint || 'max';
    }

    var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

    function addClasses () {
      var swiper = this;
      var classNames = swiper.classNames;
      var params = swiper.params;
      var rtl = swiper.rtl;
      var $el = swiper.$el;
      var suffixes = [];

      suffixes.push('initialized');
      suffixes.push(params.direction);

      if (params.freeMode) {
        suffixes.push('free-mode');
      }
      if (params.autoHeight) {
        suffixes.push('autoheight');
      }
      if (rtl) {
        suffixes.push('rtl');
      }
      if (params.slidesPerColumn > 1) {
        suffixes.push('multirow');
        if (params.slidesPerColumnFill === 'column') {
          suffixes.push('multirow-column');
        }
      }
      if (Device.android) {
        suffixes.push('android');
      }
      if (Device.ios) {
        suffixes.push('ios');
      }

      if (params.cssMode) {
        suffixes.push('css-mode');
      }

      suffixes.forEach(function (suffix) {
        classNames.push(params.containerModifierClass + suffix);
      });

      $el.addClass(classNames.join(' '));
    }

    function removeClasses () {
      var swiper = this;
      var $el = swiper.$el;
      var classNames = swiper.classNames;

      $el.removeClass(classNames.join(' '));
    }

    var classes = { addClasses: addClasses, removeClasses: removeClasses };

    function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
      var image;
      function onReady() {
        if (callback) { callback(); }
      }
      var isPicture = $(imageEl).parent('picture')[0];

      if (!isPicture && (!imageEl.complete || !checkForComplete)) {
        if (src) {
          image = new win.Image();
          image.onload = onReady;
          image.onerror = onReady;
          if (sizes) {
            image.sizes = sizes;
          }
          if (srcset) {
            image.srcset = srcset;
          }
          if (src) {
            image.src = src;
          }
        } else {
          onReady();
        }
      } else {
        // image already loaded...
        onReady();
      }
    }

    function preloadImages () {
      var swiper = this;
      swiper.imagesToLoad = swiper.$el.find('img');
      function onReady() {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
        if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
        if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
          if (swiper.params.updateOnImagesReady) { swiper.update(); }
          swiper.emit('imagesReady');
        }
      }
      for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
        var imageEl = swiper.imagesToLoad[i];
        swiper.loadImage(
          imageEl,
          imageEl.currentSrc || imageEl.getAttribute('src'),
          imageEl.srcset || imageEl.getAttribute('srcset'),
          imageEl.sizes || imageEl.getAttribute('sizes'),
          true,
          onReady
        );
      }
    }

    var images = {
      loadImage: loadImage,
      preloadImages: preloadImages,
    };

    function checkOverflow() {
      var swiper = this;
      var params = swiper.params;
      var wasLocked = swiper.isLocked;
      var lastSlidePosition = swiper.slides.length > 0 && (params.slidesOffsetBefore + (params.spaceBetween * (swiper.slides.length - 1)) + ((swiper.slides[0]).offsetWidth) * swiper.slides.length);

      if (params.slidesOffsetBefore && params.slidesOffsetAfter && lastSlidePosition) {
        swiper.isLocked = lastSlidePosition <= swiper.size;
      } else {
        swiper.isLocked = swiper.snapGrid.length === 1;
      }

      swiper.allowSlideNext = !swiper.isLocked;
      swiper.allowSlidePrev = !swiper.isLocked;

      // events
      if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

      if (wasLocked && wasLocked !== swiper.isLocked) {
        swiper.isEnd = false;
        swiper.navigation.update();
      }
    }

    var checkOverflow$1 = { checkOverflow: checkOverflow };

    var defaults = {
      init: true,
      direction: 'horizontal',
      touchEventsTarget: 'container',
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      //
      preventInteractionOnTransition: false,

      // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,

      // Free mode
      freeMode: false,
      freeModeMomentum: true,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: true,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: false,
      freeModeMinimumVelocity: 0.02,

      // Autoheight
      autoHeight: false,

      // Set wrapper width
      setWrapperSize: false,

      // Virtual Translate
      virtualTranslate: false,

      // Effects
      effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

      // Breakpoints
      breakpoints: undefined,

      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: 'column',
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0, // in px
      slidesOffsetAfter: 0, // in px
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,

      // Disable swiper and hide navigation when container not overflow
      watchOverflow: false,

      // Round length
      roundLengths: false,

      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 0,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,

      // Unique Navigation Elements
      uniqueNavElements: true,

      // Resistance
      resistance: true,
      resistanceRatio: 0.85,

      // Progress
      watchSlidesProgress: false,
      watchSlidesVisibility: false,

      // Cursor
      grabCursor: false,

      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,

      // Images
      preloadImages: true,
      updateOnImagesReady: true,

      // loop
      loop: false,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: false,

      // Swiping/no swiping
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null, // '.swipe-handler',
      noSwiping: true,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,

      // Passive Listeners
      passiveListeners: true,

      // NS
      containerModifierClass: 'swiper-container-', // NEW
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',

      // Callbacks
      runCallbacksOnInit: true,
    };

    /* eslint no-param-reassign: "off" */

    var prototypes = {
      update: update,
      translate: translate,
      transition: transition$1,
      slide: slide,
      loop: loop,
      grabCursor: grabCursor,
      manipulation: manipulation,
      events: events,
      breakpoints: breakpoints,
      checkOverflow: checkOverflow$1,
      classes: classes,
      images: images,
    };

    var extendedDefaults = {};

    var Swiper = /*@__PURE__*/(function (SwiperClass) {
      function Swiper() {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        var el;
        var params;
        if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
          params = args[0];
        } else {
          (assign = args, el = assign[0], params = assign[1]);
        }
        if (!params) { params = {}; }

        params = Utils.extend({}, params);
        if (el && !params.el) { params.el = el; }

        SwiperClass.call(this, params);

        Object.keys(prototypes).forEach(function (prototypeGroup) {
          Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
            if (!Swiper.prototype[protoMethod]) {
              Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }
          });
        });

        // Swiper Instance
        var swiper = this;
        if (typeof swiper.modules === 'undefined') {
          swiper.modules = {};
        }
        Object.keys(swiper.modules).forEach(function (moduleName) {
          var module = swiper.modules[moduleName];
          if (module.params) {
            var moduleParamName = Object.keys(module.params)[0];
            var moduleParams = module.params[moduleParamName];
            if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
            if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
            if (params[moduleParamName] === true) {
              params[moduleParamName] = { enabled: true };
            }
            if (
              typeof params[moduleParamName] === 'object'
              && !('enabled' in params[moduleParamName])
            ) {
              params[moduleParamName].enabled = true;
            }
            if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
          }
        });

        // Extend defaults with modules params
        var swiperParams = Utils.extend({}, defaults);
        swiper.useModulesParams(swiperParams);

        // Extend defaults with passed params
        swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
        swiper.originalParams = Utils.extend({}, swiper.params);
        swiper.passedParams = Utils.extend({}, params);

        // Save Dom lib
        swiper.$ = $;

        // Find el
        var $el = $(swiper.params.el);
        el = $el[0];

        if (!el) {
          return undefined;
        }

        if ($el.length > 1) {
          var swipers = [];
          $el.each(function (index, containerEl) {
            var newParams = Utils.extend({}, params, { el: containerEl });
            swipers.push(new Swiper(newParams));
          });
          return swipers;
        }

        el.swiper = swiper;
        $el.data('swiper', swiper);

        // Find Wrapper
        var $wrapperEl;
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          $wrapperEl = $(el.shadowRoot.querySelector(("." + (swiper.params.wrapperClass))));
          // Children needs to return slot items
          $wrapperEl.children = function (options) { return $el.children(options); };
        } else {
          $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));
        }
        // Extend Swiper
        Utils.extend(swiper, {
          $el: $el,
          el: el,
          $wrapperEl: $wrapperEl,
          wrapperEl: $wrapperEl[0],

          // Classes
          classNames: [],

          // Slides
          slides: $(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],

          // isDirection
          isHorizontal: function isHorizontal() {
            return swiper.params.direction === 'horizontal';
          },
          isVertical: function isVertical() {
            return swiper.params.direction === 'vertical';
          },
          // RTL
          rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
          wrongRTL: $wrapperEl.css('display') === '-webkit-box',

          // Indexes
          activeIndex: 0,
          realIndex: 0,

          //
          isBeginning: true,
          isEnd: false,

          // Props
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,

          // Locks
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,

          // Touch Events
          touchEvents: (function touchEvents() {
            var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
            var desktop = ['mousedown', 'mousemove', 'mouseup'];
            if (Support.pointerEvents) {
              desktop = ['pointerdown', 'pointermove', 'pointerup'];
            }
            swiper.touchEventsTouch = {
              start: touch[0],
              move: touch[1],
              end: touch[2],
              cancel: touch[3],
            };
            swiper.touchEventsDesktop = {
              start: desktop[0],
              move: desktop[1],
              end: desktop[2],
            };
            return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
          }()),
          touchEventsData: {
            isTouched: undefined,
            isMoved: undefined,
            allowTouchCallbacks: undefined,
            touchStartTime: undefined,
            isScrolling: undefined,
            currentTranslate: undefined,
            startTranslate: undefined,
            allowThresholdMove: undefined,
            // Form elements to match
            formElements: 'input, select, option, textarea, button, video, label',
            // Last click time
            lastClickTime: Utils.now(),
            clickTimeout: undefined,
            // Velocities
            velocities: [],
            allowMomentumBounce: undefined,
            isTouchEvent: undefined,
            startMoving: undefined,
          },

          // Clicks
          allowClick: true,

          // Touches
          allowTouchMove: swiper.params.allowTouchMove,

          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
          },

          // Images
          imagesToLoad: [],
          imagesLoaded: 0,

        });

        // Install Modules
        swiper.useModules();

        // Init
        if (swiper.params.init) {
          swiper.init();
        }

        // Return app instance
        return swiper;
      }

      if ( SwiperClass ) Swiper.__proto__ = SwiperClass;
      Swiper.prototype = Object.create( SwiperClass && SwiperClass.prototype );
      Swiper.prototype.constructor = Swiper;

      var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

      Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
        var swiper = this;
        var params = swiper.params;
        var slides = swiper.slides;
        var slidesGrid = swiper.slidesGrid;
        var swiperSize = swiper.size;
        var activeIndex = swiper.activeIndex;
        var spv = 1;
        if (params.centeredSlides) {
          var slideSize = slides[activeIndex].swiperSlideSize;
          var breakLoop;
          for (var i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) { breakLoop = true; }
            }
          }
          for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
            if (slides[i$1] && !breakLoop) {
              slideSize += slides[i$1].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize) { breakLoop = true; }
            }
          }
        } else {
          for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
            if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
              spv += 1;
            }
          }
        }
        return spv;
      };

      Swiper.prototype.update = function update () {
        var swiper = this;
        if (!swiper || swiper.destroyed) { return; }
        var snapGrid = swiper.snapGrid;
        var params = swiper.params;
        // Breakpoints
        if (params.breakpoints) {
          swiper.setBreakpoint();
        }
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        function setTranslate() {
          var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        var translated;
        if (swiper.params.freeMode) {
          setTranslate();
          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
            translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }
          if (!translated) {
            setTranslate();
          }
        }
        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }
        swiper.emit('update');
      };

      Swiper.prototype.changeDirection = function changeDirection (newDirection, needUpdate) {
        if ( needUpdate === void 0 ) needUpdate = true;

        var swiper = this;
        var currentDirection = swiper.params.direction;
        if (!newDirection) {
          // eslint-disable-next-line
          newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        }
        if ((newDirection === currentDirection) || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
          return swiper;
        }

        swiper.$el
          .removeClass(("" + (swiper.params.containerModifierClass) + currentDirection))
          .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

        swiper.params.direction = newDirection;

        swiper.slides.each(function (slideIndex, slideEl) {
          if (newDirection === 'vertical') {
            slideEl.style.width = '';
          } else {
            slideEl.style.height = '';
          }
        });

        swiper.emit('changeDirection');
        if (needUpdate) { swiper.update(); }

        return swiper;
      };

      Swiper.prototype.init = function init () {
        var swiper = this;
        if (swiper.initialized) { return; }

        swiper.emit('beforeInit');

        // Set breakpoint
        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        }

        // Add Classes
        swiper.addClasses();

        // Create loop
        if (swiper.params.loop) {
          swiper.loopCreate();
        }

        // Update size
        swiper.updateSize();

        // Update slides
        swiper.updateSlides();

        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        }

        // Set Grab Cursor
        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }

        if (swiper.params.preloadImages) {
          swiper.preloadImages();
        }

        // Slide To Initial Slide
        if (swiper.params.loop) {
          swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
        }

        // Attach events
        swiper.attachEvents();

        // Init Flag
        swiper.initialized = true;

        // Emit
        swiper.emit('init');
      };

      Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
        if ( deleteInstance === void 0 ) deleteInstance = true;
        if ( cleanStyles === void 0 ) cleanStyles = true;

        var swiper = this;
        var params = swiper.params;
        var $el = swiper.$el;
        var $wrapperEl = swiper.$wrapperEl;
        var slides = swiper.slides;

        if (typeof swiper.params === 'undefined' || swiper.destroyed) {
          return null;
        }

        swiper.emit('beforeDestroy');

        // Init Flag
        swiper.initialized = false;

        // Detach events
        swiper.detachEvents();

        // Destroy loop
        if (params.loop) {
          swiper.loopDestroy();
        }

        // Cleanup styles
        if (cleanStyles) {
          swiper.removeClasses();
          $el.removeAttr('style');
          $wrapperEl.removeAttr('style');
          if (slides && slides.length) {
            slides
              .removeClass([
                params.slideVisibleClass,
                params.slideActiveClass,
                params.slideNextClass,
                params.slidePrevClass ].join(' '))
              .removeAttr('style')
              .removeAttr('data-swiper-slide-index');
          }
        }

        swiper.emit('destroy');

        // Detach emitter events
        Object.keys(swiper.eventsListeners).forEach(function (eventName) {
          swiper.off(eventName);
        });

        if (deleteInstance !== false) {
          swiper.$el[0].swiper = null;
          swiper.$el.data('swiper', null);
          Utils.deleteProps(swiper);
        }
        swiper.destroyed = true;

        return null;
      };

      Swiper.extendDefaults = function extendDefaults (newDefaults) {
        Utils.extend(extendedDefaults, newDefaults);
      };

      staticAccessors.extendedDefaults.get = function () {
        return extendedDefaults;
      };

      staticAccessors.defaults.get = function () {
        return defaults;
      };

      staticAccessors.Class.get = function () {
        return SwiperClass;
      };

      staticAccessors.$.get = function () {
        return $;
      };

      Object.defineProperties( Swiper, staticAccessors );

      return Swiper;
    }(SwiperClass));

    var Device$1 = {
      name: 'device',
      proto: {
        device: Device,
      },
      static: {
        device: Device,
      },
    };

    var Support$1 = {
      name: 'support',
      proto: {
        support: Support,
      },
      static: {
        support: Support,
      },
    };

    var Browser = (function Browser() {
      function isSafari() {
        var ua = win.navigator.userAgent.toLowerCase();
        return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
      }
      return {
        isEdge: !!win.navigator.userAgent.match(/Edge/g),
        isSafari: isSafari(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
      };
    }());

    var Browser$1 = {
      name: 'browser',
      proto: {
        browser: Browser,
      },
      static: {
        browser: Browser,
      },
    };

    var Resize = {
      name: 'resize',
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          resize: {
            resizeHandler: function resizeHandler() {
              if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
              swiper.emit('beforeResize');
              swiper.emit('resize');
            },
            orientationChangeHandler: function orientationChangeHandler() {
              if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
              swiper.emit('orientationchange');
            },
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          // Emit resize
          win.addEventListener('resize', swiper.resize.resizeHandler);

          // Emit orientationchange
          win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
        },
        destroy: function destroy() {
          var swiper = this;
          win.removeEventListener('resize', swiper.resize.resizeHandler);
          win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
        },
      },
    };

    var Observer = {
      func: win.MutationObserver || win.WebkitMutationObserver,
      attach: function attach(target, options) {
        if ( options === void 0 ) options = {};

        var swiper = this;

        var ObserverFunc = Observer.func;
        var observer = new ObserverFunc(function (mutations) {
          // The observerUpdate event should only be triggered
          // once despite the number of mutations.  Additional
          // triggers are redundant and are very costly
          if (mutations.length === 1) {
            swiper.emit('observerUpdate', mutations[0]);
            return;
          }
          var observerUpdate = function observerUpdate() {
            swiper.emit('observerUpdate', mutations[0]);
          };

          if (win.requestAnimationFrame) {
            win.requestAnimationFrame(observerUpdate);
          } else {
            win.setTimeout(observerUpdate, 0);
          }
        });

        observer.observe(target, {
          attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
          childList: typeof options.childList === 'undefined' ? true : options.childList,
          characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
        });

        swiper.observer.observers.push(observer);
      },
      init: function init() {
        var swiper = this;
        if (!Support.observer || !swiper.params.observer) { return; }
        if (swiper.params.observeParents) {
          var containerParents = swiper.$el.parents();
          for (var i = 0; i < containerParents.length; i += 1) {
            swiper.observer.attach(containerParents[i]);
          }
        }
        // Observe container
        swiper.observer.attach(swiper.$el[0], { childList: swiper.params.observeSlideChildren });

        // Observe wrapper
        swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.observers.forEach(function (observer) {
          observer.disconnect();
        });
        swiper.observer.observers = [];
      },
    };

    var Observer$1 = {
      name: 'observer',
      params: {
        observer: false,
        observeParents: false,
        observeSlideChildren: false,
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          observer: {
            init: Observer.init.bind(swiper),
            attach: Observer.attach.bind(swiper),
            destroy: Observer.destroy.bind(swiper),
            observers: [],
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.observer.init();
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.observer.destroy();
        },
      },
    };

    var Virtual = {
      update: function update(force) {
        var swiper = this;
        var ref = swiper.params;
        var slidesPerView = ref.slidesPerView;
        var slidesPerGroup = ref.slidesPerGroup;
        var centeredSlides = ref.centeredSlides;
        var ref$1 = swiper.params.virtual;
        var addSlidesBefore = ref$1.addSlidesBefore;
        var addSlidesAfter = ref$1.addSlidesAfter;
        var ref$2 = swiper.virtual;
        var previousFrom = ref$2.from;
        var previousTo = ref$2.to;
        var slides = ref$2.slides;
        var previousSlidesGrid = ref$2.slidesGrid;
        var renderSlide = ref$2.renderSlide;
        var previousOffset = ref$2.offset;
        swiper.updateActiveIndex();
        var activeIndex = swiper.activeIndex || 0;

        var offsetProp;
        if (swiper.rtlTranslate) { offsetProp = 'right'; }
        else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

        var slidesAfter;
        var slidesBefore;
        if (centeredSlides) {
          slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
          slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
        } else {
          slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
          slidesBefore = slidesPerGroup + addSlidesAfter;
        }
        var from = Math.max((activeIndex || 0) - slidesBefore, 0);
        var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
        var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

        Utils.extend(swiper.virtual, {
          from: from,
          to: to,
          offset: offset,
          slidesGrid: swiper.slidesGrid,
        });

        function onRendered() {
          swiper.updateSlides();
          swiper.updateProgress();
          swiper.updateSlidesClasses();
          if (swiper.lazy && swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }
        }

        if (previousFrom === from && previousTo === to && !force) {
          if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
            swiper.slides.css(offsetProp, (offset + "px"));
          }
          swiper.updateProgress();
          return;
        }
        if (swiper.params.virtual.renderExternal) {
          swiper.params.virtual.renderExternal.call(swiper, {
            offset: offset,
            from: from,
            to: to,
            slides: (function getSlides() {
              var slidesToRender = [];
              for (var i = from; i <= to; i += 1) {
                slidesToRender.push(slides[i]);
              }
              return slidesToRender;
            }()),
          });
          onRendered();
          return;
        }
        var prependIndexes = [];
        var appendIndexes = [];
        if (force) {
          swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
        } else {
          for (var i = previousFrom; i <= previousTo; i += 1) {
            if (i < from || i > to) {
              swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
            }
          }
        }
        for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
          if (i$1 >= from && i$1 <= to) {
            if (typeof previousTo === 'undefined' || force) {
              appendIndexes.push(i$1);
            } else {
              if (i$1 > previousTo) { appendIndexes.push(i$1); }
              if (i$1 < previousFrom) { prependIndexes.push(i$1); }
            }
          }
        }
        appendIndexes.forEach(function (index) {
          swiper.$wrapperEl.append(renderSlide(slides[index], index));
        });
        prependIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
          swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
        });
        swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
        onRendered();
      },
      renderSlide: function renderSlide(slide, index) {
        var swiper = this;
        var params = swiper.params.virtual;
        if (params.cache && swiper.virtual.cache[index]) {
          return swiper.virtual.cache[index];
        }
        var $slideEl = params.renderSlide
          ? $(params.renderSlide.call(swiper, slide, index))
          : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
        if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
        if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
        return $slideEl;
      },
      appendSlide: function appendSlide(slides) {
        var swiper = this;
        if (typeof slides === 'object' && 'length' in slides) {
          for (var i = 0; i < slides.length; i += 1) {
            if (slides[i]) { swiper.virtual.slides.push(slides[i]); }
          }
        } else {
          swiper.virtual.slides.push(slides);
        }
        swiper.virtual.update(true);
      },
      prependSlide: function prependSlide(slides) {
        var swiper = this;
        var activeIndex = swiper.activeIndex;
        var newActiveIndex = activeIndex + 1;
        var numberOfNewSlides = 1;

        if (Array.isArray(slides)) {
          for (var i = 0; i < slides.length; i += 1) {
            if (slides[i]) { swiper.virtual.slides.unshift(slides[i]); }
          }
          newActiveIndex = activeIndex + slides.length;
          numberOfNewSlides = slides.length;
        } else {
          swiper.virtual.slides.unshift(slides);
        }
        if (swiper.params.virtual.cache) {
          var cache = swiper.virtual.cache;
          var newCache = {};
          Object.keys(cache).forEach(function (cachedIndex) {
            var $cachedEl = cache[cachedIndex];
            var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
            if (cachedElIndex) {
              $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + 1);
            }
            newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
          });
          swiper.virtual.cache = newCache;
        }
        swiper.virtual.update(true);
        swiper.slideTo(newActiveIndex, 0);
      },
      removeSlide: function removeSlide(slidesIndexes) {
        var swiper = this;
        if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) { return; }
        var activeIndex = swiper.activeIndex;
        if (Array.isArray(slidesIndexes)) {
          for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
            swiper.virtual.slides.splice(slidesIndexes[i], 1);
            if (swiper.params.virtual.cache) {
              delete swiper.virtual.cache[slidesIndexes[i]];
            }
            if (slidesIndexes[i] < activeIndex) { activeIndex -= 1; }
            activeIndex = Math.max(activeIndex, 0);
          }
        } else {
          swiper.virtual.slides.splice(slidesIndexes, 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes];
          }
          if (slidesIndexes < activeIndex) { activeIndex -= 1; }
          activeIndex = Math.max(activeIndex, 0);
        }
        swiper.virtual.update(true);
        swiper.slideTo(activeIndex, 0);
      },
      removeAllSlides: function removeAllSlides() {
        var swiper = this;
        swiper.virtual.slides = [];
        if (swiper.params.virtual.cache) {
          swiper.virtual.cache = {};
        }
        swiper.virtual.update(true);
        swiper.slideTo(0, 0);
      },
    };

    var Virtual$1 = {
      name: 'virtual',
      params: {
        virtual: {
          enabled: false,
          slides: [],
          cache: true,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          virtual: {
            update: Virtual.update.bind(swiper),
            appendSlide: Virtual.appendSlide.bind(swiper),
            prependSlide: Virtual.prependSlide.bind(swiper),
            removeSlide: Virtual.removeSlide.bind(swiper),
            removeAllSlides: Virtual.removeAllSlides.bind(swiper),
            renderSlide: Virtual.renderSlide.bind(swiper),
            slides: swiper.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (!swiper.params.virtual.enabled) { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
          var overwriteParams = {
            watchSlidesProgress: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);

          if (!swiper.params.initialSlide) {
            swiper.virtual.update();
          }
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (!swiper.params.virtual.enabled) { return; }
          swiper.virtual.update();
        },
      },
    };

    var Keyboard = {
      handle: function handle(event) {
        var swiper = this;
        var rtl = swiper.rtlTranslate;
        var e = event;
        if (e.originalEvent) { e = e.originalEvent; } // jquery fix
        var kc = e.keyCode || e.charCode;
        // Directions locks
        if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40) || kc === 34)) {
          return false;
        }
        if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38) || kc === 33)) {
          return false;
        }
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
          return undefined;
        }
        if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
          return undefined;
        }
        if (swiper.params.keyboard.onlyInViewport && (kc === 33 || kc === 34 || kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
          var inView = false;
          // Check that swiper should be inside of visible area of window
          if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
            return undefined;
          }
          var windowWidth = win.innerWidth;
          var windowHeight = win.innerHeight;
          var swiperOffset = swiper.$el.offset();
          if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
          var swiperCoord = [
            [swiperOffset.left, swiperOffset.top],
            [swiperOffset.left + swiper.width, swiperOffset.top],
            [swiperOffset.left, swiperOffset.top + swiper.height],
            [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
          for (var i = 0; i < swiperCoord.length; i += 1) {
            var point = swiperCoord[i];
            if (
              point[0] >= 0 && point[0] <= windowWidth
              && point[1] >= 0 && point[1] <= windowHeight
            ) {
              inView = true;
            }
          }
          if (!inView) { return undefined; }
        }
        if (swiper.isHorizontal()) {
          if (kc === 33 || kc === 34 || kc === 37 || kc === 39) {
            if (e.preventDefault) { e.preventDefault(); }
            else { e.returnValue = false; }
          }
          if (((kc === 34 || kc === 39) && !rtl) || ((kc === 33 || kc === 37) && rtl)) { swiper.slideNext(); }
          if (((kc === 33 || kc === 37) && !rtl) || ((kc === 34 || kc === 39) && rtl)) { swiper.slidePrev(); }
        } else {
          if (kc === 33 || kc === 34 || kc === 38 || kc === 40) {
            if (e.preventDefault) { e.preventDefault(); }
            else { e.returnValue = false; }
          }
          if (kc === 34 || kc === 40) { swiper.slideNext(); }
          if (kc === 33 || kc === 38) { swiper.slidePrev(); }
        }
        swiper.emit('keyPress', kc);
        return undefined;
      },
      enable: function enable() {
        var swiper = this;
        if (swiper.keyboard.enabled) { return; }
        $(doc).on('keydown', swiper.keyboard.handle);
        swiper.keyboard.enabled = true;
      },
      disable: function disable() {
        var swiper = this;
        if (!swiper.keyboard.enabled) { return; }
        $(doc).off('keydown', swiper.keyboard.handle);
        swiper.keyboard.enabled = false;
      },
    };

    var Keyboard$1 = {
      name: 'keyboard',
      params: {
        keyboard: {
          enabled: false,
          onlyInViewport: true,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          keyboard: {
            enabled: false,
            enable: Keyboard.enable.bind(swiper),
            disable: Keyboard.disable.bind(swiper),
            handle: Keyboard.handle.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.keyboard.enabled) {
            swiper.keyboard.enable();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.keyboard.enabled) {
            swiper.keyboard.disable();
          }
        },
      },
    };

    function isEventSupported() {
      var eventName = 'onwheel';
      var isSupported = eventName in doc;

      if (!isSupported) {
        var element = doc.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
      }

      if (!isSupported
        && doc.implementation
        && doc.implementation.hasFeature
        // always returns true in newer browsers as per the standard.
        // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
        && doc.implementation.hasFeature('', '') !== true
      ) {
        // This is the only way to test support for the `wheel` event in IE9+.
        isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
      }

      return isSupported;
    }
    var Mousewheel = {
      lastScrollTime: Utils.now(),
      lastEventBeforeSnap: undefined,
      recentWheelEvents: [],
      event: function event() {
        if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
        return isEventSupported() ? 'wheel' : 'mousewheel';
      },
      normalize: function normalize(e) {
        // Reasonable defaults
        var PIXEL_STEP = 10;
        var LINE_HEIGHT = 40;
        var PAGE_HEIGHT = 800;

        var sX = 0;
        var sY = 0; // spinX, spinY
        var pX = 0;
        var pY = 0; // pixelX, pixelY

        // Legacy
        if ('detail' in e) {
          sY = e.detail;
        }
        if ('wheelDelta' in e) {
          sY = -e.wheelDelta / 120;
        }
        if ('wheelDeltaY' in e) {
          sY = -e.wheelDeltaY / 120;
        }
        if ('wheelDeltaX' in e) {
          sX = -e.wheelDeltaX / 120;
        }

        // side scrolling on FF with DOMMouseScroll
        if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
          sX = sY;
          sY = 0;
        }

        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;

        if ('deltaY' in e) {
          pY = e.deltaY;
        }
        if ('deltaX' in e) {
          pX = e.deltaX;
        }

        if (e.shiftKey && !pX) { // if user scrolls with shift he wants horizontal scroll
          pX = pY;
          pY = 0;
        }

        if ((pX || pY) && e.deltaMode) {
          if (e.deltaMode === 1) { // delta in LINE units
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
          } else { // delta in PAGE units
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
          }
        }

        // Fall-back if spin cannot be determined
        if (pX && !sX) {
          sX = (pX < 1) ? -1 : 1;
        }
        if (pY && !sY) {
          sY = (pY < 1) ? -1 : 1;
        }

        return {
          spinX: sX,
          spinY: sY,
          pixelX: pX,
          pixelY: pY,
        };
      },
      handleMouseEnter: function handleMouseEnter() {
        var swiper = this;
        swiper.mouseEntered = true;
      },
      handleMouseLeave: function handleMouseLeave() {
        var swiper = this;
        swiper.mouseEntered = false;
      },
      handle: function handle(event) {
        var e = event;
        var swiper = this;
        var params = swiper.params.mousewheel;

        if (swiper.params.cssMode) {
          e.preventDefault();
        }

        var target = swiper.$el;
        if (swiper.params.mousewheel.eventsTarged !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarged);
        }
        if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) { return true; }

        if (e.originalEvent) { e = e.originalEvent; } // jquery fix
        var delta = 0;
        var rtlFactor = swiper.rtlTranslate ? -1 : 1;

        var data = Mousewheel.normalize(e);

        if (params.forceToAxis) {
          if (swiper.isHorizontal()) {
            if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
            else { return true; }
          } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
          else { return true; }
        } else {
          delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
        }

        if (delta === 0) { return true; }

        if (params.invert) { delta = -delta; }

        if (!swiper.params.freeMode) {
          // Register the new event in a variable which stores the relevant data
          var newEvent = {
            time: Utils.now(),
            delta: Math.abs(delta),
            direction: Math.sign(delta),
            raw: event,
          };

          // Keep the most recent events
          var recentWheelEvents = swiper.mousewheel.recentWheelEvents;
          if (recentWheelEvents.length >= 2) {
            recentWheelEvents.shift(); // only store the last N events
          }
          var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          recentWheelEvents.push(newEvent);

          // If there is at least one previous recorded event:
          //   If direction has changed or
          //   if the scroll is quicker than the previous one:
          //     Animate the slider.
          // Else (this is the first time the wheel is moved):
          //     Animate the slider.
          if (prevEvent) {
            if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
              swiper.mousewheel.animateSlider(newEvent);
            }
          } else {
            swiper.mousewheel.animateSlider(newEvent);
          }

          // If it's time to release the scroll:
          //   Return now so you don't hit the preventDefault.
          if (swiper.mousewheel.releaseScroll(newEvent)) {
            return true;
          }
        } else {
          // Freemode or scrollContainer:

          // If we recently snapped after a momentum scroll, then ignore wheel events
          // to give time for the deceleration to finish. Stop ignoring after 500 msecs
          // or if it's a new scroll (larger delta or inverse sign as last event before
          // an end-of-momentum snap).
          var newEvent$1 = { time: Utils.now(), delta: Math.abs(delta), direction: Math.sign(delta) };
          var ref = swiper.mousewheel;
          var lastEventBeforeSnap = ref.lastEventBeforeSnap;
          var ignoreWheelEvents = lastEventBeforeSnap
            && newEvent$1.time < lastEventBeforeSnap.time + 500
            && newEvent$1.delta <= lastEventBeforeSnap.delta
            && newEvent$1.direction === lastEventBeforeSnap.direction;
          if (!ignoreWheelEvents) {
            swiper.mousewheel.lastEventBeforeSnap = undefined;

            if (swiper.params.loop) {
              swiper.loopFix();
            }
            var position = swiper.getTranslate() + (delta * params.sensitivity);
            var wasBeginning = swiper.isBeginning;
            var wasEnd = swiper.isEnd;

            if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
            if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

            swiper.setTransition(0);
            swiper.setTranslate(position);
            swiper.updateProgress();
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();

            if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
              swiper.updateSlidesClasses();
            }

            if (swiper.params.freeModeSticky) {
              // When wheel scrolling starts with sticky (aka snap) enabled, then detect
              // the end of a momentum scroll by storing recent (N=15?) wheel events.
              // 1. do all N events have decreasing or same (absolute value) delta?
              // 2. did all N events arrive in the last M (M=500?) msecs?
              // 3. does the earliest event have an (absolute value) delta that's
              //    at least P (P=1?) larger than the most recent event's delta?
              // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
              // If 1-4 are "yes" then we're near the end of a momuntum scroll deceleration.
              // Snap immediately and ignore remaining wheel events in this scroll.
              // See comment above for "remaining wheel events in this scroll" determination.
              // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
              clearTimeout(swiper.mousewheel.timeout);
              swiper.mousewheel.timeout = undefined;
              var recentWheelEvents$1 = swiper.mousewheel.recentWheelEvents;
              if (recentWheelEvents$1.length >= 15) {
                recentWheelEvents$1.shift(); // only store the last N events
              }
              var prevEvent$1 = recentWheelEvents$1.length ? recentWheelEvents$1[recentWheelEvents$1.length - 1] : undefined;
              var firstEvent = recentWheelEvents$1[0];
              recentWheelEvents$1.push(newEvent$1);
              if (prevEvent$1 && (newEvent$1.delta > prevEvent$1.delta || newEvent$1.direction !== prevEvent$1.direction)) {
                // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
                recentWheelEvents$1.splice(0);
              } else if (recentWheelEvents$1.length >= 15
                  && newEvent$1.time - firstEvent.time < 500
                  && firstEvent.delta - newEvent$1.delta >= 1
                  && newEvent$1.delta <= 6
              ) {
                // We're at the end of the deceleration of a momentum scroll, so there's no need
                // to wait for more events. Snap ASAP on the next tick.
                // Also, because there's some remaining momentum we'll bias the snap in the
                // direction of the ongoing scroll because it's better UX for the scroll to snap
                // in the same direction as the scroll instead of reversing to snap.  Therefore,
                // if it's already scrolled more than 20% in the current direction, keep going.
                var snapToThreshold = delta > 0 ? 0.8 : 0.2;
                swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
                recentWheelEvents$1.splice(0);
                swiper.mousewheel.timeout = Utils.nextTick(function () {
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 0); // no delay; move on next tick
              }
              if (!swiper.mousewheel.timeout) {
                // if we get here, then we haven't detected the end of a momentum scroll, so
                // we'll consider a scroll "complete" when there haven't been any wheel events
                // for 500ms.
                swiper.mousewheel.timeout = Utils.nextTick(function () {
                  var snapToThreshold = 0.5;
                  swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
                  recentWheelEvents$1.splice(0);
                  swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                }, 500);
              }
            }

            // Emit event
            if (!ignoreWheelEvents) { swiper.emit('scroll', e); }

            // Stop autoplay
            if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
            // Return page scroll on edge positions
            if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
          }
        }

        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
        return false;
      },
      animateSlider: function animateSlider(newEvent) {
        var swiper = this;
        // If the movement is NOT big enough and
        // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
        //   Don't go any further (avoid insignificant scroll movement).
        if (newEvent.delta >= 6 && Utils.now() - swiper.mousewheel.lastScrollTime < 60) {
          // Return false as a default
          return true;
        }
        // If user is scrolling towards the end:
        //   If the slider hasn't hit the latest slide or
        //   if the slider is a loop and
        //   if the slider isn't moving right now:
        //     Go to next slide and
        //     emit a scroll event.
        // Else (the user is scrolling towards the beginning) and
        // if the slider hasn't hit the first slide or
        // if the slider is a loop and
        // if the slider isn't moving right now:
        //   Go to prev slide and
        //   emit a scroll event.
        if (newEvent.direction < 0) {
          if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
            swiper.slideNext();
            swiper.emit('scroll', newEvent.raw);
          }
        } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
          swiper.slidePrev();
          swiper.emit('scroll', newEvent.raw);
        }
        // If you got here is because an animation has been triggered so store the current time
        swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
        // Return false as a default
        return false;
      },
      releaseScroll: function releaseScroll(newEvent) {
        var swiper = this;
        var params = swiper.params.mousewheel;
        if (newEvent.direction < 0) {
          if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
            // Return true to animate scroll on edges
            return true;
          }
        } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
        return false;
      },
      enable: function enable() {
        var swiper = this;
        var event = Mousewheel.event();
        if (swiper.params.cssMode) {
          swiper.wrapperEl.removeEventListener(event, swiper.mousewheel.handle);
          return true;
        }
        if (!event) { return false; }
        if (swiper.mousewheel.enabled) { return false; }
        var target = swiper.$el;
        if (swiper.params.mousewheel.eventsTarged !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarged);
        }
        target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
        target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
        target.on(event, swiper.mousewheel.handle);
        swiper.mousewheel.enabled = true;
        return true;
      },
      disable: function disable() {
        var swiper = this;
        var event = Mousewheel.event();
        if (swiper.params.cssMode) {
          swiper.wrapperEl.addEventListener(event, swiper.mousewheel.handle);
          return true;
        }
        if (!event) { return false; }
        if (!swiper.mousewheel.enabled) { return false; }
        var target = swiper.$el;
        if (swiper.params.mousewheel.eventsTarged !== 'container') {
          target = $(swiper.params.mousewheel.eventsTarged);
        }
        target.off(event, swiper.mousewheel.handle);
        swiper.mousewheel.enabled = false;
        return true;
      },
    };

    var Mousewheel$1 = {
      name: 'mousewheel',
      params: {
        mousewheel: {
          enabled: false,
          releaseOnEdges: false,
          invert: false,
          forceToAxis: false,
          sensitivity: 1,
          eventsTarged: 'container',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          mousewheel: {
            enabled: false,
            enable: Mousewheel.enable.bind(swiper),
            disable: Mousewheel.disable.bind(swiper),
            handle: Mousewheel.handle.bind(swiper),
            handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
            handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
            animateSlider: Mousewheel.animateSlider.bind(swiper),
            releaseScroll: Mousewheel.releaseScroll.bind(swiper),
            lastScrollTime: Utils.now(),
            lastEventBeforeSnap: undefined,
            recentWheelEvents: [],
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
            swiper.mousewheel.disable();
          }
          if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.params.cssMode) {
            swiper.mousewheel.enable();
          }
          if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
        },
      },
    };

    var Navigation = {
      update: function update() {
        // Update Navigation Buttons
        var swiper = this;
        var params = swiper.params.navigation;

        if (swiper.params.loop) { return; }
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;

        if ($prevEl && $prevEl.length > 0) {
          if (swiper.isBeginning) {
            $prevEl.addClass(params.disabledClass);
          } else {
            $prevEl.removeClass(params.disabledClass);
          }
          $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
        if ($nextEl && $nextEl.length > 0) {
          if (swiper.isEnd) {
            $nextEl.addClass(params.disabledClass);
          } else {
            $nextEl.removeClass(params.disabledClass);
          }
          $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        }
      },
      onPrevClick: function onPrevClick(e) {
        var swiper = this;
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) { return; }
        swiper.slidePrev();
      },
      onNextClick: function onNextClick(e) {
        var swiper = this;
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) { return; }
        swiper.slideNext();
      },
      init: function init() {
        var swiper = this;
        var params = swiper.params.navigation;
        if (!(params.nextEl || params.prevEl)) { return; }

        var $nextEl;
        var $prevEl;
        if (params.nextEl) {
          $nextEl = $(params.nextEl);
          if (
            swiper.params.uniqueNavElements
            && typeof params.nextEl === 'string'
            && $nextEl.length > 1
            && swiper.$el.find(params.nextEl).length === 1
          ) {
            $nextEl = swiper.$el.find(params.nextEl);
          }
        }
        if (params.prevEl) {
          $prevEl = $(params.prevEl);
          if (
            swiper.params.uniqueNavElements
            && typeof params.prevEl === 'string'
            && $prevEl.length > 1
            && swiper.$el.find(params.prevEl).length === 1
          ) {
            $prevEl = swiper.$el.find(params.prevEl);
          }
        }

        if ($nextEl && $nextEl.length > 0) {
          $nextEl.on('click', swiper.navigation.onNextClick);
        }
        if ($prevEl && $prevEl.length > 0) {
          $prevEl.on('click', swiper.navigation.onPrevClick);
        }

        Utils.extend(swiper.navigation, {
          $nextEl: $nextEl,
          nextEl: $nextEl && $nextEl[0],
          $prevEl: $prevEl,
          prevEl: $prevEl && $prevEl[0],
        });
      },
      destroy: function destroy() {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if ($nextEl && $nextEl.length) {
          $nextEl.off('click', swiper.navigation.onNextClick);
          $nextEl.removeClass(swiper.params.navigation.disabledClass);
        }
        if ($prevEl && $prevEl.length) {
          $prevEl.off('click', swiper.navigation.onPrevClick);
          $prevEl.removeClass(swiper.params.navigation.disabledClass);
        }
      },
    };

    var Navigation$1 = {
      name: 'navigation',
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,

          hideOnClick: false,
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
          lockClass: 'swiper-button-lock',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          navigation: {
            init: Navigation.init.bind(swiper),
            update: Navigation.update.bind(swiper),
            destroy: Navigation.destroy.bind(swiper),
            onNextClick: Navigation.onNextClick.bind(swiper),
            onPrevClick: Navigation.onPrevClick.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.navigation.init();
          swiper.navigation.update();
        },
        toEdge: function toEdge() {
          var swiper = this;
          swiper.navigation.update();
        },
        fromEdge: function fromEdge() {
          var swiper = this;
          swiper.navigation.update();
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.navigation.destroy();
        },
        click: function click(e) {
          var swiper = this;
          var ref = swiper.navigation;
          var $nextEl = ref.$nextEl;
          var $prevEl = ref.$prevEl;
          if (
            swiper.params.navigation.hideOnClick
            && !$(e.target).is($prevEl)
            && !$(e.target).is($nextEl)
          ) {
            var isHidden;
            if ($nextEl) {
              isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
            } else if ($prevEl) {
              isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
            }
            if (isHidden === true) {
              swiper.emit('navigationShow', swiper);
            } else {
              swiper.emit('navigationHide', swiper);
            }
            if ($nextEl) {
              $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
            if ($prevEl) {
              $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
            }
          }
        },
      },
    };

    var Pagination = {
      update: function update() {
        // Render || Update Pagination bullets/items
        var swiper = this;
        var rtl = swiper.rtl;
        var params = swiper.params.pagination;
        if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
        var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        var $el = swiper.pagination.$el;
        // Current/Total
        var current;
        var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        if (swiper.params.loop) {
          current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
          if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
            current -= (slidesLength - (swiper.loopedSlides * 2));
          }
          if (current > total - 1) { current -= total; }
          if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
        } else if (typeof swiper.snapIndex !== 'undefined') {
          current = swiper.snapIndex;
        } else {
          current = swiper.activeIndex || 0;
        }
        // Types
        if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
          var bullets = swiper.pagination.bullets;
          var firstIndex;
          var lastIndex;
          var midIndex;
          if (params.dynamicBullets) {
            swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
            $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
            if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
              swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
              if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
                swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (swiper.pagination.dynamicBulletIndex < 0) {
                swiper.pagination.dynamicBulletIndex = 0;
              }
            }
            firstIndex = current - swiper.pagination.dynamicBulletIndex;
            lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }
          bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
          if ($el.length > 1) {
            bullets.each(function (index, bullet) {
              var $bullet = $(bullet);
              var bulletIndex = $bullet.index();
              if (bulletIndex === current) {
                $bullet.addClass(params.bulletActiveClass);
              }
              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  $bullet.addClass(((params.bulletActiveClass) + "-main"));
                }
                if (bulletIndex === firstIndex) {
                  $bullet
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev"))
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev-prev"));
                }
                if (bulletIndex === lastIndex) {
                  $bullet
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next"))
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next-next"));
                }
              }
            });
          } else {
            var $bullet = bullets.eq(current);
            var bulletIndex = $bullet.index();
            $bullet.addClass(params.bulletActiveClass);
            if (params.dynamicBullets) {
              var $firstDisplayedBullet = bullets.eq(firstIndex);
              var $lastDisplayedBullet = bullets.eq(lastIndex);
              for (var i = firstIndex; i <= lastIndex; i += 1) {
                bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
              }
              if (swiper.params.loop) {
                if (bulletIndex >= bullets.length - params.dynamicMainBullets) {
                  for (var i$1 = params.dynamicMainBullets; i$1 >= 0; i$1 -= 1) {
                    bullets.eq(bullets.length - i$1).addClass(((params.bulletActiveClass) + "-main"));
                  }
                  bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(((params.bulletActiveClass) + "-prev"));
                } else {
                  $firstDisplayedBullet
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev"))
                    .prev()
                    .addClass(((params.bulletActiveClass) + "-prev-prev"));
                  $lastDisplayedBullet
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next"))
                    .next()
                    .addClass(((params.bulletActiveClass) + "-next-next"));
                }
              } else {
                $firstDisplayedBullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
                $lastDisplayedBullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          }
          if (params.dynamicBullets) {
            var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
            var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
            var offsetProp = rtl ? 'right' : 'left';
            bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
          }
        }
        if (params.type === 'fraction') {
          $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
          $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
        }
        if (params.type === 'progressbar') {
          var progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
          } else {
            progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
          }
          var scale = (current + 1) / total;
          var scaleX = 1;
          var scaleY = 1;
          if (progressbarDirection === 'horizontal') {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
        }
        if (params.type === 'custom' && params.renderCustom) {
          $el.html(params.renderCustom(swiper, current + 1, total));
          swiper.emit('paginationRender', swiper, $el[0]);
        } else {
          swiper.emit('paginationUpdate', swiper, $el[0]);
        }
        $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      },
      render: function render() {
        // Render Container
        var swiper = this;
        var params = swiper.params.pagination;
        if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
        var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

        var $el = swiper.pagination.$el;
        var paginationHTML = '';
        if (params.type === 'bullets') {
          var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
          for (var i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
            } else {
              paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
            }
          }
          $el.html(paginationHTML);
          swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
        }
        if (params.type === 'fraction') {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
          } else {
            paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
            + ' / '
            + "<span class=\"" + (params.totalClass) + "\"></span>";
          }
          $el.html(paginationHTML);
        }
        if (params.type === 'progressbar') {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
          } else {
            paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
          }
          $el.html(paginationHTML);
        }
        if (params.type !== 'custom') {
          swiper.emit('paginationRender', swiper.pagination.$el[0]);
        }
      },
      init: function init() {
        var swiper = this;
        var params = swiper.params.pagination;
        if (!params.el) { return; }

        var $el = $(params.el);
        if ($el.length === 0) { return; }

        if (
          swiper.params.uniqueNavElements
          && typeof params.el === 'string'
          && $el.length > 1
          && swiper.$el.find(params.el).length === 1
        ) {
          $el = swiper.$el.find(params.el);
        }

        if (params.type === 'bullets' && params.clickable) {
          $el.addClass(params.clickableClass);
        }

        $el.addClass(params.modifierClass + params.type);

        if (params.type === 'bullets' && params.dynamicBullets) {
          $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
          swiper.pagination.dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === 'progressbar' && params.progressbarOpposite) {
          $el.addClass(params.progressbarOppositeClass);
        }

        if (params.clickable) {
          $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
            e.preventDefault();
            var index = $(this).index() * swiper.params.slidesPerGroup;
            if (swiper.params.loop) { index += swiper.loopedSlides; }
            swiper.slideTo(index);
          });
        }

        Utils.extend(swiper.pagination, {
          $el: $el,
          el: $el[0],
        });
      },
      destroy: function destroy() {
        var swiper = this;
        var params = swiper.params.pagination;
        if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
        var $el = swiper.pagination.$el;

        $el.removeClass(params.hiddenClass);
        $el.removeClass(params.modifierClass + params.type);
        if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
        if (params.clickable) {
          $el.off('click', ("." + (params.bulletClass)));
        }
      },
    };

    var Pagination$1 = {
      name: 'pagination',
      params: {
        pagination: {
          el: null,
          bulletElement: 'span',
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: function (number) { return number; },
          formatFractionTotal: function (number) { return number; },
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          modifierClass: 'swiper-pagination-', // NEW
          currentClass: 'swiper-pagination-current',
          totalClass: 'swiper-pagination-total',
          hiddenClass: 'swiper-pagination-hidden',
          progressbarFillClass: 'swiper-pagination-progressbar-fill',
          progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
          clickableClass: 'swiper-pagination-clickable', // NEW
          lockClass: 'swiper-pagination-lock',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          pagination: {
            init: Pagination.init.bind(swiper),
            render: Pagination.render.bind(swiper),
            update: Pagination.update.bind(swiper),
            destroy: Pagination.destroy.bind(swiper),
            dynamicBulletIndex: 0,
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();
        },
        activeIndexChange: function activeIndexChange() {
          var swiper = this;
          if (swiper.params.loop) {
            swiper.pagination.update();
          } else if (typeof swiper.snapIndex === 'undefined') {
            swiper.pagination.update();
          }
        },
        snapIndexChange: function snapIndexChange() {
          var swiper = this;
          if (!swiper.params.loop) {
            swiper.pagination.update();
          }
        },
        slidesLengthChange: function slidesLengthChange() {
          var swiper = this;
          if (swiper.params.loop) {
            swiper.pagination.render();
            swiper.pagination.update();
          }
        },
        snapGridLengthChange: function snapGridLengthChange() {
          var swiper = this;
          if (!swiper.params.loop) {
            swiper.pagination.render();
            swiper.pagination.update();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.pagination.destroy();
        },
        click: function click(e) {
          var swiper = this;
          if (
            swiper.params.pagination.el
            && swiper.params.pagination.hideOnClick
            && swiper.pagination.$el.length > 0
            && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
          ) {
            var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);
            if (isHidden === true) {
              swiper.emit('paginationShow', swiper);
            } else {
              swiper.emit('paginationHide', swiper);
            }
            swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
          }
        },
      },
    };

    var Scrollbar = {
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var rtl = swiper.rtlTranslate;
        var progress = swiper.progress;
        var dragSize = scrollbar.dragSize;
        var trackSize = scrollbar.trackSize;
        var $dragEl = scrollbar.$dragEl;
        var $el = scrollbar.$el;
        var params = swiper.params.scrollbar;

        var newSize = dragSize;
        var newPos = (trackSize - dragSize) * progress;
        if (rtl) {
          newPos = -newPos;
          if (newPos > 0) {
            newSize = dragSize - newPos;
            newPos = 0;
          } else if (-newPos + dragSize > trackSize) {
            newSize = trackSize + newPos;
          }
        } else if (newPos < 0) {
          newSize = dragSize + newPos;
          newPos = 0;
        } else if (newPos + dragSize > trackSize) {
          newSize = trackSize - newPos;
        }
        if (swiper.isHorizontal()) {
          $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
          $dragEl[0].style.width = newSize + "px";
        } else {
          $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
          $dragEl[0].style.height = newSize + "px";
        }
        if (params.hide) {
          clearTimeout(swiper.scrollbar.timeout);
          $el[0].style.opacity = 1;
          swiper.scrollbar.timeout = setTimeout(function () {
            $el[0].style.opacity = 0;
            $el.transition(400);
          }, 1000);
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
        swiper.scrollbar.$dragEl.transition(duration);
      },
      updateSize: function updateSize() {
        var swiper = this;
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

        var scrollbar = swiper.scrollbar;
        var $dragEl = scrollbar.$dragEl;
        var $el = scrollbar.$el;

        $dragEl[0].style.width = '';
        $dragEl[0].style.height = '';
        var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

        var divider = swiper.size / swiper.virtualSize;
        var moveDivider = divider * (trackSize / swiper.size);
        var dragSize;
        if (swiper.params.scrollbar.dragSize === 'auto') {
          dragSize = trackSize * divider;
        } else {
          dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
        }

        if (swiper.isHorizontal()) {
          $dragEl[0].style.width = dragSize + "px";
        } else {
          $dragEl[0].style.height = dragSize + "px";
        }

        if (divider >= 1) {
          $el[0].style.display = 'none';
        } else {
          $el[0].style.display = '';
        }
        if (swiper.params.scrollbar.hide) {
          $el[0].style.opacity = 0;
        }
        Utils.extend(scrollbar, {
          trackSize: trackSize,
          divider: divider,
          moveDivider: moveDivider,
          dragSize: dragSize,
        });
        scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
      },
      getPointerPosition: function getPointerPosition(e) {
        var swiper = this;
        if (swiper.isHorizontal()) {
          return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].clientX : e.clientX);
        }
        return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].clientY : e.clientY);
      },
      setDragPosition: function setDragPosition(e) {
        var swiper = this;
        var scrollbar = swiper.scrollbar;
        var rtl = swiper.rtlTranslate;
        var $el = scrollbar.$el;
        var dragSize = scrollbar.dragSize;
        var trackSize = scrollbar.trackSize;
        var dragStartPos = scrollbar.dragStartPos;

        var positionRatio;
        positionRatio = ((scrollbar.getPointerPosition(e)) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top']
          - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
        positionRatio = Math.max(Math.min(positionRatio, 1), 0);
        if (rtl) {
          positionRatio = 1 - positionRatio;
        }

        var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

        swiper.updateProgress(position);
        swiper.setTranslate(position);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      },
      onDragStart: function onDragStart(e) {
        var swiper = this;
        var params = swiper.params.scrollbar;
        var scrollbar = swiper.scrollbar;
        var $wrapperEl = swiper.$wrapperEl;
        var $el = scrollbar.$el;
        var $dragEl = scrollbar.$dragEl;
        swiper.scrollbar.isTouched = true;
        swiper.scrollbar.dragStartPos = (e.target === $dragEl[0] || e.target === $dragEl)
          ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
        e.preventDefault();
        e.stopPropagation();

        $wrapperEl.transition(100);
        $dragEl.transition(100);
        scrollbar.setDragPosition(e);

        clearTimeout(swiper.scrollbar.dragTimeout);

        $el.transition(0);
        if (params.hide) {
          $el.css('opacity', 1);
        }
        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', 'none');
        }
        swiper.emit('scrollbarDragStart', e);
      },
      onDragMove: function onDragMove(e) {
        var swiper = this;
        var scrollbar = swiper.scrollbar;
        var $wrapperEl = swiper.$wrapperEl;
        var $el = scrollbar.$el;
        var $dragEl = scrollbar.$dragEl;

        if (!swiper.scrollbar.isTouched) { return; }
        if (e.preventDefault) { e.preventDefault(); }
        else { e.returnValue = false; }
        scrollbar.setDragPosition(e);
        $wrapperEl.transition(0);
        $el.transition(0);
        $dragEl.transition(0);
        swiper.emit('scrollbarDragMove', e);
      },
      onDragEnd: function onDragEnd(e) {
        var swiper = this;

        var params = swiper.params.scrollbar;
        var scrollbar = swiper.scrollbar;
        var $wrapperEl = swiper.$wrapperEl;
        var $el = scrollbar.$el;

        if (!swiper.scrollbar.isTouched) { return; }
        swiper.scrollbar.isTouched = false;
        if (swiper.params.cssMode) {
          swiper.$wrapperEl.css('scroll-snap-type', '');
          $wrapperEl.transition('');
        }
        if (params.hide) {
          clearTimeout(swiper.scrollbar.dragTimeout);
          swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
            $el.css('opacity', 0);
            $el.transition(400);
          }, 1000);
        }
        swiper.emit('scrollbarDragEnd', e);
        if (params.snapOnRelease) {
          swiper.slideToClosest();
        }
      },
      enableDraggable: function enableDraggable() {
        var swiper = this;
        if (!swiper.params.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var touchEventsTouch = swiper.touchEventsTouch;
        var touchEventsDesktop = swiper.touchEventsDesktop;
        var params = swiper.params;
        var $el = scrollbar.$el;
        var target = $el[0];
        var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
        var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        if (!Support.touch) {
          target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
          doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
          doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
        } else {
          target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
          target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
          target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
        }
      },
      disableDraggable: function disableDraggable() {
        var swiper = this;
        if (!swiper.params.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var touchEventsTouch = swiper.touchEventsTouch;
        var touchEventsDesktop = swiper.touchEventsDesktop;
        var params = swiper.params;
        var $el = scrollbar.$el;
        var target = $el[0];
        var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
        var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        if (!Support.touch) {
          target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
          doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
          doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
        } else {
          target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
          target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
          target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
        }
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.scrollbar.el) { return; }
        var scrollbar = swiper.scrollbar;
        var $swiperEl = swiper.$el;
        var params = swiper.params.scrollbar;

        var $el = $(params.el);
        if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
          $el = $swiperEl.find(params.el);
        }

        var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
        if ($dragEl.length === 0) {
          $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
          $el.append($dragEl);
        }

        Utils.extend(scrollbar, {
          $el: $el,
          el: $el[0],
          $dragEl: $dragEl,
          dragEl: $dragEl[0],
        });

        if (params.draggable) {
          scrollbar.enableDraggable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.disableDraggable();
      },
    };

    var Scrollbar$1 = {
      name: 'scrollbar',
      params: {
        scrollbar: {
          el: null,
          dragSize: 'auto',
          hide: false,
          draggable: false,
          snapOnRelease: true,
          lockClass: 'swiper-scrollbar-lock',
          dragClass: 'swiper-scrollbar-drag',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          scrollbar: {
            init: Scrollbar.init.bind(swiper),
            destroy: Scrollbar.destroy.bind(swiper),
            updateSize: Scrollbar.updateSize.bind(swiper),
            setTranslate: Scrollbar.setTranslate.bind(swiper),
            setTransition: Scrollbar.setTransition.bind(swiper),
            enableDraggable: Scrollbar.enableDraggable.bind(swiper),
            disableDraggable: Scrollbar.disableDraggable.bind(swiper),
            setDragPosition: Scrollbar.setDragPosition.bind(swiper),
            getPointerPosition: Scrollbar.getPointerPosition.bind(swiper),
            onDragStart: Scrollbar.onDragStart.bind(swiper),
            onDragMove: Scrollbar.onDragMove.bind(swiper),
            onDragEnd: Scrollbar.onDragEnd.bind(swiper),
            isTouched: false,
            timeout: null,
            dragTimeout: null,
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          swiper.scrollbar.init();
          swiper.scrollbar.updateSize();
          swiper.scrollbar.setTranslate();
        },
        update: function update() {
          var swiper = this;
          swiper.scrollbar.updateSize();
        },
        resize: function resize() {
          var swiper = this;
          swiper.scrollbar.updateSize();
        },
        observerUpdate: function observerUpdate() {
          var swiper = this;
          swiper.scrollbar.updateSize();
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          swiper.scrollbar.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          swiper.scrollbar.setTransition(duration);
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.scrollbar.destroy();
        },
      },
    };

    var Parallax = {
      setTransform: function setTransform(el, progress) {
        var swiper = this;
        var rtl = swiper.rtl;

        var $el = $(el);
        var rtlFactor = rtl ? -1 : 1;

        var p = $el.attr('data-swiper-parallax') || '0';
        var x = $el.attr('data-swiper-parallax-x');
        var y = $el.attr('data-swiper-parallax-y');
        var scale = $el.attr('data-swiper-parallax-scale');
        var opacity = $el.attr('data-swiper-parallax-opacity');

        if (x || y) {
          x = x || '0';
          y = y || '0';
        } else if (swiper.isHorizontal()) {
          x = p;
          y = '0';
        } else {
          y = p;
          x = '0';
        }

        if ((x).indexOf('%') >= 0) {
          x = (parseInt(x, 10) * progress * rtlFactor) + "%";
        } else {
          x = (x * progress * rtlFactor) + "px";
        }
        if ((y).indexOf('%') >= 0) {
          y = (parseInt(y, 10) * progress) + "%";
        } else {
          y = (y * progress) + "px";
        }

        if (typeof opacity !== 'undefined' && opacity !== null) {
          var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
          $el[0].style.opacity = currentOpacity;
        }
        if (typeof scale === 'undefined' || scale === null) {
          $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
        } else {
          var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
          $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        var $el = swiper.$el;
        var slides = swiper.slides;
        var progress = swiper.progress;
        var snapGrid = swiper.snapGrid;
        $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, progress);
          });
        slides.each(function (slideIndex, slideEl) {
          var slideProgress = slideEl.progress;
          if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
            slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
          }
          slideProgress = Math.min(Math.max(slideProgress, -1), 1);
          $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
            .each(function (index, el) {
              swiper.parallax.setTransform(el, slideProgress);
            });
        });
      },
      setTransition: function setTransition(duration) {
        if ( duration === void 0 ) duration = this.params.speed;

        var swiper = this;
        var $el = swiper.$el;
        $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, parallaxEl) {
            var $parallaxEl = $(parallaxEl);
            var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
            if (duration === 0) { parallaxDuration = 0; }
            $parallaxEl.transition(parallaxDuration);
          });
      },
    };

    var Parallax$1 = {
      name: 'parallax',
      params: {
        parallax: {
          enabled: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          parallax: {
            setTransform: Parallax.setTransform.bind(swiper),
            setTranslate: Parallax.setTranslate.bind(swiper),
            setTransition: Parallax.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        },
        init: function init() {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.parallax.setTranslate();
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.parallax.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (!swiper.params.parallax.enabled) { return; }
          swiper.parallax.setTransition(duration);
        },
      },
    };

    var Zoom = {
      // Calc Scale From Multi-touches
      getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) { return 1; }
        var x1 = e.targetTouches[0].pageX;
        var y1 = e.targetTouches[0].pageY;
        var x2 = e.targetTouches[1].pageX;
        var y2 = e.targetTouches[1].pageY;
        var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
        return distance;
      },
      // Events
      onGestureStart: function onGestureStart(e) {
        var swiper = this;
        var params = swiper.params.zoom;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
        if (!Support.gestures) {
          if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
            return;
          }
          zoom.fakeGestureTouched = true;
          gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
        }
        if (!gesture.$slideEl || !gesture.$slideEl.length) {
          gesture.$slideEl = $(e.target).closest(("." + (swiper.params.slideClass)));
          if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
          gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
          gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
          gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
          if (gesture.$imageWrapEl.length === 0) {
            gesture.$imageEl = undefined;
            return;
          }
        }
        if (gesture.$imageEl) {
          gesture.$imageEl.transition(0);
        }
        swiper.zoom.isScaling = true;
      },
      onGestureChange: function onGestureChange(e) {
        var swiper = this;
        var params = swiper.params.zoom;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        if (!Support.gestures) {
          if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
            return;
          }
          zoom.fakeGestureMoved = true;
          gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        if (Support.gestures) {
          zoom.scale = e.scale * zoom.currentScale;
        } else {
          zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
        }
        if (zoom.scale > gesture.maxRatio) {
          zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
        }
        if (zoom.scale < params.minRatio) {
          zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
        }
        gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      },
      onGestureEnd: function onGestureEnd(e) {
        var swiper = this;
        var params = swiper.params.zoom;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        if (!Support.gestures) {
          if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
            return;
          }
          if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
            return;
          }
          zoom.fakeGestureTouched = false;
          zoom.fakeGestureMoved = false;
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
        gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
        zoom.currentScale = zoom.scale;
        zoom.isScaling = false;
        if (zoom.scale === 1) { gesture.$slideEl = undefined; }
      },
      onTouchStart: function onTouchStart(e) {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        if (image.isTouched) { return; }
        if (Device.android && e.cancelable) { e.preventDefault(); }
        image.isTouched = true;
        image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      },
      onTouchMove: function onTouchMove(e) {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;
        var velocity = zoom.velocity;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        swiper.allowClick = false;
        if (!image.isTouched || !gesture.$slideEl) { return; }

        if (!image.isMoved) {
          image.width = gesture.$imageEl[0].offsetWidth;
          image.height = gesture.$imageEl[0].offsetHeight;
          image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
          image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
          gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
          gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
          gesture.$imageWrapEl.transition(0);
          if (swiper.rtl) {
            image.startX = -image.startX;
            image.startY = -image.startY;
          }
        }
        // Define if we need image drag
        var scaledWidth = image.width * zoom.scale;
        var scaledHeight = image.height * zoom.scale;

        if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

        image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
        image.maxX = -image.minX;
        image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
        image.maxY = -image.minY;

        image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!image.isMoved && !zoom.isScaling) {
          if (
            swiper.isHorizontal()
            && (
              (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
              || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
            )
          ) {
            image.isTouched = false;
            return;
          } if (
            !swiper.isHorizontal()
            && (
              (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
              || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
            )
          ) {
            image.isTouched = false;
            return;
          }
        }
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();

        image.isMoved = true;
        image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
        image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

        if (image.currentX < image.minX) {
          image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
        }
        if (image.currentX > image.maxX) {
          image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
        }

        if (image.currentY < image.minY) {
          image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
        }
        if (image.currentY > image.maxY) {
          image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
        }

        // Velocity
        if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
        if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
        if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
        velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
        velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
        if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
        if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
        velocity.prevPositionX = image.touchesCurrent.x;
        velocity.prevPositionY = image.touchesCurrent.y;
        velocity.prevTime = Date.now();

        gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
      },
      onTouchEnd: function onTouchEnd() {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;
        var velocity = zoom.velocity;
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
        if (!image.isTouched || !image.isMoved) {
          image.isTouched = false;
          image.isMoved = false;
          return;
        }
        image.isTouched = false;
        image.isMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = velocity.x * momentumDurationX;
        var newPositionX = image.currentX + momentumDistanceX;
        var momentumDistanceY = velocity.y * momentumDurationY;
        var newPositionY = image.currentY + momentumDistanceY;

        // Fix duration
        if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
        if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        image.currentX = newPositionX;
        image.currentY = newPositionY;

        // Define if we need image drag
        var scaledWidth = image.width * zoom.scale;
        var scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
        image.maxX = -image.minX;
        image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
        image.maxY = -image.minY;
        image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
        image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

        gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
      },
      onTransitionEnd: function onTransitionEnd() {
        var swiper = this;
        var zoom = swiper.zoom;
        var gesture = zoom.gesture;
        if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
          if (gesture.$imageEl) {
            gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
          }
          if (gesture.$imageWrapEl) {
            gesture.$imageWrapEl.transform('translate3d(0,0,0)');
          }

          zoom.scale = 1;
          zoom.currentScale = 1;

          gesture.$slideEl = undefined;
          gesture.$imageEl = undefined;
          gesture.$imageWrapEl = undefined;
        }
      },
      // Toggle Zoom
      toggle: function toggle(e) {
        var swiper = this;
        var zoom = swiper.zoom;

        if (zoom.scale && zoom.scale !== 1) {
          // Zoom Out
          zoom.out();
        } else {
          // Zoom In
          zoom.in(e);
        }
      },
      in: function in$1(e) {
        var swiper = this;

        var zoom = swiper.zoom;
        var params = swiper.params.zoom;
        var gesture = zoom.gesture;
        var image = zoom.image;

        if (!gesture.$slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.$slideEl = swiper.$wrapperEl.children(("." + (swiper.params.slideActiveClass)));
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }
          gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
          gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

        gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

        var touchX;
        var touchY;
        var offsetX;
        var offsetY;
        var diffX;
        var diffY;
        var translateX;
        var translateY;
        var imageWidth;
        var imageHeight;
        var scaledWidth;
        var scaledHeight;
        var translateMinX;
        var translateMinY;
        var translateMaxX;
        var translateMaxY;
        var slideWidth;
        var slideHeight;

        if (typeof image.touchesStart.x === 'undefined' && e) {
          touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
          touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
        } else {
          touchX = image.touchesStart.x;
          touchY = image.touchesStart.y;
        }

        zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (e) {
          slideWidth = gesture.$slideEl[0].offsetWidth;
          slideHeight = gesture.$slideEl[0].offsetHeight;
          offsetX = gesture.$slideEl.offset().left;
          offsetY = gesture.$slideEl.offset().top;
          diffX = (offsetX + (slideWidth / 2)) - touchX;
          diffY = (offsetY + (slideHeight / 2)) - touchY;

          imageWidth = gesture.$imageEl[0].offsetWidth;
          imageHeight = gesture.$imageEl[0].offsetHeight;
          scaledWidth = imageWidth * zoom.scale;
          scaledHeight = imageHeight * zoom.scale;

          translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
          translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
          translateMaxX = -translateMinX;
          translateMaxY = -translateMinY;

          translateX = diffX * zoom.scale;
          translateY = diffY * zoom.scale;

          if (translateX < translateMinX) {
            translateX = translateMinX;
          }
          if (translateX > translateMaxX) {
            translateX = translateMaxX;
          }

          if (translateY < translateMinY) {
            translateY = translateMinY;
          }
          if (translateY > translateMaxY) {
            translateY = translateMaxY;
          }
        } else {
          translateX = 0;
          translateY = 0;
        }
        gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
        gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      },
      out: function out() {
        var swiper = this;

        var zoom = swiper.zoom;
        var params = swiper.params.zoom;
        var gesture = zoom.gesture;

        if (!gesture.$slideEl) {
          if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
            gesture.$slideEl = swiper.$wrapperEl.children(("." + (swiper.params.slideActiveClass)));
          } else {
            gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
          }
          gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
          gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        }
        if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

        zoom.scale = 1;
        zoom.currentScale = 1;
        gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
        gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
        gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
        gesture.$slideEl = undefined;
      },
      // Attach/Detach Events
      enable: function enable() {
        var swiper = this;
        var zoom = swiper.zoom;
        if (zoom.enabled) { return; }
        zoom.enabled = true;

        var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
        var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

        var slideSelector = "." + (swiper.params.slideClass);

        // Scale image
        if (Support.gestures) {
          swiper.$wrapperEl.on('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.on('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
          swiper.$wrapperEl.on('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);
          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
          }
        }

        // Move image
        swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
      },
      disable: function disable() {
        var swiper = this;
        var zoom = swiper.zoom;
        if (!zoom.enabled) { return; }

        swiper.zoom.enabled = false;

        var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
        var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

        var slideSelector = "." + (swiper.params.slideClass);

        // Scale image
        if (Support.gestures) {
          swiper.$wrapperEl.off('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.off('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
          swiper.$wrapperEl.off('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
        } else if (swiper.touchEvents.start === 'touchstart') {
          swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
          swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
          swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);
          if (swiper.touchEvents.cancel) {
            swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
          }
        }

        // Move image
        swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
      },
    };

    var Zoom$1 = {
      name: 'zoom',
      params: {
        zoom: {
          enabled: false,
          maxRatio: 3,
          minRatio: 1,
          toggle: true,
          containerClass: 'swiper-zoom-container',
          zoomedSlideClass: 'swiper-slide-zoomed',
        },
      },
      create: function create() {
        var swiper = this;
        var zoom = {
          enabled: false,
          scale: 1,
          currentScale: 1,
          isScaling: false,
          gesture: {
            $slideEl: undefined,
            slideWidth: undefined,
            slideHeight: undefined,
            $imageEl: undefined,
            $imageWrapEl: undefined,
            maxRatio: 3,
          },
          image: {
            isTouched: undefined,
            isMoved: undefined,
            currentX: undefined,
            currentY: undefined,
            minX: undefined,
            minY: undefined,
            maxX: undefined,
            maxY: undefined,
            width: undefined,
            height: undefined,
            startX: undefined,
            startY: undefined,
            touchesStart: {},
            touchesCurrent: {},
          },
          velocity: {
            x: undefined,
            y: undefined,
            prevPositionX: undefined,
            prevPositionY: undefined,
            prevTime: undefined,
          },
        };

        ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
          zoom[methodName] = Zoom[methodName].bind(swiper);
        });
        Utils.extend(swiper, {
          zoom: zoom,
        });

        var scale = 1;
        Object.defineProperty(swiper.zoom, 'scale', {
          get: function get() {
            return scale;
          },
          set: function set(value) {
            if (scale !== value) {
              var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
              var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
              swiper.emit('zoomChange', value, imageEl, slideEl);
            }
            scale = value;
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.zoom.enabled) {
            swiper.zoom.enable();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          swiper.zoom.disable();
        },
        touchStart: function touchStart(e) {
          var swiper = this;
          if (!swiper.zoom.enabled) { return; }
          swiper.zoom.onTouchStart(e);
        },
        touchEnd: function touchEnd(e) {
          var swiper = this;
          if (!swiper.zoom.enabled) { return; }
          swiper.zoom.onTouchEnd(e);
        },
        doubleTap: function doubleTap(e) {
          var swiper = this;
          if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
            swiper.zoom.toggle(e);
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
            swiper.zoom.onTransitionEnd();
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
            swiper.zoom.onTransitionEnd();
          }
        },
      },
    };

    var Lazy = {
      loadInSlide: function loadInSlide(index, loadInDuplicate) {
        if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

        var swiper = this;
        var params = swiper.params.lazy;
        if (typeof index === 'undefined') { return; }
        if (swiper.slides.length === 0) { return; }
        var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

        var $slideEl = isVirtual
          ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
          : swiper.slides.eq(index);

        var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
        if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
          $images = $images.add($slideEl[0]);
        }
        if ($images.length === 0) { return; }

        $images.each(function (imageIndex, imageEl) {
          var $imageEl = $(imageEl);
          $imageEl.addClass(params.loadingClass);

          var background = $imageEl.attr('data-background');
          var src = $imageEl.attr('data-src');
          var srcset = $imageEl.attr('data-srcset');
          var sizes = $imageEl.attr('data-sizes');
          var $pictureEl = $imageEl.parent('picture');

          swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
            if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
            if (background) {
              $imageEl.css('background-image', ("url(\"" + background + "\")"));
              $imageEl.removeAttr('data-background');
            } else {
              if (srcset) {
                $imageEl.attr('srcset', srcset);
                $imageEl.removeAttr('data-srcset');
              }
              if (sizes) {
                $imageEl.attr('sizes', sizes);
                $imageEl.removeAttr('data-sizes');
              }
              if ($pictureEl.length) {
                $pictureEl.children('source').each(function (sourceIndex, sourceEl) {
                  var $source = $(sourceEl);

                  if ($source.attr('data-srcset')) {
                    $source.attr('srcset', $source.attr('data-srcset'));
                    $source.removeAttr('data-srcset');
                  }
                });
              }
              if (src) {
                $imageEl.attr('src', src);
                $imageEl.removeAttr('data-src');
              }
            }

            $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
            $slideEl.find(("." + (params.preloaderClass))).remove();
            if (swiper.params.loop && loadInDuplicate) {
              var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
              if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
                swiper.lazy.loadInSlide(originalSlide.index(), false);
              } else {
                var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
                swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
              }
            }
            swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
            if (swiper.params.autoHeight) {
              swiper.updateAutoHeight();
            }
          });

          swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
        });
      },
      load: function load() {
        var swiper = this;
        var $wrapperEl = swiper.$wrapperEl;
        var swiperParams = swiper.params;
        var slides = swiper.slides;
        var activeIndex = swiper.activeIndex;
        var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
        var params = swiperParams.lazy;

        var slidesPerView = swiperParams.slidesPerView;
        if (slidesPerView === 'auto') {
          slidesPerView = 0;
        }

        function slideExist(index) {
          if (isVirtual) {
            if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
              return true;
            }
          } else if (slides[index]) { return true; }
          return false;
        }

        function slideIndex(slideEl) {
          if (isVirtual) {
            return $(slideEl).attr('data-swiper-slide-index');
          }
          return $(slideEl).index();
        }

        if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
        if (swiper.params.watchSlidesVisibility) {
          $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
            var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
            swiper.lazy.loadInSlide(index);
          });
        } else if (slidesPerView > 1) {
          for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
            if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
          }
        } else {
          swiper.lazy.loadInSlide(activeIndex);
        }
        if (params.loadPrevNext) {
          if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
            var amount = params.loadPrevNextAmount;
            var spv = slidesPerView;
            var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
            var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
            // Next Slides
            for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
              if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
            }
            // Prev Slides
            for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
              if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
            }
          } else {
            var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
            if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

            var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
            if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
          }
        }
      },
    };

    var Lazy$1 = {
      name: 'lazy',
      params: {
        lazy: {
          enabled: false,
          loadPrevNext: false,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: false,

          elementClass: 'swiper-lazy',
          loadingClass: 'swiper-lazy-loading',
          loadedClass: 'swiper-lazy-loaded',
          preloaderClass: 'swiper-lazy-preloader',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          lazy: {
            initialImageLoaded: false,
            load: Lazy.load.bind(swiper),
            loadInSlide: Lazy.loadInSlide.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
            swiper.params.preloadImages = false;
          }
        },
        init: function init() {
          var swiper = this;
          if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
            swiper.lazy.load();
          }
        },
        scroll: function scroll() {
          var swiper = this;
          if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
            swiper.lazy.load();
          }
        },
        resize: function resize() {
          var swiper = this;
          if (swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }
        },
        scrollbarDragMove: function scrollbarDragMove() {
          var swiper = this;
          if (swiper.params.lazy.enabled) {
            swiper.lazy.load();
          }
        },
        transitionStart: function transitionStart() {
          var swiper = this;
          if (swiper.params.lazy.enabled) {
            if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
              swiper.lazy.load();
            }
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
            swiper.lazy.load();
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.params.lazy.enabled && swiper.params.cssMode) {
            swiper.lazy.load();
          }
        },
      },
    };

    /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

    var Controller = {
      LinearSpline: function LinearSpline(x, y) {
        var binarySearch = (function search() {
          var maxIndex;
          var minIndex;
          var guess;
          return function (array, val) {
            minIndex = -1;
            maxIndex = array.length;
            while (maxIndex - minIndex > 1) {
              guess = maxIndex + minIndex >> 1;
              if (array[guess] <= val) {
                minIndex = guess;
              } else {
                maxIndex = guess;
              }
            }
            return maxIndex;
          };
        }());
        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1;
        // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.
        var i1;
        var i3;

        this.interpolate = function interpolate(x2) {
          if (!x2) { return 0; }

          // Get the indexes of x1 and x3 (the array indexes before and after given x2):
          i3 = binarySearch(this.x, x2);
          i1 = i3 - 1;

          // We have our indexes i1 & i3, so we can calculate already:
          // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
          return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
        };
        return this;
      },
      // xxx: for now i will just save one spline function to to
      getInterpolateFunction: function getInterpolateFunction(c) {
        var swiper = this;
        if (!swiper.controller.spline) {
          swiper.controller.spline = swiper.params.loop
            ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
            : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
        }
      },
      setTranslate: function setTranslate(setTranslate$1, byController) {
        var swiper = this;
        var controlled = swiper.controller.control;
        var multiplier;
        var controlledTranslate;
        function setControlledTranslate(c) {
          // this will create an Interpolate function based on the snapGrids
          // x is the Grid of the scrolled scroller and y will be the controlled scroller
          // it makes sense to create this only once and recall it for the interpolation
          // the function does a lot of value caching for performance
          var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
          if (swiper.params.controller.by === 'slide') {
            swiper.controller.getInterpolateFunction(c);
            // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
            // but it did not work out
            controlledTranslate = -swiper.controller.spline.interpolate(-translate);
          }

          if (!controlledTranslate || swiper.params.controller.by === 'container') {
            multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
            controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
          }

          if (swiper.params.controller.inverse) {
            controlledTranslate = c.maxTranslate() - controlledTranslate;
          }
          c.updateProgress(controlledTranslate);
          c.setTranslate(controlledTranslate, swiper);
          c.updateActiveIndex();
          c.updateSlidesClasses();
        }
        if (Array.isArray(controlled)) {
          for (var i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTranslate(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTranslate(controlled);
        }
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        var controlled = swiper.controller.control;
        var i;
        function setControlledTransition(c) {
          c.setTransition(duration, swiper);
          if (duration !== 0) {
            c.transitionStart();
            if (c.params.autoHeight) {
              Utils.nextTick(function () {
                c.updateAutoHeight();
              });
            }
            c.$wrapperEl.transitionEnd(function () {
              if (!controlled) { return; }
              if (c.params.loop && swiper.params.controller.by === 'slide') {
                c.loopFix();
              }
              c.transitionEnd();
            });
          }
        }
        if (Array.isArray(controlled)) {
          for (i = 0; i < controlled.length; i += 1) {
            if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
              setControlledTransition(controlled[i]);
            }
          }
        } else if (controlled instanceof Swiper && byController !== controlled) {
          setControlledTransition(controlled);
        }
      },
    };
    var Controller$1 = {
      name: 'controller',
      params: {
        controller: {
          control: undefined,
          inverse: false,
          by: 'slide', // or 'container'
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          controller: {
            control: swiper.params.controller.control,
            getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
            setTranslate: Controller.setTranslate.bind(swiper),
            setTransition: Controller.setTransition.bind(swiper),
          },
        });
      },
      on: {
        update: function update() {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        },
        resize: function resize() {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        },
        observerUpdate: function observerUpdate() {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
          }
        },
        setTranslate: function setTranslate(translate, byController) {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          swiper.controller.setTranslate(translate, byController);
        },
        setTransition: function setTransition(duration, byController) {
          var swiper = this;
          if (!swiper.controller.control) { return; }
          swiper.controller.setTransition(duration, byController);
        },
      },
    };

    var a11y = {
      makeElFocusable: function makeElFocusable($el) {
        $el.attr('tabIndex', '0');
        return $el;
      },
      makeElNotFocusable: function makeElNotFocusable($el) {
        $el.attr('tabIndex', '-1');
        return $el;
      },
      addElRole: function addElRole($el, role) {
        $el.attr('role', role);
        return $el;
      },
      addElLabel: function addElLabel($el, label) {
        $el.attr('aria-label', label);
        return $el;
      },
      disableEl: function disableEl($el) {
        $el.attr('aria-disabled', true);
        return $el;
      },
      enableEl: function enableEl($el) {
        $el.attr('aria-disabled', false);
        return $el;
      },
      onEnterKey: function onEnterKey(e) {
        var swiper = this;
        var params = swiper.params.a11y;
        if (e.keyCode !== 13) { return; }
        var $targetEl = $(e.target);
        if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
          if (!(swiper.isEnd && !swiper.params.loop)) {
            swiper.slideNext();
          }
          if (swiper.isEnd) {
            swiper.a11y.notify(params.lastSlideMessage);
          } else {
            swiper.a11y.notify(params.nextSlideMessage);
          }
        }
        if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
          if (!(swiper.isBeginning && !swiper.params.loop)) {
            swiper.slidePrev();
          }
          if (swiper.isBeginning) {
            swiper.a11y.notify(params.firstSlideMessage);
          } else {
            swiper.a11y.notify(params.prevSlideMessage);
          }
        }
        if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
          $targetEl[0].click();
        }
      },
      notify: function notify(message) {
        var swiper = this;
        var notification = swiper.a11y.liveRegion;
        if (notification.length === 0) { return; }
        notification.html('');
        notification.html(message);
      },
      updateNavigation: function updateNavigation() {
        var swiper = this;

        if (swiper.params.loop || !swiper.navigation) { return; }
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;

        if ($prevEl && $prevEl.length > 0) {
          if (swiper.isBeginning) {
            swiper.a11y.disableEl($prevEl);
            swiper.a11y.makeElNotFocusable($prevEl);
          } else {
            swiper.a11y.enableEl($prevEl);
            swiper.a11y.makeElFocusable($prevEl);
          }
        }
        if ($nextEl && $nextEl.length > 0) {
          if (swiper.isEnd) {
            swiper.a11y.disableEl($nextEl);
            swiper.a11y.makeElNotFocusable($nextEl);
          } else {
            swiper.a11y.enableEl($nextEl);
            swiper.a11y.makeElFocusable($nextEl);
          }
        }
      },
      updatePagination: function updatePagination() {
        var swiper = this;
        var params = swiper.params.a11y;
        if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
          swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
            var $bulletEl = $(bulletEl);
            swiper.a11y.makeElFocusable($bulletEl);
            swiper.a11y.addElRole($bulletEl, 'button');
            swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
          });
        }
      },
      init: function init() {
        var swiper = this;

        swiper.$el.append(swiper.a11y.liveRegion);

        // Navigation
        var params = swiper.params.a11y;
        var $nextEl;
        var $prevEl;
        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }
        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }
        if ($nextEl) {
          swiper.a11y.makeElFocusable($nextEl);
          swiper.a11y.addElRole($nextEl, 'button');
          swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
          $nextEl.on('keydown', swiper.a11y.onEnterKey);
        }
        if ($prevEl) {
          swiper.a11y.makeElFocusable($prevEl);
          swiper.a11y.addElRole($prevEl, 'button');
          swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
          $prevEl.on('keydown', swiper.a11y.onEnterKey);
        }

        // Pagination
        if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
          swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

        var $nextEl;
        var $prevEl;
        if (swiper.navigation && swiper.navigation.$nextEl) {
          $nextEl = swiper.navigation.$nextEl;
        }
        if (swiper.navigation && swiper.navigation.$prevEl) {
          $prevEl = swiper.navigation.$prevEl;
        }
        if ($nextEl) {
          $nextEl.off('keydown', swiper.a11y.onEnterKey);
        }
        if ($prevEl) {
          $prevEl.off('keydown', swiper.a11y.onEnterKey);
        }

        // Pagination
        if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
          swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
        }
      },
    };
    var A11y = {
      name: 'a11y',
      params: {
        a11y: {
          enabled: true,
          notificationClass: 'swiper-notification',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          a11y: {
            liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
          },
        });
        Object.keys(a11y).forEach(function (methodName) {
          swiper.a11y[methodName] = a11y[methodName].bind(swiper);
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.init();
          swiper.a11y.updateNavigation();
        },
        toEdge: function toEdge() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.updateNavigation();
        },
        fromEdge: function fromEdge() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.updateNavigation();
        },
        paginationUpdate: function paginationUpdate() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.updatePagination();
        },
        destroy: function destroy() {
          var swiper = this;
          if (!swiper.params.a11y.enabled) { return; }
          swiper.a11y.destroy();
        },
      },
    };

    var History = {
      init: function init() {
        var swiper = this;
        if (!swiper.params.history) { return; }
        if (!win.history || !win.history.pushState) {
          swiper.params.history.enabled = false;
          swiper.params.hashNavigation.enabled = true;
          return;
        }
        var history = swiper.history;
        history.initialized = true;
        history.paths = History.getPathValues();
        if (!history.paths.key && !history.paths.value) { return; }
        history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
        if (!swiper.params.history.replaceState) {
          win.addEventListener('popstate', swiper.history.setHistoryPopState);
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.history.replaceState) {
          win.removeEventListener('popstate', swiper.history.setHistoryPopState);
        }
      },
      setHistoryPopState: function setHistoryPopState() {
        var swiper = this;
        swiper.history.paths = History.getPathValues();
        swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
      },
      getPathValues: function getPathValues() {
        var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
        var total = pathArray.length;
        var key = pathArray[total - 2];
        var value = pathArray[total - 1];
        return { key: key, value: value };
      },
      setHistory: function setHistory(key, index) {
        var swiper = this;
        if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
        var slide = swiper.slides.eq(index);
        var value = History.slugify(slide.attr('data-history'));
        if (!win.location.pathname.includes(key)) {
          value = key + "/" + value;
        }
        var currentState = win.history.state;
        if (currentState && currentState.value === value) {
          return;
        }
        if (swiper.params.history.replaceState) {
          win.history.replaceState({ value: value }, null, value);
        } else {
          win.history.pushState({ value: value }, null, value);
        }
      },
      slugify: function slugify(text) {
        return text.toString()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      },
      scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
        var swiper = this;
        if (value) {
          for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
            var slide = swiper.slides.eq(i);
            var slideHistory = History.slugify(slide.attr('data-history'));
            if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              var index = slide.index();
              swiper.slideTo(index, speed, runCallbacks);
            }
          }
        } else {
          swiper.slideTo(0, speed, runCallbacks);
        }
      },
    };

    var History$1 = {
      name: 'history',
      params: {
        history: {
          enabled: false,
          replaceState: false,
          key: 'slides',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          history: {
            init: History.init.bind(swiper),
            setHistory: History.setHistory.bind(swiper),
            setHistoryPopState: History.setHistoryPopState.bind(swiper),
            scrollToSlide: History.scrollToSlide.bind(swiper),
            destroy: History.destroy.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.history.enabled) {
            swiper.history.init();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.params.history.enabled) {
            swiper.history.destroy();
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.history.initialized) {
            swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.history.initialized && swiper.params.cssMode) {
            swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
          }
        },
      },
    };

    var HashNavigation = {
      onHashCange: function onHashCange() {
        var swiper = this;
        swiper.emit('hashChange');
        var newHash = doc.location.hash.replace('#', '');
        var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
        if (newHash !== activeSlideHash) {
          var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
          if (typeof newIndex === 'undefined') { return; }
          swiper.slideTo(newIndex);
        }
      },
      setHash: function setHash() {
        var swiper = this;
        if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
        if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
          win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
          swiper.emit('hashSet');
        } else {
          var slide = swiper.slides.eq(swiper.activeIndex);
          var hash = slide.attr('data-hash') || slide.attr('data-history');
          doc.location.hash = hash || '';
          swiper.emit('hashSet');
        }
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
        swiper.hashNavigation.initialized = true;
        var hash = doc.location.hash.replace('#', '');
        if (hash) {
          var speed = 0;
          for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
            var slide = swiper.slides.eq(i);
            var slideHash = slide.attr('data-hash') || slide.attr('data-history');
            if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
              var index = slide.index();
              swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
            }
          }
        }
        if (swiper.params.hashNavigation.watchState) {
          $(win).on('hashchange', swiper.hashNavigation.onHashCange);
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.watchState) {
          $(win).off('hashchange', swiper.hashNavigation.onHashCange);
        }
      },
    };
    var HashNavigation$1 = {
      name: 'hash-navigation',
      params: {
        hashNavigation: {
          enabled: false,
          replaceState: false,
          watchState: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          hashNavigation: {
            initialized: false,
            init: HashNavigation.init.bind(swiper),
            destroy: HashNavigation.destroy.bind(swiper),
            setHash: HashNavigation.setHash.bind(swiper),
            onHashCange: HashNavigation.onHashCange.bind(swiper),
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.hashNavigation.enabled) {
            swiper.hashNavigation.init();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.params.hashNavigation.enabled) {
            swiper.hashNavigation.destroy();
          }
        },
        transitionEnd: function transitionEnd() {
          var swiper = this;
          if (swiper.hashNavigation.initialized) {
            swiper.hashNavigation.setHash();
          }
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
            swiper.hashNavigation.setHash();
          }
        },
      },
    };

    /* eslint no-underscore-dangle: "off" */

    var Autoplay = {
      run: function run() {
        var swiper = this;
        var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
        var delay = swiper.params.autoplay.delay;
        if ($activeSlideEl.attr('data-swiper-autoplay')) {
          delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
        }
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = Utils.nextTick(function () {
          if (swiper.params.autoplay.reverseDirection) {
            if (swiper.params.loop) {
              swiper.loopFix();
              swiper.slidePrev(swiper.params.speed, true, true);
              swiper.emit('autoplay');
            } else if (!swiper.isBeginning) {
              swiper.slidePrev(swiper.params.speed, true, true);
              swiper.emit('autoplay');
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
              swiper.emit('autoplay');
            } else {
              swiper.autoplay.stop();
            }
          } else if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slideNext(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isEnd) {
            swiper.slideNext(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(0, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
          if (swiper.params.cssMode && swiper.autoplay.running) { swiper.autoplay.run(); }
        }, delay);
      },
      start: function start() {
        var swiper = this;
        if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
        if (swiper.autoplay.running) { return false; }
        swiper.autoplay.running = true;
        swiper.emit('autoplayStart');
        swiper.autoplay.run();
        return true;
      },
      stop: function stop() {
        var swiper = this;
        if (!swiper.autoplay.running) { return false; }
        if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

        if (swiper.autoplay.timeout) {
          clearTimeout(swiper.autoplay.timeout);
          swiper.autoplay.timeout = undefined;
        }
        swiper.autoplay.running = false;
        swiper.emit('autoplayStop');
        return true;
      },
      pause: function pause(speed) {
        var swiper = this;
        if (!swiper.autoplay.running) { return; }
        if (swiper.autoplay.paused) { return; }
        if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
        swiper.autoplay.paused = true;
        if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
          swiper.autoplay.paused = false;
          swiper.autoplay.run();
        } else {
          swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
          swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
        }
      },
    };

    var Autoplay$1 = {
      name: 'autoplay',
      params: {
        autoplay: {
          enabled: false,
          delay: 3000,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          autoplay: {
            running: false,
            paused: false,
            run: Autoplay.run.bind(swiper),
            start: Autoplay.start.bind(swiper),
            stop: Autoplay.stop.bind(swiper),
            pause: Autoplay.pause.bind(swiper),
            onVisibilityChange: function onVisibilityChange() {
              if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
                swiper.autoplay.pause();
              }
              if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
                swiper.autoplay.run();
                swiper.autoplay.paused = false;
              }
            },
            onTransitionEnd: function onTransitionEnd(e) {
              if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
              if (e.target !== this) { return; }
              swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
              swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
              swiper.autoplay.paused = false;
              if (!swiper.autoplay.running) {
                swiper.autoplay.stop();
              } else {
                swiper.autoplay.run();
              }
            },
          },
        });
      },
      on: {
        init: function init() {
          var swiper = this;
          if (swiper.params.autoplay.enabled) {
            swiper.autoplay.start();
            document.addEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
          }
        },
        beforeTransitionStart: function beforeTransitionStart(speed, internal) {
          var swiper = this;
          if (swiper.autoplay.running) {
            if (internal || !swiper.params.autoplay.disableOnInteraction) {
              swiper.autoplay.pause(speed);
            } else {
              swiper.autoplay.stop();
            }
          }
        },
        sliderFirstMove: function sliderFirstMove() {
          var swiper = this;
          if (swiper.autoplay.running) {
            if (swiper.params.autoplay.disableOnInteraction) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.pause();
            }
          }
        },
        touchEnd: function touchEnd() {
          var swiper = this;
          if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.run();
          }
        },
        destroy: function destroy() {
          var swiper = this;
          if (swiper.autoplay.running) {
            swiper.autoplay.stop();
          }
          document.removeEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
        },
      },
    };

    var Fade = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var slides = swiper.slides;
        for (var i = 0; i < slides.length; i += 1) {
          var $slideEl = swiper.slides.eq(i);
          var offset = $slideEl[0].swiperSlideOffset;
          var tx = -offset;
          if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
          var ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          var slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var slides = swiper.slides;
        var $wrapperEl = swiper.$wrapperEl;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          var eventTriggered = false;
          slides.transitionEnd(function () {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            eventTriggered = true;
            swiper.animating = false;
            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (var i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    };

    var EffectFade = {
      name: 'effect-fade',
      params: {
        fadeEffect: {
          crossFade: false,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          fadeEffect: {
            setTranslate: Fade.setTranslate.bind(swiper),
            setTransition: Fade.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'fade') { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
          var overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'fade') { return; }
          swiper.fadeEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'fade') { return; }
          swiper.fadeEffect.setTransition(duration);
        },
      },
    };

    var Cube = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var $el = swiper.$el;
        var $wrapperEl = swiper.$wrapperEl;
        var slides = swiper.slides;
        var swiperWidth = swiper.width;
        var swiperHeight = swiper.height;
        var rtl = swiper.rtlTranslate;
        var swiperSize = swiper.size;
        var params = swiper.params.cubeEffect;
        var isHorizontal = swiper.isHorizontal();
        var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        var wrapperRotate = 0;
        var $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: (swiperWidth + "px") });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }
        for (var i = 0; i < slides.length; i += 1) {
          var $slideEl = slides.eq(i);
          var slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          var slideAngle = slideIndex * 90;
          var round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          var tx = 0;
          var ty = 0;
          var tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
          }
          $slideEl.transform(transform);
          if (params.slideShadows) {
            // Set shadows
            var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
            if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
          '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
          '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
          'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
          } else {
            var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            var multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            var scale1 = params.shadowScale;
            var scale2 = params.shadowScale / multiplier;
            var offset = params.shadowOffset;
            $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
          }
        }
        var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var $el = swiper.$el;
        var slides = swiper.slides;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    };

    var EffectCube = {
      name: 'effect-cube',
      params: {
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          cubeEffect: {
            setTranslate: Cube.setTranslate.bind(swiper),
            setTransition: Cube.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'cube') { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
          swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
          var overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'cube') { return; }
          swiper.cubeEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'cube') { return; }
          swiper.cubeEffect.setTransition(duration);
        },
      },
    };

    var Flip = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var slides = swiper.slides;
        var rtl = swiper.rtlTranslate;
        for (var i = 0; i < slides.length; i += 1) {
          var $slideEl = slides.eq(i);
          var progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          var offset = $slideEl[0].swiperSlideOffset;
          var rotate = -180 * progress;
          var rotateY = rotate;
          var rotateX = 0;
          var tx = -offset;
          var ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
            if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
          }
          $slideEl
            .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var slides = swiper.slides;
        var activeIndex = swiper.activeIndex;
        var $wrapperEl = swiper.$wrapperEl;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          var eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
            eventTriggered = true;
            swiper.animating = false;
            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (var i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    };

    var EffectFlip = {
      name: 'effect-flip',
      params: {
        flipEffect: {
          slideShadows: true,
          limitRotation: true,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          flipEffect: {
            setTranslate: Flip.setTranslate.bind(swiper),
            setTransition: Flip.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'flip') { return; }
          swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
          swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
          var overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          Utils.extend(swiper.params, overwriteParams);
          Utils.extend(swiper.originalParams, overwriteParams);
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'flip') { return; }
          swiper.flipEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'flip') { return; }
          swiper.flipEffect.setTransition(duration);
        },
      },
    };

    var Coverflow = {
      setTranslate: function setTranslate() {
        var swiper = this;
        var swiperWidth = swiper.width;
        var swiperHeight = swiper.height;
        var slides = swiper.slides;
        var $wrapperEl = swiper.$wrapperEl;
        var slidesSizesGrid = swiper.slidesSizesGrid;
        var params = swiper.params.coverflowEffect;
        var isHorizontal = swiper.isHorizontal();
        var transform = swiper.translate;
        var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
        var rotate = isHorizontal ? params.rotate : -params.rotate;
        var translate = params.depth;
        // Each slide offset from center
        for (var i = 0, length = slides.length; i < length; i += 1) {
          var $slideEl = slides.eq(i);
          var slideSize = slidesSizesGrid[i];
          var slideOffset = $slideEl[0].swiperSlideOffset;
          var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          var translateZ = -translate * Math.abs(offsetMultiplier);

          var stretch = params.stretch;
          // Allow percentage to make a relative stretch for responsive sliders
          if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
            stretch = ((parseFloat(params.stretch) / 100) * slideSize);
          }
          var translateY = isHorizontal ? 0 : stretch * (offsetMultiplier);
          var translateX = isHorizontal ? stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) { translateX = 0; }
          if (Math.abs(translateY) < 0.001) { translateY = 0; }
          if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
          if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
          if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

          var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
            if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
          }
        }

        // Set correct perspective for IE10
        if (Support.pointerEvents || Support.prefixedPointerEvents) {
          var ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = center + "px 50%";
        }
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      },
    };

    var EffectCoverflow = {
      name: 'effect-coverflow',
      params: {
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          coverflowEffect: {
            setTranslate: Coverflow.setTranslate.bind(swiper),
            setTransition: Coverflow.setTransition.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          if (swiper.params.effect !== 'coverflow') { return; }

          swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
          swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        },
        setTranslate: function setTranslate() {
          var swiper = this;
          if (swiper.params.effect !== 'coverflow') { return; }
          swiper.coverflowEffect.setTranslate();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          if (swiper.params.effect !== 'coverflow') { return; }
          swiper.coverflowEffect.setTransition(duration);
        },
      },
    };

    var Thumbs = {
      init: function init() {
        var swiper = this;
        var ref = swiper.params;
        var thumbsParams = ref.thumbs;
        var SwiperClass = swiper.constructor;
        if (thumbsParams.swiper instanceof SwiperClass) {
          swiper.thumbs.swiper = thumbsParams.swiper;
          Utils.extend(swiper.thumbs.swiper.originalParams, {
            watchSlidesProgress: true,
            slideToClickedSlide: false,
          });
          Utils.extend(swiper.thumbs.swiper.params, {
            watchSlidesProgress: true,
            slideToClickedSlide: false,
          });
        } else if (Utils.isObject(thumbsParams.swiper)) {
          swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slideToClickedSlide: false,
          }));
          swiper.thumbs.swiperCreated = true;
        }
        swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
        swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
      },
      onThumbClick: function onThumbClick() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        var clickedIndex = thumbsSwiper.clickedIndex;
        var clickedSlide = thumbsSwiper.clickedSlide;
        if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) { return; }
        if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
        var slideToIndex;
        if (thumbsSwiper.params.loop) {
          slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
        } else {
          slideToIndex = clickedIndex;
        }
        if (swiper.params.loop) {
          var currentIndex = swiper.activeIndex;
          if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
            swiper.loopFix();
            // eslint-disable-next-line
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            currentIndex = swiper.activeIndex;
          }
          var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
          var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
          if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
          else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
          else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
          else { slideToIndex = prevIndex; }
        }
        swiper.slideTo(slideToIndex);
      },
      update: function update(initial) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }

        var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
          ? thumbsSwiper.slidesPerViewDynamic()
          : thumbsSwiper.params.slidesPerView;

        var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
        var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
        if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
          var currentThumbsIndex = thumbsSwiper.activeIndex;
          var newThumbsIndex;
          var direction;
          if (thumbsSwiper.params.loop) {
            if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
              thumbsSwiper.loopFix();
              // eslint-disable-next-line
              thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
              currentThumbsIndex = thumbsSwiper.activeIndex;
            }
            // Find actual thumbs index to slide to
            var prevThumbsIndex = thumbsSwiper.slides
              .eq(currentThumbsIndex)
              .prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0)
              .index();
            var nextThumbsIndex = thumbsSwiper.slides
              .eq(currentThumbsIndex)
              .nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0)
              .index();
            if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
            else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
            else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = currentThumbsIndex; }
            else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
            else { newThumbsIndex = prevThumbsIndex; }
            direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
          } else {
            newThumbsIndex = swiper.realIndex;
            direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
          }
          if (useOffset) {
            newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
          }

          if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
            if (thumbsSwiper.params.centeredSlides) {
              if (newThumbsIndex > currentThumbsIndex) {
                newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
              } else {
                newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
              }
            } else if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - slidesPerView + 1;
            }
            thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
          }
        }

        // Activate thumbs
        var thumbsToActivate = 1;
        var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

        if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
          thumbsToActivate = swiper.params.slidesPerView;
        }

        if (!swiper.params.thumbs.multipleActiveThumbs) {
          thumbsToActivate = 1;
        }

        thumbsToActivate = Math.floor(thumbsToActivate);

        thumbsSwiper.slides.removeClass(thumbActiveClass);
        if (thumbsSwiper.params.loop || (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)) {
          for (var i = 0; i < thumbsToActivate; i += 1) {
            thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
          }
        } else {
          for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
            thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
          }
        }
      },
    };
    var Thumbs$1 = {
      name: 'thumbs',
      params: {
        thumbs: {
          swiper: null,
          multipleActiveThumbs: true,
          autoScrollOffset: 0,
          slideThumbActiveClass: 'swiper-slide-thumb-active',
          thumbsContainerClass: 'swiper-container-thumbs',
        },
      },
      create: function create() {
        var swiper = this;
        Utils.extend(swiper, {
          thumbs: {
            swiper: null,
            init: Thumbs.init.bind(swiper),
            update: Thumbs.update.bind(swiper),
            onThumbClick: Thumbs.onThumbClick.bind(swiper),
          },
        });
      },
      on: {
        beforeInit: function beforeInit() {
          var swiper = this;
          var ref = swiper.params;
          var thumbs = ref.thumbs;
          if (!thumbs || !thumbs.swiper) { return; }
          swiper.thumbs.init();
          swiper.thumbs.update(true);
        },
        slideChange: function slideChange() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        update: function update() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        resize: function resize() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        observerUpdate: function observerUpdate() {
          var swiper = this;
          if (!swiper.thumbs.swiper) { return; }
          swiper.thumbs.update();
        },
        setTransition: function setTransition(duration) {
          var swiper = this;
          var thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper) { return; }
          thumbsSwiper.setTransition(duration);
        },
        beforeDestroy: function beforeDestroy() {
          var swiper = this;
          var thumbsSwiper = swiper.thumbs.swiper;
          if (!thumbsSwiper) { return; }
          if (swiper.thumbs.swiperCreated && thumbsSwiper) {
            thumbsSwiper.destroy();
          }
        },
      },
    };

    // Swiper Class

    var components = [
      Device$1,
      Support$1,
      Browser$1,
      Resize,
      Observer$1,
      Virtual$1,
      Keyboard$1,
      Mousewheel$1,
      Navigation$1,
      Pagination$1,
      Scrollbar$1,
      Parallax$1,
      Zoom$1,
      Lazy$1,
      Controller$1,
      A11y,
      History$1,
      HashNavigation$1,
      Autoplay$1,
      EffectFade,
      EffectCube,
      EffectFlip,
      EffectCoverflow,
      Thumbs$1
    ];

    if (typeof Swiper.use === 'undefined') {
      Swiper.use = Swiper.Class.use;
      Swiper.installModule = Swiper.Class.installModule;
    }

    Swiper.use(components);

    return Swiper;

})));
//# sourceMappingURL=swiper.js.map;
var swiper = new Swiper(".swiper-container", {
  effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  coverflowEffect: {
    rotate: 60,
    stretch: 10,
    depth: 200,
    modifier: 2,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



var swiper = new Swiper('#swiper-container2', {
  slidesPerView: 3,
  direction: getDirection(),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    }
  }
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
};
// Look for .hamburger
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu__list");

// On click
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  menu.classList.toggle("menu__list_active");


});
;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

(function () {
  let originalPositions = [];
  let daElements = document.querySelectorAll("[data-da]");
  let daElementsArray = [];
  let daMatchMedia = [];
  //Заполняем массивы
  if (daElements.length > 0) {
    let number = 0;
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index];
      const daMove = daElement.getAttribute("data-da");
      if (daMove != "") {
        const daArray = daMove.split(",");
        const daPlace = daArray[1] ? daArray[1].trim() : "last";
        const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
        const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
        const daDestination = document.querySelector("." + daArray[0].trim());
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute("data-da-index", number);
          //Заполняем массив первоначальных позиций
          originalPositions[number] = {
            parent: daElement.parentNode,
            index: indexInParent(daElement),
          };
          //Заполняем массив элементов
          daElementsArray[number] = {
            element: daElement,
            destination: document.querySelector("." + daArray[0].trim()),
            place: daPlace,
            breakpoint: daBreakpoint,
            type: daType,
          };
          number++;
        }
      }
    }
    dynamicAdaptSort(daElementsArray);

    //Создаем события в точке брейкпоинта
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daBreakpoint = el.breakpoint;
      const daType = el.type;

      daMatchMedia.push(
        window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)")
      );
      daMatchMedia[index].addListener(dynamicAdapt);
    }
  }
  //Основная функция
  function dynamicAdapt(e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daElement = el.element;
      const daDestination = el.destination;
      const daPlace = el.place;
      const daBreakpoint = el.breakpoint;
      const daClassname = "_dynamic_adapt_" + daBreakpoint;

      if (daMatchMedia[index].matches) {
        //Перебрасываем элементы
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace];
          if (daPlace === "first") {
            actualIndex = indexOfElements(daDestination)[0];
          } else if (daPlace === "last") {
            actualIndex = indexOfElements(daDestination)[
              indexOfElements(daDestination).length
            ];
          }
          daDestination.insertBefore(
            daElement,
            daDestination.children[actualIndex]
          );
          daElement.classList.add(daClassname);
        }
      } else {
        //Возвращаем на место
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement);
          daElement.classList.remove(daClassname);
        }
      }
    }
    customAdapt();
  }

  //Вызов основной функции
  dynamicAdapt();

  //Функция возврата на место
  function dynamicAdaptBack(el) {
    const daIndex = el.getAttribute("data-da-index");
    const originalPlace = originalPositions[daIndex];
    const parentPlace = originalPlace["parent"];
    const indexPlace = originalPlace["index"];
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  }
  //Функция получения индекса внутри родителя
  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  }
  //Функция получения массива индексов элементов внутри родителя
  function indexOfElements(parent, back) {
    const children = parent.children;
    const childrenArray = [];
    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i];
      if (back) {
        childrenArray.push(i);
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute("data-da") == null) {
          childrenArray.push(i);
        }
      }
    }
    return childrenArray;
  }
  //Сортировка объекта
  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) {
        return -1;
      } else {
        return 1;
      }
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  //Дополнительные сценарии адаптации
  function customAdapt() {
    //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
})();

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/
;
/*!
 * Flickity PACKAGED v1.0.0
 * Touch, responsive, flickable galleries
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2015 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v1.1.0
 * MIT license
 */

( function( window ) {



    // -------------------------- utils -------------------------- //
    
    var slice = Array.prototype.slice;
    
    function noop() {}
    
    // -------------------------- definition -------------------------- //
    
    function defineBridget( $ ) {
    
    // bail if no jQuery
    if ( !$ ) {
      return;
    }
    
    // -------------------------- addOptionMethod -------------------------- //
    
    /**
     * adds option method -> $().plugin('option', {...})
     * @param {Function} PluginClass - constructor class
     */
    function addOptionMethod( PluginClass ) {
      // don't overwrite original option method
      if ( PluginClass.prototype.option ) {
        return;
      }
    
      // option setter
      PluginClass.prototype.option = function( opts ) {
        // bail out if not an object
        if ( !$.isPlainObject( opts ) ){
          return;
        }
        this.options = $.extend( true, this.options, opts );
      };
    }
    
    // -------------------------- plugin bridge -------------------------- //
    
    // helper function for logging errors
    // $.error breaks jQuery chaining
    var logError = typeof console === 'undefined' ? noop :
      function( message ) {
        console.error( message );
      };
    
    /**
     * jQuery plugin bridge, access methods like $elem.plugin('method')
     * @param {String} namespace - plugin name
     * @param {Function} PluginClass - constructor class
     */
    function bridge( namespace, PluginClass ) {
      // add to jQuery fn namespace
      $.fn[ namespace ] = function( options ) {
        if ( typeof options === 'string' ) {
          // call plugin method when first argument is a string
          // get arguments for method
          var args = slice.call( arguments, 1 );
    
          for ( var i=0, len = this.length; i < len; i++ ) {
            var elem = this[i];
            var instance = $.data( elem, namespace );
            if ( !instance ) {
              logError( "cannot call methods on " + namespace + " prior to initialization; " +
                "attempted to call '" + options + "'" );
              continue;
            }
            if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) {
              logError( "no such method '" + options + "' for " + namespace + " instance" );
              continue;
            }
    
            // trigger method with arguments
            var returnValue = instance[ options ].apply( instance, args );
    
            // break look and return first value if provided
            if ( returnValue !== undefined ) {
              return returnValue;
            }
          }
          // return this if no return value
          return this;
        } else {
          return this.each( function() {
            var instance = $.data( this, namespace );
            if ( instance ) {
              // apply options & init
              instance.option( options );
              instance._init();
            } else {
              // initialize new instance
              instance = new PluginClass( this, options );
              $.data( this, namespace, instance );
            }
          });
        }
      };
    
    }
    
    // -------------------------- bridget -------------------------- //
    
    /**
     * converts a Prototypical class into a proper jQuery plugin
     *   the class must have a ._init method
     * @param {String} namespace - plugin name, used in $().pluginName
     * @param {Function} PluginClass - constructor class
     */
    $.bridget = function( namespace, PluginClass ) {
      addOptionMethod( PluginClass );
      bridge( namespace, PluginClass );
    };
    
    return $.bridget;
    
    }
    
    // transport
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( 'jquery-bridget/jquery.bridget',[ 'jquery' ], defineBridget );
    } else if ( typeof exports === 'object' ) {
      defineBridget( require('jquery') );
    } else {
      // get jquery from browser global
      defineBridget( window.jQuery );
    }
    
    })( window );
    
    /*!
     * classie v1.0.1
     * class helper functions
     * from bonzo https://github.com/ded/bonzo
     * MIT license
     * 
     * classie.has( elem, 'my-class' ) -> true/false
     * classie.add( elem, 'my-new-class' )
     * classie.remove( elem, 'my-unwanted-class' )
     * classie.toggle( elem, 'my-class' )
     */
    
    /*jshint browser: true, strict: true, undef: true, unused: true */
    /*global define: false, module: false */
    
    ( function( window ) {
    
    
    
    // class helper functions from bonzo https://github.com/ded/bonzo
    
    function classReg( className ) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    
    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;
    
    if ( 'classList' in document.documentElement ) {
      hasClass = function( elem, c ) {
        return elem.classList.contains( c );
      };
      addClass = function( elem, c ) {
        elem.classList.add( c );
      };
      removeClass = function( elem, c ) {
        elem.classList.remove( c );
      };
    }
    else {
      hasClass = function( elem, c ) {
        return classReg( c ).test( elem.className );
      };
      addClass = function( elem, c ) {
        if ( !hasClass( elem, c ) ) {
          elem.className = elem.className + ' ' + c;
        }
      };
      removeClass = function( elem, c ) {
        elem.className = elem.className.replace( classReg( c ), ' ' );
      };
    }
    
    function toggleClass( elem, c ) {
      var fn = hasClass( elem, c ) ? removeClass : addClass;
      fn( elem, c );
    }
    
    var classie = {
      // full names
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      // short names
      has: hasClass,
      add: addClass,
      remove: removeClass,
      toggle: toggleClass
    };
    
    // transport
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( 'classie/classie',classie );
    } else if ( typeof exports === 'object' ) {
      // CommonJS
      module.exports = classie;
    } else {
      // browser global
      window.classie = classie;
    }
    
    })( window );
    
    /*!
     * EventEmitter v4.2.11 - git.io/ee
     * Unlicense - http://unlicense.org/
     * Oliver Caldwell - http://oli.me.uk/
     * @preserve
     */
    
    ;(function () {
        
    
        /**
         * Class for managing events.
         * Can be extended to provide event functionality in other classes.
         *
         * @class EventEmitter Manages event registering and emitting.
         */
        function EventEmitter() {}
    
        // Shortcuts to improve speed and size
        var proto = EventEmitter.prototype;
        var exports = this;
        var originalGlobalValue = exports.EventEmitter;
    
        /**
         * Finds the index of the listener for the event in its storage array.
         *
         * @param {Function[]} listeners Array of listeners to search through.
         * @param {Function} listener Method to look for.
         * @return {Number} Index of the specified listener, -1 if not found
         * @api private
         */
        function indexOfListener(listeners, listener) {
            var i = listeners.length;
            while (i--) {
                if (listeners[i].listener === listener) {
                    return i;
                }
            }
    
            return -1;
        }
    
        /**
         * Alias a method while keeping the context correct, to allow for overwriting of target method.
         *
         * @param {String} name The name of the target method.
         * @return {Function} The aliased method
         * @api private
         */
        function alias(name) {
            return function aliasClosure() {
                return this[name].apply(this, arguments);
            };
        }
    
        /**
         * Returns the listener array for the specified event.
         * Will initialise the event object and listener arrays if required.
         * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
         * Each property in the object response is an array of listener functions.
         *
         * @param {String|RegExp} evt Name of the event to return the listeners from.
         * @return {Function[]|Object} All listener functions for the event.
         */
        proto.getListeners = function getListeners(evt) {
            var events = this._getEvents();
            var response;
            var key;
    
            // Return a concatenated array of all matching events if
            // the selector is a regular expression.
            if (evt instanceof RegExp) {
                response = {};
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        response[key] = events[key];
                    }
                }
            }
            else {
                response = events[evt] || (events[evt] = []);
            }
    
            return response;
        };
    
        /**
         * Takes a list of listener objects and flattens it into a list of listener functions.
         *
         * @param {Object[]} listeners Raw listener objects.
         * @return {Function[]} Just the listener functions.
         */
        proto.flattenListeners = function flattenListeners(listeners) {
            var flatListeners = [];
            var i;
    
            for (i = 0; i < listeners.length; i += 1) {
                flatListeners.push(listeners[i].listener);
            }
    
            return flatListeners;
        };
    
        /**
         * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
         *
         * @param {String|RegExp} evt Name of the event to return the listeners from.
         * @return {Object} All listener functions for an event in an object.
         */
        proto.getListenersAsObject = function getListenersAsObject(evt) {
            var listeners = this.getListeners(evt);
            var response;
    
            if (listeners instanceof Array) {
                response = {};
                response[evt] = listeners;
            }
    
            return response || listeners;
        };
    
        /**
         * Adds a listener function to the specified event.
         * The listener will not be added if it is a duplicate.
         * If the listener returns true then it will be removed after it is called.
         * If you pass a regular expression as the event name then the listener will be added to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to attach the listener to.
         * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.addListener = function addListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var listenerIsWrapped = typeof listener === 'object';
            var key;
    
            for (key in listeners) {
                if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                    listeners[key].push(listenerIsWrapped ? listener : {
                        listener: listener,
                        once: false
                    });
                }
            }
    
            return this;
        };
    
        /**
         * Alias of addListener
         */
        proto.on = alias('addListener');
    
        /**
         * Semi-alias of addListener. It will add a listener that will be
         * automatically removed after its first execution.
         *
         * @param {String|RegExp} evt Name of the event to attach the listener to.
         * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.addOnceListener = function addOnceListener(evt, listener) {
            return this.addListener(evt, {
                listener: listener,
                once: true
            });
        };
    
        /**
         * Alias of addOnceListener.
         */
        proto.once = alias('addOnceListener');
    
        /**
         * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
         * You need to tell it what event names should be matched by a regex.
         *
         * @param {String} evt Name of the event to create.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.defineEvent = function defineEvent(evt) {
            this.getListeners(evt);
            return this;
        };
    
        /**
         * Uses defineEvent to define multiple events.
         *
         * @param {String[]} evts An array of event names to define.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.defineEvents = function defineEvents(evts) {
            for (var i = 0; i < evts.length; i += 1) {
                this.defineEvent(evts[i]);
            }
            return this;
        };
    
        /**
         * Removes a listener function from the specified event.
         * When passed a regular expression as the event name, it will remove the listener from all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to remove the listener from.
         * @param {Function} listener Method to remove from the event.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.removeListener = function removeListener(evt, listener) {
            var listeners = this.getListenersAsObject(evt);
            var index;
            var key;
    
            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    index = indexOfListener(listeners[key], listener);
    
                    if (index !== -1) {
                        listeners[key].splice(index, 1);
                    }
                }
            }
    
            return this;
        };
    
        /**
         * Alias of removeListener
         */
        proto.off = alias('removeListener');
    
        /**
         * Adds listeners in bulk using the manipulateListeners method.
         * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
         * You can also pass it a regular expression to add the array of listeners to all events that match it.
         * Yeah, this function does quite a bit. That's probably a bad thing.
         *
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to add.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.addListeners = function addListeners(evt, listeners) {
            // Pass through to manipulateListeners
            return this.manipulateListeners(false, evt, listeners);
        };
    
        /**
         * Removes listeners in bulk using the manipulateListeners method.
         * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
         * You can also pass it an event name and an array of listeners to be removed.
         * You can also pass it a regular expression to remove the listeners from all events that match it.
         *
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to remove.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.removeListeners = function removeListeners(evt, listeners) {
            // Pass through to manipulateListeners
            return this.manipulateListeners(true, evt, listeners);
        };
    
        /**
         * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
         * The first argument will determine if the listeners are removed (true) or added (false).
         * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
         * You can also pass it an event name and an array of listeners to be added/removed.
         * You can also pass it a regular expression to manipulate the listeners of all events that match it.
         *
         * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
         * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
         * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
            var i;
            var value;
            var single = remove ? this.removeListener : this.addListener;
            var multiple = remove ? this.removeListeners : this.addListeners;
    
            // If evt is an object then pass each of its properties to this method
            if (typeof evt === 'object' && !(evt instanceof RegExp)) {
                for (i in evt) {
                    if (evt.hasOwnProperty(i) && (value = evt[i])) {
                        // Pass the single listener straight through to the singular method
                        if (typeof value === 'function') {
                            single.call(this, i, value);
                        }
                        else {
                            // Otherwise pass back to the multiple function
                            multiple.call(this, i, value);
                        }
                    }
                }
            }
            else {
                // So evt must be a string
                // And listeners must be an array of listeners
                // Loop over it and pass each one to the multiple method
                i = listeners.length;
                while (i--) {
                    single.call(this, evt, listeners[i]);
                }
            }
    
            return this;
        };
    
        /**
         * Removes all listeners from a specified event.
         * If you do not specify an event then all listeners will be removed.
         * That means every event will be emptied.
         * You can also pass a regex to remove all events that match it.
         *
         * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.removeEvent = function removeEvent(evt) {
            var type = typeof evt;
            var events = this._getEvents();
            var key;
    
            // Remove different things depending on the state of evt
            if (type === 'string') {
                // Remove all listeners for the specified event
                delete events[evt];
            }
            else if (evt instanceof RegExp) {
                // Remove all events matching the regex.
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        delete events[key];
                    }
                }
            }
            else {
                // Remove all listeners in all events
                delete this._events;
            }
    
            return this;
        };
    
        /**
         * Alias of removeEvent.
         *
         * Added to mirror the node API.
         */
        proto.removeAllListeners = alias('removeEvent');
    
        /**
         * Emits an event of your choice.
         * When emitted, every listener attached to that event will be executed.
         * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
         * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
         * So they will not arrive within the array on the other side, they will be separate.
         * You can also pass a regular expression to emit to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
         * @param {Array} [args] Optional array of arguments to be passed to each listener.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.emitEvent = function emitEvent(evt, args) {
            var listeners = this.getListenersAsObject(evt);
            var listener;
            var i;
            var key;
            var response;
    
            for (key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    i = listeners[key].length;
    
                    while (i--) {
                        // If the listener returns true then it shall be removed from the event
                        // The function is executed either with a basic call or an apply if there is an args array
                        listener = listeners[key][i];
    
                        if (listener.once === true) {
                            this.removeListener(evt, listener.listener);
                        }
    
                        response = listener.listener.apply(this, args || []);
    
                        if (response === this._getOnceReturnValue()) {
                            this.removeListener(evt, listener.listener);
                        }
                    }
                }
            }
    
            return this;
        };
    
        /**
         * Alias of emitEvent
         */
        proto.trigger = alias('emitEvent');
    
        /**
         * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
         * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
         *
         * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
         * @param {...*} Optional additional arguments to be passed to each listener.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.emit = function emit(evt) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(evt, args);
        };
    
        /**
         * Sets the current value to check against when executing listeners. If a
         * listeners return value matches the one set here then it will be removed
         * after execution. This value defaults to true.
         *
         * @param {*} value The new value to check for when executing listeners.
         * @return {Object} Current instance of EventEmitter for chaining.
         */
        proto.setOnceReturnValue = function setOnceReturnValue(value) {
            this._onceReturnValue = value;
            return this;
        };
    
        /**
         * Fetches the current value to check against when executing listeners. If
         * the listeners return value matches this one then it should be removed
         * automatically. It will return true by default.
         *
         * @return {*|Boolean} The current value to check for or the default, true.
         * @api private
         */
        proto._getOnceReturnValue = function _getOnceReturnValue() {
            if (this.hasOwnProperty('_onceReturnValue')) {
                return this._onceReturnValue;
            }
            else {
                return true;
            }
        };
    
        /**
         * Fetches the events object and creates one if required.
         *
         * @return {Object} The events storage object.
         * @api private
         */
        proto._getEvents = function _getEvents() {
            return this._events || (this._events = {});
        };
    
        /**
         * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
         *
         * @return {Function} Non conflicting EventEmitter class.
         */
        EventEmitter.noConflict = function noConflict() {
            exports.EventEmitter = originalGlobalValue;
            return EventEmitter;
        };
    
        // Expose the class either via AMD, CommonJS or the global object
        if (typeof define === 'function' && define.amd) {
            define('eventEmitter/EventEmitter',[],function () {
                return EventEmitter;
            });
        }
        else if (typeof module === 'object' && module.exports){
            module.exports = EventEmitter;
        }
        else {
            exports.EventEmitter = EventEmitter;
        }
    }.call(this));
    
    /*!
     * eventie v1.0.6
     * event binding helper
     *   eventie.bind( elem, 'click', myFn )
     *   eventie.unbind( elem, 'click', myFn )
     * MIT license
     */
    
    /*jshint browser: true, undef: true, unused: true */
    /*global define: false, module: false */
    
    ( function( window ) {
    
    
    
    var docElem = document.documentElement;
    
    var bind = function() {};
    
    function getIEEvent( obj ) {
      var event = window.event;
      // add event.target
      event.target = event.target || event.srcElement || obj;
      return event;
    }
    
    if ( docElem.addEventListener ) {
      bind = function( obj, type, fn ) {
        obj.addEventListener( type, fn, false );
      };
    } else if ( docElem.attachEvent ) {
      bind = function( obj, type, fn ) {
        obj[ type + fn ] = fn.handleEvent ?
          function() {
            var event = getIEEvent( obj );
            fn.handleEvent.call( fn, event );
          } :
          function() {
            var event = getIEEvent( obj );
            fn.call( obj, event );
          };
        obj.attachEvent( "on" + type, obj[ type + fn ] );
      };
    }
    
    var unbind = function() {};
    
    if ( docElem.removeEventListener ) {
      unbind = function( obj, type, fn ) {
        obj.removeEventListener( type, fn, false );
      };
    } else if ( docElem.detachEvent ) {
      unbind = function( obj, type, fn ) {
        obj.detachEvent( "on" + type, obj[ type + fn ] );
        try {
          delete obj[ type + fn ];
        } catch ( err ) {
          // can't delete window object properties
          obj[ type + fn ] = undefined;
        }
      };
    }
    
    var eventie = {
      bind: bind,
      unbind: unbind
    };
    
    // ----- module definition ----- //
    
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( 'eventie/eventie',eventie );
    } else if ( typeof exports === 'object' ) {
      // CommonJS
      module.exports = eventie;
    } else {
      // browser global
      window.eventie = eventie;
    }
    
    })( window );
    
    /*!
     * getStyleProperty v1.0.4
     * original by kangax
     * http://perfectionkills.com/feature-testing-css-properties/
     * MIT license
     */
    
    /*jshint browser: true, strict: true, undef: true */
    /*global define: false, exports: false, module: false */
    
    ( function( window ) {
    
    
    
    var prefixes = 'Webkit Moz ms Ms O'.split(' ');
    var docElemStyle = document.documentElement.style;
    
    function getStyleProperty( propName ) {
      if ( !propName ) {
        return;
      }
    
      // test standard property first
      if ( typeof docElemStyle[ propName ] === 'string' ) {
        return propName;
      }
    
      // capitalize
      propName = propName.charAt(0).toUpperCase() + propName.slice(1);
    
      // test vendor specific properties
      var prefixed;
      for ( var i=0, len = prefixes.length; i < len; i++ ) {
        prefixed = prefixes[i] + propName;
        if ( typeof docElemStyle[ prefixed ] === 'string' ) {
          return prefixed;
        }
      }
    }
    
    // transport
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( 'get-style-property/get-style-property',[],function() {
        return getStyleProperty;
      });
    } else if ( typeof exports === 'object' ) {
      // CommonJS for Component
      module.exports = getStyleProperty;
    } else {
      // browser global
      window.getStyleProperty = getStyleProperty;
    }
    
    })( window );
    
    /*!
     * getSize v1.2.2
     * measure size of elements
     * MIT license
     */
    
    /*jshint browser: true, strict: true, undef: true, unused: true */
    /*global define: false, exports: false, require: false, module: false, console: false */
    
    ( function( window, undefined ) {
    
    
    
    // -------------------------- helpers -------------------------- //
    
    // get a number from a string, not a percentage
    function getStyleSize( value ) {
      var num = parseFloat( value );
      // not a percent like '100%', and a number
      var isValid = value.indexOf('%') === -1 && !isNaN( num );
      return isValid && num;
    }
    
    function noop() {}
    
    var logError = typeof console === 'undefined' ? noop :
      function( message ) {
        console.error( message );
      };
    
    // -------------------------- measurements -------------------------- //
    
    var measurements = [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth'
    ];
    
    function getZeroSize() {
      var size = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      };
      for ( var i=0, len = measurements.length; i < len; i++ ) {
        var measurement = measurements[i];
        size[ measurement ] = 0;
      }
      return size;
    }
    
    
    
    function defineGetSize( getStyleProperty ) {
    
    // -------------------------- setup -------------------------- //
    
    var isSetup = false;
    
    var getStyle, boxSizingProp, isBoxSizeOuter;
    
    /**
     * setup vars and functions
     * do it on initial getSize(), rather than on script load
     * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
     */
    function setup() {
      // setup once
      if ( isSetup ) {
        return;
      }
      isSetup = true;
    
      var getComputedStyle = window.getComputedStyle;
      getStyle = ( function() {
        var getStyleFn = getComputedStyle ?
          function( elem ) {
            return getComputedStyle( elem, null );
          } :
          function( elem ) {
            return elem.currentStyle;
          };
    
          return function getStyle( elem ) {
            var style = getStyleFn( elem );
            if ( !style ) {
              logError( 'Style returned ' + style +
                '. Are you running this code in a hidden iframe on Firefox? ' +
                'See http://bit.ly/getsizebug1' );
            }
            return style;
          };
      })();
    
      // -------------------------- box sizing -------------------------- //
    
      boxSizingProp = getStyleProperty('boxSizing');
    
      /**
       * WebKit measures the outer-width on style.width on border-box elems
       * IE & Firefox measures the inner-width
       */
      if ( boxSizingProp ) {
        var div = document.createElement('div');
        div.style.width = '200px';
        div.style.padding = '1px 2px 3px 4px';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px 2px 3px 4px';
        div.style[ boxSizingProp ] = 'border-box';
    
        var body = document.body || document.documentElement;
        body.appendChild( div );
        var style = getStyle( div );
    
        isBoxSizeOuter = getStyleSize( style.width ) === 200;
        body.removeChild( div );
      }
    
    }
    
    // -------------------------- getSize -------------------------- //
    
    function getSize( elem ) {
      setup();
    
      // use querySeletor if elem is string
      if ( typeof elem === 'string' ) {
        elem = document.querySelector( elem );
      }
    
      // do not proceed on non-objects
      if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
        return;
      }
    
      var style = getStyle( elem );
    
      // if hidden, everything is 0
      if ( style.display === 'none' ) {
        return getZeroSize();
      }
    
      var size = {};
      size.width = elem.offsetWidth;
      size.height = elem.offsetHeight;
    
      var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
        style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );
    
      // get all measurements
      for ( var i=0, len = measurements.length; i < len; i++ ) {
        var measurement = measurements[i];
        var value = style[ measurement ];
        value = mungeNonPixel( elem, value );
        var num = parseFloat( value );
        // any 'auto', 'medium' value will be 0
        size[ measurement ] = !isNaN( num ) ? num : 0;
      }
    
      var paddingWidth = size.paddingLeft + size.paddingRight;
      var paddingHeight = size.paddingTop + size.paddingBottom;
      var marginWidth = size.marginLeft + size.marginRight;
      var marginHeight = size.marginTop + size.marginBottom;
      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
      var borderHeight = size.borderTopWidth + size.borderBottomWidth;
    
      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
    
      // overwrite width and height if we can get it from style
      var styleWidth = getStyleSize( style.width );
      if ( styleWidth !== false ) {
        size.width = styleWidth +
          // add padding and border unless it's already including it
          ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
      }
    
      var styleHeight = getStyleSize( style.height );
      if ( styleHeight !== false ) {
        size.height = styleHeight +
          // add padding and border unless it's already including it
          ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
      }
    
      size.innerWidth = size.width - ( paddingWidth + borderWidth );
      size.innerHeight = size.height - ( paddingHeight + borderHeight );
    
      size.outerWidth = size.width + marginWidth;
      size.outerHeight = size.height + marginHeight;
    
      return size;
    }
    
    // IE8 returns percent values, not pixels
    // taken from jQuery's curCSS
    function mungeNonPixel( elem, value ) {
      // IE8 and has percent value
      if ( window.getComputedStyle || value.indexOf('%') === -1 ) {
        return value;
      }
      var style = elem.style;
      // Remember the original values
      var left = style.left;
      var rs = elem.runtimeStyle;
      var rsLeft = rs && rs.left;
    
      // Put in the new values to get a computed value out
      if ( rsLeft ) {
        rs.left = elem.currentStyle.left;
      }
      style.left = value;
      value = style.pixelLeft;
    
      // Revert the changed values
      style.left = left;
      if ( rsLeft ) {
        rs.left = rsLeft;
      }
    
      return value;
    }
    
    return getSize;
    
    }
    
    // transport
    if ( typeof define === 'function' && define.amd ) {
      // AMD for RequireJS
      define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );
    } else if ( typeof exports === 'object' ) {
      // CommonJS for Component
      module.exports = defineGetSize( require('desandro-get-style-property') );
    } else {
      // browser global
      window.getSize = defineGetSize( window.getStyleProperty );
    }
    
    })( window );
    
    /*!
     * docReady v1.0.4
     * Cross browser DOMContentLoaded event emitter
     * MIT license
     */
    
    /*jshint browser: true, strict: true, undef: true, unused: true*/
    /*global define: false, require: false, module: false */
    
    ( function( window ) {
    
    
    
    var document = window.document;
    // collection of functions to be triggered on ready
    var queue = [];
    
    function docReady( fn ) {
      // throw out non-functions
      if ( typeof fn !== 'function' ) {
        return;
      }
    
      if ( docReady.isReady ) {
        // ready now, hit it
        fn();
      } else {
        // queue function when ready
        queue.push( fn );
      }
    }
    
    docReady.isReady = false;
    
    // triggered on various doc ready events
    function onReady( event ) {
      // bail if already triggered or IE8 document is not ready just yet
      var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
      if ( docReady.isReady || isIE8NotReady ) {
        return;
      }
    
      trigger();
    }
    
    function trigger() {
      docReady.isReady = true;
      // process queue
      for ( var i=0, len = queue.length; i < len; i++ ) {
        var fn = queue[i];
        fn();
      }
    }
    
    function defineDocReady( eventie ) {
      // trigger ready if page is ready
      if ( document.readyState === 'complete' ) {
        trigger();
      } else {
        // listen for events
        eventie.bind( document, 'DOMContentLoaded', onReady );
        eventie.bind( document, 'readystatechange', onReady );
        eventie.bind( window, 'load', onReady );
      }
    
      return docReady;
    }
    
    // transport
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( 'doc-ready/doc-ready',[ 'eventie/eventie' ], defineDocReady );
    } else if ( typeof exports === 'object' ) {
      module.exports = defineDocReady( require('eventie') );
    } else {
      // browser global
      window.docReady = defineDocReady( window.eventie );
    }
    
    })( window );
    
    /**
     * matchesSelector v1.0.2
     * matchesSelector( element, '.selector' )
     * MIT license
     */
    
    /*jshint browser: true, strict: true, undef: true, unused: true */
    /*global define: false, module: false */
    
    ( function( ElemProto ) {
    
      
    
      var matchesMethod = ( function() {
        // check un-prefixed
        if ( ElemProto.matchesSelector ) {
          return 'matchesSelector';
        }
        // check vendor prefixes
        var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];
    
        for ( var i=0, len = prefixes.length; i < len; i++ ) {
          var prefix = prefixes[i];
          var method = prefix + 'MatchesSelector';
          if ( ElemProto[ method ] ) {
            return method;
          }
        }
      })();
    
      // ----- match ----- //
    
      function match( elem, selector ) {
        return elem[ matchesMethod ]( selector );
      }
    
      // ----- appendToFragment ----- //
    
      function checkParent( elem ) {
        // not needed if already has parent
        if ( elem.parentNode ) {
          return;
        }
        var fragment = document.createDocumentFragment();
        fragment.appendChild( elem );
      }
    
      // ----- query ----- //
    
      // fall back to using QSA
      // thx @jonathantneal https://gist.github.com/3062955
      function query( elem, selector ) {
        // append to fragment if no parent
        checkParent( elem );
    
        // match elem with all selected elems of parent
        var elems = elem.parentNode.querySelectorAll( selector );
        for ( var i=0, len = elems.length; i < len; i++ ) {
          // return true if match
          if ( elems[i] === elem ) {
            return true;
          }
        }
        // otherwise return false
        return false;
      }
    
      // ----- matchChild ----- //
    
      function matchChild( elem, selector ) {
        checkParent( elem );
        return match( elem, selector );
      }
    
      // ----- matchesSelector ----- //
    
      var matchesSelector;
    
      if ( matchesMethod ) {
        // IE9 supports matchesSelector, but doesn't work on orphaned elems
        // check for that
        var div = document.createElement('div');
        var supportsOrphans = match( div, 'div' );
        matchesSelector = supportsOrphans ? match : matchChild;
      } else {
        matchesSelector = query;
      }
    
      // transport
      if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( 'matches-selector/matches-selector',[],function() {
          return matchesSelector;
        });
      } else if ( typeof exports === 'object' ) {
        module.exports = matchesSelector;
      }
      else {
        // browser global
        window.matchesSelector = matchesSelector;
      }
    
    })( Element.prototype );
    
    /**
     * Fizzy UI utils v1.0.0
     * MIT license
     */
    
    /*jshint browser: true, undef: true, unused: true, strict: true */
    
    ( function( window, factory ) {
      /*global define: false, module: false, require: false */
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'fizzy-ui-utils/utils',[
          'doc-ready/doc-ready',
          'matches-selector/matches-selector'
        ], function( docReady, matchesSelector ) {
          return factory( window, docReady, matchesSelector );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('doc-ready'),
          require('desandro-matches-selector')
        );
      } else {
        // browser global
        window.fizzyUIUtils = factory(
          window,
          window.docReady,
          window.matchesSelector
        );
      }
    
    }( window, function factory( window, docReady, matchesSelector ) {
    
    
    
    var utils = {};
    
    // ----- extend ----- //
    
    // extends objects
    utils.extend = function( a, b ) {
      for ( var prop in b ) {
        a[ prop ] = b[ prop ];
      }
      return a;
    };
    
    // ----- modulo ----- //
    
    utils.modulo = function( num, div ) {
      return ( ( num % div ) + div ) % div;
    };
    
    // ----- isArray ----- //
      
    var objToString = Object.prototype.toString;
    utils.isArray = function( obj ) {
      return objToString.call( obj ) == '[object Array]';
    };
    
    // ----- makeArray ----- //
    
    // turn element or nodeList into an array
    utils.makeArray = function( obj ) {
      var ary = [];
      if ( utils.isArray( obj ) ) {
        // use object if already an array
        ary = obj;
      } else if ( obj && typeof obj.length == 'number' ) {
        // convert nodeList to array
        for ( var i=0, len = obj.length; i < len; i++ ) {
          ary.push( obj[i] );
        }
      } else {
        // array of single index
        ary.push( obj );
      }
      return ary;
    };
    
    // ----- indexOf ----- //
    
    // index of helper cause IE8
    utils.indexOf = Array.prototype.indexOf ? function( ary, obj ) {
        return ary.indexOf( obj );
      } : function( ary, obj ) {
        for ( var i=0, len = ary.length; i < len; i++ ) {
          if ( ary[i] === obj ) {
            return i;
          }
        }
        return -1;
      };
    
    // ----- removeFrom ----- //
    
    utils.removeFrom = function( ary, obj ) {
      var index = utils.indexOf( ary, obj );
      if ( index != -1 ) {
        ary.splice( index, 1 );
      }
    };
    
    // ----- isElement ----- //
    
    // http://stackoverflow.com/a/384380/182183
    utils.isElement = ( typeof HTMLElement == 'function' || typeof HTMLElement == 'object' ) ?
      function isElementDOM2( obj ) {
        return obj instanceof HTMLElement;
      } :
      function isElementQuirky( obj ) {
        return obj && typeof obj == 'object' &&
          obj.nodeType == 1 && typeof obj.nodeName == 'string';
      };
    
    // ----- setText ----- //
    
    utils.setText = ( function() {
      var setTextProperty;
      function setText( elem, text ) {
        // only check setTextProperty once
        setTextProperty = setTextProperty || ( document.documentElement.textContent !== undefined ? 'textContent' : 'innerText' );
        elem[ setTextProperty ] = text;
      }
      return setText;
    })();
    
    // ----- getParent ----- //
    
    utils.getParent = function( elem, selector ) {
      while ( elem != document.body ) {
        elem = elem.parentNode;
        if ( matchesSelector( elem, selector ) ) {
          return elem;
        }
      }
    };
    
    // ----- getQueryElement ----- //
    
    // use element as selector string
    utils.getQueryElement = function( elem ) {
      if ( typeof elem == 'string' ) {
        return document.querySelector( elem );
      }
      return elem;
    };
    
    // ----- handleEvent ----- //
    
    // enable .ontype to trigger from .addEventListener( elem, 'type' )
    utils.handleEvent = function( event ) {
      var method = 'on' + event.type;
      if ( this[ method ] ) {
        this[ method ]( event );
      }
    };
    
    // ----- filterFindElements ----- //
    
    utils.filterFindElements = function( elems, selector ) {
      // make array of elems
      elems = utils.makeArray( elems );
      var ffElems = [];
    
      for ( var i=0, len = elems.length; i < len; i++ ) {
        var elem = elems[i];
        // check that elem is an actual element
        if ( !utils.isElement( elem ) ) {
          continue;
        }
        // filter & find items if we have a selector
        if ( selector ) {
          // filter siblings
          if ( matchesSelector( elem, selector ) ) {
            ffElems.push( elem );
          }
          // find children
          var childElems = elem.querySelectorAll( selector );
          // concat childElems to filterFound array
          for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
            ffElems.push( childElems[j] );
          }
        } else {
          ffElems.push( elem );
        }
      }
    
      return ffElems;
    };
    
    // ----- debounceMethod ----- //
    
    utils.debounceMethod = function( _class, methodName, threshold ) {
      // original method
      var method = _class.prototype[ methodName ];
      var timeoutName = methodName + 'Timeout';
    
      _class.prototype[ methodName ] = function() {
        var timeout = this[ timeoutName ];
        if ( timeout ) {
          clearTimeout( timeout );
        }
        var args = arguments;
    
        var _this = this;
        this[ timeoutName ] = setTimeout( function() {
          method.apply( _this, args );
          delete _this[ timeoutName ];
        }, threshold || 100 );
      };
    };
    
    // ----- htmlInit ----- //
    
    var jQuery = window.jQuery;
    
    // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
    function toDashed( str ) {
      return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
        return $1 + '-' + $2;
      }).toLowerCase();
    }
    
    var console = window.console;
    /**
     * allow user to initialize classes via .js-namespace class
     * htmlInit( Widget, 'widgetName' )
     * options are parsed from data-namespace-option attribute
     */
    utils.htmlInit = function( WidgetClass, namespace ) {
      docReady( function() {
        var dashedNamespace = toDashed( namespace );
        var elems = document.querySelectorAll( '.js-' + dashedNamespace );
        var dataAttr = 'data-' + dashedNamespace + '-options';
    
        for ( var i=0, len = elems.length; i < len; i++ ) {
          var elem = elems[i];
          var attr = elem.getAttribute( dataAttr );
          var options;
          try {
            options = attr && JSON.parse( attr );
          } catch ( error ) {
            // log error, do not initialize
            if ( console ) {
              console.error( 'Error parsing ' + dataAttr + ' on ' +
                elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
                error );
            }
            continue;
          }
          // initialize
          var instance = new WidgetClass( elem, options );
          // make available via $().data('layoutname')
          if ( jQuery ) {
            jQuery.data( elem, namespace, instance );
          }
        }
      });
    };
    
    // -----  ----- //
    
    return utils;
    
    }));
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/cell',[
          'get-size/get-size'
        ], function( getSize ) {
          return factory( window, getSize );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('get-size')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity.Cell = factory(
          window,
          window.getSize
        );
      }
    
    }( window, function factory( window, getSize ) {
    
    
    
    function Cell( elem, parent ) {
      this.element = elem;
      this.parent = parent;
    
      this.create();
    }
    
    var isIE8 = 'attachEvent' in window;
    
    Cell.prototype.create = function() {
      this.element.style.position = 'absolute';
      // IE8 prevent child from changing focus http://stackoverflow.com/a/17525223/182183
      if ( isIE8 ) {
        this.element.setAttribute( 'unselectable', 'on' );
      }
      this.x = 0;
      this.shift = 0;
    };
    
    Cell.prototype.destroy = function() {
      // reset style
      this.element.style.position = '';
      var side = this.parent.originSide;
      this.element.style[ side ] = '';
    };
    
    Cell.prototype.getSize = function() {
      this.size = getSize( this.element );
    };
    
    Cell.prototype.setPosition = function( x ) {
      this.x = x;
      this.setDefaultTarget();
      this.renderPosition( x );
    };
    
    Cell.prototype.setDefaultTarget = function() {
      var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
      this.target = this.x + this.size[ marginProperty ] +
        this.size.width * this.parent.cellAlign;
    };
    
    Cell.prototype.renderPosition = function( x ) {
      // render position of cell with in slider
      var side = this.parent.originSide;
      this.element.style[ side ] = this.parent.getPositionValue( x );
    };
    
    /**
     * @param {Integer} factor - 0, 1, or -1
    **/
    Cell.prototype.wrapShift = function( shift ) {
      this.shift = shift;
      this.renderPosition( this.x + this.parent.slideableWidth * shift );
    };
    
    Cell.prototype.remove = function() {
      this.element.parentNode.removeChild( this.element );
    };
    
    return Cell;
    
    }));
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/animate',[
          'get-style-property/get-style-property',
          'fizzy-ui-utils/utils'
        ], function( getStyleProperty, utils ) {
          return factory( window, getStyleProperty, utils );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('desandro-get-style-property'),
          require('fizzy-ui-utils')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity.animatePrototype = factory(
          window,
          window.getStyleProperty,
          window.fizzyUIUtils
        );
      }
    
    }( window, function factory( window, getStyleProperty, utils ) {
    
    
    
    // -------------------------- requestAnimationFrame -------------------------- //
    
    // https://gist.github.com/1866474
    
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' ');
    // get unprefixed rAF and cAF, if present
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;
    // loop through vendor prefixes and get prefixed rAF and cAF
    var prefix;
    for( var i = 0; i < prefixes.length; i++ ) {
      if ( requestAnimationFrame && cancelAnimationFrame ) {
        break;
      }
      prefix = prefixes[i];
      requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
      cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
                                window[ prefix + 'CancelRequestAnimationFrame' ];
    }
    
    // fallback to setTimeout and clearTimeout if either request/cancel is not supported
    if ( !requestAnimationFrame || !cancelAnimationFrame )  {
      requestAnimationFrame = function( callback ) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
        var id = window.setTimeout( function() {
          callback( currTime + timeToCall );
        }, timeToCall );
        lastTime = currTime + timeToCall;
        return id;
      };
    
      cancelAnimationFrame = function( id ) {
        window.clearTimeout( id );
      };
    }
    
    // -------------------------- animate -------------------------- //
    
    var proto = {};
    
    proto.startAnimation = function() {
      if ( this.isAnimating ) {
        return;
      }
    
      this.isAnimating = true;
      this.restingFrames = 0;
      this.animate();
    };
    
    proto.animate = function() {
      this.applySelectedAttraction();
    
      var previousX = this.x;
    
      this.integratePhysics();
      this.positionSlider();
      this.settle( previousX );
      // animate next frame
      if ( this.isAnimating ) {
        var _this = this;
        requestAnimationFrame( function animateFrame() {
          _this.animate();
        });
      }
    
      /** /
      // log animation frame rate
      var now = new Date();
      if ( this.then ) {
        console.log( ~~( 1000 / (now-this.then)) + 'fps' )
      }
      this.then = now;
      /**/
    };
    
    
    var transformProperty = getStyleProperty('transform');
    var is3d = !!getStyleProperty('perspective');
    
    proto.positionSlider = function() {
      var x = this.x;
      // wrap position around
      if ( this.options.wrapAround && this.cells.length > 1 ) {
        x = utils.modulo( x, this.slideableWidth );
        x = x - this.slideableWidth;
        this.shiftWrapCells( x );
      }
    
      x = x + this.cursorPosition;
    
      // reverse if right-to-left and using transform
      x = this.options.rightToLeft && transformProperty ? -x : x;
    
      var value = this.getPositionValue( x );
    
      if ( transformProperty ) {
        // use 3D tranforms for hardware acceleration on iOS
        // but use 2D when settled, for better font-rendering
        this.slider.style[ transformProperty ] = is3d && this.isAnimating ?
          'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';
      } else {
        this.slider.style[ this.originSide ] = value;
      }
    };
    
    proto.positionSliderAtSelected = function() {
      if ( !this.cells.length ) {
        return;
      }
      var selectedCell = this.cells[ this.selectedIndex ];
      this.x = -selectedCell.target;
      this.positionSlider();
    };
    
    proto.getPositionValue = function( position ) {
      if ( this.options.percentPosition ) {
        // percent position, round to 2 digits, like 12.34%
        return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
      } else {
        // pixel positioning
        return Math.round( position ) + 'px';
      }
    };
    
    proto.settle = function( previousX ) {
      // keep track of frames where x hasn't moved
      if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
        this.restingFrames++;
      }
      // stop animating if resting for 3 or more frames
      if ( this.restingFrames > 2 ) {
        this.isAnimating = false;
        delete this.isFreeScrolling;
        // render position with translateX when settled
        if ( is3d ) {
          this.positionSlider();
        }
        this.dispatchEvent('settle');
      }
    };
    
    proto.shiftWrapCells = function( x ) {
      // shift before cells
      var beforeGap = this.cursorPosition + x;
      this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
      // shift after cells
      var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
      this._shiftCells( this.afterShiftCells, afterGap, 1 );
    };
    
    proto._shiftCells = function( cells, gap, shift ) {
      for ( var i=0, len = cells.length; i < len; i++ ) {
        var cell = cells[i];
        var cellShift = gap > 0 ? shift : 0;
        cell.wrapShift( cellShift );
        gap -= cell.size.outerWidth;
      }
    };
    
    proto._unshiftCells = function( cells ) {
      if ( !cells || !cells.length ) {
        return;
      }
      for ( var i=0, len = cells.length; i < len; i++ ) {
        cells[i].wrapShift( 0 );
      }
    };
    
    // -------------------------- physics -------------------------- //
    
    proto.integratePhysics = function() {
      this.velocity += this.accel;
      this.x += this.velocity;
      this.velocity *= this.getFrictionFactor();
      // reset acceleration
      this.accel = 0;
    };
    
    proto.applyForce = function( force ) {
      this.accel += force;
    };
    
    proto.getFrictionFactor = function() {
      return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
    };
    
    
    proto.getRestingPosition = function() {
      // my thanks to Steven Wittens, who simplified this math greatly
      return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
    };
    
    
    proto.applySelectedAttraction = function() {
      // do not attract if pointer down or no cells
      var len = this.cells.length;
      if ( this.isPointerDown || this.isFreeScrolling || !len ) {
        return;
      }
      var cell = this.cells[ this.selectedIndex ];
      var wrap = this.options.wrapAround && len > 1 ?
        this.slideableWidth * Math.floor( this.selectedIndex / len ) : 0;
      var distance = ( cell.target + wrap ) * -1 - this.x;
      var force = distance * this.options.selectedAttraction;
      this.applyForce( force );
    };
    
    return proto;
    
    }));
    
    /*!
     * Flickity v1.0.0
     * Touch, responsive, flickable galleries
     *
     * Licensed GPLv3 for open source use
     * or Flickity Commercial License for commercial use
     *
     * http://flickity.metafizzy.co
     * Copyright 2015 Metafizzy
     */
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/flickity',[
          'classie/classie',
          'eventEmitter/EventEmitter',
          'eventie/eventie',
          'get-size/get-size',
          'fizzy-ui-utils/utils',
          './cell',
          './animate'
        ], function( classie, EventEmitter, eventie, getSize, utils, Cell, animatePrototype ) {
          return factory( window, classie, EventEmitter, eventie, getSize, utils, Cell, animatePrototype );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('desandro-classie'),
          require('wolfy87-eventemitter'),
          require('eventie'),
          require('get-size'),
          require('fizzy-ui-utils'),
          require('./cell'),
          require('./animate')
        );
      } else {
        // browser global
        var _Flickity = window.Flickity;
    
        window.Flickity = factory(
          window,
          window.classie,
          window.EventEmitter,
          window.eventie,
          window.getSize,
          window.fizzyUIUtils,
          _Flickity.Cell,
          _Flickity.animatePrototype
        );
      }
    
    }( window, function factory( window, classie, EventEmitter, eventie, getSize,
      utils, Cell, animatePrototype ) {
    
    
    
    // vars
    var jQuery = window.jQuery;
    var getComputedStyle = window.getComputedStyle;
    var console = window.console;
    
    function moveElements( elems, toElem ) {
      elems = utils.makeArray( elems );
      while ( elems.length ) {
        toElem.appendChild( elems.shift() );
      }
    }
    
    // -------------------------- Flickity -------------------------- //
    
    // globally unique identifiers
    var GUID = 0;
    // internal store of all Flickity intances
    var instances = {};
    
    function Flickity( element, options ) {
      var queryElement = utils.getQueryElement( element );
      if ( !queryElement ) {
        if ( console ) {
          console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
        }
        return;
      }
      this.element = queryElement;
      // add jQuery
      if ( jQuery ) {
        this.$element = jQuery( this.element );
      }
      // options
      this.options = utils.extend( {}, this.constructor.defaults );
      this.option( options );
    
      // kick things off
      this._create();
    }
    
    Flickity.defaults = {
      accessibility: true,
      cellAlign: 'center',
      // cellSelector: undefined,
      // contain: false,
      freeScrollFriction: 0.075, // friction when free-scrolling
      friction: 0.28, // friction when selecting
      // initialIndex: 0,
      percentPosition: true,
      resize: true,
      selectedAttraction: 0.025,
      setGallerySize: true
      // watchCSS: false,
      // wrapAround: false
    };
    
    // hash of methods triggered on _create()
    Flickity.createMethods = [];
    
    // inherit EventEmitter
    utils.extend( Flickity.prototype, EventEmitter.prototype );
    
    Flickity.prototype._create = function() {
      // add id for Flickity.data
      var id = this.guid = ++GUID;
      this.element.flickityGUID = id; // expando
      instances[ id ] = this; // associate via id
      // initial properties
      this.selectedIndex = this.options.initialIndex || 0;
      // how many frames slider has been in same position
      this.restingFrames = 0;
      // initial physics properties
      this.x = 0;
      this.velocity = 0;
      this.accel = 0;
      this.originSide = this.options.rightToLeft ? 'right' : 'left';
      // create viewport & slider
      this.viewport = document.createElement('div');
      this.viewport.className = 'flickity-viewport';
      Flickity.setUnselectable( this.viewport );
      this._createSlider();
    
      if ( this.options.resize || this.options.watchCSS ) {
        eventie.bind( window, 'resize', this );
        this.isResizeBound = true;
      }
    
      for ( var i=0, len = Flickity.createMethods.length; i < len; i++ ) {
        var method = Flickity.createMethods[i];
        this[ method ]();
      }
    
      if ( this.options.watchCSS ) {
        this.watchCSS();
      } else {
        this.activate();
      }
    
    };
    
    /**
     * set options
     * @param {Object} opts
     */
    Flickity.prototype.option = function( opts ) {
      utils.extend( this.options, opts );
    };
    
    Flickity.prototype.activate = function() {
      if ( this.isActive ) {
        return;
      }
      this.isActive = true;
      classie.add( this.element, 'flickity-enabled' );
      if ( this.options.rightToLeft ) {
        classie.add( this.element, 'flickity-rtl' );
      }
    
      // move initial cell elements so they can be loaded as cells
      var cellElems = this._filterFindCellElements( this.element.children );
      moveElements( cellElems, this.slider );
      this.viewport.appendChild( this.slider );
      this.element.appendChild( this.viewport );
    
      this.getSize();
      // get cells from children
      this.reloadCells();
      this.setGallerySize();
    
      if ( this.options.accessibility ) {
        // allow element to focusable
        this.element.tabIndex = 0;
        // listen for key presses
        eventie.bind( this.element, 'keydown', this );
      }
    
      this.emit('activate');
    
      this.positionSliderAtSelected();
      this.select( this.selectedIndex );
    };
    
    // slider positions the cells
    Flickity.prototype._createSlider = function() {
      // slider element does all the positioning
      var slider = document.createElement('div');
      slider.className = 'flickity-slider';
      slider.style[ this.originSide ] = 0;
      this.slider = slider;
    };
    
    Flickity.prototype._filterFindCellElements = function( elems ) {
      return utils.filterFindElements( elems, this.options.cellSelector );
    };
    
    // goes through all children
    Flickity.prototype.reloadCells = function() {
      // collection of item elements
      this.cells = this._makeCells( this.slider.children );
      this.positionCells();
      this._getWrapShiftCells();
      this.setGallerySize();
    };
    
    /**
     * turn elements into Flickity.Cells
     * @param {Array or NodeList or HTMLElement} elems
     * @returns {Array} items - collection of new Flickity Cells
     */
    Flickity.prototype._makeCells = function( elems ) {
      var cellElems = this._filterFindCellElements( elems );
    
      // create new Flickity for collection
      var cells = [];
      for ( var i=0, len = cellElems.length; i < len; i++ ) {
        var elem = cellElems[i];
        var cell = new Cell( elem, this );
        cells.push( cell );
      }
    
      return cells;
    };
    
    Flickity.prototype.getLastCell = function() {
      return this.cells[ this.cells.length - 1 ];
    };
    
    // positions all cells
    Flickity.prototype.positionCells = function() {
      // size all cells
      this._sizeCells( this.cells );
      // position all cells
      this._positionCells( 0 );
    };
    
    /**
     * position certain cells
     * @param {Integer} index - which cell to start with
     */
    Flickity.prototype._positionCells = function( index ) {
      // also measure maxCellHeight
      // start 0 if positioning all cells
      this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
      var cellX = 0;
      // get cellX
      if ( index > 0 ) {
        var startCell = this.cells[ index - 1 ];
        cellX = startCell.x + startCell.size.outerWidth;
      }
      var cell;
      for ( var len = this.cells.length, i=index; i < len; i++ ) {
        cell = this.cells[i];
        cell.setPosition( cellX );
        cellX += cell.size.outerWidth;
        this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
      }
      // keep track of cellX for wrap-around
      this.slideableWidth = cellX;
      // contain cell target
      this._containCells();
    };
    
    /**
     * cell.getSize() on multiple cells
     * @param {Array} cells
     */
    Flickity.prototype._sizeCells = function( cells ) {
      for ( var i=0, len = cells.length; i < len; i++ ) {
        var cell = cells[i];
        cell.getSize();
      }
    };
    
    // alias _init for jQuery plugin .flickity()
    Flickity.prototype._init =
    Flickity.prototype.reposition = function() {
      this.positionCells();
      this.positionSliderAtSelected();
    };
    
    Flickity.prototype.getSize = function() {
      this.size = getSize( this.element );
      this.setCellAlign();
      this.cursorPosition = this.size.innerWidth * this.cellAlign;
    };
    
    var cellAlignShorthands = {
      // cell align, then based on origin side
      center: {
        left: 0.5,
        right: 0.5
      },
      left: {
        left: 0,
        right: 1
      },
      right: {
        right: 0,
        left: 1
      }
    };
    
    Flickity.prototype.setCellAlign = function() {
      var shorthand = cellAlignShorthands[ this.options.cellAlign ];
      this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
    };
    
    Flickity.prototype.setGallerySize = function() {
      if ( this.options.setGallerySize ) {
        this.viewport.style.height = this.maxCellHeight + 'px';
      }
    };
    
    Flickity.prototype._getWrapShiftCells = function() {
      // only for wrap-around
      if ( !this.options.wrapAround ) {
        return;
      }
      // unshift previous cells
      this._unshiftCells( this.beforeShiftCells );
      this._unshiftCells( this.afterShiftCells );
      // get before cells
      // initial gap
      var gapX = this.cursorPosition;
      var cellIndex = this.cells.length - 1;
      this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
      // get after cells
      // ending gap between last cell and end of gallery viewport
      gapX = this.size.innerWidth - this.cursorPosition;
      // start cloning at first cell, working forwards
      this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
    };
    
    Flickity.prototype._getGapCells = function( gapX, cellIndex, increment ) {
      // keep adding cells until the cover the initial gap
      var cells = [];
      while ( gapX > 0 ) {
        var cell = this.cells[ cellIndex ];
        if ( !cell ) {
          break;
        }
        cells.push( cell );
        cellIndex += increment;
        gapX -= cell.size.outerWidth;
      }
      return cells;
    };
    
    // ----- contain ----- //
    
    // contain cell targets so no excess sliding
    Flickity.prototype._containCells = function() {
      if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
        return;
      }
      var startMargin = this.options.rightToLeft ? 'marginRight' : 'marginLeft';
      var endMargin = this.options.rightToLeft ? 'marginLeft' : 'marginRight';
      var firstCellStartMargin = this.cells[0].size[ startMargin ];
      var lastCell = this.getLastCell();
      var contentWidth = this.slideableWidth - lastCell.size[ endMargin ];
      var endLimit = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
      // content is less than gallery size
      var isContentSmaller = contentWidth < this.size.innerWidth;
      // contain each cell target
      for ( var i=0, len = this.cells.length; i < len; i++ ) {
        var cell = this.cells[i];
        // reset default target
        cell.setDefaultTarget();
        if ( isContentSmaller ) {
          // all cells fit inside gallery
          cell.target = contentWidth * this.cellAlign;
        } else {
          // contain to bounds
          cell.target = Math.max( cell.target, this.cursorPosition + firstCellStartMargin );
          cell.target = Math.min( cell.target, endLimit );
        }
      }
    };
    
    // -----  ----- //
    
    /**
     * emits events via eventEmitter and jQuery events
     * @param {String} type - name of event
     * @param {Event} event - original event
     * @param {Array} args - extra arguments
     */
    Flickity.prototype.dispatchEvent = function( type, event, args ) {
      var emitArgs = [ event ].concat( args );
      this.emitEvent( type, emitArgs );
    
      if ( jQuery && this.$element ) {
        if ( event ) {
          // create jQuery event
          var $event = jQuery.Event( event );
          $event.type = type;
          this.$element.trigger( $event, args );
        } else {
          // just trigger with type if no event available
          this.$element.trigger( type, args );
        }
      }
    };
    
    // -------------------------- select -------------------------- //
    
    /**
     * @param {Integer} index - index of the cell
     * @param {Boolean} isWrap - will wrap-around to last/first if at the end
     */
    Flickity.prototype.select = function( index, isWrap ) {
      if ( !this.isActive ) {
        return;
      }
      // wrap position so slider is within normal area
      var len = this.cells.length;
      if ( this.options.wrapAround && len > 1 ) {
        if ( index < 0 ) {
          this.x -= this.slideableWidth;
        } else if ( index >= len ) {
          this.x += this.slideableWidth;
        }
      }
    
      if ( this.options.wrapAround || isWrap ) {
        index = utils.modulo( index, len );
      }
    
      if ( this.cells[ index ] ) {
        this.selectedIndex = index;
        this.setSelectedCell();
        this.startAnimation();
        this.dispatchEvent('cellSelect');
      }
    };
    
    Flickity.prototype.previous = function( isWrap ) {
      this.select( this.selectedIndex - 1, isWrap );
    };
    
    Flickity.prototype.next = function( isWrap ) {
      this.select( this.selectedIndex + 1, isWrap );
    };
    
    Flickity.prototype.setSelectedCell = function() {
      this._removeSelectedCellClass();
      this.selectedCell = this.cells[ this.selectedIndex ];
      this.selectedElement = this.selectedCell.element;
      classie.add( this.selectedElement, 'is-selected' );
    };
    
    Flickity.prototype._removeSelectedCellClass = function() {
      if ( this.selectedCell ) {
        classie.remove( this.selectedCell.element, 'is-selected' );
      }
    };
    
    // -------------------------- get cells -------------------------- //
    
    /**
     * get Flickity.Cell, given an Element
     * @param {Element} elem
     * @returns {Flickity.Cell} item
     */
    Flickity.prototype.getCell = function( elem ) {
      // loop through cells to get the one that matches
      for ( var i=0, len = this.cells.length; i < len; i++ ) {
        var cell = this.cells[i];
        if ( cell.element == elem ) {
          return cell;
        }
      }
    };
    
    /**
     * get collection of Flickity.Cells, given Elements
     * @param {Element, Array, NodeList} elems
     * @returns {Array} cells - Flickity.Cells
     */
    Flickity.prototype.getCells = function( elems ) {
      elems = utils.makeArray( elems );
      var cells = [];
      for ( var i=0, len = elems.length; i < len; i++ ) {
        var elem = elems[i];
        var cell = this.getCell( elem );
        if ( cell ) {
          cells.push( cell );
        }
      }
      return cells;
    };
    
    /**
     * get cell elements
     * @returns {Array} cellElems
     */
    Flickity.prototype.getCellElements = function() {
      var cellElems = [];
      for ( var i=0, len = this.cells.length; i < len; i++ ) {
        cellElems.push( this.cells[i].element );
      }
      return cellElems;
    };
    
    /**
     * get parent cell from an element
     * @param {Element} elem
     * @returns {Flickit.Cell} cell
     */
    Flickity.prototype.getParentCell = function( elem ) {
      // first check if elem is cell
      var cell = this.getCell( elem );
      if ( cell ) {
        return cell;
      }
      // try to get parent cell elem
      elem = utils.getParent( elem, '.flickity-slider > *' );
      return this.getCell( elem );
    };
    
    // -------------------------- events -------------------------- //
    
    Flickity.prototype.uiChange = function() {
      this.emit('uiChange');
    };
    
    Flickity.prototype.childUIPointerDown = function( event ) {
      this.emitEvent( 'childUIPointerDown', [ event ] );
    };
    
    // ----- resize ----- //
    
    Flickity.prototype.onresize = function() {
      this.watchCSS();
      this.resize();
    };
    
    utils.debounceMethod( Flickity, 'onresize', 150 );
    
    Flickity.prototype.resize = function() {
      if ( !this.isActive ) {
        return;
      }
      this.getSize();
      // wrap values
      if ( this.options.wrapAround ) {
        this.x = utils.modulo( this.x, this.slideableWidth );
      }
      this.positionCells();
      this._getWrapShiftCells();
      this.setGallerySize();
      this.positionSliderAtSelected();
    };
    
    var supportsConditionalCSS = Flickity.supportsConditionalCSS = ( function() {
      var supports;
      return function checkSupport() {
        if ( supports !== undefined ) {
          return supports;
        }
        if ( !getComputedStyle ) {
          supports = false;
          return;
        }
        // style body's :after and check that
        var style = document.createElement('style');
        var cssText = document.createTextNode('body:after { content: "foo"; display: none; }');
        style.appendChild( cssText );
        document.head.appendChild( style );
        var afterContent = getComputedStyle( document.body, ':after' ).content;
        // check if able to get :after content
        supports = afterContent.indexOf('foo') != -1;
        document.head.removeChild( style );
        return supports;
      };
    })();
    
    // watches the :after property, activates/deactivates
    Flickity.prototype.watchCSS = function() {
      var watchOption = this.options.watchCSS;
      if ( !watchOption ) {
        return;
      }
      var supports = supportsConditionalCSS();
      if ( !supports ) {
        // activate if watch option is fallbackOn
        var method = watchOption == 'fallbackOn' ? 'activate' : 'deactivate';
        this[ method ]();
        return;
      }
    
      var afterContent = getComputedStyle( this.element, ':after' ).content;
      // activate if :after { content: 'flickity' }
      if ( afterContent.indexOf('flickity') != -1 ) {
        this.activate();
      } else {
        this.deactivate();
      }
    };
    
    // ----- keydown ----- //
    
    // go previous/next if left/right keys pressed
    Flickity.prototype.onkeydown = function( event ) {
      // only work if element is in focus
      if ( !this.options.accessibility ||
        ( document.activeElement && document.activeElement != this.element ) ) {
        return;
      }
    
      if ( event.keyCode == 37 ) {
        // go left
        var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
        this.uiChange();
        this[ leftMethod ]();
      } else if ( event.keyCode == 39 ) {
        // go right
        var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
        this.uiChange();
        this[ rightMethod ]();
      }
    };
    
    // -------------------------- destroy -------------------------- //
    
    // deactivate all Flickity functionality, but keep stuff available
    Flickity.prototype.deactivate = function() {
      if ( !this.isActive ) {
        return;
      }
      classie.remove( this.element, 'flickity-enabled' );
      classie.remove( this.element, 'flickity-rtl' );
      // destroy cells
      for ( var i=0, len = this.cells.length; i < len; i++ ) {
        var cell = this.cells[i];
        cell.destroy();
      }
      this._removeSelectedCellClass();
      this.element.removeChild( this.viewport );
      // move child elements back into element
      moveElements( this.slider.children, this.element );
      if ( this.options.accessibility ) {
        this.element.removeAttribute('tabIndex');
        eventie.unbind( this.element, 'keydown', this );
      }
      // set flags
      this.isActive = false;
      this.emit('deactivate');
    };
    
    Flickity.prototype.destroy = function() {
      this.deactivate();
      if ( this.isResizeBound ) {
        eventie.unbind( window, 'resize', this );
      }
      this.emit('destroy');
      if ( jQuery && this.$element ) {
        jQuery.removeData( this.element, 'flickity' );
      }
      delete this.element.flickityGUID;
      delete instances[ this.guid ];
    };
    
    // -------------------------- prototype -------------------------- //
    
    utils.extend( Flickity.prototype, animatePrototype );
    
    // -------------------------- extras -------------------------- //
    
    // quick check for IE8
    var isIE8 = 'attachEvent' in window;
    
    Flickity.setUnselectable = function( elem ) {
      if ( !isIE8 ) {
        return;
      }
      // IE8 prevent child from changing focus http://stackoverflow.com/a/17525223/182183
      elem.setAttribute( 'unselectable', 'on' );
    };
    
    /**
     * get Flickity instance from element
     * @param {Element} elem
     * @returns {Flickity}
     */
    Flickity.data = function( elem ) {
      elem = utils.getQueryElement( elem );
      var id = elem && elem.flickityGUID;
      return id && instances[ id ];
    };
    
    utils.htmlInit( Flickity, 'flickity' );
    
    if ( jQuery && jQuery.bridget ) {
      jQuery.bridget( 'flickity', Flickity );
    }
    
    Flickity.Cell = Cell;
    
    return Flickity;
    
    }));
    
    /*!
     * Unipointer v1.0.0
     * base class for doing one thing with pointer event
     * MIT license
     */
    
    /*jshint browser: true, undef: true, unused: true, strict: true */
    /*global define: false, module: false, require: false */
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'unipointer/unipointer',[
          'eventEmitter/EventEmitter',
          'eventie/eventie'
        ], function( EventEmitter, eventie ) {
          return factory( window, EventEmitter, eventie );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('wolfy87-eventemitter'),
          require('eventie')
        );
      } else {
        // browser global
        window.Unipointer = factory(
          window,
          window.EventEmitter,
          window.eventie
        );
      }
    
    }( window, function factory( window, EventEmitter, eventie ) {
    
    
    
    function noop() {}
    
    function Unipointer() {}
    
    // inherit EventEmitter
    Unipointer.prototype = new EventEmitter();
    
    Unipointer.prototype.bindStartEvent = function( elem ) {
      this._bindStartEvent( elem, true );
    };
    
    Unipointer.prototype.unbindStartEvent = function( elem ) {
      this._bindStartEvent( elem, false );
    };
    
    /**
     * works as unbinder, as you can ._bindStart( false ) to unbind
     * @param {Boolean} isBind - will unbind if falsey
     */
    Unipointer.prototype._bindStartEvent = function( elem, isBind ) {
      // munge isBind, default to true
      isBind = isBind === undefined ? true : !!isBind;
      var bindMethod = isBind ? 'bind' : 'unbind';
    
      if ( window.navigator.pointerEnabled ) {
        // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
        eventie[ bindMethod ]( elem, 'pointerdown', this );
      } else if ( window.navigator.msPointerEnabled ) {
        // IE10 Pointer Events
        eventie[ bindMethod ]( elem, 'MSPointerDown', this );
      } else {
        // listen for both, for devices like Chrome Pixel
        eventie[ bindMethod ]( elem, 'mousedown', this );
        eventie[ bindMethod ]( elem, 'touchstart', this );
      }
    };
    
    // trigger handler methods for events
    Unipointer.prototype.handleEvent = function( event ) {
      var method = 'on' + event.type;
      if ( this[ method ] ) {
        this[ method ]( event );
      }
    };
    
    // returns the touch that we're keeping track of
    Unipointer.prototype.getTouch = function( touches ) {
      for ( var i=0, len = touches.length; i < len; i++ ) {
        var touch = touches[i];
        if ( touch.identifier == this.pointerIdentifier ) {
          return touch;
        }
      }
    };
    
    // ----- start event ----- //
    
    Unipointer.prototype.onmousedown = function( event ) {
      // dismiss clicks from right or middle buttons
      var button = event.button;
      if ( button && ( button !== 0 && button !== 1 ) ) {
        return;
      }
      this._pointerDown( event, event );
    };
    
    Unipointer.prototype.ontouchstart = function( event ) {
      this._pointerDown( event, event.changedTouches[0] );
    };
    
    Unipointer.prototype.onMSPointerDown =
    Unipointer.prototype.onpointerdown = function( event ) {
      this._pointerDown( event, event );
    };
    
    /**
     * pointer start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Unipointer.prototype._pointerDown = function( event, pointer ) {
      // dismiss other pointers
      if ( this.isPointerDown ) {
        return;
      }
    
      this.isPointerDown = true;
      // save pointer identifier to match up touch events
      this.pointerIdentifier = pointer.pointerId !== undefined ?
        // pointerId for pointer events, touch.indentifier for touch events
        pointer.pointerId : pointer.identifier;
    
      this.pointerDown( event, pointer );
    };
    
    Unipointer.prototype.pointerDown = function( event, pointer ) {
      this._bindPostStartEvents( event );
      this.emitEvent( 'pointerDown', [ this, event, pointer ] );
    };
    
    // hash of events to be bound after start event
    var postStartEvents = {
      mousedown: [ 'mousemove', 'mouseup' ],
      touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
      pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
      MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
    };
    
    Unipointer.prototype._bindPostStartEvents = function( event ) {
      if ( !event ) {
        return;
      }
      // get proper events to match start event
      var events = postStartEvents[ event.type ];
      // IE8 needs to be bound to document
      var node = event.preventDefault ? window : document;
      // bind events to node
      for ( var i=0, len = events.length; i < len; i++ ) {
        var evnt = events[i];
        eventie.bind( node, evnt, this );
      }
      // save these arguments
      this._boundPointerEvents = {
        events: events,
        node: node
      };
    };
    
    Unipointer.prototype._unbindPostStartEvents = function() {
      var args = this._boundPointerEvents;
      // IE8 can trigger dragEnd twice, check for _boundEvents
      if ( !args || !args.events ) {
        return;
      }
    
      for ( var i=0, len = args.events.length; i < len; i++ ) {
        var event = args.events[i];
        eventie.unbind( args.node, event, this );
      }
      delete this._boundPointerEvents;
    };
    
    // ----- move event ----- //
    
    Unipointer.prototype.onmousemove = function( event ) {
      this._pointerMove( event, event );
    };
    
    Unipointer.prototype.onMSPointerMove =
    Unipointer.prototype.onpointermove = function( event ) {
      if ( event.pointerId == this.pointerIdentifier ) {
        this._pointerMove( event, event );
      }
    };
    
    Unipointer.prototype.ontouchmove = function( event ) {
      var touch = this.getTouch( event.changedTouches );
      if ( touch ) {
        this._pointerMove( event, touch );
      }
    };
    
    /**
     * pointer move
     * @param {Event} event
     * @param {Event or Touch} pointer
     * @private
     */
    Unipointer.prototype._pointerMove = function( event, pointer ) {
      this.pointerMove( event, pointer );
    };
    
    // public
    Unipointer.prototype.pointerMove = function( event, pointer ) {
      this.emitEvent( 'pointerMove', [ this, event, pointer ] );
    };
    
    // ----- end event ----- //
    
    
    Unipointer.prototype.onmouseup = function( event ) {
      this._pointerUp( event, event );
    };
    
    Unipointer.prototype.onMSPointerUp =
    Unipointer.prototype.onpointerup = function( event ) {
      if ( event.pointerId == this.pointerIdentifier ) {
        this._pointerUp( event, event );
      }
    };
    
    Unipointer.prototype.ontouchend = function( event ) {
      var touch = this.getTouch( event.changedTouches );
      if ( touch ) {
        this._pointerUp( event, touch );
      }
    };
    
    /**
     * pointer up
     * @param {Event} event
     * @param {Event or Touch} pointer
     * @private
     */
    Unipointer.prototype._pointerUp = function( event, pointer ) {
      this._pointerDone();
      this.pointerUp( event, pointer );
    };
    
    // public
    Unipointer.prototype.pointerUp = function( event, pointer ) {
      this.emitEvent( 'pointerUp', [ this, event, pointer ] );
    };
    
    // ----- pointer done ----- //
    
    // triggered on pointer up & pointer cancel
    Unipointer.prototype._pointerDone = function() {
      // reset properties
      this.isPointerDown = false;
      delete this.pointerIdentifier;
      // remove events
      this._unbindPostStartEvents();
      this.pointerDone();
    };
    
    Unipointer.prototype.pointerDone = noop;
    
    // ----- pointer cancel ----- //
    
    Unipointer.prototype.onMSPointerCancel =
    Unipointer.prototype.onpointercancel = function( event ) {
      if ( event.pointerId == this.pointerIdentifier ) {
        this._pointerCancel( event, event );
      }
    };
    
    Unipointer.prototype.ontouchcancel = function( event ) {
      var touch = this.getTouch( event.changedTouches );
      if ( touch ) {
        this._pointerCancel( event, touch );
      }
    };
    
    /**
     * pointer cancel
     * @param {Event} event
     * @param {Event or Touch} pointer
     * @private
     */
    Unipointer.prototype._pointerCancel = function( event, pointer ) {
      this._pointerDone();
      this.pointerCancel( event, pointer );
    };
    
    // public
    Unipointer.prototype.pointerCancel = function( event, pointer ) {
      this.emitEvent( 'pointerCancel', [ this, event, pointer ] );
    };
    
    // -----  ----- //
    
    // utility function for getting x/y cooridinates from event, because IE8
    Unipointer.getPointerPoint = function( pointer ) {
      return {
        x: pointer.pageX !== undefined ? pointer.pageX : pointer.clientX,
        y: pointer.pageY !== undefined ? pointer.pageY : pointer.clientY
      };
    };
    
    // -----  ----- //
    
    return Unipointer;
    
    }));
    
    /*!
     * Unidragger v1.0.0
     * Draggable base class
     * MIT license
     */
    
    /*jshint browser: true, unused: true, undef: true, strict: true */
    
    ( function( window, factory ) {
      /*global define: false, module: false, require: false */
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'unidragger/unidragger',[
          'eventie/eventie',
          'unipointer/unipointer'
        ], function( eventie, Unipointer ) {
          return factory( window, eventie, Unipointer );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('eventie'),
          require('unipointer')
        );
      } else {
        // browser global
        window.Unidragger = factory(
          window,
          window.eventie,
          window.Unipointer
        );
      }
    
    }( window, function factory( window, eventie, Unipointer ) {
    
    
    
    // -----  ----- //
    
    function noop() {}
    
    // handle IE8 prevent default
    function preventDefaultEvent( event ) {
      if ( event.preventDefault ) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }
    
    function getParentLink( elem ) {
      while ( elem != document.body ) {
        elem = elem.parentNode;
        if ( elem.nodeName == 'A' ) {
          return elem;
        }
      }
    }
    
    // -------------------------- Unidragger -------------------------- //
    
    function Unidragger() {}
    
    // inherit Unipointer & EventEmitter
    Unidragger.prototype = new Unipointer();
    
    // ----- bind start ----- //
    
    Unidragger.prototype.bindHandles = function() {
      this._bindHandles( true );
    };
    
    Unidragger.prototype.unbindHandles = function() {
      this._bindHandles( false );
    };
    
    var navigator = window.navigator;
    /**
     * works as unbinder, as you can .bindHandles( false ) to unbind
     * @param {Boolean} isBind - will unbind if falsey
     */
    Unidragger.prototype._bindHandles = function( isBind ) {
      // munge isBind, default to true
      isBind = isBind === undefined ? true : !!isBind;
      // extra bind logic
      var binderExtra;
      if ( navigator.pointerEnabled ) {
        binderExtra = function( handle ) {
          // disable scrolling on the element
          handle.style.touchAction = isBind ? 'none' : '';
        };
      } else if ( navigator.msPointerEnabled ) {
        binderExtra = function( handle ) {
          // disable scrolling on the element
          handle.style.msTouchAction = isBind ? 'none' : '';
        };
      } else {
        binderExtra = function() {
          // TODO re-enable img.ondragstart when unbinding
          if ( isBind ) {
            disableImgOndragstart( handle );
          }
        };
      }
      // bind each handle
      var bindMethod = isBind ? 'bind' : 'unbind';
      for ( var i=0, len = this.handles.length; i < len; i++ ) {
        var handle = this.handles[i];
        this._bindStartEvent( handle, isBind );
        binderExtra( handle );
        eventie[ bindMethod ]( handle, 'click', this );
      }
    };
    
    // remove default dragging interaction on all images in IE8
    // IE8 does its own drag thing on images, which messes stuff up
    
    function noDragStart() {
      return false;
    }
    
    // TODO replace this with a IE8 test
    var isIE8 = 'attachEvent' in document.documentElement;
    
    // IE8 only
    var disableImgOndragstart = !isIE8 ? noop : function( handle ) {
    
      if ( handle.nodeName == 'IMG' ) {
        handle.ondragstart = noDragStart;
      }
    
      var images = handle.querySelectorAll('img');
      for ( var i=0, len = images.length; i < len; i++ ) {
        var img = images[i];
        img.ondragstart = noDragStart;
      }
    };
    
    // ----- start event ----- //
    
    var allowTouchstartNodes = Unidragger.allowTouchstartNodes = {
      INPUT: true,
      A: true,
      BUTTON: true,
      SELECT: true
    };
    
    /**
     * pointer start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Unidragger.prototype.pointerDown = function( event, pointer ) {
      this._dragPointerDown( event, pointer );
      // kludge to blur focused inputs in dragger
      var focused = document.activeElement;
      if ( focused && focused.blur ) {
        focused.blur();
      }
      // bind move and end events
      this._bindPostStartEvents( event );
      this.emitEvent( 'pointerDown', [ this, event, pointer ] );
    };
    
    // base pointer down logic
    Unidragger.prototype._dragPointerDown = function( event, pointer ) {
      // track to see when dragging starts
      this.pointerDownPoint = Unipointer.getPointerPoint( pointer );
    
      var targetNodeName = event.target.nodeName;
      // HACK iOS, allow clicks on buttons, inputs, and links, or children of links
      var isTouchstartNode = event.type == 'touchstart' &&
        ( allowTouchstartNodes[ targetNodeName ] || getParentLink( event.target ) );
      // do not prevent default on touchstart nodes or <select>
      if ( !isTouchstartNode && targetNodeName != 'SELECT' ) {
        preventDefaultEvent( event );
      }
    };
    
    // ----- move event ----- //
    
    /**
     * drag move
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Unidragger.prototype.pointerMove = function( event, pointer ) {
      var moveVector = this._dragPointerMove( event, pointer );
      this.emitEvent( 'pointerMove', [ this, event, pointer, moveVector ] );
      this._dragMove( event, pointer, moveVector );
    };
    
    // base pointer move logic
    Unidragger.prototype._dragPointerMove = function( event, pointer ) {
      var movePoint = Unipointer.getPointerPoint( pointer );
      var moveVector = {
        x: movePoint.x - this.pointerDownPoint.x,
        y: movePoint.y - this.pointerDownPoint.y
      };
      // start drag if pointer has moved far enough to start drag
      if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
        this._dragStart( event, pointer );
      }
      return moveVector;
    };
    
    // condition if pointer has moved far enough to start drag
    Unidragger.prototype.hasDragStarted = function( moveVector ) {
      return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
    };
    
    
    // ----- end event ----- //
    
    /**
     * pointer up
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    Unidragger.prototype.pointerUp = function( event, pointer ) {
      this.emitEvent( 'pointerUp', [ this, event, pointer ] );
      this._dragPointerUp( event, pointer );
    };
    
    Unidragger.prototype._dragPointerUp = function( event, pointer ) {
      if ( this.isDragging ) {
        this._dragEnd( event, pointer );
      } else {
        // pointer didn't move enough for drag to start
        this._staticClick( event, pointer );
      }
    };
    
    // -------------------------- drag -------------------------- //
    
    // dragStart
    Unidragger.prototype._dragStart = function( event, pointer ) {
      this.isDragging = true;
      this.dragStartPoint = Unidragger.getPointerPoint( pointer );
      // prevent clicks
      this.isPreventingClicks = true;
    
      this.dragStart( event, pointer );
    };
    
    Unidragger.prototype.dragStart = function( event, pointer ) {
      this.emitEvent( 'dragStart', [ this, event, pointer ] );
    };
    
    // dragMove
    Unidragger.prototype._dragMove = function( event, pointer, moveVector ) {
      // do not drag if not dragging yet
      if ( !this.isDragging ) {
        return;
      }
    
      this.dragMove( event, pointer, moveVector );
    };
    
    Unidragger.prototype.dragMove = function( event, pointer, moveVector ) {
      this.emitEvent( 'dragMove', [ this, event, pointer, moveVector ] );
    };
    
    // dragEnd
    Unidragger.prototype._dragEnd = function( event, pointer ) {
      // set flags
      this.isDragging = false;
      // re-enable clicking async
      var _this = this;
      setTimeout( function() {
        delete _this.isPreventingClicks;
      });
    
      this.dragEnd( event, pointer );
    };
    
    Unidragger.prototype.dragEnd = function( event, pointer ) {
      this.emitEvent( 'dragEnd', [ this, event, pointer ] );
    };
    
    // ----- onclick ----- //
    
    // handle all clicks and prevent clicks when dragging
    Unidragger.prototype.onclick = function( event ) {
      if ( this.isPreventingClicks ) {
        preventDefaultEvent( event );
      }
    };
    
    // ----- staticClick ----- //
    
    // triggered after pointer down & up with no/tiny movement
    Unidragger.prototype._staticClick = function( event, pointer ) {
      // allow click in text input
      if ( event.target.nodeName == 'INPUT' && event.target.type == 'text' ) {
        event.target.focus();
      }
      this.staticClick( event, pointer );
    };
    
    Unidragger.prototype.staticClick = function( event, pointer ) {
      this.emitEvent( 'staticClick', [ this, event, pointer ] );
    };
    
    // -----  ----- //
    
    Unidragger.getPointerPoint = function( pointer ) {
      return {
        x: pointer.pageX !== undefined ? pointer.pageX : pointer.clientX,
        y: pointer.pageY !== undefined ? pointer.pageY : pointer.clientY
      };
    };
    
    // -----  ----- //
    
    Unidragger.getPointerPoint = Unipointer.getPointerPoint;
    
    return Unidragger;
    
    }));
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/drag',[
          'classie/classie',
          'eventie/eventie',
          './flickity',
          'unidragger/unidragger',
          'fizzy-ui-utils/utils'
        ], function( classie, eventie, Flickity, Unidragger, utils ) {
          return factory( window, classie, eventie, Flickity, Unidragger, utils );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('desandro-classie'),
          require('eventie'),
          require('./flickity'),
          require('unidragger'),
          require('fizzy-ui-utils')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity.dragPrototype = factory(
          window,
          window.classie,
          window.eventie,
          window.Flickity,
          window.Unidragger,
          window.fizzyUIUtils
        );
      }
    
    }( window, function factory( window, classie, eventie, Flickity, Unidragger, utils ) {
    
    
    
    // handle IE8 prevent default
    function preventDefaultEvent( event ) {
      if ( event.preventDefault ) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }
    
    // ----- defaults ----- //
    
    utils.extend( Flickity.defaults, {
      draggable: true,
      touchVerticalScroll: true
    });
    
    // ----- create ----- //
    
    Flickity.createMethods.push('_createDrag');
    
    // -------------------------- drag prototype -------------------------- //
    
    var proto = {};
    utils.extend( proto, Unidragger.prototype );
    
    // --------------------------  -------------------------- //
    
    proto._createDrag = function() {
      this.on( 'activate', this.bindDrag );
      this.on( 'uiChange', this._uiChangeDrag );
      this.on( 'childUIPointerDown', this._childUIPointerDownDrag );
      this.on( 'deactivate', this.unbindDrag );
    };
    
    proto.bindDrag = function() {
      if ( !this.options.draggable || this.isDragBound ) {
        return;
      }
      classie.add( this.element, 'is-draggable' );
      this.handles = [ this.viewport ];
      this.bindHandles();
      this.isDragBound = true;
    };
    
    proto.unbindDrag = function() {
      if ( !this.isDragBound ) {
        return;
      }
      classie.remove( this.element, 'is-draggable' );
      this.unbindHandles();
      delete this.isDragBound;
    };
    
    proto.hasDragStarted = function( moveVector ) {
      return Math.abs( moveVector.x ) > 3;
    };
    
    proto._uiChangeDrag = function() {
      delete this.isFreeScrolling;
    };
    
    proto._childUIPointerDownDrag = function( event ) {
      preventDefaultEvent( event );
      this.pointerDownFocus( event );
    };
    
    // -------------------------- pointer events -------------------------- //
    
    proto.pointerDown = function( event, pointer ) {
      this._dragPointerDown( event, pointer );
    
      // kludge to blur focused inputs in dragger
      var focused = document.activeElement;
      if ( focused && focused.blur && focused != this.element ) {
        focused.blur();
      }
      this.pointerDownFocus( event );
      // stop if it was moving
      this.velocity = 0;
      classie.add( this.viewport, 'is-pointer-down' );
      // bind move and end events
      this._bindPostStartEvents( event );
      this.dispatchEvent( 'pointerDown', event, [ pointer ] );
    };
    
    var touchStartEvents = {
      touchstart: true,
      MSPointerDown: true
    };
    
    var focusNodes = {
      INPUT: true,
      SELECT: true
    };
    
    proto.pointerDownFocus = function( event ) {
      // focus element, if not touch, and its not an input or select
      if ( this.options.accessibility && !touchStartEvents[ event.type ] &&
          !focusNodes[ event.target.nodeName ] ) {
        this.element.focus();
      }
    };
    
    proto.pointerMove = function( event, pointer ) {
      var moveVector = this._dragPointerMove( event, pointer );
      this.touchVerticalScrollMove( event, pointer, moveVector );
      this._dragMove( event, pointer, moveVector );
      this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
    };
    
    proto.pointerUp = function( event, pointer ) {
      delete this.isTouchScrolling;
      classie.remove( this.viewport, 'is-pointer-down' );
      this.dispatchEvent( 'pointerUp', event, [ pointer ] );
      this._dragPointerUp( event, pointer );
    };
    
    // -------------------------- vertical scroll -------------------------- //
    
    var touchScrollEvents = {
      // move events
      // mousemove: true,
      touchmove: true,
      MSPointerMove: true
    };
    
    // position of pointer, relative to window
    function getPointerWindowY( pointer ) {
      var pointerPoint = Unidragger.getPointerPoint( pointer );
      return pointerPoint.y - window.pageYOffset;
    }
    
    proto.touchVerticalScrollMove = function( event, pointer, moveVector ) {
      if ( !this.options.touchVerticalScroll || !touchScrollEvents[ event.type ] ) {
        return;
      }
      // don't start vertical scrolling until pointer has moved 16 pixels in a direction
      if ( !this.isTouchScrolling && Math.abs( moveVector.y ) > 16 ) {
        // start touch vertical scrolling
        // scroll & pointerY when started
        this.startScrollY = window.pageYOffset;
        this.pointerWindowStartY = getPointerWindowY( pointer );
        // start scroll animation
        this.isTouchScrolling = true;
      }
      if ( !this.isTouchScrolling ) {
        return;
      }
      // scroll window
      var scrollDelta = this.pointerWindowStartY - getPointerWindowY( pointer );
      var scrollY = this.startScrollY + scrollDelta;
      window.scroll( window.pageXOffset, scrollY );
    };
    
    // -------------------------- dragging -------------------------- //
    
    proto.dragStart = function( event, pointer ) {
      this.dragStartPosition = this.x;
      this.startAnimation();
      this.dispatchEvent( 'dragStart', event, [ pointer ] );
    };
    
    proto.dragMove = function( event, pointer, moveVector ) {
      this.previousDragX = this.x;
    
      var movedX = moveVector.x;
      // reverse if right-to-left
      var direction = this.options.rightToLeft ? -1 : 1;
      this.x = this.dragStartPosition + movedX * direction;
    
      if ( !this.options.wrapAround && this.cells.length ) {
        // slow drag
        var originBound = Math.max( -this.cells[0].target, this.dragStartPosition);
        this.x = this.x > originBound ? ( this.x - originBound ) * 0.5 + originBound : this.x;
        var endBound = Math.min( -this.getLastCell().target, this.dragStartPosition );
        this.x = this.x < endBound ? ( this.x - endBound ) * 0.5 + endBound : this.x;
      }
    
      this.previousDragMoveTime = this.dragMoveTime;
      this.dragMoveTime = new Date();
      this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
    };
    
    proto.dragEnd = function( event, pointer ) {
      this.dragEndFlick();
      if ( this.options.freeScroll ) {
        this.isFreeScrolling = true;
      }
      // set selectedIndex based on where flick will end up
      var index = this.dragEndRestingSelect();
    
      if ( this.options.freeScroll && !this.options.wrapAround ) {
        // if free-scroll & not wrap around
        // do not free-scroll if going outside of bounding cells
        // so bounding cells can attract slider, and keep it in bounds
        var restingX = this.getRestingPosition();
        this.isFreeScrolling = -restingX > this.cells[0].target &&
          -restingX < this.getLastCell().target;
      } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
        // boost selection if selected index has not changed
        index += this.dragEndBoostSelect();
      }
      // apply selection
      // TODO refactor this, selecting here feels weird
      this.select( index );
      this.dispatchEvent( 'dragEnd', event, [ pointer ] );
    };
    
    // apply velocity after dragging
    proto.dragEndFlick = function() {
      if ( !isFinite( this.previousDragX ) ) {
        return;
      }
      // set slider velocity
      var timeDelta = this.dragMoveTime - this.previousDragMoveTime;
      // prevent divide by 0, if dragMove & dragEnd happened at same time
      if ( timeDelta ) {
        // 60 frames per second, ideally
        // TODO, velocity should be in pixels per millisecond
        // currently in pixels per frame
        timeDelta /= 1000 / 60;
        var xDelta = this.x - this.previousDragX;
        this.velocity = xDelta / timeDelta;
      }
      // reset
      delete this.previousDragX;
    };
    
    proto.dragEndRestingSelect = function() {
      var restingX = this.getRestingPosition();
      // how far away from selected cell
      var distance = Math.abs( this.getCellDistance( -restingX, this.selectedIndex ) );
      // get closet resting going up and going down
      var positiveResting = this._getClosestResting( restingX, distance, 1 );
      var negativeResting = this._getClosestResting( restingX, distance, -1 );
      // use closer resting for wrap-around
      var index = positiveResting.distance < negativeResting.distance ?
        positiveResting.index : negativeResting.index;
      // for contain, force boost if delta is not greater than 1
      if ( this.options.contain && !this.options.wrapAround ) {
        index = Math.abs( index - this.selectedIndex ) <= 1 ? this.selectedIndex : index;
      }
      return index;
    };
    
    /**
     * given resting X and distance to selected cell
     * get the distance and index of the closest cell
     * @param {Number} restingX - estimated post-flick resting position
     * @param {Number} distance - distance to selected cell
     * @param {Integer} increment - +1 or -1, going up or down
     * @returns {Object} - { distance: {Number}, index: {Integer} }
     */
    proto._getClosestResting = function( restingX, distance, increment ) {
      var index = this.selectedIndex;
      var minDistance = Infinity;
      var condition = this.options.contain && !this.options.wrapAround ?
        // if contain, keep going if distance is equal to minDistance
        function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
      while ( condition( distance, minDistance ) ) {
        // measure distance to next cell
        index += increment;
        minDistance = distance;
        distance = this.getCellDistance( -restingX, index );
        if ( distance === null ) {
          break;
        }
        distance = Math.abs( distance );
      }
      return {
        distance: minDistance,
        // selected was previous index
        index: index - increment
      };
    };
    
    /**
     * measure distance between x and a cell target
     * @param {Number} x
     * @param {Integer} index - cell index
     */
    proto.getCellDistance = function( x, index ) {
      var len = this.cells.length;
      // wrap around if at least 2 cells
      var isWrapAround = this.options.wrapAround && len > 1;
      var cellIndex = isWrapAround ? utils.modulo( index, len ) : index;
      var cell = this.cells[ cellIndex ];
      if ( !cell ) {
        return null;
      }
      // add distance for wrap-around cells
      var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
      return x - ( cell.target + wrap );
    };
    
    proto.dragEndBoostSelect = function() {
      var distance = this.getCellDistance( -this.x, this.selectedIndex );
      if ( distance > 0 && this.velocity < -1 ) {
        // if moving towards the right, and positive velocity, and the next attractor
        return 1;
      } else if ( distance < 0 && this.velocity > 1 ) {
        // if moving towards the left, and negative velocity, and previous attractor
        return -1;
      }
      return 0;
    };
    
    // ----- staticClick ----- //
    
    proto.staticClick = function( event, pointer ) {
      // get clickedCell, if cell was clicked
      var clickedCell = this.getParentCell( event.target );
      var cellElem = clickedCell && clickedCell.element;
      var cellIndex = clickedCell && utils.indexOf( this.cells, clickedCell );
      this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
    };
    
    // -----  ----- //
    
    utils.extend( Flickity.prototype, proto );
    
    // -----  ----- //
    
    return Flickity;
    
    }));
    
    /*!
     * Tap listener v1.0.0
     * listens to taps
     * MIT license
     */
    
    /*jshint browser: true, unused: true, undef: true, strict: true */
    
    ( function( window, factory ) {
      /*global define: false, module: false, require: false */
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'tap-listener/tap-listener',[
          'unipointer/unipointer'
        ], function( Unipointer ) {
          return factory( window, Unipointer );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('unipointer')
        );
      } else {
        // browser global
        window.TapListener = factory(
          window,
          window.Unipointer
        );
      }
    
    }( window, function factory( window, Unipointer ) {
    
    
    
    // --------------------------  TapListener -------------------------- //
    
    function TapListener( elem ) {
      this.bindTap( elem );
    }
    
    // inherit Unipointer & EventEmitter
    TapListener.prototype = new Unipointer();
    
    /**
     * bind tap event to element
     * @param {Element} elem
     */
    TapListener.prototype.bindTap = function( elem ) {
      if ( !elem ) {
        return;
      }
      this.unbindTap();
      this.tapElement = elem;
      this._bindStartEvent( elem, true );
    };
    
    TapListener.prototype.unbindTap = function() {
      if ( !this.tapElement ) {
        return;
      }
      this._bindStartEvent( this.tapElement, true );
      delete this.tapElement;
    };
    
    var isPageOffset = window.pageYOffset !== undefined;
    /**
     * pointer up
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    TapListener.prototype.pointerUp = function( event, pointer ) {
      var pointerPoint = Unipointer.getPointerPoint( pointer );
      var boundingRect = this.tapElement.getBoundingClientRect();
      // standard or IE8 scroll positions
      var scrollX = isPageOffset ? window.pageXOffset : document.body.scrollLeft;
      var scrollY = isPageOffset ? window.pageYOffset : document.body.scrollTop;
      // calculate if pointer is inside tapElement
      var isInside = pointerPoint.x >= boundingRect.left + scrollX &&
        pointerPoint.x <= boundingRect.right + scrollX &&
        pointerPoint.y >= boundingRect.top + scrollY &&
        pointerPoint.y <= boundingRect.bottom + scrollY;
      // trigger callback if pointer is inside element
      if ( isInside ) {
        this.emitEvent( 'tap', [ this, event, pointer ] );
      }
    };
    
    TapListener.prototype.destroy = function() {
      this.pointerDone();
      this.unbindTap();
    };
    
    // -----  ----- //
    
    return TapListener;
    
    }));
    
    // -------------------------- prev/next button -------------------------- //
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/prev-next-button',[
          'eventie/eventie',
          './flickity',
          'tap-listener/tap-listener',
          'fizzy-ui-utils/utils'
        ], function( eventie, Flickity, TapListener, utils ) {
          return factory( window, eventie, Flickity, TapListener, utils );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('eventie'),
          require('./flickity'),
          require('tap-listener'),
          require('fizzy-ui-utils')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity.PrevNextButton = factory(
          window,
          window.eventie,
          window.Flickity,
          window.TapListener,
          window.fizzyUIUtils
        );
      }
    
    }( window, function factory( window, eventie, Flickity, TapListener, utils ) {
    
    
    
    // ----- inline SVG support ----- //
    
    var svgURI = 'http://www.w3.org/2000/svg';
    
    // only check on demand, not on script load
    var supportsInlineSVG = ( function() {
      var supports;
      function checkSupport() {
        if ( supports !== undefined ) {
          return supports;
        }
        var div = document.createElement('div');
        div.innerHTML = '<svg/>';
        supports = ( div.firstChild && div.firstChild.namespaceURI ) == svgURI;
        return supports;
      }
      return checkSupport;
    })();
    
    // -------------------------- PrevNextButton -------------------------- //
    
    function PrevNextButton( direction, parent ) {
      this.direction = direction;
      this.parent = parent;
      this._create();
    }
    
    PrevNextButton.prototype = new TapListener();
    
    PrevNextButton.prototype._create = function() {
      // properties
      this.isEnabled = true;
      this.isPrevious = this.direction == -1;
      var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
      this.isLeft = this.direction == leftDirection;
    
      var element = this.element = document.createElement('button');
      element.className = 'flickity-prev-next-button1';
      element.className += this.isPrevious ? ' previous1' : ' next1';
      element.innerText = 'Т'
      // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
      element.setAttribute( 'type', 'button' );
      Flickity.setUnselectable( element );
      // create arrow
      if ( supportsInlineSVG() ) {
        var svg = this.createSVG();
        element.appendChild( svg );
      } else {
        // SVG not supported, set button text
        this.setArrowText();
        element.className += ' no-svg';
      }
      // update on select
      var _this = this;
      this.onCellSelect = function() {
        _this.update();
      };
      this.parent.on( 'cellSelect', this.onCellSelect );
      // tap
      this.on( 'tap', this.onTap );
      // pointerDown
      this.on( 'pointerDown', function onPointerDown( button, event ) {
        _this.parent.childUIPointerDown( event );
      });
    };
    
    PrevNextButton.prototype.activate = function() {
      this.update();
      this.bindTap( this.element );
      // click events from keyboard
      eventie.bind( this.element, 'click', this );
      // add to DOM
      this.parent.element.appendChild( this.element );
    };
    
    PrevNextButton.prototype.deactivate = function() {
      // remove from DOM
      this.parent.element.removeChild( this.element );
      // do regular TapListener destroy
      TapListener.prototype.destroy.call( this );
      // click events from keyboard
      eventie.unbind( this.element, 'click', this );
    };
    
    PrevNextButton.prototype.createSVG = function() {
      var svg = document.createElementNS( svgURI, 'svg');
      svg.setAttribute( 'viewBox', '0 0 100 100' );
      var path = document.createElementNS( svgURI, 'path');
      path.setAttribute( 'd', 'M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z' );
      path.setAttribute( 'class', 'arrow' );
      // adjust arrow
      var arrowTransform = this.isLeft ? 'translate(15,0)' :
        'translate(85,100) rotate(180)';
      path.setAttribute( 'transform', arrowTransform );
      svg.appendChild( path );
      return svg;
    };
    
    PrevNextButton.prototype.setArrowText = function() {
      var parentOptions = this.parent.options;
      var arrowText = this.isLeft ? parentOptions.leftArrowText : parentOptions.rightArrowText;
      utils.setText( this.element, arrowText );
    };
    
    PrevNextButton.prototype.onTap = function() {
      if ( !this.isEnabled ) {
        return;
      }
      this.parent.uiChange();
      var method = this.isPrevious ? 'previous' : 'next';
      this.parent[ method ]();
    };
    
    PrevNextButton.prototype.handleEvent = utils.handleEvent;
    
    PrevNextButton.prototype.onclick = function() {
      // only allow clicks from keyboard
      var focused = document.activeElement;
      if ( focused && focused == this.element ) {
        this.onTap();
      }
    };
    
    // -----  ----- //
    
    PrevNextButton.prototype.enable = function() {
      if ( this.isEnabled ) {
        return;
      }
      this.element.disabled = false;
      this.isEnabled = true;
    };
    
    PrevNextButton.prototype.disable = function() {
      if ( !this.isEnabled ) {
        return;
      }
      this.element.disabled = true;
      this.isEnabled = false;
    };
    
    PrevNextButton.prototype.update = function() {
      // index of first or last cell, if previous or next
      var cells = this.parent.cells;
      // enable is wrapAround and at least 2 cells
      if ( this.parent.options.wrapAround && cells.length > 1 ) {
        this.enable();
        return;
      }
      var lastIndex = cells.length ? cells.length - 1 : 0;
      var boundIndex = this.isPrevious ? 0 : lastIndex;
      var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
      this[ method ]();
    };
    
    PrevNextButton.prototype.destroy = function() {
      this.deactivate();
    };
    
    // -------------------------- Flickity prototype -------------------------- //
    
    utils.extend( Flickity.defaults, {
      prevNextButtons: true,
      leftArrowText: '‹',
      rightArrowText: '›'
    });
    
    Flickity.createMethods.push('_createPrevNextButtons');
    
    Flickity.prototype._createPrevNextButtons = function() {
      if ( !this.options.prevNextButtons ) {
        return;
      }
    
      this.prevButton = new PrevNextButton( -1, this );
      this.nextButton = new PrevNextButton( 1, this );
    
      this.on( 'activate', this.activatePrevNextButtons );
    };
    
    Flickity.prototype.activatePrevNextButtons = function() {
      this.prevButton.activate();
      this.nextButton.activate();
      this.on( 'deactivate', this.deactivatePrevNextButtons );
    };
    
    Flickity.prototype.deactivatePrevNextButtons = function() {
      this.prevButton.deactivate();
      this.nextButton.deactivate();
      this.off( 'deactivate', this.deactivatePrevNextButtons );
    };
    
    // --------------------------  -------------------------- //
    
    Flickity.PrevNextButton = PrevNextButton;
    
    return PrevNextButton;
    
    }));
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/page-dots',[
          'eventie/eventie',
          './flickity',
          'tap-listener/tap-listener',
          'fizzy-ui-utils/utils'
        ], function( eventie, Flickity, TapListener, utils ) {
          return factory( window, eventie, Flickity, TapListener, utils );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('eventie'),
          require('./flickity'),
          require('tap-listener'),
          require('fizzy-ui-utils')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity.PageDots = factory(
          window,
          window.eventie,
          window.Flickity,
          window.TapListener,
          window.fizzyUIUtils
        );
      }
    
    }( window, function factory( window, eventie, Flickity, TapListener, utils ) {
    
    // -------------------------- PageDots -------------------------- //
    
    
    
    function PageDots( parent ) {
      this.parent = parent;
      this._create();
    }
    
    PageDots.prototype = new TapListener();
    
    PageDots.prototype._create = function() {
      // create holder element
      this.holder = document.createElement('ol');
      this.holder.className = 'flickity-page-dots';
      Flickity.setUnselectable( this.holder );
      // create dots, array of elements
      this.dots = [];
      // update on select
      var _this = this;
      this.onCellSelect = function() {
        _this.updateSelected();
      };
      this.parent.on( 'cellSelect', this.onCellSelect );
      // tap
      this.on( 'tap', this.onTap );
      // pointerDown
      this.on( 'pointerDown', function onPointerDown( button, event ) {
        _this.parent.childUIPointerDown( event );
      });
    };
    
    PageDots.prototype.activate = function() {
      this.setDots();
      this.updateSelected();
      this.bindTap( this.holder );
      // add to DOM
      this.parent.element.appendChild( this.holder );
    };
    
    PageDots.prototype.deactivate = function() {
      // remove from DOM
      this.parent.element.removeChild( this.holder );
      TapListener.prototype.destroy.call( this );
    };
    
    PageDots.prototype.setDots = function() {
      // get difference between number of cells and number of dots
      var delta = this.parent.cells.length - this.dots.length;
      if ( delta > 0 ) {
        this.addDots( delta );
      } else if ( delta < 0 ) {
        this.removeDots( -delta );
      }
    };
    
    PageDots.prototype.addDots = function( count ) {
      var fragment = document.createDocumentFragment();
      var newDots = [];
      while ( count ) {
        var dot = document.createElement('li');
        dot.className = 'dot';
        fragment.appendChild( dot );
        newDots.push( dot );
        count--;
      }
      this.holder.appendChild( fragment );
      this.dots = this.dots.concat( newDots );
    };
    
    PageDots.prototype.removeDots = function( count ) {
      // remove from this.dots collection
      var removeDots = this.dots.splice( this.dots.length - count, count );
      // remove from DOM
      for ( var i=0, len = removeDots.length; i < len; i++ ) {
        var dot = removeDots[i];
        this.holder.removeChild( dot );
      }
    };
    
    PageDots.prototype.updateSelected = function() {
      // remove selected class on previous
      if ( this.selectedDot ) {
        this.selectedDot.className = 'dot';
      }
      // don't proceed if no dots
      if ( !this.dots.length ) {
        return;
      }
      this.selectedDot = this.dots[ this.parent.selectedIndex ];
      this.selectedDot.className = 'dot is-selected';
    };
    
    PageDots.prototype.onTap = function( instance, event ) {
      var target = event.target;
      // only care about dot clicks
      if ( target.nodeName != 'LI' ) {
        return;
      }
    
      this.parent.uiChange();
      var index = utils.indexOf( this.dots, target );
      this.parent.select( index );
    };
    
    PageDots.prototype.destroy = function() {
      this.deactivate();
    };
    
    Flickity.PageDots = PageDots;
    
    // -------------------------- Flickity -------------------------- //
    
    utils.extend( Flickity.defaults, {
      pageDots: true
    });
    
    Flickity.createMethods.push('_createPageDots');
    
    Flickity.prototype._createPageDots = function() {
      if ( !this.options.pageDots ) {
        return;
      }
      this.pageDots = new PageDots( this );
      this.on( 'activate', this.activatePageDots );
      this.on( 'cellAddedRemoved', this.onCellAddedRemovedPageDots );
      this.on( 'deactivate', this.deactivatePageDots );
    };
    
    Flickity.prototype.activatePageDots = function() {
      this.pageDots.activate();
    };
    
    Flickity.prototype.onCellAddedRemovedPageDots = function() {
      this.pageDots.setDots();
    };
    
    Flickity.prototype.deactivatePageDots = function() {
      this.pageDots.deactivate();
    };
    
    // -----  ----- //
    
    Flickity.PageDots = PageDots;
    
    return PageDots;
    
    }));
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/player',[
          'eventEmitter/EventEmitter',
          'eventie/eventie',
          './flickity'
        ], function( EventEmitter, eventie, Flickity ) {
          return factory( EventEmitter, eventie, Flickity );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          require('wolfy87-eventemitter'),
          require('eventie'),
          require('./flickity')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity.Player = factory(
          window.EventEmitter,
          window.eventie,
          window.Flickity
        );
      }
    
    }( window, function factory( EventEmitter, eventie, Flickity ) {
    
    
    
    // -------------------------- Page Visibility -------------------------- //
    // https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
    
    var hiddenProperty, visibilityEvent;
    if ( 'hidden' in document ) {
      hiddenProperty = 'hidden';
      visibilityEvent = 'visibilitychange';
    } else if ( 'webkitHidden' in document ) {
      hiddenProperty = 'webkitHidden';
      visibilityEvent = 'webkitvisibilitychange';
    }
    
    // -------------------------- Player -------------------------- //
    
    function Player( parent ) {
      this.isPlaying = false;
      this.parent = parent;
      // visibility change event handler
      if ( visibilityEvent ) {
        var _this = this;
        this.onVisibilityChange = function() {
          _this.visibilityChange();
        };
      }
    }
    
    Player.prototype = new EventEmitter();
    
    // start play
    Player.prototype.play = function() {
      this.isPlaying = true;
      // playing kills pauses
      delete this.isPaused;
      // listen to visibility change
      if ( visibilityEvent ) {
        document.addEventListener( visibilityEvent, this.onVisibilityChange, false );
      }
      // start ticking
      this.tick();
    };
    
    Player.prototype.tick = function() {
      // do not tick if paused or not playing
      if ( !this.isPlaying || this.isPaused ) {
        return;
      }
      // keep track of when .tick()
      this.tickTime = new Date();
      var time = this.parent.options.autoPlay;
      // default to 3 seconds
      time = typeof time == 'number' ? time : 3000;
      var _this = this;
      this.timeout = setTimeout( function() {
        _this.parent.next( true );
        _this.tick();
      }, time );
    };
    
    Player.prototype.stop = function() {
      this.isPlaying = false;
      // stopping kills pauses
      delete this.isPaused;
      this.clear();
      // remove visibility change event
      if ( visibilityEvent ) {
        document.removeEventListener( visibilityEvent, this.onVisibilityChange, false );
      }
    };
    
    Player.prototype.clear = function() {
      clearTimeout( this.timeout );
    };
    
    Player.prototype.pause = function() {
      if ( this.isPlaying ) {
        this.isPaused = true;
        this.clear();
      }
    };
    
    Player.prototype.unpause = function() {
      // re-start play if in unpaused state
      if ( this.isPaused ) {
        this.play();
      }
    };
    
    // pause if page visibility is hidden, unpause if visible
    Player.prototype.visibilityChange = function() {
      var isHidden = document[ hiddenProperty ];
      this[ isHidden ? 'pause' : 'unpause' ]();
    };
    
    // -------------------------- Flickity -------------------------- //
    
    // utils.extend( Flickity.defaults, {
    //   autoPlay: false
    // });
    
    Flickity.createMethods.push('_createPlayer');
    
    Flickity.prototype._createPlayer = function() {
      this.player = new Player( this );
    
      this.on( 'activate', this.activatePlayer );
      this.on( 'uiChange', this.stopPlayer );
      this.on( 'pointerDown', this.stopPlayer );
      this.on( 'deactivate', this.deactivatePlayer );
    };
    
    Flickity.prototype.activatePlayer = function() {
      if ( !this.options.autoPlay ) {
        return;
      }
      this.player.play();
      eventie.bind( this.element, 'mouseenter', this );
      this.isMouseenterBound = true;
    };
    
    Flickity.prototype.stopPlayer = function() {
      this.player.stop();
    };
    
    Flickity.prototype.deactivatePlayer = function() {
      this.player.stop();
      if ( this.isMouseenterBound ) {
        eventie.unbind( this.element, 'mouseenter', this );
        delete this.isMouseenterBound;
      }
    };
    
    // ----- mouseenter/leave ----- //
    
    // pause auto-play on hover
    Flickity.prototype.onmouseenter = function() {
      this.player.pause();
      eventie.bind( this.element, 'mouseleave', this );
    };
    
    // resume auto-play on hover off
    Flickity.prototype.onmouseleave = function() {
      this.player.unpause();
      eventie.unbind( this.element, 'mouseleave', this );
    };
    
    // -----  ----- //
    
    Flickity.Player = Player;
    
    return Player;
    
    }));
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/add-remove-cell',[
          './flickity',
          'fizzy-ui-utils/utils'
        ], function( Flickity, utils ) {
          return factory( window, Flickity, utils );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('./flickity'),
          require('fizzy-ui-utils')
        );
      } else {
        // browser global
        window.Flickity = window.Flickity || {};
        window.Flickity = factory(
          window,
          window.Flickity,
          window.fizzyUIUtils
        );
      }
    
    }( window, function factory( window, Flickity, utils ) {
    
    
    
    // append cells to a document fragment
    function getCellsFragment( cells ) {
      var fragment = document.createDocumentFragment();
      for ( var i=0, len = cells.length; i < len; i++ ) {
        var cell = cells[i];
        fragment.appendChild( cell.element );
      }
      return fragment;
    }
    
    // -------------------------- add/remove cell prototype -------------------------- //
    
    /**
     * Insert, prepend, or append cells
     * @param {Element, Array, NodeList} elems
     * @param {Integer} index
     */
    Flickity.prototype.insert = function( elems, index ) {
      var cells = this._makeCells( elems );
      if ( !cells || !cells.length ) {
        return;
      }
      var len = this.cells.length;
      // default to append
      index = index === undefined ? len : index;
      // add cells with document fragment
      var fragment = getCellsFragment( cells );
      // append to slider
      var isAppend = index == len;
      if ( isAppend ) {
        this.slider.appendChild( fragment );
      } else {
        var insertCellElement = this.cells[ index ].element;
        this.slider.insertBefore( fragment, insertCellElement );
      }
      // add to this.cells
      if ( index === 0 ) {
        // prepend, add to start
        this.cells = cells.concat( this.cells );
      } else if ( isAppend ) {
        // append, add to end
        this.cells = this.cells.concat( cells );
      } else {
        // insert in this.cells
        var endCells = this.cells.splice( index, len - index );
        this.cells = this.cells.concat( cells ).concat( endCells );
      }
    
      this._sizeCells( cells );
    
      var selectedIndexDelta = index > this.selectedIndex ? 0 : cells.length;
      this._cellAddedRemoved( index, selectedIndexDelta );
    };
    
    Flickity.prototype.append = function( elems ) {
      this.insert( elems, this.cells.length );
    };
    
    Flickity.prototype.prepend = function( elems ) {
      this.insert( elems, 0 );
    };
    
    /**
     * Remove cells
     * @param {Element, Array, NodeList} elems
     */
    Flickity.prototype.remove = function( elems ) {
      var cells = this.getCells( elems );
      var selectedIndexDelta = 0;
      var i, len, cell;
      // calculate selectedIndexDelta, easier if done in seperate loop
      for ( i=0, len = cells.length; i < len; i++ ) {
        cell = cells[i];
        var wasBefore = utils.indexOf( this.cells, cell ) < this.selectedIndex;
        selectedIndexDelta -= wasBefore ? 1 : 0;
      }
    
      for ( i=0, len = cells.length; i < len; i++ ) {
        cell = cells[i];
        cell.remove();
        // remove item from collection
        utils.removeFrom( this.cells, cell );
      }
    
      if ( cells.length ) {
        // update stuff
        this._cellAddedRemoved( 0, selectedIndexDelta );
      }
    };
    
    // updates when cells are added or removed
    Flickity.prototype._cellAddedRemoved = function( changedCellIndex, selectedIndexDelta ) {
      selectedIndexDelta = selectedIndexDelta || 0;
      this.selectedIndex += selectedIndexDelta;
      this.selectedIndex = Math.max( 0, Math.min( this.cells.length - 1, this.selectedIndex ) );
    
      this.emitEvent( 'cellAddedRemoved', [ changedCellIndex, selectedIndexDelta ] );
      this.cellChange( changedCellIndex );
    };
    
    /**
     * logic to be run after a cell's size changes
     * @param {Element} elem - cell's element
     */
    Flickity.prototype.cellSizeChange = function( elem ) {
      var cell = this.getCell( elem );
      if ( !cell ) {
        return;
      }
      cell.getSize();
    
      var index = utils.indexOf( this.cells, cell );
      this.cellChange( index );
    };
    
    /**
     * logic any time a cell is changed: added, removed, or size changed
     * @param {Integer} changedCellIndex - index of the changed cell, optional
     */
    Flickity.prototype.cellChange = function( changedCellIndex ) {
      // TODO maybe always size all cells unless isSkippingSizing
      // size all cells if necessary
      // if ( !isSkippingSizing ) {
      //   this._sizeCells( this.cells );
      // }
    
      changedCellIndex = changedCellIndex || 0;
    
      this._positionCells( changedCellIndex );
      this._getWrapShiftCells();
      this.setGallerySize();
      // position slider
      if ( this.options.freeScroll ) {
        this.positionSlider();
      } else {
        this.positionSliderAtSelected();
        this.select( this.selectedIndex );
      }
    };
    
    // -----  ----- //
    
    return Flickity;
    
    }));
    
    /**
     * Flickity index
     * used for AMD and CommonJS exports
     */
    
    ( function( window, factory ) {
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity/js/index',[
          './flickity',
          './drag',
          './prev-next-button',
          './page-dots',
          './player',
          './add-remove-cell'
        ], factory );
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          require('./flickity'),
          require('./drag'),
          require('./prev-next-button'),
          require('./page-dots'),
          require('./player'),
          require('./add-remove-cell')
        );
      }
    
    })( window, function factory( Flickity ) {
      /*jshint strict: false*/
      return Flickity;
    });
    
    /*!
     * Flickity asNavFor v1.0.0
     * enable asNavFor for Flickity
     */
    
    /*jshint browser: true, undef: true, unused: true, strict: true*/
    
    ( function( window, factory ) {
      /*global define: false, module: false, require: false */
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( 'flickity-as-nav-for/as-nav-for',[
          'classie/classie',
          'flickity/js/index',
          'fizzy-ui-utils/utils'
        ], function( classie, Flickity, utils ) {
          return factory( window, classie, Flickity, utils );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('dessandro-classie'),
          require('flickity'),
          require('fizzy-ui-utils')
        );
      } else {
        // browser global
        window.Flickity = factory(
          window,
          window.classie,
          window.Flickity,
          window.fizzyUIUtils
        );
      }
    
    }( window, function factory( window, classie, Flickity, utils ) {
    
    
    
    // -------------------------- asNavFor prototype -------------------------- //
    
    // Flickity.defaults.asNavFor = null;
    
    Flickity.createMethods.push('_createAsNavFor');
    
    Flickity.prototype._createAsNavFor = function() {
      this.on( 'activate', this.activateAsNavFor );
      this.on( 'deactivate', this.deactivateAsNavFor );
      this.on( 'destroy', this.destroyAsNavFor );
    
      var asNavForOption = this.options.asNavFor;
      if ( !asNavForOption ) {
        return;
      }
      // HACK do async, give time for other flickity to be initalized
      var _this = this;
      setTimeout( function initNavCompanion() {
        _this.setNavCompanion( asNavForOption );
      });
    };
    
    Flickity.prototype.setNavCompanion = function( elem ) {
      elem = utils.getQueryElement( elem );
      var companion = Flickity.data( elem );
      // stop if no companion or companion is self
      if ( !companion || companion == this ) {
        return;
      }
    
      this.navCompanion = companion;
      // companion select
      var _this = this;
      this.onNavCompanionSelect = function() {
        _this.navCompanionSelect();
      };
      companion.on( 'cellSelect', this.onNavCompanionSelect );
      // click
      this.on( 'staticClick', this.onNavStaticClick );
    
      this.navCompanionSelect();
    };
    
    Flickity.prototype.navCompanionSelect = function() {
      if ( !this.navCompanion ) {
        return;
      }
      var index = this.navCompanion.selectedIndex;
      this.select( index );
      // set nav selected class
      this.removeNavSelectedElement();
      // stop if companion has more cells than this one
      if ( this.selectedIndex != index ) {
        return;
      }
      this.navSelectedElement = this.cells[ index ].element;
      classie.add( this.navSelectedElement, 'is-nav-selected' );
    };
    
    Flickity.prototype.activateAsNavFor = function() {
      this.navCompanionSelect();
    };
    
    Flickity.prototype.removeNavSelectedElement = function() {
      if ( !this.navSelectedElement ) {
        return;
      }
      classie.remove( this.navSelectedElement, 'is-nav-selected' );
      delete this.navSelectedElement;
    };
    
    Flickity.prototype.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
      if ( typeof cellIndex == 'number' ) {
        this.navCompanion.select( cellIndex );
      }
    };
    
    Flickity.prototype.deactivateAsNavFor = function() {
      this.removeNavSelectedElement();
    };
    
    Flickity.prototype.destroyAsNavFor = function() {
      if ( !this.navCompanion ) {
        return;
      }
      this.navCompanion.off( 'cellSelect', this.onNavCompanionSelect );
      this.off( 'staticClick', this.onNavStaticClick );
      delete this.navCompanion;
    };
    
    // -----  ----- //
    
    return Flickity;
    
    }));
    
    /*!
     * imagesLoaded v3.1.8
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    
    ( function( window, factory ) { 
      // universal module definition
    
      /*global define: false, module: false, require: false */
    
      if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( 'imagesloaded/imagesloaded',[
          'eventEmitter/EventEmitter',
          'eventie/eventie'
        ], function( EventEmitter, eventie ) {
          return factory( window, EventEmitter, eventie );
        });
      } else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('wolfy87-eventemitter'),
          require('eventie')
        );
      } else {
        // browser global
        window.imagesLoaded = factory(
          window,
          window.EventEmitter,
          window.eventie
        );
      }
    
    })( window,
    
    // --------------------------  factory -------------------------- //
    
    function factory( window, EventEmitter, eventie ) {
    
    
    
    var $ = window.jQuery;
    var console = window.console;
    var hasConsole = typeof console !== 'undefined';
    
    // -------------------------- helpers -------------------------- //
    
    // extend objects
    function extend( a, b ) {
      for ( var prop in b ) {
        a[ prop ] = b[ prop ];
      }
      return a;
    }
    
    var objToString = Object.prototype.toString;
    function isArray( obj ) {
      return objToString.call( obj ) === '[object Array]';
    }
    
    // turn element or nodeList into an array
    function makeArray( obj ) {
      var ary = [];
      if ( isArray( obj ) ) {
        // use object if already an array
        ary = obj;
      } else if ( typeof obj.length === 'number' ) {
        // convert nodeList to array
        for ( var i=0, len = obj.length; i < len; i++ ) {
          ary.push( obj[i] );
        }
      } else {
        // array of single index
        ary.push( obj );
      }
      return ary;
    }
    
      // -------------------------- imagesLoaded -------------------------- //
    
      /**
       * @param {Array, Element, NodeList, String} elem
       * @param {Object or Function} options - if function, use as callback
       * @param {Function} onAlways - callback function
       */
      function ImagesLoaded( elem, options, onAlways ) {
        // coerce ImagesLoaded() without new, to be new ImagesLoaded()
        if ( !( this instanceof ImagesLoaded ) ) {
          return new ImagesLoaded( elem, options );
        }
        // use elem as selector string
        if ( typeof elem === 'string' ) {
          elem = document.querySelectorAll( elem );
        }
    
        this.elements = makeArray( elem );
        this.options = extend( {}, this.options );
    
        if ( typeof options === 'function' ) {
          onAlways = options;
        } else {
          extend( this.options, options );
        }
    
        if ( onAlways ) {
          this.on( 'always', onAlways );
        }
    
        this.getImages();
    
        if ( $ ) {
          // add jQuery Deferred object
          this.jqDeferred = new $.Deferred();
        }
    
        // HACK check async to allow time to bind listeners
        var _this = this;
        setTimeout( function() {
          _this.check();
        });
      }
    
      ImagesLoaded.prototype = new EventEmitter();
    
      ImagesLoaded.prototype.options = {};
    
      ImagesLoaded.prototype.getImages = function() {
        this.images = [];
    
        // filter & find items if we have an item selector
        for ( var i=0, len = this.elements.length; i < len; i++ ) {
          var elem = this.elements[i];
          // filter siblings
          if ( elem.nodeName === 'IMG' ) {
            this.addImage( elem );
          }
          // find children
          // no non-element nodes, #143
          var nodeType = elem.nodeType;
          if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
            continue;
          }
          var childElems = elem.querySelectorAll('img');
          // concat childElems to filterFound array
          for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
            var img = childElems[j];
            this.addImage( img );
          }
        }
      };
    
      /**
       * @param {Image} img
       */
      ImagesLoaded.prototype.addImage = function( img ) {
        var loadingImage = new LoadingImage( img );
        this.images.push( loadingImage );
      };
    
      ImagesLoaded.prototype.check = function() {
        var _this = this;
        var checkedCount = 0;
        var length = this.images.length;
        this.hasAnyBroken = false;
        // complete if no images
        if ( !length ) {
          this.complete();
          return;
        }
    
        function onConfirm( image, message ) {
          if ( _this.options.debug && hasConsole ) {
            console.log( 'confirm', image, message );
          }
    
          _this.progress( image );
          checkedCount++;
          if ( checkedCount === length ) {
            _this.complete();
          }
          return true; // bind once
        }
    
        for ( var i=0; i < length; i++ ) {
          var loadingImage = this.images[i];
          loadingImage.on( 'confirm', onConfirm );
          loadingImage.check();
        }
      };
    
      ImagesLoaded.prototype.progress = function( image ) {
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        // HACK - Chrome triggers event before object properties have changed. #83
        var _this = this;
        setTimeout( function() {
          _this.emit( 'progress', _this, image );
          if ( _this.jqDeferred && _this.jqDeferred.notify ) {
            _this.jqDeferred.notify( _this, image );
          }
        });
      };
    
      ImagesLoaded.prototype.complete = function() {
        var eventName = this.hasAnyBroken ? 'fail' : 'done';
        this.isComplete = true;
        var _this = this;
        // HACK - another setTimeout so that confirm happens after progress
        setTimeout( function() {
          _this.emit( eventName, _this );
          _this.emit( 'always', _this );
          if ( _this.jqDeferred ) {
            var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
            _this.jqDeferred[ jqMethod ]( _this );
          }
        });
      };
    
      // -------------------------- jquery -------------------------- //
    
      if ( $ ) {
        $.fn.imagesLoaded = function( options, callback ) {
          var instance = new ImagesLoaded( this, options, callback );
          return instance.jqDeferred.promise( $(this) );
        };
      }
    
    
      // --------------------------  -------------------------- //
    
      function LoadingImage( img ) {
        this.img = img;
      }
    
      LoadingImage.prototype = new EventEmitter();
    
      LoadingImage.prototype.check = function() {
        // first check cached any previous images that have same src
        var resource = cache[ this.img.src ] || new Resource( this.img.src );
        if ( resource.isConfirmed ) {
          this.confirm( resource.isLoaded, 'cached was confirmed' );
          return;
        }
    
        // If complete is true and browser supports natural sizes,
        // try to check for image status manually.
        if ( this.img.complete && this.img.naturalWidth !== undefined ) {
          // report based on naturalWidth
          this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
          return;
        }
    
        // If none of the checks above matched, simulate loading on detached element.
        var _this = this;
        resource.on( 'confirm', function( resrc, message ) {
          _this.confirm( resrc.isLoaded, message );
          return true;
        });
    
        resource.check();
      };
    
      LoadingImage.prototype.confirm = function( isLoaded, message ) {
        this.isLoaded = isLoaded;
        this.emit( 'confirm', this, message );
      };
    
      // -------------------------- Resource -------------------------- //
    
      // Resource checks each src, only once
      // separate class from LoadingImage to prevent memory leaks. See #115
    
      var cache = {};
    
      function Resource( src ) {
        this.src = src;
        // add to cache
        cache[ src ] = this;
      }
    
      Resource.prototype = new EventEmitter();
    
      Resource.prototype.check = function() {
        // only trigger checking once
        if ( this.isChecked ) {
          return;
        }
        // simulate loading on detached element
        var proxyImage = new Image();
        eventie.bind( proxyImage, 'load', this );
        eventie.bind( proxyImage, 'error', this );
        proxyImage.src = this.src;
        // set flag
        this.isChecked = true;
      };
    
      // ----- events ----- //
    
      // trigger specified handler for event type
      Resource.prototype.handleEvent = function( event ) {
        var method = 'on' + event.type;
        if ( this[ method ] ) {
          this[ method ]( event );
        }
      };
    
      Resource.prototype.onload = function( event ) {
        this.confirm( true, 'onload' );
        this.unbindProxyEvents( event );
      };
    
      Resource.prototype.onerror = function( event ) {
        this.confirm( false, 'onerror' );
        this.unbindProxyEvents( event );
      };
    
      // ----- confirm ----- //
    
      Resource.prototype.confirm = function( isLoaded, message ) {
        this.isConfirmed = true;
        this.isLoaded = isLoaded;
        this.emit( 'confirm', this, message );
      };
    
      Resource.prototype.unbindProxyEvents = function( event ) {
        eventie.unbind( event.target, 'load', this );
        eventie.unbind( event.target, 'error', this );
      };
    
      // -----  ----- //
    
      return ImagesLoaded;
    
    });
    
    /*!
     * Flickity imagesLoaded v1.0.0
     * enables imagesLoaded option for Flickity
     */
    
    /*jshint browser: true, strict: true, undef: true, unused: true */
    
    ( function( window, factory ) {
      /*global define: false, module: false, require: false */
      
      // universal module definition
    
      if ( typeof define == 'function' && define.amd ) {
        // AMD
        define( [
          'flickity/js/index',
          'imagesloaded/imagesloaded'
        ], function( Flickity, imagesLoaded ) {
          return factory( window, Flickity, imagesLoaded );
        });
      } else if ( typeof exports == 'object' ) {
        // CommonJS
        module.exports = factory(
          window,
          require('flickity'),
          require('imagesloaded')
        );
      } else {
        // browser global
        window.Flickity = factory(
          window,
          window.Flickity,
          window.imagesLoaded
        );
      }
    
    }( window, function factory( window, Flickity, imagesLoaded ) {
    
    
    Flickity.createMethods.push('_createImagesLoaded');
    
    Flickity.prototype._createImagesLoaded = function() {
      this.on( 'activate', this.imagesLoaded );
    };
    
    Flickity.prototype.imagesLoaded = function() {
      if ( !this.options.imagesLoaded ) {
        return;
      }
      var _this = this;
      function onImagesLoadedProgress( instance, image ) {
        var cell = _this.getParentCell( image.img );
        _this.cellSizeChange( cell && cell.element );
      }
      imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
    };
    
    return Flickity;
    
    }));
    ;




