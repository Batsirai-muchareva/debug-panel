import { jsx } from 'react/jsx-runtime';
import K, { memo, useState, useRef, useCallback, useEffect } from 'react';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function (r) {
      _defineProperty$1(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function compose$1() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduceRight(function (y, f) {
      return f(y);
    }, x);
  };
}

function curry$1(fn) {
  return function curried() {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return args.length >= fn.length ? fn.apply(this, args) : function () {
      for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }

      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}

function isObject$7(value) {
  return {}.toString.call(value).includes('Object');
}

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

function isFunction(value) {
  return typeof value === 'function';
}

function hasOwnProperty$1(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function validateChanges(initial, changes) {
  if (!isObject$7(changes)) errorHandler$1('changeType');
  if (Object.keys(changes).some(function (field) {
    return !hasOwnProperty$1(initial, field);
  })) errorHandler$1('changeField');
  return changes;
}

function validateSelector(selector) {
  if (!isFunction(selector)) errorHandler$1('selectorType');
}

function validateHandler(handler) {
  if (!(isFunction(handler) || isObject$7(handler))) errorHandler$1('handlerType');
  if (isObject$7(handler) && Object.values(handler).some(function (_handler) {
    return !isFunction(_handler);
  })) errorHandler$1('handlersType');
}

function validateInitial(initial) {
  if (!initial) errorHandler$1('initialIsRequired');
  if (!isObject$7(initial)) errorHandler$1('initialType');
  if (isEmpty(initial)) errorHandler$1('initialContent');
}

function throwError$1(errorMessages, type) {
  throw new Error(errorMessages[type] || errorMessages["default"]);
}

var errorMessages$1 = {
  initialIsRequired: 'initial state is required',
  initialType: 'initial state should be an object',
  initialContent: 'initial state shouldn\'t be an empty object',
  handlerType: 'handler should be an object or a function',
  handlersType: 'all handlers should be a functions',
  selectorType: 'selector should be a function',
  changeType: 'provided value of changes should be an object',
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  "default": 'an unknown error accured in `state-local` package'
};
var errorHandler$1 = curry$1(throwError$1)(errorMessages$1);
var validators$1 = {
  changes: validateChanges,
  selector: validateSelector,
  handler: validateHandler,
  initial: validateInitial
};

function create(initial) {
  var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  validators$1.initial(initial);
  validators$1.handler(handler);
  var state = {
    current: initial
  };
  var didUpdate = curry$1(didStateUpdate)(state, handler);
  var update = curry$1(updateState)(state);
  var validate = curry$1(validators$1.changes)(initial);
  var getChanges = curry$1(extractChanges)(state);

  function getState() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
      return state;
    };
    validators$1.selector(selector);
    return selector(state.current);
  }

  function setState(causedChanges) {
    compose$1(didUpdate, update, validate, getChanges)(causedChanges);
  }

  return [getState, setState];
}

function extractChanges(state, causedChanges) {
  return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}

function updateState(state, changes) {
  state.current = _objectSpread2(_objectSpread2({}, state.current), changes);
  return changes;
}

function didStateUpdate(state, handler, changes) {
  isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function (field) {
    var _handler$field;

    return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
  });
  return changes;
}

var index = {
  create: create
};

var config$1 = {
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs'
  }
};

function curry(fn) {
  return function curried() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= fn.length ? fn.apply(this, args) : function () {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}

function isObject$6(value) {
  return {}.toString.call(value).includes('Object');
}

/**
 * validates the configuration object and informs about deprecation
 * @param {Object} config - the configuration object 
 * @return {Object} config - the validated configuration object
 */
function validateConfig(config) {
  if (!config) errorHandler('configIsRequired');
  if (!isObject$6(config)) errorHandler('configType');
  if (config.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config.urls.monacoBase
      }
    };
  }
  return config;
}

/**
 * logs deprecation message
 */
function informAboutDeprecation() {
  console.warn(errorMessages.deprecation);
}
function throwError(errorMessages, type) {
  throw new Error(errorMessages[type] || errorMessages["default"]);
}
var errorMessages = {
  configIsRequired: 'the configuration object is required',
  configType: 'the configuration object should be an object',
  "default": 'an unknown error accured in `@monaco-editor/loader` package',
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  config: validateConfig
};

