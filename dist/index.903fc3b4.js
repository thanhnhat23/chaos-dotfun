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
        globalObject
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
})({"1s3Aw":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - React Bootstrap
 *
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _jsxRuntime = require("react/jsx-runtime");
var _client = require("react-dom/client");
var _appJsx = require("./app/App.jsx");
var _appJsxDefault = parcelHelpers.interopDefault(_appJsx);
var _gameManager = require("../../lib/game/client/game-manager");
var _clientPlugin = require("../plugins/client-plugin");
const urlParams = new URLSearchParams(window.location.search);
window.RELDENS_LOG_LEVEL = urlParams.get('logLevel') || 7;
window.RELDENS_ENABLE_TRACE_FOR = Number(urlParams.get('traceFor') || 'emergency,alert,critical');
const reldens = new (0, _gameManager.GameManager)();
reldens.setupCustomClientPlugin('customPluginKey', (0, _clientPlugin.ClientPlugin));
// client event listener example with version display:
reldens.events.on('reldens.afterInitEngineAndStartGame', ()=>{
    const verEl = reldens.gameDom.getElement('#current-version');
    if (verEl) verEl.innerHTML = reldens.config.client.gameEngine.version + ' -';
});
// demo message removal:
reldens.events.on('reldens.startGameAfter', ()=>{
    reldens.gameDom.getElement('.row-disclaimer')?.remove();
});
reldens.events.on('reldens.activateRoom', (room)=>{
    room.onMessage('*', (message)=>{
        if ('rski.Bc' !== message.act) return;
        let skillKey = (message.data?.skillKey || '').toString();
        let skillDelay = Number(message.data?.extraData?.sd || 0);
        if ('' !== skillKey && 0 < skillDelay) {
            let skillElement = reldens.gameDom.getElement('.skill-icon-' + skillKey);
            if (!skillElement) return;
            let startTime = Date.now();
            let endTime = startTime + skillDelay;
            function updateCooldown() {
                let currentTime = Date.now();
                let remainingTime = endTime - currentTime;
                if (0 >= remainingTime) {
                    skillElement.style.setProperty('--angle', '360deg');
                    skillElement.classList.remove('cooldown');
                    return;
                }
                let progress = (skillDelay - remainingTime) / skillDelay;
                let angle = progress * 360;
                skillElement.style.setProperty('--angle', `${angle}deg`);
                requestAnimationFrame(updateCooldown);
            }
            skillElement.classList.add('cooldown');
            skillElement.style.setProperty('--angle', '0deg');
            updateCooldown();
        }
    });
});
window.reldens = reldens;
function bootstrap() {
    const container = document.getElementById('root');
    if (!container) {
        console.error('Missing #root element for React mount.');
        return;
    }
    const root = (0, _client.createRoot)(container);
    root.render(/*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _appJsxDefault.default), {
        reldens: reldens
    }));
}
document.addEventListener('DOMContentLoaded', bootstrap);

},{"react/jsx-runtime":"react/jsx-runtime","react-dom/client":"react-dom/client","./app/App.jsx":"fHAn7","../../lib/game/client/game-manager":"8Z56p","../plugins/client-plugin":"v0ljK","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"fHAn7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _reactRouterDom = require("react-router-dom");
var _translationsJs = require("./translations.js");
var _loginPageJsx = require("./pages/LoginPage.jsx");
var _loginPageJsxDefault = parcelHelpers.interopDefault(_loginPageJsx);
var _signupPageJsx = require("./pages/SignupPage.jsx");
var _signupPageJsxDefault = parcelHelpers.interopDefault(_signupPageJsx);
var _guestPageJsx = require("./pages/GuestPage.jsx");
var _guestPageJsxDefault = parcelHelpers.interopDefault(_guestPageJsx);
var _forgotPasswordPageJsx = require("./pages/ForgotPasswordPage.jsx");
var _forgotPasswordPageJsxDefault = parcelHelpers.interopDefault(_forgotPasswordPageJsx);
var _roleSelectionPageJsx = require("./pages/RoleSelectionPage.jsx");
var _roleSelectionPageJsxDefault = parcelHelpers.interopDefault(_roleSelectionPageJsx);
var _viewerPageJsx = require("./pages/ViewerPage.jsx");
var _viewerPageJsxDefault = parcelHelpers.interopDefault(_viewerPageJsx);
const AuthNavigation = ({ links, activeRoute, onNavigate })=>/*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
        className: "flex flex-wrap items-center justify-center gap-3 md:justify-end",
        children: links.map(({ route, label })=>{
            const isActive = activeRoute === route;
            const baseClasses = "inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70";
            const resolvedClasses = isActive ? `${baseClasses} border-sky-400 bg-sky-500/80 text-white shadow-lg shadow-sky-500/30` : `${baseClasses} border-white/15 bg-white/10 text-slate-200 hover:border-sky-400 hover:bg-sky-500/30 hover:text-white`;
            return /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                type: "button",
                className: resolvedClasses,
                onClick: ()=>onNavigate(route),
                children: label
            }, route);
        })
    });
const resolveNavLinks = (pathname, copy)=>{
    if (!copy.nav) return [];
    if (pathname.startsWith("/streamer")) return copy.nav.streamer || [];
    if (pathname.startsWith("/viewer")) return copy.nav.viewer || [];
    if (pathname.startsWith("/guest")) return copy.nav.guest || [];
    return copy.nav.home || [];
};
const resolveActiveRoute = (pathname, links)=>{
    if (!links || links.length === 0) return pathname;
    const exact = links.find(({ route })=>route === pathname);
    if (exact) return exact.route;
    const partial = links.find(({ route })=>route !== "/" && pathname.startsWith(route));
    return partial ? partial.route : pathname;
};
const Shell = ({ copy })=>{
    const location = (0, _reactRouterDom.useLocation)();
    const navigate = (0, _reactRouterDom.useNavigate)();
    const navLinks = resolveNavLinks(location.pathname, copy);
    const activeRoute = resolveActiveRoute(location.pathname, navLinks);
    const handleNavigate = (route)=>{
        navigate(route);
    };
    return /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
        className: "wrapper relative min-h-screen overflow-hidden text-slate-100",
        children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 opacity-95"
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_60%)]"
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                className: "relative z-10 flex min-h-screen flex-col",
                children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                        className: "content flex-1 px-4 pb-16",
                        children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                className: "row row-disclaimer mx-auto mt-10 w-full max-w-4xl !max-w-4xl !bg-white/10 !p-6 !shadow-2xl border border-white/10 text-center text-sm leading-relaxed text-slate-200 backdrop-blur-xl",
                                children: copy.disclaimer.map((line, index)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)((0, _react.Fragment), {
                                        children: [
                                            line,
                                            index < copy.disclaimer.length - 1 && /*#__PURE__*/ (0, _jsxRuntime.jsx)("br", {})
                                        ]
                                    }, line))
                            }),
                            navLinks.length > 0 && /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                className: "mt-8 flex justify-center md:justify-end",
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(AuthNavigation, {
                                    links: navLinks,
                                    activeRoute: activeRoute,
                                    onNavigate: handleNavigate
                                })
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                className: "mt-10 flex w-full justify-center px-2",
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                    className: "forms-container flex w-full max-w-5xl flex-col items-center gap-8",
                                    children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)((0, _reactRouterDom.Routes), {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                path: "/",
                                                element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _roleSelectionPageJsxDefault.default), {
                                                    copy: copy,
                                                    onSelect: handleNavigate
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)((0, _reactRouterDom.Route), {
                                                path: "/streamer",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                        index: true,
                                                        element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Navigate), {
                                                            to: "/streamer/login",
                                                            replace: true
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                        path: "login",
                                                        element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _loginPageJsxDefault.default), {
                                                            copy: copy,
                                                            variant: "streamer"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                        path: "signup",
                                                        element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _signupPageJsxDefault.default), {
                                                            copy: copy
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                        path: "forgot",
                                                        element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _forgotPasswordPageJsxDefault.default), {
                                                            copy: copy
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                path: "/viewer",
                                                element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _viewerPageJsxDefault.default), {
                                                    copy: copy
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                path: "/guest",
                                                element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _guestPageJsxDefault.default), {
                                                    copy: copy
                                                })
                                            }),
                                            /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Route), {
                                                path: "*",
                                                element: /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.Navigate), {
                                                    to: "/",
                                                    replace: true
                                                })
                                            })
                                        ]
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                className: "selection-container hidden",
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                    className: "selection-forms-container rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                            className: "player-selection-form-errors"
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
                                            name: "player-selector-form",
                                            id: "player-selector-form",
                                            className: "player-selector-form hidden",
                                            action: "#",
                                            method: "post",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                                    className: "form-title text-center text-lg font-semibold text-white",
                                                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                                        htmlFor: "player-select-element",
                                                        children: copy.playerSelection.selectLabel
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                                    className: "input-box player-select-box mt-4",
                                                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("select", {
                                                        className: "input-box select-element w-full rounded-xl border border-white/15 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40",
                                                        id: "player-select-element",
                                                        name: "player-select-element"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                                    className: "player-selection-additional-info mt-3 text-sm text-slate-300"
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "input-box submit-container player-select-submit mt-4 flex items-center justify-end gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                                            className: "loading-container hidden",
                                                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("img", {
                                                                src: "./assets/web/loading.gif",
                                                                alt: copy.playerSelection.loadingAlt
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                            type: "submit",
                                                            value: copy.playerSelection.selectSubmit
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
                                            name: "player-create-form",
                                            id: "player-create-form",
                                            className: "player-create-form hidden",
                                            action: "#",
                                            method: "post",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                                    className: "form-title text-center text-lg font-semibold text-white",
                                                    children: copy.playerSelection.createTitle
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "input-box player-create-name mt-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                                            htmlFor: "new-player-name",
                                                            children: copy.playerSelection.createNameLabel
                                                        }),
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                            type: "text",
                                                            name: "new-player-name",
                                                            id: "new-player-name",
                                                            className: "required",
                                                            required: true
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                                    className: "player-creation-additional-info mt-3 text-sm text-slate-300"
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "input-box submit-container player-create-submit mt-4 flex items-center justify-end gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                                            className: "loading-container hidden",
                                                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("img", {
                                                                src: "./assets/web/loading.gif",
                                                                alt: copy.playerSelection.loadingAlt
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                            type: "submit",
                                                            value: copy.playerSelection.createSubmit
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                                    className: "input-box response-error"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                className: "game-container hidden",
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                    id: "reldens"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                        className: "footer mt-auto bg-slate-950/80 py-6 text-center text-sm text-slate-300 backdrop-blur",
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                            className: "copyright",
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("a", {
                                className: "hover:text-white hover:underline",
                                href: "https://www.dwdeveloper.com/",
                                children: [
                                    "by D",
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                        className: "text-black text-lowercase",
                                        children: "w"
                                    }),
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                        className: "text-capitalize",
                                        children: "Developer"
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
};
const App = ({ reldens })=>{
    const lang = typeof document !== "undefined" && document.documentElement.lang || "en";
    const locale = (0, _translationsJs.translations)[lang] ? lang : "en";
    const copy = (0, _translationsJs.translations)[locale];
    (0, _react.useEffect)(()=>{
        if (reldens && typeof reldens.clientStart === "function") reldens.clientStart();
    }, [
        reldens
    ]);
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)((0, _reactRouterDom.BrowserRouter), {
        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(Shell, {
            copy: copy
        })
    });
};
exports.default = App;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","react-router-dom":"react-router-dom","./translations.js":"3gQoq","./pages/LoginPage.jsx":"26B9n","./pages/SignupPage.jsx":"ch8OQ","./pages/GuestPage.jsx":"cQXZ0","./pages/ForgotPasswordPage.jsx":"cLH0w","./pages/RoleSelectionPage.jsx":"dvwex","./pages/ViewerPage.jsx":"d1kaJ","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"3gQoq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "translations", ()=>translations);
const translations = {
    en: {
        nav: {
            home: [],
            streamer: [
                {
                    route: '/',
                    label: 'Choose role'
                },
                {
                    route: '/streamer/login',
                    label: 'Login'
                },
                {
                    route: '/streamer/signup',
                    label: 'Create account'
                },
                {
                    route: '/streamer/forgot',
                    label: 'Forgot password'
                }
            ],
            viewer: [
                {
                    route: '/',
                    label: 'Back to role selection'
                }
            ],
            guest: [
                {
                    route: '/',
                    label: 'Back to role selection'
                }
            ]
        },
        disclaimer: [
            'Disclaimer: Reldens is not just a game, is a platform to create games.',
            'This is a demo to show how many features are available on the platform.'
        ],
        roles: {
            title: 'Pick your role',
            subtitle: 'Choose how you want to step into the world of Reldens.',
            note: 'Blockchain interactions are work in progress. Donations are simulated for now.',
            cards: [
                {
                    key: 'streamer',
                    route: '/streamer/login',
                    title: 'Streamer',
                    icon: 'S',
                    description: 'Broadcast your adventure and receive viewer-triggered buffs or events.',
                    highlights: [
                        'Link your YouTube channel to auto-start streaming on login.',
                        'Viewers can spend SOL to empower you or unleash challenges.',
                        'Access full account progression and management tools.'
                    ],
                    action: 'I am a streamer'
                },
                {
                    key: 'viewer',
                    route: '/viewer',
                    title: 'Viewer',
                    icon: 'V',
                    description: 'Support your favourite streamer and influence the match in real time.',
                    highlights: [
                        'Connect a SOL wallet (demo) through ethers.js.',
                        'Trigger buffs or spawn enemies with curated donation options.',
                        'Hang out inside the browser player while the action happens.'
                    ],
                    action: 'Enter as viewer'
                },
                {
                    key: 'guest',
                    route: '/guest',
                    title: 'Guest',
                    icon: 'G',
                    description: 'Jump into the demo map without creating an account or wallet.',
                    highlights: [
                        'Create a temporary hero and explore instantly.',
                        'Test skills, combat and movement as they are today.',
                        'You can upgrade to a full account later without hassle.'
                    ],
                    action: 'Play as guest'
                }
            ],
            emptyState: 'Roles are loading. Please try again in a moment.'
        },
        guest: {
            title: 'Play as a Guest',
            usernameLabel: 'Username',
            submit: 'Play',
            loadingAlt: 'Loading...'
        },
        register: {
            title: 'Create Account',
            emailLabel: 'Email',
            usernameLabel: 'Username',
            passwordLabel: 'Password',
            rePasswordLabel: 'Re-type password',
            termsLink: 'Accept our Terms and Conditions (click here).',
            submit: 'Register',
            loadingAlt: 'Loading...'
        },
        login: {
            title: 'Login',
            usernameLabel: 'Username',
            passwordLabel: 'Password',
            submit: 'Submit',
            loadingAlt: 'Loading...'
        },
        streamer: {
            loginTitle: 'Streamer login',
            loginSubtitle: 'Sign in and sync your broadcast tools to go live instantly.',
            youtube: {
                heading: 'Link your YouTube channel',
                description: 'Provide your channel URL and primary stream key so we can auto-start your broadcast whenever you join the server.',
                fields: {
                    channelLabel: 'Channel URL',
                    streamKeyLabel: 'Stream key',
                    autoStartLabel: 'Auto-start streaming on login'
                },
                linkCta: 'Link YouTube',
                unlinkCta: 'Disconnect',
                connected: 'Channel linked. Streaming will start automatically when you enter the world.',
                disconnected: 'Channel disconnected. Auto streaming disabled.',
                helper: 'Your stream key stays in this device only. We do not upload it to our servers.',
                learnMore: 'https://support.google.com/youtube/answer/2474026',
                learnMoreLabel: 'YouTube live help',
                steps: [
                    'Make sure live streaming is enabled on your YouTube studio.',
                    'Use the same primary stream key you configured in your encoder.',
                    'Keep this browser tab open while broadcasting to maintain the link.'
                ],
                status: {
                    idle: 'Not linked yet',
                    linked: 'Connected'
                }
            }
        },
        forgot: {
            title: 'Forgot password',
            emailLabel: 'Email',
            submit: 'Request',
            loadingAlt: 'Loading...'
        },
        firebase: {
            title: 'Firebase Registration',
            usernameLabel: 'Username',
            loadingAlt: 'Loading...'
        },
        terms: {
            heading: 'Terms and conditions',
            acceptLabel: 'I agree to these Terms and Conditions'
        },
        instructions: {
            heading: 'Instructions',
            steps: [
                'Move with the arrows or using W-A-S-D.',
                'Use left click to follow a path but for now to change to another scene you need to walk through the change point (like the bridge at the top, or the houses doors).',
                'Use right-click or TAB to target near enemies or players.',
                'You must have a target to execute a skill/action.',
                'Use the screen-buttons to activate the different player skills/actions.'
            ]
        },
        gameOver: [
            'You died!',
            'Just wait...',
            'You will be automatically revived for this demo!'
        ],
        viewer: {
            title: 'Support a streamer',
            subtitle: 'Pick a channel, watch the show and use SOL donations to influence the battle.',
            note: 'Blockchain integration is coming soon. This flow is a UI prototype.',
            wallet: {
                title: 'Your wallet',
                description: 'Connect a SOL-compatible wallet through ethers.js to simulate donations.',
                connectCta: 'Connect wallet',
                disconnectCta: 'Disconnect',
                connected: 'Wallet connected. You can pledge SOL donations.',
                disconnected: 'Wallet disconnected.',
                noProvider: 'No Web3 wallet detected. Install Phantom or MetaMask and try again.',
                error: 'Failed to connect the wallet. Please retry.',
                connectPrompt: 'Connect your wallet first to unlock donation options.',
                status: {
                    idle: 'Status: disconnected',
                    connecting: 'Status: connecting...',
                    connected: 'Status: connected',
                    error: 'Status: error'
                },
                labels: {
                    address: 'Wallet address',
                    network: 'Network',
                    balance: 'Balance'
                }
            },
            viewerCountLabel: '{count} live viewers',
            streamListTitle: 'Live channels',
            donations: {
                buffTitle: 'Buff donations',
                eventTitle: 'Event donations',
                donateCta: 'Donate {amount} SOL',
                requiresWallet: 'Connect your wallet to unlock donation actions.',
                success: 'Donation for {option} in {streamer} registered. It will trigger once {amount} SOL arrives.',
                buffOptions: [
                    {
                        id: 'atk-boost',
                        label: 'Sunlance Surge',
                        description: 'Increase damage by 25% for 3 minutes.',
                        amount: '1'
                    },
                    {
                        id: 'heal-pulse',
                        label: 'Guardian Pulse',
                        description: 'Restore 40% HP and add a protective shield.',
                        amount: '1.5'
                    },
                    {
                        id: 'speed',
                        label: 'Windwalker Veil',
                        description: 'Boost movement speed by 35% for 2 minutes.',
                        amount: '0.8'
                    }
                ],
                eventOptions: [
                    {
                        id: 'spawn-elites',
                        label: 'Elite Ambush',
                        description: 'Spawn three elite monsters around the streamer.',
                        amount: '2'
                    },
                    {
                        id: 'map-swap',
                        label: 'Portal Roulette',
                        description: 'Teleport the party to a random map.',
                        amount: '3'
                    },
                    {
                        id: 'boss-challenge',
                        label: 'World Boss Call',
                        description: 'Summon a roaming boss with rare loot.',
                        amount: '4.5'
                    }
                ]
            },
            streamers: [
                {
                    id: 'luna-fox',
                    name: 'LunaFox',
                    activity: 'Pushing nightfall raids with guildmates.',
                    viewers: 842,
                    tags: [
                        'PvE',
                        'Speedrun'
                    ]
                },
                {
                    id: 'ember-knight',
                    name: 'EmberKnight',
                    activity: 'Arena duels and build theorycrafting.',
                    viewers: 613,
                    tags: [
                        'PvP',
                        'Builds'
                    ]
                },
                {
                    id: 'nova-mage',
                    name: 'NovaMage',
                    activity: 'Triggering chaos events on demand.',
                    viewers: 455,
                    tags: [
                        'Events',
                        'Co-op'
                    ]
                }
            ]
        },
        playerSelection: {
            selectLabel: 'Select Player',
            selectSubmit: 'Start',
            createTitle: 'Create Player',
            createNameLabel: 'Player Name',
            createSubmit: 'Create & Start',
            loadingAlt: 'Loading...'
        },
        playerCreation: {
            loadingAlt: 'Loading...'
        },
        footer: 'by DwDeveloper'
    },
    es: {
        nav: {
            home: [],
            streamer: [
                {
                    route: '/',
                    label: 'Elegir rol'
                },
                {
                    route: '/streamer/login',
                    label: 'Iniciar sesion'
                },
                {
                    route: '/streamer/signup',
                    label: 'Crear cuenta'
                },
                {
                    route: '/streamer/forgot',
                    label: 'Recuperar clave'
                }
            ],
            viewer: [
                {
                    route: '/',
                    label: 'Volver a roles'
                }
            ],
            guest: [
                {
                    route: '/',
                    label: 'Volver a roles'
                }
            ]
        },
        disclaimer: [
            'Descargo: Reldens no es solo un juego, es una plataforma para crear juegos.',
            'Esta es una demostracion para mostrar cuantas funciones estan disponibles en la plataforma.'
        ],
        roles: {
            title: 'Elige tu rol',
            subtitle: 'Decide como quieres entrar al mundo de Reldens.',
            note: 'La integracion blockchain esta en desarrollo. Las donaciones son una simulacion.',
            cards: [
                {
                    key: 'streamer',
                    route: '/streamer/login',
                    title: 'Streamer',
                    icon: 'S',
                    description: 'Transmite tu aventura y recibe mejoras o eventos activados por la comunidad.',
                    highlights: [
                        'Vincula tu canal de YouTube y comienza directo al iniciar sesion.',
                        'Los espectadores gastan SOL para darte buffs o invocar desafios.',
                        'Gestiona tu cuenta completa y el progreso de tus personajes.'
                    ],
                    action: 'Soy streamer'
                },
                {
                    key: 'viewer',
                    route: '/viewer',
                    title: 'Espectador',
                    icon: 'V',
                    description: 'Apoya a tu streamer favorito e influye en la partida en tiempo real.',
                    highlights: [
                        'Conecta una billetera SOL (demo) usando ethers.js.',
                        'Lanza buffs o genera enemigos con opciones de donacion.',
                        'Mira la accion directamente desde el navegador.'
                    ],
                    action: 'Entrar como espectador'
                },
                {
                    key: 'guest',
                    route: '/guest',
                    title: 'Invitado',
                    icon: 'G',
                    description: 'Prueba el mapa demo sin crear cuenta ni billetera.',
                    highlights: [
                        'Crea un heroe temporal y juega al instante.',
                        'Experimenta las habilidades y el combate actual.',
                        'Mas adelante puedes pasar a cuenta completa sin perder progreso.'
                    ],
                    action: 'Jugar como invitado'
                }
            ],
            emptyState: 'Roles en carga. Intenta nuevamente en unos segundos.'
        },
        guest: {
            title: 'Jugar como invitado',
            usernameLabel: 'Nombre de usuario',
            submit: 'Jugar',
            loadingAlt: 'Cargando...'
        },
        register: {
            title: 'Crear Cuenta',
            emailLabel: 'Email',
            usernameLabel: 'Nombre de Usuario',
            passwordLabel: 'Contrasena',
            rePasswordLabel: 'Reescribir contrasena',
            termsLink: 'Aceptar nuestros Terminos y Condiciones (click aqui).',
            submit: 'Registrarse',
            loadingAlt: 'Cargando...'
        },
        login: {
            title: 'Login',
            usernameLabel: 'Nombre de Usuario',
            passwordLabel: 'Password',
            submit: 'Entrar',
            loadingAlt: 'Cargando...'
        },
        streamer: {
            loginTitle: 'Login de streamer',
            loginSubtitle: 'Inicia sesion y sincroniza tus herramientas de transmision.',
            youtube: {
                heading: 'Vincula tu canal de YouTube',
                description: 'Ingresa la URL y la clave de transmision para iniciar directo automaticamente cuando entres al servidor.',
                fields: {
                    channelLabel: 'URL del canal',
                    streamKeyLabel: 'Clave de transmision',
                    autoStartLabel: 'Iniciar directo automaticamente al ingresar'
                },
                linkCta: 'Vincular YouTube',
                unlinkCta: 'Desconectar',
                connected: 'Canal vinculado. El directo se iniciara automaticamente al ingresar.',
                disconnected: 'Canal desconectado. Auto transmision deshabilitada.',
                helper: 'La clave de transmision queda guardada solo en este dispositivo.',
                learnMore: 'https://support.google.com/youtube/answer/2474026',
                learnMoreLabel: 'Ayuda YouTube Live',
                steps: [
                    'Verifica que tengas habilitadas las transmisiones en YouTube Studio.',
                    'Usa la misma clave primaria configurada en tu codificador.',
                    "Mantene abierta esta pesta\xf1a mientras transmitis para mantener el enlace."
                ],
                status: {
                    idle: 'Sin vincular',
                    linked: 'Conectado'
                }
            }
        },
        forgot: {
            title: 'Olvide mi contrasena',
            emailLabel: 'Email',
            submit: 'Solicitar',
            loadingAlt: 'Cargando...'
        },
        firebase: {
            title: 'Firebase Login',
            usernameLabel: 'Usuario',
            loadingAlt: 'Cargando...'
        },
        terms: {
            heading: 'Terminos y Condiciones',
            acceptLabel: 'Acepto estos Terminos y Condiciones'
        },
        instructions: {
            heading: 'Instrucciones',
            steps: [
                'Move con las flechas o usando W-A-S-D.',
                'Utiliza clic izquierdo para seguir un camino; para cambiar de escena debes cruzar el punto de cambio.',
                'Utiliza clic derecho o TAB para apuntar a enemigos o jugadores cercanos.',
                'Debes tener un objetivo para ejecutar habilidades.',
                'Utiliza los botones en pantalla para activar las habilidades del personaje.'
            ]
        },
        gameOver: [
            'Moriste!',
            'Solo espera...',
            'Seras revivido automaticamente para esta demo!'
        ],
        viewer: {
            title: 'Apoya a un streamer',
            subtitle: 'Elige un canal, mira la partida y usa donaciones SOL para influir en la pelea.',
            note: 'La integracion blockchain llegara pronto. Esta seccion es un prototipo.',
            wallet: {
                title: 'Tu billetera',
                description: 'Conecta una billetera compatible con SOL mediante ethers.js para simular donaciones.',
                connectCta: 'Conectar billetera',
                disconnectCta: 'Desconectar',
                connected: 'Billetera conectada. Ya puedes prometer donaciones SOL.',
                disconnected: 'Billetera desconectada.',
                noProvider: 'No se detecto una billetera Web3. Instala Phantom o MetaMask.',
                error: 'No se pudo conectar la billetera. Intenta nuevamente.',
                connectPrompt: 'Conecta tu billetera para habilitar las donaciones.',
                status: {
                    idle: 'Estado: desconectado',
                    connecting: 'Estado: conectando...',
                    connected: 'Estado: conectado',
                    error: 'Estado: error'
                },
                labels: {
                    address: 'Direccion',
                    network: 'Red',
                    balance: 'Balance'
                }
            },
            viewerCountLabel: '{count} espectadores',
            streamListTitle: 'Canales en vivo',
            donations: {
                buffTitle: 'Donaciones buff',
                eventTitle: 'Donaciones evento',
                donateCta: 'Donar {amount} SOL',
                requiresWallet: 'Conecta tu billetera para activar las donaciones.',
                success: 'Se registro la donacion {option} para {streamer}. Se ejecutara al recibir {amount} SOL.',
                buffOptions: [
                    {
                        id: 'atk-boost',
                        label: 'Impulso Solar',
                        description: 'Aumenta el dano 25% por 3 minutos.',
                        amount: '1'
                    },
                    {
                        id: 'heal-pulse',
                        label: "Pulso Guardi\xe1n",
                        description: 'Recupera 40% de vida y agrega escudo.',
                        amount: '1.5'
                    },
                    {
                        id: 'speed',
                        label: 'Velocidad del Viento',
                        description: 'Sube la velocidad 35% por 2 minutos.',
                        amount: '0.8'
                    }
                ],
                eventOptions: [
                    {
                        id: 'spawn-elites',
                        label: 'Emboscada Elite',
                        description: 'Invoca tres elites cerca del streamer.',
                        amount: '2'
                    },
                    {
                        id: 'map-swap',
                        label: 'Portal Aleatorio',
                        description: 'Teletransporta al grupo a un mapa aleatorio.',
                        amount: '3'
                    },
                    {
                        id: 'boss-challenge',
                        label: 'Llamado del Jefe',
                        description: 'Invoca un jefe errante con botin raro.',
                        amount: '4.5'
                    }
                ]
            },
            streamers: [
                {
                    id: 'luna-fox',
                    name: 'LunaFox',
                    activity: 'Progresando incursiones nocturnas con la hermandad.',
                    viewers: 842,
                    tags: [
                        'PvE',
                        'Speedrun'
                    ]
                },
                {
                    id: 'ember-knight',
                    name: 'EmberKnight',
                    activity: 'Duelos de arena y teoria de builds.',
                    viewers: 613,
                    tags: [
                        'PvP',
                        'Builds'
                    ]
                },
                {
                    id: 'nova-mage',
                    name: 'NovaMage',
                    activity: 'Desatando eventos de caos a pedido.',
                    viewers: 455,
                    tags: [
                        'Eventos',
                        'Co-op'
                    ]
                }
            ]
        },
        playerSelection: {
            selectLabel: 'Seleccionar Personaje',
            selectSubmit: 'Iniciar',
            createTitle: 'Crear Personaje',
            createNameLabel: 'Nombre',
            createSubmit: 'Crear y comenzar',
            loadingAlt: 'Cargando...'
        },
        playerCreation: {
            loadingAlt: 'Cargando...'
        },
        footer: 'by DwDeveloper'
    },
    vi: {
        nav: {
            home: [],
            streamer: [
                {
                    route: '/',
                    label: 'Chon vai tro'
                },
                {
                    route: '/streamer/login',
                    label: 'Dang nhap'
                },
                {
                    route: '/streamer/signup',
                    label: 'Dang ky'
                },
                {
                    route: '/streamer/forgot',
                    label: 'Quen mat khau'
                }
            ],
            viewer: [
                {
                    route: '/',
                    label: 'Quay lai chon vai tro'
                }
            ],
            guest: [
                {
                    route: '/',
                    label: 'Quay lai chon vai tro'
                }
            ]
        },
        disclaimer: [
            'Luu y: Reldens khong chi la mot tro choi, day la nen tang de tao game.',
            'Ban demo nay giup ban kham pha so luong tinh nang hien co tren nen tang.'
        ],
        roles: {
            title: 'Chon vai tro cua ban',
            subtitle: 'Quyet dinh cach ban buoc vao the gioi Reldens.',
            note: 'Tinh nang blockchain dang phat trien. Donates hien chi la mo phong.',
            cards: [
                {
                    key: 'streamer',
                    route: '/streamer/login',
                    title: 'Streamer',
                    icon: 'S',
                    description: 'Phat truc tiep hanh trinh cua ban va nhan buff tu nguoi xem.',
                    highlights: [
                        'Lien ket kenh YouTube de tu dong phat khi dang nhap.',
                        'Nguoi xem dung SOL de tang suc manh hoac tao su kien.',
                        'Quan ly tai khoan va tien trinh day du.'
                    ],
                    action: 'Toi la streamer'
                },
                {
                    key: 'viewer',
                    route: '/viewer',
                    title: 'Viewer',
                    icon: 'V',
                    description: 'Theo doi streamer va tac dong tran dau bang donate SOL.',
                    highlights: [
                        'Ket noi vi SOL (demo) thong qua ethers.js.',
                        'Chon buff hoac su kien tu danh sach goi y.',
                        'Xem truc tiep ngay tren trinh duyet.'
                    ],
                    action: 'Vao voi tu cach viewer'
                },
                {
                    key: 'guest',
                    route: '/guest',
                    title: 'Guest',
                    icon: 'G',
                    description: 'Choi thu ban demo ma khong can tai khoan hay vi.',
                    highlights: [
                        'Tao nhan vat tam thoi va vao game ngay.',
                        'Thu nghiem he thong chien dau va ky nang.',
                        'Co the nang cap len tai khoan day du sau nay.'
                    ],
                    action: 'Choi che do khach'
                }
            ],
            emptyState: 'Dang tai danh sach vai tro. Vui long cho giay lat.'
        },
        guest: {
            title: 'Choi voi tu cach Khach',
            usernameLabel: 'Ten nguoi choi',
            submit: 'Bat dau',
            loadingAlt: 'Dang tai...'
        },
        register: {
            title: 'Tao tai khoan',
            emailLabel: 'Email',
            usernameLabel: 'Ten nguoi dung',
            passwordLabel: 'Mat khau',
            rePasswordLabel: 'Nhap lai mat khau',
            termsLink: 'Dong y Dieu khoan va Dieu kien (bam vao day).',
            submit: 'Dang ky',
            loadingAlt: 'Dang tai...'
        },
        login: {
            title: 'Dang nhap',
            usernameLabel: 'Ten nguoi dung',
            passwordLabel: 'Mat khau',
            submit: 'Xac nhan',
            loadingAlt: 'Dang tai...'
        },
        streamer: {
            loginTitle: 'Dang nhap streamer',
            loginSubtitle: 'Dang nhap va dong bo cong cu stream cua ban.',
            youtube: {
                heading: 'Lien ket kenh YouTube',
                description: 'Nhap URL kenh va stream key de chung toi tu dong bat live khi ban vao game.',
                fields: {
                    channelLabel: 'URL kenh',
                    streamKeyLabel: 'Stream key',
                    autoStartLabel: 'Tu dong bat stream khi dang nhap'
                },
                linkCta: 'Lien ket YouTube',
                unlinkCta: 'Ngat ket noi',
                connected: 'Da lien ket kenh. Stream se bat khi ban vao the gioi.',
                disconnected: 'Da huy lien ket. Tu dong stream bi tat.',
                helper: 'Stream key chi duoc luu tren thiet bi nay, khong gui len server.',
                learnMore: 'https://support.google.com/youtube/answer/2474026',
                learnMoreLabel: 'Huong dan YouTube Live',
                steps: [
                    'Kiem tra tai khoan YouTube da bat che do Live.',
                    'Su dung stream key giong trong phan mem ma ban cau hinh.',
                    'Giu tab nay mo trong luc phat truc tiep de duy tri ket noi.'
                ],
                status: {
                    idle: 'Chua lien ket',
                    linked: 'Da ket noi'
                }
            }
        },
        forgot: {
            title: 'Quen mat khau',
            emailLabel: 'Email',
            submit: 'Gui yeu cau',
            loadingAlt: 'Dang tai...'
        },
        firebase: {
            title: 'Dang ky qua Firebase',
            usernameLabel: 'Ten nguoi dung',
            loadingAlt: 'Dang tai...'
        },
        terms: {
            heading: 'Dieu khoan va Dieu kien',
            acceptLabel: 'Toi dong y voi Dieu khoan nay'
        },
        instructions: {
            heading: 'Huong dan',
            steps: [
                'Di chuyen bang phim mui ten hoac W-A-S-D.',
                'Click chuot trai de di chuyen, di qua diem chuyen map de sang canh khac.',
                'Click chuot phai hoac TAB de chon muc tieu gan.',
                'Can co muc tieu truoc khi tung ky nang.',
                'Dung cac nut tren man hinh de kich hoat ky nang.'
            ]
        },
        gameOver: [
            'Ban da nga guc!',
            'Hay cho trong giay lat...',
            'Ban se duoc hoi sinh tu dong trong ban demo nay!'
        ],
        viewer: {
            title: 'Ho tro streamer',
            subtitle: 'Chon kenh, theo doi va dung SOL de tac dong tran dau.',
            note: 'Tinh nang blockchain se som ra mat. Day la giao dien thu nghiem.',
            wallet: {
                title: 'Vi cua ban',
                description: 'Ket noi vi tuong thich SOL thong qua ethers.js de mo phong donate.',
                connectCta: 'Ket noi vi',
                disconnectCta: 'Ngat ket noi',
                connected: 'Da ket noi vi. Ban co the donate SOL.',
                disconnected: 'Da ngat ket noi vi.',
                noProvider: 'Khong tim thay vi Web3. Hay cai dat Phantom hoac MetaMask.',
                error: 'Khong the ket noi vi. Vui long thu lai.',
                connectPrompt: 'Hay ket noi vi truoc khi donate.',
                status: {
                    idle: 'Trang thai: chua ket noi',
                    connecting: 'Trang thai: dang ket noi...',
                    connected: 'Trang thai: da ket noi',
                    error: 'Trang thai: loi'
                },
                labels: {
                    address: 'Dia chi vi',
                    network: 'Mang',
                    balance: 'So du'
                }
            },
            viewerCountLabel: '{count} nguoi dang xem',
            streamListTitle: 'Kenh dang truc tiep',
            donations: {
                buffTitle: 'Donate buff',
                eventTitle: 'Donate su kien',
                donateCta: 'Donate {amount} SOL',
                requiresWallet: 'Ket noi vi de mo khoa tinh nang donate.',
                success: 'Da ghi nhan goi {option} cho {streamer}. Se kich hoat khi nhan {amount} SOL.',
                buffOptions: [
                    {
                        id: 'atk-boost',
                        label: 'Suc manh Mat Troi',
                        description: 'Tang sat thuong 25% trong 3 phut.',
                        amount: '1'
                    },
                    {
                        id: 'heal-pulse',
                        label: 'Xung Ho Ve',
                        description: 'Hoi 40% HP va nhan la chan bao ve.',
                        amount: '1.5'
                    },
                    {
                        id: 'speed',
                        label: 'Cuon Gio',
                        description: 'Tang toc do di chuyen 35% trong 2 phut.',
                        amount: '0.8'
                    }
                ],
                eventOptions: [
                    {
                        id: 'spawn-elites',
                        label: 'Phuc kich Tinh Anh',
                        description: 'Trieu hoi 3 quai tinh anh gan streamer.',
                        amount: '2'
                    },
                    {
                        id: 'map-swap',
                        label: 'Cong Dich Chuyen',
                        description: 'Dua to doi den mot ban do ngau nhien.',
                        amount: '3'
                    },
                    {
                        id: 'boss-challenge',
                        label: 'Keu goi Tru Boss',
                        description: 'Trieu hoi boss lang thang voi nhieu vat pham hiem.',
                        amount: '4.5'
                    }
                ]
            },
            streamers: [
                {
                    id: 'luna-fox',
                    name: 'LunaFox',
                    activity: 'Chinh phuc raid dem cung bang hoi.',
                    viewers: 842,
                    tags: [
                        'PvE',
                        'Speedrun'
                    ]
                },
                {
                    id: 'ember-knight',
                    name: 'EmberKnight',
                    activity: 'Dau tay doi va phan tich build.',
                    viewers: 613,
                    tags: [
                        'PvP',
                        'Builds'
                    ]
                },
                {
                    id: 'nova-mage',
                    name: 'NovaMage',
                    activity: 'Gay hon loan voi cac su kien dot xuat.',
                    viewers: 455,
                    tags: [
                        'Events',
                        'Co-op'
                    ]
                }
            ]
        },
        playerSelection: {
            selectLabel: 'Chon nhan vat',
            selectSubmit: 'Bat dau',
            createTitle: 'Tao nhan vat',
            createNameLabel: 'Ten nhan vat',
            createSubmit: 'Tao va choi',
            loadingAlt: 'Dang tai...'
        },
        playerCreation: {
            loadingAlt: 'Dang tai...'
        },
        footer: 'by DwDeveloper'
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"fs3R3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
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

},{}],"26B9n":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const LoginPage = ({ copy, variant = 'default' })=>{
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-40';
    const inputClass = 'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';
    const isStreamerMode = variant === 'streamer';
    const streamerCopy = copy.streamer || {};
    const youtubeCopy = streamerCopy.youtube || {};
    const hasYoutubeConfig = isStreamerMode && Object.keys(youtubeCopy).length > 0;
    const loginTitle = isStreamerMode && streamerCopy.loginTitle ? streamerCopy.loginTitle : copy.login.title;
    const loginSubtitle = isStreamerMode ? streamerCopy.loginSubtitle : null;
    const [youtubeStatus, setYoutubeStatus] = (0, _react.useState)('idle');
    const [youtubeMessage, setYoutubeMessage] = (0, _react.useState)('');
    const youtubeStatusLabel = (0, _react.useMemo)(()=>{
        if (!hasYoutubeConfig) return '';
        return youtubeCopy.status?.[youtubeStatus] || youtubeCopy.status?.idle || '';
    }, [
        hasYoutubeConfig,
        youtubeCopy.status,
        youtubeStatus
    ]);
    const handleYoutubeConnect = (event)=>{
        event.preventDefault();
        if (!hasYoutubeConfig) return;
        if (youtubeStatus === 'linked') {
            setYoutubeStatus('idle');
            setYoutubeMessage(youtubeCopy.disconnected || 'YouTube channel disconnected.');
            return;
        }
        setYoutubeStatus('linked');
        setYoutubeMessage(youtubeCopy.connected || 'YouTube channel linked. Streaming will auto-start.');
    };
    const youtubeBadgeClasses = youtubeStatus === 'linked' ? 'inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200' : 'inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200';
    const youtubeButtonLabel = youtubeStatus === 'linked' ? youtubeCopy.unlinkCta || 'Disconnect' : youtubeCopy.linkCta || 'Link YouTube';
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
        className: "row row-1 w-full !max-w-none !bg-transparent !p-0 !shadow-none",
        children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
            className: "grid w-full gap-6 xl:grid-cols-[1.05fr,_0.95fr]",
            children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
                    name: "login-form",
                    id: "login-form",
                    className: "login-form space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
                    action: "#",
                    method: "post",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                    className: "form-title text-left text-2xl font-semibold text-white",
                                    children: loginTitle
                                }),
                                loginSubtitle && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                    className: "text-sm text-slate-300",
                                    children: loginSubtitle
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                            className: "input-box login-username flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                            children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                    htmlFor: "username",
                                    className: labelClass,
                                    children: copy.login.usernameLabel
                                }),
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                    type: "text",
                                    name: "username",
                                    id: "username",
                                    className: inputClass,
                                    required: true,
                                    autoComplete: "on"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                            className: "input-box login-password flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                            children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                    htmlFor: "password",
                                    className: labelClass,
                                    children: copy.login.passwordLabel
                                }),
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                    type: "password",
                                    name: "password",
                                    id: "password",
                                    className: inputClass,
                                    required: true
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                            className: "input-box submit-container login-submit flex items-center justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                    className: "loading-container hidden",
                                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("img", {
                                        src: "./assets/web/loading.gif",
                                        alt: copy.login.loadingAlt
                                    })
                                }),
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                    type: "submit",
                                    value: copy.login.submit,
                                    className: "rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                            className: "input-box response-error text-sm text-rose-400"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "flex flex-col gap-6",
                    children: [
                        hasYoutubeConfig && /*#__PURE__*/ (0, _jsxRuntime.jsxs)("section", {
                            className: "space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
                            children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                                    className: "text-xl font-semibold text-white",
                                                    children: youtubeCopy.heading
                                                }),
                                                youtubeStatusLabel && /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                    className: youtubeBadgeClasses,
                                                    children: youtubeStatusLabel
                                                })
                                            ]
                                        }),
                                        youtubeCopy.description && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                            className: "text-sm text-slate-300",
                                            children: youtubeCopy.description
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
                                    className: "space-y-4",
                                    onSubmit: handleYoutubeConnect,
                                    children: [
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "flex flex-col gap-2 text-sm text-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                                    htmlFor: "youtube-channel",
                                                    className: "font-semibold",
                                                    children: youtubeCopy.fields?.channelLabel
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                    type: "url",
                                                    id: "youtube-channel",
                                                    name: "youtube-channel",
                                                    className: inputClass,
                                                    placeholder: "https://youtube.com/@your-channel",
                                                    required: true
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "flex flex-col gap-2 text-sm text-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                                    htmlFor: "youtube-stream-key",
                                                    className: "font-semibold",
                                                    children: youtubeCopy.fields?.streamKeyLabel
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                    type: "text",
                                                    id: "youtube-stream-key",
                                                    name: "youtube-stream-key",
                                                    className: inputClass,
                                                    placeholder: "STREAM-XXXX-YYYY-ZZZZ",
                                                    required: true
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "flex items-center gap-2 text-sm text-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                    type: "checkbox",
                                                    id: "youtube-auto-start",
                                                    name: "youtube-auto-start",
                                                    className: "h-4 w-4 rounded border-white/30 bg-slate-900/70 text-sky-500 focus:ring-sky-500/50",
                                                    defaultChecked: true
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                                    htmlFor: "youtube-auto-start",
                                                    className: "cursor-pointer select-none",
                                                    children: youtubeCopy.fields?.autoStartLabel
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                                                    type: "submit",
                                                    className: "inline-flex items-center justify-center rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400",
                                                    children: youtubeButtonLabel
                                                }),
                                                youtubeCopy.learnMore && /*#__PURE__*/ (0, _jsxRuntime.jsx)("a", {
                                                    className: "text-xs font-semibold uppercase tracking-wide text-slate-300 hover:text-white hover:underline",
                                                    href: youtubeCopy.learnMore,
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    children: youtubeCopy.learnMoreLabel || 'Docs'
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                Array.isArray(youtubeCopy.steps) && youtubeCopy.steps.length > 0 && /*#__PURE__*/ (0, _jsxRuntime.jsx)("ul", {
                                    className: "space-y-2 text-xs text-slate-400",
                                    children: youtubeCopy.steps.map((step)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)("li", {
                                            className: "flex items-start gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                    className: "mt-1 inline-block h-2 w-2 rounded-full bg-rose-400"
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                    children: step
                                                })
                                            ]
                                        }, step))
                                }),
                                youtubeMessage && /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                    className: "rounded-2xl border border-sky-400/40 bg-sky-500/10 p-3 text-xs text-sky-100",
                                    children: youtubeMessage
                                }),
                                youtubeCopy.helper && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                    className: "text-xs text-slate-400",
                                    children: youtubeCopy.helper
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                            className: "row row-2 firebase-row-container hidden !max-w-none !bg-slate-900/60 !p-6 !shadow-xl space-y-4 rounded-2xl border border-white/10 backdrop-blur",
                            children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
                                    name: "firebase-login",
                                    id: "firebase-login",
                                    className: "firebase-login space-y-4",
                                    action: "#",
                                    method: "post",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                            className: "form-title text-xl font-semibold text-white",
                                            children: copy.firebase.title
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "input-box firebase-username flex flex-col gap-2 text-sm text-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                                                    htmlFor: "firebase-username",
                                                    className: "font-semibold",
                                                    children: copy.firebase.usernameLabel
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                                                    type: "text",
                                                    name: "firebase-username",
                                                    id: "firebase-username",
                                                    className: inputClass,
                                                    required: true
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                            className: "input-box response-error text-sm text-rose-400"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                    className: "firebase-container flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/20 bg-slate-900/30 p-4",
                                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                        id: "firebaseui-auth-container",
                                        className: "w-full"
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
exports.default = LoginPage;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"ch8OQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const SignupPage = ({ copy })=>{
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-44';
    const inputClass = 'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
        className: "row row-1 w-full !max-w-none !bg-transparent !p-0 !shadow-none",
        children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
            name: "register-form",
            id: "register-form",
            className: "register-form mx-auto w-full max-w-3xl space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
            action: "#",
            method: "post",
            children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                    className: "form-title text-left text-2xl font-semibold text-white",
                    children: copy.register.title
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box reg-email flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                            htmlFor: "reg-email",
                            className: labelClass,
                            children: copy.register.emailLabel
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "email",
                            name: "reg-email",
                            id: "reg-email",
                            className: inputClass,
                            required: true
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box reg-username flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                            htmlFor: "reg-username",
                            className: labelClass,
                            children: copy.register.usernameLabel
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "text",
                            name: "reg-username",
                            id: "reg-username",
                            className: inputClass,
                            required: true
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box reg-password flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                            htmlFor: "reg-password",
                            className: labelClass,
                            children: copy.register.passwordLabel
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "password",
                            name: "reg-password",
                            id: "reg-password",
                            className: inputClass,
                            required: true
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box reg-re-password flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                            htmlFor: "reg-re-password",
                            className: labelClass,
                            children: copy.register.rePasswordLabel
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "password",
                            name: "reg-re-password",
                            id: "reg-re-password",
                            className: inputClass,
                            required: true
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                    className: "input-box hidden terms-and-conditions-link-container justify-end",
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                        className: "terms-and-conditions-link cursor-pointer text-sm text-slate-300 underline",
                        children: copy.register.termsLink
                    })
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box submit-container reg-submit flex items-center justify-end gap-3",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                            className: "loading-container hidden",
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("img", {
                                src: "./assets/web/loading.gif",
                                alt: copy.register.loadingAlt
                            })
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "submit",
                            value: copy.register.submit,
                            className: "rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                    className: "input-box response-error text-sm text-rose-400"
                })
            ]
        })
    });
};
exports.default = SignupPage;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"cQXZ0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const GuestPage = ({ copy })=>{
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-48';
    const inputClass = 'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
        className: "row row-0 w-full !max-w-xl !bg-transparent !p-0 !shadow-none",
        children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
            name: "guest-form",
            id: "guest-form",
            className: "guest-form w-full space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
            action: "#",
            method: "post",
            children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                    className: "form-title text-center text-2xl font-semibold text-white md:text-left",
                    children: copy.guest.title
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box guest-username flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                            htmlFor: "guest-username",
                            className: labelClass,
                            children: copy.guest.usernameLabel
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "text",
                            name: "guest-username",
                            id: "guest-username",
                            className: inputClass,
                            required: true
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box submit-container guest-submit flex items-center justify-center gap-3 md:justify-end",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                            className: "loading-container hidden",
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("img", {
                                src: "./assets/web/loading.gif",
                                alt: copy.guest.loadingAlt
                            })
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "submit",
                            value: copy.guest.submit,
                            className: "rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                    className: "input-box response-error text-sm text-rose-400"
                })
            ]
        })
    });
};
exports.default = GuestPage;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"cLH0w":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const ForgotPasswordPage = ({ copy })=>{
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-44';
    const inputClass = 'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
        className: "row row-2 forgot-password-container w-full !max-w-xl !bg-transparent !p-0 !shadow-none",
        children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("form", {
            name: "forgot-form",
            id: "forgot-form",
            className: "forgot-form w-full space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
            action: "#",
            method: "post",
            children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                    className: "form-title text-center text-2xl font-semibold text-white md:text-left",
                    children: copy.forgot.title
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box forgot-email flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("label", {
                            htmlFor: "forgot-email",
                            className: labelClass,
                            children: copy.forgot.emailLabel
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "email",
                            name: "forgot-email",
                            id: "forgot-email",
                            className: inputClass,
                            required: true
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                    className: "input-box submit-container forgot-submit flex items-center justify-end gap-3",
                    children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                            className: "loading-container hidden",
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)("img", {
                                src: "./assets/web/loading.gif",
                                alt: copy.forgot.loadingAlt
                            })
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("input", {
                            type: "submit",
                            value: copy.forgot.submit,
                            className: "rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                    className: "input-box response-error text-sm text-rose-400"
                })
            ]
        })
    });
};
exports.default = ForgotPasswordPage;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"dvwex":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const RoleSelectionPage = ({ copy, onSelect })=>{
    const rolesCopy = copy?.roles || {};
    const cards = Array.isArray(rolesCopy.cards) ? rolesCopy.cards : [];
    const handleSelect = (route)=>{
        if (typeof onSelect === 'function') onSelect(route);
    };
    return /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("header", {
                className: "mx-auto max-w-3xl text-center",
                children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("h2", {
                        className: "text-3xl font-semibold text-white md:text-4xl",
                        children: rolesCopy.title
                    }),
                    rolesCopy.subtitle && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                        className: "mt-3 text-sm text-slate-300 md:text-base",
                        children: rolesCopy.subtitle
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                className: "mt-10 grid w-full gap-6 lg:grid-cols-3",
                children: cards.length > 0 ? cards.map((card)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)("article", {
                        className: "flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-sky-500/20",
                        children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-300",
                                                children: card.icon || '*'
                                            }),
                                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                                className: "text-xl font-semibold text-white",
                                                children: card.title
                                            })
                                        ]
                                    }),
                                    card.description && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                        className: "mt-4 text-sm text-slate-300",
                                        children: card.description
                                    }),
                                    Array.isArray(card.highlights) && card.highlights.length > 0 && /*#__PURE__*/ (0, _jsxRuntime.jsx)("ul", {
                                        className: "mt-4 space-y-2 text-sm text-slate-300",
                                        children: card.highlights.map((highlight)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)("li", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                        className: "mt-1 inline-block h-2 w-2 rounded-full bg-sky-400"
                                                    }),
                                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                        children: highlight
                                                    })
                                                ]
                                            }, highlight))
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                                type: "button",
                                className: "mt-6 inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400",
                                onClick: ()=>handleSelect(card.route || '/streamer/login'),
                                children: card.action
                            })
                        ]
                    }, card.key || card.route)) : /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                    className: "col-span-full rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-center text-sm text-slate-300",
                    children: rolesCopy.emptyState || 'No roles available right now.'
                })
            }),
            rolesCopy.note && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                className: "mt-8 text-center text-xs text-slate-400",
                children: rolesCopy.note
            })
        ]
    });
};
exports.default = RoleSelectionPage;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"d1kaJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _ethers = require("ethers");
const shortenAddress = (value)=>{
    if (!value || value.length <= 10) return value || '';
    return `${value.slice(0, 6)}...${value.slice(-4)}`;
};
const ViewerPage = ({ copy })=>{
    const viewerCopy = copy?.viewer || {};
    const walletCopy = viewerCopy.wallet || {};
    const donationCopy = viewerCopy.donations || {};
    const streamers = (0, _react.useMemo)(()=>{
        if (Array.isArray(viewerCopy.streamers) && viewerCopy.streamers.length > 0) return viewerCopy.streamers;
        return [
            {
                id: 'luna-fox',
                name: 'LunaFox',
                activity: 'Exploring the Lost Forest',
                viewers: 842,
                tags: [
                    'PvE',
                    'Speedrun'
                ]
            },
            {
                id: 'ember-knight',
                name: 'EmberKnight',
                activity: 'Arena runs and gear checks',
                viewers: 613,
                tags: [
                    'PvP',
                    'Builds'
                ]
            },
            {
                id: 'nova-mage',
                name: 'NovaMage',
                activity: 'Summoning chaos events',
                viewers: 455,
                tags: [
                    'Events',
                    'Co-op'
                ]
            }
        ];
    }, [
        viewerCopy.streamers
    ]);
    const buffOptions = Array.isArray(donationCopy.buffOptions) ? donationCopy.buffOptions : [];
    const eventOptions = Array.isArray(donationCopy.eventOptions) ? donationCopy.eventOptions : [];
    const providerRef = (0, _react.useRef)(null);
    const [wallet, setWallet] = (0, _react.useState)({
        address: '',
        balance: '',
        network: ''
    });
    const [status, setStatus] = (0, _react.useState)('idle');
    const [feedback, setFeedback] = (0, _react.useState)('');
    const viewerCountLabel = (count)=>{
        const template = viewerCopy.viewerCountLabel || '{count} viewers';
        return template.replace('{count}', Number(count || 0).toLocaleString());
    };
    const formatDonationCta = (option)=>{
        const template = donationCopy.donateCta || 'Donate {amount} SOL';
        return template.replace('{amount}', option.amount);
    };
    const handleDonate = (streamer, option)=>{
        if (status !== 'connected') {
            setFeedback(donationCopy.requiresWallet || walletCopy.connectPrompt || 'Please connect your wallet before donating.');
            return;
        }
        const template = donationCopy.success || 'Request {option} for {streamer} registered. It will trigger once {amount} SOL is received.';
        const message = template.replace('{option}', option.label).replace('{streamer}', streamer.name).replace('{amount}', option.amount);
        setFeedback(message);
    };
    const connectWallet = async ()=>{
        setFeedback('');
        if (typeof window === 'undefined' || !window.ethereum) {
            setFeedback(walletCopy.noProvider || 'No Web3 wallet detected in your browser.');
            return;
        }
        try {
            setStatus('connecting');
            const browserProvider = new (0, _ethers.BrowserProvider)(window.ethereum);
            const accounts = await browserProvider.send('eth_requestAccounts', []);
            const address = accounts?.[0] || '';
            const network = await browserProvider.getNetwork();
            let balance = '0';
            if (address) {
                const rawBalance = await browserProvider.getBalance(address);
                balance = (0, _ethers.formatEther)(rawBalance);
            }
            providerRef.current = browserProvider;
            setWallet({
                address,
                balance,
                network: network?.name || `chain-${network?.chainId ?? ''}`
            });
            setStatus('connected');
            setFeedback(walletCopy.connected || 'Wallet connected. You can donate now.');
        } catch (error) {
            console.error('Wallet connect error:', error);
            setStatus('error');
            setFeedback(walletCopy.error || 'Could not connect wallet. Please try again.');
        }
    };
    const disconnectWallet = ()=>{
        providerRef.current = null;
        setWallet({
            address: '',
            balance: '',
            network: ''
        });
        setStatus('idle');
        setFeedback(walletCopy.disconnected || 'Wallet disconnected.');
    };
    const statusLabel = walletCopy.status?.[status] || walletCopy.status?.idle || '';
    return /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("header", {
                className: "mx-auto max-w-3xl text-center",
                children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("h2", {
                        className: "text-3xl font-semibold text-white md:text-4xl",
                        children: viewerCopy.title
                    }),
                    viewerCopy.subtitle && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                        className: "mt-3 text-sm text-slate-300 md:text-base",
                        children: viewerCopy.subtitle
                    }),
                    viewerCopy.note && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                        className: "mt-2 text-xs uppercase tracking-wide text-slate-400",
                        children: viewerCopy.note
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("section", {
                className: "mt-8 w-full rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                        className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                                        className: "text-xl font-semibold text-white",
                                        children: walletCopy.title
                                    }),
                                    walletCopy.description && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                        className: "mt-2 text-sm text-slate-300",
                                        children: walletCopy.description
                                    }),
                                    statusLabel && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                        className: "mt-3 text-xs uppercase tracking-wide text-sky-300",
                                        children: statusLabel
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                                className: "flex gap-3",
                                children: status === 'connected' ? /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                                    type: "button",
                                    className: "rounded-full border border-rose-400/40 bg-rose-500/20 px-5 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/30",
                                    onClick: disconnectWallet,
                                    children: walletCopy.disconnectCta || 'Disconnect'
                                }) : /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                                    type: "button",
                                    className: "rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400",
                                    onClick: connectWallet,
                                    children: walletCopy.connectCta || 'Connect wallet'
                                })
                            })
                        ]
                    }),
                    wallet.address && /*#__PURE__*/ (0, _jsxRuntime.jsxs)("dl", {
                        className: "mt-6 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200 md:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("dt", {
                                        className: "text-xs uppercase tracking-wide text-slate-400",
                                        children: walletCopy.labels?.address || 'Address'
                                    }),
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("dd", {
                                        className: "mt-1 font-mono text-sm",
                                        children: shortenAddress(wallet.address)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("dt", {
                                        className: "text-xs uppercase tracking-wide text-slate-400",
                                        children: walletCopy.labels?.network || 'Network'
                                    }),
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("dd", {
                                        className: "mt-1 text-sm capitalize",
                                        children: wallet.network
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("dt", {
                                        className: "text-xs uppercase tracking-wide text-slate-400",
                                        children: walletCopy.labels?.balance || 'Balance'
                                    }),
                                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)("dd", {
                                        className: "mt-1 text-sm",
                                        children: [
                                            Number(wallet.balance || 0).toFixed(4),
                                            " SOL"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            feedback && /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                className: "mt-6 w-full rounded-3xl border border-sky-400/40 bg-sky-500/10 p-4 text-sm text-sky-100",
                children: feedback
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)("section", {
                className: "mt-8 w-full space-y-6",
                children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("h3", {
                        className: "text-xl font-semibold text-white",
                        children: viewerCopy.streamListTitle
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)("div", {
                        className: "space-y-6",
                        children: streamers.map((streamer)=>/*#__PURE__*/ (0, _jsxRuntime.jsx)("article", {
                                className: "rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                    className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                            className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-200",
                                                            children: "LIVE"
                                                        }),
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("h4", {
                                                                    className: "text-lg font-semibold text-white",
                                                                    children: streamer.name
                                                                }),
                                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                                    className: "text-sm text-slate-300",
                                                                    children: streamer.activity
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("span", {
                                                            className: "rounded-full bg-white/5 px-3 py-1 text-slate-200",
                                                            children: viewerCountLabel(streamer.viewers)
                                                        }),
                                                        Array.isArray(streamer.tags) && streamer.tags.map((tag)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)("span", {
                                                                className: "rounded-full bg-white/5 px-3 py-1",
                                                                children: [
                                                                    "#",
                                                                    tag
                                                                ]
                                                            }, tag))
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                            className: "grid w-full gap-4 md:max-w-md",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "rounded-2xl border border-white/10 bg-slate-900/70 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("h5", {
                                                            className: "text-sm font-semibold text-sky-200",
                                                            children: donationCopy.buffTitle
                                                        }),
                                                        buffOptions.length > 0 ? /*#__PURE__*/ (0, _jsxRuntime.jsx)("ul", {
                                                            className: "mt-3 space-y-3 text-sm text-slate-200",
                                                            children: buffOptions.map((option)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)("li", {
                                                                    className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-3 md:flex-row md:items-center md:justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                                                    className: "font-semibold text-white",
                                                                                    children: option.label
                                                                                }),
                                                                                option.description && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                                                    className: "text-xs text-slate-400",
                                                                                    children: option.description
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                                                                            type: "button",
                                                                            className: "inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400",
                                                                            onClick: ()=>handleDonate(streamer, option),
                                                                            children: formatDonationCta(option)
                                                                        })
                                                                    ]
                                                                }, option.id))
                                                        }) : /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                            className: "mt-3 text-xs text-slate-400",
                                                            children: donationCopy.emptyBuffs || 'Buff options will appear here soon.'
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                    className: "rounded-2xl border border-white/10 bg-slate-900/70 p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("h5", {
                                                            className: "text-sm font-semibold text-amber-200",
                                                            children: donationCopy.eventTitle
                                                        }),
                                                        eventOptions.length > 0 ? /*#__PURE__*/ (0, _jsxRuntime.jsx)("ul", {
                                                            className: "mt-3 space-y-3 text-sm text-slate-200",
                                                            children: eventOptions.map((option)=>/*#__PURE__*/ (0, _jsxRuntime.jsxs)("li", {
                                                                    className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-3 md:flex-row md:items-center md:justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                                                    className: "font-semibold text-white",
                                                                                    children: option.label
                                                                                }),
                                                                                option.description && /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                                                    className: "text-xs text-slate-400",
                                                                                    children: option.description
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0, _jsxRuntime.jsx)("button", {
                                                                            type: "button",
                                                                            className: "inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-400",
                                                                            onClick: ()=>handleDonate(streamer, option),
                                                                            children: formatDonationCta(option)
                                                                        })
                                                                    ]
                                                                }, option.id))
                                                        }) : /*#__PURE__*/ (0, _jsxRuntime.jsx)("p", {
                                                            className: "mt-3 text-xs text-slate-400",
                                                            children: donationCopy.emptyEvents || 'Event options will appear here soon.'
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            }, streamer.id))
                    })
                ]
            })
        ]
    });
};
exports.default = ViewerPage;

},{"react/jsx-runtime":"react/jsx-runtime","react":"react","ethers":"ethers","@parcel/transformer-js/src/esmodule-helpers.js":"fs3R3"}],"8Z56p":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameManager
 *
 */ const { GameClient } = require("55a74e494f90a4c8");
const { GameEngine } = require("e1659045719735fa");
const { RoomEvents } = require("7e070495419bfe5");
const { ClientStartHandler } = require("e83aa34e2b827fc2");
const { FeaturesManager } = require("322c8efc1623d443");
const { FirebaseConnector } = require("8f517454d27b0a77");
const { ConfigManager } = require("ff73fbcc32d6158e");
const { TranslationsMapper } = require("81f43a8bd60c202e");
const Translations = require("7e64e865feb030ac");
const { GameDom } = require("4386d0f131680f0c");
const { RoomsConst } = require("7625764d2a36d26c");
const { GameConst } = require("cdbc04050856a902");
const { ErrorManager, EventsManagerSingleton, Logger, sc } = require("aa292ffa814895ee");
const PackageData = require("258c9fd5a0d6d180");
class GameManager {
    constructor(){
        // @NOTE: the game engine will be initialized after the user logged in the game that way we will get the full
        // game configuration from the server when the game starts.
        this.gameEngine = false;
        /** @type {?RoomEvents} */ this.activeRoomEvents = null; // active room is the currently connected server room
        this.events = EventsManagerSingleton;
        /** @type {GameDom} */ this.gameDom = GameDom;
        /** @type {ConfigManager} */ this.config = new ConfigManager();
        let initialConfig = this.gameDom.getWindow()?.reldensInitialConfig || {};
        sc.deepMergeProperties(this.config, initialConfig);
        this.features = new FeaturesManager({
            gameManager: this,
            events: this.events
        });
        this.firebase = new FirebaseConnector(this);
        this.joinedRooms = {};
        this.userData = {};
        this.plugins = {};
        this.services = {};
        this.elements = {};
        this.playerData = false;
        this.gameOver = false;
        this.forcedDisconnection = false;
        this.isChangingScene = false;
        this.canInitEngine = true;
        this.appServerUrl = '';
        this.gameServerUrl = '';
        this.locale = '';
        TranslationsMapper.forConfig(this.config.client, Translations, GameConst.MESSAGE.DATA_VALUES);
    }
    setupCustomClientPlugin(customPluginKey, customPlugin) {
        this.plugins[customPluginKey] = new customPlugin();
        this.plugins[customPluginKey].setup({
            gameManager: this,
            events: this.events
        });
    }
    clientStart() {
        this.events.emitSync('reldens.clientStartBefore', this);
        this.startHandler = new ClientStartHandler(this);
        this.startHandler.clientStart();
    }
    async startGame(formData, isNewUser) {
        this.events.emitSync('reldens.startGameBefore', this);
        let gameRoom = await this.joinGame(formData, isNewUser);
        if (gameRoom) {
            this.handleLoginSuccess();
            return true;
        }
        this.handleLoginError(formData);
        return false;
    }
    handleLoginSuccess() {
        let body = this.gameDom.getElement(GameConst.SELECTORS.BODY);
        body.classList.add(GameConst.CLASSES.GAME_STARTED);
        body.classList.remove(GameConst.CLASSES.GAME_ERROR);
        this.gameDom.getElement(GameConst.SELECTORS.FORMS_CONTAINER).remove();
        this.events.emitSync('reldens.startGameAfter', this);
    }
    handleLoginError(formData) {
        let body = this.gameDom.getElement(GameConst.SELECTORS.BODY);
        body.classList.remove(GameConst.CLASSES.GAME_STARTED);
        body.classList.add(GameConst.CLASSES.GAME_ERROR);
        // @NOTE: game room errors should be always because some wrong login or registration data. For these cases
        // we will check the isNewUser variable to know where display the error.
        this.submitedForm = false;
        this.events.emitSync('reldens.gameRoomError', this);
        // @TODO - BETA - Move to firebase plugin with an event subscriber.
        if (this.firebase && 'firebase-login' === formData.formId) this.firebase.app.auth().signOut();
    }
    async joinGame(formData, isNewUser = false) {
        // reset the user data in the object in case another form was used before:
        this.userData = {};
        await this.events.emit('reldens.beforeJoinGame', {
            gameManager: this,
            formData,
            isNewUser
        });
        this.mapFormDataToUserData(formData, isNewUser);
        // join initial game room, since we return the promise we don't need to catch the error here:
        this.gameRoom = await this.gameClient.joinOrCreate(GameConst.ROOM_GAME, this.userData);
        if (!this.gameRoom) {
            this.displayFormError('#' + formData.formId, this.gameClient.lastErrorMessage);
            return false;
        }
        await this.events.emit('reldens.beforeJoinGameRoom', this.gameRoom);
        this.handleGameRoomMessages();
        this.activateResponsiveBehavior();
        return this.gameRoom;
    }
    mapFormDataToUserData(formData, isNewUser) {
        if (sc.hasOwn(formData, 'forgot')) {
            this.userData.forgot = 1;
            this.userData.email = formData['email'];
        }
        this.initializeClient();
        if (!this.userData.clientVersion) this.userData.clientVersion = PackageData && PackageData.version ? PackageData.version : '0.0.0';
        if (formData.isGuest) {
            this.userData.isGuest = true;
            this.userData.isNewUser = true;
        }
        if (isNewUser) {
            this.userData.isNewUser = true;
            this.userData.email = formData['email'];
        }
        this.userData.username = formData['username'];
        this.userData.password = formData['password'];
    }
    handleGameRoomMessages() {
        this.gameRoom.onMessage('*', async (message)=>{
            if (message.error) {
                Logger.error('Game Room message error.', message.message);
                this.displayFormError(GameConst.SELECTORS.PLAYER_CREATE_FORM, message.message);
                return false;
            }
            if (GameConst.START_GAME === message.act) {
                this.initialGameData = message;
                return await this.beforeStartGame();
            }
            if (GameConst.CREATE_PLAYER_RESULT !== message.act) return false;
            this.initialGameData.player = message.player;
            let playerSelection = this.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECTION);
            if (playerSelection) playerSelection.classList.add('hidden');
            await this.initEngine();
        });
    }
    activateResponsiveBehavior() {
        this.events.on('reldens.afterSceneDynamicCreate', async ()=>{
            if (!this.config.getWithoutLogs('client/ui/screen/responsive', true)) return;
            this.gameEngine.updateGameSize(this);
            this.gameDom.getWindow().addEventListener('resize', ()=>{
                this.gameEngine.updateGameSize(this);
            });
        });
    }
    displayFormError(formId, message) {
        let errorElement = this.gameDom.getElement(formId + ' ' + GameConst.SELECTORS.RESPONSE_ERROR);
        if (!errorElement) return false;
        errorElement.innerHTML = message;
        let loadingContainer = this.gameDom.getElement(formId + ' ' + GameConst.SELECTORS.LOADING_CONTAINER);
        if (loadingContainer) loadingContainer?.classList.add(GameConst.CLASSES.HIDDEN);
        return true;
    }
    initializeClient() {
        this.appServerUrl = this.getAppServerUrl();
        this.gameServerUrl = this.getGameServerUrl();
        this.gameClient = new GameClient(this.gameServerUrl, this.config);
    }
    async beforeStartGame() {
        await this.events.emit('reldens.beforeInitEngineAndStartGame', this.initialGameData, this);
        if (!sc.hasOwn(this.initialGameData, 'gameConfig')) ErrorManager.error('Missing game configuration.');
        // apply the initial config to the processor:
        sc.deepMergeProperties(this.config, this.initialGameData?.gameConfig || {});
        this.userData.clientVersion = this.config.getWithoutLogs('client/gameEngine/version', this.userData.clientVersion);
        // features list:
        await this.features.loadFeatures(this.initialGameData?.features || {});
        await this.events.emit('reldens.beforeCreateEngine', this.initialGameData, this);
        if (!this.canInitEngine) return false;
        return await this.initEngine();
    }
    async initEngine() {
        // @NOTE we could leave the game room after the game initialized because at that point the user already
        // joined the scene room and this room doesn't listen for anything, BUT we keep it to track all logged users.
        // await this.gameRoom.leave();
        this.playerData = this.initialGameData?.player || false;
        if (!this.playerData || !this.playerData.state) return this.gameDom.alertReload(this.services?.translator.t('game.errors.missingPlayerData'));
        this.userData.selectedPlayer = this.playerData.id;
        let selectedScene = this.initialGameData?.selectedScene || '';
        this.userData.selectedScene = selectedScene;
        let config = this.initialGameData?.gameConfig || {};
        this.gameEngine = new GameEngine({
            config: config.client.gameEngine,
            events: this.events
        });
        // since the user is now registered:
        this.userData.isNewUser = false;
        // for guests use the password from the server:
        if (this.userData.isGuest) {
            if (this.initialGameData?.guestPassword) this.userData.password = this.initialGameData.guestPassword;
            if (this.initialGameData?.userName) this.userData.username = this.initialGameData.userName;
        }
        await this.joinFeaturesRooms();
        let useLastLocation = '' !== selectedScene && selectedScene !== RoomsConst.ROOM_LAST_LOCATION_KEY;
        let playerScene = useLastLocation ? selectedScene : this.playerData.state.scene;
        this.playerData.state.scene = playerScene;
        let joinedFirstRoom = await this.gameClient.joinOrCreate(playerScene, this.userData);
        if (!joinedFirstRoom) // @NOTE: the errors while trying to join a rooms/scene will always be originated in the
        // server. For these errors we will alert the user and reload the window automatically.
        return this.gameDom.alertReload(this.services?.translator.t('game.errors.joiningRoom', {
            joinRoomName: playerScene
        }));
        this.gameDom.getElement(GameConst.SELECTORS.BODY).classList.add(GameConst.CLASSES.GAME_ENGINE_STARTED);
        this.gameDom.getElement(GameConst.SELECTORS.GAME_CONTAINER).classList.remove(GameConst.CLASSES.HIDDEN);
        let playerSelection = this.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECTION);
        if (playerSelection) playerSelection.classList.add(GameConst.CLASSES.HIDDEN);
        // @NOTE: remove the selected scene after the player used it because the login data will be used again every
        // time the player change the scene.
        delete this.initialGameData['selectedScene'];
        delete this.userData['selectedScene'];
        await this.emitJoinedRoom(joinedFirstRoom, playerScene);
        this.activeRoomEvents = this.createRoomEventsInstance(playerScene);
        await this.events.emit('reldens.createdRoomsEventsInstance', joinedFirstRoom, this);
        await this.activeRoomEvents.activateRoom(joinedFirstRoom);
        await this.emitActivatedRoom(joinedFirstRoom, playerScene);
        await this.events.emit('reldens.afterInitEngineAndStartGame', this.initialGameData, joinedFirstRoom);
        return joinedFirstRoom;
    }
    async joinFeaturesRooms() {
        let featuresListKeys = Object.keys(this.features.featuresList);
        if (0 === featuresListKeys.length) return;
        let featuresRoomsNames = [];
        for (let i of featuresListKeys){
            let feature = this.features.featuresList[i];
            if (!sc.hasOwn(feature, 'joinRooms')) continue;
            for (let joinRoomName of feature.joinRooms){
                let joinedRoom = await this.gameClient.joinOrCreate(joinRoomName, this.userData);
                if (!joinedRoom) // @NOTE: any join room error will always be originated in the server. For these errors we
                // will alert the user and reload the window automatically. Here the received "data" will
                // be the actual error message.
                return this.gameDom.alertReload(this.services.translator.t('game.errors.joiningFeatureRoom', {
                    joinRoomName
                }));
                //Logger.debug('Joined room: '+joinRoomName);
                // after the room was joined added to the joinedRooms list:
                this.joinedRooms[joinRoomName] = joinedRoom;
                await this.emitJoinedRoom(joinedRoom, joinRoomName);
                featuresRoomsNames.push(joinRoomName);
            }
        }
        sc.deepMergeProperties(this.config, {
            client: {
                rooms: {
                    featuresRoomsNames
                }
            }
        });
    }
    async reconnectGameClient(message, previousRoom) {
        this.isChangingScene = true;
        let newRoomEvents = this.createRoomEventsInstance(message.player.state.scene);
        this.gameClient.joinOrCreate(newRoomEvents.roomName, this.userData).then(async (sceneRoom)=>{
            // leave old room:
            previousRoom.leave();
            this.activeRoomEvents = newRoomEvents;
            this.room = sceneRoom;
            await this.emitJoinedRoom(sceneRoom, message.player.state.scene);
            // start listen to the new room events:
            await newRoomEvents.activateRoom(sceneRoom, message.prev);
            await this.emitActivatedRoom(sceneRoom, message.player.state.scene);
        }).catch((error)=>{
            // @NOTE: the errors while trying to reconnect will always be originated in the server. For these errors we
            // will alert the user and reload the window automatically.
            Logger.error('Reconnect Game Client error.', {
                error,
                message,
                previousRoom
            });
            this.gameDom.alertReload(this.services.translator.t('game.errors.reconnectClient'));
        });
    }
    async emitActivatedRoom(sceneRoom, playerScene) {
        await this.events.emit('reldens.activatedRoom', sceneRoom, this);
        await this.events.emit('reldens.activatedRoom_' + playerScene, sceneRoom, this);
    }
    async emitJoinedRoom(sceneRoom, playerScene) {
        await this.events.emit('reldens.joinedRoom', sceneRoom, this);
        await this.events.emit('reldens.joinedRoom_' + playerScene, sceneRoom, this);
    }
    /**
     * @param roomName
     * @returns {RoomEvents}
     */ createRoomEventsInstance(roomName) {
        return new RoomEvents(roomName, this);
    }
    getAppServerUrl() {
        if ('' === this.appServerUrl) this.appServerUrl = this.getUrlFromCurrentReferer();
        return this.appServerUrl;
    }
    getGameServerUrl() {
        if ('' === this.gameServerUrl) this.gameServerUrl = this.getUrlFromCurrentReferer(true);
        return this.gameServerUrl;
    }
    getUrlFromCurrentReferer(useWebSocket = false) {
        let location = this.gameDom.getWindow().location;
        let protocol = location.protocol;
        if (useWebSocket) protocol = 0 === protocol.indexOf('https') ? 'wss:' : 'ws:';
        return protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    }
    getActiveScene() {
        return this.activeRoomEvents.getActiveScene();
    }
    getActiveScenePreloader() {
        return this.gameEngine.scene.getScene(GameConst.SCENE_PRELOADER + this.getActiveScene().key);
    }
    /**
     * @returns {PlayerEngine|boolean}
     */ getCurrentPlayer() {
        let activeScene = this.getActiveScene();
        if (!activeScene) //Logger.debug('Missing active scene.');
        return false;
        return activeScene.player;
    }
    currentPlayerName() {
        let currentPlayer = this.getCurrentPlayer();
        if (!currentPlayer) return '';
        return currentPlayer.player_id + ' - ' + currentPlayer.playerName;
    }
    getCurrentPlayerAnimation() {
        let current = this.getCurrentPlayer();
        return current.players[current.playerId];
    }
    getUiElement(uiName, logError = true) {
        let uiScene = sc.get(this.gameEngine, 'uiScene', false);
        if (uiScene) return uiScene.getUiElement(uiName, logError);
        if (logError) Logger.error('UI Scene not defined.');
        return false;
    }
    getFeature(featureKey) {
        let featuresList = this.features.featuresList;
        if (!sc.hasOwn(featuresList, featureKey)) {
            Logger.error('Feature key not defined.', featureKey);
            return false;
        }
        return featuresList[featureKey];
    }
    getAnimationByKey(key) {
        return this.getActiveScene().getAnimationByKey(key);
    }
}
module.exports.GameManager = GameManager;

},{"55a74e494f90a4c8":"9BGN6","e1659045719735fa":"aNZiy","7e070495419bfe5":"9QP8N","e83aa34e2b827fc2":"iXDUS","322c8efc1623d443":"ipTz2","8f517454d27b0a77":"j6xkc","ff73fbcc32d6158e":"gu7ES","81f43a8bd60c202e":"fKH2J","7e64e865feb030ac":"iItMC","4386d0f131680f0c":"ac0JX","7625764d2a36d26c":"4L11d","cdbc04050856a902":"iznl5","aa292ffa814895ee":"@reldens/utils","258c9fd5a0d6d180":"fbBe5"}],"9BGN6":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameClient
 *
 */ const { Client } = require("2be262c20fafb9eb");
const { RoomsConst } = require("9f899cb0243e6afa");
const { GameConst } = require("ae102ff36b5bc113");
const { Logger } = require("63836a3e936888c1");
class GameClient {
    constructor(serverUrl, config){
        this.serverUrl = serverUrl;
        this.config = config;
        this.autoConnectServerGameRoom = this.config.getWithoutLogs('client/rooms/autoConnectServerGameRoom', true);
        this.autoConnectServerFeatureRooms = this.config.getWithoutLogs('client/rooms/autoConnectServerFeatureRooms', true);
        this.roomsUrls = {};
        this.roomClients = {};
        this.gameRoomsByServer = {};
        this.featuresByServerFlag = {};
        this.featuresRoomsByServer = {};
        this.lastErrorMessage = '';
    }
    async joinOrCreate(roomName, options) {
        this.lastErrorMessage = '';
        try {
            let client = this.roomClient(roomName);
            if (!client) {
                Logger.error('Client not found for room name "' + roomName + '".');
                return false;
            }
            let roomUrl = this.roomsUrls[roomName];
            await this.connectToGlobalGameRoom(roomUrl, client, options);
            await this.connectToGlobalFeaturesRooms(roomUrl, client, options);
            return await client.joinOrCreate(roomName, options);
        } catch (error) {
            if (RoomsConst.ERRORS.CREATING_ROOM_AWAIT === error.message) {
                await new Promise((resolve)=>setTimeout(resolve, 500));
                return await this.joinOrCreate(roomName, options);
            }
            this.lastErrorMessage = error.message;
            // any connection errors will be handled in the higher level class
            Logger.error('Joining room error: ' + error.message);
        }
        return false;
    }
    async connectToGlobalGameRoom(roomUrl, client, options) {
        if (!this.autoConnectServerGameRoom) return;
        if ('' === roomUrl || this.serverUrl === roomUrl) {
            Logger.debug('Avoid connect to global game room.', this.serverUrl, roomUrl);
            return;
        }
        if (this.gameRoomsByServer[roomUrl]) return;
        Logger.debug('Registering GameRoom for server: ' + roomUrl);
        this.gameRoomsByServer[roomUrl] = await client.joinOrCreate(GameConst.ROOM_GAME, options);
        // required to avoid unregistered messages warning:
        this.gameRoomsByServer[roomUrl].onMessage('*', ()=>{});
    }
    async connectToGlobalFeaturesRooms(roomUrl, client, options) {
        if (!this.autoConnectServerFeatureRooms) return;
        if ('' === roomUrl || this.serverUrl === roomUrl) {
            Logger.debug('Avoid connect to features rooms.', this.serverUrl, roomUrl);
            return;
        }
        if (this.featuresByServerFlag[roomUrl]) return;
        Logger.debug('Registering features rooms for server: ' + roomUrl);
        this.featuresByServerFlag[roomUrl] = true;
        let featuresRoomsNames = this.config.getWithoutLogs('client/rooms/featuresRoomsNames', []);
        if (0 < featuresRoomsNames.length) return;
        this.featuresRoomsByServer[roomUrl] = {};
        for (let featureRoomName of featuresRoomsNames)this.featuresRoomsByServer[roomUrl][featureRoomName] = await client.joinOrCreate(featureRoomName, options);
    }
    roomClient(roomName) {
        if (!this.roomClients[roomName]) {
            this.roomsUrls[roomName] = this.config.getWithoutLogs('client/rooms/servers/' + roomName, this.serverUrl);
            Logger.debug('Creating client with URL "' + this.roomsUrls[roomName] + '" for room "' + roomName + '".');
            this.roomClients[roomName] = new Client(this.roomsUrls[roomName]);
        }
        return this.roomClients[roomName];
    }
}
module.exports.GameClient = GameClient;

},{"2be262c20fafb9eb":"colyseus.js","9f899cb0243e6afa":"4L11d","ae102ff36b5bc113":"iznl5","63836a3e936888c1":"@reldens/utils"}],"4L11d":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - rooms/constants
 *
 */ module.exports.RoomsConst = {
    ROOM_TYPE_SCENE: 'scene',
    ROOM_TYPE_LOGIN: 'login',
    ROOM_TYPE_GAME: 'game',
    TILE_INDEX: 'i',
    NEXT_SCENE: 'n',
    MAPS_BUCKET: '/assets/maps',
    ROOM_LAST_LOCATION_KEY: '@lastLocation',
    RETURN_POINT_KEYS: {
        DIRECTION: 'd',
        X: 'x',
        Y: 'y',
        DEFAULT: 'de',
        PREVIOUS: 'p'
    },
    ERRORS: {
        CREATING_ROOM_AWAIT: 'CREATING-ROOM-AWAIT'
    }
};

},{}],"iznl5":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameConst
 *
 */ module.exports.GameConst = {
    // @TODO - BETA - Move all the actions like "START_GAME" into ACTIONS property.
    START_GAME: 's',
    ACTION_KEY: 'act',
    CREATE_PLAYER: 'cp',
    CREATE_PLAYER_RESULT: 'cps',
    CHANGING_SCENE: 'cgs',
    CHANGED_SCENE: 'cs',
    RECONNECT: 'r',
    // @TODO - BETA - Move into "rooms" plugin.
    ROOM_GAME: 'room_game',
    ROOM_NAME_MAP: 'Map',
    SCENE_PRELOADER: 'ScenePreloader',
    PLAYER_STATS: 'ps',
    ICON_STATS: 'player-stats',
    CLIENT_JOINED: 'cj',
    UI: 'ui',
    CLOSE_UI_ACTION: 'closeUi',
    TYPE_PLAYER: 'pj',
    GAME_OVER: 'go',
    REVIVED: 'rv',
    BUTTON_OPTION: 'btn-opt',
    UI_BOX: 'box',
    UI_CLOSE: '-close',
    UI_OPEN: '-open',
    // @TODO - BETA - Move into DIRECTIONS property.
    UP: 'up',
    LEFT: 'left',
    DOWN: 'down',
    RIGHT: 'right',
    STOP: 'stop',
    POINTER: 'mp',
    ARROW_DOWN: 'ard',
    IMAGE_PLAYER: 'player',
    ACTIONS: {
        LOGIN_UPDATE_ERROR: 'luer'
    },
    STATUS: {
        ACTIVE: 1,
        DISABLED: 2,
        DEATH: 3,
        AVOID_INTERPOLATION: 4
    },
    STRUCTURE: {
        DEFAULT: 'default',
        ASSETS: 'assets',
        CSS: 'css',
        DIST: 'dist',
        THEME: 'theme',
        LIB: 'lib',
        SERVER: 'server',
        CLIENT: 'client',
        PLUGINS: 'plugins',
        INDEX: 'index.html',
        SCSS_FILE: 'styles.scss',
        CSS_FILE: 'styles.css',
        ADMIN: 'admin',
        TEMPLATES: 'templates',
        ADMIN_JS_FILE: 'reldens-admin-client.js',
        ADMIN_SCSS_FILE: 'reldens-admin-client.scss',
        ADMIN_CSS_FILE: 'reldens-admin-client.css',
        INSTALLER_FOLDER: 'install',
        INSTALL_LOCK: 'install.lock'
    },
    ROUTE_PATHS: {
        DISCONNECT_USER: '/reldens-disconnect-user',
        TERMS_AND_CONDITIONS: '/terms-and-conditions',
        MAILER: '/reldens-mailer-enabled',
        FIREBASE: '/reldens-firebase'
    },
    SELECTORS: {
        BODY: 'body',
        CANVAS: 'CANVAS',
        INPUT: 'input',
        FORMS_CONTAINER: '.forms-container',
        REGISTER_FORM: '#register-form',
        GUEST_FORM: '#guest-form',
        LOGIN_FORM: '#login-form',
        FORGOT_PASSWORD_FORM: '#forgot-form',
        PLAYER_CREATE_FORM: '.player-create-form',
        PLAYER_SELECTION: '#player-selection',
        PLAYER_SELECTION_FORM: '#player-selector-form',
        PLAYER_SELECT_ELEMENT: '#player-select-element',
        PLAYER_SELECTION_ADDITIONAL_INFO: '.player-selection-additional-info',
        FULL_SCREEN_BUTTON: '.full-screen-btn',
        RESPONSE_ERROR: '.response-error',
        LOADING_CONTAINER: '.loading-container',
        REGISTRATION: {
            PASSWORD: '#reg-password',
            RE_PASSWORD: '#reg-re-password',
            EMAIL: '#reg-email',
            USERNAME: '#reg-username'
        },
        GUEST: {
            USERNAME: '#guest-username'
        },
        LOGIN: {
            USERNAME: '#username',
            PASSWORD: '#password'
        },
        FORGOT_PASSWORD: {
            EMAIL: '#forgot-email',
            CONTAINER: '.forgot-password-container'
        },
        TERMS: {
            BOX: '#terms-and-conditions',
            CONTAINER: '.terms-and-conditions-container',
            LINK_CONTAINER: '.terms-and-conditions-link-container',
            LINK: '.terms-and-conditions-link',
            ACCEPT: '#accept-terms-and-conditions',
            ACCEPT_LABEL: '.accept-terms-and-conditions-label',
            HEADING: '.terms-heading',
            BODY: '.terms-body',
            CLOSE: '#terms-and-conditions-close'
        },
        GAME_CONTAINER: '.game-container',
        BUTTONS_CLOSE: '.box-close'
    },
    CLASSES: {
        HIDDEN: 'hidden',
        GAME_STARTED: 'game-started',
        GAME_ERROR: 'game-error',
        GAME_ENGINE_STARTED: 'game-engine-started',
        FULL_SCREEN_ON: 'full-screen-on'
    },
    MESSAGE: {
        DATA_VALUES: {
            NAMESPACE: 'game'
        }
    },
    LABELS: {
        YES: 'Yes',
        NO: 'No'
    },
    ANIMATIONS_TYPE: {
        SPRITESHEET: 'spritesheet'
    },
    FILES: {
        EXTENSIONS: {
            PNG: '.png'
        }
    },
    GRAPHICS: {
        FRAME_WIDTH: 32,
        FRAME_HEIGHT: 32
    },
    SHOW_PLAYER_TIME: {
        NONE: -1,
        ONLY_OWN_PLAYER: 0,
        ALL_PLAYERS: 2
    }
};

},{}],"aNZiy":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameEngine
 *
 */ const TemplateEngineRender = require("406accd1d723903a");
const { Game, Input } = require("99076ac36cb74ece");
const { FPSCounter } = require("4ae19ba325f82162");
const { GameConst } = require("70f28ffbc8fc65ca");
const { ObjectsConst } = require("5d4105d801ec7f71");
const { Logger, sc } = require("7d2d4851ffb4e4ae");
class GameEngine extends Game {
    constructor(props){
        super(props.config);
        Logger.debug('Game Engine configuration.', props.config);
        // @TODO - BETA - Refactor the entire class:
        //      - Extract all Phaser methods into the engine driver class and implement the engine on the GameManager.
        //      - Extract the template parsing into a new "template" or "elements" domain driver.
        //      - Extract the screen resize methods into a new ScreenHandler class.
        //      - Extract the tab target methods into a new TabPlugin class.
        // uiScene is where we will keep all the game UI elements:
        this.uiScene = false;
        this.TemplateEngine = TemplateEngineRender;
        this.eventsManager = props.events;
        this.eventsManager.on('reldens.beforeReconnectGameClient', ()=>{
            this.clearTarget();
        });
        this.eventsManager.on('reldens.beforeSceneDynamicCreate', (sceneDynamic)=>{
            this.setupTabTarget(sceneDynamic);
        });
    }
    parseTemplate(template, view, partials, tags) {
        return this.TemplateEngine.render(template, view, partials, tags);
    }
    updateGameSize(manager) {
        let { newWidth, newHeight } = this.getCurrentScreenSize(manager);
        setTimeout(()=>{
            this.eventsManager.emit('reldens.updateGameSizeBefore', this, newWidth, newHeight);
            this.scale.setGameSize(newWidth, newHeight);
            for (let key of Object.keys(this.uiScene.elementsUi)){
                let uiElement = this.uiScene.elementsUi[key];
                let positionKey = sc.get(this.uiScene.userInterfaces[key], 'uiPositionKey', key);
                let { uiX, uiY } = this.uiScene.getUiConfig(positionKey, newWidth, newHeight);
                uiElement.x = uiX;
                uiElement.y = uiY;
            }
            this.eventsManager.emit('reldens.updateGameSizeAfter', this, newWidth, newHeight);
        }, manager.config.getWithoutLogs('client/general/gameEngine/updateGameSizeTimeOut', 500));
    }
    getCurrentScreenSize(manager) {
        let gameContainer = manager.gameDom.getElement(GameConst.SELECTORS.GAME_CONTAINER);
        let containerWidth = gameContainer.offsetWidth;
        let containerHeight = gameContainer.offsetHeight;
        let newWidth = containerWidth;
        let newHeight = containerHeight;
        let mapWidth = 0, mapHeight = 0;
        let activeScene = manager.getActiveScene();
        if (activeScene && activeScene.map) {
            mapWidth = activeScene.map.width * activeScene.map.tileWidth;
            newWidth = Math.min(containerWidth, mapWidth);
            mapHeight = activeScene.map.height * activeScene.map.tileHeight;
            newHeight = Math.min(containerHeight, mapHeight);
        }
        let maxUiW = Number(manager.config.get('client/ui/maximum/x'));
        newWidth = Math.min(newWidth, maxUiW);
        let maxUiY = Number(manager.config.get('client/ui/maximum/y'));
        newHeight = Math.min(newHeight, maxUiY);
        return {
            newWidth,
            newHeight
        };
    }
    showTarget(targetName, target, previousTarget) {
        if (sc.hasOwn(this.uiScene, 'uiTarget')) {
            this.uiScene.uiTarget.getChildByID('box-target').style.display = 'block';
            this.uiScene.uiTarget.getChildByID('target-container').innerHTML = this.targetDisplay(targetName, target);
        }
        this.eventsManager.emit('reldens.gameEngineShowTarget', this, target, previousTarget, targetName);
    }
    targetDisplay(targetName, target) {
        let targetDisplayContent = targetName;
        if (GameConst.TYPE_PLAYER === target.type) targetDisplayContent += this.generateTargetPlayedTime(target);
        return targetDisplayContent;
    }
    generateTargetPlayedTime(target) {
        let playerTimeText = '';
        let showPlayedTimeConfig = this.uiScene.gameManager.config.getWithoutLogs('client/players/playedTime/show', GameConst.SHOW_PLAYER_TIME.ONLY_OWN_PLAYER);
        if (GameConst.SHOW_PLAYER_TIME.NONE === showPlayedTimeConfig) return playerTimeText;
        let currentPlayer = this.uiScene.gameManager.getCurrentPlayer();
        if (GameConst.SHOW_PLAYER_TIME.ALL_PLAYERS === showPlayedTimeConfig || currentPlayer.playerId === target.id) {
            let targetPlayedTime = this.obtainPlayedTime(target, currentPlayer);
            playerTimeText += this.createPlayedTimeLabel(targetPlayedTime);
        }
        return playerTimeText;
    }
    createPlayedTimeLabel(playedTime) {
        let htmlElement = this.uiScene.gameManager.gameDom.createElement('p');
        htmlElement.innerHTML = this.uiScene.gameManager.config.get('client/players/playedTime/label').replace('%playedTimeInHs', playedTime);
        return htmlElement.outerHTML;
    }
    obtainPlayedTime(target, currentPlayer) {
        return (currentPlayer.players[target.id].playedTime / 60 / 60).toFixed(1);
    }
    clearTarget() {
        let currentScene = this.uiScene.gameManager.activeRoomEvents.getActiveScene();
        let clearedTargetData = Object.assign({}, currentScene.player.currentTarget);
        if (sc.hasOwn(this.uiScene, 'uiTarget')) {
            currentScene.player.currentTarget = false;
            // @TODO - BETA - Refactor to replace styles by classes.
            this.uiScene.uiTarget.getChildByID('box-target').style.display = 'none';
            this.uiScene.uiTarget.getChildByID('target-container').innerHTML = '';
        }
        this.eventsManager.emit('reldens.gameEngineClearTarget', this, clearedTargetData);
    }
    setupTabTarget(sceneDynamic) {
        sceneDynamic.keyTab = sceneDynamic.input.keyboard.addKey(Input.Keyboard.KeyCodes.TAB);
        sceneDynamic.input.keyboard['addCapture'](Input.Keyboard.KeyCodes.TAB);
        sceneDynamic.input.keyboard.on('keydown', (event)=>{
            if (9 === event.keyCode) this.tabTarget();
        });
    }
    tabTarget() {
        let currentPlayer = this.uiScene.gameManager.getCurrentPlayer();
        let objects = this.uiScene.gameManager.getActiveScene().objectsAnimations;
        let players = currentPlayer.players;
        let closerTarget = false;
        let targetName = '';
        let previousTarget = currentPlayer.currentTarget ? Object.assign({}, currentPlayer.currentTarget) : false;
        for (let i of Object.keys(objects)){
            if (!objects[i].targetName) continue;
            let dist = Math.hypot(objects[i].x - currentPlayer.state.x, objects[i].y - currentPlayer.state.y);
            if (currentPlayer.currentTarget.id !== objects[i].key && (!closerTarget || closerTarget.dist > dist)) {
                closerTarget = {
                    id: objects[i].key,
                    type: ObjectsConst.TYPE_OBJECT,
                    dist
                };
                targetName = objects[i].targetName;
            }
        }
        for (let i of Object.keys(players)){
            if (currentPlayer.playerName === players[i].playerName) continue;
            let dist = Math.hypot(players[i].x - currentPlayer.state.x, players[i].y - currentPlayer.state.y);
            if (currentPlayer.currentTarget.id !== players[i].id && (!closerTarget || closerTarget.dist > dist)) {
                closerTarget = {
                    id: i,
                    type: GameConst.TYPE_PLAYER,
                    dist
                };
                targetName = players[i].playerName;
            }
        }
        currentPlayer.currentTarget = closerTarget;
        this.showTarget(targetName, closerTarget, previousTarget);
        this.eventsManager.emit('reldens.gameEngineTabTarget', this, closerTarget, previousTarget);
    }
    showFPS() {
        this.fpsCounter = new FPSCounter(this.uiScene.gameManager.gameDom);
        this.fpsCounter.start();
    }
}
module.exports.GameEngine = GameEngine;

},{"406accd1d723903a":"mustache","99076ac36cb74ece":"phaser","4ae19ba325f82162":"lWFHR","70f28ffbc8fc65ca":"iznl5","5d4105d801ec7f71":"k06SD","7d2d4851ffb4e4ae":"@reldens/utils"}],"lWFHR":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameDom
 *
 */ class FPSCounter {
    constructor(gameDom){
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.fpsDisplay = gameDom.createElementWithStyles('div', 'fps-counter', {
            padding: '0 20px',
            background: '#000',
            color: '#00ff00'
        });
        gameDom.getElement('.header').appendChild(this.fpsDisplay);
    }
    updateFPS() {
        let currentTime = performance.now();
        let deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;
        const fps = Math.round(1000 / deltaTime);
        this.frameCount++;
        if (0 === this.frameCount % 60) this.fpsDisplay.textContent = 'FPS: ' + fps;
        requestAnimationFrame(this.updateFPS.bind(this));
    }
    start() {
        this.updateFPS();
    }
}
module.exports.FPSCounter = FPSCounter;

},{}],"k06SD":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ObjectsConst
 *
 */ let snippetsPrefix = 'objects.';
module.exports.ObjectsConst = {
    OBJECT_ANIMATION: 'oa',
    OBJECT_INTERACTION: 'oi',
    TYPE_OBJECT: 'obj',
    TYPE_ANIMATION: 'anim',
    TYPE_NPC: 'npc',
    TYPE_ENEMY: 'enemy',
    TYPE_TRADER: 'trader',
    TYPE_DROP: 'drop',
    DYNAMIC_ANIMATION: 'dyn',
    MESSAGE: {
        DATA_VALUES: {
            NAMESPACE: 'objects'
        }
    },
    EVENT_PREFIX: {
        BASE: 'bo',
        ANIMATION: 'ao',
        DROP: 'dep',
        ENEMY: 'eo',
        NPC: 'npc',
        TRADER: 'tnpc'
    },
    SNIPPETS: {
        PREFIX: snippetsPrefix,
        NPC_INVALID: snippetsPrefix + 'npcInvalid',
        TRADER: {
            CONTENT: snippetsPrefix + 'trader.content',
            OPTIONS: {
                BUY: snippetsPrefix + 'trader.options.buy',
                SELL: snippetsPrefix + 'trader.options.sell'
            },
            BUY_CONFIRMED: snippetsPrefix + 'trader.buyConfirmed',
            SELL_CONFIRMED: snippetsPrefix + 'trader.sellConfirmed'
        }
    },
    DEFAULTS: {
        BASE_OBJECT: {
            CONTENT: '',
            OPTIONS: {}
        },
        TRADER_OBJECT: {
            INVENTORY_MAP: {
                buy: 'A',
                sell: 'B'
            },
            OPTIONS: {
                BUY: 'buy',
                SELL: 'sell'
            }
        },
        TARGETS: {
            OBJECT: 0,
            PLAYER: 1
        }
    },
    TRADE_ACTIONS_FUNCTION_NAME: {
        ADD: 'add',
        REMOVE: 'remove',
        CONFIRM: 'confirm',
        DISCONFIRM: 'disconfirm',
        CANCEL: 'cancel'
    },
    TRADE_ACTIONS: {
        SUB_ACTION: 'sub',
        ADD: 'ta',
        REMOVE: 'tr',
        CONFIRM: 'tc',
        DISCONFIRM: 'td'
    },
    DROPS: {
        KEY: 'drp',
        REMOVE: 'drmv',
        PARAMS: 'drpp',
        ASSET_KEY: 'dk',
        PICK_UP_ACT: 'rpu',
        ASSETS_PATH: '/assets/custom/sprites/',
        FILE: 'df',
        TYPE: 'dt'
    }
};

},{}],"9QP8N":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - RoomEvents
 *
 */ const { PlayerEngine } = require("5dadcfc2f4ec048c");
const { SceneDynamic } = require("5ea13611f87f0f9f");
const { ScenePreloader } = require("171055bce58a5ac9");
const { GameConst } = require("e471cce0414cdafb");
const { ErrorManager, Logger, sc } = require("9055603bf8657355");
class RoomEvents {
    constructor(roomName, gameManager){
        this.room = false;
        this.roomData = {};
        this.scenePreloader = false;
        this.playersOnAddCallback = false;
        this.playersOnRemoveCallback = false;
        this.playersQueue = {};
        /** @type {GameManager} */ this.gameManager = gameManager;
        this.gameEngine = gameManager.gameEngine;
        /** @type {GameDom} */ this.gameDom = gameManager.gameDom;
        this.roomName = roomName;
        this.events = gameManager.events;
        // @TODO - BETA - Move the following inside a single property called "metadata" and set each on their plugins.
        this.objectsUi = {};
        this.tradeUi = {};
        this.gameOverRetries = 0;
        this.gameOverMaxRetries = 0;
        this.gameOverRetryTime = 200;
        this.automaticallyCloseAllDialogsOnSceneChange = gameManager.config.getWithoutLogs('client/rooms/automaticallyCloseAllDialogsOnSceneChange', true);
    }
    async activateRoom(room, previousScene = false) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        await this.events.emit('reldens.activateRoom', room, this.gameManager);
        this.room = room;
        this.playersOnAddCallback = this.room.state.players.onAdd((player, key)=>{
            this.checkAndCreateScene();
            this.playersOnAdd(player, key, previousScene);
            this.listenPlayerAndStateChanges(player, key);
        }); // @NOTE: a second param here with "false" will not automatically run triggerAll().
        this.playersOnRemoveCallback = this.room.state.players.onRemove((player, key)=>{
            this.playersOnRemove(player, key);
        });
        this.room.onMessage('*', async (message)=>{
            await this.roomOnMessage(message);
        });
        this.room.onLeave((code)=>{
            this.roomOnLeave(code);
        });
    }
    listenPlayerAndStateChanges(player, key) {
        // @TODO - BETA - Remove hardcoded "state" property and "inState" sub-property.
        let currentPlayerId = this.gameManager.getCurrentPlayer().player_id;
        let playerProps = Object.keys(player);
        let stateProps = Object.keys(player.state);
        for (let prop of playerProps)player.listen(prop, (value)=>{
            this.playersOnChange(player, key, 'playerChange');
        });
        for (let prop of stateProps)player.state.listen(prop, (value)=>{
            //Logger.debug('Updating state.', {prop, value});
            player.state[prop] = value;
            this.playersOnChange(player, key, 'playerChange');
            if ('inState' === prop && player.player_id === currentPlayerId) {
                if (GameConst.STATUS.DEATH === value) return this.showGameOverBox();
                this.hideGameOverBox();
            }
        });
    }
    checkAndCreateScene() {
        if (!this.room.state) {
            Logger.warning('Room state is not ready.');
            return false;
        }
        // update the room data if is empty:
        if (0 === Object.keys(this.roomData).length) this.roomData = sc.toJson(this.room.state.sceneData);
        // avoid create the scene if it exists:
        if (this.gameEngine.scene.getScene(this.roomName)) return false;
        let engineSceneDynamic = this.createSceneInstance(this.roomName, this.roomData, this.gameManager);
        this.gameEngine.scene.add(this.roomName, engineSceneDynamic, false);
    }
    async playersOnAdd(player, key, previousScene) {
        await this.events.emit('reldens.playersOnAdd', player, key, previousScene, this);
        let mappedData = {
            x: player.state.x,
            y: player.state.y,
            dir: player.state.dir,
            playerName: player.playerName,
            avatarKey: player.avatarKey,
            playedTime: player.playedTime,
            player_id: player.player_id
        };
        if (this.isCurrentPlayer(key)) return await this.createCurrentPlayer(player, previousScene, key);
        this.addOtherPlayers(player, key, mappedData);
    }
    isCurrentPlayer(key) {
        return key === this.room.sessionId;
    }
    addOtherPlayers(player, key, addPlayerData) {
        // add new players into the current player scene:
        if (!this.engineStarted) {
            this.playersQueue[key] = addPlayerData;
            return false;
        }
        let currentScene = this.getActiveScene();
        if (!this.isValidScene(currentScene, player)) // we don't want to add players from another scene here:
        return false;
        currentScene.player.addPlayer(key, addPlayerData);
    }
    async createCurrentPlayer(player, previousScene, key) {
        this.engineStarted = true;
        await this.startEngineScene(player, this.room, previousScene);
        let currentScene = this.getActiveScene();
        if (!this.isValidScene(currentScene, player)) return false;
        // process players queue after player was created:
        await this.events.emit('reldens.playersQueueBefore', player, key, previousScene, this);
        for (let i of Object.keys(this.playersQueue))currentScene.player.addPlayer(i, this.playersQueue[i]);
        let eventData = {
            player,
            key,
            previousScene,
            roomEvents: this
        };
        await this.events.emit('reldens.createCurrentPlayer', eventData);
        return eventData;
    }
    isValidScene(currentScene, player) {
        return currentScene.key === player.state.scene && currentScene.player && currentScene.player.players;
    }
    playersOnChange(player, key, from) {
        // do not move the player if it is changing the scene:
        if (player.state.scene !== this.roomName) {
            if (player.player_id === this.gameManager.getCurrentPlayer().player_id && !this.gameManager.isChangingScene) Logger.info('Player scene miss match.', {
                currentScene: this.roomName,
                playerSceneOnState: player?.state.scene,
                player: player?.sessionId,
                currentPlayer: this.gameManager.getCurrentPlayer()?.playerId,
                isChangingScene: this.gameManager.isChangingScene
            });
            return;
        }
        let currentScene = this.getActiveScene();
        if (!this.playerExists(currentScene, key)) /* @NOTE: this is expected to happen when the player is being created in the scene.
            Logger.info('Player not found in current scene.', {
                player: currentScene?.player,
                currentKeys: Object.keys(currentScene?.player?.players || {}),
                lookingPlayer: key
            });
            */ return;
        currentScene.player.updatePlayer(key, player);
    }
    playersOnRemove(player, key) {
        this.events.emitSync('reldens.playersOnRemove', player, key, this);
        if (key === this.room.sessionId) return this.gameOverReload();
        return this.removePlayerByKey(key);
    }
    removePlayerByKey(key) {
        let currentScene = this.getActiveScene();
        if (!this.playerExists(currentScene, key)) return;
        currentScene.player.removePlayer(key);
        if (currentScene.player.currentTarget?.id === key) this.gameEngine.clearTarget();
    }
    gameOverReload() {
        // @TODO - BETA - Improve disconnection handler.
        let defaultReload = {
            confirmed: true
        };
        this.events.emitSync('reldens.gameOverReload', this, defaultReload);
        if (!this.gameManager.gameOver && defaultReload.confirmed) this.gameDom.alertReload(this.gameManager.services.translator.t('game.errors.sessionEnded'));
    }
    playerExists(currentScene, key) {
        return currentScene.player && sc.hasOwn(currentScene.player.players, key);
    }
    async roomOnMessage(message) {
        await this.runGameOver(message);
        await this.runRevived(message);
        await this.runChangingScene(message);
        await this.runChangedScene(message);
        await this.runReconnect(message);
        await this.runUpdateStats(message);
        await this.runInitUi(message);
        await this.closeBox(message);
        await this.runCustomMessageListener(message);
    }
    async runInitUi(message) {
        if (message.act !== GameConst.UI || !message.id) return false;
        await this.events.emit('reldens.initUiBefore', message, this);
        this.initUi(message);
        await this.events.emit('reldens.initUiAfter', message, this);
    }
    async closeBox(message) {
        if (GameConst.CLOSE_UI_ACTION !== message.act || !message.id) return false;
        let closeButton = this.gameDom.getElement('#box-' + message.id + ' .box-close');
        if (!closeButton) {
            Logger.error('Box could not be closed ID "' + message.id + '".');
            return false;
        }
        closeButton.click();
        return true;
    }
    async runCustomMessageListener(message) {
        let listenerKey = sc.get(message, 'listener', '');
        if ('' === listenerKey) //Logger.debug('ListenerKey undefined for message in room events.', message);
        return false;
        let defaultListeners = this.gameManager.config.get('client/message/listeners', {});
        let customListeners = this.gameManager.config.get('client/customClasses/message/listeners', {});
        let listener = sc.get(customListeners, listenerKey, false);
        if (!listener) listener = sc.get(defaultListeners, listenerKey, false);
        if (!listener) {
            Logger.error('Listener "' + listenerKey + '" is missing.');
            return false;
        }
        if (!sc.isFunction(listener['executeClientMessageActions'])) {
            Logger.error('Listener is missing "executeClientMessageActions" method.', listener);
            return false;
        }
        //Logger.debug({executeClientMessageActions: message});
        listener['executeClientMessageActions']({
            message,
            roomEvents: this
        });
    }
    async runUpdateStats(message) {
        if (message.act !== GameConst.PLAYER_STATS) return false;
        // @NOTE: now this method will update the stats every time the stats action is received but the UI will be
        // created only once in the preloader.
        await this.events.emit('reldens.playerStatsUpdateBefore', message, this);
        return await this.updatePlayerStats(message);
    }
    async runReconnect(message) {
        if (message.act !== GameConst.RECONNECT) return false;
        // @NOTE: here we don't need to evaluate the id since reconnect only is sent to the current client.
        await this.events.emit('reldens.beforeReconnectGameClient', message, this);
        await this.gameManager.reconnectGameClient(message, this.room);
    }
    async runChangingScene(message) {
        if (message.act !== GameConst.CHANGING_SCENE || this.room.sessionId !== message.id) return false;
        this.gameManager.isChangingScene = true;
        this.closeAllActiveDialogs();
        this.gameManager.getActiveScene().scene.setVisible(false);
    }
    async runChangedScene(message) {
        if (message.act !== GameConst.CHANGED_SCENE || message.scene !== this.room.name || this.room.sessionId === message.id) return false;
        await this.events.emit('reldens.startChangedScene', {
            message,
            roomEvents: this
        });
        let currentScene = this.getActiveScene();
        // if other users enter the current scene we need to add them:
        let { id, x, y, dir, playerName, playedTime, avatarKey, player_id } = message;
        let topOff = this.gameManager.config.get('client/players/size/topOffset');
        let leftOff = this.gameManager.config.get('client/players/size/leftOffset');
        let addPlayerData = {
            x: x - leftOff,
            y: y - topOff,
            dir,
            playerName,
            playedTime,
            avatarKey,
            player_id
        };
        currentScene.player.addPlayer(id, addPlayerData);
        this.gameManager.isChangingScene = false;
        await this.events.emit('reldens.endChangedScene', {
            message,
            roomEvents: this
        });
    }
    closeAllActiveDialogs() {
        if (!this.automaticallyCloseAllDialogsOnSceneChange) return;
        let closeButtons = this.gameDom.getElements(GameConst.SELECTORS.BUTTONS_CLOSE);
        if (0 === closeButtons.length) return;
        for (let closeButton of closeButtons)closeButton.click();
    }
    async runRevived(message) {
        if (message.act !== GameConst.REVIVED) return false;
        this.gameDom.getElement('#game-over').classList.add('hidden');
        let currentPlayer = this.gameManager.getCurrentPlayer();
        let showSprite = sc.get(currentPlayer.players, message.t, false);
        if (!showSprite) return false;
        showSprite.visible = true;
        if (sc.hasOwn(showSprite, 'nameSprite') && showSprite.nameSprite) showSprite.nameSprite.visible = true;
        this.getActiveScene().stopOnDeathOrDisabledSent = false;
    }
    async runGameOver(message) {
        if (message.act !== GameConst.GAME_OVER) return false;
        try {
            let defaultBehavior = true;
            await this.events.emit('reldens.runGameOver', {
                message,
                defaultBehavior,
                roomEvents: this
            });
            if (!defaultBehavior) return false;
            await this.events.emit('reldens.gameOver', message, this);
            this.gameManager.gameOver = true;
            let currentPlayer = this.gameManager.getCurrentPlayer();
            if (!currentPlayer) {
                if (this.gameOverRetries < this.gameOverMaxRetries) {
                    setTimeout(()=>this.runGameOver(message), this.gameOverRetryTime);
                    this.gameOverRetries++;
                }
                return false;
            }
            let currentPlayerSprite = currentPlayer.players[currentPlayer.playerId];
            currentPlayerSprite.visible = false;
            this.showGameOverBox();
        } catch (error) {
            setTimeout(()=>this.runGameOver(message), 200);
            this.gameOverRetries++;
            return false;
        }
    }
    showGameOverBox() {
        return this.displayGameOverBox(true);
    }
    hideGameOverBox() {
        return this.displayGameOverBox(false);
    }
    displayGameOverBox(display) {
        Logger.debug('Display game over box: ' + (display ? 'yes' : 'no') + '.');
        let gameOverElement = this.gameDom.getElement('#game-over');
        if (!gameOverElement) {
            Logger.debug('GameOver box element not found.');
            return false;
        }
        if (display) {
            gameOverElement.classList.remove('hidden');
            return true;
        }
        gameOverElement.classList.add('hidden');
        return false;
    }
    async roomOnLeave(code) {
        // @TODO - BETA - Improve disconnection handler.
        if (this.isAbnormalShutdown(code) && !this.gameManager.gameOver && !this.gameManager.forcedDisconnection) {
            Logger.error('There was a connection error.', {
                code,
                isGameOver: this.gameManager.gameOver,
                isForcedDisconnection: this.gameManager.forcedDisconnection
            });
            this.gameDom.alertReload(this.gameManager.services.translator.t('game.errors.serverDown'));
        }
        await this.events.emit('reldens.playerLeftScene', {
            code,
            roomEvents: this
        });
    // @NOTE: the client can initiate the disconnection, this is also triggered when the users change the room.
    }
    isAbnormalShutdown(code) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        /*
        1000 - Regular socket shutdown
        Between 1001 and 1015 - Abnormal socket shutdown
        Between 4000 and 4999 - Custom socket close code
        */ return 1001 <= code && 1015 >= code;
    }
    async updatePlayerStats(message) {
        if (!sc.hasOwn(message, 'stats') || !message.stats) return false;
        let currentScene = this.getActiveScene();
        if (!currentScene.player || !sc.hasOwn(currentScene.player.players, this.room.sessionId)) {
            // @NOTE: this can happen when you get killed and logout, then on login you will have 0 life points and
            // if you get killed automatically again you will hit a player stats update before the player gets ready.
            Logger.error('Player not available.', this.room, currentScene);
            return false;
        }
        let playerSprite = currentScene.player.players[this.room.sessionId];
        playerSprite.stats = message.stats;
        this.gameManager.playerData.stats = message.stats;
        this.gameManager.playerData.statsBase = message.statsBase;
        let playerStats = this.gameManager.getUiElement('playerStats');
        if (!playerStats) return false;
        let statsPanel = playerStats.getChildByProperty('id', 'player-stats-container');
        if (!statsPanel) return false;
        let messageTemplate = this.gameEngine.uiScene.cache.html.get('playerStat');
        statsPanel.innerHTML = '';
        for (let i of Object.keys(message.stats)){
            let statData = sc.get(this.gameManager.config.client.players.initialStats[i], 'data', false);
            let baseStatValue = statData && sc.get(statData, 'showBase', false) ? ' / ' + message.statsBase[i] : '';
            let parsedStatsTemplate = this.gameManager.gameEngine.parseTemplate(messageTemplate, {
                statLabel: i,
                statValue: message.stats[i] + baseStatValue
            });
            statsPanel.innerHTML = statsPanel.innerHTML + parsedStatsTemplate;
        }
        await this.events.emit('reldens.playerStatsUpdateAfter', message, this);
    }
    initUi(props) {
        let uiScene = this.gameEngine.uiScene;
        if (!uiScene || !sc.hasOwn(uiScene.elementsUi, props.id)) {
            Logger.error('User interface not found on UI Scene: ' + props.id);
            return false;
        }
        let uiBox = uiScene.elementsUi[props.id];
        this.uiSetTitle(uiBox, props);
        this.uiSetContent(uiBox, props, uiScene);
        let dialogContainer = uiBox.getChildByID('box-' + props.id);
        // @TODO - BETA - Replace styles by classes.
        let shouldSetDisplayNone = props.keepCurrentDisplay && 'none' === dialogContainer.style.display;
        dialogContainer.style.display = shouldSetDisplayNone ? 'none' : 'block';
        // set box depth over the other boxes:
        uiBox.setDepth(2);
        // on dialog display clear the current target:
        if (this.gameManager.config.get('client/ui/uiTarget/hideOnDialog')) this.gameEngine.clearTarget();
    }
    uiSetTitleAndContent(uiBox, props, uiScene) {
        this.uiSetTitle(uiBox, props);
        this.uiSetContent(uiBox, props, uiScene);
    }
    uiSetTitle(uiBox, props) {
        let newTitle = sc.get(props, 'title', false);
        if (false === newTitle) return false;
        let boxTitle = uiBox.getChildByProperty('className', 'box-title');
        if (!boxTitle) return false;
        boxTitle.innerHTML = newTitle;
    }
    uiSetContent(uiBox, props, uiScene) {
        let newContent = sc.get(props, 'content', false);
        if (false === newContent) return false;
        let boxContent = uiBox.getChildByProperty('className', 'box-content');
        if (!boxContent) return false;
        boxContent.innerHTML = newContent;
        this.uiSetContentOptions(uiScene, props, boxContent);
    }
    uiSetContentOptions(uiScene, props, boxContent) {
        if (!props.options) return false;
        // @TODO - BETA - IMPROVE! I need time to focus on this which I don't have right now :(
        let optionsContainerTemplate = uiScene.cache.html.get('uiOptionsContainer');
        let optionsContainer = this.gameManager.gameEngine.parseTemplate(optionsContainerTemplate, {
            id: 'ui-' + props.id
        });
        boxContent.innerHTML += optionsContainer;
        let optionsKeys = Object.keys(props.options);
        if (0 === optionsKeys.length) return false;
        for (let i of optionsKeys){
            let { label, value, icon } = props.options[i];
            let optTemplate = icon ? 'Icon' : 'Button';
            let buttonTemplate = uiScene.cache.html.get('uiOption' + optTemplate);
            let templateVars = {
                id: i,
                object_id: props.id,
                label,
                value,
                icon: '/assets/custom/items/' + icon + GameConst.FILES.EXTENSIONS.PNG
            };
            let buttonHtml = this.gameManager.gameEngine.parseTemplate(buttonTemplate, templateVars);
            this.gameDom.appendToElement('#ui-' + props.id, buttonHtml);
            let elementId = '#opt-' + i + '-' + props.id;
            this.gameDom.getElement(elementId)?.addEventListener('click', (event)=>{
                let optionSend = {
                    id: props.id,
                    act: GameConst.BUTTON_OPTION,
                    value: event.target.getAttribute('data-option-value')
                };
                let overrideSendOptions = sc.get(props, 'overrideSendOptions', {});
                Object.assign(optionSend, overrideSendOptions);
                this.send(optionSend);
            });
        }
    }
    async startEngineScene(player, room, previousScene = false) {
        await this.events.emit('reldens.startEngineScene', this, player, room, previousScene);
        let uiScene = false;
        if (!this.gameEngine.uiScene) uiScene = true;
        let preloaderName = GameConst.SCENE_PRELOADER + this.roomName;
        !this.gameEngine.scene.getScene(preloaderName) ? await this.createPreloaderAndScene(preloaderName, uiScene, player, room, previousScene) : await this.createEngineOnScene(preloaderName, player, room, previousScene);
    }
    async createEngineOnScene(preloaderName, player, room, previousScene) {
        let currentScene = this.getActiveScene();
        currentScene.objectsAnimationsData = this.roomData.objectsAnimationsData;
        this.scenePreloader = this.gameEngine.scene.getScene(preloaderName);
        await this.events.emit('reldens.createdPreloaderRecurring', this, this.scenePreloader);
        await this.createEngineScene(player, room, previousScene);
    }
    async createPreloaderAndScene(preloaderName, uiScene, player, room, previousScene) {
        this.scenePreloader = this.createPreloaderInstance({
            name: preloaderName,
            map: this.roomData.roomMap,
            images: this.roomData.sceneImages,
            uiScene: uiScene,
            gameManager: this.gameManager,
            preloadAssets: this.roomData.preloadAssets,
            objectsAnimationsData: this.roomData.objectsAnimationsData
        });
        this.gameEngine.scene.add(preloaderName, this.scenePreloader, true);
        await this.events.emit('reldens.createdPreloaderInstance', this, this.scenePreloader);
        let preloader = this.gameEngine.scene.getScene(preloaderName);
        preloader.load.on('complete', async ()=>{
            // set ui on first preloader scene:
            if (!this.gameEngine.uiScene) {
                this.gameEngine.uiScene = preloader;
                // if the box right is present then assign the actions:
                this.showPlayerName(this.gameManager.playerData.id + ' - ' + this.gameManager.playerData.name);
            }
            await this.createEngineScene(player, room, previousScene);
        });
    }
    showPlayerName(playerName) {
        let playerBox = this.gameManager.getUiElement('playerBox');
        if (!playerBox) return false;
        let element = playerBox.getChildByProperty('className', 'player-name');
        if (!element) return false;
        element.innerHTML = playerName;
    }
    async createEngineScene(player, room, previousScene) {
        let previousSceneInstance = this.gameEngine.scene.getScene(previousScene);
        if (previousSceneInstance) previousSceneInstance.scene.setVisible(false);
        // this event happens once for every scene:
        await this.events.emit('reldens.createEngineScene', player, room, previousScene, this);
        !this.gameManager.room ? this.gameEngine.scene.start(player.state.scene) : await this.destroyPreviousScene(previousScene, player);
        this.gameManager.room = room;
        let currentScene = this.gameEngine.scene.getScene(player.state.scene);
        currentScene.player = this.createPlayerEngineInstance(currentScene, player, this.gameManager, room);
        currentScene.player.create();
        this.addExistentPlayers(room, currentScene);
        this.updateSceneLabel(this.roomData.roomTitle);
        // @NOTE: player states must be requested since are private user data that we can share with other players or
        // broadcast to the rooms.
        // request player stats after the player was added to the scene:
        this.send({
            act: GameConst.PLAYER_STATS
        });
        // send notification about client joined:
        this.send({
            act: GameConst.CLIENT_JOINED
        });
        let playerAddEventData = {
            player: currentScene.player,
            previousScene,
            roomEvents: this
        };
        await this.events.emit('reldens.playersOnAddReady', playerAddEventData);
        let eventData = {
            currentScene,
            previousScene,
            roomEvents: this
        };
        await this.events.emit('reldens.createEngineSceneDone', eventData);
        return eventData;
    }
    addExistentPlayers(room, currentScene) {
        if (0 === this.playersCountFromState(room)) return false;
        for (let i of this.playersKeysFromState(room)){
            let tmp = this.playerBySessionIdFromState(room, i);
            if (!tmp.sessionId || tmp.sessionId === room.sessionId) continue;
            let addPlayerData = {
                x: tmp.state.x,
                y: tmp.state.y,
                dir: tmp.state.dir,
                playerName: tmp.playerName,
                playedTime: tmp.playedTime,
                avatarKey: tmp.avatarKey,
                player_id: tmp.player_id
            };
            currentScene.player.addPlayer(tmp.sessionId, addPlayerData);
        }
    }
    playerBySessionIdFromState(room, i) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        return room.state.players.get(i);
    }
    playersCountFromState(room) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        return room.state.players.size;
    }
    playersKeysFromState(room) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        return Array.from(room.state.players.keys());
    }
    async destroyPreviousScene(previousScene, player) {
        if (!previousScene) {
            Logger.warning('Missing previous scene data.', previousScene);
            return false;
        }
        let previousSceneInstance = this.gameEngine.scene.getScene(previousScene);
        if (!previousSceneInstance) {
            Logger.warning('Missing previous scene instance.', previousSceneInstance);
            return false;
        }
        await previousSceneInstance.changeScene();
        this.gameEngine.scene.stop(previousScene);
        this.gameEngine.scene.start(player.state.scene);
    }
    updateSceneLabel(newLabel) {
        let sceneLabel = this.gameManager.getUiElement('sceneLabel');
        // if scene label is visible assign the data to the box:
        if (!sceneLabel) return false;
        let element = sceneLabel.getChildByProperty('className', 'scene-label');
        if (!element) return false;
        element.innerHTML = newLabel;
    }
    getActiveScene() {
        return this.gameEngine.scene.getScene(this.roomName);
    }
    createSceneInstance(sceneName, sceneData, gameManager) {
        return new SceneDynamic(sceneName, sceneData, gameManager);
    }
    createPlayerEngineInstance(currentScene, player, gameManager, room) {
        return new PlayerEngine({
            scene: currentScene,
            playerData: player,
            gameManager,
            room,
            roomEvents: this
        });
    }
    createPreloaderInstance(props) {
        return new ScenePreloader(props);
    }
    send(data, key) {
        try {
            if (this.room.connection.transport.ws.readyState === this.room.connection.transport.ws.CLOSED) ErrorManager.error('Connection lost.');
            if (this.room.connection.transport.ws.readyState === this.room.connection.transport.ws.CLOSING) //Logger.debug('Expected, connection closing.', key, data);
            return false;
            if (!key) key = '*';
            this.room.send(key, data);
            return true;
        } catch (error) {
            Logger.critical(error.message, data);
        }
        this.gameDom.alertReload(this.gameManager.services.translator.t('game.errors.connectionLost'));
    }
}
module.exports.RoomEvents = RoomEvents;

},{"5dadcfc2f4ec048c":"1FVwD","5ea13611f87f0f9f":"lfhLZ","171055bce58a5ac9":"gePxs","e471cce0414cdafb":"iznl5","9055603bf8657355":"@reldens/utils"}],"1FVwD":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PlayerEngine
 *
 */ const { SpriteTextFactory } = require("6963bf9442f4e594");
const { GameConst } = require("39d7aae435f21d2a");
const { ActionsConst } = require("728f6282fc7a7dc2");
const { Logger, sc } = require("e1020565cb5e4c52");
class PlayerEngine {
    constructor(props){
        // @TODO - BETA - Refactor entirely.
        let { scene, playerData, gameManager, room, roomEvents } = props;
        this.scene = scene;
        this.config = gameManager.config;
        this.gameManager = gameManager;
        this.events = gameManager.events;
        this.playerName = playerData.playerName;
        this.avatarKey = playerData.avatarKey;
        this.roomName = playerData.state.scene;
        this.state = playerData.state;
        this.room = room;
        this.roomEvents = roomEvents;
        this.playerId = room.sessionId;
        this.player_id = playerData.player_id; // id from storage
        this.players = {};
        this.playedTime = playerData.playedTime;
        this.mov = false;
        this.dir = false;
        this.currentTarget = false;
        this.pointsValidator = false;
        // @TODO - BETA - Set all the configs in a single config property.
        this.animationBasedOnPress = this.config.get('client/players/animations/basedOnPress');
        // @TODO - BETA - Make size configurations depend on class-paths assets if present.
        this.topOff = this.config.get('client/players/size/topOffset');
        this.leftOff = this.config.get('client/players/size/leftOffset');
        this.collideWorldBounds = this.config.get('client/players/animations/collideWorldBounds');
        this.fadeDuration = Number(this.config.get('client/players/animations/fadeDuration'));
        this.cameraRoundPixels = Boolean(this.config.getWithoutLogs('client/general/engine/cameraRoundPixels', true));
        this.cameraInterpolationX = Number(this.config.getWithoutLogs('client/general/engine/cameraInterpolationX', 0.02));
        this.cameraInterpolationY = Number(this.config.getWithoutLogs('client/general/engine/cameraInterpolationY', 0.02));
        this.globalConfigNameText = this.config.get('client/ui/players/nameText');
        this.globalConfigShowNames = Boolean(this.config.get('client/ui/players/showNames'));
        this.globalConfigShowNamesLimit = this.config.getWithoutLogs('client/ui/players/showNamesLimit', 10);
        this.defaultActionKeyConfig = this.config.get('client/ui/controls/defaultActionKey');
        this.highlightOnOver = Boolean(this.config.getWithoutLogs('client/ui/players/highlightOnOver', true));
        this.highlightColor = this.config.getWithoutLogs('client/ui/players/highlightColor', '0x00ff00');
        this.lastKeyState = {};
    }
    create() {
        let addPlayerData = {
            x: this.state.x,
            y: this.state.y,
            dir: this.state.dir,
            playerName: this.playerName,
            avatarKey: this.avatarKey,
            playedTime: this.playedTime,
            player_id: this.player_id
        };
        this.addPlayer(this.playerId, addPlayerData);
        this.scene.cameras.main.startFollow(this.players[this.playerId]);
        this.scene.scene.setVisible(true, this.roomName);
        this.scene.cameras.main.fadeFrom(this.fadeDuration);
        this.scene.physics.world.fixedStep = false;
        this.scene.physics.world.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
        this.scene.cameras.main.setBounds(0, 0, this.scene.map.widthInPixels, this.scene.map.heightInPixels);
        this.scene.cameras.main.setIsSceneCamera(true);
        this.scene.cameras.main.on('camerafadeincomplete', ()=>{
            this.scene.cameras.main.startFollow(this.players[this.playerId]);
            this.scene.cameras.main.setLerp(this.cameraInterpolationX, this.cameraInterpolationY);
            this.scene.cameras.main.setRoundPixels(this.cameraRoundPixels);
        });
    }
    addPlayer(id, addPlayerData) {
        // @TODO - BETA - Create a PlayersManager attached to the Scene and move all the players handler methods there.
        if (sc.hasOwn(this.players, id)) // player sprite already exists, update it and return it:
        return this.players[id];
        let { x, y, dir, playerName, avatarKey, playedTime, player_id } = addPlayerData;
        let mappedAvatarKey = this.gameManager.mappedAvatars[avatarKey];
        //Logger.debug({mappedAvatarKey, avatarKey, mappedAvatars: this.gameManager.mappedAvatars});
        this.players[id] = this.scene.physics.add.sprite(x, y - this.topOff, mappedAvatarKey);
        this.players[id].playerName = playerName;
        this.players[id].playedTime = playedTime;
        this.players[id].avatarKey = avatarKey;
        this.players[id].playerId = id;
        this.players[id].player_id = player_id;
        this.players[id].anims.play(mappedAvatarKey + '_' + dir);
        this.players[id].anims.stop();
        this.showPlayerName(id);
        this.makePlayerInteractive(id);
        this.players[id].moveSprites = {};
        this.players[id].setDepth(this.players[id].y + this.players[id].body.height);
        this.players[id].setCollideWorldBounds(this.collideWorldBounds);
        this.events.emitSync('reldens.playerEngineAddPlayer', this, id, addPlayerData);
        return this.players[id];
    }
    makePlayerInteractive(id) {
        this.players[id].setInteractive({
            useHandCursor: true
        }).on('pointerdown', (e)=>{
            // @NOTE: we avoid execute object interactions while the UI element is open, if we click on the UI the other
            // elements in the background scene should not be executed.
            if (GameConst.SELECTORS.CANVAS !== e.downElement.nodeName) return false;
            // @NOTE: we could send a specific action when the player has been targeted.
            // this.roomEvents.send('*', {act: GameConst.TYPE_PLAYER, id: id});
            // update target ui:
            this.setTargetPlayerById(id);
        });
        if (this.highlightOnOver) {
            this.players[id].on('pointerover', ()=>{
                this.players[id].setTint(this.highlightColor);
            });
            this.players[id].on('pointerout', ()=>{
                this.players[id].clearTint();
            });
        }
    }
    setTargetPlayerById(id) {
        if (!sc.get(this.players, id, false)) {
            Logger.info('Target player ID "' + id + '" was not found.');
            this.gameManager.gameEngine.clearTarget();
            return false;
        }
        let previousTarget = Object.assign({}, this.currentTarget);
        this.currentTarget = {
            id: id,
            type: GameConst.TYPE_PLAYER,
            player_id: this.players[id].player_id
        };
        this.gameManager.gameEngine.showTarget(this.players[id].playerName, this.currentTarget, previousTarget);
    }
    showPlayerName(id) {
        if (!this.globalConfigShowNames) return false;
        if (!this.players[id]) {
            Logger.critical('Player ID "' + id + '" not found.', this.players);
            return false;
        }
        let showName = this.players[id].playerName;
        if (!showName) {
            Logger.critical('Player name not found on player ID "' + id + '".', this.players[id]);
            return false;
        }
        SpriteTextFactory.attachTextToSprite(this.players[id], this.applyNameLengthLimit(showName), this.globalConfigNameText, this.topOff, 'nameSprite', this.scene);
    }
    applyNameLengthLimit(showName) {
        if (0 < this.globalConfigShowNamesLimit && showName.length > this.globalConfigShowNamesLimit) showName = showName.slice(0, this.globalConfigShowNamesLimit) + '...';
        return showName;
    }
    updatePlayer(playerId, player) {
        let playerSprite = this.players[playerId];
        if (!playerSprite) {
            Logger.error('PlayerSprite not defined.', this.players, playerId);
            return;
        }
        Logger.debug('Updating player ID "' + playerId + '". - Current player ID "' + this.player_id + '".');
        if (this.scene.clientInterpolation) {
            this.scene.interpolatePlayersPosition[playerId] = player.state;
            return;
        }
        this.processPlayerPositionAnimationUpdate(playerSprite, player.state, playerId, player.state.x - this.leftOff, player.state.y - this.topOff);
    }
    processPlayerPositionAnimationUpdate(playerSprite, playerState, playerId, newX = 0, newY = 0) {
        Logger.debug('Process player position animation update.', {
            playerSprite,
            playerState,
            playerId,
            newX,
            newY
        });
        if (!playerSprite) {
            Logger.error('Missing player sprite to process animation update.', playerSprite, playerState, playerId);
            return;
        }
        if (!playerState) {
            Logger.error('Missing player state to process animation update.', playerSprite, playerState, playerId);
            return;
        }
        if (!playerId) {
            Logger.error('Missing player ID to process animation update.', playerSprite, playerState, playerId);
            return;
        }
        let currentInterpolations = Object.keys(this.scene.interpolatePlayersPosition);
        if (0 === currentInterpolations.length) return;
        if (GameConst.STATUS.DEATH === playerState.inState || GameConst.STATUS.DISABLED === playerState.inState) {
            delete this.scene.interpolatePlayersPosition[playerId];
            return;
        }
        this.playPlayerAnimation(playerSprite, playerState, playerId);
        this.stopPlayerAnimation(playerSprite, playerState);
        this.updateSpritePosition(playerSprite, newX, newY);
        this.updatePlayerState(playerSprite, playerState, playerId);
    }
    updatePlayerState(playerSprite, playerState, playerId) {
        // @NOTE: depth has to be set dynamically, this way the player will be above or below other objects.
        let playerNewDepth = playerSprite.y + playerSprite.body.height;
        if (playerSprite.depth !== playerNewDepth) playerSprite.setDepth(playerNewDepth);
        this.events.emitSync('reldens.runPlayerAnimation', this, playerId, playerState, playerSprite);
        this.updateNamePosition(playerSprite);
        this.moveAttachedSprites(playerSprite, playerNewDepth);
    }
    updateSpritePosition(sprite, newX, newY) {
        if (sprite.x !== newX) sprite.x = newX;
        if (sprite.y !== newY) sprite.y = newY;
    }
    updateNamePosition(playerSprite) {
        if (!this.globalConfigShowNames || !playerSprite['nameSprite']) return false;
        let relativeNamePosition = SpriteTextFactory.getTextPosition(playerSprite, this.applyNameLengthLimit(playerSprite.playerName), this.globalConfigNameText, this.topOff);
        playerSprite['nameSprite'].x = relativeNamePosition.x;
        playerSprite['nameSprite'].y = relativeNamePosition.y;
    }
    moveAttachedSprites(playerSprite, playerNewDepth) {
        let moveSpriteKeys = Object.keys(playerSprite.moveSprites);
        if (0 === moveSpriteKeys.length) return false;
        for (let i of moveSpriteKeys){
            let sprite = playerSprite.moveSprites[i];
            if (sprite.x === playerSprite.x && sprite.y === playerSprite.y) continue;
            sprite.x = playerSprite.x;
            sprite.y = playerSprite.y;
            // by default moving sprites will be always below the player:
            let newSpriteDepth = playerNewDepth + (sc.get(sprite, 'depthByPlayer', '') === 'above' ? 1 : -0.1);
            Logger.debug('Sprite "' + i + '" new depth: ' + newSpriteDepth + '.', sprite);
            sprite.setDepth(newSpriteDepth);
        }
    }
    playPlayerAnimation(playerSprite, playerState, playerId) {
        if (this.isDeath(playerState) || this.isDisabled(playerState)) {
            Logger.debug('Player with ID "' + playerId + '" is disabled to play the animation.', playerState);
            return false;
        }
        Logger.debug('Play player animation.', playerSprite.avatarKey, playerState);
        // @NOTE: player speed is defined by the server.
        let activeAvatarKey = this.gameManager.mappedAvatars[playerSprite.avatarKey];
        if (this.animationBasedOnPress) {
            let directionKey = activeAvatarKey + '_' + playerState.dir;
            if (playerState.x === playerSprite.x && playerState.y === playerSprite.y) {
                Logger.debug('Player has not changed, skipped animation "' + directionKey + '".');
                return false;
            }
            Logger.debug('Animation played based on press active.', activeAvatarKey, {
                x: playerState.x + ' / ' + playerSprite.x,
                y: playerState.y + ' / ' + playerSprite.y
            });
            playerSprite.anims.play(directionKey, true);
            return;
        }
        if (playerState.x !== playerSprite.x) {
            let directionToPlayX = playerState.x < playerSprite.x ? activeAvatarKey + '_' + GameConst.LEFT : activeAvatarKey + '_' + GameConst.RIGHT;
            playerSprite.anims.play(directionToPlayX, true);
        }
        if (playerState.y !== playerSprite.y) {
            let directionToPlayY = playerState.y < playerSprite.y ? activeAvatarKey + '_' + GameConst.UP : activeAvatarKey + '_' + GameConst.DOWN;
            playerSprite.anims.play(directionToPlayY, true);
        }
    }
    stopPlayerAnimation(playerSprite, playerState) {
        // if not moving then stop the player animation:
        if (playerState.mov) return;
        playerSprite.anims.stop();
        playerSprite.mov = playerState.mov;
    }
    removePlayer(key) {
        if (!sc.hasOwn(this.players, key) || !sc.hasOwn(this.players[key], 'nameSprite')) return;
        this.players[key]['nameSprite'].destroy();
        this.players[key].destroy();
        delete this.players[key];
    }
    left() {
        if ('pressed' === this.lastKeyState[GameConst.LEFT]) return;
        this.lastKeyState[GameConst.LEFT] = 'pressed';
        this.roomEvents.send({
            dir: GameConst.LEFT
        });
    }
    right() {
        if ('pressed' === this.lastKeyState[GameConst.RIGHT]) return;
        this.lastKeyState[GameConst.RIGHT] = 'pressed';
        this.roomEvents.send({
            dir: GameConst.RIGHT
        });
    }
    up() {
        if ('pressed' === this.lastKeyState[GameConst.UP]) return;
        this.lastKeyState[GameConst.UP] = 'pressed';
        this.roomEvents.send({
            dir: GameConst.UP
        });
    }
    down() {
        if ('pressed' === this.lastKeyState[GameConst.DOWN]) return;
        this.lastKeyState[GameConst.DOWN] = 'pressed';
        this.roomEvents.send({
            dir: GameConst.DOWN
        });
    }
    stop() {
        this.lastKeyState[GameConst.LEFT] = '';
        this.lastKeyState[GameConst.RIGHT] = '';
        this.lastKeyState[GameConst.UP] = '';
        this.lastKeyState[GameConst.DOWN] = '';
        this.roomEvents.send({
            act: GameConst.STOP
        });
    }
    runActions() {
        let actionKey = this.defaultActionKeyConfig || 'physical_attack';
        this.roomEvents.send({
            act: ActionsConst.ACTION,
            type: actionKey,
            target: this.currentTarget
        });
    }
    moveToPointer(pointer) {
        if (this.isDeath() || this.isDisabled()) {
            this.fullStop();
            return false;
        }
        this.lastKeyState[GameConst.LEFT] = '';
        this.lastKeyState[GameConst.RIGHT] = '';
        this.lastKeyState[GameConst.UP] = '';
        this.lastKeyState[GameConst.DOWN] = '';
        this.roomEvents.send({
            act: GameConst.POINTER,
            column: pointer.worldColumn,
            row: pointer.worldRow,
            x: pointer.worldX - this.leftOff,
            y: pointer.worldY - this.topOff
        });
    }
    isDisabled(state) {
        if (!state) state = this.state;
        return GameConst.STATUS.DISABLED === state.inState;
    }
    isDeath(state) {
        if (!state) state = this.state;
        return GameConst.STATUS.DEATH === state.inState;
    }
    fullStop() {
        delete this.scene.interpolatePlayersPosition[this.player_id];
        this.stop();
    }
    getPosition() {
        return {
            x: this.players[this.playerId].x,
            y: this.players[this.playerId].y
        };
    }
}
module.exports.PlayerEngine = PlayerEngine;

},{"6963bf9442f4e594":"l0ZhN","39d7aae435f21d2a":"iznl5","728f6282fc7a7dc2":"eRkMR","e1020565cb5e4c52":"@reldens/utils"}],"l0ZhN":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SpriteTextFactory
 *
 */ const { sc } = require("76fa5b97e5b08abb");
class SpriteTextFactory {
    static attachTextToSprite(sprite, text, textConfig, topOff, textKeyWord, scene) {
        let relativeNamePosition = this.getTextPosition(sprite, text, textConfig, topOff);
        let textSprite = scene.add.text(relativeNamePosition.x, relativeNamePosition.y, text, {
            fontFamily: sc.get(textConfig, 'fontFamily', 'sans-serif'),
            fontSize: sc.get(textConfig, 'fontSize', '12px')
        });
        textSprite.style.setFill(sc.get(textConfig, 'fill', '#ffffff'));
        textSprite.style.setAlign(sc.get(textConfig, 'align', 'center'));
        textSprite.style.setStroke(sc.get(textConfig, 'stroke', '#000000'), sc.get(textConfig, 'strokeThickness', 4));
        textSprite.style.setShadow(sc.get(textConfig, 'shadowX', 5), sc.get(textConfig, 'shadowY', 5), sc.get(textConfig, 'shadowColor', 'rgba(0,0,0,0.7)'), sc.get(textConfig, 'shadowBlur', 5));
        textSprite.setDepth(sc.get(textConfig, 'depth', 200000));
        sprite[textKeyWord] = textSprite;
        return textSprite;
    }
    static getTextPosition(sprite, text, textConfig, topOff = 0) {
        if (!sprite) return {
            x: 0,
            y: 0
        };
        let height = sc.get(textConfig, 'height', 18);
        let x = sprite.x - text.length * sc.get(textConfig, 'textLength', 4);
        let y = sprite.y - height - sprite.height + topOff;
        return {
            x,
            y
        };
    }
}
module.exports.SpriteTextFactory = SpriteTextFactory;

},{"76fa5b97e5b08abb":"@reldens/utils"}],"eRkMR":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ActionsConst
 *
 */ let snippetsPrefix = 'actions.';
module.exports.ActionsConst = {
    BATTLE_TYPE_PER_TARGET: 'bt',
    BATTLE_TYPE_GENERAL: 'bg',
    BATTLE_ENDED: 'bend',
    TARGET_POSITION: 'tgp',
    TARGET_PLAYER: 'tga',
    TARGET_OBJECT: 'tgo',
    FULL_SKILLS_LIST: 'fkl',
    ACTION: 'action',
    DATA_OBJECT_KEY_TARGET: 't',
    DATA_OBJECT_KEY_OWNER: 'o',
    DATA_TARGET_TYPE: 'tT',
    DATA_TARGET_KEY: 'tK',
    DATA_OWNER_TYPE: 'oT',
    DATA_OWNER_KEY: 'oK',
    DATA_TYPE_VALUE_ENEMY: 'e',
    DATA_TYPE_VALUE_PLAYER: 'p',
    DATA_TYPE_VALUE_OBJECT: 'o',
    EXTRA_DATA: {
        KEY: 'sked',
        SKILL_DELAY: 'sd'
    },
    DEFAULT_HIT_ANIMATION_KEY: 'default_hit',
    ACTIONS: {
        SUFFIX: {
            ATTACK: '_atk',
            EFFECT: '_eff',
            HIT: '_hit'
        }
    },
    MESSAGE: {
        DATA: {
            LEVEL: 'lvl',
            EXPERIENCE: 'exp',
            CLASS_PATH_LABEL: 'lab',
            NEXT_LEVEL_EXPERIENCE: 'ne',
            SKILL_LEVEL: 'skl',
            LAST_ATTACK_KEY: 'k'
        },
        DATA_VALUES: {
            NAMESPACE: 'actions',
            lvl: 'level',
            exp: 'experience',
            lab: 'classPathLabel',
            ne: 'nextLevelExperience',
            skl: 'skillLevel'
        }
    },
    SELECTORS: {
        LEVEL_LABEL: '.level-container .level-label',
        CURRENT_EXPERIENCE: '.experience-container .current-experience',
        NEXT_LEVEL_EXPERIENCE: '.experience-container .next-level-experience',
        PLAYER_CREATE_FORM: '#player-create-form',
        UI_PLAYER_EXTRAS: '#ui-player-extras',
        PLAYER_CREATION_ADDITIONAL_INFO: '.player-creation-additional-info',
        PLAYER_SELECTION_ADDITIONAL_INFO: '.player-selection-additional-info',
        CLASS_PATH_LABEL: '.class-path-container .class-path-label',
        SKILLS_CONTAINER: '.skills-container'
    },
    SNIPPETS: {
        PREFIX: snippetsPrefix,
        SELECT_CLASS_PATH: snippetsPrefix + 'selectClassPath',
        EXPERIENCE_LABEL: snippetsPrefix + 'experienceLabel',
        LEVEL: snippetsPrefix + 'currentLevel',
        CLASS_PATH_LABEL: snippetsPrefix + 'classPathLabel',
        NEXT_LEVEL_EXPERIENCE: snippetsPrefix + 'nextLevelExperience',
        EXPERIENCE: snippetsPrefix + 'experience'
    }
};

},{}],"lfhLZ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SceneDynamic
 *
 */ const { Scene, Input } = require("56de17c4ccf45c73");
const { TileSetAnimation } = require("b334ee32beb899f2");
const { Minimap } = require("13bc6189b150e929");
const { GameConst } = require("c03f8a1b2de25882");
const { ActionsConst } = require("8ff1637c59b70d9");
const { Logger, sc } = require("bb692a977dadc69f");
const { ObjectsConst } = require("185341906c7b3aa0");
class SceneDynamic extends Scene {
    constructor(key, data, gameManager){
        super({
            key
        });
        this.key = key;
        this.params = data;
        this.gameManager = gameManager;
        this.eventsManager = gameManager.events;
        this.configManager = gameManager.config;
        this.layers = {};
        this.transition = true;
        this.useTsAnimation = false;
        this.arrowSprite = false;
        this.objectsAnimationsData = false;
        this.objectsAnimations = {};
        this.setPropertiesFromConfig();
        this.minimap = this.createMinimapInstance(this.minimapConfig);
        this.player = false;
        this.interpolatePlayersPosition = {};
        this.interpolateObjectsPositions = {};
        this.tilesets = [];
        this.tilesetAnimations = [];
        this.stopOnDeathOrDisabledSent = false;
    }
    setPropertiesFromConfig() {
        // @TODO - BETA - Move defaults to constants.
        if (!this.configManager) {
            this.configuredFrameRate = 10;
            this.clientInterpolation = true;
            this.interpolationSpeed = 0.1;
            this.minimapConfig = {};
            return false;
        }
        this.configuredFrameRate = this.configManager.getWithoutLogs('client/general/animations/frameRate', 10);
        this.clientInterpolation = this.configManager.getWithoutLogs('client/general/engine/clientInterpolation', true);
        this.interpolationSpeed = this.configManager.getWithoutLogs('client/general/engine/interpolationSpeed', 0.1);
        this.minimapConfig = this.configManager.getWithoutLogs('client/ui/minimap', {});
        return true;
    }
    createMinimapInstance(config) {
        if (!this.minimapConfig.enabled) return false;
        return new Minimap({
            config,
            events: this.eventsManager
        });
    }
    init() {
        this.scene.setVisible(false, this.key);
        this.input.keyboard.removeAllListeners();
    }
    async create() {
        this.eventsManager.emitSync('reldens.beforeSceneDynamicCreate', this);
        this.disableContextMenu();
        this.createControllerKeys();
        this.setupKeyboardAndPointerEvents();
        await this.createSceneMap();
        this.cameras.main.on('camerafadeincomplete', ()=>{
            this.transition = false;
            this.gameManager.gameDom.activeElement().blur();
            this.minimap.createMap(this, this.gameManager.getCurrentPlayerAnimation());
            this.gameManager.isChangingScene = false;
        });
        this.eventsManager.emitSync('reldens.afterSceneDynamicCreate', this);
    }
    update(time, delta) {
        this.interpolatePositions();
        this.movePlayerByPressedButtons();
    }
    disableContextMenu() {
        if (!this.gameManager.config.get('client/ui/controls/disableContextMenu')) return false;
        this.gameManager.gameDom.getDocument().addEventListener('contextmenu', (event)=>{
            event.preventDefault();
            event.stopPropagation();
        });
    }
    setupKeyboardAndPointerEvents() {
        this.input.keyboard.on('keydown', (event)=>{
            return this.executeKeyDownBehavior(event);
        });
        this.input.keyboard.on('keyup', (event)=>{
            this.executeKeyUpBehavior(event);
        });
        this.input.on('pointerdown', (pointer, currentlyOver)=>{
            return this.executePointerDownAction(pointer, currentlyOver);
        });
    }
    async createSceneMap() {
        this.map = this.make.tilemap({
            key: this.params.roomName
        });
        for (let imageKey of this.params.sceneImages){
            let tileset = this.map.addTilesetImage(this.params.roomName, imageKey);
            if (!tileset) Logger.critical('Tileset creation error. Check if the tileset name equals the imageKey without the extension.', {
                roomName: this.params.roomName,
                imageKeys: this.params.sceneImages,
                createdTileset: tileset
            });
            //Logger.debug('Created tileset.', imageKey, this.params.roomName);
            this.tilesets.push(tileset);
        }
        this.registerLayers();
        this.registerTilesetAnimation();
    }
    registerTilesetAnimation() {
        for (let tileset of this.tilesets){
            if (!this.hasTilesetAnimations(tileset)) continue;
            this.useTsAnimation = true;
            for (let i of Object.keys(this.layers)){
                let layer = this.layers[i];
                let tilesetAnimation = new TileSetAnimation();
                tilesetAnimation.register(layer, tileset);
                tilesetAnimation.start();
                this.tilesetAnimations.push(tilesetAnimation);
            }
        }
    }
    hasTilesetAnimations(tileset) {
        let tilesData = tileset?.tileData || {};
        let dataKeys = Object.keys(tilesData);
        if (0 === dataKeys.length) return false;
        for (let i of dataKeys){
            if (tilesData[i].animation) return true;
        }
        return false;
    }
    executeKeyDownBehavior(event) {
        if (this.gameManager.gameDom.insideInput()) return false;
        // @TODO - BETA - Make configurable the keys related to the actions and skills.
        if (Input.Keyboard.KeyCodes.SPACE === event.keyCode && !this.gameManager.gameDom.insideInput()) {
            if (!this.player) return;
            // If no target selected, auto-target nearest enemy and attack.
            if (!this.player.currentTarget) {
                let nearest = null;
                let tName = '';
                let objects = this.objectsAnimations || {};
                for (let k of Object.keys(objects)){
                    let obj = objects[k];
                    if (obj.type !== ObjectsConst.TYPE_ENEMY) continue;
                    let dist = Math.hypot(obj.x - this.player.state.x, obj.y - this.player.state.y);
                    if (!nearest || dist < nearest.dist) {
                        nearest = {
                            id: obj.key,
                            type: ObjectsConst.TYPE_OBJECT,
                            dist
                        };
                        tName = obj.targetName || '';
                    }
                }
                if (nearest) {
                    let previous = this.player.currentTarget ? Object.assign({}, this.player.currentTarget) : false;
                    this.player.currentTarget = {
                        id: nearest.id,
                        type: ObjectsConst.TYPE_OBJECT
                    };
                    this.gameManager.gameEngine.showTarget(tName, this.player.currentTarget, previous);
                }
            }
            this.player.runActions();
        }
        if (Input.Keyboard.KeyCodes.ESC === event.keyCode) this.gameManager.gameEngine.clearTarget();
        if (Input.Keyboard.KeyCodes.F5 === event.keyCode) this.gameManager.forcedDisconnection = true;
    }
    executeKeyUpBehavior(event) {
        if (!this.player) return;
        // stop all directional keys (arrows and wasd):
        let keys = this.availableControllersKeyCodes();
        if (-1 !== keys.indexOf(event.keyCode)) // @NOTE: all keyup events has to be sent.
        this.player.stop();
    }
    createControllerKeys() {
        // @TODO - BETA - Controllers will be part of the configuration in the database.
        this.keyLeft = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.LEFT);
        this.keyA = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.RIGHT);
        this.keyD = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.UP);
        this.keyW = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.DOWN);
        this.keyS = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
        let keys = this.availableControllersKeyCodes();
        let inputElements = this.gameManager.gameDom.getElements('input');
        for (let inputElement of inputElements)this.addAndRemoveCapture(keys, inputElement);
    }
    addAndRemoveCapture(keys, inputElement) {
        this.loopKeysAddListenerToElement(keys, inputElement, 'focusin', 'removeCapture');
        this.loopKeysAddListenerToElement(keys, inputElement, 'click', 'removeCapture');
        this.loopKeysAddListenerToElement(keys, inputElement, 'focusout', 'addCapture');
        this.loopKeysAddListenerToElement(keys, inputElement, 'blur', 'addCapture');
    }
    availableControllersKeyCodes() {
        return [
            Input.Keyboard.KeyCodes.LEFT,
            Input.Keyboard.KeyCodes.A,
            Input.Keyboard.KeyCodes.RIGHT,
            Input.Keyboard.KeyCodes.D,
            Input.Keyboard.KeyCodes.UP,
            Input.Keyboard.KeyCodes.W,
            Input.Keyboard.KeyCodes.DOWN,
            Input.Keyboard.KeyCodes.S
        ];
    }
    executePointerDownAction(pointer, currentlyOver) {
        if (0 < currentlyOver.length) return false;
        if (!this.gameManager.config.get('client/players/tapMovement/enabled')) return false;
        if (this.gameManager.activeRoomEvents.roomData?.worldConfig?.applyGravity) return false;
        let primaryMove = this.gameManager.config.get('client/ui/controls/primaryMove');
        let primaryTouch = this.gameManager.config.get('client/ui/controls/allowPrimaryTouch');
        if (!pointer.wasTouch && !pointer.primaryDown && primaryMove || !pointer.wasTouch && pointer.primaryDown && !primaryMove || pointer.wasTouch && !pointer.primaryDown && primaryTouch) return false;
        // @TODO - BETA - Temporal avoid double actions, if you target something you will not be moved to the
        //   pointer, in a future release this will be configurable, so you can walk to objects and they get
        //   activated, for example: click on and NPC, automatically walk close and automatically get a dialog
        //   opened.
        if (this.gameManager.gameDom.insideInput()) this.gameManager.gameDom.activeElement().blur();
        if (!this.appendRowAndColumn(pointer)) return false;
        this.player.moveToPointer(pointer);
        this.updatePointerObject(pointer);
    }
    movePlayerByPressedButtons() {
        // if player is writing there's no movement:
        if (this.gameManager.gameDom.insideInput()) return;
        if (this.transition || this.gameManager.isChangingScene) return;
        if (this.player.isDeath() || this.player.isDisabled()) {
            if (!this.stopOnDeathOrDisabledSent) this.player.fullStop();
            this.stopOnDeathOrDisabledSent = true;
            return;
        }
        // @TODO - BETA - Controllers will be part of the configuration in the database.
        if (this.keyRight.isDown || this.keyD.isDown) this.player.right();
        if (this.keyLeft.isDown || this.keyA.isDown) this.player.left();
        if (this.keyDown.isDown || this.keyS.isDown) this.player.down();
        if (this.keyUp.isDown || this.keyW.isDown) this.player.up();
    }
    interpolatePositions() {
        if (!this.clientInterpolation) return;
        this.processPlayersPositionInterpolation();
        this.processObjectsPositionInterpolation();
    }
    processPlayersPositionInterpolation() {
        let playerKeys = Object.keys(this.interpolatePlayersPosition);
        if (0 === playerKeys.length) return;
        if (!sc.get(this.player, 'players')) return;
        for (let i of playerKeys){
            let entityState = this.interpolatePlayersPosition[i];
            if (!entityState) continue;
            let entity = this.player.players[i];
            if (!entity) continue;
            if (this.isCurrentPosition(entity, entityState)) {
                delete this.interpolatePlayersPosition[i];
                continue;
            }
            let newX = sc.roundToPrecision(Phaser.Math.Linear(entity.x, entityState.x - this.player.leftOff, this.interpolationSpeed), 2);
            let newY = sc.roundToPrecision(Phaser.Math.Linear(entity.y, entityState.y - this.player.topOff, this.interpolationSpeed), 2);
            //Logger.debug('Player interpolation update.', newX, newY);
            this.player.processPlayerPositionAnimationUpdate(entity, entityState, i, newX, newY);
            if (!entityState.mov) delete this.interpolatePlayersPosition[i];
        }
    }
    processObjectsPositionInterpolation() {
        let objectsKeys = Object.keys(this.interpolateObjectsPositions);
        if (0 === objectsKeys.length) return;
        let objectsPlugin = this.gameManager.getFeature('objects');
        for (let i of objectsKeys){
            this.interpolateBulletPosition(i, objectsPlugin);
            this.interpolateObjectAnimationPosition(i, objectsPlugin);
        }
    }
    interpolateBulletPosition(i, objectsPlugin) {
        if (!this.isBullet(i)) return;
        let entity = sc.get(objectsPlugin.bullets, i);
        if (!entity) return;
        let entityState = this.interpolateObjectsPositions[i];
        if (!entityState) return;
        if (this.isCurrentPosition(entity, entityState)) {
            delete this.interpolateObjectsPositions[i];
            return;
        }
        let x = sc.roundToPrecision(Phaser.Math.Linear(entity.x, entityState.x, this.interpolationSpeed), 0);
        let y = sc.roundToPrecision(Phaser.Math.Linear(entity.y, entityState.y, this.interpolationSpeed), 0);
        let bodyData = {
            x,
            y
        };
        objectsPlugin.updateBulletBodyPosition(i, bodyData);
        if (!entityState.mov) delete this.interpolateObjectsPositions[i];
    }
    isBullet(objectKey) {
        return -1 !== objectKey.indexOf('bullet');
    }
    interpolateObjectAnimationPosition(i, objectsPlugin) {
        let entity = this.objectsAnimations[i];
        if (!entity) return;
        let entityState = this.interpolateObjectsPositions[i];
        if (!entityState) return;
        if (this.isCurrentPosition(entity, entityState)) {
            delete this.interpolateObjectsPositions[i];
            return;
        }
        let x = sc.roundToPrecision(Phaser.Math.Linear(entity.x, entityState.x, this.interpolationSpeed), 0);
        let y = sc.roundToPrecision(Phaser.Math.Linear(entity.y, entityState.y, this.interpolationSpeed), 0);
        let bodyData = {
            x,
            y,
            inState: entityState.inState,
            mov: entityState.mov
        };
        objectsPlugin.updateObjectsAnimations(i, bodyData, this);
        if (!entityState.mov) delete this.interpolateObjectsPositions[i];
    }
    isCurrentPosition(entity, entityState) {
        if (!entity || !entityState) {
            Logger.warning('None entity found to compare current entity position.');
            return false;
        }
        return Math.round(entity.x) === Math.round(entityState.x) && Math.round(entity.y) === Math.round(entityState.y);
    }
    async changeScene() {
        this.minimap?.destroyMap();
        this.eventsManager.emitSync('reldens.changeSceneDestroyPrevious', this);
        this.objectsAnimations = {};
        this.objectsAnimationsData = false;
        if (this.useTsAnimation) for (let tilesetAnimation of this.tilesetAnimations)tilesetAnimation.destroy();
    }
    registerLayers() {
        if (0 === this.map.layers.length) return;
        let idx = 0;
        // @TODO - BETA - Use single get(client/map).
        let depthBelowPlayer = this.configManager.get('client/map/layersDepth/belowPlayer');
        let depthForChangePoints = this.configManager.get('client/map/layersDepth/changePoints');
        for (let layer of this.map.layers){
            this.layers[idx] = this.map.createLayer(layer.name, this.tilesets);
            if (!this.layers[idx]) {
                Logger.critical('Map layer could not be created.', layer.name, this.key);
                continue;
            }
            if (-1 !== layer.name.indexOf('below-player')) this.layers[idx].setDepth(depthBelowPlayer);
            if (-1 !== layer.name.indexOf('over-player')) // we need to set the depth higher than everything else (multiply to get the highest value):
            this.layers[idx].setDepth(idx * this.map.height * this.map.tileHeight);
            if (-1 !== layer.name.indexOf('change-points')) this.layers[idx].setDepth(depthForChangePoints);
            idx++;
        }
    }
    appendRowAndColumn(pointer) {
        let worldToTileXY = this.map.worldToTileXY(pointer.worldX, pointer.worldY);
        let playerToTileXY = this.map.worldToTileXY(this.player.state.x, this.player.state.y);
        if (!worldToTileXY || !playerToTileXY) {
            Logger.error('Move to pointer error.');
            return false;
        }
        pointer.worldColumn = worldToTileXY.x;
        pointer.worldRow = worldToTileXY.y;
        pointer.playerOriginCol = playerToTileXY.x;
        pointer.playerOriginRow = playerToTileXY.y;
        return pointer;
    }
    createFloatingText(x, y, message, color, font, fontSize = 14, duration = 600, top = 50, stroke = '#000000', strokeThickness = 4, shadowColor = 'rgba(0,0,0,0.7)') {
        let damageSprite = this.add.text(x, y, message, {
            fontFamily: font,
            fontSize: fontSize + 'px'
        });
        damageSprite.style.setColor(color);
        damageSprite.style.setAlign('center');
        damageSprite.style.setStroke(stroke, strokeThickness);
        damageSprite.style.setShadow(5, 5, shadowColor, 5);
        damageSprite.setDepth(200000);
        this.add.tween({
            targets: damageSprite,
            duration,
            ease: 'Exponential.In',
            y: y - top,
            onComplete: ()=>{
                damageSprite.destroy();
            }
        });
    }
    updatePointerObject(pointer) {
        if (!this.configManager.get('client/ui/pointer/show')) return;
        if (this.arrowSprite) this.arrowSprite.destroy();
        let topOffSet = this.configManager.get('client/ui/pointer/topOffSet', 16);
        this.arrowSprite = this.physics.add.sprite(pointer.worldX, pointer.worldY - topOffSet, GameConst.ARROW_DOWN);
        this.arrowSprite.setDepth(500000);
        this.arrowSprite.anims.play(GameConst.ARROW_DOWN, true).on('animationcomplete', ()=>{
            this.arrowSprite.destroy();
        });
    }
    getAnimationByKey(key) {
        if (!this.anims || !this.anims?.anims || !this.anims?.anims?.entries) {
            Logger.error('Animations not loaded.', this.anims);
            return false;
        }
        return sc.get(this.anims.anims.entries, key, false);
    }
    getObjectFromExtraData(objKey, extraData, currentPlayer) {
        // @TODO - BETA - Replace with constants.
        // objKey = t > target
        // objKey = o > owner
        let returnObj = false;
        let dataTargetType = objKey + 'T'; // tT - oT === DATA_TARGET_TYPE - DATA_OWNER_TYPE
        let dataTargetKey = objKey + 'K'; // tK - oK === DATA_TARGET_KEY - DATA_OWNER_KEY
        let isTargetPlayer = extraData[dataTargetType] === ActionsConst.DATA_TYPE_VALUE_PLAYER;
        if (!isTargetPlayer && sc.hasOwn(this.objectsAnimations, extraData[dataTargetKey])) returnObj = this.objectsAnimations[extraData[dataTargetKey]];
        if (isTargetPlayer && sc.hasOwn(currentPlayer.players, extraData[dataTargetKey])) returnObj = currentPlayer.players[extraData[dataTargetKey]];
        return returnObj;
    }
    loopKeysAddListenerToElement(keys, element, eventName, action) {
        element.addEventListener(eventName, ()=>{
            for (let keyCode of keys)this.input.keyboard[action](keyCode);
        });
    }
}
module.exports.SceneDynamic = SceneDynamic;

},{"56de17c4ccf45c73":"phaser","b334ee32beb899f2":"du9ec","13bc6189b150e929":"i8FXV","c03f8a1b2de25882":"iznl5","8ff1637c59b70d9":"eRkMR","bb692a977dadc69f":"@reldens/utils","185341906c7b3aa0":"k06SD"}],"du9ec":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TileSetAnimation
 *
 */ class TileSetAnimation {
    constructor(props){
        this.timer = props?.timer;
    }
    register(layer, tileset) {
        this.animations = [];
        this.registered = {};
        this.layer = layer;
        this.tileset = tileset;
        for (let i of Object.keys(tileset.tileData)){
            let tileData = tileset.tileData[i];
            if (!tileData.animation) continue;
            tileData.id = i;
            let indexCounter = 0;
            for (let anInd of tileData.animation){
                if (Number(i) === Number(anInd?.tileid || 0)) {
                    tileData.initIndex = indexCounter;
                    break;
                }
                indexCounter++;
            }
            this.animations.push(tileData);
        }
    }
    start() {
        for (let anim of this.animations){
            let animation = anim.animation;
            let total = animation.length;
            let startIndex = Number(anim.initIndex || 0);
            let next = Number((startIndex + 1) % total);
            this.repeat(anim, startIndex, next);
        }
    }
    repeat(anim, index, next) {
        let id = anim.id;
        if (this.registered[id]) this.registered[id] = null;
        let animation = anim.animation;
        let total = animation.length;
        let firstId = Number(this.tileset.firstgid);
        let replaceTile = Number(anim.animation[index].tileid) + firstId;
        let replacementTile = Number(anim.animation[next].tileid) + firstId;
        this.layer.replaceByIndex(replaceTile, replacementTile);
        let duration = animation[next].duration;
        let indexTotal = Number((next + 1) % total);
        this.registered[id] = this.setTimeout(this.repeat.bind(this, anim, Number(next), indexTotal), duration);
    }
    destroy() {
        for (let i of Object.keys(this.registered))if (this.registered[i]) this.clearTimeout(this.registered[i]);
    }
    setTimeout(callback, duration) {
        if (this.timer) return this.timer.setTimeout(callback, duration);
        // fallback for old timers:
        // @ts-ignore
        return setTimeout(callback, duration);
    }
    clearTimeout(timer) {
        if (this.timer) return this.timer.clearTimeout(timer);
        // fallback for old timers:
        // @ts-ignore
        clearTimeout(timer);
    }
}
module.exports.TileSetAnimation = TileSetAnimation;

},{}],"i8FXV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Minimap
 *
 */ const { sc } = require("c1999f9b5d5e09ce");
class Minimap {
    constructor(props){
        this.config = props.config;
        this.events = props.events;
    }
    createMap(scene, playerSprite) {
        // @TODO - BETA - Improve camera.
        this.minimapCamera = false;
        this.circle = false;
        this.scope = false;
        this.awaitOnCamera = sc.get(this.config, 'awaitOnCamera', 400);
        this.autoWidth = scene.map.widthInPixels / sc.get(this.config, 'mapWidthDivisor', 1);
        this.camWidth = sc.get(this.config, 'fixedWidth', this.autoWidth);
        this.autoHeight = scene.map.heightInPixels / sc.get(this.config, 'mapHeightDivisor', 1);
        this.camHeight = sc.get(this.config, 'fixedHeight', this.autoHeight);
        this.camX = sc.get(this.config, 'camX', 0);
        this.camY = sc.get(this.config, 'camY', 0);
        this.camBackgroundColor = sc.get(this.config, 'camBackgroundColor', 'rgba(0,0,0,0.6)');
        this.camZoom = sc.get(this.config, 'camZoom', 0.15);
        this.roundMap = sc.get(this.config, 'roundMap', false);
        this.addCircle = sc.get(this.config, 'addCircle', false);
        this.createMinimapCamera(scene, playerSprite);
        this.createRoundMap(scene);
        this.events.emitSync('reldens.createdMinimap', this);
    }
    createMinimapCamera(scene, playerSprite) {
        this.minimapCamera = scene.cameras.add(this.camX, this.camY, this.camWidth, this.camHeight).setName('minimap').setBackgroundColor(this.camBackgroundColor).setZoom(this.camZoom).startFollow(playerSprite, sc.get(this.config, 'mapCameraRoundPixels', true), sc.get(this.config, 'mapCameraLerpX', 1), sc.get(this.config, 'mapCameraLerpY', 1)).setRoundPixels(true).setVisible(false).setOrigin(sc.get(this.config, 'mapCameraOriginX', 0.18), sc.get(this.config, 'mapCameraOriginY', 0.18));
    }
    createRoundMap(scene) {
        if (!this.roundMap) return false;
        if (this.addCircle) this.addMinimapCircle(scene);
        this.createRoundCamera(scene);
    }
    addMinimapCircle(scene) {
        let activeScenePreloader = scene.gameManager.getActiveScenePreloader();
        this.circle = activeScenePreloader.add.circle(sc.get(this.config, 'circleX', 220), sc.get(this.config, 'circleY', 88), sc.get(this.config, 'circleRadio', 80.35), sc.get(this.config, 'circleColor', 'rgb(0,0,0)'), sc.get(this.config, 'circleAlpha', 1));
        this.circle.setStrokeStyle(sc.get(this.config, 'circleStrokeLineWidth', 6), sc.get(this.config, 'circleStrokeColor', 0), sc.get(this.config, 'circleStrokeAlpha', 0.6));
        this.circle.setFillStyle(sc.get(this.config, 'circleFillColor', 1), sc.get(this.config, 'circleFillAlpha', 0));
        this.circle.setVisible(false);
    }
    createRoundCamera(scene) {
        this.scope = scene.add.graphics();
        this.scope.fillStyle(0x000000, 0).fillCircle(sc.get(this.config, 'circleX', 220), sc.get(this.config, 'circleY', 88), sc.get(this.config, 'circleRadio', 80.35));
        this.minimapCamera.setMask(this.scope.createGeometryMask());
    }
    destroyMap() {
        delete this.minimapCamera;
        delete this.circle;
        delete this.scope;
    }
}
module.exports.Minimap = Minimap;

},{"c1999f9b5d5e09ce":"@reldens/utils"}],"gePxs":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ScenePreloader
 *
 */ const { Scene, Geom } = require("8f766b8f0d7630d6");
const { MinimapUi } = require("64a334dcd3e65bd4");
const { InstructionsUi } = require("936bc5003291bd3d");
const { SettingsUi } = require("c21ef162a4dcfda6");
const { Joystick } = require("ad6886ec1b7e2757");
const { GameConst } = require("835464c1daa61ed6");
const { ActionsConst } = require("eab2c5783e5cea80");
const { Logger, sc } = require("36253877d5e76351");
class ScenePreloader extends Scene {
    constructor(props){
        super({
            key: props.name
        });
        this.relatedSceneKey = props.name.replace(GameConst.SCENE_PRELOADER, '');
        this.progressBar = null;
        this.progressCompleteRect = null;
        this.progressRect = null;
        this.userInterfaces = {};
        this.preloadMapKey = props.map;
        this.preloadImages = props.images;
        this.uiScene = props.uiScene;
        this.elementsUi = {};
        this.gameManager = props.gameManager;
        this.eventsManager = props.gameManager.events;
        this.preloadAssets = props.preloadAssets || {};
        this.directionalAnimations = {};
        this.objectsAnimations = {};
        if (!this.gameManager.createdAnimations) this.gameManager.createdAnimations = {};
        let currentScene = this.gameManager.activeRoomEvents.getActiveScene();
        currentScene.objectsAnimationsData = props.objectsAnimationsData;
        this.playerSpriteSize = {
            frameWidth: this.gameManager.config.get('client/players/size/width', 52),
            frameHeight: this.gameManager.config.get('client/players/size/height', 71)
        };
        this.useJoystick = this.gameManager.config.getWithoutLogs('client/ui/controls/useJoystick', false);
        this.joystick = new Joystick({
            scenePreloader: this
        });
    }
    preload() {
        // @NOTE: this event run ONLY ONE TIME for each scene.
        let eventUiScene = this.uiScene ? this : this.gameManager.gameEngine.uiScene;
        this.eventsManager.emitSync('reldens.beforePreload', this, eventUiScene);
        this.preloadUiScene();
        this.preloadMapJson();
        // @TODO - BETA - CHECK - Test a multiple tiles images case.
        this.preloadMapImages();
        this.preloadValidAssets();
        this.preloadPlayerDefaultSprite();
        this.preloadArrowPointer();
        // @TODO - BETA - Move everything related to player stats into the users pack or create a new pack.
        this.load.image(GameConst.ICON_STATS, this.gameManager.config.get('client/general/assets/statsIconPath', '/assets/icons/book.png'));
        this.load.on('fileprogress', this.onFileProgress, this);
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);
        this.configuredFrameRate = this.gameManager.config.get('client/general/animations/frameRate', 10);
        this.showLoadingProgressBar();
    }
    preloadMapJson() {
        if (!this.preloadMapKey) return;
        // @TODO - BETA - Refactor to pass the map_filename from the server as a parameter.
        this.load.tilemapTiledJSON(this.preloadMapKey, '/assets/maps/' + this.preloadMapKey + '.json');
    }
    preloadArrowPointer() {
        if (!this.gameManager.config.get('client/ui/pointer/show')) return;
        let pointerData = {
            frameWidth: this.gameManager.config.getWithoutLogs('client/general/assets/arrowDownFrameWidth', 32),
            frameHeight: this.gameManager.config.getWithoutLogs('client/general/assets/arrowDownFrameHeight', 32)
        };
        this.load.spritesheet(GameConst.ARROW_DOWN, this.gameManager.config.get('client/general/assets/arrowDownPath', '/assets/sprites/arrow-down.png'), pointerData);
    }
    preloadUiScene() {
        if (!this.uiScene) return;
        // @NOTE: the events here run only once over all the game progress.
        this.eventsManager.emitSync('reldens.beforePreloadUiScene', this);
        if (this.gameManager.config.get('client/ui/playerBox/enabled')) this.load.html('playerBox', '/assets/html/ui-player-box.html');
        if (this.gameManager.config.get('client/ui/controls/enabled')) this.load.html('controls', '/assets/html/ui-controls.html');
        if (this.useJoystick) this.load.html('joystick', '/assets/html/ui-joystick.html');
        if (this.gameManager.config.get('client/ui/sceneLabel/enabled')) this.load.html('sceneLabel', '/assets/html/ui-scene-label.html');
        if (this.gameManager.config.get('client/ui/instructions/enabled')) this.load.html('instructions', '/assets/html/ui-instructions.html');
        if (this.gameManager.config.get('client/ui/minimap/enabled')) this.load.html('minimap', '/assets/html/ui-minimap.html');
        if (this.gameManager.config.get('client/ui/settings/enabled')) {
            this.load.html('settings', '/assets/html/ui-settings.html');
            this.load.html('settings-content', '/assets/html/ui-settings-content.html');
        }
        if (this.gameManager.config.getWithoutLogs('client/ui/preloadTarget/enabled', true)) this.load.html('uiTarget', '/assets/html/ui-target.html');
        if (this.gameManager.config.getWithoutLogs('client/ui/preloadOptionsTemplates/enabled', true)) {
            this.load.html('uiOptionButton', '/assets/html/ui-option-button.html');
            this.load.html('uiOptionIcon', '/assets/html/ui-option-icon.html');
            this.load.html('uiOptionsContainer', '/assets/html/ui-options-container.html');
        }
        if (this.gameManager.config.getWithoutLogs('client/ui/preloadLoading/enabled', true)) this.load.html('uiLoading', '/assets/html/ui-loading.html');
        this.eventsManager.emitSync('reldens.preloadUiScene', this);
    }
    preloadMapImages() {
        if (!this.preloadImages) return;
        for (let imageFile of this.preloadImages)this.load.image(imageFile, `/assets/maps/${imageFile}`);
    }
    preloadValidAssets() {
        if (!sc.isObject(this.preloadAssets)) {
            Logger.info('None assets available for preload.');
            return;
        }
        // @TODO - BETA - Remove the hardcoded file extensions.
        let preloadAssetsKeys = Object.keys(this.preloadAssets);
        for (let i of preloadAssetsKeys){
            let asset = this.preloadAssets[i];
            if ('spritesheet' !== asset.asset_type) continue;
            let assetParams = sc.toJson(asset.extra_params);
            if (!assetParams) {
                Logger.error('Missing spritesheet params.', asset);
                continue;
            }
            this.load.spritesheet(asset.asset_key, `/assets/custom/sprites/${asset.asset_file}`, assetParams);
        }
    }
    create() {
        // @NOTE: this event run once for each scene.
        let eventUiScene = this.uiScene ? this : this.gameManager.gameEngine.uiScene;
        this.eventsManager.emitSync('reldens.createPreload', this, eventUiScene);
        if (this.uiScene) this.createUiScene();
        this.createPlayerAnimations(sc.get(this.gameManager.playerData, 'avatarKey', GameConst.IMAGE_PLAYER));
        this.createArrowAnimation();
    }
    createUiScene() {
        // @NOTE: the events here run only once over all the game progress.
        this.eventsManager.emitSync('reldens.beforeCreateUiScene', this);
        // @TODO - BETA - Replace all different DOM references and standardize with the game engine driver.
        this.createPlayerBox();
        this.createTargetUi();
        this.createSceneLabelBox();
        this.createControlsBox();
        this.createInstructionsBox();
        this.createMiniMap();
        this.createSettingsUi();
        this.eventsManager.emitSync('reldens.createUiScene', this);
    }
    createSettingsUi() {
        let settingsConfig = this.getUiConfig('settings');
        if (!settingsConfig.enabled) return;
        this.settingsUi = new SettingsUi();
        this.settingsUi.createSettings(settingsConfig, this);
    }
    createMiniMap() {
        let minimapConfig = this.getUiConfig('minimap');
        if (!minimapConfig.enabled) return;
        this.minimapUi = new MinimapUi();
        this.minimapUi.createMinimap(minimapConfig, this);
    }
    createInstructionsBox() {
        let instConfig = this.getUiConfig('instructions');
        if (!instConfig.enabled) return;
        this.instructionsUi = new InstructionsUi();
        this.instructionsUi.createInstructions(instConfig, this);
    }
    createControlsBox() {
        let controlsUi = this.getUiConfig('controls');
        if (!controlsUi.enabled) return;
        if (this.useJoystick) {
            this.elementsUi['controls'] = this.createUi('joystick', controlsUi);
            return this.joystick.registerJoystickController();
        }
        this.elementsUi['controls'] = this.createUi('controls', controlsUi);
        return this.registerControllers(this.elementsUi['controls']);
    }
    createUi(key, uiConfig) {
        return this.createContent(key, uiConfig.uiX, uiConfig.uiY);
    }
    createContent(key, x, y) {
        return this.add.dom(x, y).createFromCache(key);
    }
    createSceneLabelBox() {
        let sceneLabelUi = this.getUiConfig('sceneLabel');
        if (!sceneLabelUi.enabled) return;
        this.elementsUi['sceneLabel'] = this.createUi('sceneLabel', sceneLabelUi);
    }
    createTargetUi() {
        let targetUi = this.getUiConfig('uiTarget');
        if (!targetUi.enabled) return;
        this.uiTarget = this.createUi('uiTarget', targetUi);
        let closeButton = this.uiTarget.getChildByProperty('className', 'close-target');
        closeButton.addEventListener('click', ()=>{
            this.gameManager.gameEngine.clearTarget();
        });
    }
    createPlayerBox() {
        let playerBox = this.getUiConfig('playerBox');
        if (!playerBox.enabled) return;
        this.elementsUi['playerBox'] = this.createUi('playerBox', playerBox);
        let logoutButton = this.elementsUi['playerBox'].getChildByProperty('id', 'logout');
        logoutButton?.addEventListener('click', ()=>{
            this.gameManager.forcedDisconnection = true;
            // @TODO - BETA - Move this into an event on the firebase plugin.
            if (this.gameManager.firebase.isActive) this.gameManager.firebase.app.auth().signOut();
            this.gameManager.gameDom.getWindow().location.reload();
        });
    }
    getUiConfig(uiName, newWidth, newHeight) {
        let { uiX, uiY } = this.getUiPosition(uiName, newWidth, newHeight);
        return {
            enabled: this.gameManager.config.getWithoutLogs('client/ui/' + uiName + '/enabled'),
            uiX,
            uiY
        };
    }
    getUiPosition(uiName, newWidth, newHeight) {
        if ('' === uiName) uiName = 'default';
        let uiConfig = this.gameManager.config.getWithoutLogs('client/ui/' + uiName, {});
        let uiX = sc.get(uiConfig, 'x', 0);
        let uiY = sc.get(uiConfig, 'y', 0);
        if (this.gameManager.config.get('client/ui/screen/responsive')) {
            let rX = sc.get(uiConfig, 'responsiveX', false);
            let rY = sc.get(uiConfig, 'responsiveY', false);
            let gameContainer = this.gameManager.gameDom.getElement(GameConst.SELECTORS.GAME_CONTAINER);
            if (!newWidth) newWidth = gameContainer.offsetWidth;
            if (!newHeight) newHeight = gameContainer.offsetHeight;
            uiX = false !== rX ? rX * newWidth / 100 : 0;
            uiY = false !== rY ? rY * newHeight / 100 : 0;
        }
        return {
            uiX,
            uiY
        };
    }
    preloadPlayerDefaultSprite() {
        let fallbackImage = this.gameManager.config.get('client/players/animations/fallbackImage', 'player-base.png');
        this.load.spritesheet(GameConst.IMAGE_PLAYER, '/assets/custom/sprites/' + fallbackImage, this.playerSpriteSize);
    }
    createPlayerAnimations(avatarKey) {
        let avatarFrames = this.gameManager.config.getWithoutLogs('client/players/animations/' + avatarKey + 'Frames', this.gameManager.config.get('client/players/animations/defaultFrames'));
        let availableAnimations = [
            {
                k: avatarKey + '_' + GameConst.LEFT,
                img: avatarKey,
                start: avatarFrames.left.start || 3,
                end: avatarFrames.left.end || 5,
                repeat: -1,
                hide: false
            },
            {
                k: avatarKey + '_' + GameConst.RIGHT,
                img: avatarKey,
                start: avatarFrames.right.start || 6,
                end: avatarFrames.right.end || 8,
                repeat: -1,
                hide: false
            },
            {
                k: avatarKey + '_' + GameConst.UP,
                img: avatarKey,
                start: avatarFrames.up.start || 9,
                end: avatarFrames.up.end || 11,
                repeat: -1,
                hide: false
            },
            {
                k: avatarKey + '_' + GameConst.DOWN,
                img: avatarKey,
                start: avatarFrames.down.start || 0,
                end: avatarFrames.down.end || 2,
                repeat: -1,
                hide: false
            }
        ];
        for (let anim of availableAnimations)this.createAnimationWith(anim);
        this.eventsManager.emitSync('reldens.createPlayerAnimations', this, avatarKey);
    }
    createArrowAnimation() {
        if (!this.gameManager.config.get('client/ui/pointer/show')) return;
        let arrowAnim = {
            k: GameConst.ARROW_DOWN,
            img: GameConst.ARROW_DOWN,
            start: 0,
            end: 2,
            repeat: 3,
            rate: 6
        };
        this.createAnimationWith(arrowAnim);
    }
    createAnimationWith(anim) {
        if (this.gameManager.createdAnimations[anim.k]) return;
        let animationConfig = {
            key: anim.k,
            frames: this.anims.generateFrameNumbers(anim.img, {
                start: anim.start,
                end: anim.end
            }),
            frameRate: sc.get(anim, 'frameRate', this.configuredFrameRate),
            repeat: anim.repeat,
            hideOnComplete: sc.get(anim, 'hide', true)
        };
        //Logger.debug('Creating animation: '+anim.k, animationConfig);
        this.gameManager.createdAnimations[anim.k] = this.anims.create(animationConfig);
        return this.gameManager.createdAnimations[anim.k];
    }
    registerControllers(controllersBox) {
        // @TODO - BETA - Controllers will be part of the configuration in the database.
        this.setupDirButtonInBox(GameConst.UP, controllersBox);
        this.setupDirButtonInBox(GameConst.DOWN, controllersBox);
        this.setupDirButtonInBox(GameConst.LEFT, controllersBox);
        this.setupDirButtonInBox(GameConst.RIGHT, controllersBox);
        this.setupDefaultActionKey(controllersBox);
    }
    setupDefaultActionKey(controllersBox) {
        // if the default action is not specified we won't show the button:
        let defaultActionKey = this.gameManager.config.get('client/ui/controls/defaultActionKey') || 'physical_attack';
        let actionBox = this.createActionBox(defaultActionKey);
        this.gameManager.gameDom.appendToElement('.action-buttons', actionBox);
        this.setupActionButtonInBox(defaultActionKey, controllersBox);
    }
    createActionBox(actionKey) {
        let skillTemplate = this.cache.html.get('actionBox');
        return this.gameManager.gameEngine.parseTemplate(skillTemplate, {
            key: actionKey,
            actionName: actionKey
        });
    }
    setupDirButtonInBox(dir, box) {
        let btn = box.getChildByProperty('id', dir);
        if (btn) this.hold(btn, {
            dir: dir
        });
    }
    setupActionButtonInBox(action, box) {
        let actionButton = box.getChildByProperty('id', action);
        if (!actionButton) return;
        if (this.gameManager.config.get('client/general/controls/action_button_hold')) {
            this.hold(actionButton, action);
            return;
        }
        actionButton?.addEventListener('click', ()=>{
            let currentScene = this.gameManager.activeRoomEvents.getActiveScene();
            let dataSend = {
                act: ActionsConst.ACTION,
                target: currentScene.player.currentTarget,
                type: action
            };
            this.gameManager.activeRoomEvents.send(dataSend);
        });
    }
    hold(button, action) {
        button.addEventListener('mousedown', (event)=>{
            this.startHold(event, button, action);
        });
        button.addEventListener('mouseup', (event)=>{
            this.endHold(event, button);
        });
        button.addEventListener('mouseout', (event)=>{
            this.endHold(event, button);
        });
        button.addEventListener('touchstart', (event)=>{
            this.startHold(event, button, action);
        });
        button.addEventListener('touchend', (event)=>{
            this.endHold(event, button);
        });
    }
    startHold(event, button, action) {
        event.preventDefault();
        if (this.gameManager.config.get('client/ui/controls/opacityEffect')) button.classList.add('button-opacity-off');
        let currentScene = this.gameManager.activeRoomEvents.getActiveScene();
        let dataSend = action;
        // @TODO - BETA - Controllers will be part of the configuration in the database.
        if (!sc.hasOwn(action, 'dir')) {
            // action can be a string key (e.g., 'attack') or an object with {type: '...'}
            let actionType = typeof action === 'string' ? action : action?.type;
            if (!actionType) // fallback to configured default or 'attack'
            actionType = this.gameManager.config.get('client/ui/controls/defaultActionKey') || 'attack';
            dataSend = {
                act: ActionsConst.ACTION,
                target: currentScene.player.currentTarget,
                type: actionType
            };
        }
        this.gameManager.activeRoomEvents.send(dataSend);
    }
    endHold(event, button) {
        event.preventDefault();
        if (this.gameManager.config.get('client/ui/controls/opacityEffect')) button.classList.remove('button-opacity-off');
        this.gameManager.activeRoomEvents.send({
            act: GameConst.STOP
        });
    }
    showLoadingProgressBar() {
        if (!this.gameManager.config.getWithoutLogs('client/ui/loading/show', true)) return;
        let Rectangle = Geom.Rectangle;
        let main = Rectangle.Clone(this.cameras.main);
        this.progressRect = new Rectangle(0, 0, main.width / 2, 50);
        Rectangle.CenterOn(this.progressRect, main.centerX, main.centerY);
        this.progressCompleteRect = Geom.Rectangle.Clone(this.progressRect);
        this.progressBar = this.createGraphics();
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let fontFamily = this.gameManager.config.get('client/ui/loading/font');
        let loadingFontSize = this.gameManager.config.get('client/ui/loading/fontSize');
        let loadingAssetsSize = this.gameManager.config.get('client/ui/loading/assetsSize');
        this.loadingText = this.createText(width / 2, height / 2 - 50, 'Loading...', {
            fontFamily,
            fontSize: loadingFontSize
        });
        this.loadingText.setOrigin(0.5, 0.5);
        this.loadingText.setFill(this.gameManager.config.get('client/ui/loading/loadingColor'));
        this.percentText = this.createText(width / 2, height / 2 - 5, '0%', {
            fontFamily,
            fontSize: loadingAssetsSize
        });
        this.percentText.setOrigin(0.5, 0.5);
        this.percentText.setFill(this.gameManager.config.get('client/ui/loading/percentColor'));
        this.assetText = this.createText(width / 2, height / 2 + 50, '', {
            fontFamily,
            fontSize: loadingAssetsSize
        });
        this.assetText.setFill(this.gameManager.config.get('client/ui/loading/assetsColor'));
        this.assetText.setOrigin(0.5, 0.5);
    }
    createText(width, height, text, styles) {
        return this.add.text(width, height, text, styles);
    }
    createGraphics() {
        return this.add.graphics();
    }
    onLoadComplete() {
        for (let child of this.children.list)child.destroy();
        this.loadingText.destroy();
        this.assetText.destroy();
        this.percentText.destroy();
        this.scene.shutdown();
    }
    onFileProgress(file) {
        if (!this.gameManager.config.get('client/ui/loading/showAssets')) return;
        // @TODO - WIP - TRANSLATIONS.
        this.assetText.setText('Loading ' + file.key);
    }
    onLoadProgress(progress) {
        let progressText = parseInt(progress * 100) + '%';
        this.percentText.setText(progressText);
        let color = 0xffffff;
        let fillColor = 0x222222;
        this.progressRect.width = progress * this.progressCompleteRect.width;
        this.progressBar.clear().fillStyle(fillColor).fillRectShape(this.progressCompleteRect).fillStyle(color).fillRectShape(this.progressRect);
    }
    getUiElement(uiName, logError = true) {
        if (sc.hasOwn(this.elementsUi, uiName)) return this.elementsUi[uiName];
        if (logError) Logger.error('UI not found.', {
            uiName
        });
        return false;
    }
}
module.exports.ScenePreloader = ScenePreloader;

},{"8f766b8f0d7630d6":"phaser","64a334dcd3e65bd4":"2pjft","936bc5003291bd3d":"26mIg","c21ef162a4dcfda6":"aTHAU","ad6886ec1b7e2757":"7A0Xi","835464c1daa61ed6":"iznl5","eab2c5783e5cea80":"eRkMR","36253877d5e76351":"@reldens/utils"}],"2pjft":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MinimapUi
 *
 */ const { sc } = require("2f2421424d7d7b51");
class MinimapUi {
    createMinimap(minimapConfig, scenePreloader) {
        // @TODO - BETA - Replace by UserInterface.
        scenePreloader.elementsUi['minimap'] = scenePreloader.add.dom(minimapConfig.uiX, minimapConfig.uiY).createFromCache('minimap');
        let openButton = scenePreloader.elementsUi['minimap'].getChildByProperty('id', 'minimap-open');
        let closeButton = scenePreloader.elementsUi['minimap'].getChildByProperty('id', 'minimap-close');
        openButton?.addEventListener('click', ()=>{
            let box = scenePreloader.elementsUi['minimap'].getChildByProperty('id', 'minimap-ui');
            box.classList.remove('hidden');
            openButton.classList.add('hidden');
            let minimap = scenePreloader.gameManager.getActiveScene().minimap;
            if (!minimap) return;
            this.showMap(minimap, scenePreloader, openButton, closeButton, box);
        });
        closeButton?.addEventListener('click', ()=>{
            let box = scenePreloader.elementsUi['minimap'].getChildByProperty('id', 'minimap-ui');
            box.classList.add('hidden');
            if (openButton) openButton.classList.remove('hidden');
            let minimap = scenePreloader.gameManager.getActiveScene().minimap;
            if (!minimap) return;
            this.hideMap(minimap, scenePreloader, closeButton, box);
        });
    }
    showMap(minimap, scenePreloader, openButton, closeButton, box) {
        if (this.awaitForCamera(minimap)) {
            setTimeout(()=>{
                this.showMap(minimap, scenePreloader, openButton, closeButton, box);
            }, minimap.awaitOnCamera);
            return;
        }
        minimap.minimapCamera.setVisible(true);
        if (minimap.circle) minimap.circle.setVisible(true);
        scenePreloader.gameManager.events.emit('reldens.openUI', {
            ui: this,
            openButton,
            minimap,
            box
        });
    }
    hideMap(minimap, scenePreloader, closeButton, box) {
        if (this.awaitForCamera(minimap)) {
            setTimeout(()=>{
                this.hideMap(minimap, scenePreloader, closeButton, box);
            }, minimap.awaitOnCamera);
            return;
        }
        minimap.minimapCamera.setVisible(false);
        if (minimap.circle) minimap.circle.setVisible(false);
        scenePreloader.gameManager.events.emit('reldens.closeUI', {
            ui: this,
            closeButton,
            minimap,
            box
        });
    }
    awaitForCamera(minimap) {
        return 0 < minimap.awaitOnCamera && (!minimap.minimapCamera || !sc.isFunction(minimap.minimapCamera.setVisible));
    }
}
module.exports.MinimapUi = MinimapUi;

},{"2f2421424d7d7b51":"@reldens/utils"}],"26mIg":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - InstructionsUi
 *
 */ const { Logger } = require("29fc70a7ef91dac7");
class InstructionsUi {
    createInstructions(instConfig, uiScene) {
        // @TODO - BETA - Replace by UserInterface.
        let dialogBox = uiScene.add.dom(instConfig.uiX, instConfig.uiY).createFromCache('instructions');
        if (!dialogBox) {
            Logger.info('Instructions dialog box could not be created.');
            return false;
        }
        let dialogContainer = uiScene.gameManager.gameDom.getElement('#instructions');
        if (!dialogContainer) {
            Logger.info('Instructions container not found.');
            return false;
        }
        let openButton = dialogBox.getChildByProperty('id', 'instructions-open');
        openButton?.addEventListener('click', ()=>{
            // @TODO - BETA - Replace styles by classes.
            dialogContainer.style.display = 'block';
            uiScene.gameManager.events.emit('reldens.openUI', {
                ui: this,
                openButton,
                dialogBox,
                dialogContainer,
                uiScene
            });
        });
        let closeButton = uiScene.gameManager.gameDom.getElement('#instructions-close');
        closeButton?.addEventListener('click', ()=>{
            // @TODO - BETA - Replace styles by classes.
            dialogContainer.style.display = 'none';
            uiScene.gameManager.events.emit('reldens.closeUI', {
                ui: this,
                closeButton,
                openButton,
                dialogBox,
                dialogContainer,
                uiScene
            });
        });
        uiScene.elementsUi['instructions'] = dialogBox;
    }
}
module.exports.InstructionsUi = InstructionsUi;

},{"29fc70a7ef91dac7":"@reldens/utils"}],"aTHAU":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SettingsUi
 *
 */ const { Logger } = require("ef5a8f725428dc7c");
class SettingsUi {
    createSettings(settingsConfig, uiScene) {
        // @TODO - BETA - Replace by UserInterface.
        let dialogBox = uiScene.add.dom(settingsConfig.uiX, settingsConfig.uiY).createFromCache('settings');
        if (!dialogBox) {
            Logger.info('Settings dialog box could not be created.');
            return false;
        }
        let settingsTemplate = uiScene.cache.html.get('settings-content');
        if (!settingsTemplate) {
            Logger.info('Settings template not found.');
            return false;
        }
        uiScene.gameManager.gameDom.appendToElement('.content', settingsTemplate);
        let dialogContainer = uiScene.gameManager.gameDom.getElement('#settings-ui');
        if (!dialogContainer) {
            Logger.info('Settings container not found.');
            return false;
        }
        let closeButton = uiScene.gameManager.gameDom.getElement('#settings-close');
        let openButton = dialogBox.getChildByProperty('id', 'settings-open');
        openButton?.addEventListener('click', ()=>{
            // @TODO - BETA - Replace styles classes.
            dialogContainer.style.display = 'block';
            if (openButton) openButton.style.display = 'none';
            uiScene.gameManager.events.emit('reldens.openUI', {
                ui: this,
                openButton,
                dialogBox,
                dialogContainer,
                uiScene
            });
        });
        closeButton?.addEventListener('click', ()=>{
            // @TODO - BETA - Replace styles classes.
            dialogContainer.style.display = 'none';
            if (openButton) openButton.style.display = 'block';
            uiScene.gameManager.events.emit('reldens.closeUI', {
                ui: this,
                closeButton,
                openButton,
                dialogBox,
                dialogContainer,
                uiScene
            });
        });
        uiScene.elementsUi['settings'] = dialogBox;
    }
}
module.exports.SettingsUi = SettingsUi;

},{"ef5a8f725428dc7c":"@reldens/utils"}],"7A0Xi":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Joystick
 *
 */ const { GameConst } = require("9fba4ae732684e48");
const { Logger } = require("93c2f2af6847956");
class Joystick {
    constructor(props){
        this.gameManager = props?.scenePreloader?.gameManager;
        this.scenePreloader = props?.scenePreloader;
        this.gameDom = this.gameManager?.gameDom;
        this.isDragging = false;
        this.centerX = false;
        this.centerY = false;
        this.threshold = this.gameManager.config.getWithoutLogs('client/ui/controls/joystickThreshold', 20);
        this.joystickLeft = this.gameManager.config.getWithoutLogs('client/ui/controls/joystickLeft', 25);
        this.joystickTop = this.gameManager.config.getWithoutLogs('client/ui/controls/joystickTop', 25);
        this.positionSufix = 'px';
    }
    registerJoystickController() {
        if (!this.gameManager) {
            Logger.error('GameManager undefined on Joystick.');
            return false;
        }
        this.joystick = this.gameDom.getElement('#joystick');
        this.joystickThumb = this.gameDom.getElement('#joystick-thumb');
        this.joystickThumb.addEventListener('mousedown', (event)=>{
            this.applyMovement(event.clientX, event.clientY);
        });
        this.joystickThumb.addEventListener('touchstart', (event)=>{
            event.preventDefault();
            let touch = event.touches?.shift();
            this.applyMovement(touch.clientX, touch.clientY);
        });
        this.gameDom.getDocument().addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.gameDom.getDocument().addEventListener('mouseup', this.handleStop.bind(this));
        this.gameDom.getDocument().addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.gameDom.getDocument().addEventListener('touchend', this.handleStop.bind(this));
    }
    position(value) {
        return value + this.positionSufix;
    }
    applyMovement(clientX, clientY) {
        this.isDragging = true;
        let rect = this.joystick.getBoundingClientRect();
        this.centerX = rect.width / 2;
        this.centerY = rect.height / 2;
        this.updateThumbPosition(clientX - rect.left, clientY - rect.top);
    }
    handleStop() {
        this.isDragging = false;
        this.joystickThumb.style.left = this.position(this.joystickLeft);
        this.joystickThumb.style.top = this.position(this.joystickTop);
        this.gameManager.getCurrentPlayer().stop();
    }
    updateDirection(x, y) {
        let dx = x - this.centerX;
        let dy = y - this.centerY;
        let direction = GameConst.STOP;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > this.threshold) {
                direction = dx > 0 ? Math.abs(dy) > this.threshold ? dy > 0 ? 'right-down' : 'right-up' : 'right' : Math.abs(dy) > this.threshold ? dy > 0 ? 'left-down' : 'left-up' : 'left';
                for (let dir of direction.split('-'))try {
                    this.gameManager.getCurrentPlayer()[dir]();
                } catch (error) {
                //Logger.debug('Unknown direction on PlayerEngine.', dir, error);
                }
                return direction;
            }
        }
        if (Math.abs(dy) > this.threshold) {
            direction = dy > 0 ? Math.abs(dx) > this.threshold ? dx > 0 ? 'down-right' : 'down-left' : 'down' : Math.abs(dx) > this.threshold ? dx > 0 ? 'up-right' : 'up-left' : 'up';
            for (let dir of direction.split('-'))try {
                this.gameManager.getCurrentPlayer()[dir]();
            } catch (error) {
            //Logger.debug('Unknown direction on PlayerEngine.', dir, error);
            }
            return direction;
        }
        this.gameManager.getCurrentPlayer().stop();
        return direction;
    }
    updateThumbPosition(x, y) {
        let dx = x - this.centerX;
        let dy = y - this.centerY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = Math.min(this.centerX, this.centerY);
        if (distance > maxDistance) {
            let angle = Math.atan2(dy, dx);
            let joystickLeft = Math.cos(angle) * maxDistance + this.centerX - this.joystickThumb.offsetWidth / 2;
            this.joystickThumb.style.left = this.position(joystickLeft);
            let joystickTop = Math.sin(angle) * maxDistance + this.centerY - this.joystickThumb.offsetHeight / 2;
            this.joystickThumb.style.top = this.position(joystickTop);
            return;
        }
        let joystickLeft = x - this.joystickThumb.offsetWidth / 2;
        this.joystickThumb.style.left = this.position(joystickLeft);
        let joystickTop = y - this.joystickThumb.offsetHeight / 2;
        this.joystickThumb.style.top = this.position(joystickTop);
    }
    handleMouseMove(event) {
        if (!this.isDragging) return;
        let rect = this.joystick.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        this.updateThumbPosition(x, y);
        this.updateDirection(x, y);
    }
    handleTouchMove(event) {
        if (!this.isDragging) return;
        let touch = event.touches?.shift();
        let rect = this.joystick.getBoundingClientRect();
        let x = touch.clientX - rect.left;
        let y = touch.clientY - rect.top;
        this.updateThumbPosition(x, y);
        this.updateDirection(x, y);
    }
}
module.exports.Joystick = Joystick;

},{"9fba4ae732684e48":"iznl5","93c2f2af6847956":"@reldens/utils"}],"iXDUS":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ClientStartHandler
 *
 */ const { RegistrationFormHandler } = require("608d613a940bf253");
const { TermsAndConditionsHandler } = require("68a30757e194dcbe");
const { LoginFormHandler } = require("8ae6e016860e3760");
const { ForgotPasswordFormHandler } = require("88d5365e17c4acaf");
const { GuestFormHandler } = require("edd6483cd3317d55");
const { FullScreenHandler } = require("a064b368ba69cc47");
class ClientStartHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
    }
    clientStart() {
        let registrationForm = new RegistrationFormHandler(this.gameManager);
        registrationForm.activateRegistration();
        let guestForm = new GuestFormHandler(this.gameManager);
        guestForm.activateGuest();
        let termsAndConditions = new TermsAndConditionsHandler(this.gameManager);
        termsAndConditions.activateTermsAndConditions();
        let loginForm = new LoginFormHandler(this.gameManager);
        loginForm.activateLogin();
        let forgotPasswordForm = new ForgotPasswordFormHandler(this.gameManager);
        forgotPasswordForm.activateForgotPassword();
        forgotPasswordForm.displayForgotPassword();
        let fullScreen = new FullScreenHandler(this.gameManager);
        fullScreen.activateFullScreen();
        if (this.gameManager.firebase) this.gameManager.firebase.startFirebase();
        Object.assign(this.gameManager.elements, {
            registrationForm,
            termsAndConditions,
            loginForm,
            forgotPasswordForm,
            fullScreen
        });
        this.gameManager.events.emitSync('reldens.clientStartAfter', this);
    }
}
module.exports.ClientStartHandler = ClientStartHandler;

},{"608d613a940bf253":"dGwVu","68a30757e194dcbe":"8D0Pn","8ae6e016860e3760":"lFXX5","88d5365e17c4acaf":"l0kPv","edd6483cd3317d55":"7PxTe","a064b368ba69cc47":"3iKsV"}],"dGwVu":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - RegistrationHandler
 *
 */ const { ErrorsBlockHandler } = require("d85d91b48b2c7edd");
const { GameConst } = require("90dddfb611375998");
class RegistrationFormHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.form = gameManager.gameDom.getElement(GameConst.SELECTORS.REGISTER_FORM);
    }
    activateRegistration() {
        if (!this.form) return false;
        if (!this.gameManager.config.get('client/general/users/allowRegistration')) {
            this.form.classList.add('hidden');
            return true;
        }
        ErrorsBlockHandler.reset(this.form);
        let selectors = GameConst.SELECTORS;
        let acceptTermsCheckbox = this.gameDom.getElement(selectors.TERMS.ACCEPT);
        let termsContainer = this.gameDom.getElement(selectors.TERMS.BOX);
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if (!this.form.checkValidity()) return false;
            let password = this.gameDom.getElement(selectors.REGISTRATION.PASSWORD).value;
            let rePassword = this.gameDom.getElement(selectors.REGISTRATION.RE_PASSWORD).value;
            let responseErrorBlock = this.form.querySelector(selectors.RESPONSE_ERROR);
            if (password !== rePassword && responseErrorBlock) {
                // @TODO - BETA - Execute translations before the game engine starts.
                /*
                responseErrorBlock.innerHTML = this.gameManager.services.translator.t(
                    'game.passwordConfirmationNotMatch'
                );
                */ responseErrorBlock.innerHTML = 'Password and confirmation does not match.';
                return false;
            }
            if (!acceptTermsCheckbox.checked && responseErrorBlock) {
                // @TODO - BETA - Execute translations before the game engine starts.
                /*
                responseErrorBlock.innerHTML = this.gameManager.services.translator.t(
                    'game.pleaseReadTermsAndConditions'
                );
                */ responseErrorBlock.innerHTML = 'Please read and accept the terms and conditions and continue.';
                return false;
            }
            termsContainer?.classList.add(GameConst.CLASSES.HIDDEN);
            this.form.querySelector(selectors.LOADING_CONTAINER).classList.remove(GameConst.CLASSES.HIDDEN);
            let formData = {
                formId: this.form.id,
                email: this.gameDom.getElement(selectors.REGISTRATION.EMAIL).value,
                username: this.gameDom.getElement(selectors.REGISTRATION.USERNAME).value,
                password: password,
                rePassword: rePassword
            };
            this.gameManager.startGame(formData, true);
        });
    }
}
module.exports.RegistrationFormHandler = RegistrationFormHandler;

},{"d85d91b48b2c7edd":"cgmYV","90dddfb611375998":"iznl5"}],"cgmYV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ErrorsBlockHandler
 *
 */ const { GameConst } = require("e917c2c795f7ff8f");
class ErrorsBlockHandler {
    static reset(form) {
        let errorBlock = form.querySelector(GameConst.SELECTORS.RESPONSE_ERROR);
        form.querySelector(GameConst.SELECTORS.INPUT).addEventListener('focus', ()=>{
            errorBlock.innerHTML = '';
            let loadingContainer = form.querySelector(GameConst.SELECTORS.LOADING_CONTAINER);
            if (loadingContainer) loadingContainer?.classList.add(GameConst.CLASSES.HIDDEN);
        });
    }
}
module.exports.ErrorsBlockHandler = ErrorsBlockHandler;

},{"e917c2c795f7ff8f":"iznl5"}],"8D0Pn":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TermsAndConditionsHandler
 *
 */ const { GameConst } = require("d6063cbabda2e0b9");
const { Logger } = require("8a5736287636926a");
class TermsAndConditionsHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.linkContainer = this.gameManager.gameDom.getElement(GameConst.SELECTORS.TERMS.LINK_CONTAINER);
    }
    activateTermsAndConditions() {
        if (!this.linkContainer) return false;
        let termsAndConditionsUrl = this.gameManager.appServerUrl + GameConst.ROUTE_PATHS.TERMS_AND_CONDITIONS;
        let params = new URL(this.gameDom.getDocument().location).searchParams;
        let language = params.get('lang', '');
        if ('' !== language) termsAndConditionsUrl += '?lang=' + language;
        this.gameDom.getJSON(termsAndConditionsUrl, (err, response)=>{
            if (err) {
                Logger.error('TermsAndConditionsHandler - request failed.', err);
                return false;
            }
            if (!response) {
                Logger.error('TermsAndConditionsHandler - empty response.');
                return false;
            }
            if (!response.body || !response.heading || !response.checkboxLabel || !response.link) return false;
            let selectors = GameConst.SELECTORS.TERMS;
            this.gameDom.updateContent(selectors.HEADING, response.heading);
            this.gameDom.updateContent(selectors.BODY, response.body);
            this.gameDom.updateContent(selectors.ACCEPT_LABEL, response.checkboxLabel);
            this.gameDom.updateContent(selectors.LINK, response.link);
            let termsLink = this.gameDom.getElement(selectors.LINK);
            let termsContainer = this.gameDom.getElement(selectors.BOX);
            termsLink?.addEventListener('click', (e)=>{
                e.preventDefault();
                termsContainer?.classList.remove(GameConst.CLASSES.HIDDEN);
            });
            this.gameDom.getElement(selectors.CLOSE)?.addEventListener('click', ()=>{
                termsContainer?.classList.add(GameConst.CLASSES.HIDDEN);
            });
            let register = this.gameDom.getElement(GameConst.SELECTORS.REGISTER_FORM);
            if (register) {
                let errorBlock = this.gameDom.getElement(GameConst.SELECTORS.RESPONSE_ERROR, register);
                let acceptTermsCheckbox = this.gameDom.getElement(selectors.ACCEPT);
                let acceptLabel = this.gameDom.getElement(selectors.ACCEPT_LABEL);
                if (acceptTermsCheckbox) acceptTermsCheckbox.addEventListener('click', ()=>{
                    if (acceptTermsCheckbox.checked && errorBlock) errorBlock.innerHTML = '';
                });
                if (acceptTermsCheckbox && acceptLabel) acceptLabel.addEventListener('click', ()=>{
                    if (acceptTermsCheckbox.checked && errorBlock) errorBlock.innerHTML = '';
                });
            }
            this.linkContainer?.classList.remove(GameConst.CLASSES.HIDDEN);
        });
    }
}
module.exports.TermsAndConditionsHandler = TermsAndConditionsHandler;

},{"d6063cbabda2e0b9":"iznl5","8a5736287636926a":"@reldens/utils"}],"lFXX5":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - LoginFormHandler
 *
 */ const { ErrorsBlockHandler } = require("d5f948fac025cf00");
const { GameConst } = require("249620b21dc55ebc");
class LoginFormHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.form = gameManager.gameDom.getElement(GameConst.SELECTORS.LOGIN_FORM);
    }
    activateLogin() {
        if (!this.form) return false;
        ErrorsBlockHandler.reset(this.form);
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            ErrorsBlockHandler.reset(this.form);
            if (!this.form.checkValidity()) return false;
            if (this.gameManager.submitedForm) return false;
            this.gameManager.submitedForm = true;
            this.form.querySelector(GameConst.SELECTORS.LOADING_CONTAINER).classList.remove(GameConst.CLASSES.HIDDEN);
            let formData = {
                formId: this.form.id,
                username: this.form.querySelector(GameConst.SELECTORS.LOGIN.USERNAME).value,
                password: this.form.querySelector(GameConst.SELECTORS.LOGIN.PASSWORD).value
            };
            return this.gameManager.startGame(formData, false);
        });
    }
}
module.exports.LoginFormHandler = LoginFormHandler;

},{"d5f948fac025cf00":"cgmYV","249620b21dc55ebc":"iznl5"}],"l0kPv":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ForgotPasswordFormHandler
 *
 */ const { ErrorsBlockHandler } = require("193981fc3d2d2a4f");
const { GameConst } = require("efa22c200ffe27c4");
const { Logger } = require("8b6d6b1a7ced50e6");
class ForgotPasswordFormHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.form = this.gameManager.gameDom.getElement(GameConst.SELECTORS.FORGOT_PASSWORD_FORM);
    }
    activateForgotPassword() {
        if (!this.form) return false;
        if (!this.gameManager.config.get('client/general/users/allowRegistration')) {
            this.form.classList.add('hidden');
            return true;
        }
        ErrorsBlockHandler.reset(this.form);
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            ErrorsBlockHandler.reset(this.form);
            if (!this.form.checkValidity()) return false;
            this.form.querySelector(GameConst.SELECTORS.LOADING_CONTAINER).classList.remove(GameConst.CLASSES.HIDDEN);
            let formData = {
                formId: this.form.id,
                forgot: true,
                email: this.form.querySelector(GameConst.SELECTORS.FORGOT_PASSWORD.EMAIL).value
            };
            this.gameManager.startGame(formData, false);
        });
    }
    displayForgotPassword() {
        this.gameDom.getJSON(this.gameManager.appServerUrl + GameConst.ROUTE_PATHS.MAILER, (err, response)=>{
            if (err) {
                Logger.error('ForgotPasswordFormHandler - mailer check failed.', err);
                return;
            }
            if (!response || !response.enabled) return;
            this.gameDom.getElement(GameConst.SELECTORS.FORGOT_PASSWORD.CONTAINER)?.classList.remove(GameConst.CLASSES.HIDDEN);
        });
    }
}
module.exports.ForgotPasswordFormHandler = ForgotPasswordFormHandler;

},{"193981fc3d2d2a4f":"cgmYV","efa22c200ffe27c4":"iznl5","8b6d6b1a7ced50e6":"@reldens/utils"}],"7PxTe":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GuestFormHandler
 *
 */ const { ErrorsBlockHandler } = require("c149aa2f304f71c9");
const { GameConst } = require("d0afa55222144fd5");
const { sc } = require("92bd0e265310931");
class GuestFormHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.form = gameManager.gameDom.getElement(GameConst.SELECTORS.GUEST_FORM);
    }
    activateGuest() {
        if (!this.form) return false;
        if (!this.gameManager.config.get('client/general/users/allowGuest')) {
            this.form.classList.add('hidden');
            return true;
        }
        ErrorsBlockHandler.reset(this.form);
        let selectors = GameConst.SELECTORS;
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if (!this.form.checkValidity()) return false;
            this.form.querySelector(selectors.LOADING_CONTAINER).classList.remove(GameConst.CLASSES.HIDDEN);
            let randomGuestName = 'guest-' + sc.randomChars(12);
            let userName = this.gameManager.config.getWithoutLogs('client/general/users/allowGuestUserName', false) ? this.gameDom.getElement(selectors.GUEST.USERNAME).value : randomGuestName;
            let formData = {
                formId: this.form.id,
                username: userName,
                password: userName,
                rePassword: userName,
                isGuest: true
            };
            this.gameManager.startGame(formData, true);
        });
    }
}
module.exports.GuestFormHandler = GuestFormHandler;

},{"c149aa2f304f71c9":"cgmYV","d0afa55222144fd5":"iznl5","92bd0e265310931":"@reldens/utils"}],"3iKsV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - FullScreenHandler
 *
 */ const { GameConst } = require("4eab227d1a0a5e15");
class FullScreenHandler {
    constructor(gameManager){
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.body = this.gameDom.getElement(GameConst.SELECTORS.BODY);
    }
    activateFullScreen() {
        this.gameDom.getElement(GameConst.SELECTORS.FULL_SCREEN_BUTTON)?.addEventListener('click', (e)=>{
            e.preventDefault();
            if (!this.gameDom.getDocument().fullscreenEnabled) return false;
            this.body.requestFullscreen();
            this.goFullScreen();
        });
        this.gameDom.getWindow().matchMedia('(display-mode: fullscreen)').addEventListener('change', ({ matches })=>{
            if (matches) {
                this.goFullScreen();
                return;
            }
            this.exitFullScreen();
        });
    }
    goFullScreen() {
        this.body.classList.add(GameConst.CLASSES.FULL_SCREEN_ON);
        if (this.gameManager?.gameEngine) this.gameManager.gameEngine.updateGameSize(this.gameManager);
    }
    exitFullScreen() {
        this.body.classList.remove(GameConst.CLASSES.FULL_SCREEN_ON);
        if (this.gameManager?.gameEngine) this.gameManager.gameEngine.updateGameSize(this.gameManager);
    }
}
module.exports.FullScreenHandler = FullScreenHandler;

},{"4eab227d1a0a5e15":"iznl5"}],"ipTz2":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - FeaturesManager
 *
 * This class will handle features activation on the client depending on the configuration received from the server.
 *
 */ const { ClientCoreFeatures } = require("937fbabd544d980a");
const { Logger, sc } = require("6153197f4dcf6984");
class FeaturesManager {
    constructor(props){
        this.gameManager = sc.get(props, 'gameManager', false);
        this.events = sc.get(props, 'events', false);
    }
    async loadFeatures(featuresCodeList) {
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in FeaturesManager.');
            return false;
        }
        if (!this.events) {
            Logger.error('EventsManager undefined in FeaturesManager.');
            return false;
        }
        this.featuresList = {};
        await this.events.emit('reldens.loadFeatures', this, featuresCodeList);
        let featuresKeys = Object.keys(featuresCodeList);
        if (0 === featuresKeys.length) return this.featuresList;
        for (let i of featuresKeys){
            let featureCode = featuresCodeList[i];
            if (!sc.hasOwn(ClientCoreFeatures, featureCode)) continue;
            this.featuresList[featureCode] = new ClientCoreFeatures[featureCode]();
            if ('function' === typeof this.featuresList[featureCode].setup) await this.featuresList[featureCode].setup({
                gameManager: this.gameManager,
                events: this.events
            });
            await this.events.emit('reldens.loadFeature_' + featureCode, this.featuresList[featureCode], this);
        }
        return this.featuresList;
    }
}
module.exports.FeaturesManager = FeaturesManager;

},{"937fbabd544d980a":"2qJiN","6153197f4dcf6984":"@reldens/utils"}],"2qJiN":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Client Core Features
 *
 * All the core features plugins will be available here.
 * Later we can control if the feature is enabled/disabled using the configuration in the storage.
 * Core features will be available as part of the current Reldens version.
 *
 */ const { ChatPlugin } = require("c80cf07351e7933e");
const { ObjectsPlugin } = require("202c37cfc4f01952");
const { InventoryPlugin } = require("86e49040e809ec9");
const { ActionsPlugin } = require("7b4ce1e4916d0d89");
const { UsersPlugin } = require("f6b714dd3b21c20c");
const { AudioPlugin } = require("548842b5f4200d4");
const { RoomsPlugin } = require("f55cb270e23ef32f");
const { PredictionPlugin } = require("d51d3dd16adea08c");
const { TeamsPlugin } = require("f9876ae3d71a9760");
const { SnippetsPlugin } = require("32c4ba6aa423f6a1");
const { AdsPlugin } = require("a9dc07b8ccee3ac8");
const { WorldPlugin } = require("b2cf245c110682c9");
const { ScoresPlugin } = require("766badb4827425d2");
const { RewardsPlugin } = require("c8ce87b75f2d2d6e");
module.exports.ClientCoreFeatures = {
    chat: ChatPlugin,
    objects: ObjectsPlugin,
    inventory: InventoryPlugin,
    actions: ActionsPlugin,
    users: UsersPlugin,
    audio: AudioPlugin,
    rooms: RoomsPlugin,
    prediction: PredictionPlugin,
    teams: TeamsPlugin,
    snippets: SnippetsPlugin,
    ads: AdsPlugin,
    world: WorldPlugin,
    scores: ScoresPlugin,
    rewards: RewardsPlugin
};

},{"c80cf07351e7933e":"6bWEm","202c37cfc4f01952":"lnHp9","86e49040e809ec9":"hmGdV","7b4ce1e4916d0d89":"7FLuF","f6b714dd3b21c20c":"2Cvu0","548842b5f4200d4":"lFBMv","f55cb270e23ef32f":"dPmzV","d51d3dd16adea08c":"35dQU","f9876ae3d71a9760":"3qHRJ","32c4ba6aa423f6a1":"2Xir8","a9dc07b8ccee3ac8":"k2r2D","b2cf245c110682c9":"dOo7i","766badb4827425d2":"lTwjz","c8ce87b75f2d2d6e":"4hqJz"}],"6bWEm":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Chat Client Plugin
 *
 */ const { ChatUi } = require("653d21cde32274c8");
const { MessagesListener } = require("cb116d66f1b17398");
const { TemplatesHandler } = require("4097a6f796a25dd5");
const Translations = require("c9c24694c3cbf963");
const { TranslationsMapper } = require("bf04b3fa400750d7");
const { PluginInterface } = require("d2c4700437670cee");
const { ChatConst } = require("a7668ee71f7c68d1");
const { Logger, sc } = require("731cc76cccefd84");
class ChatPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in ActionsPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in ChatPlugin.');
        this.messagesQueu = [];
        this.uiManager = false;
        this.joinRooms = [
            ChatConst.CHAT_GLOBAL
        ];
        this.setTranslations();
        this.listenEvents();
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, ChatConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        if (!this.events) return false;
        // chat messages are global for all rooms, so we use the generic event for every joined room:
        this.events.on('reldens.joinedRoom', async (room)=>{
            await MessagesListener.listenMessages(room, this);
        });
        this.events.on('reldens.preloadUiScene', (preloadScene)=>{
            TemplatesHandler.preloadTemplates(preloadScene, this.gameManager.config.get('client/ui/chat/showTabs'));
        });
        this.events.on('reldens.createUiScene', (uiScene)=>{
            this.uiManager = new ChatUi(uiScene);
            this.uiManager.createUi();
            this.uiManager.createTabs();
            this.uiManager.processMessagesQueue(this.messagesQueu);
        });
    }
}
module.exports.ChatPlugin = ChatPlugin;

},{"653d21cde32274c8":"b9I2w","cb116d66f1b17398":"dmDFt","4097a6f796a25dd5":"7cmwN","c9c24694c3cbf963":"8zoUf","bf04b3fa400750d7":"fKH2J","d2c4700437670cee":"deNd3","a7668ee71f7c68d1":"c0XFM","731cc76cccefd84":"@reldens/utils"}],"b9I2w":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ChatUi
 *
 */ const { Input } = require("25a87f28fb7e0308");
const { SpriteTextFactory } = require("9224444cee79f5ae");
const { ChatTabs } = require("eae9f6a9f3b912be");
const { ChatConst } = require("e56c6f22335ef248");
const { Logger, sc } = require("3e430b9bcb390349");
class ChatUi {
    constructor(uiScene){
        this.uiScene = uiScene;
        this.gameManager = this.uiScene?.gameManager;
        this.gameDom = this.uiScene?.gameManager?.gameDom;
        this.setChatTypes();
        this.setChatConfiguration();
        this.uiChat = {};
        this.messagesQueu = [];
        this.chatInput = false;
        this.chatSendButton = false;
        this.chatCloseButton = false;
        this.chatOpenButton = false;
    }
    setChatConfiguration() {
        if (!this.gameManager || !this.gameManager.config) return false;
        this.uiConfig = this.gameManager.config.get('client/ui/chat');
        this.overheadChat = sc.get(this.uiConfig, 'overheadChat', {});
        this.overHeadChatEnabled = sc.get(this.overheadChat, 'enabled', false);
        this.overheadText = sc.get(this.uiConfig, 'overheadText', {});
        this.isDefaultOpen = sc.get(this.uiConfig, 'defaultOpen', false);
        this.isTyping = sc.get(this.overheadChat, 'isTyping', false);
        this.showTabs = sc.get(this.uiConfig, 'showTabs', false);
        this.closeChatBoxAfterSend = sc.get(this.closeChatBoxAfterSend, 'isTyping', false);
        this.messagesConfig = this.gameManager.config.get('client/chat/messages');
        this.characterLimit = sc.get(this.messagesConfig, 'characterLimit', 0);
        this.characterLimitOverhead = sc.get(this.messagesConfig, 'characterLimitOverhead', 0);
        this.appendErrorTypeOnActiveTab = sc.get(this.messagesConfig, 'appendErrorTypeOnActiveTab', true);
    }
    setChatTypes() {
        if (!this.gameManager) {
            Logger.warning('Missing GameManager on ChatUI.');
            return false;
        }
        if (!this.gameDom) {
            Logger.warning('Missing GameDom on ChatUI.');
            return false;
        }
        if (!this.gameManager.initialGameData) {
            Logger.warning('Missing "initialGameData" on ChatUI.');
            return false;
        }
        this.chatTypes = sc.get(this.gameManager.initialGameData, 'chatTypes', []);
        if (0 === this.chatTypes.length) return false;
        this.chatTypesById = {};
        for (let chatType of this.chatTypes)this.chatTypesById[chatType.id] = chatType;
    }
    createUi() {
        if (!this.uiScene) {
            Logger.warning('Missing UI Scene on ChatUI.');
            return false;
        }
        // @TODO - BETA - Replace by UserInterface.
        let { uiX, uiY } = this.uiScene.getUiConfig('chat');
        this.uiChat = this.uiScene.add.dom(uiX, uiY).createFromCache('chat');
        this.uiScene.elementsUi['chat'] = this.uiChat;
        this.chatInput = this.uiChat.getChildByProperty('id', ChatConst.CHAT_INPUT);
        if (!this.chatInput) {
            Logger.info('Missing chat input on ChatUI.');
            return false;
        }
        this.setupKeyPressBehaviors();
        this.chatInput.addEventListener('onfocusout', ()=>{
            this.hideIsTyping();
        });
        this.setupSendButton();
        this.setupOpenCloseButtons();
        if (this.overHeadChatEnabled) this.setupOverheadChatEvents();
        if (this.isDefaultOpen) this.showChatBox();
    }
    createTabs() {
        if (!this.showTabs) return false;
        this.tabs = new ChatTabs(this.gameManager, this.uiScene);
        return true;
    }
    setupOverheadChatEvents() {
        this.gameManager.events.on('reldens.runPlayerAnimation', (playerEngine, playerId, playerState, playerSprite)=>{
            this.updateOverheadTextPosition(playerSprite);
        });
    }
    setupOpenCloseButtons() {
        this.chatOpenButton = this.uiChat.getChildByProperty('id', ChatConst.CHAT_OPEN_BUTTON);
        this.chatOpenButton?.addEventListener('click', ()=>{
            this.showChatBox();
            this.gameManager.events.emit('reldens.openUI', {
                ui: this,
                openButton: this.chatOpenButton,
                dialogBox: this.uiChat,
                dialogContainer: this.uiChat.getChildByProperty('id', ChatConst.CHAT_UI),
                uiScene: this.uiScene
            });
        });
        this.chatCloseButton = this.uiChat.getChildByProperty('id', ChatConst.CHAT_CLOSE_BUTTON);
        this.chatCloseButton?.addEventListener('click', ()=>{
            this.hideChatBox();
            this.gameManager.events.emit('reldens.closeUI', {
                ui: this,
                closeButton: this.chatCloseButton,
                openButton: this.chatOpenButton,
                dialogBox: this.uiChat,
                dialogContainer: this.uiChat.getChildByProperty('id', ChatConst.CHAT_UI),
                uiScene: this.uiScene
            });
        });
    }
    setupSendButton() {
        this.chatSendButton = this.uiChat.getChildByProperty('id', ChatConst.CHAT_SEND_BUTTON);
        this.chatSendButton?.addEventListener('click', (event)=>{
            event.preventDefault();
            this.sendChatMessage(this.chatInput, this.gameManager.activeRoomEvents);
            this.chatInput.focus();
        });
    }
    setupKeyPressBehaviors() {
        this.uiScene.input.keyboard.on('keyup-ENTER', ()=>{
            if (!this.isFocussedOnChatInput()) {
                this.showChatBox();
                this.chatInput.focus();
            }
        });
        this.chatInput.addEventListener('keyup', (event)=>{
            if (event.keyCode === Input.Keyboard.KeyCodes.ENTER) {
                event.preventDefault();
                this.sendChatMessage();
                return;
            }
            this.showIsTyping();
        });
    }
    showOverheadChat(playerSprite, message) {
        if (!this.overHeadChatEnabled) return false;
        if (playerSprite['overheadTextSprite']) this.destroyTextSprite(playerSprite);
        message = this.applyTextLimit(message, this.characterLimitOverhead);
        playerSprite['overheadTextSprite'] = SpriteTextFactory.attachTextToSprite(playerSprite, message, this.overheadText, sc.get(this.overheadText, 'topOff', 0), 'overheadTextSprite', this.gameManager.getActiveScene());
        let timeOut = sc.get(this.overheadText, 'timeOut', false);
        if (timeOut) setTimeout(()=>{
            this.destroyTextSprite(playerSprite);
        }, timeOut);
    }
    updateOverheadTextPosition(playerSprite) {
        if (!playerSprite['overheadTextSprite']) return false;
        let relativePosition = SpriteTextFactory.getTextPosition(playerSprite, playerSprite.playerName, this.overheadText, sc.get(this.overheadText, 'topOff', 0));
        playerSprite['overheadTextSprite'].x = relativePosition.x;
        playerSprite['overheadTextSprite'].y = relativePosition.y;
    }
    destroyTextSprite(playerSprite) {
        if (!playerSprite['overheadTextSprite']) return false;
        playerSprite['overheadTextSprite'].destroy();
        delete playerSprite['overheadTextSprite'];
    }
    showIsTyping() {
        if (!this.overHeadChatEnabled || !this.isTyping) return false;
        if (!this.isFocussedOnChatInput()) return false;
        this.showOverheadChat(this.gameManager.getCurrentPlayerAnimation(), this.gameManager.config.getWithoutLogs('client/ui/chat/waitingContent', this.t(ChatConst.SNIPPETS.WAITING)));
    }
    hideIsTyping() {
        if (!this.isTyping) return false;
        this.destroyTextSprite(this.gameManager.getCurrentPlayerAnimation());
    }
    isFocussedOnChatInput() {
        return this.gameManager.gameDom.activeElement() === this.chatInput;
    }
    showChatBox() {
        let box = this.uiChat.getChildByProperty('id', ChatConst.CHAT_UI);
        box.classList.remove('hidden');
        this.uiChat.setDepth(4);
        this.chatOpenButton?.classList.add('hidden');
        let readPanel = this.gameDom.getElement(ChatConst.SELECTORS.CHAT_MESSAGES);
        if (readPanel) readPanel.parentNode.scrollTop = readPanel.scrollHeight;
        this.hideNotificationsBalloon();
    }
    hideChatBox() {
        let box = this.uiChat.getChildByProperty('id', ChatConst.CHAT_UI);
        if (!box) {
            Logger.info('Chat UI box not found.');
            return false;
        }
        box.classList.add('hidden');
        this.uiChat.setDepth(1);
        this.chatOpenButton?.classList.remove('hidden');
    }
    showNotificationBalloon() {
        this.getActiveBalloon()?.classList.remove('hidden');
    }
    hideNotificationsBalloon() {
        this.getActiveBalloon()?.classList.add('hidden');
    }
    getActiveBalloon() {
        if (!sc.get(this.uiConfig, 'notificationBalloon')) return false;
        let chatBalloon = this.uiChat.getChildByProperty('id', ChatConst.CHAT_BALLOON);
        if (!chatBalloon) return false;
        return chatBalloon;
    }
    processMessagesQueue(messages) {
        if (0 === messages.length) return false;
        for (let message of messages)this.attachNewMessage(message);
    }
    attachNewMessage(message) {
        if (!this.gameManager.gameEngine.uiScene.cache) // expected while uiScene is being created:
        // Logger.info('Missing uiScene cache on chat message.', message);
        return;
        let messageTemplate = this.gameManager.gameEngine.uiScene.cache.html.get('chatMessage');
        let messageString = this.translateMessage(message);
        let output = this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            from: this.translateFrom(message),
            color: ChatConst.TYPE_COLOR[message[ChatConst.TYPES.KEY]],
            message: messageString
        });
        let defaultType = this.showTabs ? ChatConst.TYPES.MESSAGE : '';
        let messageType = sc.get(message, ChatConst.TYPES.KEY, defaultType);
        let chatType = sc.get(this.chatTypesById, messageType, false);
        let appendToTab = '' !== messageType && chatType?.show_tab ? this.gameManager.gameDom.getElement(ChatConst.SELECTORS.TAB_CONTENT_PREFIX + messageType) : false;
        if (appendToTab) this.appendWithScroll(appendToTab, output);
        let alsoShowInTab = chatType.also_show_in_type ? this.gameManager.gameDom.getElement(ChatConst.SELECTORS.TAB_CONTENT_PREFIX + chatType.also_show_in_type) : false;
        if (alsoShowInTab && alsoShowInTab !== appendToTab) this.appendWithScroll(alsoShowInTab, output);
        let appendToMain = '' === messageType ? this.gameManager.gameDom.getElement(ChatConst.SELECTORS.CHAT_MESSAGES) : false;
        if (appendToMain) this.appendWithScroll(appendToMain, output);
        if (this.appendErrorTypeOnActiveTab && ChatConst.TYPES.ERROR === messageType) {
            let activeTab = this.gameManager.gameDom.getElement(ChatConst.SELECTORS.TAB_CONTENT_ACTIVE);
            if (activeTab && activeTab !== appendToTab && activeTab !== alsoShowInTab) this.appendWithScroll(activeTab, output);
        }
        if (!appendToTab && !alsoShowInTab && !appendToMain) {
            if (null === appendToTab) Logger.warning('Element not found for selector: .tab-content-' + messageType);
            if (null === alsoShowInTab) Logger.warning('Element not found for selector: .tab-content-' + chatType.also_show_in_type);
            Logger.warning('Chat message not attached to any tab or main panel.', {
                message,
                defaultType,
                messageType,
                chatType,
                appendToMain,
                appendToTab
            });
            return;
        }
        if (message[ChatConst.MESSAGE.FROM] && this.isValidMessageType(message[ChatConst.TYPES.KEY])) {
            let playerSprite = this.fetchPlayerByName(message[ChatConst.MESSAGE.FROM]);
            if (playerSprite) this.showOverheadChat(playerSprite, messageString);
        }
        if (!this.uiChat.getChildByProperty('id', ChatConst.CHAT_UI).classList.contains('hidden')) return;
        this.showNotificationBalloon();
    }
    appendWithScroll(appendTo, output) {
        appendTo.innerHTML += output;
        appendTo.parentNode.scrollTop = appendTo.scrollHeight;
    }
    translateFrom(message) {
        let messageType = message[ChatConst.TYPES.KEY];
        let from = message[ChatConst.MESSAGE.FROM] || ChatConst.TYPES.SYSTEM;
        if (!this.isValidSnippetFromType(messageType)) return from;
        return this.t(ChatConst.SNIPPETS.PREFIX + ChatConst.TYPES.KEY + messageType);
    }
    translateMessage(message) {
        let messageType = message[ChatConst.TYPES.KEY];
        if (!this.isValidSnippetType(messageType)) return message[ChatConst.MESSAGE.KEY];
        let messageData = message[ChatConst.MESSAGE.DATA.KEY];
        if (!messageData) return this.t(message[ChatConst.MESSAGE.KEY]);
        if (messageData[ChatConst.MESSAGE.DATA.MODIFIERS]) {
            let translatedConcat = '';
            let targetLabel = messageData[ChatConst.MESSAGE.DATA.TARGET_LABEL];
            let propertyKeys = Object.keys(messageData[ChatConst.MESSAGE.DATA.MODIFIERS]);
            for (let propertyKey of propertyKeys){
                let propertyLabel = this.t(propertyKey);
                let propertyValue = messageData[ChatConst.MESSAGE.DATA.MODIFIERS][propertyKey];
                translatedConcat += this.t(message[ChatConst.MESSAGE.KEY], {
                    propertyValue,
                    propertyLabel,
                    targetLabel
                });
            }
            return translatedConcat;
        }
        return this.t(message[ChatConst.MESSAGE.KEY], messageData);
    }
    t(snippetKey, params = {}, activeLocale = false) {
        return this.gameManager.services.translator.t(snippetKey, params, activeLocale);
    }
    isValidMessageType(messageType) {
        return -1 === this.validMessageTypes().indexOf(messageType);
    }
    validMessageTypes() {
        return [
            Object.values(ChatConst.TYPES)
        ];
    }
    isValidSnippetType(messageType) {
        let validTypes = this.snippetsMessageTypes();
        let typesKeys = Object.keys(validTypes);
        for (let typeKey of typesKeys){
            let type = validTypes[typeKey];
            if (type === messageType) return true;
        }
        return false;
    }
    snippetsMessageTypes() {
        let types = Object.assign({}, ChatConst.TYPES);
        delete types[ChatConst.TYPES.MESSAGE];
        delete types[ChatConst.TYPES.PRIVATE];
        delete types[ChatConst.TYPES.GLOBAL];
        delete types[ChatConst.TYPES.TEAMS];
        return types;
    }
    isValidSnippetFromType(from) {
        return -1 !== [
            ChatConst.TYPES.SYSTEM,
            ChatConst.TYPES.ERROR
        ].indexOf(from);
    }
    fetchPlayerByName(playerName) {
        let players = this.gameManager.getCurrentPlayer().players;
        let keys = Object.keys(players);
        if (1 >= keys.length) return false;
        for (let i of keys){
            let player = players[i];
            if (player.playerName === playerName) return player;
        }
    }
    sendChatMessage() {
        // validate if there is anything to send:
        if (!this.isValidMessage()) return false;
        // check if is a global chat (must begin with #) and if the global chat room is ready:
        let messageAllowedText = this.applyTextLimit(this.chatInput.value, this.characterLimit);
        let message = {
            act: ChatConst.CHAT_ACTION,
            m: messageAllowedText
        };
        this.gameManager.events.emitSync('reldens.chatMessageObjectCreated', this, message);
        // both global or private messages use the global chat room:
        this.useGlobalRoom() ? this.useGlobalRoomForMessage(message) : this.gameManager.activeRoomEvents.send(message);
        // for last empty the input once the message was sent:
        this.chatInput.value = '';
        if (this.closeChatBoxAfterSend) this.hideChatBox();
    }
    applyTextLimit(text, limit) {
        // this is also validated on the server:
        return 0 < limit && limit < text.length ? text.substring(0, limit) : text;
    }
    useGlobalRoom() {
        return 0 === this.chatInput.value.indexOf('#') || 0 === this.chatInput.value.indexOf('@');
    }
    isValidMessage() {
        // this is also validated on the server:
        return this.chatInput.value && 0 < this.chatInput.value.replace('#', '').replace('@', '').trim().length;
    }
    useGlobalRoomForMessage(message) {
        // if is global check the global chat room:
        let globalChat = sc.get(this.gameManager.joinedRooms, ChatConst.CHAT_GLOBAL, false);
        if (!globalChat) {
            Logger.error('Global chat room not found.');
            return false;
        }
        if (0 === this.chatInput.value.indexOf('@')) {
            this.sendPrivateMessage(message, globalChat);
            return;
        }
        this.globalSend(globalChat, message);
    }
    sendPrivateMessage(message, globalChat) {
        let playerName = this.chatInput.value.substring(1, this.chatInput.value.indexOf(' '));
        if ('@' === playerName) return false;
        message.t = playerName;
        this.globalSend(globalChat, message);
    }
    globalSend(globalChat, message) {
        try {
            globalChat.send('*', message);
        } catch (error) {
            Logger.critical(error);
            this.gameDom.alertReload(this.gameManager.services.translator.t('game.errors.connectionLost'));
        }
    }
}
module.exports.ChatUi = ChatUi;

},{"25a87f28fb7e0308":"phaser","9224444cee79f5ae":"l0ZhN","eae9f6a9f3b912be":"1vsVU","e56c6f22335ef248":"c0XFM","3e430b9bcb390349":"@reldens/utils"}],"1vsVU":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ChatTabs
 *
 */ const { ChatConst } = require("d66697f0f021bff3");
const { Logger, sc } = require("603ef3007dd0c7e3");
class ChatTabs {
    constructor(gameManager, uiScene){
        this.gameManager = gameManager;
        this.uiScene = uiScene;
        this.showTabs = this.gameManager.config.get('client/ui/chat/showTabs');
        this.containerTemplate = false;
        this.headerTemplate = false;
        this.contentTemplate = false;
        this.createTabs();
        this.activateTabs();
    }
    createTabs() {
        if (!this.isReady()) return false;
        let chatTypes = sc.get(this.gameManager.initialGameData, 'chatTypes', []);
        if (0 === chatTypes.length) {
            Logger.info('Chat types empty.');
            return false;
        }
        let chatContentsElement = this.gameManager.gameDom.getElement(ChatConst.SELECTORS.CONTENTS);
        if (!chatContentsElement) {
            Logger.info('Chat contents element not found.');
            return false;
        }
        if (!this.fetchTemplates()) return false;
        let tabsHeaders = '';
        let tabsContents = '';
        let i = 0;
        for (let chatType of chatTypes){
            if (!chatType.show_tab) continue;
            let tabKey = chatType.key;
            let tabId = chatType.id;
            let headerClone = Object.assign({}, {
                headerTemplate: this.headerTemplate
            });
            tabsHeaders += this.gameManager.gameEngine.parseTemplate(headerClone.headerTemplate, {
                tabId,
                tabLabel: this.gameManager.services.translator.t(ChatConst.SNIPPETS.PREFIX + ChatConst.SNIPPETS.TAB_PREFIX + tabKey),
                className: 0 === i ? ' active' : ''
            });
            let contentClone = Object.assign({}, {
                contentTemplate: this.contentTemplate
            });
            tabsContents += this.gameManager.gameEngine.parseTemplate(contentClone.contentTemplate, {
                tabId,
                tabKey,
                className: 0 === i ? ' active' : ''
            });
            i++;
        }
        let tabs = this.gameManager.gameEngine.parseTemplate(this.containerTemplate, {
            tabsHeaders,
            tabsContents
        });
        this.gameManager.gameDom.updateContent(ChatConst.SELECTORS.CONTENTS, tabs);
    }
    fetchTemplates() {
        this.containerTemplate = this.uiScene.cache.html.get('chatTabsContainer');
        if (!this.containerTemplate) {
            Logger.info('Chat containerTemplate not found.');
            return false;
        }
        this.headerTemplate = this.uiScene.cache.html.get('chatTabLabel');
        if (!this.headerTemplate) {
            Logger.info('Chat headerTemplate not found.');
            return false;
        }
        this.contentTemplate = this.uiScene.cache.html.get('chatTabContent');
        if (!this.contentTemplate) {
            Logger.info('Chat contentTemplate not found.');
            return false;
        }
        return true;
    }
    isReady() {
        if (!this.gameManager) Logger.error('ChatTabs, missing game manager.');
        if (!this.uiScene) Logger.error('ChatTabs, missing UI Scene.');
        return !(!this.showTabs || !this.gameManager || !this.uiScene);
    }
    activateTabs() {
        let labels = this.gameManager.gameDom.getElements('.tab-label');
        for (let label of labels)label.addEventListener('click', (event)=>{
            let previousLabel = this.gameManager.gameDom.getElement('.tab-label.active');
            previousLabel?.classList.remove('active');
            event.target.classList.add('active');
            let previousContent = this.gameManager.gameDom.getElement('.tab-content.active');
            previousContent?.classList.remove('active');
            let activate = this.gameManager.gameDom.getElement('.tab-content-' + event.target.dataset.tabId);
            if (!activate) {
                Logger.warning('Tab content was not found.', event);
                return false;
            }
            activate.classList.add('active');
            activate.parentNode.scrollTop = activate.scrollHeight;
        });
    }
}
module.exports.ChatTabs = ChatTabs;

},{"d66697f0f021bff3":"c0XFM","603ef3007dd0c7e3":"@reldens/utils"}],"c0XFM":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - chat/constants
 *
 */ let snippetsPrefix = 'chat.';
let playerPrefix = 'player.';
let tabsPrefix = 'tabs.';
let types = {
    KEY: 'ctk',
    MESSAGE: 1,
    JOINED: 2,
    SYSTEM: 3,
    PRIVATE: 4,
    DAMAGE: 5,
    REWARD: 6,
    SKILL: 7,
    TEAMS: 8,
    GLOBAL: 9,
    ERROR: 10
};
module.exports.ChatConst = {
    ROOM_TYPE_CHAT: 'chat',
    CHAT_ACTION: 'c',
    TYPES: types,
    CHAT_FROM: 'f',
    CHAT_TO: 't',
    CHAT_UI: 'chat-ui',
    CHAT_FORM: 'chat-form',
    CHAT_INPUT: 'chat-input',
    CHAT_SEND_BUTTON: 'chat-send',
    CHAT_CLOSE_BUTTON: 'chat-close',
    CHAT_OPEN_BUTTON: 'chat-open',
    CHAT_BALLOON: 'notification-balloon',
    CHAT_GLOBAL: 'chat',
    MESSAGE: {
        KEY: 'm',
        FROM: 'f',
        TO: 't',
        DATA: {
            KEY: 'md',
            SNIPPET: 'sp',
            PLAYER_NAME: 'pn',
            ROOM_NAME: 'rn',
            DAMAGE: 'd',
            TARGET_LABEL: 'tL',
            SKILL_LABEL: 'sk',
            MODIFIERS: 'mfs'
        },
        DATA_VALUES: {
            NAMESPACE: 'chat',
            pn: 'playerName',
            rn: 'roomName',
            d: 'damage',
            tL: 'targetLabel',
            sk: 'skillLabel',
            mfs: 'modifiers'
        }
    },
    SNIPPETS: {
        PREFIX: snippetsPrefix,
        PLAYER_PREFIX: playerPrefix,
        TAB_PREFIX: tabsPrefix,
        NPC_DAMAGE: snippetsPrefix + 'npcDamage',
        NPC_DODGED_SKILL: snippetsPrefix + 'dodgedSkill',
        MODIFIERS_APPLY: snippetsPrefix + 'modifiersApply',
        JOINED_ROOM: snippetsPrefix + 'joinedRoom',
        LEFT_ROOM: snippetsPrefix + 'leftRoom',
        PRIVATE_MESSAGE_PLAYER_NOT_FOUND: snippetsPrefix + 'playerNotFound',
        GLOBAL_MESSAGE_NOT_ALLOWED: snippetsPrefix + 'globalMessageNotAllowed',
        GLOBAL_MESSAGE_PERMISSION_DENIED: snippetsPrefix + 'globalMessagePermissionDenied',
        PLAYER: {
            DAMAGE: snippetsPrefix + playerPrefix + 'damage',
            DODGED_SKILL: snippetsPrefix + playerPrefix + 'dodgedSkill'
        },
        GUEST_INVALID_CHANGE_POINT: snippetsPrefix + 'guestInvalidChangePoint',
        WAITING: '...'
    },
    SELECTORS: {
        CONTENTS: '#chat-contents',
        CHAT_MESSAGES: '#chat-messages',
        TAB_CONTENT_PREFIX: '.tab-content-',
        TAB_CONTENT_ACTIVE: '.tab-content.active'
    },
    TYPE_COLOR: {
        [types.MESSAGE]: '#ffffff',
        [types.PRIVATE]: '#f39c12',
        [types.PRIVATE + '.to']: '#00afff',
        [types.GLOBAL]: '#ffff00',
        [types.SYSTEM]: '#2ecc71',
        [types.ERROR]: '#ff0000',
        [types.DAMAGE]: '#ff0000',
        [types.SYSTEM + '.modifiers']: '#0feeff',
        [types.REWARD]: '#2ecc71',
        [types.TEAMS]: '#2ecc71'
    }
};

},{}],"dmDFt":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesListener
 *
 */ const { ChatConst } = require("1b95421bf98ed257");
class MessagesListener {
    static async listenMessages(room, chatPack) {
        room.onMessage('*', (message)=>{
            if (ChatConst.CHAT_ACTION !== message.act) return;
            if (!chatPack.uiManager) {
                chatPack.messagesQueu.push(message);
                return;
            }
            chatPack.uiManager.attachNewMessage(message);
        });
    }
}
module.exports.MessagesListener = MessagesListener;

},{"1b95421bf98ed257":"c0XFM"}],"7cmwN":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TemplatesHandler
 *
 */ class TemplatesHandler {
    static preloadTemplates(preloadScene, showTabs) {
        // @TODO - BETA - Replace by loader replacing snake name file name by camel case for the template key.
        let chatTemplatePath = '/assets/features/chat/templates/';
        // @TODO - BETA - Move the preload HTML as part of the engine driver.
        preloadScene.load.html('chat', chatTemplatePath + 'ui-chat.html');
        preloadScene.load.html('chatMessage', chatTemplatePath + 'message.html');
        if (showTabs) {
            preloadScene.load.html('chatTabsContainer', chatTemplatePath + 'tabs-container.html');
            preloadScene.load.html('chatTabLabel', chatTemplatePath + 'tab-label.html');
            preloadScene.load.html('chatTabContent', chatTemplatePath + 'tab-content.html');
        }
    }
}
module.exports.TemplatesHandler = TemplatesHandler;

},{}],"8zoUf":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    chat: {
        ctk3: 'System',
        ctk10: 'System',
        npcDamage: '%damage damage on %targetLabel',
        dodgedSkill: '%targetLabel dodged %skill',
        modifiersApply: '%propertyValue %propertyLabel on %targetLabel',
        joinedRoom: '%playerName has joined %roomName',
        leftRoom: '%playerName has left',
        playerNotFound: 'Player "%playerName" not found',
        globalMessagesNotAllowed: 'Global messages not allowed',
        globalMessagePermissionDenied: 'Global message permission denied',
        guestInvalidChangePoint: 'The room is not available for guest users.',
        player: {
            damage: '%damage damage on %targetLabel',
            dodgedSkill: '%targetLabel dodged %skill'
        },
        tabs: {
            message: 'General',
            joined: 'Joined',
            system: 'System',
            private: 'Private',
            damage: 'Damage',
            reward: 'Rewards',
            skill: 'Skills',
            teams: 'Teams',
            global: 'Global',
            error: 'Error'
        }
    }
};

},{}],"fKH2J":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TranslationsMapper
 *
 */ const { SnippetsConst } = require("f6c7ed16f345c70");
const { sc } = require("880c1f97a972c80c");
class TranslationsMapper {
    static forConfig(config, translations, dataValues = false, locale = SnippetsConst.DEFAULT_LOCALE) {
        if (!config.snippets) config.snippets = {};
        if (!config.snippets[locale]) config.snippets[locale] = {};
        let mappedSnippets = this.fromObject(translations);
        config.snippets[locale] = sc.deepMergeProperties(mappedSnippets, config.snippets[locale]);
        if (!dataValues) return;
        if (!config.snippetsDataValues) config.snippetsDataValues = {};
        let nameSpace = dataValues.NAMESPACE || SnippetsConst.DATA_VALUES_DEFAULT_NAMESPACE;
        sc.deepMergeProperties(config.snippetsDataValues, {
            [nameSpace]: dataValues
        });
    }
    static fromObject(translations) {
        let keys = Object.keys(translations);
        if (0 === keys.length) return {};
        let mappedTranslations = {};
        for (let i of keys)this.recursiveMap(i, translations[i], mappedTranslations);
        return mappedTranslations;
    }
    static recursiveMap(key, translation, mappedTranslations) {
        if (!sc.isObject(translation)) {
            mappedTranslations[key] = translation;
            return;
        }
        let nextKeys = Object.keys(translation);
        if (0 === nextKeys.length) return;
        for (let i of nextKeys)this.recursiveMap(key + SnippetsConst.CONCAT_CHARACTER + i, translation[i], mappedTranslations);
    }
}
module.exports.TranslationsMapper = TranslationsMapper;

},{"f6c7ed16f345c70":"9VbHC","880c1f97a972c80c":"@reldens/utils"}],"9VbHC":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - snippets/constants
 *
 */ let pref = 'sn.';
module.exports.SnippetsConst = {
    KEY: 'snippets',
    DEFAULT_LOCALE: 'en_US',
    CONCAT_CHARACTER: '.',
    DATA_VALUES_DEFAULT_NAMESPACE: 'default',
    ACTIONS: {
        UPDATE: pref + 'Up'
    }
};

},{}],"deNd3":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Plugin Interface
 *
 */ const { Logger } = require("d95174c8984b7bee");
class PluginInterface {
    /**
     * {
     *     requiredProperties,
     *     events,
     *     dataServer,
     *     config,
     *     featuresManager,
     *     themeManager
     * }
     */ async setup(props) {
        Logger.error('Setup plugin not implemented.', props);
    }
}
module.exports.PluginInterface = PluginInterface;

},{"d95174c8984b7bee":"@reldens/utils"}],"lnHp9":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Objects Client Plugin
 *
 */ const { AnimationEngine } = require("76742c4fe6325846");
const { ObjectsMessageListener } = require("207fea1534039900");
const { DropsMessageListener } = require("e451d827dfc8e765");
const Translations = require("26c9abd8da29d9a1");
const { TranslationsMapper } = require("eab195a4a5f61629");
const { UserInterface } = require("33448c271890ad0b");
const { ObjectsConst } = require("189563d48aace89d");
const { ActionsConst } = require("e3b259719bc592e2");
const { PluginInterface } = require("c500b33f3cb14996");
const { GameConst } = require("f79919fd1915086e");
const { Logger, sc } = require("bea1ea8a6cf570dd");
class ObjectsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in InventoryPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in InventoryPlugin.');
        this.bodyOnAddCallBack = false;
        this.bodyOnRemoveCallBack = false;
        this.bullets = {};
        this.changeBodyVisibilityOnInactiveState = this.gameManager.config.getWithoutLogs('client/objects/animations/changeBodyVisibilityOnInactiveState', true);
        this.missingSpritesTimeOut = this.gameManager.config.getWithoutLogs('client/general/animations/missingSpritesTimeOut', 200);
        this.missingSpritesMaxRetries = this.gameManager.config.getWithoutLogs('client/general/animations/missingSpritesMaxRetries', 5);
        this.missingSpriteRetry = 0;
        this.listenEvents();
        this.setTranslations();
        this.setListener();
    }
    setListener() {
        if (!this.gameManager) return false;
        this.gameManager.config.client.message.listeners['traderObject'] = new ObjectsMessageListener();
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, ObjectsConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        if (!this.events) return false;
        // @NOTE: the prepareObjectsUi has to be created before the scenes, so we can use the scenes events before
        // the events were called.
        this.events.on('reldens.startEngineScene', async (roomEvents)=>{
            await this.prepareObjectsUi(roomEvents.gameManager, roomEvents.roomData.objectsAnimationsData, roomEvents);
        });
        this.events.on('reldens.afterSceneDynamicCreate', async (sceneDynamic)=>{
            await this.createDynamicAnimations(sceneDynamic);
        });
        this.events.on('reldens.joinedRoom', (room, gameManager)=>{
            // @TODO - BETA - Refactor.
            this.listenMessages(room, gameManager);
            DropsMessageListener.listenMessages(room, gameManager);
        });
    }
    listenMessages(room, gameManager) {
        room.onMessage('*', (message)=>{
            this.startObjectAnimation(message, gameManager);
            this.objectBattleEndAnimation(message, gameManager);
        });
        if (!room.state || !room.state.bodies) return false;
        this.setAddBodyCallback(room, gameManager);
        this.setRemoveBodyCallback(room);
    }
    setAddBodyCallback(room, gameManager) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        this.bodyOnAddCallBack = room.state.bodies.onAdd((body, key)=>{
            this.setOnChangeBodyCallback(body, key, room, gameManager);
            this.createBulletSprite(key, gameManager, body);
        });
    }
    createBulletSprite(key, gameManager, body) {
        if (-1 === key.indexOf('bullet')) return false;
        let currentScene = gameManager.activeRoomEvents.getActiveScene();
        let animKey = 'default_bullet';
        let skillBullet = (body.key ? body.key + '_' : '') + 'bullet';
        if (sc.hasOwn(gameManager.gameEngine.uiScene.directionalAnimations, skillBullet)) skillBullet = skillBullet + '_' + body.dir;
        if (sc.hasOwn(currentScene.anims.anims.entries, skillBullet)) animKey = skillBullet;
        let bulletSprite = currentScene?.physics?.add?.sprite(body.x, body.y, animKey);
        if (!bulletSprite) {
            Logger.warning('Could not create bullet sprite.', currentScene);
            return false;
        }
        bulletSprite.setDepth(11000);
        this.bullets[key] = bulletSprite;
    //Logger.debug({createdBulletSprite: skillBullet, shootFrom: body, bulletSprite});
    }
    setOnChangeBodyCallback(body, key, room, gameManager) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        let bodyProperties = Object.keys(body);
        for (let propertyKey of bodyProperties)body.listen(propertyKey, async (newValue)=>{
            //Logger.debug('Update body property "'+propertyKey+'": '+newValue);
            await this.events.emit('reldens.objectBodyChange', {
                body,
                key,
                changes: {
                    [propertyKey]: newValue
                }
            });
            let currentScene = gameManager.activeRoomEvents.getActiveScene();
            this.updateBodyProperties(propertyKey, body, newValue, currentScene, key);
            if (!currentScene) return;
            let isBullet = -1 !== key.indexOf('bullet');
            let currentBody = isBullet ? this.bullets[key] : currentScene?.objectsAnimations[key];
            this.setVisibility(currentBody, GameConst.STATUS.ACTIVE === body.inState);
            this.logObjectBodyUpdate(key, propertyKey, newValue, currentBody);
            let canInterpolate = GameConst.STATUS.AVOID_INTERPOLATION !== body.inState;
            if (currentScene?.clientInterpolation && canInterpolate) {
                currentScene.interpolateObjectsPositions[key] = body;
                return;
            }
            if (isBullet) return this.updateBulletBodyPosition(key, body);
            return this.updateObjectsAnimations(key, body, currentScene);
        });
    }
    logObjectBodyUpdate(key, propertyKey, newValue, currentBody) {
        let logValues = {
            key,
            propertyKey,
            newValue
        };
        if (('x' === propertyKey || 'y' === propertyKey) && currentBody && currentBody[propertyKey]) logValues.currentValue = currentBody[propertyKey];
    //Logger.debug(logValues);
    }
    setVisibility(currentBody, isActive) {
        if (!currentBody || !currentBody.sceneSprite) return;
        currentBody.sceneSprite.setVisible(isActive);
    }
    updateBodyProperties(bodyProp, body, value, currentScene, key) {
        // @TODO - BETA - Remove hardcoded properties check.
        //Logger.debug({update: body, key, animationData: currentScene.objectsAnimationsData[key], bodyProp, value});
        if (currentScene.objectsAnimationsData[key] && ('x' === bodyProp || 'y' === bodyProp)) // @TODO - BETA - Check why bullets keep receiving updates even after the objects animation was removed.
        currentScene.objectsAnimationsData[key][bodyProp] = value;
        body[bodyProp] = value;
    }
    updateBulletBodyPosition(key, body) {
        if (!this.bullets[key]) return;
        this.bullets[key].x = body.x;
        this.bullets[key].y = body.y;
        this.events.emit('reldens.objectBodyChanged', {
            body,
            key
        });
    }
    updateObjectsAnimations(key, body, currentScene) {
        let objectAnimation = sc.get(currentScene.objectsAnimations, key);
        if (!objectAnimation) return false;
        objectAnimation.updateObjectAndSpritePositions(body.x, body.y);
        this.events.emit('reldens.objectBodyChanged', {
            body,
            key
        });
        let objectNewDepth = objectAnimation.updateObjectDepth();
        objectAnimation.inState = body.inState;
        let animToPlay = this.fetchAvailableAnimationKey(currentScene, objectAnimation, body);
        if ('' !== animToPlay) objectAnimation.sceneSprite.anims.play(animToPlay, true);
        this.moveSpritesObjects(objectAnimation, body.x, body.y, objectNewDepth);
        if (body.mov) return false;
        objectAnimation.sceneSprite.anims.stop();
        objectAnimation.sceneSprite.mov = body.mov;
        if (!objectAnimation.autoStart) return false;
        objectAnimation.sceneSprite.anims.play(this.determineAutoStartAnimation(objectAnimation, animToPlay));
        return true;
    }
    determineAutoStartAnimation(objectAnimation, animToPlay) {
        if (true === objectAnimation.autoStart) return objectAnimation.key;
        if (objectAnimation.autoStart === ObjectsConst.DYNAMIC_ANIMATION) return animToPlay;
        return objectAnimation.autoStart;
    }
    fetchAvailableAnimationKey(currentScene, objectAnimation, body) {
        return sc.getByPriority(currentScene.anims.anims.entries, [
            objectAnimation.key + '_' + body.dir,
            objectAnimation.layerName + '_' + objectAnimation.id + '_' + body.dir,
            objectAnimation.key
        ]) || '';
    }
    setRemoveBodyCallback(room) {
        // @TODO - BETA - Refactor and extract Colyseus into a driver.
        this.bodyOnRemoveCallBack = room.state.bodies.onRemove((body, key)=>{
            if (-1 === key.indexOf('bullet') || !sc.hasOwn(this.bullets, key)) return false;
            this.bullets[key].destroy();
            delete this.bullets[key];
        });
    }
    objectBattleEndAnimation(message, gameManager) {
        if (message.act !== ActionsConst.BATTLE_ENDED) return false;
        // @TODO - BETA - Replace all defaults by constants.
        let deathKey = sc.get(gameManager.config.client.skills.animations, message.k + '_death', 'default_death');
        let currentScene = gameManager.activeRoomEvents.getActiveScene();
        try {
            this.playDeathAnimation(deathKey, currentScene, message);
        } catch (error) {
            Logger.warning('Error on sprite "' + deathKey + '" not available.', error.message);
        }
        if (!sc.hasOwn(message, ActionsConst.DATA_OBJECT_KEY_TARGET)) return false;
        if (message[ActionsConst.DATA_OBJECT_KEY_TARGET] === currentScene.player.currentTarget?.id) gameManager.gameEngine.clearTarget();
        let hidePlayerSprite = sc.get(currentScene.player.players, message[ActionsConst.DATA_OBJECT_KEY_TARGET], false);
        if (!hidePlayerSprite) return false;
        hidePlayerSprite.visible = false;
        if (sc.hasOwn(hidePlayerSprite, 'nameSprite') && hidePlayerSprite.nameSprite) hidePlayerSprite.nameSprite.visible = false;
    }
    playDeathAnimation(deathKey, currentScene, message) {
        if (!currentScene.getAnimationByKey(deathKey)) {
            if (this.missingSpritesMaxRetries === this.missingSpriteRetry) {
                Logger.debug('Sprite "' + deathKey + '" not available.', deathKey);
                return false;
            }
            this.missingSpriteRetry++;
            setTimeout(()=>{
                return this.playDeathAnimation(deathKey, currentScene, message);
            }, this.missingSpritesTimeOut);
            return false;
        }
        let skeletonSprite = currentScene.physics.add.sprite(message.x, message.y, deathKey);
        skeletonSprite.setDepth(10500);
        skeletonSprite.anims.play(deathKey, true).on('animationcomplete', ()=>{
            skeletonSprite.destroy();
        });
        return true;
    }
    startObjectAnimation(message, gameManager) {
        if (message.act !== ObjectsConst.OBJECT_ANIMATION && message.act !== ObjectsConst.TYPE_ANIMATION) return false;
        let currentScene = gameManager.activeRoomEvents.getActiveScene();
        if (!sc.hasOwn(currentScene.objectsAnimations, message.key)) return false;
        currentScene.objectsAnimations[message.key].runAnimation();
    }
    moveSpritesObjects(currentObj, x, y, objectNewDepth) {
        if (!currentObj.moveSprites) return;
        let moveObjectsKeys = Object.keys(currentObj.moveSprites);
        if (0 === moveObjectsKeys.length) return;
        for (let i of moveObjectsKeys){
            let sprite = currentObj.moveSprites[i];
            sprite.x = x;
            sprite.y = y;
            // by default moving sprites will be always below the player:
            let depthByPlayer = sc.get(currentObj.animationData, 'depthByPlayer', '');
            let spriteDepth = objectNewDepth + (depthByPlayer === 'above' ? 1 : -0.1);
            sprite.setDepth(spriteDepth);
        }
    }
    /**
     * The objects UI are the modal dialogs that will be open when you interact with the object.
     * To interact with the object you need to be into the object interaction area and click on it.
     *
     * @param {GameManager} gameManager
     * @param {object} objectsAnimationsData
     * @param {RoomEvents} roomEvents
     * @returns {Promise<void>}
     */ async prepareObjectsUi(gameManager, objectsAnimationsData, roomEvents) {
        if (!objectsAnimationsData) {
            Logger.info('None objects animations data.');
            return;
        }
        for (let i of Object.keys(objectsAnimationsData)){
            let animProps = objectsAnimationsData[i];
            if (!sc.hasOwn(animProps, 'ui')) continue;
            if (!animProps.id) {
                Logger.error([
                    'Object ID not specified. Skipping registry:',
                    animProps
                ]);
                continue;
            }
            let template = sc.get(animProps, 'template', '/assets/html/dialog-box.html');
            roomEvents.objectsUi[animProps.id] = new UserInterface(gameManager, animProps, template, 'npcDialog');
            await gameManager.events.emit('reldens.createdUserInterface', {
                gameManager,
                id: animProps.id,
                userInterface: roomEvents.objectsUi[animProps.id],
                ObjectsPlugin: this
            });
        }
    }
    async createDynamicAnimations(sceneDynamic) {
        if (!sceneDynamic.objectsAnimationsData) {
            Logger.info('None animations defined on this scene: ' + sceneDynamic.key);
            return;
        }
        await this.events.emit('reldens.createDynamicAnimationsBefore', this, sceneDynamic);
        for (let i of Object.keys(sceneDynamic.objectsAnimationsData)){
            let animProps = sceneDynamic.objectsAnimationsData[i];
            await this.createAnimationFromAnimData(animProps, sceneDynamic);
        }
    }
    async createAnimationFromAnimData(animProps, sceneDynamic) {
        if (!animProps.key) {
            Logger.error('Animation key not specified. Skipping registry.', animProps);
            return false;
        }
        animProps.frameRate = sceneDynamic.configuredFrameRate;
        let activeRoomEvents = sceneDynamic.gameManager.activeRoomEvents;
        let existentBody = this.fetchExistentBody(sceneDynamic, activeRoomEvents, animProps);
        this.updateAnimationPosition(existentBody, animProps);
        await this.events.emit('reldens.createDynamicAnimation_' + animProps.key, this, animProps);
        let classDefinition = sceneDynamic.gameManager.config.getWithoutLogs('client/customClasses/objects/' + animProps.key, AnimationEngine);
        let animationEngine = new classDefinition(sceneDynamic.gameManager, animProps, sceneDynamic);
        // @NOTE: this will populate the objectsAnimations property in the current scene, see scene-dynamic.
        let sprite = animationEngine.createAnimation();
        this.updateAnimationVisibility(existentBody, sprite);
        return animationEngine;
    }
    updateAnimationPosition(existentBody, animProps) {
        // Logger.debug('Existent body:', {existentBody});
        if (!existentBody) // expected, not all animation objects may have a body:
        return false;
        // @NOTE: respawn objects would have the animProp position outdated since it comes from the roomData, which
        // only contains the objects original initial position.
        //Logger.debug('Existent body "'+animProps.key+'" position:', {x: existentBody.x, y: existentBody.y});
        //Logger.debug('AnimProps "'+animProps.key+'" position:', {x: animProps.x, y: animProps.y});
        if (animProps.x !== existentBody.x) animProps.x = existentBody.x;
        if (animProps.y !== existentBody.y) animProps.y = existentBody.y;
    }
    updateAnimationVisibility(existentBody, sprite) {
        if (!existentBody) // expected, not all animation objects may have a body:
        return false;
        if (GameConst.STATUS.DEATH !== existentBody.inState && GameConst.STATUS.DISABLED !== existentBody.inState) return false;
        sprite.visible = false;
    }
    fetchExistentBody(sceneDynamic, activeRoomEvents, animProps) {
        //Logger.debug('Scene key vs roomName: '+sceneDynamic.key+' / '+activeRoomEvents.roomName+'.');
        if (sceneDynamic.key !== activeRoomEvents.roomName) {
            Logger.warning('Scene key and roomName miss match: ' + sceneDynamic.key + ' / ' + activeRoomEvents.roomName + '.');
            return false;
        }
        return activeRoomEvents.room.state.bodies.get(animProps?.key);
    }
}
module.exports.ObjectsPlugin = ObjectsPlugin;

},{"76742c4fe6325846":"joLBp","207fea1534039900":"jjOLJ","e451d827dfc8e765":"fHBlx","26c9abd8da29d9a1":"3HuaA","eab195a4a5f61629":"fKH2J","33448c271890ad0b":"kO7Qp","189563d48aace89d":"k06SD","e3b259719bc592e2":"eRkMR","c500b33f3cb14996":"deNd3","f79919fd1915086e":"iznl5","bea1ea8a6cf570dd":"@reldens/utils"}],"joLBp":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AnimationEngine
 *
 * Objects flow:
 *
 * When you create an NpcObject this can/should be set as "interactive", after the validation
 * if(this.isInteractive){
 * This will activate the onpointerdown event so when you click on the object it will send the action
 * ObjectsConst.OBJECT_INTERACTION
 * Along with its own ID and type.
 * The server will pick up this information and validate it on the NpcObject.executeMessageActions method, and return
 * a UI message to open a UI dialog box, updated with the information coming in the message.
 * See RoomEvents.initUi method.
 *
 */ const { Logger, sc } = require("5045f4b0be8e4d09");
const { ObjectsConst } = require("5bdcc625cdcbb429");
const { GameConst } = require("25585b3d2976fa69");
const { ActionsConst } = require("34b34457c954466");
class AnimationEngine {
    constructor(gameManager, props, currentPreloader){
        this.currentPreloader = currentPreloader;
        this.currentAnimation = false;
        this.gameManager = gameManager;
        this.enabled = props.enabled || false;
        this.key = props.key;
        this.id = props.id;
        this.asset_key = props.asset_key || props.key;
        this.assetPath = props.assetPath || '/assets/custom/sprites/';
        this.type = props.type || false;
        this.ui = props.ui || false;
        this.targetName = props.targetName;
        this.frameRate = props.frameRate || false;
        this.frameStart = props.frameStart || 0;
        this.frameEnd = props.frameEnd || 0;
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.repeat = isNaN(props.repeat) ? -1 : props.repeat;
        this.hideOnComplete = props.hideOnComplete || false;
        if (!this.gameManager.createdAnimations) this.gameManager.createdAnimations = {};
        // @NOTE: you cannot combine destroyOnComplete with repeat = -1, because an animation with infinite
        // repetitions will never trigger the complete event.
        this.destroyOnComplete = props.destroyOnComplete || false;
        this.autoStart = props.autoStart || false;
        this.layerName = props.layerName || false;
        this.positionFix = props.positionFix || false;
        this.zeroPad = props.zeroPad || false;
        this.prefix = props.prefix || false;
        this.isInteractive = props.isInteractive || false;
        this.highlightOnOver = Boolean(sc.get(props, 'highlightOnOver', this.gameManager.config.getWithoutLogs('client/ui/animations/highlightOnOver', true)));
        this.highlightColor = sc.get(props, 'highlightColor', this.gameManager.config.getWithoutLogs('client/ui/animations/highlightColor', '0x00ff00'));
        this.restartTime = sc.get(props, 'restartTime', false);
        this.calculateAnimPosition();
        // @NOTE: having this here we will get the animations generated for each object instance, so normally you would
        // get duplicated animations for any respawn "multiple" object, BUT, at the same time, you could have an
        // animation for a specific instance ID, we need to keep this here and check if the animation already exists on
        // the preloader list to avoid generate it again.
        if (sc.hasOwn(props, 'animations')) this.createObjectAnimations(props.animations);
    }
    updateObjectAndSpritePositions(x, y) {
        this.sceneSprite.x = x;
        this.sceneSprite.y = y;
        this.x = x;
        this.y = y;
        this.calculateAnimPosition();
    }
    calculateAnimPosition() {
        this.animPos = {
            x: this.x,
            y: this.y
        };
        if (!this.positionFix) return;
        if (sc.hasOwn(this.positionFix, 'x')) this.animPos.x = this.x + this.positionFix.x;
        if (sc.hasOwn(this.positionFix, 'y')) this.animPos.y = this.y + this.positionFix.y;
    }
    updateObjectDepth() {
        let objectNewDepth = this.y + this.sceneSprite.height;
        this.sceneSprite.setDepth(objectNewDepth);
        return objectNewDepth;
    }
    createAnimation() {
        if (!this.enabled) {
            Logger.error('Animation disabled: ' + this.key);
            return;
        }
        let currentScene = this.gameManager.activeRoomEvents.getActiveScene();
        if (!currentScene) {
            Logger.error('Active scene not found.');
            return;
        }
        let animationData = {
            start: this.frameStart,
            end: this.frameEnd
        };
        if (this.prefix !== false) animationData.prefix = this.prefix;
        if (this.zeroPad !== false) animationData.zeroPad = this.zeroPad;
        if (!this.currentPreloader.anims.textureManager.list[this.asset_key]) {
            Logger.warning('Asset not found in preloader.', this.asset_key, animationData);
            this.currentPreloader.load.spritesheet(this.asset_key, this.assetPath + this.asset_key, animationData);
            this.currentPreloader.load.once('complete', async ()=>{
                this.createAnimation();
            });
            return;
        }
        let frameNumbers = this.currentPreloader.anims.generateFrameNumbers(this.asset_key, animationData);
        let createData = {
            key: this.key,
            frames: frameNumbers,
            frameRate: this.frameRate,
            repeat: this.repeat,
            hideOnComplete: this.hideOnComplete
        };
        this.currentAnimation = this.gameManager.createdAnimations[this.key];
        if (!this.currentAnimation) {
            Logger.debug('Creating animation: ' + this.key);
            this.currentAnimation = this.currentPreloader.anims.create(createData);
        }
        this.currentPreloader.objectsAnimations[this.key] = this.currentAnimation;
        this.gameManager.createdAnimations[this.key] = this.currentAnimation;
        let spriteX = this.positionFix ? this.animPos.x : this.x;
        let spriteY = this.positionFix ? this.animPos.y : this.y;
        // this is where the animation is actually been created and stored:
        this.sceneSprite = currentScene.physics.add.sprite(spriteX, spriteY, this.asset_key);
        if (this.autoStart) this.sceneSprite.anims.play(this.key, true);
        this.enableInteraction(currentScene);
        this.enableAutoRestart();
        this.automaticDestroyOnComplete();
        // @NOTE: sprites depth will be set according to their Y position, since the same was applied on the
        // players sprites and updated as they move the depth is fixed automatically and the objects will get
        // above or below the player.
        this.sceneSprite.setDepth(this.y + this.sceneSprite.body.height);
        currentScene.objectsAnimations[this.key] = this;
        this.gameManager.events.emitSync('reldens.createAnimationAfter', {
            animationEngine: this
        });
        return this.sceneSprite;
    }
    automaticDestroyOnComplete() {
        if (!this.destroyOnComplete) return;
        this.sceneSprite.on('animationcomplete', ()=>{
            this.currentAnimation?.destroy();
            this.sceneSprite.destroy();
        }, this);
    }
    enableAutoRestart() {
        if (!this.restartTime) return;
        this.sceneSprite.on('animationcomplete', ()=>{
            setTimeout(()=>{
                // if the animation was used to change the scene this won't be available on the user who run it.
                if (!this.sceneSprite.anims) return;
                this.sceneSprite.anims.restart();
                this.sceneSprite.anims.pause();
            }, this.restartTime);
        }, this);
    }
    enableInteraction(currentScene) {
        if (!this.isInteractive) return;
        this.sceneSprite.setInteractive({
            useHandCursor: true
        }).on('pointerdown', (e)=>{
            // @NOTE: we avoid running the object interactions while any UI element is open, if we click on the UI the
            // elements in the background scene should not be executed.
            if (GameConst.SELECTORS.CANVAS !== e.downElement.nodeName) return false;
            // @TODO - BETA - CHECK - TempId is a temporal fix for multiple objects case.
            let tempId = this.key === this.asset_key ? this.id : this.key;
            let dataSend = {
                act: ObjectsConst.OBJECT_INTERACTION,
                id: tempId,
                type: this.type
            };
            this.gameManager.activeRoomEvents.send(dataSend);
            if (!this.targetName) return false;
            let previousTarget = Object.assign({}, currentScene.player.currentTarget);
            let thisTarget = {
                id: tempId,
                type: ObjectsConst.TYPE_OBJECT
            };
            currentScene.player.currentTarget = thisTarget;
            this.gameManager.gameEngine.showTarget(this.targetName, thisTarget, previousTarget);
            // Auto-attack on enemy click: if the clicked object is an enemy and a default action is configured,
            // send the action immediately using the current target.
            if (ObjectsConst.TYPE_ENEMY === this.type) {
                let defaultActionKey = this.gameManager.config.get('client/ui/controls/defaultActionKey') || 'physical_attack';
                this.gameManager.activeRoomEvents.send({
                    act: ActionsConst.ACTION,
                    target: currentScene.player.currentTarget,
                    type: defaultActionKey
                });
            }
        });
        if (this.highlightOnOver) {
            this.sceneSprite.on('pointerover', ()=>{
                this.sceneSprite.setTint(this.highlightColor);
            });
            this.sceneSprite.on('pointerout', ()=>{
                this.sceneSprite.clearTint();
            });
        }
    }
    runAnimation() {
        if (!this.sceneSprite) {
            Logger.error('Current animation not found: ' + this.key);
            return;
        }
        this.sceneSprite.anims.play(this.key, true);
    }
    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
    createObjectAnimations(animations) {
        if (!animations) return;
        let animationsKeys = Object.keys(animations);
        if (0 === animationsKeys.length) return;
        for (let i of animationsKeys){
            if (this.gameManager.createdAnimations[i]) {
                this.currentPreloader.objectsAnimations[i] = this.gameManager.createdAnimations[i];
                continue;
            }
            if (sc.hasOwn(this.currentPreloader.objectsAnimations, i)) continue;
            let animData = animations[i];
            let frameNumbers = this.currentPreloader.anims.generateFrameNumbers(animData['asset_key'] || this.asset_key, {
                start: animData['start'] || this.frameStart,
                end: animData['end'] || this.frameEnd
            });
            let createData = {
                key: i,
                frames: frameNumbers,
                frameRate: animData['frameRate'] || this.frameRate,
                repeat: animData['repeat'] || this.repeat,
                hideOnComplete: animData['hideOnComplete'] || this.hideOnComplete,
                asset_key: animData['asset_key'] || this.asset_key
            };
            this.currentPreloader.objectsAnimations[i] = this.currentPreloader.anims.create(createData);
            this.gameManager.createdAnimations[i] = this.currentPreloader.objectsAnimations[i];
        }
    }
}
module.exports.AnimationEngine = AnimationEngine;

},{"5045f4b0be8e4d09":"@reldens/utils","5bdcc625cdcbb429":"k06SD","25585b3d2976fa69":"iznl5","34b34457c954466":"eRkMR"}],"jjOLJ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ObjectsMessageListener
 *
 */ const { TraderObjectUi } = require("b14ff574969f05c7");
const { Logger, sc } = require("28c6856f5bee0892");
class ObjectsMessageListener {
    async executeClientMessageActions(props) {
        let message = sc.get(props, 'message', false);
        if (!message) {
            Logger.error('Missing message data on ObjectsMessageListener.', props);
            return false;
        }
        let messageResult = sc.get(message, 'result', false);
        if (!messageResult) {
            Logger.error('Missing result data on ObjectsMessageListener.', props);
            return false;
        }
        let messageId = sc.get(message, 'id', false);
        if (!messageId) {
            Logger.error('Missing Object ID on ObjectsMessageListener.', props);
            return false;
        }
        let roomEvents = sc.get(props, 'roomEvents', false);
        if (!roomEvents) {
            Logger.error('Missing RoomEvents on ObjectsMessageListener.', props);
            return false;
        }
        // @TODO - BETA - Rename class to TraderObjectMessageHandler, split in several services.
        let traderObjectUi = new TraderObjectUi({
            roomEvents,
            message
        });
        if (!traderObjectUi.validate()) return false;
        traderObjectUi.updateContents();
    }
}
module.exports.ObjectsMessageListener = ObjectsMessageListener;

},{"b14ff574969f05c7":"4JLLg","28c6856f5bee0892":"@reldens/utils"}],"4JLLg":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TraderObjectUi
 *
 */ const { ItemsConst } = require("cdac730d5b5ab82a");
const { ObjectsConst } = require("709ad51a4f52a4c4");
const { Logger, sc } = require("1ac8620591e8ad0f");
class TraderObjectUi {
    constructor(props){
        // @TODO - BETA - Rename class to TraderObjectMessageHandler, split in several services.
        this.roomEvents = sc.get(props, 'roomEvents', false);
        this.message = sc.get(props, 'message', false);
        this.gameManager = this.roomEvents?.gameManager;
        this.gameDom = this.gameManager?.gameDom;
        this.uiScene = this.gameManager?.gameEngine?.uiScene;
        this.itemsManager = this.gameManager?.inventory?.manager;
        this.objectUi = this.roomEvents?.objectsUi[this.message?.id];
        this.setConfirmMessages();
    }
    validate() {
        if (!this.roomEvents) {
            Logger.error('Missing RoomEvents on TraderObjectUi.');
            return false;
        }
        if (!this.message) {
            Logger.error('Missing message on TraderObjectUi.');
            return false;
        }
        if (!this.gameManager) {
            Logger.error('Missing GameManager on TraderObjectUi.');
            return false;
        }
        if (!this.uiScene) {
            Logger.error('Missing UiScene on TraderObjectUi.');
            return false;
        }
        if (!this.itemsManager) {
            Logger.error('Missing ItemsManager on TraderObjectUi.');
            return false;
        }
        if (!this.objectUi) {
            Logger.error('Missing objectUi on TraderObjectUi.');
            return false;
        }
        return true;
    }
    setConfirmMessages() {
        if (!this.gameManager) return false;
        this.confirmMessages = {
            buy: this.gameManager.services.translator.t('objects.trader.buyConfirmed'),
            sell: this.gameManager.services.translator.t('objects.trader.sellConfirmed')
        };
    }
    updateContents() {
        let container = this.gameManager.gameDom.getElement('#box-' + this.objectUi.id + ' .box-content');
        if (!container) {
            Logger.error('Missing container: "#box-' + this.objectUi.id + ' .box-content".');
            return false;
        }
        let tradeAction = this.message.result.action;
        if (ObjectsConst.TRADE_ACTIONS_FUNCTION_NAME.CONFIRM === this.message.result.subAction) {
            container.innerHTML = this.confirmMessages[tradeAction];
            return true;
        }
        let items = sc.get(this.message.result, 'items', false);
        let inventoryKey = this.mapInventoryKeyFromAction(tradeAction);
        let exchangeData = sc.get(this.message.result, 'exchangeData', false);
        let exchangeItems = sc.get(exchangeData, inventoryKey, false);
        let exchangeRequirementsA = this.message.result.exchangeRequirementsA || [];
        let exchangeRewardsB = this.message.result.exchangeRewardsB || [];
        this.updateItemsList(items, tradeAction, exchangeRequirementsA, exchangeRewardsB, container, exchangeItems);
        this.updateExchangeData(exchangeItems, tradeAction, exchangeRequirementsA, exchangeRewardsB, items);
    }
    updateItemsList(items, tradeAction, exchangeRequirementsA, exchangeRewardsB, container, exchangeData) {
        if (!items) return;
        let tradeItems = '';
        let tempItemsList = {};
        for (let i of Object.keys(items)){
            let messageItem = items[i];
            let itemsProps = Object.assign({
                manager: this.itemsManager
            }, messageItem, {
                uid: i
            });
            let itemClass = sc.get(this.itemsManager.itemClasses, itemsProps.key, this.itemsManager.types.classByTypeId(itemsProps.type));
            tempItemsList[i] = new itemClass(itemsProps);
            tempItemsList[i].quantityDisplay = 1;
            tempItemsList[i].quantityMaxDisplay = Math.max(tempItemsList[i].qty_limit, messageItem.qty);
            tempItemsList[i].tradeAction = tradeAction;
            tempItemsList[i].exchangeRequirements = this.fetchItemRequirements(itemsProps.key, exchangeRequirementsA);
            tempItemsList[i].exchangeRewards = this.fetchItemRewards(itemsProps.key, exchangeRewardsB);
            tradeItems += this.createTradeItemBox(tempItemsList[i], sc.get(exchangeData, tempItemsList[i].uid, false));
        }
        container.innerHTML = this.createTradeContainer(tradeAction, tradeItems);
        this.activateItemsBoxActions(tempItemsList);
        this.activateConfirmButtonAction(tradeAction);
    }
    activateConfirmButtonAction(tradeAction) {
        let confirmButton = this.gameManager.gameDom.getElement('.confirm-' + tradeAction);
        let dataSend = {
            act: ObjectsConst.OBJECT_INTERACTION,
            id: this.message.id,
            value: tradeAction,
            sub: ObjectsConst.TRADE_ACTIONS.CONFIRM
        };
        confirmButton?.addEventListener('click', ()=>{
            this.gameManager.activeRoomEvents.send(dataSend);
        });
    }
    updateExchangeData(exchangeData, tradeAction, exchangeRequirementsA, exchangeRewardsB, items) {
        if (false === exchangeData) return false;
        let content = this.createConfirmItemsBox(exchangeData, items, tradeAction);
        let itemsContainer = null;
        if ('buy' === tradeAction) itemsContainer = this.gameDom.getElement('.trade-container-buy .trade-col.trade-col-2');
        if ('sell' === tradeAction) itemsContainer = this.gameDom.getElement('.trade-container-sell .trade-col.trade-col-1');
        if (null === itemsContainer) {
            Logger.error('Missing "' + tradeAction + '" items container.', {
                message: this.message
            });
            return false;
        }
        itemsContainer.innerHTML = content;
        this.assignRemoveActions(exchangeData, items, tradeAction);
        return true;
    }
    createConfirmItemsBox(exchangeItems, items, tradeAction) {
        // @TODO - BETA - Since we are using one template "inventoryTradeItem", use only one "createConfirmItemsBox".
        let exchangeItemsUids = Object.keys(exchangeItems);
        if (0 === exchangeItemsUids.length) {
            // @NOTE: this will be the case if you don't have a required item.
            if (!this.message.lastErrorMessage) Logger.info('Undefined exchange items on confirmation trader-object-ui.', {
                message: this.message
            });
            return '';
        }
        let content = '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeItem');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeItem".');
            return '';
        }
        for (let itemUid of exchangeItemsUids){
            let qty = exchangeItems[itemUid];
            let item = items[itemUid];
            let isBuy = ItemsConst.TRADE_ACTIONS.BUY === tradeAction;
            let isSell = ItemsConst.TRADE_ACTIONS.SELL === tradeAction;
            content += this.gameManager.gameEngine.parseTemplate(messageTemplate, {
                key: item.key,
                label: item.label,
                description: item.description,
                id: itemUid,
                qty: item.qty,
                hiddenClass: '',
                tradeRequirements: isBuy ? this.createTradeRequirementsContent(item) : '',
                tradeRewards: isSell ? this.createTradeRewardsContent(item) : '',
                tradeAction: this.createTradeActionRemove(item),
                tradeActionKey: tradeAction,
                tradeQuantityContent: qty
            });
        }
        return content;
    }
    assignRemoveActions(exchangeItems, items, tradeAction) {
        let exchangeItemsUids = Object.keys(exchangeItems);
        if (0 === exchangeItemsUids.length) {
            // @NOTE: this will be the case if you don't have a required item.
            if (!this.message.lastErrorMessage) Logger.info('Undefined exchange items on remove trader-object-ui.', {
                message: this.message
            });
            return false;
        }
        for (let itemUid of exchangeItemsUids){
            let itemContainerSelector = '.trade-item-to-be-' + tradeAction + '.trade-item-' + itemUid;
            let itemContainer = this.gameDom.getElement(itemContainerSelector);
            if (!itemContainer) {
                Logger.error('Assign trade item "' + itemUid + '" container not found.', {
                    message: this.message
                });
                continue;
            }
            let itemActionButton = this.gameDom.getElement('.trade-item-' + tradeAction + '.trade-item-' + itemUid + ' .trade-action-remove');
            if (!itemActionButton) {
                Logger.error('Assign trade item "' + itemUid + '" remove button not found.', {
                    message: this.message
                });
                continue;
            }
            let item = items[itemUid];
            itemActionButton.addEventListener('click', ()=>{
                itemContainer.classList.remove('hidden');
                let dataSend = {
                    act: ObjectsConst.OBJECT_INTERACTION,
                    id: this.message.id,
                    value: tradeAction,
                    itemId: itemUid,
                    itemKey: item.key
                };
                dataSend[ObjectsConst.TRADE_ACTIONS.SUB_ACTION] = ObjectsConst.TRADE_ACTIONS.REMOVE;
                this.gameManager.activeRoomEvents.send(dataSend);
            });
        }
        return true;
    }
    createTradeContainer(tradeActionKey, tradeItems) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeContainer');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeContainer".');
            return '';
        }
        // @TODO - BETA - Populate requirements totals.
        let confirmRequirements = '';
        let lastErrorData = this.message.result.lastErrorData;
        if (lastErrorData?.itemUid) lastErrorData.item = this.fetchItemLabelByUid(lastErrorData.itemUid);
        if (lastErrorData?.requiredItemKey) lastErrorData.requiredItem = this.fetchItemLabelByUid(lastErrorData.requiredItemKey);
        let lastErrorMessage = this.gameManager.services.translator.t(this.message.result.lastErrorMessage, lastErrorData);
        let tradeItemsBuy = ItemsConst.TRADE_ACTIONS.BUY === tradeActionKey ? tradeItems : '';
        let tradeItemsSell = ItemsConst.TRADE_ACTIONS.SELL === tradeActionKey ? tradeItems : '';
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            tradeActionKey,
            confirmRequirements,
            lastErrorMessage,
            tradeActionLabel: ObjectsConst.TRADE_ACTIONS_FUNCTION_NAME.CONFIRM,
            tradeItemsBuy,
            tradeItemsSell
        });
    }
    fetchItemLabelByUid(itemUid) {
        return this.gameManager?.inventory?.manager?.items[itemUid]?.label || this.message?.result?.items[itemUid]?.label || '';
    }
    fetchItemRequirements(itemKey, exchangeRequirements) {
        if (0 === exchangeRequirements.length) return false;
        let itemExchangeRequirements = {};
        for (let exchangeRequirement of exchangeRequirements){
            if (itemKey !== exchangeRequirement.itemKey) continue;
            itemExchangeRequirements[exchangeRequirement.itemKey] = exchangeRequirement;
        }
        return itemExchangeRequirements;
    }
    fetchItemRewards(itemKey, exchangeRewards) {
        if (0 === exchangeRewards.length) return false;
        let itemExchangeRewards = {};
        for (let exchangeReward of exchangeRewards){
            if (itemKey !== exchangeReward.itemKey) continue;
            itemExchangeRewards[exchangeReward.itemKey] = exchangeReward;
        }
        return itemExchangeRewards;
    }
    createTradeItemBox(item, exchangeDataItem) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeItem');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeItem".');
            return '';
        }
        let qtyTemplate = this.uiScene.cache.html.get('inventoryTradeItemQuantity');
        if (!qtyTemplate) {
            Logger.error('Missing template "inventoryTradeItemQuantity".');
            return '';
        }
        let isBuy = ItemsConst.TRADE_ACTIONS.BUY === item.tradeAction;
        let isSell = ItemsConst.TRADE_ACTIONS.SELL === item.tradeAction;
        let qty = exchangeDataItem || 0;
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            label: item.label,
            description: item.description,
            id: item.getInventoryId(),
            qty: item.qty,
            hiddenClass: 0 < qty && item.qty === qty ? ' hidden' : '',
            tradeRequirements: isBuy ? this.createTradeRequirementsContent(item) : '',
            tradeRewards: isSell ? this.createTradeRewardsContent(item) : '',
            tradeAction: this.createTradeActionContent(item),
            tradeActionKey: 'to-be-' + item.tradeAction,
            tradeQuantityContent: this.gameManager.gameEngine.parseTemplate(qtyTemplate, {
                quantityDisplay: item.quantityDisplay || 1,
                quantityMaxDisplay: 0 < item.quantityMaxDisplay ? 'max="' + item.quantityMaxDisplay + '"' : ''
            })
        });
    }
    createTradeRequirementsContent(item) {
        if (!item.exchangeRequirements) return '';
        let requirementsKeys = Object.keys(item.exchangeRequirements);
        if (0 === requirementsKeys.length) return '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeRequirements');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeRequirements".');
            return '';
        }
        let content = '';
        for (let i of requirementsKeys){
            let requirement = item.exchangeRequirements[i];
            content += this.gameManager.gameEngine.parseTemplate(messageTemplate, {
                itemKey: item.key,
                requiredItemKey: requirement.requiredItemKey,
                requiredQuantity: requirement.requiredQuantity
            });
        }
        return content;
    }
    createTradeRewardsContent(item) {
        if (!item.exchangeRewards) return '';
        let rewardsKeys = Object.keys(item.exchangeRewards);
        if (0 === rewardsKeys.length) return '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeRewards');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeRewards".');
            return '';
        }
        let content = '';
        for (let i of rewardsKeys){
            let reward = item.exchangeRewards[i];
            content += this.gameManager.gameEngine.parseTemplate(messageTemplate, {
                itemKey: item.key,
                rewardItemKey: reward.rewardItemKey,
                rewardQuantity: reward.rewardQuantity
            });
        }
        return content;
    }
    createTradeActionContent(item, tradeAction) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeAction');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeAction".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            id: item.getInventoryId(),
            tradeAction: tradeAction || sc.get(item, 'tradeAction', '')
        });
    }
    createTradeActionRemove(item) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeActionRemove');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeActionRemove".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            id: item.uid,
            tradeAction: 'remove'
        });
    }
    activateItemsBoxActions(items) {
        for (let i of Object.keys(items)){
            let item = items[i];
            let itemContainerSelector = '.trade-item-to-be-' + item.tradeAction + '.trade-item-' + item.uid + ' .trade-action-' + item.tradeAction;
            let itemButtonSelector = itemContainerSelector + ' button';
            let itemActionButton = this.gameDom.getElement(itemButtonSelector);
            if (!itemActionButton) {
                Logger.error('Activate trade item "' + item.uid + '" action button not found.');
                continue;
            }
            itemActionButton.addEventListener('click', ()=>{
                let qtySelector = this.gameDom.getElement('.trade-item-' + item.getInventoryId() + ' .item-qty input');
                let qtySelected = qtySelector?.value || 1;
                let dataSend = {
                    act: ObjectsConst.OBJECT_INTERACTION,
                    id: this.message.id,
                    value: item.tradeAction,
                    itemId: item.getInventoryId(),
                    itemKey: item.key,
                    qty: Number(qtySelected)
                };
                dataSend[ObjectsConst.TRADE_ACTIONS.SUB_ACTION] = ObjectsConst.TRADE_ACTIONS.ADD;
                this.gameManager.activeRoomEvents.send(dataSend);
            });
        }
    }
    mapInventoryKeyFromAction(action) {
        let map = {
            buy: 'A',
            sell: 'B'
        };
        return sc.get(map, action, false);
    }
}
module.exports.TraderObjectUi = TraderObjectUi;

},{"cdac730d5b5ab82a":"@reldens/items-system","709ad51a4f52a4c4":"k06SD","1ac8620591e8ad0f":"@reldens/utils"}],"fHBlx":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - DropsMessageListener
 *
 */ const { ObjectsConst } = require("7218290e5fe5ff56");
const { Logger, sc } = require("ed2fa042702eef92");
class DropsMessageListener {
    static listenMessages(room, gameManager) {
        room.onMessage('*', (message)=>{
            let drops = sc.get(message, ObjectsConst.DROPS.KEY, false);
            if (drops) this.loadObjects(drops, gameManager);
            if (ObjectsConst.DROPS.REMOVE === message.act) this.removeDropById(message.id, gameManager);
        });
    }
    static loadObjects(drops, gameManager) {
        let currentScene = gameManager.getActiveScene();
        let gameConfig = gameManager.config;
        let objectPlugin = gameManager.getFeature('objects');
        let loader = currentScene.load;
        if (!this.validateParams({
            currentScene,
            gameConfig,
            objectPlugin,
            loader
        })) return false;
        for (let [dropId, drop] of Object.entries(drops)){
            this.loadSpritesheet(drop, loader, gameConfig);
            loader.once('complete', async (event)=>{
                await this.createDropAnimation(objectPlugin, drop, dropId, currentScene);
            });
        }
        loader.start();
        return true;
    }
    static async createDropAnimation(objectsPlugin, drop, dropId, currentScene) {
        let dropAnimationData = {
            type: ObjectsConst.DROPS.PICK_UP_ACT,
            enabled: true,
            ui: true,
            frameStart: drop[ObjectsConst.DROPS.PARAMS]['start'],
            frameEnd: drop[ObjectsConst.DROPS.PARAMS]['end'],
            repeat: drop[ObjectsConst.DROPS.PARAMS]['repeat'],
            autoStart: true,
            key: dropId,
            id: dropId,
            targetName: '',
            layerName: dropId,
            isInteractive: true,
            asset_key: drop[ObjectsConst.DROPS.ASSET_KEY],
            x: drop.x,
            y: drop.y,
            yoyo: drop[ObjectsConst.DROPS.PARAMS]['yoyo']
        };
        return await objectsPlugin.createAnimationFromAnimData(dropAnimationData, currentScene);
    }
    static loadSpritesheet(drop, loader, gameConfig) {
        loader.spritesheet(drop[ObjectsConst.DROPS.ASSET_KEY], this.getSpritesheetPath(drop), this.getRewardFrameConfig(drop[ObjectsConst.DROPS.PARAMS], gameConfig));
    }
    static getRewardFrameConfig(dropParams, gameConfig) {
        return {
            frameWidth: sc.get(dropParams, 'frameWidth', gameConfig.getWithoutLogs('client/map/dropsTile/width', gameConfig.get('client/map/tileData/width'))),
            frameHeight: sc.get(dropParams, 'frameHeight', gameConfig.getWithoutLogs('client/map/dropsTile/height', gameConfig.get('client/map/tileData/height')))
        };
    }
    static getSpritesheetPath(drop) {
        return ObjectsConst.DROPS.ASSETS_PATH + drop[ObjectsConst.DROPS.FILE];
    }
    static removeDropById(dropId, gameManager) {
        if (!dropId) return false;
        let currentScene = gameManager.activeRoomEvents.getActiveScene();
        let dropAnimation = sc.get(currentScene.objectsAnimations, dropId, false);
        if (!dropAnimation) return false;
        dropAnimation.sceneSprite.destroy();
        delete currentScene.objectsAnimations[dropId];
    }
    static validateParams(props) {
        let isValid = true;
        if (!sc.get(props, 'currentScene', false)) {
            Logger.error('Scene is undefined in Rewards Message Listener.');
            isValid = false;
        }
        if (!sc.get(props, 'gameConfig', false)) {
            Logger.error('Game Config is undefined in Rewards Message Listener.');
            isValid = false;
        }
        if (!sc.get(props, 'objectPlugin', false)) {
            Logger.error('Object Plugin is undefined in Rewards Message Listener.');
            isValid = false;
        }
        if (!sc.get(props, 'loader', false)) {
            Logger.error('Loader is undefined in Rewards Message Listener.');
            isValid = false;
        }
        return isValid;
    }
}
module.exports.DropsMessageListener = DropsMessageListener;

},{"7218290e5fe5ff56":"k06SD","ed2fa042702eef92":"@reldens/utils"}],"3HuaA":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    objects: {
        npcInvalid: 'I do not understand.',
        trader: {
            content: 'Hi there! What would you like to do?',
            options: {
                buy: 'Buy',
                sell: 'Sell'
            },
            buyConfirmed: 'Thanks for buying!',
            sellConfirmed: 'Thanks for your products!'
        }
    }
};

},{}],"kO7Qp":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - UserInterface
 *
 */ const { GameConst } = require("9dd5a78a77f1fddd");
const { Logger, sc } = require("46e0fe20c6ebdda0");
class UserInterface {
    constructor(gameManager, animProps, template = '/assets/html/dialog-box.html', uiPositionKey){
        this.events = gameManager.events;
        this.gameDom = gameManager.gameDom;
        this.initialTitle = '';
        this.initialContent = '';
        this.id = animProps.id;
        this.animProps = animProps;
        this.template = template;
        this.uiPositionKey = uiPositionKey || 'default';
        this.openButton = null;
        this.closeButton = null;
        this.listenEvents();
    }
    listenEvents() {
        if (!this.events) return false;
        this.events.on('reldens.beforePreload', (preloadScene)=>{
            this.preloadUiElement(preloadScene);
        });
        this.events.on('reldens.createPreload', (preloadScene, uiScene)=>{
            this.createUiElement(uiScene);
        });
    }
    preloadUiElement(preloadScene) {
        if (!this.template) return;
        preloadScene.load.html(this.id, this.template);
    }
    createUiElement(uiScene, templateKey = '') {
        if ('' === templateKey) templateKey = this.id;
        let objectElementId = 'box-' + this.id;
        if (sc.get(uiScene.elementsUi, this.id)) return this;
        let dialogBox = this.createDialogBox(uiScene, templateKey);
        this.createBoxContent(uiScene, templateKey, dialogBox);
        let dialogContainer = this.gameDom.getElement('.ui-box.ui-dialog-box', dialogBox.node);
        if (!dialogContainer) {
            Logger.critical('Missing dialog container for template key: "' + templateKey + '".', {
                dialogBox,
                dialogContainer,
                objectElementId
            });
            return false;
        }
        dialogContainer.id = objectElementId;
        dialogContainer.classList.add('type-' + (this.animProps?.type || 'dialog-box'));
        this.activateOpenButton(dialogBox, dialogContainer, uiScene);
        this.activateCloseButton(dialogBox, dialogContainer, uiScene);
        uiScene.userInterfaces[this.id] = this;
        uiScene.elementsUi[this.id] = dialogBox;
        // @TODO - BETA - refactor to return the created dialog box.
        return this;
    }
    createDialogBox(uiScene, templateKey) {
        let { newWidth, newHeight } = uiScene.gameManager.gameEngine.getCurrentScreenSize(uiScene.gameManager);
        let { uiX, uiY } = uiScene.getUiPosition(this.uiPositionKey, newWidth, newHeight);
        return uiScene.add.dom(uiX, uiY).createFromCache(templateKey);
    }
    createBoxContent(uiScene, templateKey, dialogBox) {
        let messageTemplate = uiScene.cache.html.get(templateKey);
        dialogBox.innerHTML = uiScene.gameManager.gameEngine.parseTemplate(messageTemplate, {
            title: this.initialTitle,
            content: this.initialContent
        });
    }
    activateOpenButton(dialogBox, dialogContainer, uiScene) {
        // @TODO - BETA - Extract into a new service.
        this.openButton = this.gameDom.getElement('.' + GameConst.UI_BOX + GameConst.UI_OPEN, dialogBox.node);
        if (!this.openButton) return false;
        this.openButton.id = GameConst.UI_BOX + GameConst.UI_OPEN + '-' + this.id;
        this.openButton.addEventListener('click', ()=>{
            // @TODO - BETA - Replace styles classes.
            if (sc.get(this.animProps, 'defaultOpen', true)) {
                dialogContainer.style.display = 'block';
                this.openButton.style.display = 'none';
                if (false !== sc.get(this.animProps, 'depth', false)) dialogBox.setDepth(this.animProps.depth);
            }
            if (sc.isFunction(this.animProps['openCallBack'])) this.animProps['openCallBack']();
            this.events.emit('reldens.openUI', {
                ui: this,
                openButton: this.openButton,
                dialogBox,
                dialogContainer,
                uiScene
            });
        });
        return this.openButton;
    }
    activateCloseButton(dialogBox, dialogContainer, uiScene) {
        // @TODO - BETA - Extract into a new service.
        this.closeButton = this.gameDom.getElement('.' + GameConst.UI_BOX + GameConst.UI_CLOSE, dialogBox.node);
        if (!this.closeButton) return false;
        this.closeButton.id = GameConst.UI_BOX + GameConst.UI_CLOSE + '-' + this.id;
        this.closeButton.addEventListener('click', ()=>{
            if (!sc.hasOwn(this.animProps, 'sendCloseMessage') || false === this.animProps['sendCloseMessage']) uiScene.gameManager.activeRoomEvents.send({
                act: GameConst.CLOSE_UI_ACTION,
                id: this.id
            });
            // @TODO - BETA - Replace styles classes.
            if (sc.get(this.animProps, 'defaultClose', true)) {
                dialogContainer.style.display = 'none';
                if (this.openButton) this.openButton.style.display = 'block';
                if (false !== sc.get(this.animProps, 'depth', false)) dialogBox.setDepth(1);
            }
            if (sc.isFunction(this.animProps['closeCallback'])) this.animProps['closeCallback']();
            this.events.emit('reldens.closeUI', {
                ui: this,
                closeButton: this.closeButton,
                openButton: this.openButton,
                dialogBox,
                dialogContainer,
                uiScene
            });
        });
    }
}
module.exports.UserInterface = UserInterface;

},{"9dd5a78a77f1fddd":"iznl5","46e0fe20c6ebdda0":"@reldens/utils"}],"hmGdV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - InventoryPlugin
 *
 */ const { InventoryUi } = require("93a2698fe17dc4e0");
const { InventoryReceiver } = require("4ea19e0d8652e572");
const { TradeTargetAction } = require("c92183e48821b0fc");
const { TradeMessageListener } = require("38030851510ae93a");
const { UserInterface } = require("7ae796ce0e1a8f8f");
const { PluginInterface } = require("373423cdbc6c5da5");
const { TemplatesHandler } = require("adcbde3f87e2b9a3");
const { TranslationsMapper } = require("6a97eeb2c282726");
const Translations = require("6b2f7e4678231407");
const { InventoryConst } = require("2f53dfbd6cac665f");
const { ItemsEvents, ItemsConst } = require("60d2bcd47ae516b6");
const { GameConst } = require("301626b09cbde5a3");
const { Logger, sc } = require("22940f0bf72eac5a");
class InventoryPlugin extends PluginInterface {
    setup(props) {
        // @TODO - BETA - Refactor plugin, extract all the methods into new classes.
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in InventoryPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in InventoryPlugin.');
        this.tradeTargetAction = new TradeTargetAction();
        this.setTradeUi();
        this.listenEvents();
        this.setListener();
        this.setTranslations();
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, InventoryConst.MESSAGE.DATA_VALUES);
    }
    setTradeUi() {
        if (!this.gameManager) return false;
        // @TODO - BETA - Make the dialogBox template load on it's own so we can reuse the same object from cache.
        // @NOTE: the tradeUi works as preload for the trade template which at the end is an dialog-box.
        this.tradeUi = new UserInterface(this.gameManager, {
            id: 'trade',
            type: 'trade'
        });
    }
    setListener() {
        if (!this.gameManager) return false;
        this.gameManager.config.client.message.listeners['trade'] = new TradeMessageListener();
    }
    listenEvents() {
        if (!this.events) return false;
        this.events.on('reldens.playersOnAdd', (player, key, previousScene, roomEvents)=>{
            this.onPlayerAdd(key, roomEvents, player);
        });
        this.events.on('reldens.preloadUiScene', (preloadScene)=>{
            TemplatesHandler.preloadTemplates(preloadScene);
        });
        this.events.on('reldens.createUiScene', (preloadScene)=>{
            return this.onPreloadUiScene(preloadScene);
        });
        this.events.on('reldens.gameEngineShowTarget', (gameEngine, target, previousTarget, targetName)=>{
            this.tradeTargetAction.showTargetExchangeAction(this.gameManager, target, previousTarget, targetName);
        });
    }
    onPreloadUiScene(preloadScene) {
        this.uiManager = new InventoryUi(preloadScene);
        this.uiManager.createUi();
        let inventoryPanel = preloadScene.getUiElement('inventory').getChildByProperty('id', InventoryConst.INVENTORY_ITEMS);
        if (!inventoryPanel) {
            Logger.error('Inventory UI not found.', inventoryPanel);
            return false;
        }
        let equipmentPanel = preloadScene.getUiElement('equipment').getChildByProperty('id', InventoryConst.EQUIPMENT_ITEMS);
        if (!equipmentPanel) {
            Logger.error('Equipment UI not found.', equipmentPanel);
            return false;
        }
        let manager = preloadScene.gameManager.inventory.manager;
        let inventoryGroups = sc.get(manager, 'groups', {});
        if (Object.keys(inventoryGroups).length) {
            preloadScene.gameManager.gameDom.getElement('#' + InventoryConst.EQUIPMENT_ITEMS).innerHTML = '';
            let orderedGroups = this.sortGroups(inventoryGroups);
            for (let i of orderedGroups){
                let output = this.createGroupBox(inventoryGroups[i], preloadScene.gameManager, preloadScene);
                preloadScene.gameManager.gameDom.appendToElement('#' + InventoryConst.EQUIPMENT_ITEMS, output);
            }
        }
        let itemsElements = sc.get(manager, 'items', {});
        let itemsKeys = Object.keys(itemsElements);
        if (0 < itemsKeys.length) for (let i of itemsKeys){
            let item = itemsElements[i];
            this.displayItem(item, preloadScene, equipmentPanel, inventoryPanel, i);
        }
        // listen for inventory events:
        this.listenInventoryEvents(preloadScene, inventoryPanel, equipmentPanel);
    }
    onPlayerAdd(key, roomEvents, player) {
        if (key !== roomEvents.room.sessionId) return false;
        if (!roomEvents.gameManager.inventory) this.createInventoryInstance(player, roomEvents);
        roomEvents.room.onMessage('*', (message)=>{
            roomEvents.gameManager.inventory.processMessage(message);
        });
    }
    createInventoryInstance(player, roomEvents) {
        let receiverProps = {
            owner: player,
            ownerIdProperty: 'sessionId',
            gameManager: roomEvents.gameManager
        };
        let inventoryClasses = roomEvents.gameManager.config.getWithoutLogs('client/customClasses/inventory/items', {});
        if (inventoryClasses && 0 < Object.keys(inventoryClasses).length) receiverProps.itemClasses = inventoryClasses;
        let groupClasses = roomEvents.gameManager.config.getWithoutLogs('client/customClasses/inventory/groups', {});
        if (groupClasses && Object.keys(groupClasses).length) receiverProps.groupClasses = groupClasses;
        roomEvents.gameManager.inventory = new InventoryReceiver(receiverProps);
    }
    listenInventoryEvents(uiScene, inventoryPanel, equipmentPanel) {
        let gameManager = uiScene.gameManager;
        let masterKey = gameManager.inventory.manager.getOwnerEventKey();
        gameManager.inventory.manager.listenEvent(ItemsEvents.ADD_ITEM, (inventory, item)=>{
            let output = this.createItemBox(item, 'inventoryItem', gameManager, uiScene);
            gameManager.gameDom.appendToElement('#' + InventoryConst.INVENTORY_ITEMS, output);
            this.setupButtonsActions(inventoryPanel, item.getInventoryId(), item, uiScene);
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('addItemPack'), masterKey);
        gameManager.inventory.manager.listenEvent(ItemsEvents.SET_ITEMS, (props)=>{
            inventoryPanel.innerHTML = '';
            for (let i of Object.keys(props.items)){
                let item = props.items[i];
                this.displayItem(item, uiScene, equipmentPanel, inventoryPanel, i);
            }
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('setItemsPack'), masterKey);
        gameManager.inventory.manager.listenEvent(ItemsEvents.MODIFY_ITEM_QTY, (item)=>{
            let qtyBox = uiScene.getUiElement('inventory').getChildByID('item-qty-' + item.getInventoryId());
            qtyBox.innerHTML = item.qty;
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('modifyItemQtyPack'), masterKey);
        gameManager.inventory.manager.listenEvent(ItemsEvents.REMOVE_ITEM, (inventory, itemKey)=>{
            uiScene.getUiElement('inventory').getChildByID('item-' + itemKey).remove();
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('removeItemPack'), masterKey);
        gameManager.inventory.manager.listenEvent(ItemsEvents.SET_GROUPS, (props)=>{
            // @TODO - BETA - If groups are re-set or updated we will need to update the items as well.
            let reEquipItems = false;
            let equipmentItemsGroups = gameManager.gameDom.getElement('#' + InventoryConst.EQUIPMENT_ITEMS);
            if (equipmentItemsGroups.innerHTML !== '') reEquipItems = true;
            equipmentItemsGroups.innerHTML = '';
            let orderedGroups = this.sortGroups(props.groups);
            for (let i of orderedGroups){
                let output = this.createGroupBox(props.groups[i], gameManager, uiScene);
                gameManager.gameDom.appendToElement('#' + InventoryConst.EQUIPMENT_ITEMS, output);
            }
            if (reEquipItems) this.resetEquippedItemsDisplay(gameManager, uiScene, equipmentPanel, inventoryPanel);
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('setGroupsPack'), masterKey);
        gameManager.inventory.manager.listenEvent(ItemsEvents.EQUIP_ITEM, (item)=>{
            this.displayItem(item, uiScene, equipmentPanel, inventoryPanel, item.getInventoryId());
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('equipItemPack'), masterKey);
        gameManager.inventory.manager.listenEvent(ItemsEvents.UNEQUIP_ITEM, (item)=>{
            this.displayItem(item, uiScene, equipmentPanel, inventoryPanel, item.getInventoryId());
        }, gameManager.inventory.manager.getOwnerUniqueEventKey('unequipItemPack'), masterKey);
    }
    resetEquippedItemsDisplay(gameManager, uiScene, equipmentPanel, inventoryPanel) {
        let items = Object.keys(gameManager.inventory.manager.items);
        if (0 === items.length) return false;
        for (let i of items){
            let item = gameManager.inventory.manager.items[i];
            if (!this.isEquipped(item)) continue;
            this.displayItem(item, uiScene, equipmentPanel, inventoryPanel, item.getInventoryId());
        }
    }
    displayItem(item, uiScene, equipmentPanel, inventoryPanel, itemIdx) {
        let output = this.createItemBox(item, 'inventoryItem', uiScene.gameManager, uiScene);
        let existentElement = uiScene.gameManager.gameDom.getElement('#item-' + item.getInventoryId());
        if (existentElement) existentElement.remove();
        if (this.isEquipped(item)) {
            let group = this.getGroupById(item.group_id, uiScene.gameManager.inventory.manager.groups);
            if (group && uiScene.gameManager.gameDom.getElement('#group-item-' + group.key + ' .equipped-item')) uiScene.gameManager.gameDom.updateContent('#group-item-' + group.key + ' .equipped-item', output);
            else // @TODO - BETA - Make this append optional for now we will leave it to make the equipment action
            //   visible.
            // Logger.error('Group element not found. Group ID: '+item.group_id);
            uiScene.gameManager.gameDom.appendToElement('#' + InventoryConst.EQUIPMENT_ITEMS, output);
            this.setupButtonsActions(equipmentPanel, itemIdx, item, uiScene);
        } else {
            uiScene.gameManager.gameDom.appendToElement('#' + InventoryConst.INVENTORY_ITEMS, output);
            this.setupButtonsActions(inventoryPanel, itemIdx, item, uiScene);
        }
    }
    updateEquipmentStatus(item, gameManager) {
        let currentItemElement = gameManager.gameDom.getElement('#item-equip-' + item.idx);
        let equipState = item.equipped ? 'equipped' : 'unequipped';
        // @TODO - BETA - Replace fixed image type.
        currentItemElement.src = '/assets/features/inventory/assets/' + equipState + GameConst.FILES.EXTENSIONS.PNG;
    }
    createItemBox(item, templateKey, gameManager, uiScene) {
        let messageTemplate = uiScene.cache.html.get(templateKey);
        return gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            label: item.label,
            description: item.description,
            id: item.getInventoryId(),
            qty: item.qty,
            usable: this.isUsable(item) ? this.getUsableContent(item, gameManager, uiScene) : '',
            equipment: this.isEquipment(item) ? this.getEquipContent(item, gameManager, uiScene) : ''
        });
    }
    isEquipment(item) {
        return item.isType(ItemsConst.TYPES.EQUIPMENT) || item.isType(ItemsConst.TYPES.SINGLE_EQUIPMENT);
    }
    isEquipped(item) {
        return this.isEquipment(item) && true === item.equipped;
    }
    isUsable(item) {
        return item.isType(ItemsConst.TYPES.USABLE) || item.isType(ItemsConst.TYPES.SINGLE_USABLE);
    }
    sortGroups(groups) {
        return Object.keys(groups).sort((a, b)=>{
            return groups[a].sort > groups[b].sort ? 1 : -1;
        });
    }
    createGroupBox(group, gameManager, uiScene) {
        let messageTemplate = uiScene.cache.html.get('inventoryGroup');
        return gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: group.key,
            label: group.label,
            description: group.description,
            fileName: group.files_name
        });
    }
    setupButtonsActions(inventoryPanel, idx, item, preloadScene) {
        // @TODO - BETA - Improve and move all the styles into an external class, and make it configurable.
        let domMan = preloadScene.gameManager.gameDom;
        // show item data:
        let itemImage = inventoryPanel.querySelector('#item-' + idx + ' .image-container img');
        if (!itemImage) {
            Logger.error([
                'Missing image element.',
                '#item-' + idx
            ]);
            return false;
        }
        itemImage.addEventListener('click', ()=>{
            let details = inventoryPanel.querySelector('#item-' + idx + ' .item-data-container');
            let show = false;
            if (details.style.display !== 'block') show = true;
            inventoryPanel.querySelectorAll('.item-box .image-container img').forEach(function(element) {
                element.style.border = 'none';
            });
            inventoryPanel.querySelectorAll('.item-data-container').forEach(function(element) {
                element.style.display = 'none';
            });
            if (show) {
                itemImage.style.border = '1px solid #fff';
                details.style.display = 'block';
            }
        });
        let buttonElement = inventoryPanel.querySelector('#item-trash-' + idx + ' img');
        if (!buttonElement) {
            Logger.error([
                'Missing button.',
                buttonElement
            ]);
            return false;
        }
        buttonElement.addEventListener('click', ()=>{
            inventoryPanel.querySelector('#trash-confirm-' + idx).style.display = 'block';
        });
        inventoryPanel.querySelector('#trash-cancel-' + idx).addEventListener('click', ()=>{
            inventoryPanel.querySelector('#trash-confirm-' + idx).style.display = 'none';
        });
        inventoryPanel.querySelector('#trash-confirmed-' + idx).addEventListener('click', ()=>{
            let optionSend = {
                idx: idx,
                act: InventoryConst.ACTIONS.REMOVE
            };
            preloadScene.gameManager.activeRoomEvents.send(optionSend);
        });
        if (this.isUsable(item)) {
            let useBtn = domMan.getElement('#item-use-' + idx);
            useBtn.addEventListener('click', this.clickedBox.bind(this, idx, InventoryConst.ACTIONS.USE, preloadScene));
        }
        if (this.isEquipment(item)) {
            let equipBtn = domMan.getElement('#item-equip-' + idx);
            equipBtn.addEventListener('click', this.clickedBox.bind(this, idx, InventoryConst.ACTIONS.EQUIP, preloadScene));
        }
    }
    clickedBox(itemId, action, preloadScene) {
        preloadScene.gameManager.activeRoomEvents.send({
            act: action,
            idx: itemId
        });
    }
    getUsableContent(item, gameManager, uiScene) {
        let messageTemplate = uiScene.cache.html.get('inventoryItemUse');
        return gameManager.gameEngine.parseTemplate(messageTemplate, {
            id: item.getInventoryId()
        });
    }
    getEquipContent(item, gameManager, uiScene) {
        let messageTemplate = uiScene.cache.html.get('inventoryItemEquip');
        return gameManager.gameEngine.parseTemplate(messageTemplate, {
            id: item.getInventoryId(),
            equipStatus: item.equipped ? 'equipped' : 'unequipped'
        });
    }
    getGroupById(groupId, groupsList) {
        let groups = Object.keys(groupsList);
        if (0 === groups.length) return false;
        for (let i of groups){
            if (groupsList[i].id === groupId) return groupsList[i];
        }
    }
}
module.exports.InventoryPlugin = InventoryPlugin;

},{"93a2698fe17dc4e0":"dJ6V6","4ea19e0d8652e572":"2Kc1X","c92183e48821b0fc":"43DY5","38030851510ae93a":"iiJ7a","7ae796ce0e1a8f8f":"kO7Qp","373423cdbc6c5da5":"deNd3","adcbde3f87e2b9a3":"idDSW","6a97eeb2c282726":"fKH2J","6b2f7e4678231407":"3nFoi","2f53dfbd6cac665f":"lRgYc","60d2bcd47ae516b6":"@reldens/items-system","301626b09cbde5a3":"iznl5","22940f0bf72eac5a":"@reldens/utils"}],"dJ6V6":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - InventoryUi
 *
 */ const { UiFactory } = require("e75d644c5b28eee5");
const { InventoryConst } = require("565ca982f9eea32e");
class InventoryUi extends UiFactory {
    createUi() {
        // @TODO - BETA - Replace by UserInterface.
        this.create('inventory', 5, true, true, null, ()=>{
            this.inventoryVisibility('inventory');
        });
        this.create('equipment', 4, true, true, null, ()=>{
            this.inventoryVisibility('inventory');
        });
    }
    inventoryVisibility(constantCodeName) {
        let containerId = '#' + InventoryConst[constantCodeName + '_ITEMS'];
        let itemImages = this.gameManager.gameDom.getElements(containerId + ' .item-box .image-container img');
        for (let itemImage of itemImages)itemImage.style.border = 'none';
        let itemContainers = this.gameManager.gameDom.getElements(containerId + ' .item-data-container');
        for (let itemContainer of itemContainers)itemContainer.style.border = 'none';
    }
}
module.exports.InventoryUi = InventoryUi;

},{"e75d644c5b28eee5":"alyOj","565ca982f9eea32e":"lRgYc"}],"alyOj":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - UiFactory
 *
 */ const { GameConst } = require("116a5afefa53e8ad");
class UiFactory {
    constructor(uiScene){
        this.uiScene = uiScene;
        this.gameManager = this.uiScene.gameManager;
    }
    create(uiCodeName, depth, defaultOpen, defaultClose, openCallback, closeCallback) {
        // @TODO - BETA - Replace by UserInterface.
        let { uiX, uiY } = this.uiScene.getUiConfig(uiCodeName);
        let dialogBox = this.uiScene.add.dom(uiX, uiY).createFromCache(uiCodeName);
        let openButton = dialogBox.getChildByProperty('id', uiCodeName + GameConst.UI_OPEN);
        let closeButton = dialogBox.getChildByProperty('id', uiCodeName + GameConst.UI_CLOSE);
        openButton?.addEventListener('click', ()=>{
            // @TODO - BETA - Replace styles classes.
            let dialogContainer = dialogBox.getChildByProperty('id', uiCodeName + '-ui');
            if (defaultOpen) {
                if (dialogContainer) dialogContainer.style.display = 'block';
                openButton.style.display = 'none';
                dialogBox.setDepth(depth);
            }
            if (openCallback && 'function' === typeof openCallback) openCallback();
            this.gameManager.events.emit('reldens.openUI', {
                ui: this,
                openButton,
                dialogBox,
                dialogContainer,
                uiScene: this.uiScene
            });
        });
        closeButton?.addEventListener('click', ()=>{
            let dialogContainer = dialogBox.getChildByProperty('id', uiCodeName + '-ui');
            if (defaultClose) {
                if (dialogContainer) dialogContainer.style.display = 'none';
                dialogBox.setDepth(1);
                if (openButton) openButton.style.display = 'block';
            }
            if (closeCallback && 'function' === typeof closeCallback) closeCallback();
            this.gameManager.events.emit('reldens.closeUI', {
                ui: this,
                closeButton,
                openButton,
                dialogBox,
                dialogContainer,
                uiScene: this.uiScene
            });
        });
        this.uiScene.elementsUi[uiCodeName] = dialogBox;
    }
}
module.exports.UiFactory = UiFactory;

},{"116a5afefa53e8ad":"iznl5"}],"lRgYc":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - InventoryConst
 *
 */ let prefix = 'ivp';
module.exports.InventoryConst = {
    INVENTORY_ITEMS: 'inventory-items',
    INVENTORY_OPEN: 'inventory-open',
    INVENTORY_CLOSE: 'inventory-close',
    EQUIPMENT_ITEMS: 'equipment-items',
    EQUIPMENT_CLOSE: 'equipment-close',
    EQUIPMENT_OPEN: 'equipment-open',
    ANIMATION_KEY_PREFIX: 'aK_',
    GROUP_BUCKET: '/assets/custom/groups',
    ACTIONS: {
        PREFIX: prefix,
        REMOVE: prefix + 'Rm',
        USE: prefix + 'Use',
        EQUIP: prefix + 'Eqi',
        TRADE_START: prefix + 'tStart',
        TRADE_ACCEPTED: prefix + 'tAccepted',
        TRADE_SHOW: prefix + 'tShow',
        TRADE_ACTION: prefix + 'tAction'
    },
    MESSAGE: {
        DATA_VALUES: {
            NAMESPACE: 'items'
        }
    }
};

},{}],"2Kc1X":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - InventoryReceiver
 *
 */ const { InventoryConst } = require("b5d0f9ee9d22fb55");
const { GameConst } = require("92cdba323e44bcec");
const { Receiver } = require("cb4e0a55d43d72b7");
const { ErrorManager, Logger, sc } = require("c6222908b64bdf56");
class InventoryReceiver extends Receiver {
    constructor(props){
        if (!sc.hasOwn(props, 'gameManager')) ErrorManager.error('InventoryReceiver gameManager not specified.');
        super(props);
        this.gameManager = props.gameManager;
        this.itemSprites = {};
        this.itemsAnimations = {};
    }
    onExecuting(message) {
        // @TODO - BETA - Improve, split in several classes, methods and functionalities.
        let item = message.item;
        if (!sc.hasOwn(item, 'animationData')) {
            Logger.warning('Item does not contain animation data.', message);
            return false;
        }
        let animKey = InventoryConst.ANIMATION_KEY_PREFIX + item.key;
        let currentScene = this.gameManager.getActiveScene();
        let existentAnimation = this.itemSprites[animKey] && this.itemSprites[animKey].anims && currentScene.anims.get(animKey);
        if (existentAnimation) {
            Logger.debug('Animation already exists, playing: ' + animKey);
            this.playSpriteAnimation(animKey, item);
            return false;
        }
        // @TODO - BETA - Remove hardcoded file extension.
        currentScene.load.spritesheet(animKey, '/assets/custom/sprites/' + item.key + GameConst.FILES.EXTENSIONS.PNG, {
            frameWidth: item.animationData.frameWidth || 64,
            frameHeight: item.animationData.frameHeight || 64
        }).on('loaderror', (event)=>{
            Logger.error('Sprite load error: ' + animKey, event);
        });
        currentScene.load.on('complete', ()=>{
            Logger.debug('Scene load complete, playing: ' + animKey);
            this.createItemSprites(animKey, item, message, currentScene);
        });
        currentScene.load.start();
    }
    createItemSprites(animKey, item, message, currentScene) {
        let targetId = this.extractTargetId(item, message, currentScene);
        if (!targetId) {
            Logger.error('Target ID not found.');
            return false;
        }
        let playerSprite = sc.get(currentScene.player.players, targetId, false);
        if (!playerSprite) {
            Logger.error('Player sprite not found by target ID.');
            return false;
        }
        // @TODO - BETA - Make all the defaults configurable.
        let animationFromScene = currentScene.anims.get(animKey);
        if (!animationFromScene) {
            Logger.debug('Creating new animation on scene: ' + animKey);
            animationFromScene = currentScene.anims.create({
                key: animKey,
                frames: currentScene.anims.generateFrameNumbers(animKey, {
                    start: item.animationData.start || 0,
                    end: item.animationData.end || 1
                }),
                frameRate: sc.get(item.animationData, 'frameRate', currentScene.configuredFrameRate),
                repeat: item.animationData.repeat || 3,
                hideOnComplete: sc.get(item.animationData, 'hide', true),
                showOnStart: sc.get(item.animationData, 'showOnStart', true)
            });
        }
        this.itemsAnimations[animKey] = animationFromScene;
        let x = sc.get(item.animationData, 'fixedX', item.animationData.usePlayerPosition ? playerSprite.x : 0);
        let y = sc.get(item.animationData, 'fixedY', item.animationData.usePlayerPosition ? playerSprite.y : 0);
        this.itemSprites[animKey] = currentScene.physics.add.sprite(x, y, animKey);
        this.itemSprites[animKey] = this.itemSprites[animKey].setDepth(90000);
        this.itemSprites[animKey].depthByPlayer = 'above';
        if (item.animationData.followPlayer) playerSprite.moveSprites[animKey] = this.itemSprites[animKey];
        // @TODO - BETA - Make auto-destroy configurable.
        Logger.debug('Playing sprite: ' + animKey);
        this.playSpriteAnimation(animKey, item).on('animationcomplete', ()=>{
            if (item.animationData.destroyOnComplete) this.destroyAnimation(item, animKey, playerSprite);
        });
    }
    playSpriteAnimation(animKey, item) {
        // @TODO - BETA - Make closeInventoryOnUse and ignoreIfPlaying default values configurable.
        let closeInventoryOnUse = sc.get(item.animationData, 'closeInventoryOnUse', false);
        if (closeInventoryOnUse) this.gameManager.gameDom.getElement('#inventory-close')?.click();
        let spriteAnims = this.itemSprites[animKey].anims;
        if (!spriteAnims) {
            Logger.error('Sprite animation not found: ' + animKey);
            return false;
        }
        spriteAnims.visible = true;
        return spriteAnims.play(animKey, sc.get(item.animationData, 'ignoreIfPlaying', true));
    }
    destroyAnimation(item, animKey, playerSprite) {
        this.itemSprites[animKey].destroy();
        delete this.itemSprites[animKey];
        delete this.itemsAnimations[animKey];
        if (item.animationData.followPlayer) delete playerSprite.moveSprites[animKey];
        Logger.debug('Animation and sprite destroyed: ' + animKey);
    }
    extractTargetId(item, message, currentScene) {
        if (item.animationData.startsOnTarget && message.target?.playerId) return message.target.playerId;
        return currentScene.player?.playerId || false;
    }
}
module.exports.InventoryReceiver = InventoryReceiver;

},{"b5d0f9ee9d22fb55":"lRgYc","92cdba323e44bcec":"iznl5","cb4e0a55d43d72b7":"@reldens/items-system","c6222908b64bdf56":"@reldens/utils"}],"43DY5":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TradeTargetAction
 *
 */ const { InventoryConst } = require("94b3a8b907c2a901");
const { GameConst } = require("2b9434348d7355dc");
const { Logger, sc } = require("d685cc0c689d4ce3");
class TradeTargetAction {
    showTargetExchangeAction(gameManager, target, previousTarget, targetName) {
        if (GameConst.TYPE_PLAYER !== target.type || gameManager.getCurrentPlayer().playerId === target.id) return false;
        let uiScene = gameManager.gameEngine.uiScene;
        let uiTarget = sc.get(uiScene, 'uiTarget', false);
        if (false === uiTarget) return false;
        let inventoryTradeStartTemplate = uiScene.cache.html.get('inventoryTradeStart');
        if (!inventoryTradeStartTemplate) {
            Logger.critical('Template "inventoryTradeStart" not found.');
            return false;
        }
        gameManager.gameDom.appendToElement('#target-container', gameManager.gameEngine.parseTemplate(inventoryTradeStartTemplate, {
            playerName: targetName,
            playerId: target.id
        }));
        let tradeStartButton = gameManager.gameDom.getElement('.start-trade-' + target.id + ' button');
        if (!tradeStartButton) {
            Logger.critical('Trade start button not found for selector: ".start-trade-' + target.id + ' button' + '"');
            return false;
        }
        tradeStartButton.addEventListener('click', ()=>{
            let sendData = {
                act: InventoryConst.ACTIONS.TRADE_START,
                id: target.id
            };
            gameManager.activeRoomEvents.send(sendData);
        });
    }
}
module.exports.TradeTargetAction = TradeTargetAction;

},{"94b3a8b907c2a901":"lRgYc","2b9434348d7355dc":"iznl5","d685cc0c689d4ce3":"@reldens/utils"}],"iiJ7a":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TradeMessageListener
 *
 */ const { TradeMessageHandler } = require("9a19973476c681d5");
const { Logger, sc } = require("165687940d76d60e");
class TradeMessageListener {
    async executeClientMessageActions(props) {
        let message = sc.get(props, 'message', false);
        if (!message) {
            Logger.error('Missing message data on TradeMessageListener.', props);
            return false;
        }
        let roomEvents = sc.get(props, 'roomEvents', false);
        if (!roomEvents) {
            Logger.error('Missing RoomEvents on TradeMessageListener.', props);
            return false;
        }
        let tradeMessageHandler = new TradeMessageHandler({
            roomEvents,
            message
        });
        tradeMessageHandler.updateContents();
    }
}
module.exports.TradeMessageListener = TradeMessageListener;

},{"9a19973476c681d5":"8a4tH","165687940d76d60e":"@reldens/utils"}],"8a4tH":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TradeMessageHandler
 *
 */ const { ErrorManager, Logger, sc } = require("e30448b763daad71");
const { InventoryConst } = require("279522b619f4737e");
const { ObjectsConst } = require("1ad3ff060efe34bd");
const { UserInterface } = require("df59fbf4a3c1f5fe");
class TradeMessageHandler {
    constructor(props){
        this.roomEvents = sc.get(props, 'roomEvents', false);
        this.message = sc.get(props, 'message', false);
        this.gameManager = this.roomEvents?.gameManager;
        this.gameDom = this.gameManager?.gameDom;
        this.uiScene = this.gameManager?.gameEngine?.uiScene;
        this.itemsManager = this.gameManager?.inventory?.manager;
        this.validate();
    }
    validate() {
        if (!this.roomEvents) ErrorManager.error('Missing RoomEvents.');
        if (!this.message) ErrorManager.error('Missing message.');
        if (!this.gameManager) ErrorManager.error('Missing GameManager.');
        if (!this.uiScene) ErrorManager.error('Missing UiScene.');
        if (!this.itemsManager) ErrorManager.error('Missing ItemsManager.');
    }
    updateContents() {
        if (InventoryConst.ACTIONS.TRADE_START === this.message.act) return this.showTradeRequest();
        if (InventoryConst.ACTIONS.TRADE_SHOW === this.message.act) return this.showTradeBox();
    }
    showTradeRequest() {
        // @TODO - BETA - Make all these values configurable.
        let tradeUiKey = 'trade' + this.message.id;
        this.createTradeUi(tradeUiKey);
        this.roomEvents.initUi({
            id: tradeUiKey,
            title: this.gameManager.config.getWithoutLogs('client/trade/titles/tradeRequestFromLabel', 'Trade request from:'),
            content: this.message.from,
            options: this.gameManager.config.get('client/ui/options/acceptOrDecline'),
            overrideSendOptions: {
                act: InventoryConst.ACTIONS.TRADE_ACCEPTED,
                id: this.message.id
            }
        });
        this.gameDom.getElement('#opt-2-' + tradeUiKey)?.addEventListener('click', ()=>{
            this.gameDom.getElement('#box-close-' + tradeUiKey)?.click();
        });
    }
    showTradeBox() {
        let tradeUiKey = 'trade' + this.message.id;
        this.createTradeUi(tradeUiKey);
        // this will create or reset the ui content:
        this.roomEvents.initUi({
            id: tradeUiKey,
            title: this.gameManager.services.translator.t('items.tradeWith', {
                playerName: this.message.with
            }),
            content: '',
            options: {}
        });
        let container = this.gameManager.gameDom.getElement('#box-' + tradeUiKey + ' .box-content');
        if (!container) {
            Logger.error('Missing container: "#box-' + tradeUiKey + ' .box-content".');
            return false;
        }
        if (true === this.message.isTradeEnd) {
            this.gameDom.getElement('#box-close-' + 'trade' + this.message.id)?.click();
            return true;
        }
        let items = sc.get(this.message, 'items', false);
        let traderItemsData = sc.get(this.message, 'traderItemsData', {});
        let exchangeData = sc.get(this.message, 'exchangeData', {});
        let traderExchangeKey = sc.get(this.message, 'playerToExchangeKey', {});
        // my exchange key is the opposite to the received exchange key:
        let myExchangeKey = 'A' === traderExchangeKey ? 'B' : 'A';
        this.updateItemsList(items, container, exchangeData[myExchangeKey]);
        this.updateMyExchangeData(exchangeData[myExchangeKey] || {}, items, myExchangeKey);
        this.updateTraderExchangeData(exchangeData[traderExchangeKey] || {}, traderItemsData, traderExchangeKey);
    }
    createTradeUi(tradeUiKey) {
        let tradeUi = sc.get(this.roomEvents.tradeUi, tradeUiKey);
        if (!tradeUi) {
            this.roomEvents.tradeUi[tradeUiKey] = new UserInterface(this.gameManager, {
                id: tradeUiKey,
                type: 'trade'
            }, '/assets/html/dialog-box.html', 'trade');
            this.roomEvents.tradeUi[tradeUiKey].createUiElement(this.uiScene, 'trade');
        }
        return tradeUi;
    }
    updateItemsList(items, container, exchangeData) {
        if (!items) return;
        let tradeItems = '';
        let tempItemsList = {};
        for (let i of Object.keys(items)){
            let messageItem = items[i];
            let itemsProps = Object.assign({
                manager: this.itemsManager
            }, messageItem, {
                uid: i
            });
            let itemClass = sc.get(this.itemsManager.itemClasses, itemsProps.key, this.itemsManager.types.classByTypeId(itemsProps.type));
            tempItemsList[i] = new itemClass(itemsProps);
            tempItemsList[i].quantityDisplay = 1;
            tempItemsList[i].quantityMaxDisplay = Math.max(tempItemsList[i].qty_limit, messageItem.qty);
            tempItemsList[i].tradeAction = 'trade';
            tradeItems += this.createTradeItemBox(tempItemsList[i], sc.get(exchangeData, tempItemsList[i].uid, false));
        }
        container.innerHTML = this.createTradeContainer(tradeItems);
        this.activateItemsBoxActions(tempItemsList);
        this.activateConfirmButtonAction();
    }
    activateConfirmButtonAction() {
        let confirmButton = this.gameManager.gameDom.getElement('.confirm-' + this.message.id);
        confirmButton?.addEventListener('click', ()=>{
            this.gameManager.activeRoomEvents.send({
                act: InventoryConst.ACTIONS.TRADE_ACTION,
                id: this.message.id,
                value: this.message.id,
                sub: ObjectsConst.TRADE_ACTIONS.CONFIRM
            });
        });
        let disconfirmButton = this.gameManager.gameDom.getElement('.disconfirm-' + this.message.id);
        disconfirmButton?.addEventListener('click', ()=>{
            this.gameManager.activeRoomEvents.send({
                act: InventoryConst.ACTIONS.TRADE_ACTION,
                id: this.message.id,
                value: this.message.id,
                sub: ObjectsConst.TRADE_ACTIONS.DISCONFIRM
            });
        });
        let cancelButton = this.gameManager.gameDom.getElement('.cancel-' + this.message.id);
        cancelButton?.addEventListener('click', ()=>{
            this.gameDom.getElement('#box-close-' + 'trade' + this.message.id)?.click();
        });
    }
    updateMyExchangeData(exchangeDataItems, items, exchangeKey) {
        if (0 === Object.keys(exchangeDataItems).length) return false;
        let content = this.createConfirmItemsBox(exchangeDataItems, items);
        let itemsContainer = this.gameDom.getElement('.trade-items-boxes .trade-player-col.trade-col-2');
        if (!itemsContainer) {
            Logger.error('Missing "' + exchangeKey + '" items container.');
            return false;
        }
        itemsContainer.innerHTML = content;
        this.assignRemoveActions(exchangeDataItems, items);
        return true;
    }
    updateTraderExchangeData(exchangeDataItems, traderItemsData, exchangeKey) {
        if (0 === Object.keys(exchangeDataItems).length) return false;
        let content = this.createReceivingItemsBox(exchangeDataItems, traderItemsData);
        let itemsContainer = this.gameDom.getElement('.trade-items-boxes .trade-player-col.trade-col-3');
        if (!itemsContainer) {
            Logger.error('Missing "' + exchangeKey + '" items container.');
            return false;
        }
        itemsContainer.innerHTML = content;
        return true;
    }
    createConfirmItemsBox(exchangeItems, items) {
        // @TODO - BETA - Since we are using one template "inventoryTradeItem", use only one "createConfirmItemsBox".
        let exchangeItemsUids = Object.keys(exchangeItems);
        if (0 === exchangeItemsUids.length) {
            Logger.info('Undefined exchange items on confirmation trade-message-handler.', {
                message: this.message
            });
            return '';
        }
        let content = '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeItem');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeItem".');
            return '';
        }
        for (let itemUid of exchangeItemsUids){
            let qty = exchangeItems[itemUid];
            let item = items[itemUid];
            content += this.gameManager.gameEngine.parseTemplate(messageTemplate, {
                key: item.key,
                label: item.label,
                description: item.description,
                id: itemUid,
                qty: item.qty,
                hiddenClass: '',
                tradeAction: this.createTradeActionRemove(item),
                tradeActionKey: this.message.id,
                tradeQuantityContent: qty
            });
        }
        return content;
    }
    createReceivingItemsBox(exchangeItems, traderItemsData) {
        let exchangeItemsUids = Object.keys(exchangeItems);
        if (0 === exchangeItemsUids.length) {
            Logger.info('Undefined exchange items on receive trade-message-handler.', {
                message: this.message
            });
            return '';
        }
        let content = '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeItem');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeItem".');
            return '';
        }
        for (let itemUid of exchangeItemsUids){
            let qty = exchangeItems[itemUid];
            let item = traderItemsData[itemUid];
            content += this.gameManager.gameEngine.parseTemplate(messageTemplate, {
                key: item.key,
                label: item.label,
                description: item.description,
                id: itemUid,
                qty: item.qty,
                hiddenClass: '',
                tradeAction: '',
                tradeActionKey: this.message.id,
                tradeQuantityContent: qty
            });
        }
        return content;
    }
    assignRemoveActions(exchangeItems, items) {
        let exchangeItemsUids = Object.keys(exchangeItems);
        if (0 === exchangeItemsUids.length) {
            Logger.info('Undefined exchange items on remove trade-message-handler.', {
                message: this.message
            });
            return false;
        }
        for (let itemUid of exchangeItemsUids){
            let itemContainerSelector = '.pushed-to-trade .trade-item-' + itemUid;
            let itemContainer = this.gameDom.getElement(itemContainerSelector);
            if (!itemContainer) {
                Logger.error('Assign trade item "' + itemUid + '" container not found.');
                continue;
            }
            let itemActionButton = this.gameDom.getElement('.pushed-to-trade .trade-item-' + itemUid + ' .trade-action-remove');
            if (!itemActionButton) {
                Logger.error('Assign trade item "' + itemUid + '" remove button not found.');
                continue;
            }
            let item = items[itemUid];
            itemActionButton.addEventListener('click', ()=>{
                itemContainer.classList.remove('hidden');
                let dataSend = {
                    act: InventoryConst.ACTIONS.TRADE_ACTION,
                    id: this.message.id,
                    value: 'remove',
                    itemId: itemUid,
                    itemKey: item.key
                };
                dataSend[ObjectsConst.TRADE_ACTIONS.SUB_ACTION] = ObjectsConst.TRADE_ACTIONS.REMOVE;
                this.gameManager.activeRoomEvents.send(dataSend);
            });
        }
        return true;
    }
    createTradeContainer(tradeItems) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradePlayerContainer');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeContainer".');
            return '';
        }
        let functionLabels = ObjectsConst.TRADE_ACTIONS_FUNCTION_NAME;
        let templateParams = {
            tradeActionKey: this.message.id,
            confirmLabel: this.gameManager.config.getWithoutLogs('client/trade/titles/confirmLabel', functionLabels.CONFIRM),
            disconfirmLabel: this.gameManager.config.getWithoutLogs('client/trade/titles/disconfirmLabel', functionLabels.DISCONFIRM),
            cancelLabel: this.gameManager.config.getWithoutLogs('client/trade/titles/cancelLabel', functionLabels.CANCEL),
            myItems: tradeItems,
            myItemsTitle: this.gameManager.config.getWithoutLogs('client/trade/titles/myItems', 'My Items:'),
            pushedToTradeTitle: this.gameManager.config.getWithoutLogs('client/trade/titles/pushedToTradeTitle', 'Sending:'),
            gotFromTradeTitle: this.gameManager.config.getWithoutLogs('client/trade/titles/gotFromTradeTitle', 'Receiving:'),
            playerConfirmedLabel: this.playerConfirmedLabel()
        };
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, templateParams);
    }
    playerConfirmedLabel() {
        if (!this.message.playerConfirmed) return '';
        return this.gameManager.config.getWithoutLogs('client/trade/titles/playerConfirmedLabel', '%playerName CONFIRMED').replace('%playerName', this.message.with);
    }
    createTradeItemBox(item, exchangeDataItem) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeItem');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeItem".');
            return '';
        }
        let qtyTemplate = this.uiScene.cache.html.get('inventoryTradeItemQuantity');
        if (!qtyTemplate) {
            Logger.error('Missing template "inventoryTradeItemQuantity".');
            return '';
        }
        let qty = exchangeDataItem || 0;
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            label: item.label,
            description: item.description,
            id: item.getInventoryId(),
            qty: item.qty,
            hiddenClass: 0 < qty && item.qty === qty ? ' hidden' : '',
            tradeAction: this.createTradeActionContent(item),
            tradeActionKey: 'to-be-' + item.tradeAction,
            tradeQuantityContent: this.gameManager.gameEngine.parseTemplate(qtyTemplate, {
                quantityDisplay: item.quantityDisplay || 1,
                quantityMaxDisplay: 0 < item.quantityMaxDisplay ? 'max="' + item.quantityMaxDisplay + '"' : ''
            })
        });
    }
    createTradeActionContent(item, tradeAction) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeAction');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeAction".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            id: item.getInventoryId(),
            tradeAction: tradeAction || sc.get(item, 'tradeAction', '')
        });
    }
    createTradeActionRemove(item) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let messageTemplate = this.uiScene.cache.html.get('inventoryTradeActionRemove');
        if (!messageTemplate) {
            Logger.error('Missing template "inventoryTradeActionRemove".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(messageTemplate, {
            key: item.key,
            id: item.uid,
            tradeAction: 'remove'
        });
    }
    activateItemsBoxActions(items) {
        for (let i of Object.keys(items)){
            let item = items[i];
            let itemContainerSelector = '.trade-item-to-be-' + item.tradeAction + '.trade-item-' + item.uid + ' .trade-action-' + item.tradeAction;
            let itemButtonSelector = itemContainerSelector + ' button';
            let itemActionButton = this.gameDom.getElement(itemButtonSelector);
            if (!itemActionButton) {
                Logger.error('Activate trade item "' + item.uid + '" action button not found.');
                continue;
            }
            itemActionButton.addEventListener('click', ()=>{
                let qtySelector = this.gameDom.getElement('.trade-item-' + item.getInventoryId() + ' .item-qty input');
                let qtySelected = qtySelector?.value || 1;
                let dataSend = {
                    act: InventoryConst.ACTIONS.TRADE_ACTION,
                    id: this.message.id,
                    value: item.tradeAction,
                    itemId: item.getInventoryId(),
                    itemKey: item.key,
                    qty: Number(qtySelected)
                };
                dataSend[ObjectsConst.TRADE_ACTIONS.SUB_ACTION] = ObjectsConst.TRADE_ACTIONS.ADD;
                this.gameManager.activeRoomEvents.send(dataSend);
            });
        }
    }
}
module.exports.TradeMessageHandler = TradeMessageHandler;

},{"e30448b763daad71":"@reldens/utils","279522b619f4737e":"lRgYc","1ad3ff060efe34bd":"k06SD","df59fbf4a3c1f5fe":"kO7Qp"}],"idDSW":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TemplatesHandler
 *
 */ class TemplatesHandler {
    static preloadTemplates(preloadScene) {
        // @TODO - BETA - Replace by loader replacing snake name file name by camel case for the template key.
        let inventoryTemplatePath = '/assets/features/inventory/templates/';
        // @TODO - BETA - Move the preload HTML as part of the engine driver.
        preloadScene.load.html('inventory', inventoryTemplatePath + 'ui-inventory.html');
        preloadScene.load.html('equipment', inventoryTemplatePath + 'ui-equipment.html');
        preloadScene.load.html('inventoryItem', inventoryTemplatePath + 'item.html');
        preloadScene.load.html('inventoryItemUse', inventoryTemplatePath + 'usable.html');
        preloadScene.load.html('inventoryItemEquip', inventoryTemplatePath + 'equip.html');
        preloadScene.load.html('inventoryGroup', inventoryTemplatePath + 'group.html');
        preloadScene.load.html('inventoryTradeContainer', inventoryTemplatePath + 'trade-container.html');
        preloadScene.load.html('inventoryTradePlayerContainer', inventoryTemplatePath + 'trade-player-container.html');
        preloadScene.load.html('inventoryTradeRequirements', inventoryTemplatePath + 'trade-requirements.html');
        preloadScene.load.html('inventoryTradeRewards', inventoryTemplatePath + 'trade-rewards.html');
        preloadScene.load.html('inventoryTradeAction', inventoryTemplatePath + 'trade-action.html');
        preloadScene.load.html('inventoryTradeActionRemove', inventoryTemplatePath + 'trade-action-remove.html');
        preloadScene.load.html('inventoryTradeItem', inventoryTemplatePath + 'trade-item.html');
        preloadScene.load.html('inventoryTradeItemQuantity', inventoryTemplatePath + 'trade-item-quantity.html');
        preloadScene.load.html('inventoryTradeStart', inventoryTemplatePath + 'trade-start.html');
        preloadScene.load.html('inventoryTradeAccept', inventoryTemplatePath + 'trade-accept.html');
    }
}
module.exports.TemplatesHandler = TemplatesHandler;

},{}],"3nFoi":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    items: {
        undefinedItem: 'Add item error, undefined item.',
        undefinedMethodInventoryId: 'Add item error, undefined getInventoryId.',
        undefinedItemKey: 'Add item error, undefined item key.',
        invalidItemInstance: 'Invalid item instance.',
        lockedForAddItem: 'Inventory locked, cannot add item: %itemUid',
        maxTotalReachedForAddItem: 'Cannot add item, max total reached.',
        itemExistsForAddItem: 'Cannot add item, item already exists: %itemUid',
        itemLimitExceededForAddItem: 'Cannot add item, item qty limit exceeded.',
        addItemsError: 'Cannot add item "%itemUid".',
        lockedForSetItem: 'Inventory locked, cannot set item: %itemUid.',
        lockedForRemoveItem: 'Inventory locked, cannot remove item: %itemUid.',
        keyNotFound: 'Cannot remove item, key not found: %itemUid.',
        lockedForModifyItemQty: 'Inventory locked, cannot modify item qty: %itemUid.',
        undefinedItemKeyForOperation: 'Cannot "%operation" item qty, undefined item key: %itemUid.',
        qtyNotANumber: 'Cannot "%operation" item qty, quantity is not a number: %qty.',
        itemQtyLimitExceeded: 'Cannot "%operation" item qty, item qty limit exceeded: %qty > %limitPerItem.',
        lockedForSetItems: 'Inventory locked, cannot set items.',
        tradeWith: 'Trading with %playerName',
        exchange: {
            missingConfirmation: 'Missing confirmation.',
            invalidPushedQuantity: 'Invalid item pushed quantity (%qty), available: %pushedItemQty.',
            invalidQuantity: 'Invalid item quantity 0.',
            invalidExchange: 'Inventories "FROM" and "TO" are the same, exchange cancelled.',
            decreaseQuantity: 'Exchange inventory decrease error.',
            itemAdd: 'Exchange add inventory result error.'
        },
        requirements: {
            itemNotPresent: 'Required item "%requiredItemKey" is not present.',
            quantityNotAvailable: 'Required item "%requiredItemKey" quantity %totalRequiredQuantity is not available.',
            itemNotPushed: 'Required item "%requiredItemKey" was not pushed for exchange.',
            itemQuantityNotPushed: 'Required item "%requiredItemKey" quantity %totalRequiredQuantity was not pushed for exchange.',
            itemDoesNotExists: 'Requirement error, item "%itemUid" does not exits on inventory.',
            itemAdd: 'Requirement add item error.'
        },
        reward: {
            doesNotExists: 'Reward error, item "%itemUid" does not exits.',
            missingItem: 'Reward error, item "%itemUid" does not exits.',
            itemNotPresent: 'Reward item "%rewardItemKey" is not present on inventory.',
            quantityNotAvailable: 'Reward item %rewardItemKey reward quantity (%rewardQuantity) is not available.',
            missingPushed: 'Missing pushed for exchange item "%itemUid".',
            getItemDoesNotExists: 'Reward error, item "%itemUid" does not exits on inventory.',
            processItem: 'Process item reward error, item "%itemUid".',
            processInventory: 'Rewards process inventory error.',
            addItems: 'Rewards error on add items: %itemsKeys.',
            quantityOverload: "Reward quantity (%rewardQuantityTotal) is bigger than the available in the inventory (%rewardInventoryItemQty)."
        },
        equipment: {
            modifiersApply: 'Cannot apply modifiers the item is not equipped: %itemUid',
            modifiersRevert: 'Cannot revert modifiers the item is not equipped: %itemUid'
        }
    }
};

},{}],"7FLuF":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ActionsPlugin
 *
 * Main functionalities:
 * The ActionsPlugin class is responsible for setting up and managing the actions plugin for the Reldens game engine.
 * It listens to various events and sets up the necessary components for the actions plugin to work, such as the player
 * selector, preloader handler, and UI manager. It also handles message processing and enriching the game manager with
 * the necessary skills and receivers.
 *
 * Methods:
 * - setup(props): sets up the plugin by initializing the necessary components and listening to events.
 * - setTranslations(): sets up translations for the plugin using the TranslationsMapper class.
 * - listenEvents(): listens to various events and sets up the necessary components for the plugin to work.
 *
 * Fields:
 * - gameManager: the game manager instance.
 * - events: the events manager instance.
 * - playerSelector: an instance of the PlayerSelector class.
 * - preloaderHandler: an instance of the PreloaderHandler class.
 * - uiManager: an instance of the SkillsUi class.
 *
 */ const { SkillsUi } = require("36d50050599013b8");
const { PluginInterface } = require("7c05585b97e53470");
const { PlayerSelector } = require("77b2515903041d20");
const { PreloaderHandler } = require("5394030c13db68d9");
const { MessagesHandler } = require("f5d67620a3caae3e");
const { GameManagerEnricher } = require("303da725ced69b17");
const Translations = require("8b6b513ca32c8a19");
const { TranslationsMapper } = require("e0c06d6627a6aa25");
const { ActionsConst } = require("d6df1efa87716f53");
const { Logger, sc } = require("a4340d9acbcb2d0");
class ActionsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in ActionsPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in ActionsPlugin.');
        this.playerSelector = new PlayerSelector(props);
        this.preloaderHandler = new PreloaderHandler(props);
        this.setTranslations();
        this.listenEvents();
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, ActionsConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        if (!this.events || !this.gameManager) return false;
        this.events.on('reldens.preloadUiScene', (uiScene)=>{
            this.preloaderHandler.loadContents(uiScene);
        });
        this.events.on('reldens.createPreload', (preloadScene)=>{
            this.preloaderHandler.createAnimations(preloadScene);
        });
        this.events.on('reldens.createUiScene', (preloadScene)=>{
            this.uiManager = new SkillsUi(preloadScene);
            this.uiManager.createUi();
        });
        this.events.on('reldens.beforeCreateEngine', (initialGameData)=>{
            this.playerSelector.populateClassesSelector(sc.get(initialGameData, 'classesData', {}), initialGameData.gameConfig.client.players, initialGameData.player);
        });
        this.events.on('reldens.activateRoom', (room)=>{
            room.onMessage('*', (message)=>{
                MessagesHandler.processOrQueueMessage(message, this.gameManager);
            });
        });
        this.events.on('reldens.playersOnAddReady', (props)=>{
            GameManagerEnricher.withReceiver(props.player, props.roomEvents, this.gameManager);
        });
    }
}
module.exports.ActionsPlugin = ActionsPlugin;

},{"36d50050599013b8":"cHI0A","7c05585b97e53470":"deNd3","77b2515903041d20":"671Og","5394030c13db68d9":"9kEbE","f5d67620a3caae3e":"9wHpp","303da725ced69b17":"4wDPZ","8b6b513ca32c8a19":"aFvjw","e0c06d6627a6aa25":"fKH2J","d6df1efa87716f53":"eRkMR","a4340d9acbcb2d0":"@reldens/utils"}],"cHI0A":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SkillsUi
 *
 */ const { ActionsConst } = require("a90f454084440f9d");
class SkillsUi {
    constructor(uiScene){
        this.uiScene = uiScene;
        this.gameManager = this.uiScene.gameManager;
        this.defaultAction = this.gameManager.config.get('client/ui/controls/defaultActionKey');
    }
    createUi() {
        let selector = ActionsConst.SELECTORS.UI_PLAYER_EXTRAS;
        this.appendToUiContainer(selector, 'skillsClassPath');
        this.appendToUiContainer(selector, 'skillsLevel');
        this.appendToUiContainer(selector, 'skillsExperience', {
            experienceLabel: this.gameManager.services.translator.t(ActionsConst.SNIPPETS.EXPERIENCE_LABEL)
        });
        this.createUiBox('skills', 7);
    }
    appendSkills(skills) {
        // @TODO - BETA - Implement skills groups.
        let skillsList = Object.keys(skills);
        // if the default action is a skill we won't show a duplicated box:
        if (0 === skillsList.length) return false;
        for (let i of skillsList){
            let skill = skills[i];
            if (skill === this.defaultAction) continue;
            this.createSkillBox(skill);
        }
    }
    appendToUiContainer(containerSelector, skillsUiTemplate, snippets = {}) {
        let messageTemplate = this.uiScene.cache.html.get(skillsUiTemplate);
        let snippetsKeys = Object.keys(snippets);
        if (0 < snippetsKeys.length) messageTemplate = this.gameManager.gameEngine.parseTemplate(messageTemplate, snippets);
        this.gameManager.gameDom.appendToElement(containerSelector, messageTemplate);
    }
    createUiBox(codeName, depth) {
        // @TODO - BETA - Replace by UserInterface.
        let { uiX, uiY } = this.uiScene.getUiConfig(codeName);
        let generatedUi = this.uiScene.add.dom(uiX, uiY).createFromCache(codeName);
        generatedUi.setDepth(depth);
        this.uiScene.elementsUi[codeName] = generatedUi;
    }
    createSkillBox(skill) {
        let skillBox = this.parseSkillTemplate(skill);
        this.gameManager.gameDom.appendToElement(ActionsConst.SELECTORS.SKILLS_CONTAINER, skillBox);
        this.uiScene.setupActionButtonInBox(skill, this.uiScene.getUiElement('skills'));
    }
    parseSkillTemplate(skill) {
        let skillTemplate = this.uiScene.cache.html.get('skillBox');
        return this.gameManager.gameEngine.parseTemplate(skillTemplate, {
            key: skill,
            // @TODO - BETA - Get all the required skill data on the client, from the label to the delay time counter.
            skillName: skill
        });
    }
}
module.exports.SkillsUi = SkillsUi;

},{"a90f454084440f9d":"eRkMR"}],"671Og":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PlayerSelector.
 *
 * Main functionalities:
 * The PlayerSelector class is responsible for populating the class path selector with the available classes and their
 * corresponding avatars. It also appends the selector to the player creation form and handles the avatar change when
 * the user selects a different class.
 *
 * Methods:
 * - populateClassesSelector: populates the class path selector with the available classes and their avatars.
 * - appendAvatarOnSelector: appends the avatar of the selected class to the selector and handles the avatar change
 * when the user selects a different class.
 *
 */ const { ActionsConst } = require("cc17d7a08bdc628f");
const { GameConst } = require("d589586cb2588d99");
const { Logger, sc } = require("3d92707723ab4002");
class PlayerSelector {
    constructor(props){
        /** @type {GameManager} **/ this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in ActionsPlugin PlayerSelector.');
        /** @type EventsManager **/ this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in ActionsPlugin PlayerSelector.');
        /** @type {GameDom} **/ this.gameDom = this.gameManager.gameDom;
    }
    populateClassesSelector(classesData, playersConfig, activePlayer) {
        if (!sc.isObject(classesData) || 0 === Object.keys(classesData).length) {
            Logger.error('Classes not defined, can not populate the classes selector.');
            this.gameDom.getElement('.player-selection-form-errors')?.append(this.gameManager.services?.translator.t('game.errors.missingClasses'));
            return false;
        }
        let multiConfig = sc.get(playersConfig, 'multiplePlayers', false);
        if ((!multiConfig || !multiConfig.enabled) && activePlayer) return false;
        let playerAdditional = this.gameDom.getElement(ActionsConst.SELECTORS.PLAYER_CREATION_ADDITIONAL_INFO);
        if (!playerAdditional) return false;
        // @TODO - BETA - Extract all the DOM objects creation, move into the gameDom.
        this.gameDom.getElement(ActionsConst.SELECTORS.PLAYER_CREATE_FORM)?.classList.remove('hidden');
        let div = this.gameDom.createElement('div');
        div.id = 'class-path-selector-box';
        div.classList.add('input-box');
        let label = this.gameDom.createElement('label');
        let classPathSelectId = 'class-path-select';
        label.htmlFor = classPathSelectId;
        label.innerText = this.gameManager.services.translator.t(ActionsConst.SNIPPETS.SELECT_CLASS_PATH);
        let select = this.gameDom.createElement('select');
        select.id = classPathSelectId;
        select.name = 'class_path_select';
        for (let id of Object.keys(classesData)){
            let option = new Option(classesData[id].label, id);
            option.dataset.key = classesData[id].key;
            select.append(option);
        }
        div.append(label);
        div.append(select);
        if (this.gameManager.config.getWithoutLogs('client/players/multiplePlayers/showAvatar', true)) {
            let avatarDiv = this.gameDom.createElement('div');
            avatarDiv.className = 'avatar-container';
            this.appendAvatarOnSelector(select, avatarDiv, playersConfig);
            div.append(avatarDiv);
        }
        playerAdditional.append(div);
    }
    appendAvatarOnSelector(select, container, playersConfig) {
        // @TODO - BETA - Refactor, extract all the styles and replace the avatar background by an element.
        let avatar = this.gameDom.createElement('div');
        let avatarKey = select.options[select.selectedIndex].dataset.key;
        avatar.classList.add('class-path-select-avatar');
        avatar.style.backgroundImage = `url('/assets/custom/sprites/${avatarKey}${GameConst.FILES.EXTENSIONS.PNG}')`;
        let widthInPx = playersConfig.size.width + 'px';
        avatar.style.backgroundPositionX = '-' + widthInPx;
        avatar.style.width = widthInPx;
        avatar.style.height = playersConfig.size.height + 'px';
        select.addEventListener('change', ()=>{
            let avatarKey = select.options[select.selectedIndex].dataset.key;
            avatar.style.backgroundImage = `url('/assets/custom/sprites/${avatarKey}${GameConst.FILES.EXTENSIONS.PNG}')`;
        });
        container.append(avatar);
    }
}
module.exports.PlayerSelector = PlayerSelector;

},{"cc17d7a08bdc628f":"eRkMR","d589586cb2588d99":"iznl5","3d92707723ab4002":"@reldens/utils"}],"9kEbE":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PreloaderHandler.
 *
 */ const { Logger, sc } = require("17d913472ef18f64");
const { GameConst } = require("3e50345fa8140484");
class PreloaderHandler {
    constructor(props){
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in ActionsPlugin PreloaderHandler.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in ActionsPlugin PreloaderHandler.');
        this.setProperties(props);
    }
    setProperties(props) {
        if (!this.gameManager) return false;
        this.gameDom = this.gameManager.gameDom;
        this.initialGameData = this.gameManager.initialGameData;
        this.levelsAnimConfig = this.gameManager.config.get('client/levels/animations');
        this.skillsAnimConfig = this.gameManager.config.get('client/skills/animations');
        this.assetsCustomActionsSpritesPath = sc.get(props, 'assetsCustomActionsSpritesPath', 'assets/custom/actions/sprites/');
        if (!this.gameManager.loadedAssets) this.gameManager.loadedAssets = {};
        if (!this.gameManager.createdAnimations) this.gameManager.createdAnimations = {};
    }
    loadContents(uiScene) {
        uiScene.load.html('skillsClassPath', '/assets/features/skills/templates/ui-class-path.html');
        uiScene.load.html('skillsLevel', '/assets/features/skills/templates/ui-level.html');
        uiScene.load.html('skillsExperience', '/assets/features/skills/templates/ui-experience.html');
        uiScene.load.html('skills', '/assets/features/skills/templates/ui-skills.html');
        uiScene.load.html('skillBox', '/assets/features/skills/templates/ui-skill-box.html');
        uiScene.load.html('actionBox', '/assets/html/ui-action-box.html');
        this.preloadClassPaths(uiScene);
        this.loopAnimationsAnd(this.levelsAnimConfig, 'preload', uiScene);
        this.loopAnimationsAnd(this.skillsAnimConfig, 'preload', uiScene);
    }
    preloadClassPaths(uiScene) {
        let classesData = sc.get(this.initialGameData, 'classesData', false);
        if (!classesData) return false;
        for (let i of Object.keys(classesData)){
            let avatarKey = classesData[i].key;
            let spriteSheetLoader = uiScene.load.spritesheet(avatarKey, '/assets/custom/sprites/' + avatarKey + GameConst.FILES.EXTENSIONS.PNG, uiScene.playerSpriteSize);
            spriteSheetLoader.on('filecomplete', async (completedKey)=>{
                this.gameManager.loadedAssets[completedKey] = completedKey;
            });
        }
    }
    createAnimations(preloadScene) {
        let levelsAnimations = this.levelsAnimConfig;
        this.loopAnimationsAnd(levelsAnimations, 'create', preloadScene);
        let skillsAnimations = this.skillsAnimConfig;
        this.loopAnimationsAnd(skillsAnimations, 'create', preloadScene);
        this.createAvatarsAnimations(preloadScene);
    }
    createAvatarsAnimations(preloadScene) {
        let classesData = sc.get(this.initialGameData, 'classesData', false);
        if (!classesData) {
            Logger.debug('Classes data not found. Fallback to player avatar.');
            return false;
        }
        if (!this.gameManager.mappedAvatars) this.gameManager.mappedAvatars = {};
        Logger.debug({
            availableClassesData: classesData
        });
        for (let i of Object.keys(classesData)){
            let avatarKey = classesData[i].key;
            if (!this.gameManager.loadedAssets[avatarKey]) {
                avatarKey = GameConst.IMAGE_PLAYER;
                Logger.info('Avatar for class path "' + avatarKey + '" not found in assets. Fallback to player avatar.');
            }
            this.gameManager.mappedAvatars[avatarKey] = avatarKey;
            preloadScene.createPlayerAnimations(avatarKey);
        }
        return this.gameManager.mappedAvatars;
    }
    loopAnimationsAnd(animations, command, uiScene) {
        if (!animations) {
            Logger.warning('Animations not found.', animations);
            return false;
        }
        for (let i of Object.keys(animations)){
            let data = animations[i];
            if (!data.animationData.enabled) {
                Logger.debug('Animation "' + i + '" not enabled, skipping.', data);
                continue;
            }
            Logger.debug({
                [command + 'Animation']: data
            });
            this[command + 'Animation'](data, uiScene);
        }
    }
    // @NOTE: dynamically named used method, see loopAnimationsAnd(animations, command, uiScene) method.
    preloadAnimation(data, uiScene) {
        // @TODO - BETA - Remove the hardcoded file extensions.
        // @NOTE: here we use have two keys, the animation key and the animationData.img, this is because we could have
        // a single sprite with multiple attacks, and use the start and end frame to run the required one.
        if (sc.hasOwn(data.animationData, [
            'type',
            'img'
        ]) && GameConst.ANIMATIONS_TYPE.SPRITESHEET === data.animationData.type) this.preloadAnimationsInDirections(data, uiScene);
        if (data.classKey && sc.isFunction(data.classKey['prepareAnimation'])) data.classKey['prepareAnimation']({
            data,
            uiScene,
            pack: this
        });
    }
    preloadAnimationsInDirections(data, uiScene) {
        // try load directions:
        // - 1: both (this is to include diagonals)
        // - 2: up/down
        // - 3: left/right
        let animDir = sc.get(data.animationData, 'dir', 0);
        if (0 === animDir) {
            uiScene.load.spritesheet(this.getAnimationKey(data), this.assetsCustomActionsSpritesPath + data.animationData.img + GameConst.FILES.EXTENSIONS.PNG, data.animationData);
            return;
        }
        // @TODO - BETA - Refactor and implement animDir = 1 (both): up_right, up_left, down_right, down_left.
        if (1 === animDir || 2 === animDir) {
            this.preloadSpriteInDirection(uiScene, data, GameConst.UP);
            this.preloadSpriteInDirection(uiScene, data, GameConst.DOWN);
        }
        if (1 === animDir || 3 === animDir) {
            this.preloadSpriteInDirection(uiScene, data, GameConst.LEFT);
            this.preloadSpriteInDirection(uiScene, data, GameConst.RIGHT);
        }
    }
    preloadSpriteInDirection(uiScene, data, direction) {
        uiScene.load.spritesheet(this.getAnimationKey(data, direction), this.assetsCustomActionsSpritesPath + data.animationData.img + '_' + direction + GameConst.FILES.EXTENSIONS.PNG, data.animationData);
    }
    createAnimation(data, uiScene) {
        if (sc.hasOwn(data.animationData, [
            'type',
            'img'
        ]) && data.animationData.type === GameConst.ANIMATIONS_TYPE.SPRITESHEET) {
            let animDir = sc.get(data.animationData, 'dir', 0);
            0 < animDir ? this.createWithMultipleDirections(uiScene, data, animDir) : this.createWithDirection(data, uiScene);
        }
        if (data.classKey && sc.isFunction(data.classKey['createAnimation'])) data.classKey['createAnimation']({
            data,
            uiScene,
            pack: this
        });
    }
    createWithMultipleDirections(uiScene, data, animDir) {
        // @TODO - BETA - Refactor and implement animDir = 1 (both): up_right, up_left, down_right,
        //   down_left.
        uiScene.directionalAnimations[this.getAnimationKey(data)] = data.animationData.dir;
        if (1 === animDir || 2 === animDir) {
            this.createWithDirection(data, uiScene, GameConst.UP);
            this.createWithDirection(data, uiScene, GameConst.DOWN);
        }
        if (1 === animDir || 3 === animDir) {
            this.createWithDirection(data, uiScene, GameConst.LEFT);
            this.createWithDirection(data, uiScene, GameConst.RIGHT);
        }
    }
    createWithDirection(data, uiScene, direction = '') {
        let animationCreateData = this.prepareAnimationData(data, uiScene, direction);
        if (this.gameManager.createdAnimations[animationCreateData.key]) return this.gameManager.createdAnimations[animationCreateData.key];
        let newAnimation = uiScene.anims.create(animationCreateData);
        if (sc.hasOwn(data.animationData, 'destroyTime')) newAnimation.destroyTime = data.animationData.destroyTime;
        if (sc.hasOwn(data.animationData, 'depthByPlayer')) newAnimation.depthByPlayer = data.animationData.depthByPlayer;
        this.gameManager.createdAnimations[animationCreateData.key] = newAnimation;
        return this.gameManager.createdAnimations[animationCreateData.key];
    }
    prepareAnimationData(data, uiScene, direction = '') {
        // @NOTE: here we use have two keys, the animation key and the animationData.img, this is because we could have
        // a single sprite with multiple attacks, and use the start and end frame to run the required one.
        let imageKey = this.getAnimationKey(data, direction);
        let animationCreateData = {
            key: imageKey,
            frames: uiScene.anims.generateFrameNumbers(imageKey, data.animationData),
            hideOnComplete: sc.get(data.animationData, 'hide', true)
        };
        if (sc.hasOwn(data.animationData, 'duration')) animationCreateData.duration = data.animationData.duration;
        else animationCreateData.frameRate = sc.get(data.animationData, 'frameRate', uiScene.configuredFrameRate);
        if (sc.hasOwn(data.animationData, 'repeat')) animationCreateData.repeat = data.animationData.repeat;
        return animationCreateData;
    }
    getAnimationKey(data, direction = '') {
        return (data.skillKey ? data.skillKey + '_' : '') + data.key + (direction && '' !== direction ? '_' + direction : '');
    }
}
module.exports.PreloaderHandler = PreloaderHandler;

},{"17d913472ef18f64":"@reldens/utils","3e50345fa8140484":"iznl5"}],"9wHpp":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesHandler
 *
 *
 * Main functionalities:
 * The MessagesHandler class is responsible for processing or queuing messages received by the gameManager.
 * It validates the message using the MessagesGuard class and checks if there is an active scene and player. If there
 * is an active scene and player, it processes the message using the skills.processMessage() method. Otherwise, it
 * queues the message in the skillsQueue field of the gameManager.
 *
 * Methods:
 * - processOrQueueMessage(message, gameManager): This method processes or queues the message received by the
 * gameManager. It validates the message using the MessagesGuard class and checks if there is an active scene and
 * player. If there is an active scene and player, it processes the message using the skills.processMessage() method.
 * Otherwise, it queues the message in the skillsQueue field of the gameManager.
 *
 */ const { MessagesGuard } = require("dffe4300e109c38f");
const { sc } = require("60595e113fc95e4a");
class MessagesHandler {
    static processOrQueueMessage(message, gameManager) {
        if (!MessagesGuard.validate(message)) return false;
        let currentScene = gameManager.getActiveScene();
        if (currentScene && currentScene.player) return gameManager.skills.processMessage(message);
        if (!sc.hasOwn(gameManager, 'skillsQueue')) gameManager.skillsQueue = [];
        gameManager.skillsQueue.push(message);
    }
}
module.exports.MessagesHandler = MessagesHandler;

},{"dffe4300e109c38f":"jrXEf","60595e113fc95e4a":"@reldens/utils"}],"jrXEf":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesGuard
 *
 * Main functionalities:
 * The MessagesGuard class is responsible for validating messages received by the server. It checks if the message
 * contains a valid action and if it belongs to certain categories of actions defined in the ActionsConst object.
 *
 * Methods:
 * - validate(message): a static method that receives a message object and returns a boolean indicating if the message
 * is valid or not. It checks if the message contains a valid action and if it belongs to certain categories of actions
 * defined in the ActionsConst object.
 *
 * Fields:
 * - None. However, the class uses the ActionsConst object to validate messages. This object contains constants related
 * to actions, messages, selectors, and snippets.
 *
 */ const { SkillConst } = require("16821f133ca8a161");
const { ActionsConst } = require("41296dc01aea30bf");
class MessagesGuard {
    static validate(message) {
        if (!message.act) return false;
        return 0 === message.act.indexOf(SkillConst.ACTIONS_PREF) || -1 !== message.act.indexOf(ActionsConst.ACTIONS.SUFFIX.ATTACK) || -1 !== message.act.indexOf(ActionsConst.ACTIONS.SUFFIX.EFFECT) || -1 !== message.act.indexOf(ActionsConst.ACTIONS.SUFFIX.HIT);
    }
}
module.exports.MessagesGuard = MessagesGuard;

},{"16821f133ca8a161":"@reldens/skills","41296dc01aea30bf":"eRkMR"}],"4wDPZ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameManagerEnricher
 *
 * Main functionalities:
 * The GameManagerEnricher class is responsible for enriching the GameManager class with a ReceiverWrapper instance,
 * which is used to process messages related to skills. It checks if the player is the owner of the room and if the
 * gameManager has a skills instance. If so, it processes the messages in the skillsQueue.
 *
 * Methods:
 * - withReceiver(player, roomEvents, gameManager): static method that receives a player, roomEvents, and gameManager
 * instances. It checks if the player is the owner of the room and if the gameManager has a skills instance. If so, it
 * processes the messages in the skillsQueue.
 *
 */ const { ReceiverWrapper } = require("ef6a621c01cb83eb");
const { Logger } = require("98a4859089d226b3");
class GameManagerEnricher {
    static withReceiver(player, roomEvents, gameManager) {
        if (!player || !roomEvents || !gameManager) {
            Logger.error('Invalid input parameters for GameManagerEnricher.withReceiver method.');
            return false;
        }
        if (player?.playerId !== roomEvents?.room.sessionId) return false;
        if (!gameManager.skills) gameManager.skills = new ReceiverWrapper({
            owner: player,
            roomEvents,
            events: gameManager.events
        });
        if (!gameManager.skillsQueue?.length) return false;
        for (let message of gameManager.skillsQueue)gameManager.skills.processMessage(message);
        gameManager.skillsQueue = [];
    }
}
module.exports.GameManagerEnricher = GameManagerEnricher;

},{"ef6a621c01cb83eb":"7M1vh","98a4859089d226b3":"@reldens/utils"}],"7M1vh":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ReceiverWrapper
 *
 */ const { Receiver } = require("85b5f6fb1bc36f5a");
const { Logger, sc } = require("4dcc11df2027f27a");
const { GameConst } = require("f827a112a3b038fa");
const { ActionsConst } = require("158b7279cb7b4e52");
class ReceiverWrapper extends Receiver {
    constructor(props){
        super(props);
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in ReceiverWrapper.');
        this.gameManager = sc.get(props.roomEvents, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in ReceiverWrapper.');
        this.room = sc.get(props.roomEvents, 'room', false);
        if (!this.room) Logger.error('Room undefined in ReceiverWrapper.');
        this.translator = this.gameManager?.services?.translator;
    }
    processMessage(message) {
        if (!this.gameManager) return false;
        let currentScene = this.gameManager.getActiveScene();
        if (!currentScene || !currentScene.player) return false;
        super.processMessage(message);
        this.playAttackOrEffectAnimation(message, currentScene);
        this.playHitAnimation(message, currentScene);
    }
    playHitAnimation(message, currentScene) {
        if (-1 === message.act.indexOf('_hit')) return;
        this.runHitAnimation(message.x, message.y, currentScene, message.act);
    }
    playAttackOrEffectAnimation(message, currentScene) {
        let isEffect = -1 !== message.act.indexOf('_eff');
        let isAttack = -1 !== message.act.indexOf('_atk');
        if (!isAttack && !isEffect) return;
        this.events.emitSync('reldens.playerAttack', message, this.room);
        let actKey = isEffect ? '_eff' : '_atk';
        let animKey = message.act.substring(0, message.act.indexOf(actKey));
        let { ownerSprite, targetSprite, targetType } = this.extractOwnerTargetAndType(currentScene, message);
        // @TODO - BETA - Refactor to use a single play animation method and make sure the animation is valid.
        let actAnimKey = sc.get(this.gameManager.config.client.skills.animations, animKey, 'default' + actKey);
        if (ownerSprite && currentScene.getAnimationByKey(actAnimKey)) {
            let ownerAnim = currentScene.physics.add.sprite(ownerSprite.x, ownerSprite.y, actAnimKey);
            ownerAnim.setDepth(200000);
            // @TODO - BETA - Refactor and implement animDir = 1 (both): up_right, up_left, down_right,
            //   down_left.
            let playDir = '';
            if (sc.hasOwn(this.gameManager.gameEngine.uiScene.directionalAnimations, actAnimKey)) {
                let animDir = this.gameManager.gameEngine.uiScene.directionalAnimations[actAnimKey];
                playDir = animDir === 3 ? ownerSprite.x < targetSprite.x ? '_right' : '_left' : ownerSprite.y < targetSprite.y ? '_down' : '_up';
            }
            ownerAnim.anims.play(actAnimKey + playDir, true).on('animationcomplete', ()=>{
                ownerAnim.destroy();
            });
        }
        if (targetSprite) this.runHitAnimation(targetSprite.x, targetSprite.y, currentScene, animKey + '_hit', message.target, targetType);
    }
    extractOwnerTargetAndType(currentScene, message) {
        if (!currentScene) {
            Logger.critical('Current scene not found.', currentScene, message);
            return false;
        }
        let ownerSprite = false;
        let targetSprite = false;
        let targetType = ActionsConst.DATA_TYPE_VALUE_PLAYER;
        let playersList = currentScene.player.players;
        let objectsList = currentScene.objectsAnimations;
        let isPvP = sc.hasOwn(playersList, message.owner) && sc.hasOwn(playersList, message.target);
        if (isPvP) {
            ownerSprite = playersList[message.owner];
            targetSprite = playersList[message.target];
            return {
                ownerSprite,
                targetSprite,
                targetType
            };
        }
        if (sc.hasOwn(objectsList, message.owner)) {
            ownerSprite = objectsList[message.owner].sceneSprite;
            targetSprite = playersList[message.target];
        }
        if (sc.hasOwn(objectsList, message.target)) {
            targetSprite = objectsList[message.target].sceneSprite;
            ownerSprite = playersList[message.owner];
            targetType = ActionsConst.DATA_TYPE_VALUE_OBJECT;
        }
        return {
            ownerSprite,
            targetSprite,
            targetType
        };
    }
    runHitAnimation(x, y, currentScene, hitKey, targetKey, targetType) {
        // @TODO - BETA - Refactor.
        let allAnimations = this.gameManager.config.client.skills.animations;
        let hitAnimKey = sc.hasOwn(allAnimations, hitKey) ? hitKey : ActionsConst.DEFAULT_HIT_ANIMATION_KEY;
        if (!currentScene.getAnimationByKey(hitAnimKey) || !sc.hasOwn(allAnimations, hitAnimKey)) return false;
        let targetSprite = false;
        let targetSpriteId = false;
        if (targetType === ActionsConst.DATA_TYPE_VALUE_PLAYER) {
            targetSprite = this.gameManager.getCurrentPlayer().players[targetKey];
            targetSpriteId = targetSprite.playerId;
        }
        if (targetType === ActionsConst.DATA_TYPE_VALUE_OBJECT) {
            targetSprite = currentScene.objectsAnimations[targetKey];
            targetSpriteId = targetKey;
        }
        let hitSprite = currentScene.physics.add.sprite(x, y, hitAnimKey);
        hitSprite = this.setTargetSpriteDepth(targetSprite, hitAnimKey, targetSpriteId, hitSprite, allAnimations);
        hitSprite.anims.play(hitAnimKey, true).on('animationcomplete', ()=>{
            hitSprite.destroy();
            if (targetSprite && sc.hasOwn(targetSprite, 'moveSprites')) delete targetSprite.moveSprites[hitAnimKey + '_' + targetSpriteId];
        });
    }
    setTargetSpriteDepth(targetSprite, hitAnimKey, targetSpriteId, hitSprite, allAnimations) {
        if (!targetSprite) {
            hitSprite.setDepth(300000);
            return hitSprite;
        }
        if (sc.hasOwn(targetSprite, 'targetSprite')) targetSprite.moveSprites[hitAnimKey + '_' + targetSpriteId] = hitSprite;
        let animData = allAnimations[hitAnimKey];
        let depth = targetSprite.depth + ('above' === sc.get(animData.animationData, 'depthByPlayer', '') ? 100 : -0.1);
        hitSprite.depthByPlayer = animData.animationData.depthByPlayer;
        hitSprite.setDepth(depth);
        return hitSprite;
    }
    updateLevelAndExperience(message) {
        this.gameManager.gameDom.updateContent(ActionsConst.SELECTORS.LEVEL_LABEL, this.translator.t(ActionsConst.SNIPPETS.LEVEL, {
            currentLevel: message.data[ActionsConst.MESSAGE.DATA.LEVEL]
        }));
        this.onLevelExperienceAdded(message);
        let classPathLabel = message.data[ActionsConst.MESSAGE.DATA.CLASS_PATH_LABEL];
        if (classPathLabel) this.gameManager.gameDom.updateContent(ActionsConst.SELECTORS.CLASS_PATH_LABEL, this.translator.t(ActionsConst.SNIPPETS.CLASS_PATH_LABEL, {
            classPathLabel
        }));
        let nextLevelExperience = message.data[ActionsConst.MESSAGE.DATA.NEXT_LEVEL_EXPERIENCE];
        if (nextLevelExperience) this.gameManager.gameDom.updateContent(ActionsConst.SELECTORS.NEXT_LEVEL_EXPERIENCE, this.translator.t(ActionsConst.SNIPPETS.NEXT_LEVEL_EXPERIENCE, {
            nextLevelExperience
        }));
    }
    onInitClassPathEnd(message) {
        // @NOTE: careful with messages received and double ui elements generation.
        if (this.gameManager.skills && this.gameManager.skills.uiCreated) return false;
        this.gameManager.skills.uiCreated = true;
        this.updateLevelAndExperience(message);
        this.gameManager.skills.skills = message.data[ActionsConst.MESSAGE.DATA.SKILL_LEVEL];
        this.gameManager.getFeature('actions').uiManager.appendSkills(message.data.skl);
    }
    onLevelUp(message) {
        this.updateLevelAndExperience(message);
        if (sc.hasOwn(message.data, 'skl')) {
            Object.assign(this.gameManager.skills.skills, message.data.skl);
            this.gameManager.getFeature('actions').uiManager.appendSkills(message.data.skl);
        }
        let levelUpAnimKey = this.getLevelUpAnimationKey(message.data.skl);
        if (levelUpAnimKey) this.playSkillPlayerAnimation(this.gameManager.getCurrentPlayer().playerId, levelUpAnimKey);
    }
    getLevelUpAnimationKey(level) {
        let animationsListObj = this.gameManager.config.client.levels.animations;
        let exactKey = 'level_' + this.gameManager.playerData.avatarKey + '_' + level;
        if (sc.hasOwn(animationsListObj, exactKey)) return exactKey;
        let avatarKey = 'level_' + this.gameManager.playerData.avatarKey;
        if (sc.hasOwn(animationsListObj, avatarKey)) return avatarKey;
        let levelKey = 'level_' + level;
        if (sc.hasOwn(animationsListObj, levelKey)) return levelKey;
        if (sc.hasOwn(animationsListObj, 'level_default')) return 'level_default';
        return false;
    }
    onLevelExperienceAdded(message) {
        this.gameManager.gameDom.updateContent(ActionsConst.SELECTORS.CURRENT_EXPERIENCE, this.translator.t(ActionsConst.SNIPPETS.EXPERIENCE, {
            experience: message.data[ActionsConst.MESSAGE.DATA.EXPERIENCE]
        }));
    }
    onSkillBeforeCast(message) {
        this.playSkillPlayerAnimation(message.data.extraData[ActionsConst.DATA_OWNER_KEY], this.determineCastKey(message));
    }
    determineCastKey(message) {
        let castKey = message.data.skillKey + '_cast';
        if (sc.hasOwn(this.gameManager.config.client.skills.animations, castKey)) return castKey;
        return 'default_cast';
    }
    playSkillPlayerAnimation(ownerId, animationKey) {
        let currentScene = this.gameManager.getActiveScene();
        let sceneAnimation = currentScene.getAnimationByKey(animationKey);
        if (!sceneAnimation) {
            if (-1 === animationKey.indexOf('default')) Logger.error('Animation sprite not found for "' + animationKey + '".', this.gameManager.config.client.skills.animations);
            return false;
        }
        let ownerSprite = this.gameManager.getCurrentPlayer().players[ownerId];
        let spriteX = ownerSprite.x;
        let spriteY = ownerSprite.y;
        let animationSprite = currentScene.physics.add.sprite(spriteX, spriteY, animationKey);
        // the default value will be the caster depth - 1 so the animation will be played below the player.
        let depth = sc.hasOwn(sceneAnimation, 'depthByPlayer') && 'above' === sceneAnimation['depthByPlayer'] ? ownerSprite.depth + 1 : ownerSprite.depth - 0.1;
        animationSprite.depthByPlayer = sceneAnimation.depthByPlayer;
        animationSprite.setDepth(depth);
        let blockMovement = sc.get(sceneAnimation, 'blockMovement', false);
        if (!blockMovement) ownerSprite.moveSprites[animationKey + '_' + ownerSprite.playerId] = animationSprite;
        animationSprite.anims.play(animationKey, true);
        let destroyTime = sc.get(sceneAnimation, 'destroyTime', false);
        if (destroyTime) setTimeout(()=>{
            animationSprite.destroy();
            delete ownerSprite.moveSprites[animationKey + '_' + ownerSprite.playerId];
        }, destroyTime);
    }
    onSkillAfterCast(message) {
        let currentPlayer = this.gameManager.getCurrentPlayer();
        if (!sc.hasOwn(message.data.extraData, ActionsConst.DATA_OWNER_TYPE) || !sc.hasOwn(message.data.extraData, ActionsConst.DATA_OWNER_KEY) || message.data.extraData[ActionsConst.DATA_OWNER_TYPE] !== ActionsConst.DATA_TYPE_VALUE_PLAYER || !sc.hasOwn(currentPlayer.players, message.data.extraData[ActionsConst.DATA_OWNER_KEY])) return false;
        let currentScene = this.gameManager.getActiveScene();
        let ownerSprite = this.gameManager.getCurrentPlayer().players[message.data.extraData[ActionsConst.DATA_OWNER_KEY]];
        let playDirection = this.getPlayDirection(message.data.extraData, ownerSprite, currentPlayer, currentScene);
        if (playDirection) {
            ownerSprite.anims.play(ownerSprite.avatarKey + '_' + playDirection, true);
            ownerSprite.anims.stop();
        }
    }
    onSkillAttackApplyDamage(message) {
        let damageConfig = this.gameManager.config.get('client/actions/damage');
        if (!damageConfig.enabled) return false;
        let currentPlayer = this.gameManager.getCurrentPlayer();
        if (!damageConfig.showAll && message.data.extraData[ActionsConst.DATA_OWNER_KEY] !== currentPlayer.playerId) return false;
        let currentScene = this.gameManager.getActiveScene();
        let target = currentScene.getObjectFromExtraData(ActionsConst.DATA_OBJECT_KEY_TARGET, message.data.extraData, currentPlayer);
        if (!target) return false;
        currentScene.createFloatingText(target.x, target.y, message.data.d, damageConfig.color, damageConfig.font, damageConfig.fontSize, damageConfig.duration, damageConfig.top, damageConfig.stroke, damageConfig.strokeThickness, damageConfig.shadowColor);
    }
    getPlayDirection(extraData, ownerSprite, currentPlayer, currentScene) {
        let playDirection = false;
        let target = currentScene.getObjectFromExtraData(ActionsConst.DATA_OBJECT_KEY_TARGET, extraData, currentPlayer);
        if (!target) return false;
        let playX = target.x - ownerSprite.x;
        let playY = target.y - ownerSprite.y;
        playDirection = playX >= 0 ? GameConst.RIGHT : GameConst.LEFT;
        if (Math.abs(playX) < Math.abs(playY)) playDirection = playY >= 0 ? GameConst.DOWN : GameConst.UP;
        return playDirection;
    }
}
module.exports.ReceiverWrapper = ReceiverWrapper;

},{"85b5f6fb1bc36f5a":"@reldens/skills","4dcc11df2027f27a":"@reldens/utils","f827a112a3b038fa":"iznl5","158b7279cb7b4e52":"eRkMR"}],"aFvjw":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    actions: {
        selectClassPath: 'Select Your Class-Path',
        currentLevel: 'Level %currentLevel',
        experience: '%experience',
        experienceLabel: 'XP',
        classPathLabel: '%classPathLabel',
        nextLevelExperience: '%nextLevelExperience'
    }
};

},{}],"2Cvu0":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Users Client Plugin.
 *
 */ const { LifebarUi } = require("4884f11b075b66ea");
const { PlayerStatsUi } = require("3f79c9046c35f178");
const { ActionsConst } = require("674e49489e51556c");
const { GameConst } = require("a2e74f825a350c56");
const Translations = require("13407cdee0cc1fb5");
const { TranslationsMapper } = require("8132da4e97588b49");
const { UsersConst } = require("b40b9d44591fbc8d");
const { PluginInterface } = require("9762c449204f05e7");
const { Logger, sc } = require("b18ec97bd329135d");
class UsersPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        this.events = sc.get(props, 'events', false);
        this.initialGameData = {};
        if (this.validateProperties()) {
            this.setTranslations();
            this.listenEvents();
            this.setupPlayerStatsUi();
        }
    }
    validateProperties() {
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in UsersPlugin.');
            return false;
        }
        if (!this.events) {
            Logger.error('EventsManager undefined in UsersPlugin.');
            return false;
        }
        return true;
    }
    setupPlayerStatsUi() {
        this.playerStatsUi = new PlayerStatsUi({
            events: this.events
        });
        this.playerStatsUi.createPlayerStatsUi();
    }
    listenEvents() {
        this.events.on('reldens.beforeCreateEngine', (initialGameData, gameManager)=>{
            this.initialGameData = initialGameData;
            this.onBeforeCreateEngine(initialGameData, gameManager);
            if (!this.lifeBarUi) {
                this.lifeBarUi = new LifebarUi({
                    events: this.events
                });
                this.lifeBarUi.createLifeBarUi(gameManager);
            }
        });
    }
    setTranslations() {
        if (!this.events || !this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, UsersConst.MESSAGE.DATA_VALUES);
    }
    onBeforeCreateEngine(initialGameData, gameManager) {
        let isMultiplayerEnabled = gameManager.config.get('client/players/multiplePlayers/enabled', false);
        let isRoomSelectionDisabled = gameManager.config.get('client/rooms/selection/allowOnLogin', false);
        // @TODO - BETA - If the player selection container doesn't exist we should create one.
        let playersCount = sc.isTrue(initialGameData, 'players') ? Object.keys(initialGameData.players).length : 0;
        // if multiplayer is disabled and the user already has a player then just allow the engine to be executed:
        if (0 < playersCount && !isMultiplayerEnabled && !isRoomSelectionDisabled) {
            // before return set the only player available:
            initialGameData.player = initialGameData.players[0];
            return;
        }
        // for every other case we will stop the normal execution of the engine and show the selection/creation block:
        gameManager.canInitEngine = false;
        let playerSelection = gameManager.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECTION);
        playerSelection.classList.remove('hidden');
        // if multiplayer is enabled, the user already has a player it can only select the room:
        if (!isMultiplayerEnabled && 1 === playersCount) {
            this.prepareSinglePlayerInput(playerSelection, initialGameData, gameManager);
            return;
        }
        // if multiplayer is enabled and the user already has a player then set up the selector form:
        if (isMultiplayerEnabled && 0 < playersCount) this.preparePlayerSelector(playerSelection, initialGameData, gameManager);
        this.preparePlayerCreator(playerSelection, initialGameData, gameManager);
    }
    prepareSinglePlayerInput(playerSelection, initialGameData, gameManager) {
        // @TODO - BETA - Extract all this.
        let form = gameManager.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECTION_FORM);
        let player = initialGameData.player;
        if (!form || !player) {
            Logger.error('Form or player not defined in prepareSinglePlayerInput.');
            return false;
        }
        gameManager.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECT_ELEMENT)?.remove();
        let playerLabel = this.gameManager.services.translator.t(UsersConst.SNIPPETS.OPTION_LABEL, {
            playerName: player.name,
            currentLevel: player.currentLevel,
            classPathLabel: player.currentClassPathLabel
        });
        let selectedPlayerHiddenInput = gameManager.gameDom.createElement('input');
        selectedPlayerHiddenInput.type = 'hidden';
        selectedPlayerHiddenInput.id = GameConst.SELECTORS.PLAYER_SELECT_ELEMENT;
        selectedPlayerHiddenInput.value = player.id;
        let playerLabelElement = gameManager.gameDom.createElement('div');
        playerLabelElement.innerText = playerLabel;
        form.append(selectedPlayerHiddenInput);
        let playerSelectBox = gameManager.gameDom.getElement('.player-select-box');
        playerSelectBox?.append(playerLabelElement);
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            playerSelection.classList.add('hidden');
            this.submitSelectedPlayer(gameManager, form, selectedPlayerHiddenInput, player);
            return false;
        });
        this.showAvatarContainer(gameManager, initialGameData, selectedPlayerHiddenInput);
        form.classList.remove('hidden');
    }
    submitSelectedPlayer(gameManager, form, selectElement, player) {
        // @TODO - BETA - Extract all this.
        gameManager.events.emitSync('reldens.onPrepareSinglePlayerSelectorFormSubmit', {
            usersPlugin: this,
            form,
            selectElement,
            player,
            gameManager
        });
        gameManager.initEngine().catch((error)=>{
            Logger.error(error);
        // @TODO - BETA - Add error handling here.
        });
    }
    showAvatarContainer(gameManager, initialGameData, selectElement) {
        // @TODO - BETA - Extract all this.
        let additionalInfoContainer = gameManager.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECTION_ADDITIONAL_INFO);
        if (!additionalInfoContainer) return;
        if (!this.gameManager.config.getWithoutLogs('client/players/multiplePlayers/showAvatar', true)) return;
        let avatarContainer = gameManager.gameDom.createElement('div');
        avatarContainer.className = 'avatar-container';
        // @TODO - BETA - Refactor, extract all the styles and replace the avatar background by an element.
        let avatar = gameManager.gameDom.createElement('div');
        let avatarKey = initialGameData.player.avatarKey;
        avatar.classList.add('class-path-select-avatar');
        avatar.style.backgroundImage = `url('/assets/custom/sprites/${avatarKey}${GameConst.FILES.EXTENSIONS.PNG}')`;
        let widthInPx = this.gameManager.config.getWithoutLogs('client/players/size/width', '0') + 'px';
        avatar.style.backgroundPositionX = '-' + widthInPx;
        avatar.style.width = widthInPx;
        avatar.style.height = this.gameManager.config.getWithoutLogs('client/players/size/height', '0') + 'px';
        avatarContainer.append(avatar);
        additionalInfoContainer.append(avatarContainer);
    }
    preparePlayerSelector(playerSelection, initialGameData, gameManager) {
        let form = gameManager.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECTION_FORM);
        let select = gameManager.gameDom.getElement(GameConst.SELECTORS.PLAYER_SELECT_ELEMENT);
        if (!form || !select) return false;
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            let selectedOption = select.options[select.selectedIndex].value;
            let selectedPlayer = this.getPlayerById(initialGameData.players, Number(selectedOption));
            if (selectedPlayer) {
                let loadingContainer = form.querySelector(GameConst.SELECTORS.LOADING_CONTAINER);
                if (loadingContainer) loadingContainer?.classList.remove(GameConst.CLASSES.HIDDEN);
                gameManager.initialGameData.player = selectedPlayer;
                gameManager.events.emitSync('reldens.onPreparePlayerSelectorFormSubmit', {
                    usersPlugin: this,
                    form,
                    select,
                    selectedPlayer,
                    gameManager
                });
                gameManager.initEngine().catch((error)=>{
                    Logger.error(error);
                });
            }
            return false;
        });
        for (let i of Object.keys(initialGameData.players)){
            let player = initialGameData.players[i];
            let option = new Option(this.gameManager.services.translator.t(UsersConst.SNIPPETS.OPTION_LABEL, {
                playerName: player.name,
                currentLevel: player.currentLevel,
                classPathLabel: player.currentClassPathLabel
            }), player.id);
            option.dataset.key = player.avatarKey;
            select.append(option);
        }
        this.showAvatarContainer(gameManager, initialGameData, select);
        form.classList.remove('hidden');
    }
    preparePlayerCreator(playerSelection, initialGameData, gameManager) {
        let form = gameManager.gameDom.getElement(ActionsConst.SELECTORS.PLAYER_CREATE_FORM);
        if (!form) return;
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            let errorElement = gameManager.gameDom.getElement('#player-create-form .response-error');
            errorElement.innerHTML = '';
            let formData = new FormData(form);
            let serializedForm = sc.serializeFormData(formData);
            // @TODO - BETA - Make player name length configurable.
            if (3 > serializedForm['new-player-name'].toString().length) return false;
            gameManager.submitedForm = true;
            gameManager.events.emitSync('reldens.onPreparePlayerCreationFormSubmit', {
                usersPlugin: this,
                form,
                gameManager
            });
            try {
                gameManager.gameRoom.send('*', {
                    act: GameConst.CREATE_PLAYER,
                    formData: serializedForm
                });
            } catch (error) {
                Logger.critical('Create player error.', error);
                gameManager.gameDom.alertReload(gameManager.services.translator.t('game.errors.connectionLost'));
            }
            return false;
        });
    }
    getPlayerById(players, playerId) {
        if (0 === players.length) return false;
        for (let player of players){
            if (player.id === playerId) return player;
        }
        return false;
    }
}
module.exports.UsersPlugin = UsersPlugin;

},{"4884f11b075b66ea":"i4wL2","3f79c9046c35f178":"8HKcy","674e49489e51556c":"eRkMR","a2e74f825a350c56":"iznl5","13407cdee0cc1fb5":"1nPb0","8132da4e97588b49":"fKH2J","b40b9d44591fbc8d":"c4pWv","9762c449204f05e7":"deNd3","b18ec97bd329135d":"@reldens/utils"}],"i4wL2":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - LifebarUi
 *
 */ const { UsersConst } = require("f7fb9e778df1ad65");
const { ActionsConst } = require("879f80e873cb79af");
const { GameConst } = require("cd291612d478124");
const { ObjectsConst } = require("400f53691795e348");
const { ObjectsHandler } = require("b09b37f3a649897");
const { sc } = require("852ef9687b71167f");
class LifebarUi {
    constructor(props){
        this.events = props.events;
    }
    createLifeBarUi(gameManager) {
        // @TODO - BETA - General refactor, extract methods into different services.
        this.barConfig = gameManager.config.get('client/ui/lifeBar');
        if (!this.barConfig.enabled) return false;
        this.gameManager = gameManager;
        this.fixedPositionX = false;
        this.fixedPositionY = false;
        this.barProperty = this.gameManager.config.get('client/actions/skills/affectedProperty');
        this.playerSize = this.gameManager.config.get('client/players/size');
        this.lifeBars = {};
        this.lifeDataByKey = {};
        this.listenEvents();
        return this;
    }
    listenEvents() {
        this.events.on('reldens.playerStatsUpdateAfter', (message, roomEvents)=>{
            this.updatePlayerLifeBar(message, roomEvents);
        });
        this.events.on('reldens.joinedRoom', (room)=>{
            this.listenMessages(room);
        });
        this.events.on('reldens.runPlayerAnimation', (playerEngine, playerId)=>{
            this.drawPlayerLifeBar(playerId);
        });
        this.events.on('reldens.updateGameSizeBefore', (gameEngine, newWidth, newHeight)=>{
            this.drawOnGameResize(newWidth, newHeight);
        });
        this.events.on('reldens.playersOnRemove', (player, key)=>{
            this.removePlayerLifeBar(key);
        });
        this.events.on('reldens.playerEngineAddPlayer', ()=>{
            this.processLifeBarQueue();
        });
        this.events.on('reldens.createAnimationAfter', ()=>{
            ObjectsHandler.drawObjectsLifeBar(this);
        });
        this.events.on('reldens.objectBodyChanged', (event)=>{
            ObjectsHandler.generateObjectLifeBar(event.key, this);
        });
        this.events.on('reldens.gameEngineShowTarget', (gameEngine, target, previousTarget)=>{
            this.showTargetLifeBar(target, previousTarget);
        });
        this.events.on('reldens.gameEngineClearTarget', (gameEngine, previousTarget)=>{
            this.clearPreviousBar(previousTarget);
        });
    }
    drawOnGameResize(newWidth, newHeight) {
        if (!this.barConfig.fixedPosition) return false;
        this.setPlayerLifeBarFixedPosition(newWidth, newHeight);
        this.drawPlayerLifeBar(this.gameManager.getCurrentPlayer().playerId);
    }
    clearPreviousBar(previousTarget) {
        if (previousTarget && sc.hasOwn(this.lifeBars, previousTarget.id) && this.gameManager.getCurrentPlayer().playerId !== previousTarget.id) this.lifeBars[previousTarget.id].destroy();
    }
    showTargetLifeBar(target, previousTarget) {
        if (!this.barConfig.showOnClick) return false;
        this.clearPreviousBar(previousTarget);
        if (target.type === ObjectsConst.TYPE_OBJECT) ObjectsHandler.generateObjectLifeBar(target.id, this);
        if (target.type === GameConst.TYPE_PLAYER) this.drawPlayerLifeBar(target.id);
    }
    barPropertyValue() {
        return this.barProperty + 'Value';
    }
    barPropertyTotal() {
        return this.barProperty + 'Total';
    }
    setPlayerLifeBarFixedPosition(newWidth, newHeight) {
        if (!newWidth || !newHeight) {
            let position = this.gameManager.gameEngine.getCurrentScreenSize(this.gameManager);
            newWidth = position.newWidth;
            newHeight = position.newHeight;
        }
        let { uiX, uiY } = this.gameManager.gameEngine.uiScene.getUiConfig('lifeBar', newWidth, newHeight);
        this.fixedPositionX = uiX;
        this.fixedPositionY = uiY;
    }
    updatePlayerLifeBar(message, roomEvents) {
        let currentPlayer = roomEvents.gameManager.getCurrentPlayer();
        this.updatePlayerBarData(currentPlayer.playerId, message.statsBase[this.barProperty], message.stats[this.barProperty]);
        this.drawPlayerLifeBar(currentPlayer.playerId);
    }
    listenMessages(room) {
        room.onMessage('*', (message)=>{
            this.listenBattleEnd(message);
            this.listenLifeBarUpdates(message);
        });
    }
    listenBattleEnd(message) {
        if (message.act !== ActionsConst.BATTLE_ENDED) return false;
        if (!sc.hasOwn(this.lifeBars, message.t)) return false;
        this.lifeBars[message.t].destroy();
    }
    listenLifeBarUpdates(message) {
        if (message.act !== UsersConst.ACTION_LIFEBAR_UPDATE) return false;
        ObjectsHandler.processObjectLifeBarMessage(message, true, this);
        this.processPlayerLifeBarMessage(message, true);
    }
    canShowPlayerLifeBar(playerId) {
        let currentPlayer = this.gameManager.getCurrentPlayer();
        if (!sc.isFunction(currentPlayer?.isDeath)) // expected, when changing scenes the next scene could not be active yet
        return false;
        let isCurrentPlayer = playerId === currentPlayer?.playerId;
        if (isCurrentPlayer && currentPlayer && (currentPlayer.isDeath() || currentPlayer.isDisabled())) {
            this.lifeBars[playerId]?.setVisible(false);
            return false;
        }
        if (isCurrentPlayer) return true;
        if (this.barConfig.showAllPlayers) // @TODO - BETA - Include validation for other players inState.
        return true;
        return this.barConfig.showOnClick && playerId === this.getCurrentTargetId();
    }
    queueLifeBarMessage(message) {
        if (!sc.hasOwn(this.gameManager, 'lifeBarQueue')) this.gameManager.lifeBarQueue = [];
        this.gameManager.lifeBarQueue.push(message);
    }
    processPlayerLifeBarMessage(message, queue = false) {
        if (ActionsConst.DATA_TYPE_VALUE_PLAYER !== message[ActionsConst.DATA_OWNER_TYPE]) return false;
        let currentPlayer = this.gameManager.getCurrentPlayer();
        let messageOwnerKey = message[ActionsConst.DATA_OWNER_KEY];
        if (!currentPlayer || !currentPlayer.players || !currentPlayer.players[messageOwnerKey]) {
            if (queue) this.queueLifeBarMessage(message);
            return false;
        }
        this.updatePlayerBarData(messageOwnerKey, message.totalValue, message.newValue);
        if (this.canShowPlayerLifeBar(messageOwnerKey)) this.drawPlayerLifeBar(messageOwnerKey);
        return true;
    }
    updatePlayerBarData(playerId, total, newValue) {
        let currentPlayer = this.gameManager.getCurrentPlayer();
        currentPlayer.players[playerId][this.barPropertyTotal()] = total;
        currentPlayer.players[playerId][this.barPropertyValue()] = newValue;
    }
    processLifeBarQueue() {
        if (0 === this.gameManager.lifeBarQueue.length) return false;
        let forDelete = [];
        for (let message of this.gameManager.lifeBarQueue){
            if (ObjectsHandler.processObjectLifeBarMessage(message, false, this)) forDelete.push(message);
            if (this.processPlayerLifeBarMessage(message, false)) forDelete.push(message);
        }
        if (0 < forDelete.length) this.gameManager.lifeBarQueue = this.gameManager.lifeBarQueue.filter((item)=>!forDelete.includes(item));
    }
    drawPlayerLifeBar(playerId) {
        this.destroyByKey(playerId);
        if (!this.canShowPlayerLifeBar(playerId)) {
            this.lifeBars[playerId]?.setVisible(false);
            return false;
        }
        let barData = this.prepareBarData(playerId);
        let barHeight = this.barConfig.height;
        let barTop = this.barConfig.top;
        let fullBarWidth = this.barConfig.width;
        let uiX = barData.player.x - fullBarWidth / 2;
        let uiY = barData.player.y - barHeight - barTop + barData.ownerTop / 2;
        if (playerId === this.gameManager.getCurrentPlayer().playerId && this.barConfig.fixedPosition) {
            // if the position is fixed then the bar has to go on the ui scene:
            this.lifeBars[playerId] = this.gameManager.getActiveScenePreloader().add.graphics();
            if (this.fixedPositionX === false || this.fixedPositionY === false) this.setPlayerLifeBarFixedPosition();
            uiX = this.fixedPositionX;
            uiY = this.fixedPositionY;
        } else // otherwise, the bar will be added in the current scene:
        this.lifeBars[playerId] = this.gameManager.getActiveScene().add.graphics();
        this.drawBar(this.lifeBars[playerId], barData.fullValue, barData.filledValue, uiX, uiY);
        return this;
    }
    destroyByKey(barKey) {
        if (sc.hasOwn(this.lifeBars, barKey)) this.lifeBars[barKey].destroy();
    }
    prepareBarData(playerId) {
        let player = this.gameManager.getCurrentPlayer().players[playerId];
        let fullValue = player[this.barPropertyTotal()];
        let filledValue = player[this.barPropertyValue()];
        let ownerTop = sc.get(player, 'topOff', 0) - this.playerSize.height;
        return {
            player,
            fullValue,
            filledValue,
            ownerTop
        };
    }
    removePlayerLifeBar(playerId) {
        if (!sc.hasOwn(this.lifeBars, playerId)) return false;
        this.lifeBars[playerId].destroy();
        delete this.lifeBars[playerId];
    }
    drawBar(lifeBarGraphic, fullValue, filledValue, uiX, uiY) {
        let barHeight = this.barConfig.height;
        let fullBarWidth = this.barConfig.width;
        let filledBarWidth = filledValue * fullBarWidth / fullValue;
        lifeBarGraphic.clear();
        lifeBarGraphic.fillStyle(parseInt(this.barConfig.fillStyle), 1);
        lifeBarGraphic.fillRect(uiX, uiY, filledBarWidth, barHeight);
        lifeBarGraphic.lineStyle(1, parseInt(this.barConfig.lineStyle));
        lifeBarGraphic.strokeRect(uiX, uiY, fullBarWidth, barHeight);
        lifeBarGraphic.alpha = 0.6;
        lifeBarGraphic.setDepth(300000);
    }
    getCurrentTargetId() {
        return sc.get(this.gameManager.getCurrentPlayer()?.currentTarget, 'id', false);
    }
    getObjectByKey(objectKey) {
        return sc.get(this.gameManager.getActiveScene()?.objectsAnimations, objectKey, false);
    }
}
module.exports.LifebarUi = LifebarUi;

},{"f7fb9e778df1ad65":"c4pWv","879f80e873cb79af":"eRkMR","cd291612d478124":"iznl5","400f53691795e348":"k06SD","b09b37f3a649897":"3vePh","852ef9687b71167f":"@reldens/utils"}],"c4pWv":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - UsersConst
 *
 */ let snippetsPrefix = 'users.';
module.exports.UsersConst = {
    ACTION_LIFEBAR_UPDATE: 'alu',
    SNIPPETS: {
        PREFIX: snippetsPrefix,
        OPTION_LABEL: snippetsPrefix + 'optionLabel'
    },
    MESSAGE: {
        DATA_VALUES: {
            NAMESPACE: 'users'
        }
    }
};

},{}],"3vePh":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ObjectsHandler
 *
 */ const { ActionsConst } = require("c554ff8c96b8723a");
const { GameConst } = require("3cad0fd004bd2a29");
class ObjectsHandler {
    static processObjectLifeBarMessage(message, queue = false, lifeBarUi) {
        if (!this.isValidMessage(message, lifeBarUi)) return false;
        let objectKey = message[ActionsConst.DATA_OWNER_KEY];
        let barData = {};
        barData[lifeBarUi.barPropertyTotal()] = message.totalValue;
        barData[lifeBarUi.barPropertyValue()] = message.newValue;
        lifeBarUi.lifeDataByKey[objectKey] = barData;
        let object = lifeBarUi.getObjectByKey(objectKey);
        if (!object) {
            if (queue) lifeBarUi.queueLifeBarMessage(message);
            return false;
        }
        this.drawObjectLifeBar(object, message[ActionsConst.DATA_OWNER_KEY], message.totalValue, message.newValue, lifeBarUi);
        return true;
    }
    static isValidMessage(message, lifeBarUi) {
        return ActionsConst.DATA_TYPE_VALUE_OBJECT === message[ActionsConst.DATA_OWNER_TYPE] && lifeBarUi.barConfig.showEnemies;
    }
    static drawObjectsLifeBar(lifeBarUi) {
        for (let objectKey of Object.keys(lifeBarUi.lifeDataByKey)){
            let object = lifeBarUi.getObjectByKey(objectKey);
            this.drawObjectLifeBar(object, objectKey, lifeBarUi.lifeDataByKey[objectKey][lifeBarUi.barPropertyTotal()], lifeBarUi.lifeDataByKey[objectKey][lifeBarUi.barPropertyValue()], lifeBarUi);
        }
    }
    static isValidToDraw(object, key, lifeBarUi) {
        if (!object) return false;
        if (GameConst.STATUS.DEATH === object.inState || GameConst.STATUS.DISABLED === object.inState) return false;
        return !(lifeBarUi.barConfig.showOnClick && key !== lifeBarUi.getCurrentTargetId());
    }
    static generateObjectLifeBar(objectKey, lifeBarUi) {
        let lifeBarData = lifeBarUi.lifeDataByKey[objectKey];
        if (!lifeBarData) return false;
        let object = lifeBarUi.getObjectByKey(objectKey);
        this.drawObjectLifeBar(object, objectKey, lifeBarData[lifeBarUi.barPropertyTotal()], lifeBarData[lifeBarUi.barPropertyValue()], lifeBarUi);
    }
    static drawObjectLifeBar(object, objectKey, totalValue, newValue, lifeBarUi) {
        lifeBarUi.destroyByKey(objectKey);
        if (!this.isValidToDraw(object, objectKey, lifeBarUi)) return false;
        this.drawLifeBarInPosition(lifeBarUi, objectKey, object, totalValue, newValue);
    }
    static drawLifeBarInPosition(lifeBarUi, key, object, totalValue, newValue) {
        lifeBarUi.lifeBars[key] = lifeBarUi.gameManager.getActiveScene().add.graphics();
        let { x, y } = this.calculateObjectLifeBarPosition(object, lifeBarUi);
        lifeBarUi.drawBar(lifeBarUi.lifeBars[key], totalValue, newValue, x, y);
    }
    static calculateObjectLifeBarPosition(object, lifeBarUi) {
        return {
            x: object.x - object.sceneSprite.width / 2,
            y: object.y - object.sceneSprite.height / 2 - lifeBarUi.barConfig.height - lifeBarUi.barConfig.top
        };
    }
}
module.exports.ObjectsHandler = ObjectsHandler;

},{"c554ff8c96b8723a":"eRkMR","3cad0fd004bd2a29":"iznl5"}],"8HKcy":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PlayerStatsUi
 *
 */ class PlayerStatsUi {
    constructor(props){
        this.events = props.events;
    }
    createPlayerStatsUi() {
        this.events.on('reldens.beforePreloadUiScene', (uiScene)=>{
            if (!uiScene.gameManager.config.get('client/ui/playerStats/enabled')) return false;
            uiScene.load.html('playerStats', '/assets/html/ui-player-stats.html');
            uiScene.load.html('playerStat', '/assets/html/player-stat.html');
        });
        this.events.on('reldens.beforeCreateUiScene', (uiScene)=>{
            // @TODO - BETA - Replace by UserInterface.
            let statsUi = uiScene.getUiConfig('playerStats');
            if (!statsUi.enabled) return false;
            let dialogBox = uiScene.add.dom(statsUi.uiX, statsUi.uiY).createFromCache('playerStats');
            // @TODO - BETA - Replace all "getChildByProperty" by gameDom.getElement() method.
            let closeButton = dialogBox.getChildByProperty('id', 'player-stats-close');
            let openButton = dialogBox.getChildByProperty('id', 'player-stats-open');
            openButton?.addEventListener('click', ()=>{
                let dialogContainer = dialogBox.getChildByProperty('id', 'player-stats-ui');
                // @TODO - BETA - Replace styles by classes.
                dialogContainer.style.display = 'block';
                openButton.style.display = 'none';
                dialogBox.setDepth(4);
                this.events.emit('reldens.openUI', {
                    ui: this,
                    openButton,
                    dialogBox,
                    dialogContainer,
                    uiScene
                });
            });
            closeButton?.addEventListener('click', ()=>{
                let dialogContainer = dialogBox.getChildByProperty('id', 'player-stats-ui');
                // @TODO - BETA - Replace styles by classes.
                dialogContainer.style.display = 'none';
                if (openButton) openButton.style.display = 'block';
                dialogBox.setDepth(1);
                this.events.emit('reldens.closeUI', {
                    ui: this,
                    closeButton,
                    openButton,
                    dialogBox,
                    dialogContainer,
                    uiScene
                });
            });
            uiScene.elementsUi['playerStats'] = dialogBox;
        });
    }
}
module.exports.PlayerStatsUi = PlayerStatsUi;

},{}],"1nPb0":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    users: {
        optionLabel: '%playerName - LvL %currentLevel - %classPathLabel'
    }
};

},{}],"lFBMv":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Audio Client Plugin
 *
 */ const { AudioManager } = require("f0889e1805ac30ae");
const { SceneAudioPlayer } = require("fa2abd3e6fef423e");
const { MessagesListener } = require("db53c1900c602955");
const { AudioUi } = require("2762c14d95e654ec");
const { TranslationsMapper } = require("e7efea8d47baf6a9");
const Translations = require("11e948f4d8656d91");
const { PluginInterface } = require("2644ab6cd69ea38d");
const { AudioConst } = require("b8ecbb176547e3f6");
const { Logger, sc } = require("78fc36a78c9f343a");
class AudioPlugin extends PluginInterface {
    setup(props) {
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in AudioPlugin.');
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in AudioPlugin.');
        this.setTranslations();
        this.messagesListener = new MessagesListener();
        this.sceneAudioPlayer = SceneAudioPlayer;
        this.initialAudiosData = {};
        this.listenEvents();
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, AudioConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        // @TODO - BETA - Extract all listeners handlers in external services.
        if (!this.events) return false;
        this.events.on('reldens.joinedRoom', (room, gameManager)=>{
            this.initializeAudioManager(gameManager);
            this.messagesListener.listenMessages(room, gameManager);
        });
        this.events.on('reldens.preloadUiScene', async (preloadScene)=>{
            preloadScene.load.html('audio', '/assets/html/ui-audio.html');
            preloadScene.load.html('audio-category', '/assets/html/ui-audio-category-row.html');
        });
        this.events.on('reldens.createUiScene', (preloadScene)=>{
            this.uiManager = new AudioUi(preloadScene);
            this.uiManager.createUi();
        });
        this.events.on('reldens.afterSceneDynamicCreate', async (sceneDynamic)=>{
            let audioManager = sceneDynamic.gameManager.audioManager;
            if (!audioManager) {
                Logger.warning('Audio manager undefined in AudioPlugin.');
                return false;
            }
            let globalAudios = sc.get(this.initialAudiosData, 'globalAudios', {});
            await audioManager.loadGlobalAudios(globalAudios, sceneDynamic);
            await this.messagesListener.processQueue();
            this.sceneAudioPlayer.associateSceneAnimationsAudios(audioManager, sceneDynamic);
            sceneDynamic.cameras.main.on('camerafadeincomplete', ()=>{
                this.sceneAudioPlayer.playSceneAudio(audioManager, sceneDynamic);
            });
        });
        this.events.on('reldens.changeSceneDestroyPrevious', (sceneDynamic)=>{
            sceneDynamic.gameManager.audioManager.destroySceneAudios();
        });
        this.events.on('reldens.allAudiosLoaded', (audioManager, audios, currentScene)=>{
            this.sceneAudioPlayer.playSceneAudio(audioManager, currentScene, true);
        });
    }
    initializeAudioManager(gameManager) {
        if (gameManager.audioManager) return;
        if (!gameManager.initialGameData.player) Logger.warning('Missing initialGameData.player', gameManager.initialGameData);
        gameManager.audioManager = new AudioManager({
            events: this.events,
            currentPlayerData: gameManager.initialGameData.player
        });
        gameManager.audioManager.updateDefaultConfig(gameManager.config.getWithoutLogs('client/general/audio/defaultAudioConfig'));
        this.initialAudiosData = sc.get(gameManager.initialGameData, 'audio', {});
    }
}
module.exports.AudioPlugin = AudioPlugin;

},{"f0889e1805ac30ae":"i3nao","fa2abd3e6fef423e":"3LWrr","db53c1900c602955":"dv9hV","2762c14d95e654ec":"deeCs","e7efea8d47baf6a9":"fKH2J","11e948f4d8656d91":"8JOks","2644ab6cd69ea38d":"deNd3","b8ecbb176547e3f6":"c1e4f","78fc36a78c9f343a":"@reldens/utils"}],"i3nao":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Audio Manager
 *
 */ const { AudioConst } = require("2d414fa7de1cef79");
const { Logger, sc } = require("25bd7cab17919029");
class AudioManager {
    constructor(props){
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in AudioManager.');
        this.globalAudios = sc.get(props, 'globalAudios', {});
        this.roomsAudios = sc.get(props, 'roomsAudios', {});
        this.categories = sc.get(props, 'categories', {});
        this.playerConfig = sc.get(props, 'playerConfig', {});
        this.currentPlayerData = sc.get(props, 'currentPlayerData', {});
        // @NOTE: it's important to add any been played audios here for the "changeMuteState" method.
        this.playing = {};
        this.currentMuteState = false;
        this.changedMutedState = {};
        this.lockedMuteState = false;
        this.defaultAudioConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
    }
    async setAudio(audioKey, enabled) {
        if (this.lockedMuteState) {
            Logger.info('Locked mute state to set audio.');
            return false;
        }
        await this.events.emit('reldens.setAudio', {
            audioManager: this,
            categoryKey: audioKey,
            enabled
        });
        let category = this.categories[audioKey];
        this.playerConfig[category.id] = enabled ? 1 : 0;
        if (!sc.hasOwn(this.playing, audioKey)) return true;
        let playOrStop = enabled ? 'play' : 'stop';
        let playingElement = this.playing[audioKey];
        if (category.single_audio && sc.isObjectFunction(playingElement, playOrStop)) // if is single track we will stop or play the last audio:
        return this.setAudioForSingleEntity(playingElement, playOrStop, audioKey, enabled);
        return this.setAudioForElementChildren(playingElement, category, enabled);
    }
    setAudioForSingleEntity(playingElement, playOrStop, audioKey, enabled) {
        if (!playingElement) {
            Logger.error('Missing playingElement.', {
                audioKey,
                playingElement
            });
            return false;
        }
        if (!playingElement.currentConfig) // Logger.error('Possible null WebAudioSound as playingElement.', {audioKey, playingElement});
        return false;
        if (!sc.isObjectFunction(playingElement, playOrStop)) {
            Logger.error('Missing playOrStop method in playingElement.', {
                audioKey,
                playOrStop,
                playingElement
            });
            return false;
        }
        try {
            playingElement[playOrStop]();
            playingElement.mute = !enabled;
        } catch (error) {
            Logger.error('PlayingElement error.', {
                audioKey,
                playOrStop,
                playingElement,
                error
            });
        }
        return true;
    }
    setAudioForElementChildren(playingElement, category, enabled) {
        // if is multi-track we will only stop all the audios but replay them only when the events require it:
        if (category.single_audio) return false;
        let audioKeys = Object.keys(playingElement);
        if (0 === audioKeys.length) return false;
        for (let i of audioKeys)this.setAudioForSingleEntity(playingElement[i], 'stop', i, enabled);
        return true;
    }
    generateAudio(onScene, audio) {
        let soundConfig = Object.assign({}, this.defaultAudioConfig, audio.config || {});
        if (!sc.hasOwn(onScene.cache.audio.entries.entries, audio.audio_key)) {
            Logger.error('Audio file does not exists. Audio key: ' + audio.audio_key, onScene.cache.audio.entries.entries);
            return false;
        }
        let audioInstance = onScene.sound.add(audio.audio_key, soundConfig);
        if (audio.markers && 0 < audio.markers.length) for (let marker of audio.markers){
            let markerConfig = Object.assign({}, soundConfig, marker.config || {}, {
                name: marker.marker_key,
                start: marker.start,
                duration: marker.duration
            });
            audioInstance.addMarker(markerConfig);
        }
        return {
            data: audio,
            audioInstance
        };
    }
    findAudio(audioKey, sceneKey) {
        let roomAudio = this.findRoomAudio(audioKey, sceneKey);
        return roomAudio ? roomAudio : this.findGlobalAudio(audioKey);
    }
    findRoomAudio(audioKey, sceneKey) {
        if (!sc.hasOwn(this.roomsAudios, sceneKey)) this.roomsAudios[sceneKey] = {};
        return this.findAudioInObjectKey(audioKey, this.roomsAudios[sceneKey]);
    }
    findGlobalAudio(audioKey) {
        return this.findAudioInObjectKey(audioKey, this.globalAudios);
    }
    findAudioInObjectKey(audioKey, audiosObject) {
        if (sc.hasOwn(audiosObject, audioKey)) return {
            audio: audiosObject[audioKey],
            marker: false
        };
        let objectKeys = Object.keys(audiosObject);
        if (0 === objectKeys.length) return false;
        for (let i of objectKeys){
            let audio = audiosObject[i];
            if (sc.hasOwn(audio.audioInstance.markers, audioKey)) return {
                audio,
                marker: audioKey
            };
        }
        return false;
    }
    addCategories(categories) {
        for (let category of categories){
            if (!sc.hasOwn(this.categories, category.category_key)) this.categories[category.category_key] = category;
            if (!sc.hasOwn(this.playing, category.category_key)) this.playing[category.category_key] = {};
        }
    }
    async loadGlobalAudios(audios, currentScene) {
        let audioKeys = Object.keys(audios);
        if (0 === audioKeys.length) return false;
        await this.loadByKeys(audioKeys, audios, currentScene, 'globalAudios');
    }
    async loadAudiosInScene(audios, currentScene) {
        let audioKeys = Object.keys(audios);
        if (0 === audioKeys.length) return false;
        if (!sc.hasOwn(this.roomsAudios, currentScene.key)) this.roomsAudios[currentScene.key] = {};
        await this.loadByKeys(audioKeys, audios, currentScene, 'roomsAudios');
    }
    async loadByKeys(audioKeys, audios, currentScene, storageKey) {
        let newAudiosCounter = 0;
        for (let i of audioKeys){
            let audio = audios[i];
            this.removeSceneAudioByAudioKey(currentScene, audio.audio_key);
            let filesArr = await this.prepareFiles(audio);
            if (0 === filesArr.length) continue;
            let audioLoader = currentScene.load.audio(audio.audio_key, filesArr);
            audioLoader.on('filecomplete', async (completedFileKey)=>{
                if (completedFileKey !== audio.audio_key) return false;
                let generateAudio = this.generateAudio(currentScene, audio);
                if (false === generateAudio) {
                    Logger.error('AudioLoader can not generate the audio.', {
                        'Audio key:': audio.audio_key,
                        'Storage key:': storageKey
                    });
                    return false;
                }
                storageKey === 'roomsAudios' ? this.roomsAudios[currentScene.key][audio.audio_key] = generateAudio : this.globalAudios[audio.audio_key] = generateAudio;
                newAudiosCounter++;
                await this.fireAudioEvents(audios, currentScene, audio, newAudiosCounter);
            });
            audioLoader.start();
        }
    }
    async existsFileByXMLHttpRequest(url) {
        try {
            let response = await fetch(url, {
                method: 'HEAD'
            });
            return response.status !== 404;
        } catch (error) {
            Logger.error('Error fetching:', error);
            return false;
        }
    }
    async prepareFiles(audio) {
        let filesName = audio.files_name.split(',');
        let filesArr = [];
        for (let fileName of filesName){
            let audioPath = AudioConst.AUDIO_BUCKET + '/' + fileName;
            let testPath = await this.existsFileByXMLHttpRequest(audioPath);
            if (false === testPath) continue;
            filesArr.push(audioPath);
        }
        return filesArr;
    }
    async fireAudioEvents(audios, currentScene, audio, newAudiosCounter) {
        await currentScene.gameManager.events.emit('reldens.audioLoaded', this, audios, currentScene, audio);
        if (newAudiosCounter === audios.length) await currentScene.gameManager.events.emit('reldens.allAudiosLoaded', this, audios, currentScene, audio);
    }
    removeAudiosFromScene(audios, currentScene) {
        if (0 === audios.length || !currentScene) return false;
        for (let audio of audios)this.removeSceneAudioByAudioKey(currentScene, audio.audio_key);
        return true;
    }
    removeSceneAudioByAudioKey(scene, audioKey) {
        scene.sound.removeByKey(audioKey);
        if (sc.hasOwn(scene.cache.audio.entries.entries, audioKey)) delete scene.cache.audio.entries.entries[audioKey];
        if (sc.hasOwn(this.roomsAudios[scene.key], audioKey)) delete this.roomsAudios[scene.key][audioKey];
        if (sc.hasOwn(this.globalAudios, audioKey)) delete this.globalAudios[audioKey];
    }
    updateDefaultConfig(defaultAudioConfig) {
        if (sc.isObject(defaultAudioConfig)) Object.assign(this.defaultAudioConfig, defaultAudioConfig);
    }
    async processUpdateData(message, room, gameManager) {
        if (message.playerConfig) this.playerConfig = message.playerConfig;
        if (message.categories) {
            this.addCategories(message.categories);
            await this.events.emit('reldens.audioManagerUpdateCategoriesLoaded', this, room, gameManager, message);
        }
        let audios = sc.get(message, 'audios', {});
        if (0 < Object.keys(audios).length) {
            let currentScene = gameManager.gameEngine.scene.getScene(room.name);
            await this.loadAudiosInScene(audios, currentScene);
            await this.events.emit('reldens.audioManagerUpdateAudiosLoaded', this, room, gameManager, message);
        }
    }
    async processDeleteData(message, room, gameManager) {
        if (0 === message.audios.length) return false;
        let currentScene = gameManager.gameEngine.scene.getScene(room.name);
        this.removeAudiosFromScene(message.audios, currentScene);
        await this.events.emit('reldens.audioManagerDeleteAudios', this, room, gameManager, message);
    }
    destroySceneAudios() {
        let playingKeys = Object.keys(this.playing);
        if (0 === playingKeys.length) return false;
        for (let i of playingKeys){
            let playingAudioCategory = this.playing[i];
            let categoryData = this.categories[i];
            // @TODO - BETA - Check and refactor if possible to use scene delete by key.
            if (categoryData.single_audio && sc.isObjectFunction(playingAudioCategory, 'stop')) {
                playingAudioCategory.stop();
                delete this.playing[i];
                continue;
            }
            let playingCategoryKeys = Object.keys(playingAudioCategory);
            if (!categoryData.single_audio && 0 === playingCategoryKeys.length) continue;
            for (let a of playingCategoryKeys){
                let playingAudio = playingAudioCategory[a];
                if (sc.isObjectFunction(playingAudio, 'stop')) {
                    playingAudio.stop();
                    delete playingAudio[i];
                }
            }
        }
    }
    async changeMuteState(newMuteState, newMuteLockState) {
        if (false === newMuteLockState) this.lockedMuteState = false;
        this.currentMuteState = newMuteState;
        if (this.lockedMuteState && false !== newMuteLockState) {
            Logger.info('Locked mute state from changes.');
            return false;
        }
        return newMuteState ? await this.muteCategories(newMuteLockState) : await this.restoreMute(newMuteLockState);
    }
    async muteCategories(newMuteLockState) {
        let categoriesKeys = Object.keys(this.categories);
        if (0 < categoriesKeys.length) {
            Logger.info('Mute categories not found.');
            return false;
        }
        for (let i of categoriesKeys){
            this.changedMutedState[i] = this.currentMuteState;
            await this.setAudio(i, false);
        }
        this.setMuteLock(newMuteLockState);
        return true;
    }
    async restoreMute(newMuteLockState) {
        let changedKeys = Object.keys(this.changedMutedState);
        if (0 === changedKeys.length) {
            this.setMuteLock(newMuteLockState);
            return false;
        }
        for (let i of changedKeys)await this.setAudio(i, true);
        this.setMuteLock(newMuteLockState);
        this.changedMutedState = {};
        return true;
    }
    setMuteLock(newMuteLockState) {
        if (false === newMuteLockState) this.lockedMuteState = false;
        if (true === newMuteLockState) this.lockedMuteState = true;
    }
}
module.exports.AudioManager = AudioManager;

},{"2d414fa7de1cef79":"c1e4f","25bd7cab17919029":"@reldens/utils"}],"c1e4f":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AudioConst
 *
 */ module.exports.AudioConst = {
    AUDIO_UPDATE: 'ap',
    AUDIO_DELETE: 'ad',
    AUDIO_ANIMATION_KEY_START: 'i_',
    AUDIO_ANIMATION_KEY_UPDATE: 'u_',
    AUDIO_ANIMATION_KEY_COMPLETE: 'c_',
    AUDIO_ANIMATION_KEY_REPEAT: 'r_',
    AUDIO_ANIMATION_KEY_STOP: 's_',
    AUDIO_BUCKET: '/assets/audio',
    MESSAGE: {
        DATA: {
            UPDATE_TYPE: 'ck',
            UPDATE_VALUE: 'uv'
        },
        DATA_VALUES: {
            NAMESPACE: 'audio'
        }
    }
};

},{}],"3LWrr":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SceneAudioPlayer.
 *
 */ const { AudioConst } = require("f731a7f8fab776ad");
const { Logger, sc } = require("a54fcbcc49a76a60");
class SceneAudioPlayer {
    playSceneAudio(audioManager, sceneDynamic, forcePlay) {
        let sceneAudio = sceneDynamic['associatedAudio'];
        if (forcePlay !== true && (sceneAudio === false || sceneAudio && sceneAudio.audio.audioInstance.isPlaying)) return false;
        sceneDynamic['associatedAudio'] = audioManager.findAudio(sceneDynamic.key, sceneDynamic.key);
        if (sceneDynamic['associatedAudio']) {
            this.playSpriteAudio(sceneDynamic['associatedAudio'], sceneDynamic, false, audioManager);
            return sceneDynamic['associatedAudio'];
        }
        return false;
    }
    associateSceneAnimationsAudios(audioManager, sceneDynamic) {
        sceneDynamic.cameras.main.on('camerafadeincomplete', ()=>{
            if (sceneDynamic.children.list.length <= 0) return false;
            for (let sprite of sceneDynamic.children.list){
                if (sprite.type !== 'Sprite') continue;
                sprite.on('animationstart', (event)=>{
                    let animationKey = AudioConst.AUDIO_ANIMATION_KEY_START + event.key;
                    let associatedAudio = this.attachAudioToSprite(sprite, animationKey, audioManager, sceneDynamic);
                    if (false !== associatedAudio) this.playSpriteAudio(associatedAudio, sceneDynamic, sprite, audioManager);
                });
                sprite.on('animationupdate', (event)=>{
                    let animationKey = AudioConst.AUDIO_ANIMATION_KEY_UPDATE + event.key;
                    let associatedAudio = this.attachAudioToSprite(sprite, animationKey, audioManager, sceneDynamic);
                    if (false !== associatedAudio) this.playSpriteAudio(associatedAudio, sceneDynamic, sprite, audioManager);
                });
                sprite.on('animationcomplete', (event)=>{
                    let animationKey = AudioConst.AUDIO_ANIMATION_KEY_COMPLETE + event.key;
                    let associatedAudio = this.attachAudioToSprite(sprite, animationKey, audioManager, sceneDynamic);
                    if (false !== associatedAudio) this.playSpriteAudio(associatedAudio, sceneDynamic, sprite, audioManager);
                });
                sprite.on('animationrepeat', (event)=>{
                    let animationKey = AudioConst.AUDIO_ANIMATION_KEY_REPEAT + event.key;
                    let associatedAudio = this.attachAudioToSprite(sprite, animationKey, audioManager, sceneDynamic);
                    if (false !== associatedAudio) this.playSpriteAudio(associatedAudio, sceneDynamic, sprite, audioManager);
                });
                sprite.on('animationstop', (event)=>{
                    let animationKey = AudioConst.AUDIO_ANIMATION_KEY_STOP + event.key;
                    let associatedAudio = this.attachAudioToSprite(sprite, animationKey, audioManager, sceneDynamic);
                    if (false !== associatedAudio) this.playSpriteAudio(associatedAudio, sceneDynamic, sprite, audioManager);
                });
            }
        });
    }
    attachAudioToSprite(sprite, animationAudioKey, audioManager, sceneDynamic) {
        if (sc.hasOwn(sprite.associatedAudio, animationAudioKey)) return sprite.associatedAudio[animationAudioKey];
        if (!sc.hasOwn(sprite, 'associatedAudio')) sprite.associatedAudio = {};
        if (!sc.hasOwn(sprite.associatedAudio, animationAudioKey)) sprite.associatedAudio[animationAudioKey] = audioManager.findAudio(animationAudioKey, sceneDynamic.key);
        return sprite.associatedAudio[animationAudioKey];
    }
    playSpriteAudio(associatedAudio, sceneDynamic, sprite, audioManager) {
        let currentPlayerId = Number(audioManager.currentPlayerData.id);
        let spritePlayerId = Number(sc.get(sprite, 'player_id'));
        //Logger.debug('Play sprite audio.', associatedAudio, sceneDynamic.key, sprite, currentPlayerId);
        let isCurrentPlayerSprite = this.isCurrentPlayerSprite(spritePlayerId, currentPlayerId);
        if (associatedAudio.audio.data.config?.onlyCurrentPlayer && !isCurrentPlayerSprite) //Logger.debug('Play sprite audio avoided for current player.', associatedAudio, sceneKey);
        return false;
        let currentPlayer = sceneDynamic.player;
        if (isCurrentPlayerSprite && currentPlayer && (currentPlayer.isDisabled() || currentPlayer.isDeath())) //Logger.debug('Play sprite audio avoided for current dead player.', associatedAudio, sceneKey);
        return false;
        // @NOTE:
        // - We need the status update from the actual category in the audio manager the category associated to the
        // audio here is just the storage reference.
        // - We need to check the category enable every time the audio could be reproduced because the user can turn
        // the category on/off at any time.
        if (!associatedAudio || !associatedAudio.audio || !associatedAudio.audio.data) {
            Logger.error('Missing associated audio data.', associatedAudio);
            return false;
        }
        let audioCategoryKey = associatedAudio.audio.data.category.category_key;
        let audioCategory = sc.get(audioManager.categories, audioCategoryKey, false);
        let audioEnabled = sc.get(audioManager.playerConfig, audioCategory.id, audioCategory.enabled);
        if (!audioCategory || !audioEnabled) return false;
        let audioInstance = associatedAudio.audio.audioInstance;
        // first stop previous if is single category audio:
        if (audioCategory.single_audio) {
            if (sc.isObjectFunction(audioManager.playing[audioCategory.category_key], 'stop')) audioManager.playing[audioCategory.category_key].stop();
        }
        // save the new instance in the proper place and play:
        // - if is single category then just in the playing property with that category key:
        if (audioCategory.single_audio) {
            audioManager.playing[audioCategory.category_key] = audioInstance;
            if (this.isMutedState(audioManager, audioCategory.category_key, audioInstance)) return false;
            audioInstance.mute = false;
            audioInstance.play();
            return true;
        }
        // - if is not single category:
        if (!audioCategory.single_audio) {
            // - if it does not have a marker we save the audio instance under the tree category_key > audio_key:
            if (!associatedAudio.marker) {
                audioManager.playing[audioCategory.category_key][associatedAudio.audio.data.audio_key] = audioInstance;
                if (this.isMutedState(audioManager, audioCategory.category_key, audioInstance)) return false;
                // and play the audio:
                audioInstance.mute = false;
                audioInstance.play();
                return true;
            }
            // - if it has a marker we save the audio instance under the tree category_key > marker_key:
            if (associatedAudio.marker) {
                audioManager.playing[audioCategory.category_key][associatedAudio.marker] = audioInstance;
                if (this.isMutedState(audioManager, audioCategory.category_key, audioInstance)) return false;
                // and play the audio passing the marker:
                audioInstance.mute = false;
                audioInstance.play(associatedAudio.marker);
                return true;
            }
        }
    }
    isCurrentPlayerSprite(spritePlayerId, currentPlayerId) {
        return spritePlayerId && spritePlayerId === currentPlayerId;
    }
    isMutedState(audioManager, mutedKey, audioInstance) {
        if (false === audioManager.currentMuteState) return false;
        Logger.info('AudioManager in muted state to play audio.', {
            mutedKey,
            audioInstance
        });
        audioManager.changedMutedState[mutedKey] = audioManager.currentMuteState;
        return true;
    }
}
module.exports.SceneAudioPlayer = new SceneAudioPlayer();

},{"f731a7f8fab776ad":"c1e4f","a54fcbcc49a76a60":"@reldens/utils"}],"dv9hV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesListener.
 *
 */ const { AudioConst } = require("7c37a875a4ede872");
class MessagesListener {
    constructor(){
        this.queueMessages = [];
        this.sceneReady = false;
    }
    listenMessages(room, gameManager) {
        room.onMessage('*', async (message)=>{
            await this.processMessage(message, room, gameManager);
        });
    }
    async processQueue() {
        this.sceneReady = true;
        if (0 === this.queueMessages.length) return false;
        for (let messageData of this.queueMessages){
            let { message, room, gameManager } = messageData;
            await this.processMessage(message, room, gameManager);
        }
        return true;
    }
    async processMessage(message, room, gameManager) {
        if (false === this.sceneReady) this.queueMessages.push({
            message,
            room,
            gameManager
        });
        if (message.act === AudioConst.AUDIO_UPDATE) await gameManager.audioManager.processUpdateData(message, room, gameManager);
        if (message.act === AudioConst.AUDIO_DELETE) await gameManager.audioManager.processDeleteData(message, room, gameManager);
    }
}
module.exports.MessagesListener = MessagesListener;

},{"7c37a875a4ede872":"c1e4f"}],"deeCs":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AudioUi
 *
 */ const { SceneAudioPlayer } = require("cab4fb9f8a467533");
const { AudioUpdate } = require("fd2803834723a17f");
const { sc } = require("a6e36c332d705b7f");
class AudioUi {
    constructor(uiScene){
        this.uiScene = uiScene;
        this.gameManager = this.uiScene.gameManager;
        this.audioManager = this.gameManager.audioManager;
        this.sceneAudioPlayer = SceneAudioPlayer;
    }
    createUi() {
        if (!this.audioManager.categories) return;
        let audioSettingsTemplate = this.uiScene.cache.html.get('audio');
        let audioCategoryTemplate = this.uiScene.cache.html.get('audio-category');
        let audioSettingsContent = this.prepareAudioSettingsContent(audioCategoryTemplate, audioSettingsTemplate);
        this.gameManager.gameDom.appendToElement('#settings-dynamic', audioSettingsContent);
        let audioSettingInputs = this.gameManager.gameDom.getElements('.audio-setting');
        if (0 === audioSettingInputs.length) return false;
        for (let settingInput of audioSettingInputs)settingInput.addEventListener('click', async (event)=>{
            await this.audioManager.setAudio(event.target.dataset.categoryKey, settingInput.checked);
            this.gameManager.activeRoomEvents.send(new AudioUpdate(settingInput.value, settingInput.checked));
            this.sceneAudioPlayer.playSceneAudio(this.audioManager, this.gameManager.getActiveScene());
        });
    }
    prepareAudioSettingsContent(audioCategoryTemplate, audioSettingsTemplate) {
        let categoriesRows = this.prepareCategoriesRows(audioCategoryTemplate);
        return this.gameManager.gameEngine.parseTemplate(audioSettingsTemplate, {
            audioCategories: categoriesRows,
            settingsTitle: this.gameManager.services.translator.t('audio.settingsTitle')
        });
    }
    prepareCategoriesRows(audioCategoryTemplate) {
        let categoriesRows = '';
        let audioCategoriesKeys = Object.keys(this.audioManager.categories);
        for (let i of audioCategoriesKeys){
            let audioCategory = this.audioManager.categories[i];
            let audioEnabled = sc.get(this.audioManager.playerConfig, audioCategory.id, audioCategory.enabled);
            categoriesRows = categoriesRows + this.gameManager.gameEngine.parseTemplate(audioCategoryTemplate, {
                categoryId: audioCategory.id,
                categoryLabel: audioCategory.category_label,
                categoryKey: audioCategory.category_key,
                categoryChecked: audioEnabled ? ' checked="checked"' : ''
            });
        }
        return categoriesRows;
    }
}
module.exports.AudioUi = AudioUi;

},{"cab4fb9f8a467533":"3LWrr","fd2803834723a17f":"81rzg","a6e36c332d705b7f":"@reldens/utils"}],"81rzg":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AudioUpdate
 *
 */ const { AudioConst } = require("c6282358940d3030");
const { GameConst } = require("f796ac11391ac94f");
class AudioUpdate {
    constructor(updateType, updateValue){
        this[GameConst.ACTION_KEY] = AudioConst.AUDIO_UPDATE;
        this[AudioConst.MESSAGE.DATA.UPDATE_TYPE] = updateType;
        this[AudioConst.MESSAGE.DATA.UPDATE_VALUE] = updateValue;
    }
}
module.exports.AudioUpdate = AudioUpdate;

},{"c6282358940d3030":"c1e4f","f796ac11391ac94f":"iznl5"}],"8JOks":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    audio: {
        settingsTitle: 'Audio Settings'
    }
};

},{}],"dPmzV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - RoomsPlugin
 *
 */ const { ActionsConst } = require("29c0272b4b704e1a");
const { RoomsConst } = require("3956319db3be63df");
const { PluginInterface } = require("467a2ea8f06e99ae");
const { Logger, sc } = require("1d01f54fcfe4090e");
class RoomsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in RoomsPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in RoomsPlugin.');
        this.events.on('reldens.beforeCreateEngine', (initialGameData, gameManager)=>{
            let isRoomSelectionDisabled = gameManager.config.get('client/rooms/selection/allowOnLogin', false);
            if (isRoomSelectionDisabled && initialGameData.roomSelection) this.populateSceneSelector(initialGameData.roomSelection, gameManager);
        });
        this.events.on('reldens.onPrepareSinglePlayerSelectorFormSubmit', (event)=>{
            this.appendSelectedScene(event.gameManager, event.form);
        });
        this.events.on('reldens.onPreparePlayerSelectorFormSubmit', (event)=>{
            this.appendSelectedScene(event.gameManager, event.form);
        });
        this.events.on('reldens.onPreparePlayerCreationFormSubmit', (event)=>{
            this.appendSelectedScene(event.gameManager, event.form);
        });
    }
    populateSceneSelector(roomSelection, gameManager) {
        let playerCreationAdditional = gameManager.gameDom.getElement(ActionsConst.SELECTORS.PLAYER_CREATION_ADDITIONAL_INFO);
        let playerSelectionAdditional = gameManager.gameDom.getElement(ActionsConst.SELECTORS.PLAYER_SELECTION_ADDITIONAL_INFO);
        if (!playerCreationAdditional && !playerSelectionAdditional) {
            Logger.warning('Missing element.', {
                playerCreationAdditional,
                playerSelectionAdditional
            });
            return false;
        }
        if (playerCreationAdditional) {
            let creationSelection = this.filterCreationRooms(roomSelection);
            let div = this.createSelectorElements(gameManager, creationSelection, 'creation');
            playerCreationAdditional.append(div);
        }
        if (playerSelectionAdditional) {
            let div = this.createSelectorElements(gameManager, roomSelection, 'selection');
            playerSelectionAdditional.append(div);
        }
    }
    filterCreationRooms(roomSelection) {
        let creationSelection = [];
        for (let optionData of roomSelection){
            if (optionData.name === RoomsConst.ROOM_LAST_LOCATION_KEY) continue;
            creationSelection.push(optionData);
        }
        return creationSelection;
    }
    appendSelectedScene(gameManager, form) {
        let sceneSelect = gameManager.gameDom.getElement('.scene-select', form);
        if (!sceneSelect) //Logger.debug('Scene selector not found by ".scene-select".', form);
        return;
        let selectedScene = sceneSelect.options[sceneSelect.selectedIndex].value;
        if (!selectedScene) //Logger.debug('Selected scene not found.', sceneSelect, selectedScene.selectedIndex, form);
        return;
        gameManager.initialGameData.selectedScene = selectedScene;
    }
    createSelectorElements(gameManager, roomSelection, key) {
        let div = gameManager.gameDom.createElement('div');
        div.classList.add('input-box');
        let label = gameManager.gameDom.createElement('label');
        label.htmlFor = key + 'SelectedScene';
        label.innerText = this.gameManager.services.translator.t('game.pleaseSelectScene');
        let select = gameManager.gameDom.createElement('select');
        select.name = key + 'SelectedScene';
        select.id = key + 'SelectedScene';
        select.classList.add('select-element');
        select.classList.add('scene-select');
        for (let roomData of roomSelection){
            let option = new Option(roomData.title, roomData.name);
            select.append(option);
        }
        div.append(label);
        div.append(select);
        return div;
    }
}
module.exports.RoomsPlugin = RoomsPlugin;

},{"29c0272b4b704e1a":"eRkMR","3956319db3be63df":"4L11d","467a2ea8f06e99ae":"deNd3","1d01f54fcfe4090e":"@reldens/utils"}],"35dQU":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Prediction Client Plugin
 *
 */ const { PredictionWorldCreator } = require("698b644ff63be292");
const { RoomEventsOverride } = require("33ce8b7f1eedd7a9");
const { PluginInterface } = require("c1ea0248987a09b6");
const { Logger, sc } = require("3c592f7740d29ac2");
class PredictionPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        this.events = sc.get(props, 'events', false);
        this.predictionWorldCreator = new PredictionWorldCreator();
        this.roomEventsOverride = new RoomEventsOverride();
        if (this.validateProperties()) this.listenEvents();
    }
    validateProperties() {
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in PredictionPlugin.');
            return false;
        }
        if (!this.events) {
            Logger.error('EventsManager undefined in PredictionPlugin.');
            return false;
        }
        return true;
    }
    listenEvents() {
        this.events.on('reldens.createEngineSceneDone', async (event)=>{
            await this.predictionWorldCreator.createSceneWorld(event.currentScene);
        });
        this.events.on('reldens.createdRoomsEventsInstance', (joinedFirstRoom, gameManager)=>{
            this.roomEventsOverride.createCurrentPlayerOverride(gameManager.activeRoomEvents);
            this.roomEventsOverride.playerOnChangeOverride(gameManager.activeRoomEvents);
            this.roomEventsOverride.createPlayerEngineInstanceOverride(gameManager.activeRoomEvents);
            this.roomEventsOverride.createSceneInstanceOverride(gameManager.activeRoomEvents);
        });
    }
}
module.exports.PredictionPlugin = PredictionPlugin;

},{"698b644ff63be292":"4MzTr","33ce8b7f1eedd7a9":"eRyGx","c1ea0248987a09b6":"deNd3","3c592f7740d29ac2":"@reldens/utils"}],"4MzTr":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Prediction World Creator
 *
 */ const { CollisionsManager } = require("81a878d445d114e3");
const { P2world } = require("a3212e85f9a74e4");
const { WorldPointsValidator } = require("8c4e487eb60fa4f8");
const { WorldTimer } = require("50192fe3227e0023");
const { Logger, sc } = require("6f0361e2dca7f7f5");
class PredictionWorldCreator {
    async createSceneWorld(scene) {
        if (!scene.experimentalClientPrediction) return;
        let validLayers = this.findValidLayers(scene);
        let mapJson = this.cloneMapJson(scene, validLayers);
        let worldData = {
            sceneName: scene.key,
            roomId: scene.params.roomId,
            roomMap: scene.params.roomMap,
            mapJson,
            config: scene.configManager,
            events: scene.eventsManager,
            allowSimultaneous: scene.configManager.get('client/general/controls/allowSimultaneousKeys', true),
            worldConfig: scene.gameManager.activeRoomEvents.roomData?.worldConfig || scene.worldConfig
        };
        scene.worldPrediction = this.createWorldInstance(worldData);
        scene.worldPrediction.createLimits();
        await scene.worldPrediction.createWorldContent({});
        let currentPlayer = scene.gameManager.getCurrentPlayer();
        if (!currentPlayer) {
            Logger.error('Current player not present for prediction.');
            return;
        }
        let playerData = {
            id: currentPlayer.playerId,
            width: scene.configManager.get('client/players/physicalBody/width'),
            height: scene.configManager.get('client/players/physicalBody/height'),
            bodyState: currentPlayer.state
        };
        let predictionBody = scene.worldPrediction.createPlayerBody(playerData);
        predictionBody.updateBodyState = this.updateBodyStateOverride(predictionBody, currentPlayer);
        currentPlayer.predictionBody = predictionBody;
        scene.worldPredictionTimer = new WorldTimer({
            callbacks: [
                ()=>{
                    if (!scene.worldPrediction) {
                        Logger.error('Scene World not longer exists.', scene.roomWorld);
                        return;
                    }
                    scene.worldPrediction.removeBodiesFromWorld();
                }
            ]
        });
        scene.worldPredictionTimer.startWorldSteps(scene.worldPrediction);
        scene.collisionsManager = new CollisionsManager({
            roomWorld: scene.worldPrediction
        });
        currentPlayer.pointsValidator = new WorldPointsValidator(mapJson.width, mapJson.height);
    }
    cloneMapJson(scene, validLayers) {
        return Object.assign({}, scene.cache?.tilemap?.entries?.entries[scene.tileset.name]?.data || {}, {
            layers: validLayers
        });
    }
    findValidLayers(scene) {
        let validLayers = [];
        for (let layer of scene.cache.tilemap.entries.entries[scene.tileset.name].data.layers)if (-1 !== layer.name.indexOf('collision')) validLayers.push(layer);
        return validLayers;
    }
    updateBodyStateOverride(predictionBody, currentPlayer) {
        return ()=>{
            if (!sc.hasOwn(predictionBody.bodyState, 'x') || !sc.hasOwn(predictionBody.bodyState, 'y')) return;
            if (!predictionBody.position[0] || !predictionBody.position[1]) return;
            // only update the body if it moves:
            if (predictionBody.isNotMoving()) {
                predictionBody.bodyState.mov = false;
                return;
            }
            // update position:
            if (predictionBody.bodyState.x !== predictionBody.position[0]) predictionBody.bodyState.x = predictionBody.position[0];
            if (predictionBody.bodyState.y !== predictionBody.position[1]) predictionBody.bodyState.y = predictionBody.position[1];
            // start or stop animation:
            let newStateMov = 0 !== Number(Number(predictionBody.velocity[0]).toFixed(2)) || 0 !== Number(predictionBody.velocity[1].toFixed(2));
            if (predictionBody.bodyState.mov !== newStateMov) predictionBody.bodyState.mov = newStateMov;
            let state = {
                x: predictionBody.position[0],
                y: predictionBody.position[1],
                dir: predictionBody.bodyState.dir
            };
            currentPlayer.updatePlayer(currentPlayer.playerId, {
                state
            });
        };
    }
    createWorldInstance(worldData) {
        return new P2world(worldData);
    }
}
module.exports.PredictionWorldCreator = PredictionWorldCreator;

},{"81a878d445d114e3":"2hC5c","a3212e85f9a74e4":"e1fPm","8c4e487eb60fa4f8":"75XGg","50192fe3227e0023":"fgadn","6f0361e2dca7f7f5":"@reldens/utils"}],"2hC5c":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - CollisionsManager
 *
 */ const { PhysicalBody } = require("2bac9eebd1669ae7");
const { ErrorManager, Logger, sc } = require("6df25a7483afe879");
class CollisionsManager {
    constructor(room){
        this.activateCollisions(room);
    }
    activateCollisions(room) {
        if (!room) return;
        this.room = room;
        if (!sc.hasOwn(this.room, 'roomWorld')) ErrorManager.error('Room world not found.');
        this.guestEmailDomain = this.room.config.getWithoutLogs('server/players/guestsUser/emailDomain');
        // @TODO - BETA - Refactor to extract p2js as driver.
        // @NOTE: postBroadphase will be used to check pairs and test overlap instead of collision, for example, a spell
        // will overlap the player but not collide with it, if the spell collides with the player it will push it in
        // the opposite direction because the physics engine.
        this.room.roomWorld.on('postBroadphase', this.onWorldStepStart.bind(this));
        this.room.roomWorld.on('preSolve', this.beforeResolveCollision.bind(this));
        this.room.roomWorld.on('beginContact', this.onCollisionsBegin.bind(this));
        // @NOTE: "endContact"  will trigger when the contact ends and not when the collision step ends.
        this.room.roomWorld.on('endContact', this.onCollisionsEnd.bind(this));
    }
    onWorldStepStart(evt) {
        let { pairs } = evt;
        // @NOTE: pairs can be a lot more than 2, these are not related to collisions pairs.
        if (1 >= pairs.length) return;
        let bulletA = false;
        let bulletB = false;
        let player = false;
        let roomObject = false;
        for (let body of pairs){
            if (body.playerId && body.pStop) body.stopFull();
            if (body.roomObject && body.pStop) body.stopFull();
            if (body.playerId) player = body;
            if (body.isBullet) {
                if (bulletA && !bulletB) bulletB = body;
                if (!bulletA) bulletA = body;
                body.removeInvalidStateBulletBody();
            }
            if (body.isRoomObject && !body.isBullet) roomObject = body;
        }
        if (this.room.roomWorld.bulletsStopOnPlayer && player && bulletA) player.stopFull();
        if (this.room.roomWorld.bulletsStopOnObject && roomObject && bulletA) roomObject.stopFull();
        this.removeIdleBullets();
    }
    removeIdleBullets() {
        if (0 === this.room.roomWorld.removeBulletsStateIds.length) return;
        for (let stateId of this.room.roomWorld.removeBulletsStateIds){
            this.room.state.removeBody(stateId);
            this.room.roomWorld.removeBulletsStateIds.splice(this.room.roomWorld.removeBulletsStateIds.indexOf(stateId), 1);
        }
    }
    beforeResolveCollision(evt) {
        if (!this.room.roomWorld.allowPassWallsFromBelow) return;
        for (let contact of evt.contactEquations){
            let playerBody = this.getPlayerBody(contact);
            let wallBody = this.getWallBody(contact);
            if (!playerBody || !wallBody || wallBody.isWorldWall) return;
            if (playerBody.position[1] > wallBody.position[1]) contact.enabled = false;
        }
    }
    /**
     * Collision cases:
     * - player hit a player
     * - player hit an object (any type, animations, NPC, etc.)
     * - player hit change point
     * - player hit wall
     * - object hit object (bullets will hit objects)
     * - object hit wall
     * @param evt
     * @returns {{continue: boolean, wall, objectBody}|boolean|void}
     */ onCollisionsBegin(evt) {
        let bodyA = evt.bodyA, bodyB = evt.bodyB, playerBody = false, otherBody = false, roomObjectBody = false;
        if (bodyA.playerId && bodyB.playerId) return this.playerHitPlayerBegin(bodyA, bodyB);
        if (bodyA.playerId) {
            playerBody = bodyA;
            otherBody = bodyB;
        }
        if (bodyB.playerId) {
            playerBody = bodyB;
            otherBody = bodyA;
        }
        if (playerBody && otherBody.isRoomObject) return this.playerHitObjectBegin(playerBody, otherBody);
        if (playerBody && otherBody.changeScenePoint) return this.playerHitChangePointBegin(playerBody, otherBody);
        if (playerBody && otherBody.isWall) return this.playerHitWallBegin(playerBody, otherBody);
        if (bodyA.isRoomObject && bodyB.isRoomObject) return this.objectHitObjectBegin(bodyA, bodyB);
        if (bodyA.isRoomObject) {
            roomObjectBody = bodyA;
            otherBody = bodyB;
        }
        if (bodyB.isRoomObject) {
            roomObjectBody = bodyB;
            otherBody = bodyA;
        }
        if (roomObjectBody && otherBody.isWall) this.objectHitWallBegin(roomObjectBody, otherBody);
    }
    onCollisionsEnd(evt) {
        let bodyA = evt.bodyA, bodyB = evt.bodyB, playerBody = false, otherBody = false, roomObjectBody = false;
        if (evt.bodyA.playerId && evt.bodyB.playerId) this.playerHitPlayerEnd(evt.bodyA, evt.bodyB);
        if (bodyA.playerId) {
            playerBody = bodyA;
            otherBody = bodyB;
        }
        if (bodyB.playerId) {
            playerBody = bodyB;
            otherBody = bodyA;
        }
        if (playerBody && otherBody.isRoomObject) return this.playerHitObjectEnd(playerBody, otherBody);
        if (playerBody && otherBody.isWall) return this.playerHitWallEnd(playerBody, otherBody);
        if (bodyA.isRoomObject && bodyB.isRoomObject) this.objectHitObjectEnd(bodyA, bodyB);
        if (bodyA.isRoomObject) {
            roomObjectBody = bodyA;
            otherBody = bodyB;
        }
        if (bodyB.isRoomObject) {
            roomObjectBody = bodyB;
            otherBody = bodyA;
        }
        if (roomObjectBody && otherBody.isWall) return this.objectHitWallEnd(roomObjectBody, otherBody);
    }
    playerHitPlayerBegin(bodyA, bodyB) {
        // @NOTE: we could run specific events when a player collides with another player.
        // Logger.debug('Player hit player begin.', bodyA.playerId, bodyB.playerId);
        this.room.events.emit('reldens.playerHitPlayer', {
            bodyA,
            bodyB
        });
    }
    playerHitPlayerEnd(bodyA, bodyB) {
        // Logger.debug('Player hit player end.', bodyA.playerId, bodyB.playerId);
        // player stops pushing a player:
        bodyA.stopFull();
        bodyB.stopFull();
        this.room.events.emit('reldens.playerHitPlayerEnd', {
            bodyA,
            bodyB
        });
    }
    playerHitObjectBegin(playerBody, otherBody) {
        // Logger.debug('Player hit object being.', playerBody.playerId, otherBody.bodyState?.key);
        this.room.events.emit('reldens.startPlayerHitObjectBegin', {
            playerBody,
            otherBody
        });
        // if the player collides with something we need to restart the pathfinder if it was active:
        this.findAlternativePath(playerBody);
        // now the collision manager only run the object hit action:
        if (otherBody.roomObject && sc.isFunction(otherBody.roomObject.onHit)) otherBody.roomObject.onHit({
            bodyA: playerBody,
            bodyB: otherBody,
            room: this.room
        });
        this.room.events.emit('reldens.endPlayerHitObjectBegin', {
            playerBody,
            otherBody
        });
    }
    playerHitObjectEnd(playerBody, otherBody) {
        // Logger.debug('Player hit object end.', playerBody.playerId, otherBody.bodyState?.key);
        let result = {
            stopFull: true,
            continue: true
        };
        this.room.events.emit('reldens.playerHitObjectEnd', {
            playerBody,
            result
        });
        if (!result.continue) return false;
        playerBody.stopFull(result.stopFull);
    }
    playerHitWallBegin(playerBody, wallBody) {
        // Logger.debug('Player hit wall being.', playerBody.playerId);
        this.room.events.emit('reldens.playerHitWallBegin', {
            playerBody,
            wallBody
        });
    }
    playerHitWallEnd(playerBody, wallBody) {
        // Logger.debug('Player hit wall end.', playerBody.playerId);
        this.room.events.emit('reldens.startPlayerHitWallEnd', {
            playerBody,
            wallBody
        });
        // @NOTE: we can use wall.material to trigger an action over the player, like:
        // wall.material = lava > reduce player.hp in every step
        // if the player collides with something we need to restart the pathfinder if it was active:
        if (playerBody.autoMoving && 1 < playerBody.autoMoving.length) {
            let destPoint = playerBody.autoMoving.pop();
            playerBody.moveToPoint({
                column: destPoint[0],
                row: destPoint[1]
            });
            return;
        }
        if (playerBody.world && !playerBody.world.applyGravity) playerBody.stopFull(true);
        this.room.events.emit('reldens.endPlayerHitWallEnd', {
            playerBody,
            wallBody
        });
    }
    playerHitChangePointBegin(playerBody, changePoint) {
        // Logger.debug('Player hit change point begin.', playerBody.playerId, changePoint.changeScenePoint);
        this.room.events.emit('reldens.startPlayerHitChangePoint', {
            collisionsManager: this,
            playerBody,
            changePoint
        });
        playerBody.resetAuto();
        // check if the player is not changing scenes already:
        let isChangingScene = sc.get(playerBody, 'isChangingScene', false);
        if (isChangingScene) {
            // @NOTE: if the player is already changing scene do nothing.
            Logger.info('Player is busy for a change point: ' + playerBody.playerId);
            return false;
        }
        let playerSchema = this.room.playerBySessionIdFromState(playerBody.playerId);
        let contactClient = this.room.getClientById(playerBody.playerId);
        let isGuest = -1 !== contactClient.auth.email?.indexOf(this.guestEmailDomain);
        if (!this.room.validateRoom(changePoint.changeScenePoint, isGuest, true)) {
            Logger.info('Guest Player hit change point but is not allowed to the room: ' + playerSchema.state.scene);
            this.room.events.emit('reldens.guestInvalidChangePoint', {
                collisionsManager: this,
                playerBody,
                changePoint,
                playerSchema,
                contactClient,
                isGuest
            });
            return false;
        }
        let playerPosition = {
            x: playerBody.position[0],
            y: playerBody.position[1]
        };
        this.room.state.positionPlayer(playerBody.playerId, playerPosition);
        let changeData = {
            prev: playerSchema.state.scene,
            next: changePoint.changeScenePoint
        };
        // Logger.debug('Player "'+playerBody.playerId+'" hit change point.', changeData);
        playerBody.isChangingScene = true;
        // @NOTE: we do not need to change back the isChangingScene property back to false since in the new
        // scene a new body will be created with the value set to false by default.
        this.room.nextSceneInitialPosition(contactClient, changeData, playerBody).catch((error)=>{
            Logger.error('There was an error while setting the next scene initial position.', error);
        });
        this.room.events.emit('reldens.endPlayerHitChangePoint', {
            collisionsManager: this,
            playerSchema,
            playerBody,
            changePoint,
            changeData
        });
    }
    objectHitObjectBegin(bodyA, bodyB) {
        // Logger.debug('Object hit object begin.', bodyA.bodyState?.key, bodyB.bodyState?.key);
        this.room.events.emit('reldens.startObjectHitObject', {
            bodyA,
            bodyB
        });
        let aPriority = sc.hasOwn(bodyA, 'hitPriority');
        let bPriority = sc.hasOwn(bodyB, 'hitPriority');
        let onHitData = {
            bodyA: bodyA,
            bodyB: bodyB,
            room: this.room
        };
        let priorityObject = !aPriority && !bPriority || aPriority && (!bPriority || aPriority > bPriority) ? bodyA : bodyB;
        if (priorityObject.roomObject && sc.isFunction(priorityObject.roomObject?.onHit)) priorityObject.roomObject.onHit(onHitData);
        if (bodyA.isBullet) bodyA.roomObject.removeBullet(bodyA);
        if (bodyB.isBullet) bodyB.roomObject.removeBullet(bodyB);
        this.findAlternativePath(bodyA);
        this.findAlternativePath(bodyB);
        this.room.events.emit('reldens.endObjectHitObject', {
            bodyA,
            bodyB,
            priorityObject
        });
    }
    objectHitObjectEnd(bodyA, bodyB) {
        // Logger.debug('Object hit object end.', bodyA.bodyState?.key, bodyB.bodyState?.key);
        this.bodyFullStop(bodyA);
        this.bodyFullStop(bodyB);
        this.room.events.emit('reldens.objectHitObjectEnd', {
            bodyA,
            bodyB
        });
    }
    objectHitWallBegin(objectBody, wall) {
        // Logger.debug('Object hit wall begin.', objectBody.bodyState?.key);
        let event = {
            objectBody,
            wall,
            continue: true
        };
        this.room.events.emit('reldens.objectHitWallBegin', event);
        if (!event.continue) return event;
        if (objectBody.isBullet) objectBody.roomObject.removeBullet(objectBody);
        return event;
    }
    objectHitWallEnd(objectBody) {
        // Logger.debug('Object hit wall end.', objectBody.bodyState?.key);
        this.room.events.emit('reldens.startObjectHitWall', {
            objectBody
        });
        // @NOTE: we can use wall.material to trigger an action over the player, like:
        // wall.material = lava > reduce player.hp in every step
        // if the player collides with something we need to restart the pathfinder if it was active:
        this.resetObjectAutoMove(objectBody);
        this.room.events.emit('reldens.endObjectHitWall', {
            objectBody
        });
    }
    bodyFullStop(body) {
        if (!body) return false;
        let isBodyAMoving = body.autoMoving && 0 < body.autoMoving.length;
        if (!isBodyAMoving && !body.isBullet && body.isRoomObject && body instanceof PhysicalBody) body.stopFull(true);
        if (body.isBullet) body.roomObject.removeBullet(body);
    }
    findAlternativePath(body) {
        if (!body.autoMoving || 0 === body.autoMoving.length) return false;
        // Logger.debug('Find alternative path for body "'+body.bodyLogKey()+'".');
        let currentPoint = body.autoMoving.shift();
        let destPoint = body.autoMoving.pop();
        body.autoMoving = body.getPathFinder().findPath(currentPoint, destPoint);
    }
    resetObjectAutoMove(body) {
        if (!(body instanceof PhysicalBody)) return;
        if (!body.world) return;
        let lastPoint = false;
        if (sc.isArray(body.autoMoving) && 0 < body.autoMoving.length) lastPoint = body.autoMoving.pop();
        if (!lastPoint) return;
        body.world.applyGravity ? body.stopFull(true) : body.stopX(true);
        body.autoMovingResetRetries++;
        if (body.autoMovingResetMaxRetries === body.autoMovingResetRetries) {
            body.autoMovingResetRetries = 0;
            // Logger.debug('Reset object auto-move, returning to original point.');
            return body.moveToOriginalPoint();
        }
        /*
        Logger.debug(
            'Body "'+body.bodyLogKey()+'" auto-move to points: '+lastPoint[0]+' / '+lastPoint[1]+'.'
            +' Retries: '+body.autoMovingResetRetries+' / '+body.autoMovingResetMaxRetries
        );
        */ body.moveToPoint({
            column: lastPoint[0],
            row: lastPoint[1]
        });
    }
    getWallBody(evt) {
        let { bodyA, bodyB } = evt;
        return bodyA && bodyA.isWall ? bodyA : bodyB && bodyB.isWall ? bodyB : false;
    }
    getObjectBody(evt) {
        let { bodyA, bodyB } = evt;
        return bodyA && bodyA.isRoomObject ? bodyA : bodyB && bodyB.isRoomObject ? bodyB : false;
    }
    getPlayerBody(evt) {
        let { bodyA, bodyB } = evt;
        return bodyA && bodyA.playerId ? bodyA : bodyB && bodyB.playerId ? bodyB : false;
    }
}
module.exports.CollisionsManager = CollisionsManager;

},{"2bac9eebd1669ae7":"6Rs7T","6df25a7483afe879":"@reldens/utils"}],"6Rs7T":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PlayerBody
 *
 */ const { Body, vec2 } = require("58640466804c3117");
const { GameConst } = require("7021c6716e058072");
const { Logger, sc } = require("b47ac5fab7662b94");
class PhysicalBody extends Body {
    constructor(options){
        super(options);
        /** @type ?BodyState **/ this.bodyState = null;
        this.animationBasedOnPress = options.animationBasedOnPress;
        this.diagonalHorizontal = options.diagonalHorizontal;
        this.autoMoving = false;
        this.pathFinder = false;
        this.isChangingScene = false;
        this.currentCol = false;
        this.currentRow = false;
        this.originalCol = false;
        this.originalRow = false;
        this.jumpSpeed = sc.get(options, 'jumpSpeed', 540);
        this.jumpTimeMs = sc.get(options, 'jumpTimeMs', 180);
        this.movementSpeed = sc.get(options, 'movementSpeed', 180);
        this.speedThreshold = sc.get(options, 'speedThreshold', 0.1);
        this.applySpeedThresholdOnBullets = sc.get(options, 'applySpeedThresholdOnBullets', true);
        this.worldPositionPrecision = sc.get(options, 'worldPositionPrecision', 0);
        this.worldSpeedPrecision = sc.get(options, 'worldSpeedPrecision', 0);
        this.autoMovingResetMaxRetries = sc.get(options, 'autoMovingResetMaxRetries', 5);
        this.autoMovingResetRetries = 0;
        this.moveToOriginalPointWithDelay = sc.get(options, 'moveToOriginalPointWithDelay', 100);
        this.moveToOriginalPointTimer = false;
        this.originalSpeed = {
            x: 0,
            y: 0
        };
        this.speedToNextMaxRetries = sc.get(options, 'speedToNextMaxRetries', 3);
        this.speedToNextRetryCounter = {
            col: 0,
            row: 0,
            retries: 0
        };
        this.lastSetCollisionGroup = false;
        this.blockBodyStates = sc.get(options, 'blockBodyStates', [
            GameConst.STATUS.DISABLED,
            GameConst.STATUS.DEATH
        ]);
    }
    integrate(dt) {
        if (-1 !== this.blockBodyStates.indexOf(this.bodyState?.inState)) // Logger.debug('Body blocked by state.', {key: this.bodyState?.key, state: this.bodyState?.inState});
        return;
        let minv = this.invMass, f = this.force, pos = this.position, velocity = this.velocity;
        // save old position
        vec2.copy(this.previousPosition, this.position);
        this.previousAngle = this.angle;
        // velocity update
        if (!this.fixedRotation) this.angularVelocity += this.angularForce * this.invInertia * dt;
        let integrateFhMinv = vec2.create();
        vec2.scale(integrateFhMinv, f, dt * minv);
        vec2.multiply(integrateFhMinv, this.massMultiplier, integrateFhMinv);
        vec2.add(velocity, integrateFhMinv, velocity);
        // CCD
        if (!this.integrateToTimeOfImpact(dt)) {
            let integrateVelodt = vec2.create();
            // regular position update
            vec2.scale(integrateVelodt, velocity, dt);
            vec2.add(pos, pos, integrateVelodt);
            if (!this.fixedRotation) this.angle += this.angularVelocity * dt;
        }
        this.speedToNext();
        this.aabbNeedsUpdate = true;
        this.velocity[0] = Math.abs(this.velocity[0]) < 0.0001 ? 0 : sc.roundToPrecision(this.velocity[0], 4);
        this.velocity[1] = Math.abs(this.velocity[1]) < 0.0001 ? 0 : sc.roundToPrecision(this.velocity[1], 4);
        if (Math.abs(this.velocity[0]) < 1e-3) this.stopX();
        if (Math.abs(this.velocity[1]) < 1e-3) this.stopY();
        this.updateBodyState();
    }
    speedToNext() {
        if (!this.autoMoving || 0 === this.autoMoving.length) {
            // Logger.debug('Body "'+this.bodyLogKey()+'" is not autoMoving.');
            this.setShapesCollisionGroup(this.originalCollisionGroup);
            return;
        }
        if (!this.autoMoving[0]) {
            Logger.error('Missing autoMoving first index.');
            this.setShapesCollisionGroup(this.originalCollisionGroup);
            return;
        }
        let autoMovingCurrentCol = this.autoMoving[0][0];
        let autoMovingCurrentRow = this.autoMoving[0][1];
        if (0 !== this.speedToNextRetryCounter.col && this.speedToNextRetryCounter.col === autoMovingCurrentCol && 0 !== this.speedToNextRetryCounter.row && this.speedToNextRetryCounter.row === autoMovingCurrentRow && 0 !== this.velocity[0] && 0 !== this.velocity[1]) this.speedToNextRetryCounter.retries++;
        if (this.speedToNextMaxRetries === this.speedToNextRetryCounter.retries) {
            /*
            Logger.debug(
                'Body "'+this.bodyLogKey()+'" speed to next max retries reached: '
                +this.speedToNextRetryCounter.retries+' / '+this.speedToNextMaxRetries
            );
            */ this.speedToNextRetryCounter.col = 0;
            this.speedToNextRetryCounter.row = 0;
            let fromPoint = this.autoMoving.shift();
            let toPoint = this.autoMoving.pop();
            this.stopFull(true);
            this.alignToTile();
            this.autoMoving = this.getPathFinder().findPath(fromPoint, toPoint);
            this.speedToNextRetryCounter.retries = 0;
            return;
        }
        this.speedToNextRetryCounter.col = autoMovingCurrentCol;
        this.speedToNextRetryCounter.row = autoMovingCurrentRow;
        /*
        Logger.debug(
            'Body "'+this.bodyLogKey()+'" speed to next point from > to: '
            +this.currentCol+' / '+this.currentRow+' > '+autoMovingCurrentCol+' / '+ autoMovingCurrentRow
            +' - Counters col / row: '+this.speedToNextRetryCounter.col+' / '+this.speedToNextRetryCounter.row
            +' - Retry: '+this.speedToNextRetryCounter.retries+' / '+this.speedToNextMaxRetries
        );
        */ if (this.currentCol === autoMovingCurrentCol && this.currentRow === autoMovingCurrentRow) {
            // if the point was reach then remove it to process the next one:
            this.autoMoving.shift();
            if (0 === this.autoMoving.length) // if there are no more points to process then stop the body and reset the path:
            this.stopAutoMoving();
            return;
        }
        if (this.currentCol === autoMovingCurrentCol && 0 !== this.velocity[0]) {
            this.stopX();
            // Logger.debug('Body "'+this.bodyLogKey()+'" speed to next stop X.');
            this.alignToTile();
        }
        if (this.currentCol > autoMovingCurrentCol) this.initMove(GameConst.LEFT, true);
        if (this.currentCol < autoMovingCurrentCol) this.initMove(GameConst.RIGHT, true);
        if (this.currentRow === autoMovingCurrentRow && 0 !== this.velocity[1]) {
            this.stopY();
            // Logger.debug('Body "'+this.bodyLogKey()+'" speed to next stop Y.');
            this.alignToTile();
        }
        if (this.currentRow > autoMovingCurrentRow) this.initMove(GameConst.UP, true);
        if (this.currentRow < autoMovingCurrentRow) this.initMove(GameConst.DOWN, true);
        this.updateCurrentPoints();
    }
    stopAutoMoving() {
        this.stopFull();
        this.resetAuto();
        this.alignToTile();
        this.setShapesCollisionGroup(this.originalCollisionGroup);
    // Logger.debug('Body "' + this.bodyLogKey() + '" speed to next ended.');
    }
    alignToTile() {
        if (!this.currentCol || !this.currentRow) this.updateCurrentPoints();
        let targetX = this.currentCol * this.worldTileWidth;
        let targetY = this.currentRow * this.worldTileHeight;
        let tolerance = 0.01;
        let distX = targetX - this.position[0];
        let distY = targetY - this.position[1];
        if (Math.abs(distX) <= tolerance && Math.abs(distY) <= tolerance) {
            // Logger.debug('Aligning to tile col / row: '+this.currentCol+' / '+this.currentRow, {targetX, targetY});
            this.position[0] = targetX;
            this.position[1] = targetY;
        }
    }
    updateBodyState() {
        if (!sc.hasOwn(this.bodyState, 'x') || !sc.hasOwn(this.bodyState, 'y')) return;
        // only update the body if it moves:
        if (this.isNotMoving()) {
            // @NOTE: careful this will overload the logs.
            // Logger.debug('Body "'+this.bodyLogKey()+'" is not moving.');
            this.bodyState.mov = false;
            return;
        }
        let positionX = sc.roundToPrecision(this.position[0], 0);
        let positionY = sc.roundToPrecision(this.position[1], 0);
        if (!positionX || !positionY) return;
        // update position:
        if (this.bodyState.x !== positionX) // Logger.debug('Update body "'+this.bodyLogKey()+'" state X: '+this.bodyState.x +' / '+ positionX);
        this.bodyState.x = sc.roundToPrecision(positionX, this.worldPositionPrecision);
        if (this.bodyState.y !== positionY) // Logger.debug('Update body "'+this.bodyLogKey()+'" state Y: '+this.bodyState.y +' / '+ positionY);
        this.bodyState.y = sc.roundToPrecision(positionY, this.worldPositionPrecision);
        // start or stop animation:
        let speedX = sc.roundToPrecision(this.velocity[0], this.worldSpeedPrecision);
        let speedY = sc.roundToPrecision(this.velocity[1], this.worldSpeedPrecision);
        // Logger.debug('Body "'+this.bodyLogKey()+'" speed X / Y: '+speedX+' / '+speedY);
        this.bodyState.mov = 0 !== speedX || 0 !== speedY;
        // @NOTE: with the key word "bullet" we will refer to bodies that will be created, moved, and  destroyed on
        // hit or that reach the world boundaries.
        this.removeInvalidStateBulletBody();
    }
    bodyLogKey() {
        if (this.playerId) return 'PJ-' + this.playerId;
        return this.bodyState?.key;
    }
    removeInvalidStateBulletBody() {
        if (!this.isBullet) return;
        if (this.isOutOfWorldBounds() || this.hasInvalidSpeed()) {
            this.world.removeBodies.push(this);
            if (this.bodyStateId) this.world.removeBulletsStateIds.push(this.bodyStateId);
        }
    }
    hasInvalidSpeed() {
        if (!this.applySpeedThresholdOnBullets && this.isBullet) return false;
        let bodySpeedX = this.isBullet ? this.originalSpeed.x : this.movementSpeed;
        let bodySpeedY = this.isBullet ? this.originalSpeed.x : this.movementSpeed;
        let minimumSpeedX = bodySpeedX * this.speedThreshold;
        let minimumSpeedY = bodySpeedY * this.speedThreshold;
        let speedX = Math.abs(this.velocity[0]);
        if (0 < speedX && speedX < minimumSpeedX) {
            Logger.debug('Invalid speed, stopping X:', {
                speedX,
                minimumSpeedX
            });
            this.stopX(true);
        }
        let speedY = Math.abs(this.velocity[1]);
        if (0 < speedY && speedY < minimumSpeedY) {
            Logger.debug('Invalid speed, stopping Y.', {
                speedY,
                minimumSpeedY
            });
            this.stopY(true);
        }
        return 0 === this.velocity[0] && 0 === this.velocity[1];
    }
    isOutOfWorldBounds() {
        return 0 > this.position[0] || this.position[0] > this.worldWidth * this.worldTileWidth || 0 > this.position[1] || this.position[1] > this.worldHeight * this.worldTileHeight;
    }
    isNotMoving() {
        // @TODO - BETA - Refactor to replace the threshold and accurately consider the normalized speed.
        let minimumSpeed = this.movementSpeed * this.speedThreshold;
        let velocityX = sc.roundToPrecision(this.velocity[0]);
        let velocityY = sc.roundToPrecision(this.velocity[1]);
        if (this.velocity[0] !== 0 && Math.abs(velocityX) < minimumSpeed) {
            this.position[0] = sc.roundToPrecision(this.position[0] + (0 < velocityX ? 1 : -1));
            this.stopX(true);
        }
        if (this.velocity[1] !== 0 && Math.abs(velocityY) < minimumSpeed && !this.world.applyGravity) {
            this.position[1] = this.position[1] + (0 < velocityY ? 1 : -1);
            this.stopY(true);
        }
        let positionX = sc.roundToPrecision(this.position[0], 0);
        let positionY = sc.roundToPrecision(this.position[1], 0);
        return this.bodyState.x === positionX && this.bodyState.y === positionY && velocityX === 0 && velocityY === 0;
    }
    resetAuto() {
        this.autoMoving = false;
    }
    initMove(direction, isAuto = false) {
        if (!isAuto) // if user moves the player then reset the auto move.
        this.resetAuto();
        if (!this.world) return;
        if (this.world.allowSimultaneous) {
            this.simultaneousKeyPressMovement(direction);
            return;
        }
        return this.singleKeyPressMovement(direction);
    }
    singleKeyPressMovement(direction) {
        // if body is moving then avoid multiple key press at the same time:
        if (direction === GameConst.RIGHT && 0 === this.velocity[1]) this.velocity[0] = this.movementSpeed;
        if (direction === GameConst.LEFT && 0 === this.velocity[1]) this.velocity[0] = -this.movementSpeed;
        if (direction === GameConst.UP && 0 === this.velocity[0]) this.moveUp(this.movementSpeed);
        if (direction === GameConst.DOWN && 0 === this.velocity[0] && !this.world.applyGravity) this.velocity[1] = this.movementSpeed;
    }
    simultaneousKeyPressMovement(direction) {
        if (!this.world.applyGravity) {
            this.simultaneousMovementDiagonalSpeedFix(direction, this.movementSpeed);
            return;
        }
        if (direction === GameConst.RIGHT) {
            this.validateAndSetDirection(direction, this.diagonalHorizontal, this.velocity[1]);
            this.velocity[0] = this.movementSpeed;
        }
        if (direction === GameConst.LEFT) {
            this.validateAndSetDirection(direction, this.diagonalHorizontal, this.velocity[1]);
            this.velocity[0] = -this.movementSpeed;
        }
        if (direction === GameConst.UP) {
            this.validateAndSetDirection(direction, !this.diagonalHorizontal, this.velocity[0]);
            this.moveUp(this.movementSpeed);
        }
    }
    simultaneousMovementDiagonalSpeedFix(direction, speed) {
        // @TODO - BETA - calculate normalized speed once and save it in the object to avoid recalculation.
        let dx = 0 === this.velocity[0] ? 0 : 0 > this.velocity[0] ? -1 : 1;
        let dy = 0 === this.velocity[1] ? 0 : 0 > this.velocity[1] ? -1 : 1;
        if (direction === GameConst.RIGHT) dx = 1;
        if (direction === GameConst.LEFT) dx = -1;
        if (direction === GameConst.UP) dy = -1;
        if (direction === GameConst.DOWN) dy = 1;
        let normalization = this.normalizeSpeed(dx, dy);
        this.velocity[0] = speed * dx * normalization;
        this.velocity[1] = speed * dy * normalization;
        if (direction === GameConst.RIGHT || direction === GameConst.LEFT) this.validateAndSetDirection(direction, this.diagonalHorizontal, this.velocity[1]);
        if (direction === GameConst.UP || direction === GameConst.DOWN) this.validateAndSetDirection(direction, !this.diagonalHorizontal, this.velocity[0]);
    }
    moveUp(speed) {
        if (!this.world.applyGravity) {
            this.velocity[1] = -speed;
            return;
        }
        if (!this.canJump()) return;
        this.velocity[1] = -this.jumpSpeed;
        setTimeout(()=>{
            this.stopY();
        }, this.jumpTimeMs);
    }
    calculateMagnitude(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    checkNonZeroComponents(x, y) {
        return Math.abs(x) > 0 || Math.abs(y) > 0;
    }
    normalizeSpeed(x, y) {
        return this.checkNonZeroComponents(x, y) ? 1 / this.calculateMagnitude(x, y) : 0;
    }
    validateAndSetDirection(direction, diagonal, velocity) {
        if ((this.animationBasedOnPress || this.bodyState.autoDirection) && (diagonal || 0 === velocity)) this.bodyState.dir = direction;
    }
    stopMove() {
        this.world && this.world.applyGravity ? this.stopX() : this.stopFull();
    }
    stopFull(pStop = false) {
        this.velocity[0] = 0;
        if (!this.world?.applyGravity) this.velocity[1] = 0;
        this.angularVelocity = 0;
        this.angularForce = 0;
        this.pStop = pStop;
    }
    stopX(pStop = false) {
        this.velocity[0] = 0;
        this.angularVelocity = 0;
        this.angularForce = 0;
        this.pStop = pStop;
    }
    stopY(pStop = false) {
        this.velocity[1] = 0;
        this.angularVelocity = 0;
        this.angularForce = 0;
        this.pStop = pStop;
    }
    moveToPoint(toPoint) {
        this.resetAuto();
        this.updateCurrentPoints();
        let fromPoints = [
            this.currentCol,
            this.currentRow
        ];
        let toPoints = [
            toPoint.column,
            toPoint.row
        ];
        let pathFinder = this.getPathFinder();
        if (!pathFinder) {
            // Logger.debug('Pathfinder not set in body.', {id: this.id, key: this.bodyState?.key});
            this.setShapesCollisionGroup(this.originalCollisionGroup);
            return false;
        }
        this.autoMoving = pathFinder.findPath(fromPoints, toPoints);
        if (!this.autoMoving) {
            this.setShapesCollisionGroup(this.originalCollisionGroup);
            this.stopMove();
        }
        return this.autoMoving;
    }
    updateCurrentPoints() {
        // if the player disconnects, and it's the only one on the room the world would be destroyed at this point:
        if (!this.world) // Logger.debug('Missing world on physical body.', {id: this.id, key: this.bodyState?.key});
        return;
        let { currentCol, currentRow } = this.positionToTiles(this.position[0], this.position[1]);
        if (!this.originalCol) // Logger.debug('Setting body ID "'+this.id+'" (key: "'+this.bodyState.key+'") original col: '+currentCol);
        this.originalCol = currentCol;
        if (!this.originalRow) // Logger.debug('Setting body ID "'+this.id+'" (key: "'+this.bodyState.key+'") original row: '+currentRow);
        this.originalRow = currentRow;
        this.currentCol = currentCol;
        this.currentRow = currentRow;
        return this;
    }
    moveToOriginalPoint() {
        if (!this.originalCol || !this.originalRow) this.updateCurrentPoints();
        /*
        Logger.debug(
            'Moving body ID "'+this.id+'" (key? "'+this.bodyState.key+'") to: '+this.currentCol+' / '+this.currentRow
        );
        */ if (this.disableObjectsCollisionsOnReturn) this.setShapesCollisionGroup(0);
        // stop any current movement before starting a new one:
        this.stopFull();
        if (0 === this.moveToOriginalPointWithDelay) {
            this.moveToPoint({
                column: this.originalCol,
                row: this.originalRow
            });
            return;
        }
        // introduce a small delay to ensure collision has resolved:
        this.moveToOriginalPointTimer = setTimeout(()=>{
            this.moveToPoint({
                column: this.originalCol,
                row: this.originalRow
            });
        }, this.moveToOriginalPointWithDelay);
    }
    setShapesCollisionGroup(collisionGroup) {
        if (this.lastSetCollisionGroup === collisionGroup) return;
        this.lastSetCollisionGroup = collisionGroup;
        for (let shape of this.shapes)// Logger.debug('Set collision group on "'+this.bodyLogKey()+'": '+collisionGroup);
        shape.collisionGroup = collisionGroup;
    }
    canJump() {
        for (let c of this.world.narrowphase.contactEquations){
            let player = c.bodyA === this ? c.bodyA : c.bodyB;
            let wall = c.bodyA.isWall ? c.bodyA : c.bodyB;
            if (player.playerId && 0 <= Number(Number(player.velocity[1]).toFixed(2)) && wall.isWall && !wall.isWorldWall && player.position[1] < wall.position[1]) return true;
        }
        return false;
    }
    positionToTiles(x, y) {
        let currentCol = Math.round((x - this.worldTileWidth / 2) / this.worldTileWidth);
        currentCol = currentCol >= 0 ? currentCol > this.worldWidth ? this.worldWidth : currentCol : 0;
        let currentRow = Math.round((y - this.worldTileHeight / 2) / this.worldTileHeight);
        currentRow = currentRow >= 0 ? currentRow > this.worldHeight ? this.worldHeight : currentRow : 0;
        return {
            currentCol,
            currentRow
        };
    }
    getPathFinder() {
        // @NOTE: body pathfinder is for when the body has its own respawn area and grid, the world pathfinder is for
        // any object in the room that could be anywhere in the room.
        return this.pathFinder ? this.pathFinder : this.world?.pathFinder;
    }
    get worldTileWidth() {
        return this.world?.mapJson?.tilewidth;
    }
    get worldTileHeight() {
        return this.world?.mapJson?.tileheight;
    }
    get worldWidth() {
        return this.world?.mapJson?.width;
    }
    get worldHeight() {
        return this.world?.mapJson?.height;
    }
}
module.exports.PhysicalBody = PhysicalBody;

},{"58640466804c3117":"p2","7021c6716e058072":"iznl5","b47ac5fab7662b94":"@reldens/utils"}],"e1fPm":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - P2world
 *
 */ const { World, Body, Box } = require("22fc0ec2668b15b0");
const { PhysicalBody } = require("89b97910eb15282e");
const { ObjectBodyState } = require("bf8e7d8088ffa02");
const { PathFinder } = require("ca96e46ea11ece0d");
const { TypeDeterminer } = require("c264acfd264f5635");
const { GameConst } = require("c03ca356032f25a2");
const { RoomsConst } = require("66ecc31a8f2dd920");
const { WorldConst } = require("2b9afdca425e5d96");
const { ErrorManager, Logger, sc } = require("521f0bfcfa0908ee");
class P2world extends World {
    constructor(options){
        // @TODO - BETA - Remove this class, create a driver for the physics engine.
        super(options);
        this.events = sc.get(options, 'events', false);
        this.roomId = sc.get(options, 'roomId', false);
        this.sceneName = sc.get(options, 'sceneName', false);
        this.sceneTiledMapFile = sc.get(options, 'roomMap', false);
        this.config = sc.get(options, 'config', false);
        this.validateRequiredProperties(options);
        this.saveMapData(options);
        this.objectsManager = sc.get(options, 'objectsManager', false);
        this.applyGravity = sc.get(options.worldConfig, 'applyGravity', false);
        this.gravity = sc.get(options.worldConfig, 'gravity', [
            0,
            0
        ]);
        this.globalStiffness = sc.get(options.worldConfig, 'globalStiffness', 100000000);
        this.globalRelaxation = sc.get(options.worldConfig, 'globalRelaxation', 10);
        this.useFixedWorldStep = sc.get(options.worldConfig, 'useFixedWorldStep', true);
        this.timeStep = sc.get(options.worldConfig, 'timeStep', 0.04);
        this.maxSubSteps = sc.get(options.worldConfig, 'maxSubSteps', 1);
        this.movementSpeed = sc.get(options.worldConfig, 'movementSpeed', 180);
        this.allowPassWallsFromBelow = sc.get(options.worldConfig, 'allowPassWallsFromBelow', false);
        this.jumpSpeed = sc.get(options.worldConfig, 'jumpSpeed', 0);
        this.jumpTimeMs = sc.get(options.worldConfig, 'jumpTimeMs', 0);
        this.tryClosestPath = sc.get(options.worldConfig, 'tryClosestPath', false);
        this.onlyWalkable = sc.get(options.worldConfig, 'onlyWalkable', false);
        this.wallsMassValue = sc.get(options.worldConfig, 'wallsMassValue', 1);
        this.playerMassValue = sc.get(options.worldConfig, 'playerMassValue', 1);
        this.bulletsStopOnPlayer = sc.get(options.worldConfig, 'bulletsStopOnPlayer', true);
        this.bulletsStopOnObject = sc.get(options.worldConfig, 'bulletsStopOnObject', true);
        this.disableObjectsCollisionsOnChase = sc.get(options.worldConfig, 'disableObjectsCollisionsOnChase', false);
        this.disableObjectsCollisionsOnReturn = sc.get(options.worldConfig, 'disableObjectsCollisionsOnReturn', true);
        this.collisionsGroupsByType = sc.get(options.worldConfig, 'collisionsGroupsByType', true);
        this.groupWallsVertically = sc.get(options.worldConfig, 'groupWallsVertically', false);
        this.groupWallsHorizontally = sc.get(options.worldConfig, 'groupWallsHorizontally', false);
        this.allowSimultaneous = sc.get(options, 'allowSimultaneous', false);
        this.allowChangePoints = sc.get(options, 'allowChangePoints', true);
        this.allowRoomObjectsCreation = sc.get(options, 'allowRoomObjectsCreation', true);
        this.allowBodiesWithState = sc.get(options, 'allowBodiesWithState', true);
        this.usePathFinder = sc.get(options, 'usePathFinder', true);
        this.respawnAreas = false;
        this.removeBodies = [];
        this.removeBulletsStateIds = [];
        this.type = sc.get(options, 'type', WorldConst.WORLD_TYPES.NO_GRAVITY_2D);
        this.totalBodiesCount = 0;
        this.totalBodiesCreated = 0;
        this.queueBodies = [];
        this.enablePathFinder();
        this.enableWorldDateTime();
        this.worldKey = sc.randomChars(16);
        this.limitsBodyType = sc.get(options.worldConfig, 'limitsBodyType', Body.STATIC);
        this.wallBodyType = sc.get(options.worldConfig, 'wallBodyType', Body.STATIC);
        this.changePointsBodyType = sc.get(options.worldConfig, 'changePointsBodyType', Body.STATIC);
        this.worldObjectBodyType = sc.get(options.worldConfig, 'worldObjectBodyType', Body.DYNAMIC);
        this.playersBodyType = sc.get(options.worldConfig, 'playersBodyType', Body.DYNAMIC);
        this.bulletsBodyType = sc.get(options.worldConfig, 'playersBodyType', Body.DYNAMIC);
        this.bodyTypes = {
            KINEMATIC: Body.KINEMATIC,
            STATIC: Body.STATIC,
            DYNAMIC: Body.DYNAMIC
        };
        this.typeDeterminer = new TypeDeterminer();
        this.playerAnimationBasedOnPress = this.config.get('client/players/animations/basedOnPress', false);
        this.playerAnimationDiagonalHorizontal = this.config.get('client/players/animations/diagonalHorizontal', false);
        this.usePlayerSpeedConfig = this.config.get('server/players/physicsBody/usePlayerSpeedConfig', false);
    }
    saveMapData(options) {
        this.mapJson = sc.get(options, 'mapJson');
        if (!this.mapJson && sc.hasOwn(this.config, 'server') && sc.hasOwn(this.config.server, 'maps')) this.mapJson = sc.get(this.config.server.maps, this.sceneTiledMapFile, false);
        if (!this.mapJson) {
            Logger.critical('Map "' + this.sceneTiledMapFile + '" not found in server maps.', Object.keys(this.config.server.maps));
            ErrorManager.error('Map "' + this.sceneTiledMapFile + '" not found in server maps.');
        }
    }
    enableWorldDateTime() {
        this.worldDateTime = new Date();
        this.worldDateTimeInterval = setInterval(()=>{
            this.worldDateTime = new Date();
        // Logger.debug('World '+this.worldKey+': '+this.worldDateTime.toISOString().slice(0, 19).replace('T', ' '));
        }, 1000);
    }
    enablePathFinder() {
        if (!this.usePathFinder) return;
        this.pathFinder = new PathFinder();
        this.pathFinder.world = this;
        this.pathFinder.createGridFromMap();
    }
    validateRequiredProperties(options) {
        if (!this.events) ErrorManager.error('EventsManager undefined in P2world.');
        if (!this.roomId || !this.sceneName || !this.sceneTiledMapFile) {
            Logger.critical('World creation missing data in options.', {
                roomId: this.roomId,
                sceneName: this.sceneName,
                sceneTiledMapFile: this.sceneTiledMapFile
            });
            ErrorManager.error('World creation missing data in options.');
        }
        if (!this.config) ErrorManager.error('Missing Config Manager.');
    }
    async createWorldContent(mapData) {
        // @TODO - BETA - Analyze and implement blocks groups, for example, all simple collision blocks could be
        //   grouped and use a single big block to avoid the overload number of small blocks which now impacts in the
        //   consumed resources.
        if (!this.validateMapData(this.mapJson)) {
            Logger.error('Missing map data.', this.mapJson);
            return;
        }
        if (!this.shouldGroupBodies()) Logger.warning('Group bodies fully disabled, this can impact performance.');
        this.changePoints = this.getSceneChangePoints(mapData);
        let mapLayers = this.mapJson.layers;
        let createObjectsData = [];
        for (let layer of mapLayers){
            let eventData = {
                layer,
                world: this
            };
            await this.events.emit('reldens.parsingMapLayerBefore', eventData);
            createObjectsData.push(...await this.createLayerContents(eventData.layer));
            await this.events.emit('reldens.parsingMapLayerAfter', eventData);
        }
        for (let objectData of createObjectsData){
            let { layer, tileIndex, tileW, tileH, posX, posY } = objectData;
            await this.createRoomObjectBody(layer, tileIndex, tileW, tileH, posX, posY);
        }
        this.processBodiesQueue();
        for (let layer of mapLayers){
            let eventData = {
                layer,
                world: this
            };
            await this.events.emit('reldens.parsingMapLayersAfterBodiesQueue', eventData);
        }
        Logger.info('Total wall bodies found: ' + this.totalBodiesCount, 'Total wall bodies created: ' + this.totalBodiesCreated);
    }
    processBodiesQueue() {
        this.queueBodies.sort((a, b)=>{
            const lowestIndexA = a.tileIndexes[0];
            const lowestIndexB = b.tileIndexes[0];
            return lowestIndexA - lowestIndexB;
        });
        for (let bodyWall of this.queueBodies)this.addBody(bodyWall);
        this.queueBodies = [];
    }
    async createLayerContents(layer) {
        let tileW = this.mapJson.tilewidth, tileH = this.mapJson.tileheight, halfTileW = tileW / 2, halfTileH = tileH / 2;
        let isChangePointsLayer = -1 !== layer.name.indexOf('change-points');
        let isCollisionsLayer = -1 !== layer.name.indexOf('collisions');
        let createObjectsData = [];
        // loop columns:
        for(let c = 0; c < this.mapJson.width; c++){
            let posX = c * tileW + halfTileW;
            // loop rows:
            for(let r = 0; r < this.mapJson.height; r++){
                // position in units:
                let posY = r * tileH + halfTileH;
                let tileIndex = this.tileIndexByRowAndColumn(r, c);
                let tile = layer.data[tileIndex];
                let isZeroTile = 0 === Number(tile);
                let isChangePoint = false;
                let isCollisionBody = false;
                // the 0 value is for empty tiles without collisions or change points:
                if (!isZeroTile) {
                    // look for change points on the layers with the proper name convention:
                    if (this.allowChangePoints && isChangePointsLayer) isChangePoint = this.createChangePoint(tileIndex, tileW, tileH, posX, posY);
                    // create collisions for layers with the proper name convention:
                    if (isCollisionsLayer) isCollisionBody = this.createWallCollisionBody(tileIndex, this.determinePreviousTileIndexFromGroupingType(tileIndex, layer, r, c), tileW, tileH, posX, posY);
                }
                if (this.usePathFinder) this.markPathFinderTile(layer, isZeroTile, isChangePoint, isCollisionBody, c, r);
                // @TODO - BETA - Emit event and move the rooms objects creation into the objects plugin.
                createObjectsData.push({
                    layer,
                    tileIndex,
                    tileW,
                    tileH,
                    posX,
                    posY
                });
            }
        }
        return createObjectsData;
    }
    determinePreviousTileIndexFromGroupingType(tileIndex, layer, r, c) {
        if (!this.shouldGroupBodies()) return false;
        if (this.groupWallsVertically) return this.fetchPreviousWallTile(layer, r, c);
        return 0 === tileIndex ? false : tileIndex - 1;
    }
    fetchPreviousWallTile(layer, r, c) {
        if (0 === r) return false;
        let tileIndex = this.tileIndexByRowAndColumn(r - 1, c);
        let tile = layer.data[tileIndex];
        let isZeroTile = 0 === Number(tile);
        return isZeroTile ? false : tileIndex;
    }
    tileIndexByRowAndColumn(r, c) {
        return r * this.mapJson.width + c;
    }
    validateMapData(mapJson) {
        return 0 < Number(mapJson.width || 0) && 0 < Number(mapJson.height || 0) && 0 < Number(mapJson.tilewidth || 0) && 0 < Number(mapJson.tileheight || 0);
    }
    async createRoomObjectBody(layer, tileIndex, tileW, tileH, posX, posY) {
        if (!this.allowRoomObjectsCreation || !this.objectsManager) return;
        // objects will be found by layer name + tile index:
        let objectIndex = layer.name + tileIndex;
        // this will validate if the object class exists and return an instance of it:
        let roomObject = this.objectsManager.getObjectData(objectIndex);
        // if the data and the instance was created:
        if (!roomObject) return;
        if (roomObject.multiple) return;
        return await this.createWorldObject(roomObject, objectIndex, tileW, tileH, posX, posY);
    }
    markPathFinderTile(layer, isZeroTile, isChangePoint, isCollisionBody, c, r) {
        if (!this.pathFinder) return;
        let isPathFinderLayer = -1 !== layer.name.indexOf('pathfinder');
        let hasBody = !isZeroTile && (isChangePoint || isCollisionBody);
        let isNotPathFinderTile = isZeroTile && isPathFinderLayer;
        if (!hasBody && !isNotPathFinderTile) return;
        this.pathFinder.grid.setWalkableAt(c, r, false);
    }
    createWallCollisionBody(tileIndex, previousWallTileIndex, tileW, tileH, posX, posY) {
        this.totalBodiesCount++;
        let existentTileBodyWall = false !== previousWallTileIndex ? this.fetchBodyByTileIndexId(previousWallTileIndex) : false;
        if (existentTileBodyWall) {
            let currentIndexes = existentTileBodyWall.tileIndexes;
            if (-1 !== currentIndexes.indexOf(tileIndex)) return existentTileBodyWall;
            currentIndexes.push(tileIndex);
            let bodyWall = this.createWall(this.determineShapeWidth(currentIndexes, tileW), this.determineShapeHeight(currentIndexes, tileH), this.determineBodyPositionX(existentTileBodyWall, tileW, posX), this.determineBodyPositionY(existentTileBodyWall, tileH, posY), this.wallBodyType);
            bodyWall.tileIndexes = currentIndexes;
            bodyWall.firstTileIndex = existentTileBodyWall.firstTileIndex;
            this.queueBodies.splice(this.queueBodies.indexOf(existentTileBodyWall), 1);
            this.queueBodies.push(bodyWall);
            return bodyWall;
        }
        let bodyWall = this.createWall(tileW, tileH, posX, posY, this.wallBodyType);
        bodyWall.tileIndexes = [
            tileIndex
        ];
        bodyWall.firstTileIndex = tileIndex;
        !this.shouldGroupBodies() ? this.addBody(bodyWall) : this.queueBodies.push(bodyWall);
        this.totalBodiesCreated++;
        return bodyWall;
    }
    shouldGroupBodies() {
        return this.groupWallsVertically || this.groupWallsHorizontally;
    }
    determineBodyPositionY(existentTileBodyWall, tileH, posY) {
        if (!this.groupWallsVertically) return posY;
        return existentTileBodyWall.position[1] + tileH / 2;
    }
    determineBodyPositionX(existentTileBodyWall, tileW, posX) {
        if (!this.groupWallsHorizontally) return posX;
        return existentTileBodyWall.position[0] + tileW / 2;
    }
    determineShapeHeight(currentIndexes, tileH) {
        if (!this.groupWallsVertically) return tileH;
        return currentIndexes.length * tileH;
    }
    determineShapeWidth(currentIndexes, tileW) {
        if (!this.groupWallsHorizontally) return tileW;
        return currentIndexes.length * tileW;
    }
    fetchBodyByTileIndexId(tileIndex) {
        for (let body of this.queueBodies){
            if (!body.isWall || !body.tileIndexes) continue;
            if (-1 !== body.tileIndexes.indexOf(tileIndex)) return body;
        }
        return false;
    }
    createChangePoint(tileIndex, tileW, tileH, posX, posY) {
        let changeScenePoint = sc.get(this.changePoints, tileIndex, null);
        if (null === changeScenePoint) {
            Logger.error([
                'Change point data not found in this.changePoints for tileIndex:',
                tileIndex
            ]);
            return false;
        }
        // @NOTE: we make the change point smaller so the user needs to walk into to hit it.
        let bodyChangePoint = this.createCollisionBody(tileW / 2, tileH / 2, posX, posY, this.changePointsBodyType);
        bodyChangePoint.changeScenePoint = changeScenePoint;
        this.addBody(bodyChangePoint);
        Logger.info('Created change point on tileIndex: ' + tileIndex);
        return bodyChangePoint;
    }
    async createWorldObject(roomObject, objectIndex, tileW, tileH, posX, posY, pathFinder = false) {
        // handle body fixed position:
        posX += sc.get(roomObject, 'xFix', 0);
        posY += sc.get(roomObject, 'yFix', 0);
        roomObject.x = posX;
        roomObject.y = posY;
        // save position in room object:
        if (this.objectsManager && sc.hasOwn(this.objectsManager.objectsAnimationsData, objectIndex)) {
            this.objectsManager.objectsAnimationsData[objectIndex].x = posX;
            this.objectsManager.objectsAnimationsData[objectIndex].y = posY;
        }
        // check and calculate interaction area:
        if (roomObject.interactionArea) roomObject.setupInteractionArea();
        // by default objects won't have mass:
        let bodyMass = sc.get(roomObject, 'bodyMass', 1);
        let collision = sc.get(roomObject, 'collisionResponse', true);
        let hasState = this.allowBodiesWithState ? sc.get(roomObject, 'hasState', false) : false;
        let collisionType = sc.get(roomObject, 'collisionType', this.worldObjectBodyType);
        let collisionGroup = sc.get(roomObject, 'collisionGroup', WorldConst.COLLISIONS.OBJECT);
        let bodyObject = this.createCollisionBody(tileW, tileH, posX, posY, collisionType, collisionGroup, bodyMass, collision, hasState, objectIndex);
        bodyObject.disableObjectsCollisionsOnChase = this.disableObjectsCollisionsOnChase;
        bodyObject.disableObjectsCollisionsOnReturn = this.disableObjectsCollisionsOnReturn;
        bodyObject.isRoomObject = true;
        // assign the room object to the body:
        bodyObject.roomObject = roomObject;
        if (this.usePathFinder && pathFinder) bodyObject.pathFinder = pathFinder;
        // try to get object instance from project root:
        this.addBody(bodyObject);
        // set data on room object:
        roomObject.state = bodyObject.bodyState;
        roomObject.objectBody = bodyObject;
        Logger.info('Created object for objectIndex: ' + objectIndex + ' - At x/y: ' + posX + ' / ' + posY + '.');
        await this.events.emit('reldens.createdWorldObject', {
            p2world: this,
            roomObject,
            bodyObject,
            bodyMass,
            collision,
            hasState,
            objectIndex,
            tileW,
            tileH,
            posX,
            posY,
            pathFinder
        });
        return roomObject;
    }
    createLimits() {
        // map data:
        let blockW = this.mapJson.tilewidth, blockH = this.mapJson.tileheight, mapW = this.mapJson.width * blockW, mapH = this.mapJson.height * blockH, worldLimit = 1, fullW = mapW + blockW, fullH = mapH + blockH;
        // create world boundary, up wall:
        let upWall = this.createWall(fullW, worldLimit, mapW / 2, 1, this.limitsBodyType);
        upWall.isWorldWall = true;
        this.addBody(upWall);
        // create world boundary, down wall:
        let downWall = this.createWall(fullW, worldLimit, mapW / 2, mapH - worldLimit, this.limitsBodyType);
        downWall.isWorldWall = true;
        this.addBody(downWall);
        // create world boundary, left wall:
        let leftWall = this.createWall(worldLimit, fullH, 1, mapH / 2, this.limitsBodyType);
        leftWall.isWorldWall = true;
        this.addBody(leftWall);
        // create world boundary, right wall:
        let rightWall = this.createWall(worldLimit, fullH, mapW - worldLimit, mapH / 2, this.limitsBodyType);
        rightWall.isWorldWall = true;
        this.addBody(rightWall);
    }
    createWall(width, height, x, y, bodyType) {
        let wallBody = this.createCollisionBody(width, height, x, y, bodyType, WorldConst.COLLISIONS.WALL, this.wallsMassValue);
        wallBody.isWall = true;
        return wallBody;
    }
    createCollisionBody(width, height, x, y, type, collisionGroup = WorldConst.COLLISIONS.WALL, mass = 1, collisionResponse = true, bodyState = false, bodyKey = false, dir = false) {
        let boxShape = this.createCollisionShape(width, height, collisionGroup, collisionResponse);
        let bodyConfig = {
            mass: mass,
            position: [
                x,
                y
            ],
            type,
            fixedRotation: true,
            movementSpeed: this.movementSpeed,
            jumpSpeed: this.jumpSpeed,
            jumpTimeMs: this.jumpTimeMs
        };
        let bodyClass = bodyState ? PhysicalBody : Body;
        let boxBody = new bodyClass(bodyConfig);
        if (bodyState) boxBody.bodyState = this.createBodyState(bodyState, x, y, dir, boxBody, bodyKey);
        boxBody.originalCollisionGroup = collisionGroup;
        boxBody.addShape(boxShape);
        return boxBody;
    }
    createBodyState(bodyState, x, y, dir, boxBody, bodyKey) {
        if (bodyState instanceof PhysicalBody) return bodyState;
        return new ObjectBodyState({
            x: x,
            y: y,
            dir: dir || GameConst.DOWN,
            scene: this.sceneName,
            id: boxBody.id,
            key: bodyKey || '',
            room_id: this.roomId
        });
    }
    createCollisionShape(width, height, collisionGroup, collisionResponse = true, x = 0, y = 0) {
        // @TODO - BETA - Make collision groups configurable to be able to include more values.
        let boxShape = new Box({
            width,
            height,
            position: [
                x,
                y
            ]
        });
        boxShape.collisionGroup = collisionGroup;
        boxShape.collisionMask = this.collisionsGroupsByType[collisionGroup];
        // Logger.debug('Setting collision mask "'+boxShape.collisionMask+'" for group "'+boxShape.collisionGroup+'".');
        boxShape.collisionResponse = collisionResponse;
        return boxShape;
    }
    getSceneChangePoints(mapData) {
        if (!mapData.changePoints) return {};
        let changePointsKeys = Object.keys(mapData.changePoints);
        if (0 === changePointsKeys.length) return {};
        let changePoints = {};
        for (let i of changePointsKeys){
            let changePoint = mapData.changePoints[i];
            changePoints[changePoint[RoomsConst.TILE_INDEX]] = changePoint[RoomsConst.NEXT_SCENE];
        }
        return changePoints;
    }
    createPlayerBody(playerData) {
        // @TODO - BETA - Players collision will be configurable, for now when collisions are active players can
        //   push players.
        let boxShape = this.createCollisionShape(playerData.width, playerData.height, WorldConst.COLLISIONS.PLAYER);
        this.playerMovementSpeed = this.fetchPlayerSpeed(playerData.speed);
        let boxBody = new PhysicalBody({
            mass: this.playerMassValue,
            position: [
                playerData.bodyState.x,
                playerData.bodyState.y
            ],
            type: this.playersBodyType,
            fixedRotation: true,
            animationBasedOnPress: this.playerAnimationBasedOnPress,
            diagonalHorizontal: this.playerAnimationDiagonalHorizontal,
            movementSpeed: this.playerMovementSpeed
        });
        boxBody.playerId = playerData.id;
        boxBody.collideWorldBounds = true;
        boxBody.isChangingScene = false;
        boxBody.isBlocked = false;
        boxBody.originalCollisionGroup = WorldConst.COLLISIONS.PLAYER;
        boxBody.addShape(boxShape);
        if (this.allowBodiesWithState) boxBody.bodyState = playerData.bodyState;
        this.addBody(boxBody);
        return boxBody;
    }
    fetchPlayerSpeed(playerSpeed) {
        let movementSpeed = this.movementSpeed;
        if (this.usePlayerSpeedConfig) {
            let configSpeed = this.config.get('server/players/physicsBody/speed', playerSpeed);
            if (0 < configSpeed) movementSpeed = configSpeed;
        }
        Logger.debug('Use movement speed: ' + movementSpeed);
        return movementSpeed;
    }
    shootBullet(fromPosition, toPosition, bulletObject) {
        let { objectWidth, objectHeight } = bulletObject;
        let wTH = this.mapJson.tileheight / 2 + objectHeight / 2;
        let wTW = this.mapJson.tilewidth / 2 + objectWidth / 2;
        let bulletY = fromPosition.y + (toPosition.y > fromPosition.y ? wTH : -wTH);
        let bulletX = fromPosition.x + (toPosition.x > fromPosition.x ? wTW : -wTW);
        let y = toPosition.y - bulletY;
        let x = toPosition.x - bulletX;
        let angleByVelocity = Math.atan2(y, x);
        let bulletAngle = angleByVelocity * 180 / Math.PI;
        let bulletKey = bulletObject.key ? bulletObject.key : '';
        let speedX = bulletObject.magnitude * Math.cos(angleByVelocity);
        let speedY = bulletObject.magnitude * Math.sin(angleByVelocity);
        let direction = this.calculateDirection(bulletObject, fromPosition, toPosition);
        Logger.debug('Shooting bullet "' + bulletKey + '":', {
            objectWidth,
            objectHeight,
            bulletY,
            bulletX,
            fromPosition,
            toPosition,
            bulletAngle,
            speedX,
            speedY
        });
        let collisionKey = 'BULLET_' + this.determineFromType(bulletObject);
        let bulletBody = this.createCollisionBody(objectWidth, objectHeight, bulletX, bulletY, this.bulletsBodyType, WorldConst.COLLISIONS[collisionKey], 1, true, true, bulletKey, direction);
        bulletBody.updateMassProperties();
        bulletBody.roomObject = bulletObject;
        bulletBody.hitPriority = bulletObject.hitPriority ? bulletObject.hitPriority : 2;
        bulletBody.isRoomObject = true;
        bulletBody.isBullet = true;
        bulletBody.key = '' === bulletKey ? 'bullet-' + bulletBody.id : bulletKey;
        // append body to world:
        this.addBody(bulletBody);
        // @NOTE: this index here will be the animation key since the bullet state doesn't have a key property.
        let bodyStateId = bulletKey + '_bullet_' + bulletBody.id;
        bulletBody.bodyStateId = bodyStateId;
        // and state on room map schema:
        bulletObject.room.state.addBodyToState(bulletBody.bodyState, bodyStateId);
        bulletBody.angle = bulletAngle;
        bulletBody.originalSpeed = {
            x: speedX,
            y: speedY
        };
        bulletBody.velocity[0] = speedX;
        bulletBody.velocity[1] = speedY;
        // since the enemy won't be hit until the bullet reach the target we need to return false to avoid the onHit
        // automatic actions (for example pve init).
        return bulletBody;
    }
    determineFromType(bulletObject) {
        if (this.typeDeterminer.isPlayer(bulletObject.owner)) return WorldConst.FROM_TYPES.PLAYER;
        if (this.typeDeterminer.isObject(bulletObject.owner)) return WorldConst.FROM_TYPES.OBJECT;
        return WorldConst.FROM_TYPES.OTHER;
    }
    calculateDirection(bulletObject, fromPosition, toPosition) {
        let animDir = sc.get(bulletObject, 'animDir', false);
        if (3 === animDir) return fromPosition.x < toPosition.x ? GameConst.RIGHT : GameConst.LEFT;
        return fromPosition.y < toPosition.y ? GameConst.DOWN : GameConst.UP;
    }
    removeBodiesFromWorld() {
        if (0 === this.removeBodies.length) return;
        for (let removeBody of this.removeBodies)this.removeBody(removeBody);
        // reset the array after remove all bodies:
        this.removeBodies = [];
    }
}
module.exports.P2world = P2world;

},{"22fc0ec2668b15b0":"p2","89b97910eb15282e":"6Rs7T","bf8e7d8088ffa02":"kk5Q2","ca96e46ea11ece0d":"dysdG","c264acfd264f5635":"5orUO","c03ca356032f25a2":"iznl5","66ecc31a8f2dd920":"4L11d","2b9afdca425e5d96":"hmrKX","521f0bfcfa0908ee":"@reldens/utils"}],"kk5Q2":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ObjectBodyState
 *
 * ObjectBodyState schema, this class get a body state (position, direction, scene, etc.) data and keep the state
 * in sync with the client.
 *
 */ const { type } = require("d5ff803566ba0471");
const { BodyState } = require("f1e1d396ff1578a");
const { sc } = require("e56fab9f785dc3d1");
class ObjectBodyState extends BodyState {
    constructor(data){
        super(data);
        this.id = data.id;
        this.autoDirection = sc.get(data, 'autoDirection', true);
    }
}
type('number')(ObjectBodyState.prototype, 'id');
module.exports.ObjectBodyState = ObjectBodyState;

},{"d5ff803566ba0471":"@colyseus/schema","f1e1d396ff1578a":"3GHgX","e56fab9f785dc3d1":"@reldens/utils"}],"3GHgX":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - BodyState
 *
 */ const { Schema, type } = require("2c66e21e2e92b229");
const { GameConst } = require("d05ecc5ab6f7e497");
class BodyState extends Schema {
    constructor(data){
        super();
        this.room_id = data.room_id;
        this.scene = data.scene;
        this.key = data.key || '';
        this.x = parseFloat(data.x);
        this.y = parseFloat(data.y);
        this.dir = data.dir;
        this.mov = false;
        this.inState = data.inState || GameConst.STATUS.ACTIVE;
    }
    sync(bodyState) {
        this.room_id = bodyState.room_id;
        this.scene = bodyState.scene;
        this.key = bodyState.key;
        this.x = parseFloat(bodyState.x);
        this.y = parseFloat(bodyState.y);
        this.dir = bodyState.dir;
        this.mov = bodyState.mov;
        this.inState = bodyState.inState;
        return this;
    }
}
type('number')(BodyState.prototype, 'room_id');
type('string')(BodyState.prototype, 'scene');
type('string')(BodyState.prototype, 'key');
type('number')(BodyState.prototype, 'x');
type('number')(BodyState.prototype, 'y');
type('string')(BodyState.prototype, 'dir');
type('boolean')(BodyState.prototype, 'mov');
type('number')(BodyState.prototype, 'inState');
module.exports.BodyState = BodyState;

},{"2c66e21e2e92b229":"@colyseus/schema","d05ecc5ab6f7e497":"iznl5"}],"dysdG":[function(require,module,exports,__globalThis) {
const { sc } = require("33b512ab719d83dc");
const { Grid, AStarFinder } = require("3f2eb1c10ae89300");
class PathFinder {
    constructor(){
        this.finder = new AStarFinder();
        this.world = false;
        this.grid = false;
        this.bodies = {};
    }
    createGridFromMap() {
        // @NOTE: here we create an empty grid with the size of the current scene +1 (because the index starts at zero).
        // We mark the collisions on this grid when the layers and world contents are created.
        // See "P2world", line 83, method "setWalkableAt".
        this.grid = new Grid(this.world.mapJson.width + 1, this.world.mapJson.height + 1);
    }
    addBodyToProcess(body) {
        this.bodies[body.id] = body;
    }
    findPath(from, to) {
        if (this.world.onlyWalkable) {
            let nodeTo = false;
            try {
                nodeTo = sc.hasOwn(this.grid, 'nodes') ? this.grid.getNodeAt(to[0], to[1]) : false;
            } catch (error) {
            // Logger.error('Node not found.');
            }
            if (!nodeTo || !nodeTo.walkable) return false;
        }
        // we need a new grid clone for every path find.
        let grid = this.grid.clone();
        let path = this.finder.findPath(from[0], from[1], to[0], to[1], grid);
        if (!path.length && this.world.tryClosestPath) {
            let newTo = [
                1,
                1
            ];
            if (from[0] < to[0]) newTo[0] = -1;
            if (from[1] < to[1]) newTo[1] = -1;
            // @TODO - BETA - Improve how to check the closest nodes.
            // check all closest nodes:
            let worldW = this.world.mapJson.width;
            let worldH = this.world.mapJson.height;
            let testPointA = to[0] + newTo[0] > worldW ? to[0] + newTo[0] : worldW;
            let testPointB = to[1] + newTo[1] > worldH ? to[1] + newTo[1] : worldH;
            let testPointC = to[0] - newTo[0] < 0 ? to[0] - newTo[0] : 0;
            let testPointD = to[1] - newTo[1] < 0 ? to[1] - newTo[1] : 0;
            let nodeTo = this.grid.getNodeAt(testPointA, to[1]);
            if (nodeTo && !nodeTo.walkable) {
                nodeTo = this.grid.getNodeAt(to[0], testPointB);
                if (nodeTo && !nodeTo.walkable) {
                    nodeTo = this.grid.getNodeAt(testPointA, testPointB);
                    if (nodeTo && !nodeTo.walkable) {
                        nodeTo = this.grid.getNodeAt(testPointC, to[1]);
                        if (nodeTo && !nodeTo.walkable) {
                            nodeTo = this.grid.getNodeAt(to[0], testPointD);
                            if (nodeTo && !nodeTo.walkable) {
                                nodeTo = this.grid.getNodeAt(testPointC, testPointD);
                                if (nodeTo && !nodeTo.walkable) {
                                    nodeTo = this.grid.getNodeAt(testPointC, testPointB);
                                    if (nodeTo && !nodeTo.walkable) nodeTo = this.grid.getNodeAt(testPointA, testPointD);
                                }
                            }
                        }
                    }
                }
            }
            if (nodeTo && nodeTo.walkable) {
                grid = this.grid.clone();
                path = this.finder.findPath(from[0], from[1], nodeTo.x, nodeTo.y, grid);
            }
        }
        return path;
    }
}
module.exports.PathFinder = PathFinder;

},{"33b512ab719d83dc":"@reldens/utils","3f2eb1c10ae89300":"pathfinding"}],"5orUO":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TypeDeterminer
 *
 */ const { sc } = require("3cc70fd383ef5bf2");
class TypeDeterminer {
    isPlayer(skillOwner) {
        // @TODO - BETA - Improve.
        return sc.hasOwn(skillOwner, 'sessionId');
    }
    isObject(skillOwner) {
        // @TODO - BETA - Improve.
        return sc.hasOwn(skillOwner, 'key');
    }
}
module.exports.TypeDeterminer = TypeDeterminer;

},{"3cc70fd383ef5bf2":"@reldens/utils"}],"hmrKX":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - world/constants
 *
 */ module.exports.WorldConst = {
    WORLD_TYPES: {
        NO_GRAVITY_2D: 'NO_GRAVITY_2D',
        TOP_DOWN_WITH_GRAVITY: 'TOP_DOWN_WITH_GRAVITY'
    },
    COLLISIONS: {
        PLAYER: Math.pow(2, 0),
        OBJECT: Math.pow(2, 1),
        WALL: Math.pow(2, 2),
        BULLET_PLAYER: Math.pow(2, 3),
        BULLET_OBJECT: Math.pow(2, 4),
        BULLET_OTHER: Math.pow(2, 5),
        DROP: Math.pow(2, 6)
    },
    FROM_TYPES: {
        PLAYER: 'PLAYER',
        OBJECT: 'OBJECT',
        OTHER: 'OTHER'
    }
};

},{}],"75XGg":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - WorldPointsValidator
 *
 */ class WorldPointsValidator {
    constructor(worldWidth, worldHeight){
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }
    makeValidPoints(points) {
        points.column = points.column < 0 ? 0 : points.column;
        points.column = points.column > this.worldWidth ? this.worldWidth : points.column;
        points.row = points.row < 0 ? 0 : points.row;
        points.row = points.row > this.worldHeight ? this.worldHeight : points.row;
        return points;
    }
}
module.exports.WorldPointsValidator = WorldPointsValidator;

},{}],"fgadn":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - WorldTimer
 *
 */ const { Logger, sc } = require("a6722c3930f746e5");
class WorldTimer {
    constructor(props){
        this.clockInstance = sc.get(props, 'clockInstance', false);
        this.callbacks = sc.get(props, 'callbacks', []);
        this.worldTimer = {};
        this.paused = false;
        this.lastCallTime = 0;
        this.stepTime = 0;
        this.startedTime = new Date().getTime();
        this.currentTime = this.startedTime;
    }
    startWorldSteps(world) {
        if (!world) {
            Logger.error('World instance invalid.', {
                world
            });
            return;
        }
        this.stepTime = 1000 * world.timeStep;
        if (this.clockInstance) {
            //Logger.debug('WorldTimes using clock instance.');
            this.worldTimer = this.clockInstance.setInterval(()=>{
                this.setIntervalCallback(world);
            }, this.stepTime);
            return;
        }
        //Logger.debug('WorldTimes using setInterval.');
        this.worldTimer = setInterval(()=>{
            this.setIntervalCallback(world);
        }, this.stepTime);
    }
    setIntervalCallback(world) {
        if (this.paused) return;
        this.currentTime += this.stepTime;
        this.stepWorld(world);
        this.executeCallbacks();
    }
    stepWorld(world) {
        if (world.useFixedWorldStep) {
            world.step(world.timeStep);
            return;
        }
        this.stepWorldWithSubSteps(world);
    }
    executeCallbacks() {
        if (0 === this.callbacks.length) return;
        for (let callback of this.callbacks)callback();
    }
    stepWorldWithSubSteps(world) {
        let now = Date.now() / 1000;
        let timeSinceLastCall = now - this.lastCallTime;
        world.step(world.timeStep, timeSinceLastCall, world.maxSubSteps);
    }
}
module.exports.WorldTimer = WorldTimer;

},{"a6722c3930f746e5":"@reldens/utils"}],"eRyGx":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Room Events Override
 *
 */ const { PlayerEnginePrediction } = require("1136bfe444f5b6ae");
const { SceneDynamic } = require("6c571f7a13283762");
class RoomEventsOverride {
    createCurrentPlayerOverride(roomEvents) {
        roomEvents.createCurrentPlayer = async (player, previousScene, key)=>{
            roomEvents.engineStarted = true;
            await roomEvents.startEngineScene(player, roomEvents.room, previousScene);
            let currentScene = roomEvents.getActiveScene();
            if (!roomEvents.isValidScene(currentScene, player)) return false;
            // process players queue after player was created:
            await roomEvents.events.emit('reldens.playersQueueBefore', player, key, previousScene, roomEvents);
            for (let i of Object.keys(roomEvents.playersQueue))currentScene.player.addPlayer(i, roomEvents.playersQueue[i]);
            if (currentScene.experimentalClientPrediction) currentScene.player.positionFromServer = player;
            let eventData = {
                player,
                key,
                previousScene,
                roomEvents: roomEvents
            };
            await roomEvents.events.emit('reldens.createCurrentPlayer', eventData);
            return eventData;
        };
    }
    playerOnChangeOverride(roomEvents) {
        roomEvents.playersOnChange = (player, key, from)=>{
            // do not move the player if it is changing the scene:
            if (player.state.scene !== roomEvents.roomName) return;
            let currentScene = roomEvents.getActiveScene();
            if (!roomEvents.playerExists(currentScene, key)) return;
            if (currentScene.experimentalClientPrediction && roomEvents.isCurrentPlayer(key)) {
                currentScene.player.positionFromServer = player;
                return;
            }
            currentScene.player.updatePlayer(key, player);
        };
    }
    createSceneInstanceOverride(roomEvents) {
        roomEvents.createSceneInstance = (sceneName, sceneData, gameManager)=>{
            let newSceneDynamic = new SceneDynamic(sceneName, sceneData, gameManager);
            newSceneDynamic.experimentalClientPrediction = gameManager.config.get('client/general/engine/experimentalClientPrediction');
            newSceneDynamic.worldPrediction = false;
            return newSceneDynamic;
        };
    }
    createPlayerEngineInstanceOverride(roomEvents) {
        roomEvents.createPlayerEngineInstance = (currentScene, player, gameManager, room)=>{
            return new PlayerEnginePrediction({
                scene: currentScene,
                playerData: player,
                gameManager,
                room
            });
        };
    }
}
module.exports.RoomEventsOverride = RoomEventsOverride;

},{"1136bfe444f5b6ae":"gRV6X","6c571f7a13283762":"lfhLZ"}],"gRV6X":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PlayerEngine
 *
 * PlayerEngine is the class that handle the player actions in the client side.
 *
 */ const { PlayerEngine } = require("2d0d26536cbe8ba6");
const { GameConst } = require("4c7667d873e570ea");
class PlayerEnginePrediction extends PlayerEngine {
    constructor(props){
        super(props);
        this.predictionBody = false;
        this.positionFromServer = false;
        let reconciliationTimeOutMs = this.gameManager.config.get('client/players/reconciliation/timeOutMs');
        this.reconciliationTimeOutMs = false === reconciliationTimeOutMs ? 1000 : Number(reconciliationTimeOutMs);
    }
    left() {
        if ('pressed' === this.lastKeyState[GameConst.LEFT]) return;
        let sendData = {
            dir: GameConst.LEFT
        };
        this.lastKeyState[GameConst.LEFT] = 'pressed';
        if (this.predictionBody) {
            sendData.time = this.scene.worldPredictionTimer.currentTime;
            this.predictionBody.initMove(GameConst.LEFT, true);
        }
        this.roomEvents.send(sendData);
    }
    right() {
        if ('pressed' === this.lastKeyState[GameConst.RIGHT]) return;
        this.lastKeyState[GameConst.RIGHT] = 'pressed';
        let sendData = {
            dir: GameConst.RIGHT
        };
        if (this.predictionBody) {
            sendData.time = this.scene.worldPredictionTimer.currentTime;
            this.predictionBody.initMove(GameConst.RIGHT, true);
        }
        this.roomEvents.send(sendData);
    }
    up() {
        if ('pressed' === this.lastKeyState[GameConst.UP]) return;
        this.lastKeyState[GameConst.UP] = 'pressed';
        let sendData = {
            dir: GameConst.UP
        };
        if (this.predictionBody) {
            sendData.time = this.scene.worldPredictionTimer.currentTime;
            this.predictionBody.initMove(GameConst.UP, true);
        }
        this.roomEvents.send(sendData);
    }
    down() {
        if ('pressed' === this.lastKeyState[GameConst.DOWN]) return;
        this.lastKeyState[GameConst.DOWN] = 'pressed';
        let sendData = {
            dir: GameConst.DOWN
        };
        if (this.predictionBody) {
            sendData.time = this.scene.worldPredictionTimer.currentTime;
            this.predictionBody.initMove(GameConst.DOWN, true);
        }
        this.roomEvents.send(sendData);
    }
    stop() {
        this.lastKeyState[GameConst.LEFT] = '';
        this.lastKeyState[GameConst.RIGHT] = '';
        this.lastKeyState[GameConst.UP] = '';
        this.lastKeyState[GameConst.DOWN] = '';
        let sendData = {
            act: GameConst.STOP
        };
        if (this.predictionBody) {
            sendData.time = this.scene.worldPredictionTimer.currentTime;
            this.reconcilePosition();
        }
        this.roomEvents.send(sendData);
    }
    reconcilePosition() {
        if (!this.predictionBody || !this.positionFromServer) return;
        this.predictionBody.stopFull();
        setTimeout(()=>{
            this.predictionBody.position[0] = this.positionFromServer.state.x;
            this.predictionBody.position[1] = this.positionFromServer.state.y;
            this.predictionBody.dir = this.positionFromServer.state.dir;
            this.updatePlayer(this.playerId, this.positionFromServer);
        }, this.reconciliationByTimeOutMs());
    }
    reconciliationTimeOutCallBack() {
        return false;
    }
    reconciliationByTimeOutMs() {
        let callbackResult = this.reconciliationTimeOutCallBack();
        return Number(false !== callbackResult ? callbackResult : this.reconciliationTimeOutMs);
    }
    moveToPointer(pointer) {
        this.lastKeyState[GameConst.LEFT] = '';
        this.lastKeyState[GameConst.RIGHT] = '';
        this.lastKeyState[GameConst.UP] = '';
        this.lastKeyState[GameConst.DOWN] = '';
        let data = {
            act: GameConst.POINTER,
            column: pointer.worldColumn,
            row: pointer.worldRow,
            x: pointer.worldX - this.leftOff,
            y: pointer.worldY - this.topOff
        };
        if (this.predictionBody && this.pointsValidator) {
            this.reconcilePosition();
            let predictionData = Object.assign({}, data);
            predictionData = this.pointsValidator.makeValidPoints(predictionData);
            this.predictionBody.moveToPoint(predictionData);
        }
        this.roomEvents.send(data);
    }
}
module.exports.PlayerEnginePrediction = PlayerEnginePrediction;

},{"2d0d26536cbe8ba6":"1FVwD","4c7667d873e570ea":"iznl5"}],"3qHRJ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Teams Client Plugin
 *
 */ const { PluginInterface } = require("3e2556f9927981f8");
const { TargetBoxEnricher } = require("53d9a911cbdcfbc5");
const { TeamMessageListener } = require("f6beffb655fa7cb4");
const { ClanMessageListener } = require("f01b376e357ef11c");
const { MessageProcessor } = require("a67caf9c691f616d");
const { TemplatesHandler } = require("caa5a6c6a11fec64");
const { TeamsConst } = require("54c9661624ae3628");
const { Logger, sc } = require("14e11937ea2c45f4");
class TeamsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in TeamsPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in TeamsPlugin.');
        this.teamMessageListener = new TeamMessageListener();
        this.clanMessageListener = new ClanMessageListener();
        this.listenEvents();
        // @TODO - BETA - Standardize, listeners on config or added by events like:
        // this.events.on('reldens.activateRoom', (room) => {
        //     room.onMessage('*', (message) => {
        //         this.messagesHandler.processOrQueueMessage(message);
        //     });
        // });
        this.listenMessages();
    }
    listenMessages() {
        if (!this.gameManager || !this.events) return;
        this.gameManager.config.client.message.listeners[TeamsConst.KEY] = this.teamMessageListener;
        this.gameManager.config.client.message.listeners[TeamsConst.CLAN_KEY] = this.clanMessageListener;
    }
    listenEvents() {
        if (!this.events) return;
        this.events.on('reldens.createEngineSceneDone', (event)=>{
            let roomEvents = event.roomEvents;
            if (!roomEvents) {
                Logger.critical('RoomEvents undefined for process Team messages queue on TeamsPlugin.', event);
                return false;
            }
            MessageProcessor.processClanMessagesQueue(roomEvents, this.clanMessageListener);
            MessageProcessor.processTeamMessagesQueue(roomEvents, this.teamMessageListener);
        });
        this.events.on('reldens.preloadUiScene', (preloadScene)=>{
            TemplatesHandler.preloadTemplates(preloadScene);
        });
        this.events.on('reldens.gameEngineShowTarget', (gameEngine, target, previousTarget, targetName)=>{
            TargetBoxEnricher.appendClanInviteButton(this.gameManager, target, previousTarget, targetName);
            TargetBoxEnricher.appendTeamInviteButton(this.gameManager, target, previousTarget, targetName);
        });
    }
    fetchTeamPlayerBySessionId(sessionId) {
        let currentTeam = this.gameManager.gameEngine.uiScene.currentTeam;
        if (!currentTeam) return false;
        for (let i of Object.keys(currentTeam)){
            let teamPlayer = currentTeam[i];
            if (teamPlayer.sessionId === sessionId) return teamPlayer;
        }
        return false;
    }
}
module.exports.TeamsPlugin = TeamsPlugin;

},{"3e2556f9927981f8":"deNd3","53d9a911cbdcfbc5":"aDhyw","f6beffb655fa7cb4":"bUWfH","f01b376e357ef11c":"4LsxX","a67caf9c691f616d":"eBVhl","caa5a6c6a11fec64":"ayvT6","54c9661624ae3628":"l0mrS","14e11937ea2c45f4":"@reldens/utils"}],"aDhyw":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TargetBoxEnricher
 *
 */ const { TeamsConst } = require("9a43cebf087570eb");
const { GameConst } = require("bbfee0e632b58d31");
const { Logger, sc } = require("bd3cd78fd8a3265c");
class TargetBoxEnricher {
    static appendClanInviteButton(gameManager, target, previousTarget, targetName) {
        let currentClan = gameManager?.gameEngine?.uiScene?.currentClan;
        if (!currentClan) // current player has none clan:
        return false;
        if (!currentClan.ownerId) {
            Logger.error('Current clan missing owner.', currentClan);
            return false;
        }
        if (this.playerBySessionId(currentClan, target.id)) // target player is already on the clan:
        return false;
        let currentPlayer = gameManager.getCurrentPlayer();
        if (!this.targetIsValidPlayer(target, currentPlayer)) // target is not the current player
        return false;
        let isOpenInvites = gameManager.config.getWithoutLogs('client/clan/general/openInvites', false);
        if (gameManager.playerData.id.toString() !== currentClan.ownerId.toString() && !isOpenInvites) // only clan owner can invite:
        return false;
        return this.appendInviteButton('clan', target, gameManager, targetName);
    }
    static appendTeamInviteButton(gameManager, target, previousTarget, targetName) {
        if (!this.targetIsValidPlayer(target, gameManager.getCurrentPlayer())) return false;
        if (gameManager.getFeature('teams').fetchTeamPlayerBySessionId(target.id)) return false;
        return this.appendInviteButton('team', target, gameManager, targetName);
    }
    static appendInviteButton(type, target, gameManager, targetName) {
        let uiScene = gameManager.gameEngine.uiScene;
        let uiTarget = sc.get(uiScene, 'uiTarget', false);
        if (false === uiTarget) {
            Logger.critical('Missing "uiTarget" on uiScene.');
            return false;
        }
        let teamPlayerActionsTemplate = uiScene.cache.html.get(type + 'PlayerInvite');
        if (!teamPlayerActionsTemplate) {
            Logger.critical('Template "' + type + 'PlayerInvite" not found.');
            return false;
        }
        gameManager.gameDom.appendToElement('#target-container', gameManager.gameEngine.parseTemplate(teamPlayerActionsTemplate, {
            // @TODO - BETA - Create translations table with a loader and processor.
            playerName: targetName,
            playerId: target.player_id,
            inviteLabel: gameManager.config.getWithoutLogs(type + '/labels/inviteLabel', TeamsConst.LABELS[type.toUpperCase()].INVITE_BUTTON_LABEL)
        }));
        let inviteButton = gameManager.gameDom.getElement('.' + type + '-invite-' + target.player_id + ' button');
        inviteButton?.addEventListener('click', ()=>{
            let sendInvite = {
                act: TeamsConst.ACTIONS[type.toUpperCase() + '_INVITE'],
                id: target.player_id
            };
            gameManager.activeRoomEvents.send(sendInvite);
            inviteButton.style.display = 'none';
            gameManager.gameEngine.clearTarget();
        });
    }
    static targetIsValidPlayer(target, currentPlayer) {
        return GameConst.TYPE_PLAYER === target.type && currentPlayer.playerId !== target.id;
    }
    static playerBySessionId(currentClan, targetId) {
        let playersKeys = Object.keys(currentClan.players);
        if (0 === playersKeys.length) return false;
        for (let i of playersKeys){
            if (currentClan.players[i].sessionId === targetId) return currentClan.players[i];
        }
        return false;
    }
}
module.exports.TargetBoxEnricher = TargetBoxEnricher;

},{"9a43cebf087570eb":"l0mrS","bbfee0e632b58d31":"iznl5","bd3cd78fd8a3265c":"@reldens/utils"}],"l0mrS":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - teams/constants
 *
 */ let pref = 'tm.';
let clanPref = 'cln.';
module.exports.TeamsConst = {
    KEY: 'teams',
    CLAN_KEY: 'clan',
    TEAM_PREF: pref,
    CLAN_PREF: clanPref,
    NAME_LIMIT: 50,
    CLAN_STARTING_POINTS: 1,
    VALIDATION: {
        SUCCESS: 1,
        NAME_EXISTS: 2,
        LEVEL_ISSUE: 3,
        CREATE_ERROR: 4,
        CREATE_OWNER_ERROR: 5
    },
    ACTIONS: {
        // @TODO - BETA - Standardize generic actions and use dots to split, like UPDATE = '.up', REMOVE = '.rm', etc.
        TEAM_INVITE: pref + 'inv',
        TEAM_ACCEPTED: pref + 'acp',
        TEAM_LEAVE: pref + 'lev',
        TEAM_UPDATE: pref + 'upd',
        TEAM_LEFT: pref + 'lef',
        TEAM_REMOVE: pref + 'rem',
        CLAN_INITIALIZE: clanPref + 'ini',
        CLAN_CREATE: clanPref + 'new',
        CLAN_INVITE: clanPref + 'inv',
        CLAN_ACCEPTED: clanPref + 'acp',
        CLAN_LEAVE: clanPref + 'lev',
        CLAN_UPDATE: clanPref + 'upd',
        CLAN_LEFT: clanPref + 'lef',
        CLAN_REMOVE: clanPref + 'rem',
        CLAN_REMOVED: clanPref + 'remd',
        CLAN_NAME: clanPref + 'nam'
    },
    LABELS: {
        TEAM: {
            INVITE_BUTTON_LABEL: 'Team - Invite',
            REQUEST_FROM: 'Accept team request from:',
            LEADER_NAME_TITLE: 'Team leader: %leaderName',
            DISBAND: 'Disband Team',
            LEAVE: 'Leave Team',
            PROPERTY_MAX_VALUE: '/ %propertyMaxValue'
        },
        CLAN: {
            CREATE_CLAN_TITLE: 'Clan - Creation',
            INVITE_BUTTON_LABEL: 'Clan - Invite',
            REQUEST_FROM: 'Accept clan request from:',
            CLAN_TITLE: 'Clan: %clanName - Leader: %leaderName',
            NAME_PLACEHOLDER: 'Choose a clan name...',
            CREATE: 'Create',
            DISBAND: 'Disband Clan',
            LEAVE: 'Leave Clan',
            PROPERTY_MAX_VALUE: '/ %propertyMaxValue',
            PLAYERS_TITLE: 'Connected Players:',
            MEMBERS_TITLE: 'Clan Members:',
            NONE_CONNECTED: 'None'
        }
    },
    CHAT: {
        MESSAGE: {
            INVITE_ACCEPTED: '%playerName has accepted your invitation.',
            INVITE_REJECTED: '%playerName has rejected your invitation.',
            DISBANDED: '%playerName has disbanded the %groupName.',
            LEFT: 'You left the %groupName.',
            LEAVE: '%playerName has left the %groupName.',
            REMOVED: '%playerName has been removed from the %groupName.',
            ENTER: '%playerName has enter the %groupName.',
            NOT_ENOUGH_PLAYERS: 'The team was disbanded due to a lack of players.'
        }
    }
};

},{}],"bUWfH":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TeamMessageListener
 *
 */ const { TeamMessageHandler } = require("701caf09958e43e6");
const { TeamsConst } = require("c9b7a4a3fab62382");
const { Logger, sc } = require("bd7025df5510cd1f");
class TeamMessageListener {
    async executeClientMessageActions(props) {
        let message = sc.get(props, 'message', false);
        if (!message) {
            Logger.error('Missing message data on TeamMessageListener.', props);
            return false;
        }
        let roomEvents = sc.get(props, 'roomEvents', false);
        if (!roomEvents) {
            Logger.error('Missing RoomEvents on TeamMessageListener.', props);
            return false;
        }
        let teamMessageHandler = new TeamMessageHandler({
            roomEvents,
            message
        });
        if (!teamMessageHandler.validate()) {
            if (this.isTeamMessage(message)) {
                if (!roomEvents.teamMessagesQueue) roomEvents.teamMessagesQueue = [];
                roomEvents.teamMessagesQueue.push(message);
            }
            Logger.error('Invalid TeamMessageHandler', teamMessageHandler);
            return false;
        }
        if (!this.isTeamMessage(message)) return false;
        return this.handleTeamMessage(message, teamMessageHandler);
    }
    handleTeamMessage(message, teamMessageHandler) {
        if (TeamsConst.ACTIONS.TEAM_INVITE === message.act) return teamMessageHandler.showTeamRequest();
        if (TeamsConst.ACTIONS.TEAM_UPDATE === message.act) return teamMessageHandler.showTeamBox();
        if (TeamsConst.ACTIONS.TEAM_LEFT === message.act) return teamMessageHandler.removeTeamUi();
        return true;
    }
    isTeamMessage(message) {
        return 0 === message.act?.indexOf(TeamsConst.TEAM_PREF);
    }
}
module.exports.TeamMessageListener = TeamMessageListener;

},{"701caf09958e43e6":"gnDKG","c9b7a4a3fab62382":"l0mrS","bd7025df5510cd1f":"@reldens/utils"}],"gnDKG":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TeamMessageHandler
 *
 */ const { UserInterface } = require("62989ba9fe821287");
const { TeamsConst } = require("d105b19ae5b508c7");
const { Logger, sc } = require("77cc951811551deb");
class TeamMessageHandler {
    constructor(props){
        this.roomEvents = sc.get(props, 'roomEvents', false);
        this.message = sc.get(props, 'message', false);
        this.gameManager = this.roomEvents?.gameManager;
        this.gameDom = this.gameManager?.gameDom;
        this.uiScene = this.gameManager?.gameEngine?.uiScene;
    }
    validate() {
        if (!this.roomEvents) {
            Logger.info('Missing RoomEvents on TeamMessageHandler.');
            return false;
        }
        if (!this.message) {
            Logger.info('Missing message on TeamMessageHandler.');
            return false;
        }
        if (!this.gameManager) {
            Logger.info('Missing GameManager on TeamMessageHandler.');
            return false;
        }
        // @NOTE: the message could arrive before the uiScene gets ready.
        // if(!this.uiScene){
        //     Logger.info('Missing UI Scene on TeamMessageHandler.');
        // }
        return this.uiScene;
    }
    showTeamRequest() {
        this.createTeamUi(this.teamUiKey());
        this.roomEvents.initUi({
            id: this.teamUiKey(),
            title: this.gameManager.config.getWithoutLogs('client/team/labels/requestFromTitle', TeamsConst.LABELS.TEAM.REQUEST_FROM),
            content: this.message.from,
            options: this.gameManager.config.get('client/ui/options/acceptOrDecline'),
            overrideSendOptions: {
                act: TeamsConst.ACTIONS.TEAM_ACCEPTED,
                id: this.message.id
            }
        });
        this.gameDom.getElement('#opt-1-' + this.teamUiKey())?.addEventListener('click', ()=>{
            this.gameDom.removeElement('.team-invite');
        });
        this.gameDom.getElement('#opt-2-' + this.teamUiKey())?.addEventListener('click', ()=>{
            this.removeTeamUi();
        });
    }
    removeTeamUi() {
        let uiElement = this.gameManager.getUiElement(this.teamUiKey());
        if (!uiElement) {
            Logger.error('UI Element not found by team UI key "' + this.teamUiKey() + '".');
            return false;
        }
        uiElement.removeElement();
        delete this.uiScene.userInterfaces[this.teamUiKey()];
        delete this.uiScene.elementsUi[this.teamUiKey()];
        this.uiScene.currentTeam = false;
    }
    teamUiKey() {
        return TeamsConst.KEY + this.message.id;
    }
    showTeamBox() {
        let teamUiKey = this.teamUiKey();
        this.createTeamUi(teamUiKey);
        let title = this.gameManager.config.getWithoutLogs('client/team/labels/leaderNameTitle', TeamsConst.LABELS.TEAM.LEADER_NAME_TITLE).replace('%leaderName', this.message.leaderName);
        let container = this.gameManager.gameDom.getElement('#box-' + teamUiKey + ' .box-content');
        if (!container) {
            Logger.error('Missing container: "#box-' + teamUiKey + ' .box-content".');
            return false;
        }
        let uiBox = this.uiScene.elementsUi[teamUiKey];
        this.roomEvents.uiSetTitle(uiBox, {
            title
        });
        this.roomEvents.uiSetContent(uiBox, {
            content: ''
        }, this.uiScene);
        let players = sc.get(this.message, 'players', false);
        this.uiScene.currentTeam = players;
        this.updateTeamBox(players, container);
    }
    createTeamUi(teamUiKey) {
        let teamsUi = sc.get(this.uiScene.userInterfaces, teamUiKey);
        if (teamsUi) return teamsUi;
        if (!this.uiScene.userInterfaces) this.uiScene.userInterfaces = {};
        this.uiScene.userInterfaces[teamUiKey] = new UserInterface(this.gameManager, {
            id: teamUiKey,
            type: TeamsConst.KEY,
            defaultOpen: true,
            defaultClose: true
        }, '/assets/features/teams/templates/ui-teams.html', TeamsConst.KEY);
        this.uiScene.userInterfaces[teamUiKey].createUiElement(this.uiScene, TeamsConst.KEY);
        return this.uiScene.userInterfaces[teamUiKey];
    }
    updateTeamBox(players, container) {
        if (!players) {
            Logger.error('Players not defined.', players);
            return;
        }
        let teamMembers = '';
        for (let i of Object.keys(players))teamMembers += this.createTeamMemberBox(players[i]);
        container.innerHTML = this.createTeamContainer(teamMembers);
        this.activateTeamPlayerActions(players);
        this.activateTeamLeaveButtonAction();
    }
    createTeamContainer(teamMembers) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get('teamContainer');
        if (!templateContent) {
            Logger.error('Missing template "teamContainer".');
            return '';
        }
        let playerId = this.gameManager.playerData.id.toString();
        let isPlayerOwner = playerId === this.message.id.toString();
        let configPath = 'client/team/labels/';
        let leaveActionLabel = isPlayerOwner ? this.gameManager.config.getWithoutLogs(configPath + 'disbandLabel', TeamsConst.LABELS.TEAM.DISBAND) : this.gameManager.config.getWithoutLogs(configPath + 'leaveLabel', TeamsConst.LABELS.TEAM.LEAVE);
        let templateParams = {
            teamId: this.message.id,
            playerId,
            leaveActionLabel,
            teamMembers
        };
        return this.gameManager.gameEngine.parseTemplate(templateContent, templateParams);
    }
    activateTeamLeaveButtonAction() {
        let leaveButton = this.gameManager.gameDom.getElement('.leave-' + this.gameManager.playerData.id.toString());
        leaveButton?.addEventListener('click', ()=>{
            this.roomEvents.send({
                act: TeamsConst.ACTIONS.TEAM_LEAVE,
                id: this.message.id
            });
        });
    }
    createTeamMemberBox(playerData) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get('teamPlayerData');
        if (!templateContent) {
            Logger.error('Missing template "teamPlayerData".');
            return '';
        }
        let isPlayerOwner = this.gameManager.playerData.id.toString() === this.message.id.toString();
        return this.gameManager.gameEngine.parseTemplate(templateContent, {
            playerId: playerData.player_id,
            playerName: playerData.name,
            playerProperties: this.createSharedPropertiesContent(playerData.sharedProperties),
            playerRemove: isPlayerOwner ? this.createDismissPlayerButton(playerData) : ''
        });
    }
    createDismissPlayerButton(playerData) {
        let templateContent = this.uiScene.cache.html.get('teamRemove');
        if (!templateContent) {
            Logger.error('Missing template "teamRemove".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(templateContent, {
            playerId: playerData.player_id
        });
    }
    createSharedPropertiesContent(playerSharedProperties) {
        let templateContent = this.uiScene.cache.html.get('teamsSharedProperty');
        if (!templateContent) {
            Logger.error('Missing template "teamsSharedProperty".');
            return '';
        }
        let sharedPropertiesContent = '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        for (let i of Object.keys(playerSharedProperties)){
            templateContent = this.uiScene.cache.html.get('teamsSharedProperty');
            let propertyData = playerSharedProperties[i];
            let propertyMaxValue = sc.get(propertyData, 'max', '');
            if ('' !== propertyMaxValue) propertyMaxValue = this.gameManager.config.getWithoutLogs('client/team/labels/propertyMaxValue', TeamsConst.LABELS.TEAM.PROPERTY_MAX_VALUE).replace('%propertyMaxValue', propertyMaxValue);
            sharedPropertiesContent += this.gameManager.gameEngine.parseTemplate(templateContent, {
                key: i,
                label: propertyData.label,
                value: propertyData.value,
                max: propertyMaxValue
            });
        }
        return sharedPropertiesContent;
    }
    activateTeamPlayerActions(playersData) {
        for (let i of Object.keys(playersData)){
            let playerData = playersData[i];
            let selectorPlayerName = '.team-player-' + playerData.player_id + ' .player-name';
            this.gameDom.getElement(selectorPlayerName)?.addEventListener('click', ()=>{
                this.gameManager.getCurrentPlayer().setTargetPlayerById(playerData.sessionId);
            });
            let selectorPlayerProperties = '.team-player-' + playerData.player_id + ' .properties-list-container';
            this.gameDom.getElement(selectorPlayerProperties)?.addEventListener('click', ()=>{
                this.gameManager.getCurrentPlayer().setTargetPlayerById(playerData.sessionId);
            });
            let selectorPlayerRemove = '.team-player-' + playerData.player_id + ' .team-remove-button';
            this.gameDom.getElement(selectorPlayerRemove)?.addEventListener('click', ()=>{
                this.roomEvents.send({
                    act: TeamsConst.ACTIONS.TEAM_REMOVE,
                    id: this.message.id,
                    remove: playerData.player_id
                });
            });
        }
    }
}
module.exports.TeamMessageHandler = TeamMessageHandler;

},{"62989ba9fe821287":"kO7Qp","d105b19ae5b508c7":"l0mrS","77cc951811551deb":"@reldens/utils"}],"4LsxX":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ClanMessageListener
 *
 */ const { ClanMessageHandler } = require("59d0db5e0ce1f07e");
const { TeamsConst } = require("1efeeb2c14500588");
const { Logger, sc } = require("64e6154f69b290dc");
class ClanMessageListener {
    async executeClientMessageActions(props) {
        let message = sc.get(props, 'message', false);
        if (!message) {
            Logger.error('Missing message data on ClanMessageListener.', props);
            return false;
        }
        let roomEvents = sc.get(props, 'roomEvents', false);
        if (!roomEvents) {
            Logger.error('Missing RoomEvents on ClanMessageListener.', props);
            return false;
        }
        let clanMessageHandler = new ClanMessageHandler({
            roomEvents,
            message
        });
        if (!clanMessageHandler.validate()) {
            if (this.isClanMessage(message)) {
                if (!roomEvents.clanMessagesQueue) roomEvents.clanMessagesQueue = [];
                roomEvents.clanMessagesQueue.push(message);
            }
            return false;
        }
        if (!this.isClanMessage(message)) return false;
        return this.handleClanMessage(message, clanMessageHandler);
    }
    handleClanMessage(message, clanMessageHandler) {
        if (TeamsConst.ACTIONS.CLAN_INITIALIZE === message.act) return clanMessageHandler.initializeClanUi();
        if (TeamsConst.ACTIONS.CLAN_CREATE === message.act) {
            if (TeamsConst.VALIDATION.SUCCESS === message.result) return clanMessageHandler.showNewClan();
            return clanMessageHandler.initializeClanUi();
        }
        if (TeamsConst.ACTIONS.CLAN_INVITE === message.act) return clanMessageHandler.showClanRequest();
        if (TeamsConst.ACTIONS.CLAN_UPDATE === message.act) return clanMessageHandler.showClanBox();
        if (TeamsConst.ACTIONS.CLAN_LEFT === message.act) return clanMessageHandler.removeClanUi();
        if (TeamsConst.ACTIONS.CLAN_REMOVED) {
            clanMessageHandler.removeClanUi();
            return clanMessageHandler.initializeClanUi();
        }
        return true;
    }
    isClanMessage(message) {
        return 0 === message.act?.indexOf(TeamsConst.CLAN_PREF);
    }
}
module.exports.ClanMessageListener = ClanMessageListener;

},{"59d0db5e0ce1f07e":"9xZiZ","1efeeb2c14500588":"l0mrS","64e6154f69b290dc":"@reldens/utils"}],"9xZiZ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ClanMessageHandler
 *
 */ const { UserInterface } = require("9d187b52307fde77");
const { TeamsConst } = require("341f5c6f882a14b2");
const { Logger, sc } = require("e2c8e2f4e3b71ead");
class ClanMessageHandler {
    constructor(props){
        this.roomEvents = sc.get(props, 'roomEvents', false);
        this.message = sc.get(props, 'message', false);
        this.gameManager = this.roomEvents?.gameManager;
        this.gameDom = this.gameManager?.gameDom;
        this.uiScene = this.gameManager?.gameEngine?.uiScene;
    }
    validate() {
        if (!this.roomEvents) {
            Logger.info('Missing RoomEvents on ClanMessageHandler.');
            return false;
        }
        if (!this.message) {
            Logger.info('Missing message on ClanMessageHandler.');
            return false;
        }
        if (!this.gameManager) {
            Logger.info('Missing GameManager on ClanMessageHandler.');
            return false;
        }
        if (!this.uiScene) // @NOTE: the message could arrive before the uiScene gets ready.
        // Logger.info('Missing UI Scene on ClanMessageHandler.');
        return false;
        return this.gameManager.playerData?.id;
    }
    initializeClanUi() {
        this.uiScene.currentClan = false;
        let clanUi = this.createClanUi();
        let title = this.gameManager.config.getWithoutLogs('client/clan/labels/createClanTitle', TeamsConst.LABELS.CLAN.CREATE_CLAN_TITLE);
        let container = this.gameManager.gameDom.getElement('.clan-dialog-box .box-content');
        if (!container) {
            Logger.error('Missing container: "#box-clan .box-content".');
            return false;
        }
        let uiBox = this.uiScene.elementsUi[TeamsConst.CLAN_KEY];
        if (!uiBox) {
            Logger.error('Clan UI box not found.', {
                clanUi,
                container,
                uiBox
            });
            return false;
        }
        this.roomEvents.uiSetTitle(uiBox, {
            title
        });
        this.roomEvents.uiSetContent(uiBox, {
            content: this.createClanContent()
        }, this.uiScene);
        this.activateCreateButton();
        this.addAndRemoveCaptureKeys();
    }
    showNewClan() {
        let clanUi = this.createClanUi();
        let title = this.gameManager.config.getWithoutLogs('client/clan/labels/clanTitle', TeamsConst.LABELS.CLAN.CLAN_TITLE).replace('%clanName', this.message.clanName).replace('%leaderName', this.gameManager.currentPlayerName());
        let container = this.gameManager.gameDom.getElement('.clan-dialog-box .box-content');
        if (!container) {
            Logger.error('Missing container: ".clan-dialog-box .box-content".');
            return false;
        }
        let uiBox = this.uiScene.elementsUi[TeamsConst.CLAN_KEY];
        if (!uiBox) {
            Logger.error('Clan UI box not found.', {
                clanUi,
                container,
                uiBox
            });
            return false;
        }
        this.roomEvents.uiSetTitle(uiBox, {
            title
        });
        this.roomEvents.uiSetContent(uiBox, {
            content: ''
        }, this.uiScene);
        this.updateClanBox(container);
        this.setClanFromMessage();
    }
    showClanRequest() {
        this.createClanUi();
        this.roomEvents.initUi({
            id: TeamsConst.CLAN_KEY,
            title: this.gameManager.config.getWithoutLogs('client/clan/labels/requestFromTitle', TeamsConst.LABELS.CLAN.REQUEST_FROM),
            content: this.message.from,
            options: this.gameManager.config.get('client/ui/options/acceptOrDecline'),
            overrideSendOptions: {
                act: TeamsConst.ACTIONS.CLAN_ACCEPTED,
                id: this.message.id
            }
        });
        this.gameDom.getElement('#opt-2-clan')?.addEventListener('click', ()=>{
            this.initializeClanUi();
        });
    }
    showClanBox() {
        this.createClanUi();
        let title = this.gameManager.config.getWithoutLogs('client/clan/labels/clanTitle', TeamsConst.LABELS.CLAN.CLAN_TITLE).replace('%clanName', this.message.clanName).replace('%leaderName', this.message.leaderName);
        let container = this.gameManager.gameDom.getElement('#box-clan .box-content');
        if (!container) {
            Logger.error('Missing container: "#box-clan .box-content".');
            return false;
        }
        let uiBox = this.uiScene.elementsUi[TeamsConst.CLAN_KEY];
        this.roomEvents.uiSetTitle(uiBox, {
            title
        });
        this.roomEvents.uiSetContent(uiBox, {
            content: ''
        }, this.uiScene);
        this.setClanFromMessage();
        this.updateClanBox(container);
    }
    setClanFromMessage() {
        let players = sc.get(this.message, 'players', false);
        let members = sc.get(this.message, 'members', false);
        this.uiScene.currentClan = {
            id: this.message.id,
            name: this.message.clanName,
            leader: this.message.leaderName,
            ownerId: this.message.ownerId,
            players,
            members
        };
    }
    removeClanUi() {
        let uiElement = this.gameManager.getUiElement(TeamsConst.CLAN_KEY);
        if (!uiElement) {
            Logger.error('Clan UI Element not found for remove.');
            return false;
        }
        uiElement.removeElement();
        delete this.uiScene.userInterfaces[TeamsConst.CLAN_KEY];
        delete this.uiScene.elementsUi[TeamsConst.CLAN_KEY];
    }
    createClanUi() {
        let clanUi = sc.get(this.uiScene.userInterfaces, TeamsConst.CLAN_KEY);
        if (clanUi) return clanUi;
        if (!this.uiScene.userInterfaces) this.uiScene.userInterfaces = {};
        this.uiScene.userInterfaces[TeamsConst.CLAN_KEY] = new UserInterface(this.gameManager, {
            id: TeamsConst.CLAN_KEY,
            type: TeamsConst.CLAN_KEY,
            defaultOpen: true,
            defaultClose: true
        }, '/assets/features/teams/templates/ui-clan.html', TeamsConst.CLAN_KEY);
        this.uiScene.userInterfaces[TeamsConst.CLAN_KEY].createUiElement(this.uiScene, TeamsConst.CLAN_KEY);
        return this.uiScene.userInterfaces[TeamsConst.CLAN_KEY];
    }
    createClanContent() {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get('clanCreate');
        if (!templateContent) {
            Logger.error('Missing template "clanCreate".');
            return '';
        }
        let templateParams = {
            playerId: this.gameManager.playerData.id.toString(),
            createLabel: this.gameManager.config.getWithoutLogs('client/clan/labels/createLabel', TeamsConst.LABELS.CLAN.CREATE),
            clanNamePlaceholder: this.gameManager.config.getWithoutLogs('client/clan/labels/namePlaceholder', TeamsConst.LABELS.CLAN.NAME_PLACEHOLDER)
        };
        return this.gameManager.gameEngine.parseTemplate(templateContent, templateParams);
    }
    activateCreateButton() {
        let createButton = this.gameManager.gameDom.getElement('.clan-dialog-box .submit-clan-create');
        if (!createButton) {
            Logger.warning('Clan create button not found by ".clan-dialog-box .clan-create".');
            return false;
        }
        let nameInput = this.gameManager.gameDom.getElement('.clan-dialog-box .clan-name-input');
        if (!nameInput) {
            Logger.warning('Clan create button not found by ".clan-dialog-box .clan-name-input".');
            return false;
        }
        createButton.addEventListener('click', ()=>{
            if (0 === nameInput.value.length) return false;
            this.gameManager.gameDom.updateContent('.clan-dialog-box .box-content', this.uiScene.cache.html.get('uiLoading'));
            this.gameManager.activeRoomEvents.send({
                act: TeamsConst.ACTIONS.CLAN_CREATE,
                [TeamsConst.ACTIONS.CLAN_NAME]: nameInput.value
            });
        });
    }
    updateClanBox(container) {
        let players = sc.get(this.message, 'players', []);
        let connectedPlayersKeys = Object.keys(players);
        let clanPlayers = 0 === connectedPlayersKeys.length ? this.gameManager.config.getWithoutLogs('client/clan/labels/noneConnected', TeamsConst.LABELS.CLAN.NONE_CONNECTED) : '';
        for (let i of connectedPlayersKeys)clanPlayers += this.createClanPlayerBox(players[i]);
        let isPlayerOwner = this.gameManager.playerData.id.toString() === this.message.ownerId.toString();
        let members = sc.get(this.message, 'members', []);
        let clanMembers = '';
        for (let i of Object.keys(members))clanMembers += this.createClanMemberBox(members[i], isPlayerOwner);
        container.innerHTML = this.createClanContainer(clanPlayers, clanMembers);
        this.activateClanPlayersActions(players);
        this.activateClanMembersActions(members);
        this.activateClanLeaveButtonAction();
    }
    addAndRemoveCaptureKeys() {
        let dynamicScene = this.gameManager.getActiveScene();
        let keys = dynamicScene.availableControllersKeyCodes();
        let inputElement = this.gameManager.gameDom.getElement('.clan-name-input');
        dynamicScene.addAndRemoveCapture(keys, inputElement);
    }
    createClanContainer(clanPlayers, clanMembers) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get('clanContainer');
        if (!templateContent) {
            Logger.error('Missing template "clanContainer".');
            return '';
        }
        let isPlayerOwner = this.gameManager.playerData.id.toString() === this.message.ownerId.toString();
        let leaveActionLabel = isPlayerOwner ? this.gameManager.config.getWithoutLogs('client/clan/labels/disbandLabel', TeamsConst.LABELS.CLAN.DISBAND) : this.gameManager.config.getWithoutLogs('client/clan/labels/leaveLabel', TeamsConst.LABELS.CLAN.LEAVE);
        let templateParams = {
            clanId: this.message.id,
            playerId: this.gameManager.playerData.id.toString(),
            leaveActionLabel: leaveActionLabel,
            clanPlayersTitle: this.gameManager.config.getWithoutLogs('client/clan/labels/clanPlayersTitle', TeamsConst.LABELS.CLAN.PLAYERS_TITLE),
            clanPlayers,
            clanMembersTitle: this.gameManager.config.getWithoutLogs('client/clan/labels/clanMembersTitle', TeamsConst.LABELS.CLAN.MEMBERS_TITLE),
            clanMembers
        };
        return this.gameManager.gameEngine.parseTemplate(templateContent, templateParams);
    }
    activateClanLeaveButtonAction() {
        let leaveButton = this.gameManager.gameDom.getElement('.leave-' + this.message.id);
        leaveButton?.addEventListener('click', ()=>{
            let sendData = {
                act: TeamsConst.ACTIONS.CLAN_LEAVE,
                id: this.message.id
            };
            this.gameManager.activeRoomEvents.send(sendData);
        });
    }
    createClanPlayerBox(playerData) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get('clanPlayerData');
        if (!templateContent) {
            Logger.error('Missing template "clanPlayerData".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(templateContent, {
            playerId: playerData.player_id,
            playerName: playerData.name,
            playerProperties: this.createSharedPropertiesContent(playerData.sharedProperties)
        });
    }
    createClanMemberBox(playerData, isPlayerOwner) {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get('clanMemberData');
        if (!templateContent) {
            Logger.error('Missing template "clanMemberData".');
            return '';
        }
        let showPlayerRemove = playerData.id.toString() !== this.message.ownerId.toString();
        return this.gameManager.gameEngine.parseTemplate(templateContent, {
            playerId: playerData.id.toString(),
            playerName: playerData.name,
            clanRemove: isPlayerOwner && showPlayerRemove ? this.createDismissPlayerButton(playerData) : ''
        });
    }
    createDismissPlayerButton(playerData) {
        let templateContent = this.uiScene.cache.html.get('clanRemove');
        if (!templateContent) {
            Logger.error('Missing template "clanRemove".');
            return '';
        }
        return this.gameManager.gameEngine.parseTemplate(templateContent, {
            playerId: playerData.id.toString()
        });
    }
    createSharedPropertiesContent(playerSharedProperties) {
        let templateContent = this.uiScene.cache.html.get('teamsSharedProperty');
        if (!templateContent) {
            Logger.error('Missing template "teamsSharedProperty".');
            return '';
        }
        let sharedPropertiesContent = '';
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        for (let i of Object.keys(playerSharedProperties)){
            templateContent = this.uiScene.cache.html.get('teamsSharedProperty');
            let propertyData = playerSharedProperties[i];
            let propertyMaxValue = sc.get(propertyData, 'max', '');
            if ('' !== propertyMaxValue) propertyMaxValue = this.gameManager.config.getWithoutLogs('client/clan/labels/propertyMaxValue', TeamsConst.LABELS.CLAN.PROPERTY_MAX_VALUE).replace('%propertyMaxValue', propertyMaxValue);
            sharedPropertiesContent += this.gameManager.gameEngine.parseTemplate(templateContent, {
                key: i,
                label: propertyData.label,
                value: propertyData.value,
                max: propertyMaxValue
            });
        }
        return sharedPropertiesContent;
    }
    activateClanPlayersActions(playersData) {
        for (let i of Object.keys(playersData)){
            let playerData = playersData[i];
            let selectorPlayerName = '.clan-player-' + i + ' .player-name';
            let selectorPlayerProperties = '.clan-player-' + i + ' .properties-list-container';
            let playerNameElement = this.gameDom.getElement(selectorPlayerName);
            if (!playerNameElement) Logger.notice('Player name element not found.', selectorPlayerName);
            playerNameElement?.addEventListener('click', ()=>{
                this.gameManager.getCurrentPlayer().setTargetPlayerById(playerData.sessionId);
            });
            let playerPropertiesElement = this.gameDom.getElement(selectorPlayerProperties);
            if (!playerNameElement) Logger.notice('Player properties element not found.', selectorPlayerProperties);
            playerPropertiesElement?.addEventListener('click', ()=>{
                this.gameManager.getCurrentPlayer().setTargetPlayerById(playerData.sessionId);
            });
        }
    }
    activateClanMembersActions(membersData) {
        for (let i of Object.keys(membersData)){
            let memberData = membersData[i];
            let selectorPlayerRemove = '.clan-member-' + memberData.id + ' .clan-remove-button';
            this.gameDom.getElement(selectorPlayerRemove)?.addEventListener('click', ()=>{
                this.gameManager.activeRoomEvents.send({
                    act: TeamsConst.ACTIONS.CLAN_REMOVE,
                    id: this.message.id,
                    remove: memberData.id
                });
            });
        }
    }
}
module.exports.ClanMessageHandler = ClanMessageHandler;

},{"9d187b52307fde77":"kO7Qp","341f5c6f882a14b2":"l0mrS","e2c8e2f4e3b71ead":"@reldens/utils"}],"eBVhl":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesProcessor
 *
 */ const { ClanMessageHandler } = require("da134dc7ceb7b0e1");
const { TeamMessageHandler } = require("5001168d3eb6bb8b");
const { sc } = require("fbaf401da21f7609");
class MessagesProcessor {
    static processClanMessagesQueue(roomEvents, clanMessageListener) {
        if (!sc.isArray(roomEvents.clanMessagesQueue)) return;
        if (0 === roomEvents.clanMessagesQueue.length) return;
        for (let message of roomEvents.clanMessagesQueue)clanMessageListener.handleClanMessage(message, new ClanMessageHandler({
            roomEvents,
            message
        }));
        roomEvents.clanMessagesQueue = [];
    }
    static processTeamMessagesQueue(roomEvents, teamMessageListener) {
        if (!sc.isArray(roomEvents.teamMessagesQueue)) return;
        if (0 === roomEvents.teamMessagesQueue.length) return;
        for (let message of roomEvents.teamMessagesQueue)teamMessageListener.handleTeamMessage(message, new TeamMessageHandler({
            roomEvents,
            message
        }));
        roomEvents.teamMessagesQueue = [];
    }
}
module.exports.MessageProcessor = MessagesProcessor;

},{"da134dc7ceb7b0e1":"9xZiZ","5001168d3eb6bb8b":"gnDKG","fbaf401da21f7609":"@reldens/utils"}],"ayvT6":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TemplatesHandler
 *
 */ const { TeamsConst } = require("58174eedacbcbef5");
class TemplatesHandler {
    static preloadTemplates(preloadScene) {
        let teamsTemplatePath = '/assets/features/teams/templates/';
        preloadScene.load.html(TeamsConst.KEY, teamsTemplatePath + 'ui-teams.html');
        preloadScene.load.html(TeamsConst.CLAN_KEY, teamsTemplatePath + 'ui-clan.html');
        preloadScene.load.html('teamPlayerInvite', teamsTemplatePath + 'team-invite.html');
        preloadScene.load.html('teamPlayerAccept', teamsTemplatePath + 'team-accept.html');
        preloadScene.load.html('teamRemove', teamsTemplatePath + 'team-remove.html');
        preloadScene.load.html('teamContainer', teamsTemplatePath + 'team-container.html');
        preloadScene.load.html('teamPlayerData', teamsTemplatePath + 'team-player-data.html');
        preloadScene.load.html('clanCreate', teamsTemplatePath + 'clan-create.html');
        preloadScene.load.html('clanPlayerInvite', teamsTemplatePath + 'clan-invite.html');
        preloadScene.load.html('clanPlayerAccept', teamsTemplatePath + 'clan-accept.html');
        preloadScene.load.html('clanRemove', teamsTemplatePath + 'clan-remove.html');
        preloadScene.load.html('clanContainer', teamsTemplatePath + 'clan-container.html');
        preloadScene.load.html('clanPlayerData', teamsTemplatePath + 'clan-player-data.html');
        preloadScene.load.html('clanMemberData', teamsTemplatePath + 'clan-member-data.html');
        preloadScene.load.html('teamsSharedProperty', teamsTemplatePath + 'shared-property.html');
    }
}
module.exports.TemplatesHandler = TemplatesHandler;

},{"58174eedacbcbef5":"l0mrS"}],"2Xir8":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Snippets Client Plugin
 *
 */ const { Translator } = require("e30167c0897ac135");
const { SnippetsUi } = require("2d33d4d804e9951f");
const { TemplatesHandler } = require("e956d7a83f618c7f");
const { TranslationsMapper } = require("3dab08141eaf4d61");
const Translations = require("18b73f134deeadaa");
const { SnippetsConst } = require("356d0138dc841911");
const { PluginInterface } = require("f78bfa8e0318b9ca");
const { Logger, sc } = require("520563192e10fe30");
class SnippetsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in InventoryPlugin.');
            return false;
        }
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in InventoryPlugin.');
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations);
        this.activeLocale = this.gameManager.initialGameData?.userLocale?.locale.locale || SnippetsConst.DEFAULT_LOCALE;
        this.gameManager.services.translator = new Translator({
            snippets: Object.assign({}, this.gameManager.config.client.snippets),
            dataValues: Object.assign({}, this.gameManager.config.client.snippetsDataValues),
            locale: SnippetsConst.DEFAULT_LOCALE,
            activeLocale: this.activeLocale
        });
        this.listenEvents();
    }
    listenEvents() {
        if (!this.events) return false;
        this.events.on('reldens.startEngineScene', async (roomEvents, player, room, previousScene)=>{
            // @TODO - BETA - Test for possible differences.
            // re-assign the snippets after all the plugins added their own sets (search TranslationsMapper.forConfig)
            this.gameManager.services.translator.snippets = Object.assign(this.gameManager.services.translator.snippets, this.gameManager.config.client.snippets);
        });
        this.events.on('reldens.preloadUiScene', (preloadScene)=>{
            TemplatesHandler.preloadTemplates(preloadScene);
        });
        this.events.on('reldens.createUiScene', (preloadScene)=>{
            this.uiManager = new SnippetsUi(preloadScene);
            this.uiManager.createUi();
        });
    }
}
module.exports.SnippetsPlugin = SnippetsPlugin;

},{"e30167c0897ac135":"1sLjx","2d33d4d804e9951f":"6ivdZ","e956d7a83f618c7f":"axtzh","3dab08141eaf4d61":"fKH2J","18b73f134deeadaa":"8k9fK","356d0138dc841911":"9VbHC","f78bfa8e0318b9ca":"deNd3","520563192e10fe30":"@reldens/utils"}],"1sLjx":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translator
 *
 */ const { SnippetsConst } = require("b71f11da09eccdde");
const { sc } = require("62e09c29e13db7ae");
class Translator {
    constructor(props){
        this.snippets = sc.get(props, 'snippets', {});
        this.dataValues = sc.get(props, 'dataValues', {});
        this.locale = sc.get(props, 'locale', SnippetsConst.DEFAULT_LOCALE);
        this.activeLocale = sc.get(props, 'activeLocale', SnippetsConst.DEFAULT_LOCALE);
    }
    translate(snippetKey, params = {}, activeLocale = false) {
        if (!activeLocale) activeLocale = this.activeLocale;
        let currentSnippet = sc.get(this.snippets[activeLocale], snippetKey, snippetKey);
        if (snippetKey === currentSnippet) return snippetKey;
        if (!sc.isObject(params)) return currentSnippet;
        let paramsKeys = Object.keys(params);
        if (0 === paramsKeys.length) return currentSnippet;
        let nameSpace = this.snippetNameSpace(snippetKey);
        for (let i of paramsKeys){
            let param = params[i];
            let replaceKey = '%' + ((this.dataValues[nameSpace] || {})[i] || i);
            while(-1 !== currentSnippet.indexOf(replaceKey))currentSnippet = currentSnippet.replace(replaceKey, param);
        }
        return currentSnippet;
    }
    snippetNameSpace(snippetKey) {
        let keys = snippetKey.split('.');
        if (1 === keys.length) return SnippetsConst.DATA_VALUES_DEFAULT_NAMESPACE;
        return keys[0];
    }
    t(snippetKey, params = {}, activeLocale = false) {
        return this.translate(snippetKey, params, activeLocale);
    }
}
module.exports.Translator = Translator;

},{"b71f11da09eccdde":"9VbHC","62e09c29e13db7ae":"@reldens/utils"}],"6ivdZ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SnippetsUi
 *
 */ const { SnippetsConst } = require("aa7de636e8c53e52");
const { Logger, sc } = require("5e6402edf9f7ac34");
class SnippetsUi {
    constructor(uiScene){
        this.uiScene = uiScene;
        this.gameManager = this.uiScene.gameManager;
        this.translator = this.gameManager.services.translator;
        this.locales = {};
    }
    createUi() {
        this.locales = sc.get(this.gameManager.config.client, 'locales', {});
        let localesKeys = Object.keys(this.locales);
        // if there's only one locale then don't show the locale selector:
        if (1 >= localesKeys.length) return false;
        let snippetsSettings = this.gameManager.gameEngine.parseTemplate(this.uiScene.cache.html.get(SnippetsConst.KEY), {
            snippetsTitle: this.translator.t('translator.title'),
            snippetsLabel: this.translator.t('translator.label'),
            snippetsNotification: this.translator.t('translator.notification')
        });
        let appendResult = this.gameManager.gameDom.appendToElement('#settings-dynamic', snippetsSettings);
        if (!appendResult) {
            Logger.warning('Could not append snippets settings.');
            return false;
        }
        let localeSelector = this.gameManager.gameDom.getElement('.snippets-setting');
        if (!localeSelector) {
            Logger.warning('Snippets settings container not available.');
            return false;
        }
        for (let i of localesKeys){
            let locale = this.locales[i];
            let localeOption = this.gameManager.gameDom.createElement('option');
            localeOption.value = locale.id;
            localeOption.innerHTML = locale.country_code;
            localeSelector.appendChild(localeOption);
        }
        localeSelector.addEventListener('change', async ()=>{
            this.gameManager.activeRoomEvents.send({
                act: SnippetsConst.ACTIONS.UPDATE,
                up: localeSelector.value
            });
        });
    }
}
module.exports.SnippetsUi = SnippetsUi;

},{"aa7de636e8c53e52":"9VbHC","5e6402edf9f7ac34":"@reldens/utils"}],"axtzh":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - TemplatesHandler
 *
 */ const { SnippetsConst } = require("e36cad96ed3e70cd");
class TemplatesHandler {
    static preloadTemplates(preloadScene) {
        let teamsTemplatePath = '/assets/features/snippets/templates/';
        preloadScene.load.html(SnippetsConst.KEY, teamsTemplatePath + 'ui-snippets.html');
    }
}
module.exports.TemplatesHandler = TemplatesHandler;

},{"e36cad96ed3e70cd":"9VbHC"}],"8k9fK":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    translator: {
        title: 'Languages Settings',
        label: 'Choose your language:',
        notification: 'Changes will take place after next login.'
    }
};

},{}],"k2r2D":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AdsPlugin
 *
*/ const { MessagesListener } = require("888d5cbc978fa0d6");
const { SdkHandler } = require("c62ae531dc47df64");
const { ProvidersList } = require("817954c8ae5bd30f");
const Translations = require("3b2b9c9a21730037");
const { TranslationsMapper } = require("8e1bd14e8842dbbb");
const { AdsConst } = require("34045a03c82a6a52");
const { PluginInterface } = require("b837e866da6d66e2");
const { Logger, sc } = require("f840b20eea122e5a");
class AdsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        if (!this.gameManager) Logger.error('Game Manager undefined in AdsPlugin.');
        this.events = sc.get(props, 'events', false);
        if (!this.events) Logger.error('EventsManager undefined in AdsPlugin.');
        this.config = {};
        this.activeProviders = {};
        this.playedAds = null;
        this.setConfig();
        this.setSkdHandler();
        this.fetchActiveProviders();
        this.setTranslations();
        this.listenEvents();
    }
    setConfig() {
        this.config = this.gameManager ? this.gameManager.config.get('client/ads/general', {}) : false;
    }
    setSkdHandler() {
        let gameDom = this.gameManager?.gameDom;
        this.sdkHandler = gameDom ? new SdkHandler({
            gameDom,
            config: this.config
        }) : false;
    }
    fetchActiveProviders() {
        let providers = sc.get(this.config, 'providers', {});
        let providersKeys = Object.keys(providers);
        if (0 === providersKeys.length) //Logger.debug('None ads providers configured.', this.config);
        return false;
        for (let i of providersKeys){
            let provider = providers[i];
            if (!provider.enabled) continue;
            provider.classDefinition = sc.get(ProvidersList, i, false);
            this.activeProviders[i] = provider;
        }
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, AdsConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        if (!this.events || !this.gameManager || !this.sdkHandler) {
            Logger.error('Missing properties for AdsPlugin.');
            return false;
        }
        this.events.on('reldens.beforeCreateEngine', async (initialGameData, gameManager)=>{
            if (!this.sdkHandler) {
                Logger.info('Undefined SDK Handler.');
                return;
            }
            await this.sdkHandler.setupProvidersSdk(this.activeProviders, gameManager);
        });
        this.events.on('reldens.joinedRoom', async (room)=>{
            await MessagesListener.listenMessages(room, this);
        });
    }
}
module.exports.AdsPlugin = AdsPlugin;

},{"888d5cbc978fa0d6":"5YDGE","c62ae531dc47df64":"5YFfi","817954c8ae5bd30f":"jWpUe","3b2b9c9a21730037":"crjkm","8e1bd14e8842dbbb":"fKH2J","34045a03c82a6a52":"j6ZnJ","b837e866da6d66e2":"deNd3","f840b20eea122e5a":"@reldens/utils"}],"5YDGE":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesListener
 *
 */ const { AdsConst } = require("29cd206e54f27180");
const { Logger } = require("444002dbc8b0c3f6");
class MessagesListener {
    static async listenMessages(room, adsPlugin) {
        room.onMessage('*', (message)=>{
            if (AdsConst.ACTIONS.ADS_PLAYED !== message.act) return false;
            adsPlugin.playedAds = {};
            if (!message.playedAdsModels) {
                Logger.info('None played ads.', message);
                return false;
            }
            for (let playedAd of message.playedAdsModels)adsPlugin.playedAds[playedAd.ads_id] = playedAd;
            return true;
        });
    }
}
module.exports.MessagesListener = MessagesListener;

},{"29cd206e54f27180":"j6ZnJ","444002dbc8b0c3f6":"@reldens/utils"}],"j6ZnJ":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AdsConst
 *
 */ module.exports.AdsConst = {
    ENVIRONMENTS: {
        DISABLED: 'disabled'
    },
    ADS_TYPES: {
        EVENT_VIDEO: 'eventVideo',
        BANNER: 'banner'
    },
    ACTIONS: {
        ADS_PLAYED: 'adsP',
        AD_STARTED: 'adS',
        AD_ENDED: 'adE'
    },
    MESSAGE: {
        DATA_VALUES: {
            NAMESPACE: 'ads'
        }
    },
    AWAIT_ADS_TIME: 1000,
    VIDEOS_MINIMUM_DURATION: 3000
};

},{}],"5YFfi":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - SdkHandler
 *
 */ const { Logger, sc } = require("dff6c1e89c3e052a");
class SdkHandler {
    constructor(props){
        this.gameDom = sc.get(props, 'gameDom', false);
    }
    async setupProvidersSdk(providers, gameManager) {
        if (!this.gameDom) {
            Logger.error('Undefined GameDOM on SdkHandler.');
            return false;
        }
        if (!sc.isObject(providers)) //Logger.debug('Providers not available.');
        return false;
        let keys = Object.keys(providers);
        if (0 === keys.length) //Logger.debug('Providers not found.');
        return false;
        for (let i of keys){
            let provider = providers[i];
            await this.appendSdk(provider);
            await this.activateSdkInstance(provider, gameManager);
            Logger.info('Activated Ads SDK: ' + provider.key, provider);
        }
    }
    async appendSdk(provider) {
        let sdkUrl = sc.get(provider, 'sdkUrl', '');
        if ('' === sdkUrl) //Logger.debug('Provider does not have an SDK URL.', provider);
        return false;
        let body = this.gameDom.getElement('body');
        let sdkSource = this.gameDom.createElement('script');
        sdkSource.src = sdkUrl;
        body.append(sdkSource);
        return true;
    }
    async activateSdkInstance(provider, gameManager) {
        if (provider.classDefinition) provider.service = new provider.classDefinition(provider, gameManager, provider.activeAds);
        if (sc.isFunction(provider.service?.activate)) await provider.service.activate();
    }
}
module.exports.SdkHandler = SdkHandler;

},{"dff6c1e89c3e052a":"@reldens/utils"}],"jWpUe":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ProvidersList
 *
 */ const { CrazyGames } = require("3f8ed3d61d7ffec6");
const { GameMonetize } = require("8293bf532f21e603");
const { GoogleAdSense } = require("ce031fd04ee80412");
module.exports.ProvidersList = {
    crazyGames: CrazyGames,
    gameMonetize: GameMonetize,
    googleAdSense: GoogleAdSense
};

},{"3f8ed3d61d7ffec6":"gDQgO","8293bf532f21e603":"kgBzD","ce031fd04ee80412":"kbF2P"}],"gDQgO":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - CrazyGames
 *
 * SDK documentation: https://docs.crazygames.com/sdk/html5-v2/#request-banner
 *
 */ const { BannersHandler } = require("a9a3d844c8af144f");
const { VideosHandler } = require("bde738a7c1ada691");
const { AdsProvider } = require("226c5e70dbcf853");
const { AdsConst } = require("f244e70172b4d33e");
const { Logger } = require("676e545998789235");
class CrazyGames {
    constructor(providerModel, gameManager){
        this.gameManager = gameManager;
        this.gameDom = gameManager?.gameDom;
        this.events = gameManager?.events;
        this.window = gameManager?.gameDom?.getWindow();
        this.metaData = providerModel;
        this.sdk = this.window?.CrazyGames?.SDK;
        this.retry = 0;
        this.environment = AdsConst.ENVIRONMENTS.DISABLED;
        if (!this.metaData.sdkRetryTime) this.metaData.sdkRetryTime = 500;
        if (!this.metaData.sdkMaxRetries) this.metaData.sdkMaxRetries = 10;
        if (!this.metaData.sdkBannerRefreshTime) this.metaData.sdkBannerRefreshTime = 60000; // 60s by documentation
        this.activeAds = this.fetchActiveAds(providerModel);
        let handlersProps = {
            gameManager,
            metaData: providerModel,
            sdk: this.sdk,
            hasAdblock: this.hasAdblock,
            isEnabled: this.isEnabled
        };
        this.bannersHandler = new BannersHandler(handlersProps);
        this.videosHandler = new VideosHandler(handlersProps);
    }
    fetchActiveAds(providerModel) {
        if (!this.gameManager?.config) return {};
        return AdsProvider.fetchActiveAdsByProviderId(providerModel.id, this.validAdsTypes(), this.gameManager.config.get('client/ads/collection', {}));
    }
    validAdsTypes() {
        return [
            AdsConst.ADS_TYPES.BANNER,
            AdsConst.ADS_TYPES.EVENT_VIDEO
        ];
    }
    async activate() {
        if (!this.sdk) {
            if (this.retry === this.metaData.sdkMaxRetries) {
                Logger.critical('CrazyGames required object.');
                return false;
            }
            if (this.retry < this.metaData.sdkMaxRetries) setTimeout(()=>{
                this.retry++;
                Logger.info('CrazyGames required object, retry #' + this.retry + '.');
                this.sdk = this.window?.CrazyGames?.SDK;
                if (this.sdk) Logger.info('CrazyGames object found.');
                this.activate();
            }, this.metaData.sdkRetryTime);
            return false;
        }
        this.environment = await this.sdk.getEnvironment();
        this.bannersHandler.sdk = this.sdk;
        this.videosHandler.sdk = this.sdk;
        if (await this.hasAdblock()) return false;
        await this.activateAds();
    }
    async hasAdblock() {
        try {
            let result = await this.sdk.ad.hasAdblock();
            if (result) Logger.critical('Adblock detected, please disable.');
            return result;
        } catch (error) {
            Logger.info('SDK detected error.', error);
        }
        return false;
    }
    async isEnabled() {
        return AdsConst.ENVIRONMENTS.DISABLED !== await this.sdk.getEnvironment();
    }
    async activateAds() {
        let activeKeys = Object.keys(this.activeAds);
        if (0 === activeKeys.length) return false;
        for (let i of activeKeys){
            let activeAd = this.activeAds[i];
            if (AdsConst.ADS_TYPES.BANNER === activeAd.type.key) await this.bannersHandler.activateAdBanner(activeAd);
            if (AdsConst.ADS_TYPES.EVENT_VIDEO === activeAd.type.key) await this.videosHandler.activateAdVideo(activeAd);
        }
    }
}
module.exports.CrazyGames = CrazyGames;

},{"a9a3d844c8af144f":"1hC4K","bde738a7c1ada691":"4KRVS","226c5e70dbcf853":"9kr03","f244e70172b4d33e":"j6ZnJ","676e545998789235":"@reldens/utils"}],"1hC4K":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - BannersHandler
 *
 */ const { Validator } = require("b20ca8ca1f25148d");
const { Logger, sc } = require("96ec63b9db0e75b5");
class BannersHandler {
    constructor(props){
        this.gameManager = sc.get(props, 'gameManager', false);
        this.metaData = sc.get(props, 'metaData', {});
        this.gameDom = this.gameManager?.gameDom;
        this.events = this.gameManager?.events;
        this.sdk = sc.get(props, 'sdk', false);
        this.hasAdblock = sc.get(props, 'hasAdblock', false);
        this.isEnabled = sc.get(props, 'isEnabled', false);
        this.activeBanners = {};
        this.validator = new Validator();
    }
    availableBanners() {
        return [
            '728x90',
            '300x250',
            '320x50',
            '468x60',
            '320x100'
        ];
    }
    availableResponsiveBanners() {
        return [
            '970x90',
            '320x50',
            '160x600',
            '336x280',
            '728x90',
            '300x600',
            '468x60',
            '970x250',
            '300x250',
            '250x250',
            '120x600'
        ];
    }
    validBannerSize(size) {
        return -1 !== this.availableBanners().indexOf(size);
    }
    validResponsiveBannerSize(size) {
        return -1 !== this.availableResponsiveBanners().indexOf(size);
    }
    async activateAdBanner(activeAd) {
        if (!activeAd) {
            Logger.info('Missing activate ad.', activeAd);
            return false;
        }
        if (!this.validator.validate(this)) {
            Logger.info('Invalid banner.');
            return false;
        }
        let bannerData = activeAd.bannerData;
        if (!bannerData) {
            Logger.info('No banner data.');
            return false;
        }
        let isFullTimeBanner = sc.get(bannerData, 'fullTime', false);
        let isResponsive = sc.get(bannerData, 'responsive', false);
        if (isFullTimeBanner) return await this.handleBannerType(isResponsive, activeAd);
        let uiReferenceIds = sc.get(bannerData, 'uiReferenceIds', []);
        if (0 === uiReferenceIds.length) {
            Logger.warning('Missing banner reference ID.');
            return false;
        }
        this.events.on('reldens.openUI', async (event)=>{
            if (-1 !== uiReferenceIds.indexOf('ANY') || -1 !== uiReferenceIds.indexOf(event.openButton.id)) {
                let bannerLocalStorageKey = activeAd.id + '-' + event.openButton.id;
                let createdAt = new Date().getTime();
                let activeBanner = sc.get(this.activeBanners, bannerLocalStorageKey, false);
                if (activeBanner && createdAt < activeBanner.createdAt + this.metaData.sdkBannerRefreshTime) {
                    activeBanner.banner.classList.remove('hidden');
                    return;
                }
                if (activeBanner) activeBanner.banner.remove();
                let banner = await this.handleBannerType(isResponsive, activeAd, bannerLocalStorageKey);
                this.activeBanners[bannerLocalStorageKey] = {
                    createdAt,
                    banner
                };
            }
        });
        this.events.on('reldens.closeUI', async (event)=>{
            let bannerLocalStorageKey = activeAd.id + '-' + event.openButton.id;
            let activeBanner = sc.get(this.activeBanners, bannerLocalStorageKey, false);
            if (activeBanner) activeBanner.banner.classList.add('hidden');
        });
    }
    async handleBannerType(isResponsive, activeAd, bannerLocalStorageKey) {
        if (isResponsive) return this.createResponsiveBanner(activeAd, bannerLocalStorageKey);
        return await this.createBanner(activeAd, bannerLocalStorageKey);
    }
    async createBanner(activeAd, bannerLocalStorageKey) {
        if (!this.validator.validate(this) || !await this.validator.canBeActivated(this)) return false;
        if (!this.isEnabled()) {
            Logger.info('SDK not enabled.');
            return false;
        }
        try {
            let width = sc.get(activeAd.styles, 'width', '300');
            let height = sc.get(activeAd.styles, 'height', '250');
            if (!this.validBannerSize(width + 'x' + height)) {
                Logger.info('CrazyGames - Invalid Banner size.');
                return false;
            }
            let containerId = bannerLocalStorageKey || activeAd.id;
            if (!containerId) {
                Logger.info('CrazyGames - Missing container ID.', activeAd, bannerLocalStorageKey);
                return false;
            }
            let div = this.gameDom.createElement('div', 'banner-container-' + containerId);
            this.gameDom.getElement('body')?.append(div);
            if (await this.isEnabled()) await this.sdk.banner.requestBanner({
                id: div.id,
                width: width,
                height: height
            });
            let styles = this.mapStylesWithValues(Object.assign({
                width,
                height
            }, activeAd));
            this.gameDom.setElementStyles(div, styles);
            div.classList.add('ads-banner-container');
            return div;
        } catch (error) {
            Logger.critical('CrazyGames - Error on banner request.', error);
            return false;
        }
    }
    mapStylesWithValues(activeAd) {
        let styles = {
            'z-index': 200000000,
            width: sc.get(activeAd, 'width', 300),
            height: sc.get(activeAd, 'height', 250),
            position: '' === sc.get(activeAd.styles, 'position', '') ? activeAd.position : 'absolute'
        };
        let top = sc.get(activeAd.styles, 'top', null);
        if (null !== top) styles.top = top;
        let bottom = sc.get(activeAd.styles, 'bottom', null);
        if (null !== bottom) styles.bottom = bottom;
        let left = sc.get(activeAd.styles, 'left', null);
        if (null !== left) styles.left = left;
        let right = sc.get(activeAd.styles, 'right', null);
        if (null !== right) styles.right = right;
        return styles;
    }
    async createResponsiveBanner(activeAd, bannerLocalStorageKey) {
        if (!this.validator.validate(this) || !await this.validator.canBeActivated(this)) return false;
        if (!this.isEnabled()) {
            Logger.info('SDK not enabled.');
            return false;
        }
        /* @NOTE: according to CrazyGames SDK this should be null and provided on the SDK response.
        let width = sc.get(activeAd, 'width', '300');
        let height = sc.get(activeAd, 'height', '250');
        if(!this.validResponsiveBannerSize(width+'x'+height)){
            Logger.info('CrazyGames - Invalid Responsive Banner size.');
            return false;
        }
        */ try {
            let containerId = bannerLocalStorageKey || activeAd.id;
            if (!containerId) {
                Logger.info('CrazyGames - Missing container ID.', activeAd, bannerLocalStorageKey);
                return false;
            }
            let div = this.gameDom.createElement('div', 'responsive-banner-container-' + containerId);
            let styles = this.mapStylesWithValues(activeAd);
            delete styles['width'];
            delete styles['height'];
            this.gameDom.setElementStyles(div, styles);
            this.gameDom.getElement('body').append(div);
            if (await this.isEnabled()) await this.sdk.banner.requestResponsiveBanner(div.id);
            div.classList.add('ads-banner-container');
            return div;
        } catch (error) {
            Logger.critical('CrazyGames - Error on banner request.', error);
            return false;
        }
    }
}
module.exports.BannersHandler = BannersHandler;

},{"b20ca8ca1f25148d":"3ULPI","96ec63b9db0e75b5":"@reldens/utils"}],"3ULPI":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Validator
 *
 */ const { Logger, sc } = require("d1a1464fc2cd37e3");
class Validator {
    validate(props) {
        if (!props.gameManager) {
            Logger.error('Missing Game Manager on Validator.', props);
            return false;
        }
        if (!props.sdk) {
            Logger.error('Missing SDK on Validator.', props);
            return false;
        }
        if (!props.hasAdblock || !sc.isFunction(props.hasAdblock)) Logger.warning('Missing or invalid hasAdblock function on Validator.', props);
        if (!props.isEnabled || !sc.isFunction(props.isEnabled)) {
            Logger.error('Missing or invalid isEnabled function on Validator.', props);
            return false;
        }
        return true;
    }
    async canBeActivated(props) {
        if (!sc.isFunction(props.hasAdblock) || await props.hasAdblock()) {
            Logger.info('AdBlocker detected.');
            return false;
        }
        return true;
    }
}
module.exports.Validator = Validator;

},{"d1a1464fc2cd37e3":"@reldens/utils"}],"4KRVS":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - VideosHandler
 *
 */ const { Validator } = require("151dab08c009e34c");
const { AdsConst } = require("8c1021ea6457f100");
const { Logger, sc } = require("87d6b1e6e69bae6e");
class VideosHandler {
    constructor(props){
        this.gameManager = sc.get(props, 'gameManager', false);
        this.gameDom = this.gameManager?.gameDom;
        this.events = this.gameManager?.events;
        this.sdk = sc.get(props, 'sdk', false);
        this.hasAdblock = sc.get(props, 'hasAdblock', false);
        this.isEnabled = sc.get(props, 'isEnabled', false);
        this.validator = new Validator();
        this.isPlayingAd = false;
        this.setConfig();
    }
    setConfig() {
        this.videoMinimumDuration = !this.gameManager ? AdsConst.VIDEOS_MINIMUM_DURATION : this.gameManager.config.getWithoutLogs('client/ads/general/providers/crazyGames/videoMinimumDuration', AdsConst.VIDEOS_MINIMUM_DURATION);
        this.awaitAdsTime = !this.gameManager ? AdsConst.AWAIT_ADS_TIME : this.gameManager.config.getWithoutLogs('client/ads/general/providers/crazyGames/awaitAdsTime', AdsConst.AWAIT_ADS_TIME);
    }
    async activateAdVideo(activeAd) {
        let eventKey = sc.get(activeAd, 'eventKey', false);
        if (!eventKey) {
            Logger.warning('Missing event key.', activeAd);
            return false;
        }
        this.events.on(eventKey, async (event)=>{
            if (this.isPlayingAd) {
                Logger.info('CrazyGames - Another ad is been played.');
                return false;
            }
            if (!this.validator.validate(this) || !await this.validator.canBeActivated(this)) {
                Logger.error('CrazyGames - Ad can not be activated.');
                return false;
            }
            if (!this.isEnabled()) {
                Logger.info('CrazyGames - SDK not enabled.');
                return false;
            }
            return await this.tryRePlay(activeAd);
        });
    }
    async tryRePlay(activeAd) {
        let adsPlugin = this.gameManager.getFeature('ads');
        if (null === adsPlugin.playedAds) {
            setTimeout(()=>{
                this.tryRePlay(activeAd);
            }, this.awaitAdsTime);
            return false;
        }
        let playedAd = sc.get(adsPlugin?.playedAds, activeAd.id, false);
        if (playedAd && !activeAd.replay) {
            Logger.info('Ad already played', activeAd);
            return false;
        }
        let adStarted = sc.get(activeAd, 'adStartedCallback', ()=>{
            this.isPlayingAd = true;
            Logger.info('CrazyGames - Ad-started callback.', new Date().getTime());
            this.send({
                act: AdsConst.ACTIONS.AD_STARTED,
                ads_id: activeAd.id
            });
        });
        let adFinished = sc.get(activeAd, 'adFinishedCallback', async ()=>{
            this.isPlayingAd = false;
            Logger.info('CrazyGames - Ad-finished callback.', new Date().getTime());
            this.send({
                act: AdsConst.ACTIONS.AD_ENDED,
                ads_id: activeAd.id
            });
            await this.gameManager.audioManager.changeMuteState(false, false); // unmute and unlock audio
        });
        let adError = sc.get(activeAd, 'adErrorCallback', async (error)=>{
            this.isPlayingAd = false;
            Logger.info('CrazyGames - Ad-error callback.', error, new Date().getTime());
            this.send({
                act: AdsConst.ACTIONS.AD_ENDED,
                ads_id: activeAd.id,
                error
            });
            await this.gameManager.audioManager.changeMuteState(false, false); // unmute and unlock audio
        });
        let rewardItemKey = sc.get(activeAd, 'rewardItemKey', false);
        let adType = rewardItemKey ? 'rewarded' : 'midgame';
        await this.gameManager.audioManager.changeMuteState(true, true); // mute and lock audio
        await this.sdk.ad.requestAd(adType, {
            adStarted,
            adFinished,
            adError
        });
    }
    send(props) {
        let roomEvents = this.gameManager?.activeRoomEvents;
        if (!roomEvents) {
            Logger.warning('CrazyGames - RoomEvents undefined to send an Ad Video message.');
            return false;
        }
        return roomEvents?.send(props);
    }
}
module.exports.VideosHandler = VideosHandler;

},{"151dab08c009e34c":"3ULPI","8c1021ea6457f100":"j6ZnJ","87d6b1e6e69bae6e":"@reldens/utils"}],"9kr03":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - AdsProvider
 *
 */ const { Logger } = require("f6fb30bd19ef353e");
class AdsProvider {
    static fetchActiveAdsByProviderId(providerId, validAdsTypes, availableAds) {
        if (!providerId) return {};
        let adsKeys = Object.keys(availableAds);
        if (0 === adsKeys.length) return {};
        let adsCollection = {};
        for (let i of adsKeys){
            let ad = availableAds[i];
            if (providerId !== ad.provider.id) continue;
            if (!ad.enabled) {
                Logger.info('Ad not enabled.', ad);
                continue;
            }
            if (-1 === validAdsTypes.indexOf(ad.type.key)) {
                Logger.info('Invalid ad type.', ad);
                continue;
            }
            adsCollection[i] = ad;
        }
        Logger.info({
            providerId,
            activeProviderAds: adsCollection
        });
        return adsCollection;
    }
}
module.exports.AdsProvider = AdsProvider;

},{"f6fb30bd19ef353e":"@reldens/utils"}],"kgBzD":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameMonetize
 *
 * SDK documentation: https://github.com/MonetizeGame/GameMonetize.com-SDK
 *
 */ const { AdsProvider } = require("c894c96a87401a74");
const { AdsConst } = require("32be3a6a825a12db");
const { Logger, sc } = require("7809fdefc811e104");
class GameMonetize {
    constructor(providerModel, gameManager){
        this.gameManager = gameManager;
        this.gameDom = gameManager?.gameDom;
        this.events = gameManager?.events;
        this.window = gameManager?.gameDom?.getWindow();
        this.metaData = providerModel;
        this.setSdkOptions();
        this.sdk = this.window?.sdk;
        this.retry = 0;
        this.isPlayingAd = false;
        this.environment = AdsConst.ENVIRONMENTS.DISABLED;
        if (!this.metaData.sdkRetryTime) this.metaData.sdkRetryTime = 500;
        if (!this.metaData.sdkMaxRetries) this.metaData.sdkMaxRetries = 10;
        this.activeAds = this.fetchActiveAds(providerModel);
        this.activeAdBeenPlayed = false;
        this.setConfig();
    }
    fetchActiveAds(providerModel) {
        if (!this.gameManager?.config) return {};
        return AdsProvider.fetchActiveAdsByProviderId(providerModel.id, this.validAdsTypes(), this.gameManager.config.get('client/ads/collection', {}));
    }
    eventKeys() {
        return {
            sdkAdStarted: 'CONTENT_PAUSE_REQUESTED',
            sdkAdEnded: 'SDK_GAME_START',
            // sdkAdEnded: 'CONTENT_RESUME_REQUESTED',
            // adLoadError: 'AD_LOAD_ERROR',
            sdkReady: 'SDK_READY'
        };
    }
    setSdkOptions() {
        if (!this.gameDom) return false;
        if (!this.metaData.gameId) {
            Logger.error('GameMonetize - Game ID undefined.');
            return false;
        }
        this.gameDom.getWindow().SDK_OPTIONS = {
            gameId: this.metaData.gameId,
            onEvent: async (event)=>{
                Logger.info('GameMonetize - SDK event fired: ' + event.name);
                switch(event.name){
                    case this.eventKeys().sdkAdStarted:
                        // pause game logic / mute audio:
                        await this.adStartedCallback(event);
                        break;
                    case this.eventKeys().sdkAdEnded:
                        // advertisement done, resume game logic and unmute audio:
                        await this.adEndedCallback(event);
                        break;
                    case this.eventKeys().sdkReady:
                        // when sdk is ready:
                        await this.sdkReadyCallback(event);
                        break;
                }
            }
        };
    }
    setConfig() {
        this.videoMinimumDuration = !this.gameManager ? AdsConst.VIDEOS_MINIMUM_DURATION : this.gameManager.config.getWithoutLogs('client/ads/general/providers/gameMonetize/videoMinimumDuration', AdsConst.VIDEOS_MINIMUM_DURATION);
        this.awaitAdsTime = !this.gameManager ? AdsConst.AWAIT_ADS_TIME : this.gameManager.config.getWithoutLogs('client/ads/general/providers/gameMonetize/awaitAdsTime', AdsConst.AWAIT_ADS_TIME);
    }
    validAdsTypes() {
        return [
            AdsConst.ADS_TYPES.EVENT_VIDEO
        ];
    }
    async adStartedCallback(event) {
        this.isPlayingAd = true;
        await this.gameManager.audioManager.changeMuteState(true, true); // mute and lock audio
        if (!this.activeAdBeenPlayed) {
            Logger.info('AdStartedCallback undefined activeAd.', event, this.activeAdBeenPlayed);
            return false;
        }
        Logger.info('GameMonetize - Ad-started callback.', new Date().getTime());
        this.send({
            act: AdsConst.ACTIONS.AD_STARTED,
            ads_id: this.activeAdBeenPlayed.id
        });
    }
    async adEndedCallback(event) {
        this.isPlayingAd = false;
        await this.gameManager.audioManager.changeMuteState(false, false); // unmute and unlock audio
        if (!this.activeAdBeenPlayed) {
            Logger.info('AdEndedCallback undefined activeAd.', event, this.activeAdBeenPlayed);
            return false;
        }
        Logger.info('GameMonetize - Ad-finished callback.', new Date().getTime());
        this.send({
            act: AdsConst.ACTIONS.AD_ENDED,
            ads_id: this.activeAdBeenPlayed.id
        });
    }
    async sdkReadyCallback(event) {
        this.sdk = this.window.sdk;
    }
    async activate() {
        if (!this.sdk) {
            if (this.retry === this.metaData.sdkMaxRetries) {
                Logger.critical('GameMonetize required object.');
                return false;
            }
            if (this.retry < this.metaData.sdkMaxRetries) setTimeout(()=>{
                this.retry++;
                Logger.info('GameMonetize required object, retry #' + this.retry + '.');
                this.sdk = this.window?.sdk;
                if (this.sdk) Logger.info('GameMonetize object found.');
                this.activate();
            }, this.metaData.sdkRetryTime);
            return false;
        }
        await this.activateAds();
    }
    async activateAds() {
        let activeKeys = Object.keys(this.activeAds);
        if (0 === activeKeys.length) {
            Logger.info('None active ads.');
            return false;
        }
        for (let i of activeKeys){
            let activeAd = this.activeAds[i];
            if (AdsConst.ADS_TYPES.EVENT_VIDEO !== activeAd.type.key) continue;
            let eventKey = sc.get(activeAd, 'eventKey', false);
            if (!eventKey) {
                Logger.warning('Missing event key.', activeAd);
                return false;
            }
            this.events.on(eventKey, async (event)=>{
                Logger.info('GameMonetize - Video event fired, playing ad.', event, activeAd);
                if (this.isPlayingAd) {
                    Logger.info('GameMonetize - Ad is been played.');
                    return false;
                }
                return await this.tryRePlay(activeAd);
            });
        }
    }
    async tryRePlay(activeAd) {
        let adsPlugin = this.gameManager.getFeature('ads');
        if (null === adsPlugin.playedAds) {
            setTimeout(()=>{
                this.tryRePlay(activeAd);
            }, this.awaitAdsTime);
            return false;
        }
        this.activeAdBeenPlayed = activeAd;
        if (!sc.isObjectFunction(this.sdk, 'showBanner')) {
            Logger.critical('GameMonetize SDK not ready.');
            return false;
        }
        await this.sdk.showBanner();
    }
    send(props) {
        let roomEvents = this.gameManager?.activeRoomEvents;
        if (!roomEvents) {
            Logger.warning('GameMonetize - RoomEvents undefined to send an Ad Video message.');
            return false;
        }
        return roomEvents.send(props);
    }
}
module.exports.GameMonetize = GameMonetize;

},{"c894c96a87401a74":"9kr03","32be3a6a825a12db":"j6ZnJ","7809fdefc811e104":"@reldens/utils"}],"kbF2P":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GoogleAdSense
 *
 * Documentation: https://support.google.com/adsense/answer/9183549?sjid=16298855257735669764-EU
 *
 */ class GoogleAdSense {
    constructor(providerModel, gameManager){
        this.gameManager = gameManager;
        this.gameDom = gameManager?.gameDom;
        this.events = gameManager?.events;
        this.window = gameManager?.gameDom?.getWindow();
        this.metaData = providerModel;
    }
}
module.exports.GoogleAdSense = GoogleAdSense;

},{}],"crjkm":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    ads: {}
};

},{}],"dOo7i":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - World Client Plugin
 *
 */ const { DebugWorldCreator } = require("159f68d8a8780377");
const { PluginInterface } = require("572e1f7ea3924a34");
const { Logger, sc } = require("cb2ceff56813c995");
class WorldPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        this.events = sc.get(props, 'events', false);
        this.debugWorldCreator = false;
        if (this.validateProperties()) this.setupDebugMode();
    }
    validateProperties() {
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in PredictionPlugin.');
            return false;
        }
        if (!this.events) {
            Logger.error('EventsManager undefined in PredictionPlugin.');
            return false;
        }
        return true;
    }
    setupDebugMode() {
        if (!this.gameManager.config.getWithoutLogs('client/world/debug/enabled', false)) return false;
        this.debugWorldCreator = new DebugWorldCreator();
        this.events.on('reldens.createEngineSceneDone', async (event)=>{
            await this.debugWorldCreator.createSceneWorld(event.currentScene);
        });
    }
}
module.exports.WorldPlugin = WorldPlugin;

},{"159f68d8a8780377":"9VK89","572e1f7ea3924a34":"deNd3","cb2ceff56813c995":"@reldens/utils"}],"9VK89":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - DebugWorldCreator
 *
 */ const { Renderer } = require("cbb9503570f9a4d4");
const { P2world } = require("712e22e86c85722d");
const { WorldTimer } = require("80454883498e516a");
const { Logger } = require("27caf2d5a77ed4fe");
class DebugWorldCreator {
    async createSceneWorld(scene) {
        let validLayers = this.findValidLayers(scene);
        let mapJson = this.cloneMapJson(scene, validLayers);
        let worldData = {
            sceneName: scene.key,
            roomId: scene.params.roomId,
            roomMap: scene.params.roomName,
            mapJson,
            config: scene.configManager,
            events: scene.eventsManager,
            allowSimultaneous: scene.configManager.get('client/general/controls/allowSimultaneousKeys', true),
            worldConfig: scene.gameManager.activeRoomEvents.roomData?.worldConfig || scene.worldConfig
        };
        scene.debugWorld = this.createWorldInstance(worldData);
        scene.debugWorld.createLimits();
        await scene.debugWorld.createWorldContent({});
        scene.debugWorldTimer = new WorldTimer({
            callbacks: [
                ()=>{
                    if (!scene.debugWorld) {
                        Logger.error('Scene World not longer exists.', scene.roomWorld);
                        return;
                    }
                    scene.debugWorld.removeBodiesFromWorld();
                }
            ]
        });
        scene.debugWorldTimer.startWorldSteps(scene.debugWorld);
        scene.debugWorldRenderer = new Renderer(scene);
    }
    cloneMapJson(scene, validLayers) {
        // @TODO - BETA - Fix to support multiple tilesets.
        let tileset = scene.tilesets[0];
        if (!tileset) return {};
        return Object.assign({}, scene.cache?.tilemap?.entries?.entries[tileset.name]?.data || {}, {
            layers: validLayers
        });
    }
    findValidLayers(scene) {
        let validLayers = [];
        // @TODO - BETA - Fix to support multiple tilesets.
        let tileset = scene.tilesets[0];
        if (!tileset) return validLayers;
        for (let layer of scene.cache.tilemap.entries.entries[tileset.name].data.layers)if (-1 !== layer.name.indexOf('collision')) validLayers.push(layer);
        return validLayers;
    }
    createWorldInstance(worldData) {
        return new P2world(worldData);
    }
}
module.exports.DebugWorldCreator = DebugWorldCreator;

},{"cbb9503570f9a4d4":"2l9ZV","712e22e86c85722d":"e1fPm","80454883498e516a":"fgadn","27caf2d5a77ed4fe":"@reldens/utils"}],"2l9ZV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Renderer
 *
 */ const { Box } = require("fde0e3cf50e6ff47");
class Renderer {
    constructor(scene){
        // @TODO - BETA - Refactor this entire class.
        this.scene = scene;
        this.gameDom = scene.gameManager.gameDom;
        this.world = scene.debugWorld;
        this.canvasElement = false;
        this.canvasContext = false;
    }
    fetchCanvasContext() {
        this.canvasContext = this.canvasElement.getContext('2d');
    }
    createCanvas(width, height) {
        this.canvasElement = this.gameDom.createElement('canvas');
        this.canvasElement.width = width;
        this.canvasElement.height = height;
        this.canvasElement.id = 'physicsCanvas';
        this.gameDom.getDocument().body.appendChild(this.canvasElement);
        this.fetchCanvasContext();
    }
    renderLoop() {
        // @TODO - BETA - Finish implementation to render all the objects movement.
        this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.renderP2World();
        this.gameDom.getWindow().requestAnimationFrame(this.renderLoop.bind(this));
    }
    renderP2World() {
        let context = this.canvasContext;
        for(let i = 0; i < this.world.bodies.length; i++){
            let body = this.world.bodies[i];
            if (!body.isWall) continue;
            let shape = body.shapes[0];
            context.fillStyle = '#2f7dde';
            context.strokeStyle = '#333333';
            if (shape instanceof Box) {
                let x = body.position[0];
                let y = body.position[1];
                let width = shape.width;
                let height = shape.height;
                context.save();
                context.translate(x, y);
                context.rotate(body.angle);
                context.beginPath();
                context.rect(-width / 2, -height / 2, width, height);
                context.closePath();
                context.fill();
                context.stroke();
                context.restore();
            }
            context.closePath();
            context.fill();
            context.stroke();
        }
        let textIndex = 0;
        for(let i = 0; i < this.world.bodies.length; i++){
            let body = this.world.bodies[i];
            if (!body.isWall) continue;
            let shape = body.shapes[0];
            if (shape instanceof Box) {
                let tileIndex = body.firstTileIndex || 0;
                context.fillStyle = '#000000';
                context.font = '9px Arial';
                let fullText = tileIndex.toString() + ' / ' + shape.width + ' / ' + body.position[0];
                let x = body.position[0];
                let y = body.position[1];
                let textX = x - context.measureText(fullText).width / 2;
                let textY = y;
                context.textAlign = 'left';
                context.textBaseline = 'middle';
                context.fillText(fullText, textX, textY);
                textIndex++;
            }
        }
    }
    debugWorld() {
        this.gameDom.getElement('.wrapper').style.display = 'none';
        this.createCanvas(this.scene.map.width * this.scene.map.tileWidth, this.scene.map.height * this.scene.map.tileHeight);
        this.renderP2World();
    }
}
module.exports.Renderer = Renderer;

},{"fde0e3cf50e6ff47":"p2"}],"lTwjz":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Scores Client Plugin
 *
 */ const { PreloaderHandler } = require("beb24ac2faa38dcf");
const { ScoresMessageListener } = require("dee1b20915f8fc4b");
const { MessageProcessor } = require("6d116519d34b9094");
const { ScoresConst } = require("1ccd946bfeba00a0");
const Translations = require("b91eaf643f56a617");
const { TranslationsMapper } = require("3dfe0dee6d22ec47");
const { PluginInterface } = require("1437aa517ee673e7");
const { Logger, sc } = require("e7bcd0a5b428e237");
class ScoresPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        this.events = sc.get(props, 'events', false);
        this.preloaderHandler = new PreloaderHandler();
        this.scoresMessageListener = new ScoresMessageListener();
        if (this.validateProperties()) {
            this.setTranslations();
            this.listenEvents();
            this.listenMessages();
        //Logger.debug('Plugin READY: Scores');
        }
    }
    validateProperties() {
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in ScoresPlugin.');
            return false;
        }
        if (!this.events) {
            Logger.error('EventsManager undefined in ScoresPlugin.');
            return false;
        }
        return true;
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, ScoresConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        if (!this.events) {
            Logger.error('EventsManager undefined in ScoresPlugin for "listenEvents".');
            return;
        }
        this.events.on('reldens.preloadUiScene', (preloadScene)=>{
            this.preloaderHandler.loadContents(preloadScene);
        });
        this.events.on('reldens.createEngineSceneDone', (event)=>{
            let roomEvents = event?.roomEvents;
            if (!roomEvents) {
                Logger.critical('RoomEvents undefined for process Scores messages queue on ScoresPlugin.', event);
                return false;
            }
            MessageProcessor.processScoresMessagesQueue(roomEvents, this.scoresMessageListener);
        });
    }
    listenMessages() {
        if (!this.gameManager || !this.events) {
            Logger.error('Game Manager or EventsManager undefined in ScoresPlugin for "listenMessages".');
            return;
        }
        this.gameManager.config.client.message.listeners[ScoresConst.KEY] = this.scoresMessageListener;
    }
}
module.exports.ScoresPlugin = ScoresPlugin;

},{"beb24ac2faa38dcf":"4K1ps","dee1b20915f8fc4b":"aK5oS","6d116519d34b9094":"7md1m","1ccd946bfeba00a0":"9I2J6","b91eaf643f56a617":"lteQd","3dfe0dee6d22ec47":"fKH2J","1437aa517ee673e7":"deNd3","e7bcd0a5b428e237":"@reldens/utils"}],"4K1ps":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PreloaderHandler
 *
 */ const { ScoresConst } = require("d5020a58048d8cd6");
class PreloaderHandler {
    loadContents(uiScene) {
        let scoresTemplatePath = '/assets/features/scores/templates/';
        uiScene.load.html(ScoresConst.KEY, scoresTemplatePath + 'ui-scores.html');
        uiScene.load.html(ScoresConst.TEMPLATES.SCORES_TABLE, scoresTemplatePath + 'ui-scores-table.html');
    }
}
module.exports.PreloaderHandler = PreloaderHandler;

},{"d5020a58048d8cd6":"9I2J6"}],"9I2J6":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ScoresConst
 *
 */ let prefix = 'sco';
let snippetsPrefix = 'scores.';
module.exports.ScoresConst = {
    KEY: 'scores',
    PREFIX: prefix,
    ACTIONS: {
        UPDATE: prefix + 'Up',
        TOP_SCORES_UPDATE: prefix + 'Tops'
    },
    TEMPLATES: {
        SCORES_TABLE: 'scoresTable'
    },
    MESSAGE: {
        DATA_VALUES: {
            NAMESPACE: 'scores'
        }
    },
    SNIPPETS: {
        PREFIX: snippetsPrefix,
        TITLE: snippetsPrefix + 'scoresTitle',
        CONTENT: snippetsPrefix + 'scoresContent',
        MY_SCORE: snippetsPrefix + 'myScore'
    }
};

},{}],"aK5oS":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ScoresMessageListener
 *
 */ const { ScoresMessageHandler } = require("e7cd47cafdf969e");
const { ScoresConst } = require("4fec0ba8d4e7853a");
const { Logger, sc } = require("f6f863d8fe211644");
class ScoresMessageListener {
    async executeClientMessageActions(props) {
        let message = sc.get(props, 'message', false);
        if (!message) {
            Logger.error('Missing message data on ScoresMessageListener.', props);
            return false;
        }
        let roomEvents = sc.get(props, 'roomEvents', false);
        if (!roomEvents) {
            Logger.error('Missing RoomEvents on ScoresMessageListener.', props);
            return false;
        }
        let scoresMessageHandler = new ScoresMessageHandler({
            roomEvents,
            message
        });
        if (!scoresMessageHandler.validate()) {
            if (this.isScoresMessage(message)) {
                if (!roomEvents.scoresMessagesQueue) roomEvents.scoresMessagesQueue = [];
                roomEvents.scoresMessagesQueue.push(message);
                return true;
            }
            Logger.error('Invalid ScoresMessageHandler', scoresMessageHandler);
            return false;
        }
        if (!this.isScoresMessage(message)) return false;
        return this.handleScoresMessage(message, scoresMessageHandler);
    }
    handleScoresMessage(message, scoresMessageHandler) {
        if (ScoresConst.ACTIONS.UPDATE === message.act) return scoresMessageHandler.updatePlayerScore();
        if (ScoresConst.ACTIONS.TOP_SCORES_UPDATE === message.act) return scoresMessageHandler.updateScoresBox();
        return true;
    }
    isScoresMessage(message) {
        return 0 === message.act?.indexOf(ScoresConst.PREFIX);
    }
}
module.exports.ScoresMessageListener = ScoresMessageListener;

},{"e7cd47cafdf969e":"eauwG","4fec0ba8d4e7853a":"9I2J6","f6f863d8fe211644":"@reldens/utils"}],"eauwG":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ScoresMessageHandler
 *
 */ const { UserInterface } = require("d13665ccdb08d785");
const { ScoresConst } = require("3607b56eff987992");
const { Logger, sc } = require("6e9ffa46628abd5f");
class ScoresMessageHandler {
    constructor(props){
        this.roomEvents = sc.get(props, 'roomEvents', false);
        this.message = sc.get(props, 'message', false);
        this.gameManager = this.roomEvents?.gameManager;
        this.gameDom = this.gameManager?.gameDom;
        this.uiScene = this.gameManager?.gameEngine?.uiScene;
    }
    validate() {
        if (!this.roomEvents) {
            Logger.info('Missing RoomEvents on ScoresMessageHandler.');
            return false;
        }
        if (!this.message) {
            Logger.info('Missing message on ScoresMessageHandler.');
            return false;
        }
        if (!this.gameManager) {
            Logger.info('Missing GameManager on ScoresMessageHandler.');
            return false;
        }
        // @NOTE: the message could arrive before the uiScene gets ready.
        // if(!this.uiScene){
        //     Logger.info('Missing UI Scene on ScoresMessageHandler.');
        // }
        return this.uiScene;
    }
    createScoresUi() {
        let scoresUi = sc.get(this.uiScene.userInterfaces, ScoresConst.KEY);
        if (scoresUi) return scoresUi;
        if (!this.uiScene.userInterfaces) this.uiScene.userInterfaces = {};
        let uiScores = new UserInterface(this.gameManager, {
            id: ScoresConst.KEY,
            type: ScoresConst.KEY,
            defaultOpen: true,
            defaultClose: true
        }, '/assets/features/scores/templates/ui-scores.html', ScoresConst.KEY);
        uiScores.createUiElement(this.uiScene, ScoresConst.KEY);
        // @TODO - BETA - Check if this can be moved inside the createUiElement.
        let uiBox = this.uiScene.elementsUi[ScoresConst.KEY];
        if (!uiBox) {
            Logger.error('Scores UI box not found.', {
                uiScores,
                uiBox
            });
            return false;
        }
        let title = this.gameManager.services.translator.t(this.gameManager.config.getWithoutLogs('client/scores/labels/title', ScoresConst.SNIPPETS.TITLE));
        let content = this.gameManager.services.translator.t(this.gameManager.config.getWithoutLogs('client/scores/labels/content', ScoresConst.SNIPPETS.CONTENT));
        this.roomEvents.uiSetTitleAndContent(uiBox, {
            title,
            content
        }, this.uiScene);
        this.uiScene.userInterfaces[ScoresConst.KEY] = uiScores;
        return this.uiScene.userInterfaces[ScoresConst.KEY];
    }
    updatePlayerScore() {
        this.createScoresUi(ScoresConst.KEY);
        let currentPlayerScore = sc.get(this.message, 'newTotalScore', false);
        if (!currentPlayerScore) {
            Logger.debug('Missing new total score on update message.');
            return;
        }
        this.uiScene.currentPlayerScore = currentPlayerScore;
        this.roomEvents.uiSetContent(this.uiScene.elementsUi[ScoresConst.KEY], {
            content: this.createContentsUpdate()
        }, this.uiScene);
    }
    updateScoresBox() {
        this.createScoresUi(ScoresConst.KEY);
        let scores = sc.get(this.message, 'scores', false);
        if (!scores) {
            Logger.debug('Missing scores data on message.');
            return;
        }
        this.uiScene.scores = scores;
        this.roomEvents.uiSetContent(this.uiScene.elementsUi[ScoresConst.KEY], {
            content: this.createContentsUpdate()
        }, this.uiScene);
    }
    createContentsUpdate() {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get(ScoresConst.TEMPLATES.SCORES_TABLE);
        if (!templateContent) {
            Logger.error('Missing template "' + ScoresConst.TEMPLATES.SCORES_TABLE + '".');
            return '';
        }
        let templateParams = {
            scores: this.uiScene.scores,
            showCurrentPlayer: true,
            currentPlayerScore: this.gameManager.services.translator.t(this.gameManager.config.getWithoutLogs('client/scores/labels/myScore', ScoresConst.SNIPPETS.MY_SCORE), {
                myScore: this.uiScene.currentPlayerScore || '0'
            })
        };
        return this.gameManager.gameEngine.parseTemplate(templateContent, templateParams);
    }
}
module.exports.ScoresMessageHandler = ScoresMessageHandler;

},{"d13665ccdb08d785":"kO7Qp","3607b56eff987992":"9I2J6","6e9ffa46628abd5f":"@reldens/utils"}],"7md1m":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesProcessor
 *
 */ const { ScoresMessageHandler } = require("2eeb57abc38b4be1");
const { sc } = require("27775f7f913ec01a");
class MessagesProcessor {
    static processScoresMessagesQueue(roomEvents, scoresMessageListener) {
        if (!sc.isArray(roomEvents.scoresMessagesQueue)) return;
        if (0 === roomEvents.scoresMessagesQueue.length) return;
        for (let message of roomEvents.scoresMessagesQueue)scoresMessageListener.handleScoresMessage(message, new ScoresMessageHandler({
            roomEvents,
            message
        }));
        roomEvents.scoresMessagesQueue = [];
    }
}
module.exports.MessageProcessor = MessagesProcessor;

},{"2eeb57abc38b4be1":"eauwG","27775f7f913ec01a":"@reldens/utils"}],"lteQd":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    scores: {
        scoresTitle: 'Top Players Scores',
        scoresContent: 'No scores available.',
        myScore: 'My score: %myScore'
    }
};

},{}],"4hqJz":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Rewards Client Plugin
 *
 */ const { PreloaderHandler } = require("5758c6ee7bb9cc2a");
const { MessageListener } = require("75bcbf886f6b5de8");
const { MessageProcessor } = require("bc86930879fbb71b");
const { RewardsConst } = require("64a9879ad20f16c");
const Translations = require("14b75b28b4bb8047");
const { TranslationsMapper } = require("e2a6585d36441da");
const { PluginInterface } = require("385773ca42bfbe1");
const { Logger, sc } = require("a334a81b6409a572");
class RewardsPlugin extends PluginInterface {
    setup(props) {
        this.gameManager = sc.get(props, 'gameManager', false);
        this.events = sc.get(props, 'events', false);
        this.preloaderHandler = new PreloaderHandler();
        this.messageListener = new MessageListener();
        if (this.validateProperties()) {
            this.setTranslations();
            this.listenEvents();
            this.listenMessages();
            Logger.debug('Plugin READY: Rewards');
        }
    }
    validateProperties() {
        if (!this.gameManager) {
            Logger.error('Game Manager undefined in RewardsPlugin.');
            return false;
        }
        if (!this.events) {
            Logger.error('EventsManager undefined in RewardsPlugin.');
            return false;
        }
        return true;
    }
    setTranslations() {
        if (!this.gameManager) return false;
        TranslationsMapper.forConfig(this.gameManager.config.client, Translations, RewardsConst.MESSAGE.DATA_VALUES);
    }
    listenEvents() {
        if (!this.events) {
            Logger.error('EventsManager undefined in RewardsPlugin for "listenEvents".');
            return;
        }
        this.events.on('reldens.preloadUiScene', (preloadScene)=>{
            this.preloaderHandler.loadContents(preloadScene);
        });
        this.events.on('reldens.createEngineSceneDone', (event)=>{
            MessageProcessor.processRewardsMessagesQueue(event, this);
        });
    }
    listenMessages() {
        if (!this.gameManager || !this.events) {
            Logger.error('Game Manager or EventsManager undefined in RewardsPlugin for "listenMessages".');
            return;
        }
        this.gameManager.config.client.message.listeners[RewardsConst.KEY] = this.messageListener;
    }
}
module.exports.RewardsPlugin = RewardsPlugin;

},{"5758c6ee7bb9cc2a":"anJ0e","75bcbf886f6b5de8":"iR5S6","bc86930879fbb71b":"8oJmV","64a9879ad20f16c":"loL0N","14b75b28b4bb8047":"exup4","e2a6585d36441da":"fKH2J","385773ca42bfbe1":"deNd3","a334a81b6409a572":"@reldens/utils"}],"anJ0e":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - PreloaderHandler
 *
 */ const { RewardsConst } = require("c0baaedb21bffd44");
class PreloaderHandler {
    loadContents(uiScene) {
        let rewardsTemplatePath = '/assets/features/rewards/templates/';
        uiScene.load.html(RewardsConst.KEY, rewardsTemplatePath + 'ui-rewards.html');
        uiScene.load.html(RewardsConst.TEMPLATES.REWARDS_LIST, rewardsTemplatePath + 'ui-rewards-list.html');
    }
}
module.exports.PreloaderHandler = PreloaderHandler;

},{"c0baaedb21bffd44":"loL0N"}],"loL0N":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - RewardsConst
 *
 */ let prefix = 'rwd';
let snippetsPrefix = 'rewards.';
module.exports.RewardsConst = {
    KEY: 'rewards',
    PREFIX: prefix,
    ACTIONS: {
        INITIALIZE: prefix + 'Ini',
        UPDATE: prefix + 'Up',
        ACCEPT_REWARD: prefix + 'Acpt',
        ACCEPTED_REWARD: prefix + 'Acpted'
    },
    SPLIT_EXPERIENCE: {
        ALL: 0,
        PROPORTIONAL_BY_LEVEL: 1
    },
    SPLIT_MODIFIER: {
        ALL: 0,
        RANDOM: 1
    },
    SPLIT_ITEMS: {
        DROP_KEEPS: 0,
        RANDOM: 1
    },
    MESSAGE: {
        DATA: {
            LABEL: 'rlbl',
            DESCRIPTION: 'rdes',
            POSITION: 'rpos',
            SHOW_REWARD_IMAGE: 'srimg',
            REWARD_IMAGE: 'rimg',
            REWARD_IMAGE_PATH: 'rimgp',
            EVENT_DATA: 'redt',
            STATE_DATA: 'resd',
            ITEMS_DATA: 'rmid',
            ITEM_KEY: 'rikey',
            ITEM_LABEL: 'rilbl',
            ITEM_DESCRIPTION: 'rides',
            ITEM_QUANTITY: 'riqty'
        },
        DATA_VALUES: {
            NAMESPACE: 'rewards'
        }
    },
    TEMPLATES: {
        REWARDS_LIST: 'rewardsList'
    },
    SNIPPETS: {
        PREFIX: snippetsPrefix,
        TITLE: snippetsPrefix + 'title',
        ACCEPTED_REWARD: snippetsPrefix + 'acceptedReward'
    }
};

},{}],"iR5S6":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessageListener
 *
 */ const { MessageHandler } = require("64a92a5204678fc9");
const { RewardsConst } = require("364f1cdb78fb98e9");
const { Logger, sc } = require("f9451ec69cdd0a47");
class MessageListener {
    async executeClientMessageActions(props) {
        let message = sc.get(props, 'message', false);
        if (!message) {
            Logger.error('Missing message data on RewardsMessageListener.', props);
            return false;
        }
        let roomEvents = sc.get(props, 'roomEvents', false);
        if (!roomEvents) {
            Logger.error('Missing RoomEvents on RewardsMessageListener.', props);
            return false;
        }
        if (!this.isRewardsMessage(message)) return false;
        let messageHandler = new MessageHandler({
            roomEvents,
            message
        });
        if (!messageHandler.validate()) {
            if (!roomEvents.rewardsMessagesQueue) roomEvents.rewardsMessagesQueue = [];
            roomEvents.rewardsMessagesQueue.push(message);
            return true;
        }
        return this.handleRewardsMessage(message, messageHandler);
    }
    handleRewardsMessage(message, messageHandler) {
        if (RewardsConst.ACTIONS.UPDATE === message.act) return messageHandler.updateRewardsBox();
        if (RewardsConst.ACTIONS.ACCEPTED_REWARD === message.act) return messageHandler.showAcceptedReward();
        return true;
    }
    isRewardsMessage(message) {
        return 0 === message.act?.indexOf(RewardsConst.PREFIX);
    }
}
module.exports.MessageListener = MessageListener;

},{"64a92a5204678fc9":"2w4Tt","364f1cdb78fb98e9":"loL0N","f9451ec69cdd0a47":"@reldens/utils"}],"2w4Tt":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessageHandler
 *
 */ const { UserInterface } = require("5bc785032b2d0856");
const { RewardsConst } = require("1433e37d05c49b27");
const { GameConst } = require("214c4839fe65344a");
const { Logger, sc } = require("62758788d6e9eb13");
class MessageHandler {
    constructor(props){
        this.roomEvents = sc.get(props, 'roomEvents', false);
        this.message = sc.get(props, 'message', false);
        this.gameManager = this.roomEvents?.gameManager;
        this.gameDom = this.gameManager?.gameDom;
        this.config = this.gameManager?.config;
        /** @type {?Translator} */ this.translator = this.gameManager?.services?.translator;
        this.uiScene = this.gameManager?.gameEngine?.uiScene;
    }
    validate() {
        if (!this.roomEvents) {
            Logger.info('Missing RoomEvents on RewardsMessageHandler.');
            return false;
        }
        if (!this.message) {
            Logger.info('Missing message on RewardsMessageHandler.');
            return false;
        }
        if (!this.gameManager) {
            Logger.info('Missing GameManager on RewardsMessageHandler.');
            return false;
        }
        // @NOTE: the message could arrive before the uiScene gets ready.
        // if(!this.uiScene){
        //     Logger.info('Missing UI Scene on MessageHandler.');
        // }
        return this.uiScene;
    }
    createRewardsUi(createUiWithKey) {
        let rewardsUi = sc.get(this.uiScene.userInterfaces, createUiWithKey);
        if (rewardsUi) return rewardsUi;
        if (!this.uiScene.userInterfaces) this.uiScene.userInterfaces = {};
        let uiRewards = new UserInterface(this.gameManager, {
            id: createUiWithKey,
            type: createUiWithKey,
            defaultOpen: true,
            defaultClose: true
        }, '/assets/features/rewards/templates/ui-rewards.html', createUiWithKey);
        uiRewards.createUiElement(this.uiScene, createUiWithKey);
        uiRewards.closeButton.addEventListener('click', ()=>{
            this.gameDom.emptyElement('.accepted-reward');
        });
        // @TODO - BETA - Check if this can be moved inside the createUiElement.
        let uiBox = this.uiScene.elementsUi[createUiWithKey];
        if (!uiBox) {
            Logger.error('Scores UI box not found.', {
                uiRewards,
                uiBox
            });
            return false;
        }
        let title = this.translator.t(this.config.getWithoutLogs('client/rewards/labels/title', RewardsConst.SNIPPETS.TITLE));
        this.roomEvents.uiSetTitleAndContent(uiBox, {
            title
        }, this.uiScene);
        this.uiScene.userInterfaces[createUiWithKey] = uiRewards;
        return this.uiScene.userInterfaces[createUiWithKey];
    }
    updateRewardsBox() {
        this.createRewardsUi(RewardsConst.KEY);
        let rewards = sc.get(this.message, 'rewards', false);
        if (!rewards) {
            Logger.debug('Missing rewards data on message.');
            return;
        }
        this.enrichForDisplay(rewards);
        this.uiScene.rewards = rewards;
        this.roomEvents.uiSetContent(this.uiScene.elementsUi[RewardsConst.KEY], {
            content: this.createUpdateContent()
        }, this.uiScene);
        this.showRewardsNotificationBalloon();
        this.activateRewardsAction();
    }
    showAcceptedReward() {
        this.createRewardsUi(RewardsConst.KEY);
        let acceptedReward = sc.get(this.message, 'acceptedReward', false);
        if (!acceptedReward) {
            Logger.debug('Missing rewards on update message.');
            return;
        }
        this.enrichForDisplay([
            acceptedReward
        ]);
        this.uiScene.acceptedReward = acceptedReward;
        this.roomEvents.uiSetContent(this.uiScene.elementsUi[RewardsConst.KEY], {
            content: this.createUpdateContent()
        }, this.uiScene);
    }
    createUpdateContent() {
        // @TODO - BETA - Move the template load from cache as part of the engine driver.
        let templateContent = this.uiScene.cache.html.get(RewardsConst.TEMPLATES.REWARDS_LIST);
        if (!templateContent) {
            Logger.error('Missing template "' + RewardsConst.TEMPLATES.REWARDS_LIST + '".');
            return '';
        }
        let acceptedReward = this.uiScene.acceptedReward;
        let acceptedRewardMessage = acceptedReward ? this.translator.t(this.config.getWithoutLogs('client/rewards/labels/acceptedReward', RewardsConst.SNIPPETS.ACCEPTED_REWARD), {
            rewardLabel: acceptedReward.translated.label
        }) : '';
        let templateParams = {
            rewards: this.uiScene.rewards,
            acceptedReward,
            acceptedRewardMessage
        };
        return this.gameManager.gameEngine.parseTemplate(templateContent, templateParams);
    }
    enrichForDisplay(rewards) {
        for (let reward of rewards){
            let description = this.translator.t(reward[RewardsConst.MESSAGE.DATA.DESCRIPTION] || '', {
                loginCount: reward[RewardsConst.MESSAGE.DATA.EVENT_DATA]?.days || ''
            });
            if (this.config.getWithoutLogs('client/rewards/labels/includeItemsDescription', true)) description += this.mapItemsText(reward);
            let label = this.translator.t(reward[RewardsConst.MESSAGE.DATA.LABEL] || '', {
                loginCount: reward[RewardsConst.MESSAGE.DATA.EVENT_DATA]?.days || ''
            });
            reward.translated = {
                label,
                description
            };
            let rewardStateData = reward[RewardsConst.MESSAGE.DATA.STATE_DATA];
            reward.activeClass = rewardStateData?.ready && !rewardStateData?.complete ? 'active' : 'inactive';
            reward.showRewardImage = reward[RewardsConst.MESSAGE.DATA.SHOW_REWARD_IMAGE] || '';
            reward.rewardImage = reward[RewardsConst.MESSAGE.DATA.REWARD_IMAGE] || '';
            reward.rewardImagePath = reward[RewardsConst.MESSAGE.DATA.REWARD_IMAGE_PATH] || '';
        }
        return rewards;
    }
    mapItemsText(reward) {
        // @TODO - BETA - Add items template to show icons and description.
        let itemsSeparator = this.config.getWithoutLogs('client/rewards/labels/itemsSeparator', '<br/>');
        let itemsTemplate = this.config.getWithoutLogs('client/rewards/labels/itemsTemplate', '%label (%quantity)');
        return itemsSeparator + reward[RewardsConst.MESSAGE.DATA.ITEMS_DATA]?.map((item)=>{
            itemsTemplate = itemsTemplate.replace('%label', item[RewardsConst.MESSAGE.DATA.ITEM_LABEL]);
            itemsTemplate = itemsTemplate.replace('%quantity', item[RewardsConst.MESSAGE.DATA.ITEM_QUANTITY]);
            return itemsTemplate;
        }).join(itemsSeparator);
    }
    showRewardsNotificationBalloon() {
        let balloon = this.gameDom.getElement('#rewards-notification-balloon');
        let activeRewards = this.gameDom.getElements('.reward-active');
        if (balloon && activeRewards && 0 < activeRewards.label) {
            balloon.classList.remove('hidden');
            return;
        }
        balloon.classList.add('hidden');
    }
    activateRewardsAction() {
        let rewardsElements = this.gameDom.getElements('.reward-active');
        for (let rewardElement of rewardsElements)rewardElement.addEventListener('click', ()=>{
            this.gameManager.activeRoomEvents.send({
                [GameConst.ACTION_KEY]: RewardsConst.ACTIONS.ACCEPT_REWARD,
                id: rewardElement.dataset.rewardId
            });
        });
    }
}
module.exports.MessageHandler = MessageHandler;

},{"5bc785032b2d0856":"kO7Qp","1433e37d05c49b27":"loL0N","214c4839fe65344a":"iznl5","62758788d6e9eb13":"@reldens/utils"}],"8oJmV":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - MessagesProcessor
 *
 */ const { MessageHandler } = require("45635d97a9c1c345");
const { Logger, sc } = require("5db63803d008826");
class MessagesProcessor {
    static processRewardsMessagesQueue(event, rewardsPlugin) {
        let roomEvents = event?.roomEvents;
        if (!roomEvents) {
            Logger.critical('RoomEvents undefined for process Rewards messages queue on RewardsPlugin.', event);
            return false;
        }
        if (!sc.isArray(roomEvents.rewardsMessagesQueue)) return;
        if (0 === roomEvents.rewardsMessagesQueue.length) return;
        for (let message of roomEvents.rewardsMessagesQueue)rewardsPlugin.messageListener?.handleRewardsMessage(message, new MessageHandler({
            roomEvents,
            message
        }));
        roomEvents.rewardsMessagesQueue = [];
    }
}
module.exports.MessageProcessor = MessagesProcessor;

},{"45635d97a9c1c345":"2w4Tt","5db63803d008826":"@reldens/utils"}],"exup4":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    rewards: {
        title: 'Rewards',
        dailyLogin: 'Daily Login',
        dailyDescription: 'Login every day and claim your reward',
        straightDaysLogin: '%loginCount Days Login',
        straightDaysDescription: 'Login every day for %loginCount days and claim your reward',
        acceptedReward: 'You accepted the "%rewardLabel" reward!'
    }
};

},{}],"j6xkc":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - FirebaseConnector
 *
 */ const FirebaseApp = require("e7d36bfbb0724f13").default;
const FirebaseAnalytics = require("2ec809fd89cf35d5");
const FirebaseAuth = require("c0c0dbe4468962c4");
const FirebaseUi = require("2b9362a186f219e2");
const { ErrorsBlockHandler } = require("e880c9c922303a35");
const { GameConst } = require("9ce09ab103654ea9");
const { ErrorManager, Logger, sc } = require("7a4562850a98c1a");
class FirebaseConnector {
    constructor(gameManager){
        if (!gameManager) ErrorManager.error('FirebaseConnector - Missing game manager.');
        this.gameManager = gameManager;
        this.gameDom = this.gameManager.gameDom;
        this.analytics = FirebaseAnalytics;
        this.app = FirebaseApp;
        this.firebaseAuth = FirebaseAuth;
        this.ui = FirebaseUi;
        this.authUi = false;
        this.isActive = false;
        this.containerId = '#firebaseui-auth-container';
        this.uiConfig = {
            signInOptions: [
                // uncomment, add or remove options as you need:
                // {provider: this.auth.EmailAuthProvider.PROVIDER_ID}
                {
                    provider: this.firebaseAuth.GoogleAuthProvider.PROVIDER_ID
                },
                {
                    provider: this.firebaseAuth.FacebookAuthProvider.PROVIDER_ID
                },
                // {provider: this.auth.TwitterAuthProvider.PROVIDER_ID},
                {
                    provider: this.firebaseAuth.GithubAuthProvider.PROVIDER_ID
                }
            ],
            // this is to avoid the redirect in the game window:
            signInFlow: 'popup'
        };
        this.gameManager.events.on('reldens.beforeJoinGame', (props)=>{
            if (props.formData['formId'] === 'firebase-login') props.gameManager.userData.isFirebaseLogin = true;
        });
    }
    startFirebase() {
        // @TODO - BETA - Refactor in multiple functions.
        let firebaseUrl = this.gameManager.appServerUrl + GameConst.ROUTE_PATHS.FIREBASE;
        this.gameDom.getJSON(firebaseUrl, (err, response)=>{
            if (err) {
                Logger.error('FirebaseConnector - Failed to load firebase config.', err);
                return false;
            }
            if (!response || !response.enabled) return false;
            let firebaseConfig = response.firebaseConfig;
            this.initAuth(firebaseConfig, this.uiConfig);
            // logout on refresh:
            this.gameDom.getWindow().addEventListener('beforeunload', ()=>{
                if (this.isActive) this.app.auth().signOut();
            });
            // check the current auth state:
            this.app.auth().onAuthStateChanged((user)=>{
                user ? this.setActiveUser(user) : this.startAuthUi();
                return false;
            });
            let firebaseLogin = this.gameDom.getElement('#firebase-login');
            if (firebaseLogin) this.activateLoginBehavior(firebaseLogin);
        });
    }
    activateLoginBehavior(firebaseLogin) {
        firebaseLogin.addEventListener('submit', (e)=>{
            e.preventDefault();
            if (!firebaseLogin.checkValidity()) return false;
            this.gameDom.getElement('.firebase-row-container').classList.remove('hidden');
        });
        let firebaseUser = this.gameDom.getElement('#firebase-username');
        if (!firebaseUser) return false;
        this.gameDom.getElement('.firebase-row-container').classList.remove('hidden');
        firebaseUser.addEventListener('change', ()=>{
            ErrorsBlockHandler.reset(firebaseLogin);
        });
        firebaseUser.addEventListener('focus', ()=>{
            ErrorsBlockHandler.reset(firebaseLogin);
        });
    }
    startAuthUi() {
        // if not logged then start the auth ui:
        this.isActive = false;
        if (this.gameDom.getElement(this.containerId)) this.gameDom.getElement(this.containerId).innerHTML = '';
        this.authUi.start(this.containerId, this.uiConfig);
    }
    setActiveUser(user) {
        this.isActive = true;
        let formData = {
            formId: 'firebase-login',
            email: user.email,
            username: this.gameDom.getElement('#firebase-username').value,
            password: user.uid
        };
        this.gameManager.startGame(formData, true);
    }
    initAuth(firebaseConfig, uiConfig) {
        if (!firebaseConfig || !uiConfig) {
            Logger.error('Missing firebase configuration.');
            return false;
        }
        this.firebaseConfig = firebaseConfig;
        this.uiConfig = uiConfig;
        this.app.initializeApp(this.firebaseConfig);
        if (sc.hasOwn(this.firebaseConfig, 'measurementId')) this.app.analytics();
        this.authUi = new this.ui.auth.AuthUI(this.app.auth());
        // if callbacks or sign-in success result was not customized then we will use a return false for our default:
        if (!sc.hasOwn(this.uiConfig, 'callbacks')) this.uiConfig.callbacks = {};
        // our signInSuccessWithAuthResult default callback is to avoid any missing redirect warnings we don't use:
        if (!sc.hasOwn(this.uiConfig.callbacks, 'signInSuccessWithAuthResult')) this.uiConfig.callbacks.signInSuccessWithAuthResult = ()=>{
            // avoid redirect:
            return false;
        };
    }
}
module.exports.FirebaseConnector = FirebaseConnector;

},{"e7d36bfbb0724f13":"firebase/compat/app","2ec809fd89cf35d5":"firebase/compat/analytics","c0c0dbe4468962c4":"firebase/auth","2b9362a186f219e2":"firebaseui","e880c9c922303a35":"cgmYV","9ce09ab103654ea9":"iznl5","7a4562850a98c1a":"@reldens/utils"}],"gu7ES":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ConfigManager
 *
 */ const { ConfigProcessor } = require("5fbca4d95ccfdb58");
class ConfigManager extends ConfigProcessor {
    constructor(){
        super();
        this.client = {
            general: {
                users: {
                    allowRegistration: true,
                    allowGuest: true,
                    allowGuestUserName: true
                }
            },
            customClasses: {
                message: {
                    listeners: {}
                }
            },
            message: {
                listeners: {}
            }
        };
    }
}
module.exports.ConfigManager = ConfigManager;

},{"5fbca4d95ccfdb58":"jY8Hc"}],"jY8Hc":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - ConfigProcessor
 *
 */ const { Logger, sc } = require("c5ed0c3af76d2f77");
class ConfigProcessor {
    constructor(){
        this.avoidLog = false;
    }
    get(path, defaultValue) {
        let defaultReturn = 'undefined' !== typeof defaultValue ? defaultValue : false;
        let pathArray = path.split('/');
        if (2 > pathArray.length) {
            if (!this.avoidLog) Logger.error('Path level is too low:', path);
            return defaultReturn;
        }
        let levelCheck = this[pathArray[0]] || {};
        for(let i = 1; i < pathArray.length; i++){
            if (!sc.hasOwn(levelCheck, pathArray[i])) {
                if (!this.avoidLog) Logger.error('Configuration level ' + i + ' > "' + pathArray[i] + '" not defined: ' + path);
                levelCheck = defaultReturn;
                break;
            }
            levelCheck = levelCheck[pathArray[i]];
        }
        return levelCheck;
    }
    getWithoutLogs(path, defaultValue = false) {
        this.avoidLog = true;
        let result = this.get(path, defaultValue);
        this.avoidLog = false;
        return result;
    }
}
module.exports.ConfigProcessor = ConfigProcessor;

},{"c5ed0c3af76d2f77":"@reldens/utils"}],"iItMC":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Translations - en_US
 *
 */ module.exports = {
    game: {
        passwordConfirmationNotMatch: 'Password and confirmation does not match.',
        pleaseReadTermsAndConditions: 'Please read and accept the terms and conditions and continue.',
        sessionEnded: 'Your session ended, please login again.',
        errors: {
            missingClasses: 'None configured classes available.',
            missingPlayerData: 'Missing player data.',
            joiningRoom: 'There was an error while joining the room "%joinRoomName", please try again later.',
            joiningFeatureRoom: 'There was an error while joining the feature room "%joinRoomName".',
            reconnectClient: 'Reconnect Game Client error.',
            sessionEnded: 'Your session ended, please login again.',
            connectionLost: 'Connection lost, please login again.',
            serverDown: 'Server is offline.'
        },
        pleaseSelectScene: 'Please select a Scene'
    }
};

},{}],"ac0JX":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - GameDom
 *
 */ const { sc } = require("f53434bdd3518741");
class GameDom {
    constructor(){
        // @TODO - BETA - Change all hardcoded values, and make GameDom a full driver for all the game elements.
        this.styleSuffix = {
            width: 'px',
            height: 'px',
            top: 'px',
            bottom: 'px',
            left: 'px',
            right: 'px'
        };
    }
    getWindow() {
        return window;
    }
    getDocument() {
        return window.document;
    }
    getElement(querySelector, container = false) {
        return (container || document).querySelector(querySelector);
    }
    getElements(querySelector, container) {
        return (container || document).querySelectorAll(querySelector);
    }
    emptyElement(querySelector, container = false) {
        let element = this.getElement(querySelector, container);
        if (element) element.innerHTML = '';
    }
    appendToElement(querySelector, newContent) {
        let element = this.getElement(querySelector);
        if (!element || !newContent) return false;
        let template = document.createElement('template');
        template.innerHTML = newContent;
        for(let i = 0; i < template.content.childNodes.length; i++)element.appendChild(template.content.childNodes[i]);
        return element;
    }
    updateContent(querySelector, newContent) {
        let element = this.getElement(querySelector);
        if (!element) return false;
        element.innerHTML = newContent;
        return element;
    }
    removeElement(querySelector) {
        this.getElement(querySelector)?.remove();
    }
    createElement(type, id = '', classNamesList) {
        let element = document.createElement(type);
        if ('' !== id) element.id = id;
        if (sc.isArray(classNamesList)) for (let className of classNamesList)element.classList.add(className);
        return element;
    }
    setElementStyles(element, styles) {
        if (!element || !styles) return false;
        let stylesKeys = Object.keys(styles);
        for (let i of stylesKeys){
            let styleValue = styles[i];
            let suffix = sc.get(this.styleSuffix, i, '');
            if ('' !== suffix) styleValue += suffix;
            element.style[i] = styleValue;
        }
    }
    createElementWithStyles(type, id = '', styles = {}) {
        let element = this.createElement(type, id);
        this.setElementStyles(element, styles);
        return element;
    }
    activeElement() {
        return document.activeElement;
    }
    insideInput() {
        return 'input' === this.activeElement().tagName.toLowerCase();
    }
    getJSON(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = ()=>{
            let status = xhr.status;
            200 === status ? callback(null, xhr.response) : callback(status);
        };
        xhr.send();
    }
    alertReload(message) {
        alert(message);
        this.getWindow().location.reload();
        return false;
    }
}
module.exports.GameDom = new GameDom();

},{"f53434bdd3518741":"@reldens/utils"}],"fbBe5":[function(require,module,exports,__globalThis) {
module.exports = JSON.parse("{\"name\":\"reldens\",\"version\":\"4.0.0-beta.38.3\",\"description\":\"Reldens - MMORPG Platform\",\"author\":\"Damian A. Pastorini\",\"license\":\"MIT\",\"homepage\":\"https://www.reldens.com/\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/damian-pastorini/reldens.git\"},\"keywords\":[\"reldens\",\"game\",\"mmorpg\",\"rpg\",\"dwd\",\"colyseus\",\"phaser\",\"parcel\",\"nodejs\",\"mmo\",\"multiplayer\",\"rol\",\"platform\",\"framework\",\"javascript\",\"js\",\"script\"],\"bugs\":{\"url\":\"https://github.com/damian-pastorini/reldens/issues\"},\"engines\":{\"node\":\">=18.0.0\",\"npm\":\">=8.0.0\"},\"bin\":{\"reldens\":\"bin/reldens-commands.js\",\"reldens-generate\":\"bin/generate.js\",\"reldens-import\":\"bin/import.js\"},\"dependencies\":{\"@colyseus/core\":\"0.15.55\",\"@colyseus/monitor\":\"0.15.8\",\"@colyseus/schema\":\"2.0.36\",\"@colyseus/ws-transport\":\"0.15.3\",\"@parcel/bundler-default\":\"2.13.3\",\"@parcel/compressor-raw\":\"2.13.3\",\"@parcel/core\":\"2.13.3\",\"@parcel/namer-default\":\"2.13.3\",\"@parcel/optimizer-css\":\"2.13.3\",\"@parcel/optimizer-data-url\":\"2.13.3\",\"@parcel/optimizer-htmlnano\":\"2.13.3\",\"@parcel/optimizer-image\":\"2.13.3\",\"@parcel/optimizer-swc\":\"2.13.3\",\"@parcel/packager-css\":\"2.13.3\",\"@parcel/packager-html\":\"2.13.3\",\"@parcel/packager-js\":\"2.13.3\",\"@parcel/packager-raw\":\"2.13.3\",\"@parcel/packager-raw-url\":\"2.13.3\",\"@parcel/packager-svg\":\"2.13.3\",\"@parcel/packager-ts\":\"2.13.3\",\"@parcel/packager-wasm\":\"2.13.3\",\"@parcel/packager-xml\":\"2.13.3\",\"@parcel/reporter-dev-server\":\"2.13.3\",\"@parcel/resolver-default\":\"2.13.3\",\"@parcel/runtime-browser-hmr\":\"2.13.3\",\"@parcel/runtime-js\":\"2.13.3\",\"@parcel/runtime-react-refresh\":\"2.13.3\",\"@parcel/runtime-service-worker\":\"2.13.3\",\"@parcel/transformer-babel\":\"2.13.3\",\"@parcel/transformer-coffeescript\":\"2.13.3\",\"@parcel/transformer-css\":\"2.13.3\",\"@parcel/transformer-glsl\":\"2.13.3\",\"@parcel/transformer-graphql\":\"2.13.3\",\"@parcel/transformer-html\":\"2.13.3\",\"@parcel/transformer-image\":\"2.13.3\",\"@parcel/transformer-inline-string\":\"2.13.3\",\"@parcel/transformer-js\":\"2.13.3\",\"@parcel/transformer-json\":\"2.13.3\",\"@parcel/transformer-jsonld\":\"2.13.3\",\"@parcel/transformer-less\":\"2.13.3\",\"@parcel/transformer-postcss\":\"2.13.3\",\"@parcel/transformer-posthtml\":\"2.13.3\",\"@parcel/transformer-pug\":\"2.13.3\",\"@parcel/transformer-raw\":\"2.13.3\",\"@parcel/transformer-react-refresh-wrap\":\"2.13.3\",\"@parcel/transformer-sass\":\"2.13.3\",\"@parcel/transformer-stylus\":\"2.13.3\",\"@parcel/transformer-sugarss\":\"2.13.3\",\"@parcel/transformer-svg\":\"2.13.3\",\"@parcel/transformer-toml\":\"2.13.3\",\"@parcel/transformer-typescript-types\":\"2.13.3\",\"@parcel/transformer-vue\":\"2.13.3\",\"@parcel/transformer-webmanifest\":\"2.13.3\",\"@parcel/transformer-worklet\":\"2.13.3\",\"@parcel/transformer-xml\":\"2.13.3\",\"@parcel/transformer-yaml\":\"2.13.3\",\"@reldens/game-data-generator\":\"^0.9.0\",\"@reldens/items-system\":\"^0.34.0\",\"@reldens/modifiers\":\"^0.26.0\",\"@reldens/skills\":\"^0.34.0\",\"@reldens/storage\":\"^0.31.0\",\"@reldens/tile-map-generator\":\"^0.16.0\",\"@reldens/utils\":\"^0.39.0\",\"@sendgrid/mail\":\"8.1.4\",\"bcrypt\":\"5.1.1\",\"body-parser\":\"1.20.3\",\"colyseus.js\":\"0.15.26\",\"core-js\":\"3.39.0\",\"cors\":\"2.8.5\",\"crypto-browserify\":\"^3.12.1\",\"dotenv\":\"16.4.5\",\"ethers\":\"^6.15.0\",\"events\":\"^3.3.0\",\"express\":\"4.21.1\",\"express-basic-auth\":\"1.2.1\",\"express-formidable\":\"1.2.0\",\"express-rate-limit\":\"7.4.1\",\"express-session\":\"1.18.1\",\"firebase\":\"10.14.1\",\"firebaseui\":\"6.1.0\",\"jimp\":\"1.6.0\",\"mime-types\":\"2.1.35\",\"multer\":\"^1.4.5-lts.1\",\"mustache\":\"4.2.0\",\"nodemailer\":\"6.9.16\",\"p2\":\"0.7.1\",\"pathfinding\":\"0.4.18\",\"phaser\":\"3.87.0\",\"react\":\"^18.3.1\",\"react-dom\":\"^18.3.1\",\"react-router-dom\":\"^6.26.2\",\"regenerator-runtime\":\"0.14.1\",\"stream-browserify\":\"^3.0.0\",\"tslib\":\"2.8.1\"},\"alias\":{\"reldens\":\"./\",\"crypto\":\"crypto-browserify\",\"stream\":\"stream-browserify\",\"events\":\"events\",\"process\":\"process/browser\",\"colyseus.js\":\"colyseus.js/dist/colyseus.js\"},\"devDependencies\":{\"@babel/preset-react\":\"^7.27.1\",\"parcel\":\"2.13.3\",\"process\":\"^0.11.10\",\"svgo\":\"^3.3.2\"},\"scripts\":{\"start\":\"node index.js\",\"build\":\"parcel build theme/default/index.html --dist-dir dist --public-url ./\"}}");

},{}],"v0ljK":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Theme - Client Plugin
 *
 */ const { PluginInterface } = require("5775474fb24972c6");
const { Npc1 } = require("66950fed6ab0bf91");
class ClientPlugin extends PluginInterface {
    setup(props) {
        this.events = props.events;
        this.events.on('reldens.beforeJoinGame', (props)=>{
            this.defineCustomClasses(props);
        });
    }
    defineCustomClasses(props) {
        // example on how to define a custom class with a plugin:
        let customClasses = props.gameManager.config.client.customClasses;
        if (!customClasses['objects']) customClasses.objects = {};
        customClasses.objects['people_town_1'] = Npc1;
    }
}
module.exports.ClientPlugin = ClientPlugin;

},{"5775474fb24972c6":"deNd3","66950fed6ab0bf91":"5ZCHj"}],"5ZCHj":[function(require,module,exports,__globalThis) {
/**
 *
 * Reldens - Npc1
 *
 * Custom animation object sample.
 *
 */ const { AnimationEngine } = require("61ae8608f1dd11e8");
class Npc1 extends AnimationEngine {
    constructor(gameManager, props, currentPreloader){
        // @TODO - BETA - This is an example of client side customizations.
        super(gameManager, props, currentPreloader);
    }
}
module.exports.Npc1 = Npc1;

},{"61ae8608f1dd11e8":"joLBp"}]},["1s3Aw"], "1s3Aw", "parcelRequire94c2")

//# sourceMappingURL=index.903fc3b4.js.map
