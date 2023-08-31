exports.id = 741;
exports.ids = [741];
exports.modules = {

/***/ 93664:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 88861:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 65270))

/***/ }),

/***/ 65270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__(99973);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(23824);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
;// CONCATENATED MODULE: ./src/components/ImportBootstrap.js
/* __next_internal_client_entry_do_not_use__ default auto */ 
function ImportBootstrap() {
    (0,react_.useEffect)(()=>{
        __webpack_require__(44185);
    }, []);
    return null;
}

// EXTERNAL MODULE: ./src/context/AuthContext.js
var AuthContext = __webpack_require__(40316);
;// CONCATENATED MODULE: ./src/app/layout.js
/* __next_internal_client_entry_do_not_use__ default auto */ 




//import "@fortawesome/fontawesome-svg-core/styles.css";
//import { config } from "@fortawesome/fontawesome-svg-core";
//config.autoAddCss = false;
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(ImportBootstrap, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(AuthContext/* AuthContextProvider */.HD, {
                    children: children
                })
            ]
        })
    });
}


/***/ }),

/***/ 40316:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Eu: () => (/* binding */ useAuthContext),
/* harmony export */   HD: () => (/* binding */ AuthContextProvider)
/* harmony export */ });
/* unused harmony export AuthContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(43407);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95585);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61522);
/* harmony import */ var _public_ArquimaLogo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69200);
/* harmony import */ var _public_engranes_gif__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10541);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(52451);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_7__);









const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__/* .getAuth */ .v0)(_firebase_config__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
const AuthContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext({});
const useAuthContext = ()=>react__WEBPACK_IMPORTED_MODULE_1___default().useContext(AuthContext);
const AuthContextProvider = ({ children })=>{
    const [user, setUser] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [loading, setLoading] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(true);
    const [name, setName] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [cel, setCel] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [rol, setRol] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [currentRol, setCurrentRol] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [currentName, setCurrentName] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__/* .onAuthStateChanged */ .Aj)(auth, (user)=>{
            if (user) {
                setUser(user);
                userDB();
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        user
    ]);
    async function userDB() {
        try {
            const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .doc */ .JU)(_firebase_config__WEBPACK_IMPORTED_MODULE_3__.db, "empleados", user.uid);
            const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__/* .getDoc */ .QT)(docRef);
            const docus = docSnap.data();
            setCurrentRol(docus.rol);
            setCurrentName(docus.nombre);
        } catch (e) {
            console.log(e);
        }
    }
    const changeName = (name)=>{
        setName(name);
    };
    const changeCel = (cel)=>{
        setCel(cel);
    };
    const changeRol = (rol)=>{
        setRol(rol);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            user,
            name,
            cel,
            rol,
            changeName,
            changeCel,
            changeRol,
            currentRol,
            userDB,
            currentName
        },
        children: loading ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "container-sm text-center my-5 align-items-center",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                        className: "img-fluid",
                        alt: "logo",
                        src: _public_ArquimaLogo_png__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z,
                        width: 600,
                        height: 460
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_7___default()), {
                            className: "img-fluid",
                            alt: "engrane",
                            src: _public_engranes_gif__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z,
                            width: 350,
                            height: 210
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: "Loading..."
                        })
                    ]
                })
            ]
        }) : children
    });
};


/***/ }),

/***/ 95585:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   db: () => (/* binding */ db),
/* harmony export */   t: () => (/* binding */ storage)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72856);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61522);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31640);
// Import the functions you need from the SDKs you need



//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyAu3uaivU4_dcmDipBtrqr59jCSC5EQY0I",
    authDomain: "arquimainfsys.firebaseapp.com",
    projectId: "arquimainfsys",
    storageBucket: "arquimainfsys.appspot.com",
    messagingSenderId: "220334849818",
    appId: "1:220334849818:web:d65e267b0a726f9f5e36a3"
};
// Initialize Firebase
let firebase_app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .getApps */ .C6)().length === 0 ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .initializeApp */ .ZF)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .getApps */ .C6)()[0];
//const analytics = getAnalytics(firebase_app);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (firebase_app);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .getFirestore */ .ad)(firebase_app);
const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__/* .getStorage */ .cF)(firebase_app);


/***/ }),

/***/ 82911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/k2/Documents/arquima/src/app/layout.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 69200:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/ArquimaLogo.0f6754b6.png","height":1433,"width":3416,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAQAAAAEwYbDAAAANUlEQVR42g3DMQqAIAAAwIMo6AOBFD3Bhzg4uomDu+D/Fz04aDJup8vBYxqSru6FH0SvTxAWanoEMnhCkAoAAAAASUVORK5CYII=","blurWidth":8,"blurHeight":3});

/***/ }),

/***/ 10541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/engranes.0bcfd619.gif","height":240,"width":320,"blurWidth":0,"blurHeight":0});

/***/ }),

/***/ 73881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"1662x1433"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 23824:
/***/ (() => {



/***/ })

};
;