var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (x) {
    return fns.reduceRight(function (y, f) {
      return f(y);
    }, x);
  };
};

function merge(target, source) {
  Object.keys(source).forEach(function (key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2$1(_objectSpread2$1({}, target), source);
}

// The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325

var CANCELATION_MESSAGE = {
  type: 'cancelation',
  msg: 'operation is manually canceled'
};
function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function () {
    return hasCanceled_ = true;
  }, wrappedPromise;
}

var _excluded = ["monaco"];

/** the local state of the module */
var _state$create = index.create({
    config: config$1,
    isInitialized: false,
    resolve: null,
    reject: null,
    monaco: null
  }),
  _state$create2 = _slicedToArray(_state$create, 2),
  getState = _state$create2[0],
  setState = _state$create2[1];

/**
 * set the loader configuration
 * @param {Object} config - the configuration object
 */
function config(globalConfig) {
  var _validators$config = validators.config(globalConfig),
    monaco = _validators$config.monaco,
    config = _objectWithoutProperties(_validators$config, _excluded);
  setState(function (state) {
    return {
      config: merge(state.config, config),
      monaco: monaco
    };
  });
}

/**
 * handles the initialization of the monaco-editor
 * @return {Promise} - returns an instance of monaco (with a cancelable promise)
 */
function init() {
  var state = getState(function (_ref) {
    var monaco = _ref.monaco,
      isInitialized = _ref.isInitialized,
      resolve = _ref.resolve;
    return {
      monaco: monaco,
      isInitialized: isInitialized,
      resolve: resolve
    };
  });
  if (!state.isInitialized) {
    setState({
      isInitialized: true
    });
    if (state.monaco) {
      state.resolve(state.monaco);
      return makeCancelable(wrapperPromise);
    }
    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      state.resolve(window.monaco);
      return makeCancelable(wrapperPromise);
    }
    compose(injectScripts, getMonacoLoaderScript)(configureLoader);
  }
  return makeCancelable(wrapperPromise);
}

/**
 * injects provided scripts into the document.body
 * @param {Object} script - an HTML script element
 * @return {Object} - the injected HTML script element
 */
function injectScripts(script) {
  return document.body.appendChild(script);
}

/**
 * creates an HTML script element with/without provided src
 * @param {string} [src] - the source path of the script
 * @return {Object} - the created HTML script element
 */
function createScript(src) {
  var script = document.createElement('script');
  return src && (script.src = src), script;
}

/**
 * creates an HTML script element with the monaco loader src
 * @return {Object} - the created HTML script element
 */
function getMonacoLoaderScript(configureLoader) {
  var state = getState(function (_ref2) {
    var config = _ref2.config,
      reject = _ref2.reject;
    return {
      config: config,
      reject: reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
  loaderScript.onload = function () {
    return configureLoader();
  };
  loaderScript.onerror = state.reject;
  return loaderScript;
}

/**
 * configures the monaco loader
 */
function configureLoader() {
  var state = getState(function (_ref3) {
    var config = _ref3.config,
      resolve = _ref3.resolve,
      reject = _ref3.reject;
    return {
      config: config,
      resolve: resolve,
      reject: reject
    };
  });
  var require = window.require;
  require.config(state.config);
  require(['vs/editor/editor.main'], function (loaded) {
    var monaco = loaded.m /* for 0.53 & 0.54 */ || loaded /* for other versions */;
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function (error) {
    state.reject(error);
  });
}

/**
 * store monaco instance in local state
 */
function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco: monaco
    });
  }
}

/**
 * internal helper function
 * extracts stored monaco instance
 * @return {Object|null} - the monaco instance
 */
