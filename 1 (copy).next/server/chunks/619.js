"use strict";
exports.id = 619;
exports.ids = [619];
exports.modules = {

/***/ 37688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Docesquema)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Docesquema(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mb-3 mx-5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                htmlFor: "docEsquema",
                className: "form-label",
                children: props.tipo
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "text",
                onChange: props.onChange,
                value: props.value,
                name: "docEsquema",
                className: "form-control",
                id: "docEsquema",
                placeholder: props.tipo
            })
        ]
    });
}


/***/ }),

/***/ 64882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ signoutfirebase)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95585);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43407);


const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .getAuth */ .v0)(_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);
async function signoutfirebase() {
    try {
        const result = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .signOut */ .w7)(auth);
    } catch (e) {
        const error = e;
    }
}


/***/ }),

/***/ 79963:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ currencyMXN)
/* harmony export */ });
const currencyMXN = (numero)=>{
    const formateador = new Intl.NumberFormat("en-US", {
        style: "currency",
        "currency": "USD"
    });
    const formateado = formateador.format(numero);
    return formateado;
};


/***/ }),

/***/ 65140:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ compras)
/* harmony export */ });
const compras = [
    "CONTADO",
    "FOVISSSTE-infonavit-fovissste",
    "FOVISSSTE-tradicional",
    "FOVISSSTE-conyugal",
    "FOVISSSTE-para-todos",
    "INFOVANIT-tradicional",
    "INFOVANIT-unamos-creditos",
    "INFOVANIT-conyugal",
    "INFOVANIT-infonavit-fovissste",
    "INFOVANIT-crediterreno",
    "INFOVANIT-segundo-credito",
    "INFOVANIT-cofinativ",
    "IPEJAL-tradicional",
    "IPEJAL-terreno",
    "IPEJAL-conyugal",
    "BANCARIO / caja popular -terreno",
    "BANCARIO / caja popular -casa"
];


/***/ })

};
;