// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"e11Rl":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "bed887d14d6bcbeb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"gLLPy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _app = require("./App");
var _appDefault = parcelHelpers.interopDefault(_app);
// 라우터(페이지 제어) 기능 가져오기
var _index = require("./routes/index");
var _indexDefault = parcelHelpers.interopDefault(_index);
const root = document.querySelector("#root");
root.append(new (0, _appDefault.default)().el);
// 함수처럼 호출, 즉 createRouter() 가 하나의 함수데이터를 반환
// 페이지 관리 기능의 위치는 app 요소를 통해 만들어진 다음으로 들어와야함.
// index.js 에서 기능을 정의하지만 위치는 설정 X, 따라서 원하는 곳에서 설정하기 위해 main.js 로 가져와서 실행
(0, _indexDefault.default)();

},{"./App":"2kQhy","./routes/index":"3L9mC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2kQhy":[function(require,module,exports) {
// heropy.js 로부터 CoreCoponent 가져오기
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("./core/heropy");
// 헤더 태그 가져오기
var _theHeader = require("./components/TheHeader");
var _theHeaderDefault = parcelHelpers.interopDefault(_theHeader);
class App extends (0, _heropy.CoreComponent) {
    render() {
        // 헤더를 제외한 나머지 구조를 routre-view 안으로 넣을 예정,
        // popstate가 발생함에 따라 이 router-view 태그 안 내용이 바뀔 예정
        const routerView = document.createElement("router-view");
        this.el.append(// 헤더 생성자의 el 을 app.js의 el로 밀어넣기, 
        new (0, _theHeaderDefault.default)().el, routerView);
    }
}
exports.default = App;

},{"./core/heropy":"57bZf","./components/TheHeader":"3Cyq4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"57bZf":[function(require,module,exports) {
// 핵심 컴포넌트 , 페이지 구분하는 라우터 기능, 데이터 통신가능한 스토어 기능
// 1. 컴포넌트 기능 
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CoreComponent", ()=>CoreComponent);
// 라우터 정보를 매개변수로 사용, index.js 에서 내보낸 그 라우터 정보 기반
// 라우터 정보를 받으면 routeRender() 함수를 실행
parcelHelpers.export(exports, "createRouter", ()=>createRouter);
// 3. Store 개념
parcelHelpers.export(exports, "Store", ()=>Store);
class CoreComponent {
    // 필요한 tag를 그때그때 받을 수 있는 옵션(payload) 생성
    constructor(payload = {}){
        const { tagName ="div" , state ={} , props ={}  } = payload;
        this.el = document.createElement(tagName);
        this.state = state;
        this.props = props;
        this.render();
    }
    render() {
    // 이 컴포넌트를 각각의 다른 컴포넌트에서 확장해서 사용할 예정
    }
}
/* 
  CoreComponent = {
    paylaod : {tagName: {(paylaod)}},
    el : <tagName></tagName>
    state: {}
    props: {}
    render()
  }
  를 export!
*/ // 2. Router 기능
function routeRender(routes) {
    // 해쉬 값 없다면 에러발생 -> 처리 필요
    if (!location.hash) // history 에 기록 남기지 않고 페이지 이동( 메인페이지 해쉬값 붙여주기)
    history.replaceState(null, "", "/#/");
    // 내용이 출력될 위치인 router-view 태그 찾기
    const routerView = document.querySelector("router-view");
    // 주소 부분의 hash 값을 얻어낼 수 있음, 다만 쿼리스트링 정보 구별이 필요(#about?name=heropy)
    // split 통해 hash 와 쿼리스트링 분리, 0번째 Index 가 hash, 1번째가 쿼리스트링
    // 구조분해할당 - split은 배열을 리턴하기 때문에 [] 로 해야함!, {}은 object(객체)
    const [hash, queryString = ""] = location.hash.split("?");
    // http://localhost:1234/#/?a=123&b=456&c=789
    // split = ['a=123', 'b=456'...]
    // reduce 메소드,배열 개수 만큼 콜백 사용 가능,2번째 인수로 초기 데이터 설정 가능
    const query = queryString.split("&").reduce((acc, cur)=>{
        // 'a=123' 을 = 기준으로 할당 -> cur = { key: a, value: 123 }
        const [key, value] = cur.split("=");
        acc[key] = value;
        return acc;
    }, {});
    // query 값이 history 객체의 state 값으로 할당 -> state: {a: '123', b: '456', c: '789'}
    history.replaceState(query, "");
    // 넘어오는 라우터 정보에서 hash 값 추출
    // 정규표현식 이용 -> 리터럴 방식(/#\/about\/?$/.)은 중간에 변수사용 불가하기에 생성자 방식 사용
    const currentRoute = routes.find((route)=>new RegExp(`${route.path}/?$`).test(hash));
    // 각 객체의 실제 출력할 것은 속에 있는 component 속성 안에 있음
    // 그 component 속성은 Home, About 에서 가져온 것 
    routerView.innerHTML = ``;
    // 라우터 뷰의 내용을 컴포넌트의 인스턴스의 el을 밀어넣기
    routerView.append(new currentRoute.component().el);
    // 페이지가 바뀔때, 첫 접근시 페이지 스크롤 최상단 고정
    window.scrollTo(0, 0);
}
function createRouter(routes) {
    // 함수 반환
    return function() {
        window.addEventListener("popstate", ()=>{
            routeRender(routes);
        });
        // popstate는 최초실행 안되기에 선언하여 1회 실행
        routeRender(routes);
    };
}
class Store {
    constructor(state){
        this.state = {};
        // subscribe 메소드 실행위해 observers 라는 객체 데이터 초기화
        this.observers = {};
        // object 반복시에는 for in, 밖에서 받아오는 state(객체데이터)의 속성을 for in 문으로 반복처리
        for(const key in state)// 객체데이터의 속성을 정의 -> (정의 대상, 속성 이름, )
        Object.defineProperty(this.state, key, {
            // getter : key 값 사용시 동작
            get: ()=>state[key],
            // setter : key 값 지정(할당)시 동작
            set: (val)=>{
                // 새로운 내용 지정시 state가 가진 객체데이터 갱신
                state[key] = val;
                // set 함수 동작시 observers에 key 에 등록된 콜백함수를 동작
                // this.observers['message']()
                // 여러개의 콜백을 담은 배열이 들어올테니 foreach를 사용하여 그 콜백을 set 에서 사용할 수 있도록 설정
                this.observers[key].forEach((observer)=>observer(val));
            }
        });
    }
    // state 부분의 데이터가 변경되는지 아닌지를 확인(구독)
    // 어떤 데이터가 변경되었을때 실행될 기능을 정의
    // key 와 callback 함수를 받음
    subscribe(key, cb) {
        // key 속성에 콜백함수 등록, set 함수
        // this.observers['message'] = () => {}
        // { message(key): () => {} } => 함수를 여러개 등록할 수는 없을까?
        // 하나의 콜백함수가 아닌 여러개의 함수를 배열에 밀어넣기
        // 배열데이터인지 아닌지를 조사, 아니라면 undefined 기에 push 가 안됨
        Array.isArray(this.observers[key]) ? this.observers[key].push(cb) : this.observers[key] = [
            cb
        ];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3Cyq4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
class TheHeader extends (0, _heropy.CoreComponent) {
    constructor(){
        super({
            // header 태그로 제작
            tagName: "header"
        });
    }
    // 헤더 컴포넌트에 렌더링될 것들
    render() {
        this.el.innerHTML = /* html */ `
    <!-- hash 기호를 사용하여 페이지 이동 -->
      <a href="#/">Main</a>
      <!-- 주소가 http://localhost:1234/#/about 요렇게 해쉬가 붙어서 주소 변경 -->
      <!-- 페이지는 동일하지만 눈속임으로 다른 페이지 보여주듯 -->
      <!-- hash 가 바뀔때마다 window 객체에 popstate 이벤트 발생 -> main, about 보여줄지 결정 가능  -->
      <a href="#/about">About</a>
    `;
    }
}
exports.default = TheHeader;

},{"../core/heropy":"57bZf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3L9mC":[function(require,module,exports) {
// routes = pages, 
// route를 제어하는 용도
// 홈, 어바웃 가져오기
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _home = require("./Home");
var _homeDefault = parcelHelpers.interopDefault(_home);
var _about = require("./About");
var _aboutDefault = parcelHelpers.interopDefault(_about);
// heropy.js 에서 createRotuer 함수 가져오기
var _heropy = require("../core/heropy");
exports.default = (0, _heropy.createRouter)([
    // 함수의 파라미터로 객체를 가진 배열을 넘겨줌, 배열 안 객체 하나마다 한 페이지의 정보를 담음
    // 해쉬와 일치하는 path 값 할당, 일치시 보여줄 컴포넌트를 같이 할당
    {
        path: "#/",
        component: (0, _homeDefault.default)
    },
    {
        path: "#/about",
        component: (0, _aboutDefault.default)
    }
]);

},{"./Home":"0JSNG","./About":"gdB30","../core/heropy":"57bZf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"0JSNG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
var _textField = require("../components/TextField");
var _textFieldDefault = parcelHelpers.interopDefault(_textField);
var _message = require("../components/Message");
var _messageDefault = parcelHelpers.interopDefault(_message);
var _title = require("../components/Title");
var _titleDefault = parcelHelpers.interopDefault(_title);
class Home extends (0, _heropy.CoreComponent) {
    render() {
        this.el.innerHTML = /* html */ `
      <h1>Home Page!</h1>
    `;
        // input 요소 밀어넣기 
        this.el.append(new (0, _textFieldDefault.default)().el, // messageStore.state.message 출력
        new (0, _messageDefault.default)().el, new (0, _titleDefault.default)().el);
    }
}
exports.default = Home;

},{"../core/heropy":"57bZf","../components/TextField":"e6IWT","../components/Message":"i84kQ","../components/Title":"6wotK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e6IWT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
var _message = require("../store/message");
var _messageDefault = parcelHelpers.interopDefault(_message);
class TextField extends (0, _heropy.CoreComponent) {
    render() {
        this.el.innerHTML = /* html */ `
    <!-- 여기서 입력받은 데이터를 다른 컴포넌트에서 출력해보자 -->
    <!-- 가져온 store의 state의 message 를 사용 => 값을 조회해서 넣거나(Getter) -->
      <input value="${(0, _messageDefault.default).state.message}"/>
    `;
        const inputEl = this.el.querySelector("input");
        inputEl.addEventListener("input", ()=>{
            // 할당연산자를 통해 값을 지정해서 넣거나(Setter)
            (0, _messageDefault.default).state.message = inputEl.value;
            console.log(inputEl.value);
        });
    }
}
exports.default = TextField;

},{"../core/heropy":"57bZf","../store/message":"4gYOO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4gYOO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
// store 기능 사용부분
// state 로 받을 객체에 값 주고 인스턴스를 내보냄
exports.default = new (0, _heropy.Store)({
    message: "Hello~!"
});

},{"../core/heropy":"57bZf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i84kQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
// 출력할 메시지 가져오기
var _message = require("../store/message");
var _messageDefault = parcelHelpers.interopDefault(_message);
class Message extends (0, _heropy.CoreComponent) {
    constructor(){
        super();
        // 구독할 데이터 이름, 콜백함수 인수로 전달
        // message.js 에서 데이터가 변경되는지 안되는지를 구독, 변경시 콜백함수를 실행
        (0, _messageDefault.default).subscribe("message", ()=>{
            this.render();
        });
    }
    render() {
        this.el.innerHTML = /* html */ `
      <h2>${(0, _messageDefault.default).state.message}</h2>
    `;
    }
}
exports.default = Message;

},{"../core/heropy":"57bZf","../store/message":"4gYOO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6wotK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
var _message = require("../store/message");
var _messageDefault = parcelHelpers.interopDefault(_message);
class Title extends (0, _heropy.CoreComponent) {
    constructor(){
        super({
            tagName: "h1"
        });
        // 메시지 상태 수정될때마다 콜백 실행, render 콜백시마다 새로 실행
        (0, _messageDefault.default).subscribe("message", (newVal)=>{
            console.log("newVal: ", newVal);
            // 메시지 바뀌면 h2 부분을 갱신
            this.render();
        });
    }
    render() {
        this.el.textContent = `Title: ${(0, _messageDefault.default).state.message}`;
    }
}
exports.default = Title;

},{"../core/heropy":"57bZf","../store/message":"4gYOO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gdB30":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _heropy = require("../core/heropy");
class About extends (0, _heropy.CoreComponent) {
    render() {
        const { a , b , c  } = history.state;
        this.el.innerHTML = /* html */ `
      <h1>About Page!</h1>
      <h2>${a}</h2>
      <h2>${b}</h2>
      <h2>${c}</h2>
    `;
    }
}
exports.default = About;

},{"../core/heropy":"57bZf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["e11Rl","gLLPy"], "gLLPy", "parcelRequirec010")

//# sourceMappingURL=index.4d6bcbeb.js.map