function __getMonacoInstance() {
  return getState(function (_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}
var wrapperPromise = new Promise(function (resolve, reject) {
  return setState({
    resolve: resolve,
    reject: reject
  });
});
var loader = {
  config: config,
  init: init,
  __getMonacoInstance: __getMonacoInstance
};

var le={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},v=le;var ae={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}},Y=ae;function Me({children:e}){return K.createElement("div",{style:Y.container},e)}var Z=Me;var $$1=Z;function Ee({width:e,height:r,isEditorReady:n,loading:t,_ref:a,className:m,wrapperProps:E}){return K.createElement("section",{style:{...v.wrapper,width:e,height:r},...E},!n&&K.createElement($$1,null,t),K.createElement("div",{ref:a,style:{...v.fullWidth,...!n&&v.hide},className:m}))}var ee=Ee;var H=memo(ee);function Ce(e){useEffect(e,[]);}var k=Ce;function he(e,r,n=true){let t=useRef(true);useEffect(t.current||!n?()=>{t.current=false;}:e,r);}var l=he;function D(){}function h(e,r,n,t){return De(e,t)||be(e,r,n,t)}function De(e,r){return e.editor.getModel(te(e,r))}function be(e,r,n,t){return e.editor.createModel(r,n,t?te(e,t):void 0)}function te(e,r){return e.Uri.parse(r)}function Oe({original:e,modified:r,language:n,originalLanguage:t,modifiedLanguage:a,originalModelPath:m,modifiedModelPath:E,keepCurrentOriginalModel:g=false,keepCurrentModifiedModel:N=false,theme:x="light",loading:P="Loading...",options:y={},height:V="100%",width:z="100%",className:F,wrapperProps:j={},beforeMount:A=D,onMount:q=D}){let[M,O]=useState(false),[T,s]=useState(true),u=useRef(null),c=useRef(null),w=useRef(null),d=useRef(q),o=useRef(A),b=useRef(false);k(()=>{let i=loader.init();return i.then(f=>(c.current=f)&&s(false)).catch(f=>f?.type!=="cancelation"&&console.error("Monaco initialization: error:",f)),()=>u.current?I():i.cancel()}),l(()=>{if(u.current&&c.current){let i=u.current.getOriginalEditor(),f=h(c.current,e||"",t||n||"text",m||"");f!==i.getModel()&&i.setModel(f);}},[m],M),l(()=>{if(u.current&&c.current){let i=u.current.getModifiedEditor(),f=h(c.current,r||"",a||n||"text",E||"");f!==i.getModel()&&i.setModel(f);}},[E],M),l(()=>{let i=u.current.getModifiedEditor();i.getOption(c.current.editor.EditorOption.readOnly)?i.setValue(r||""):r!==i.getValue()&&(i.executeEdits("",[{range:i.getModel().getFullModelRange(),text:r||"",forceMoveMarkers:true}]),i.pushUndoStop());},[r],M),l(()=>{u.current?.getModel()?.original.setValue(e||"");},[e],M),l(()=>{let{original:i,modified:f}=u.current.getModel();c.current.editor.setModelLanguage(i,t||n||"text"),c.current.editor.setModelLanguage(f,a||n||"text");},[n,t,a],M),l(()=>{c.current?.editor.setTheme(x);},[x],M),l(()=>{u.current?.updateOptions(y);},[y],M);let L=useCallback(()=>{if(!c.current)return;o.current(c.current);let i=h(c.current,e||"",t||n||"text",m||""),f=h(c.current,r||"",a||n||"text",E||"");u.current?.setModel({original:i,modified:f});},[n,r,a,e,t,m,E]),U=useCallback(()=>{!b.current&&w.current&&(u.current=c.current.editor.createDiffEditor(w.current,{automaticLayout:true,...y}),L(),c.current?.editor.setTheme(x),O(true),b.current=true);},[y,x,L]);useEffect(()=>{M&&d.current(u.current,c.current);},[M]),useEffect(()=>{!T&&!M&&U();},[T,M,U]);function I(){let i=u.current?.getModel();g||i?.original?.dispose(),N||i?.modified?.dispose(),u.current?.dispose();}return K.createElement(H,{width:z,height:V,isEditorReady:M,loading:P,_ref:w,className:F,wrapperProps:j})}var ie=Oe;memo(ie);function He(e){let r=useRef();return useEffect(()=>{r.current=e;},[e]),r.current}var se=He;var _=new Map;function Ve({defaultValue:e,defaultLanguage:r,defaultPath:n,value:t,language:a,path:m,theme:E="light",line:g,loading:N="Loading...",options:x={},overrideServices:P={},saveViewState:y=true,keepCurrentModel:V=false,width:z="100%",height:F="100%",className:j,wrapperProps:A={},beforeMount:q=D,onMount:M=D,onChange:O,onValidate:T=D}){let[s,u]=useState(false),[c,w]=useState(true),d=useRef(null),o=useRef(null),b=useRef(null),L=useRef(M),U=useRef(q),I=useRef(),i=useRef(t),f=se(m),Q=useRef(false),B=useRef(false);k(()=>{let p=loader.init();return p.then(R=>(d.current=R)&&w(false)).catch(R=>R?.type!=="cancelation"&&console.error("Monaco initialization: error:",R)),()=>o.current?pe():p.cancel()}),l(()=>{let p=h(d.current,e||t||"",r||a||"",m||n||"");p!==o.current?.getModel()&&(y&&_.set(f,o.current?.saveViewState()),o.current?.setModel(p),y&&o.current?.restoreViewState(_.get(m)));},[m],s),l(()=>{o.current?.updateOptions(x);},[x],s),l(()=>{!o.current||t===void 0||(o.current.getOption(d.current.editor.EditorOption.readOnly)?o.current.setValue(t):t!==o.current.getValue()&&(B.current=true,o.current.executeEdits("",[{range:o.current.getModel().getFullModelRange(),text:t,forceMoveMarkers:true}]),o.current.pushUndoStop(),B.current=false));},[t],s),l(()=>{let p=o.current?.getModel();p&&a&&d.current?.editor.setModelLanguage(p,a);},[a],s),l(()=>{g!==void 0&&o.current?.revealLine(g);},[g],s),l(()=>{d.current?.editor.setTheme(E);},[E],s);let X=useCallback(()=>{if(!(!b.current||!d.current)&&!Q.current){U.current(d.current);let p=m||n,R=h(d.current,t||e||"",r||a||"",p||"");o.current=d.current?.editor.create(b.current,{model:R,automaticLayout:true,...x},P),y&&o.current.restoreViewState(_.get(p)),d.current.editor.setTheme(E),g!==void 0&&o.current.revealLine(g),u(true),Q.current=true;}},[e,r,n,t,a,m,x,P,y,E,g]);useEffect(()=>{s&&L.current(o.current,d.current);},[s]),useEffect(()=>{!c&&!s&&X();},[c,s,X]),i.current=t,useEffect(()=>{s&&O&&(I.current?.dispose(),I.current=o.current?.onDidChangeModelContent(p=>{B.current||O(o.current.getValue(),p);}));},[s,O]),useEffect(()=>{if(s){let p=d.current.editor.onDidChangeMarkers(R=>{let G=o.current.getModel()?.uri;if(G&&R.find(J=>J.path===G.path)){let J=d.current.editor.getModelMarkers({resource:G});T?.(J);}});return ()=>{p?.dispose();}}return ()=>{}},[s,T]);function pe(){I.current?.dispose(),V?y&&_.set(m,o.current.saveViewState()):o.current.getModel()?.dispose(),o.current.dispose();}return K.createElement(H,{width:z,height:F,isEditorReady:s,loading:N,_ref:b,className:j,wrapperProps:A})}var fe=Ve;var de=memo(fe);

const editorOptions = {
  readOnly: true,
  minimap: {
    enabled: false
  },
  folding: true,
  lineNumbers: 'off',
  glyphMargin: false,
  stickyScroll: {
    enabled: false
  }
};
/**
 * export const useEditorHighlight = (editorRef, data) => {
 *   const { isHighlightActive } = useToolbarState();
 *   const { highlightLines, scrollToLine } = useJsonDelta(data, isHighlightActive);
 *   const decorationsRef = useRef([]);
 *
 *   useEffect(() => {
 *     const editor = editorRef.current;
 *     if (!editor || !highlightLines?.length) return;
 *
 *     const start = Math.min(...highlightLines);
 *     const end = Math.max(...highlightLines);
 *
 *     decorationsRef.current = editor.deltaDecorations(
 *       decorationsRef.current,
 *       [{
 *         range: { startLineNumber: start, startColumn: 1, endLineNumber: end, endColumn: 1 },
 *         options: { isWholeLine: true, className: 'highlighted' },
 *       }]
 *     );
 *
 *     if (scrollToLine) {
 *       editor.revealLineInCenter(scrollToLine);
 *     }
 *
 *     const timer = setTimeout(() => {
 *       decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
 *     }, 2000);
 *
 *     return () => clearTimeout(timer);
 *   }, [highlightLines, scrollToLine]);
 * };
 * };
 *
 *
 *
 *
 *
 *
 *
 *
 * import { useEffect, useRef } from "@wordpress/element";
 * import { useToolbarState } from "@libs/toolbar";
 * import { useJsonDelta } from "@libs/json-delta";
 *
 * export const useEditorHighlight = (editorRef, data) => {
 *   const { isHighlightActive } = useToolbarState();
 *   const { highlightLines, scrollToLine } = useJsonDelta(
 *     data,
 *     isHighlightActive
 *   );
 *
 *   const decorationsRef = useRef([]);
 *
 *   useEffect(() => {
 *     const editor = editorRef.current;
 *     if (!editor || !highlightLines?.length) return;
 *
 *     const start = Math.min(...highlightLines);
 *     const end = Math.max(...highlightLines);
 *
 *     decorationsRef.current = editor.deltaDecorations(
 *       decorationsRef.current,
 *       [
 *         {
 *           range: {
 *             startLineNumber: start,
 *             startColumn: 1,
 *             endLineNumber: end,
 *             endColumn: 1,
 *           },
 *           options: {
 *             isWholeLine: true,
 *             className: "highlighted",
 *             linesDecorationsClassName: "monaco-changed-line-gutter",
 *             overviewRuler: { color: "#7ab8a8", position: 1 },
 *           },
 *         },
 *       ]
 *     );
 *
 *     if (scrollToLine) {
 *       editor.revealLineInCenter(scrollToLine);
 *     }
 *
 *     const timer = setTimeout(() => {
 *       decorationsRef.current = editor.deltaDecorations(
 *         decorationsRef.current,
 *         []
 *       );
 *     }, 2000);
 *
 *     return () => clearTimeout(timer);
 *   }, [highlightLines, scrollToLine]);
 * };
 *
 *
 *
 *
 *
 *
 *
 */

const THEME_NAME = 'panel-dark';
function registerTheme(monaco) {
  monaco.editor.defineTheme(THEME_NAME, {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0a1515',
      'editor.foreground': '#abb2bf',
      'editorLineNumber.foreground': '#2a5050',
      'editor.selectionBackground': '#1e3535',
      'editor.lineHighlightBackground': '#0d1e1e',
      'editorCursor.foreground': '#7ab8a8',
      'editorIndentGuide.background': '#1e3535',
      'editorIndentGuide.activeBackground': '#2a4545',
      'scrollbarSlider.background': '#1e353580',
      'scrollbarSlider.hoverBackground': '#2a454580',
      'menu.background': '#0f1e1e',
      'menu.foreground': '#abb2bf',
      'menu.selectionBackground': '#1e3535',
      'menu.selectionForeground': '#eee',
      'menu.separatorBackground': '#1e3535',
      'menu.border': '#1e3535'
    }
  });
  monaco.editor.setTheme(THEME_NAME);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var globalThis_1 =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$a = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$9 = fails$a;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$9(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$8 = fails$a;

var functionBindNative = !fails$8(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = function () { /* empty */ }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$2 = functionBindNative;

var call$6 = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var functionCall = NATIVE_BIND$2 ? call$6.bind(call$6) : function () {
  return call$6.apply(call$6, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$5 = FunctionPrototype$2.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$2.bind.bind(call$5, call$5);

var functionUncurryThis = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$5.apply(fn, arguments);
  };
};

var uncurryThis$b = functionUncurryThis;

var toString$3 = uncurryThis$b({}.toString);
var stringSlice$1 = uncurryThis$b(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$1(toString$3(it), 8, -1);
};

var uncurryThis$a = functionUncurryThis;
var fails$7 = fails$a;
var classof$4 = classofRaw$1;

var $Object$3 = Object;
var split = uncurryThis$a(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$7(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$3('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$4(it) === 'String' ? split(it, '') : $Object$3(it);
} : $Object$3;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$2 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$1 = isNullOrUndefined$2;

var $TypeError$5 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (isNullOrUndefined$1(it)) throw new $TypeError$5("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$1(it));
};

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var isCallable$c = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$b = isCallable$c;

var isObject$5 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$b(it);
};

var globalThis$b = globalThis_1;
var isCallable$a = isCallable$c;

var aFunction = function (argument) {
  return isCallable$a(argument) ? argument : undefined;
};

var getBuiltIn$3 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis$b[namespace]) : globalThis$b[namespace] && globalThis$b[namespace][method];
};

var uncurryThis$9 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$9({}.isPrototypeOf);

var globalThis$a = globalThis_1;

var navigator = globalThis$a.navigator;
var userAgent$1 = navigator && navigator.userAgent;

var environmentUserAgent = userAgent$1 ? String(userAgent$1) : '';

var globalThis$9 = globalThis_1;
var userAgent = environmentUserAgent;

var process = globalThis$9.process;
var Deno = globalThis$9.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var environmentV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = environmentV8Version;
var fails$6 = fails$a;
var globalThis$8 = globalThis_1;

var $String$5 = globalThis$8.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$6(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$2 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$2 &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';

var getBuiltIn$2 = getBuiltIn$3;
var isCallable$9 = isCallable$c;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$2 = Object;

var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$2('Symbol');
  return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
};

var $String$4 = String;

var tryToString$1 = function (argument) {
  try {
    return $String$4(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$8 = isCallable$c;
var tryToString = tryToString$1;

var $TypeError$4 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$1 = function (argument) {
  if (isCallable$8(argument)) return argument;
  throw new $TypeError$4(tryToString(argument) + ' is not a function');
};

var aCallable = aCallable$1;
var isNullOrUndefined = isNullOrUndefined$2;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

var call$4 = functionCall;
var isCallable$7 = isCallable$c;
var isObject$4 = isObject$5;

var $TypeError$3 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$4(val = call$4(fn, input))) return val;
  if (isCallable$7(fn = input.valueOf) && !isObject$4(val = call$4(fn, input))) return val;
  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$4(val = call$4(fn, input))) return val;
  throw new $TypeError$3("Can't convert object to primitive value");
};

var sharedStore = {exports: {}};

var globalThis$7 = globalThis_1;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$1(globalThis$7, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis$7[key] = value;
  } return value;
};

var globalThis$6 = globalThis_1;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = sharedStore.exports = globalThis$6[SHARED] || defineGlobalProperty$2(SHARED, {});

(store$3.versions || (store$3.versions = [])).push({
  version: '3.49.0',
  mode: 'global',
  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
  license: 'https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var sharedStoreExports = sharedStore.exports;

var store$2 = sharedStoreExports;

var shared$3 = function (key, value) {
  return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible = requireObjectCoercible$2;

var $Object$1 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$1 = function (argument) {
  return $Object$1(requireObjectCoercible(argument));
};

var uncurryThis$8 = functionUncurryThis;
var toObject = toObject$1;

var hasOwnProperty = uncurryThis$8({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

var uncurryThis$7 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$2 = uncurryThis$7(1.1.toString);

var uid$3 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$2(++id + postfix, 36);
};

var globalThis$5 = globalThis_1;
var shared$2 = shared$3;
var hasOwn$7 = hasOwnProperty_1;
var uid$2 = uid$3;
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$1 = globalThis$5.Symbol;
var WellKnownSymbolsStore = shared$2('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

var wellKnownSymbol$3 = function (name) {
  if (!hasOwn$7(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL$1 && hasOwn$7(Symbol$1, name)
      ? Symbol$1[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$3 = functionCall;
var isObject$3 = isObject$5;
var isSymbol$2 = isSymbol$3;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$2 = wellKnownSymbol$3;

var $TypeError$2 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$3(input) || isSymbol$2(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$3(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$2(result)) return result;
    throw new $TypeError$2("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$1 = isSymbol$3;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$1(key) ? key : key + '';
};

var globalThis$4 = globalThis_1;
var isObject$2 = isObject$5;

var document$1 = globalThis$4.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$6 = descriptors;
var fails$5 = fails$a;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$6 && !fails$5(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$5 = descriptors;
var call$2 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$6 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$6(O, P)) return createPropertyDescriptor$1(!call$2(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$4 = descriptors;
var fails$4 = fails$a;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$4(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$1 = isObject$5;

var $String$3 = String;
var $TypeError$1 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$2 = function (argument) {
  if (isObject$1(argument)) return argument;
  throw new $TypeError$1($String$3(argument) + ' is not an object');
};

var DESCRIPTORS$3 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$1 = anObject$2;
var toPropertyKey = toPropertyKey$2;

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;

var createNonEnumerableProperty$2 = DESCRIPTORS$2 ? function (object, key, value) {
  return definePropertyModule$2.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$1 = descriptors;
var hasOwn$5 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$5(FunctionPrototype$1, 'name');
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || (DESCRIPTORS$1 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$6 = functionUncurryThis;
var isCallable$6 = isCallable$c;
var store$1 = sharedStoreExports;

var functionToString = uncurryThis$6(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store$1.inspectSource;

var globalThis$3 = globalThis_1;
var isCallable$5 = isCallable$c;

var WeakMap$1 = globalThis$3.WeakMap;

var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$1 = shared$3;
var uid$1 = uid$3;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid$1(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var globalThis$2 = globalThis_1;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
var hasOwn$4 = hasOwnProperty_1;
var shared = sharedStoreExports;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = globalThis$2.TypeError;
var WeakMap = globalThis$2.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$2[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$4(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$1(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$4(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$4(it, STATE);
  };
}

var internalState = {
  get: get,
  enforce: enforce};

var uncurryThis$5 = functionUncurryThis;
var fails$3 = fails$a;
var isCallable$4 = isCallable$c;
var hasOwn$3 = hasOwnProperty_1;
var DESCRIPTORS = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState$1 = InternalStateModule.get;
var $String$2 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis$5(''.slice);
var replace$1 = uncurryThis$5(''.replace);
var join = uncurryThis$5([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails$3(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (stringSlice($String$2(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$1($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$3(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$3(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$3(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$3(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$4(this) && getInternalState$1(this).source || inspectSource(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$2.exports;

var isCallable$3 = isCallable$c;
var definePropertyModule$1 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$1 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$3(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$1.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$1 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var uncurryThis$4 = functionUncurryThis;
var hasOwn$2 = hasOwnProperty_1;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var push$1 = uncurryThis$4([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$2(hiddenKeys$1, key) && hasOwn$2(O, key) && push$1(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$2(O, key = names[i++])) {
    ~indexOf(result, key) || push$1(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$1 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$1;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$1 = getBuiltIn$3;
var uncurryThis$3 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject = anObject$2;

var concat = uncurryThis$3([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$1 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$1(target, key) && !(exceptions && hasOwn$1(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$2 = fails$a;
var isCallable$2 = isCallable$c;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable$2(detection) ? fails$2(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var globalThis$1 = globalThis_1;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$2;
var defineBuiltIn = defineBuiltIn$1;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis$1;
  } else if (STATIC) {
    target = globalThis$1[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis$1[TARGET] && globalThis$1[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var call$1 = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$1.bind(apply$1) : function () {
  return call$1.apply(apply$1, arguments);
});

var classof$3 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$1 = Array.isArray || function isArray(argument) {
  return classof$3(argument) === 'Array';
};

var isObject = isObject$5;
var getInternalState = internalState.get;

var isRawJson = function isRawJSON(O) {
  if (!isObject(O)) return false;
  var state = getInternalState(O);
  return !!state && state.type === 'RawJSON';
};

var wellKnownSymbol$1 = wellKnownSymbol$3;

var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
var test = {};
// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$1 = isCallable$c;
var classofRaw = classofRaw$1;
var wellKnownSymbol = wellKnownSymbol$3;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
};

var classof$1 = classof$2;

var $String$1 = String;

var toString$1 = function (argument) {
  if (classof$1(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String$1(argument);
};

var uncurryThis$2 = functionUncurryThis;

var arraySlice$1 = uncurryThis$2([].slice);

var uncurryThis$1 = functionUncurryThis;
var hasOwn = hasOwnProperty_1;

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode = String.fromCharCode;
var at = uncurryThis$1(''.charAt);
var slice$1 = uncurryThis$1(''.slice);
var exec$1 = uncurryThis$1(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

var parseJsonString = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at(source, i);
    if (chr === '\\') {
      var twoChars = slice$1(source, i, i + 2);
      if (hasOwn(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice$1(source, i, i + 4);
        if (!exec$1(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode($parseInt(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec$1(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};

/* eslint-disable es/no-json -- safe */
var fails$1 = fails$a;

var nativeRawJson = !fails$1(function () {
  var unsafeInt = '9007199254740993';
  // eslint-disable-next-line es/no-json-rawjson -- feature detection
  var raw = JSON.rawJSON(unsafeInt);
  // eslint-disable-next-line es/no-json-israwjson -- feature detection
  return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
});

var $ = _export;
var getBuiltIn = getBuiltIn$3;
var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fails = fails$a;
var isArray = isArray$1;
var isCallable = isCallable$c;
var isRawJSON = isRawJson;
var isSymbol = isSymbol$3;
var classof = classofRaw$1;
var toString = toString$1;
var arraySlice = arraySlice$1;
var parseJSONString = parseJsonString;
var uid = uid$3;
var NATIVE_SYMBOL = symbolConstructorDetection;
var NATIVE_RAW_JSON = nativeRawJson;

var $String = String;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var slice = uncurryThis(''.slice);
var push = uncurryThis([].push);
var numberToString = uncurryThis(1.1.toString);

var surrogates = /[\uD800-\uDFFF]/g;
var leadingSurrogates = /^[\uD800-\uDBFF]$/;
var trailingSurrogates = /^[\uDC00-\uDFFF]$/;

var MARK = uid();
var MARK_LENGTH = MARK.length;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
    if (!isSymbol(value)) return value;
  };
  return apply($stringify, null, args);
} : $stringify;

var fixIllFormedJSON = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if (
    (exec(leadingSurrogates, match) && !exec(trailingSurrogates, next)) ||
    (exec(trailingSurrogates, match) && !exec(leadingSurrogates, prev))
  ) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

var getReplacerFunction = function (replacer) {
  if (isCallable(replacer)) return replacer;
  if (!isArray(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push(keys, element);
    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};

// `JSON.stringify` method
// https://tc39.es/ecma262/#sec-json.stringify
// https://github.com/tc39/proposal-json-parse-with-source
if ($stringify) $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {
  stringify: function stringify(text, replacer, space) {
    var replacerFunction = getReplacerFunction(replacer);
    var rawStrings = [];

    var json = stringifyWithProperSymbolsConversion(text, function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      var v = isCallable(replacerFunction) ? call(replacerFunction, this, $String(key), value) : value;
      return !NATIVE_RAW_JSON && isRawJSON(v) ? MARK + (push(rawStrings, v.rawJSON) - 1) : v;
    }, space);

    if (typeof json != 'string') return json;

    if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);

    if (NATIVE_RAW_JSON) return json;

    var result = '';
    var length = json.length;

    for (var i = 0; i < length; i++) {
      var chr = charAt(json, i);
      if (chr === '"') {
        var end = parseJSONString(json, ++i).end - 1;
        var string = slice(json, i, end);
        result += slice(string, 0, MARK_LENGTH) === MARK
          ? rawStrings[slice(string, MARK_LENGTH)]
          : '"' + string + '"';
        i = end;
      } else result += chr;
    }

    return result;
  }
});

function useEditorValue(editorRef, data) {
  const prevValueRef = useRef('');
  useEffect(() => {
    var _a;
    const editor = editorRef.current;
    if (!editor) {
      return;
    }
    const next = JSON.stringify(data, null, 2);
    if (next === prevValueRef.current) {
      return;
    }
    prevValueRef.current = next;
    (_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.setValue(next);
  }, [data]);
  return prevValueRef;
}

function applyInitialFold(editor) {
  requestAnimationFrame(() => {
    var _a, _b;
    (_a = editor.getAction('editor.foldAll')) === null || _a === void 0 ? void 0 : _a.run();
    (_b = editor.getAction('editor.unfold')) === null || _b === void 0 ? void 0 : _b.run();
  });
}

/**
 * @param editor
 * @param data
 *
 * Data is intentionally captured once — initial value only.
 * subsequent updates are handled imperatively by useEditorValue.
 */
function setupInitialValue(editor, data) {
  var _a;
  const initial = JSON.stringify(data, null, 2);
  (_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.setValue(initial);
}

const MonacoEditor = ({
  data
}) => {
  const editorRef = useRef(null);
  // const { setSearchActive, isHighlightActive } = useToolbarState();
  // const { path, setPath } = usePath();
  // We might want to use ref to avoid stale data of path
  useEditorValue(editorRef, data);
  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    setupInitialValue(editor, data);
    applyInitialFold(editor);
    // setupCommands( editor, monaco, setSearchActive );
    // setupActions( editor, setPath, path );
    registerTheme(monaco);
  };
  return jsx(de, {
    language: "json",
    theme: "panel-dark",
    options: editorOptions,
    onMount: handleMount
  });
};

export { MonacoEditor };
