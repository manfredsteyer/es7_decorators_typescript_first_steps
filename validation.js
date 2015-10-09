var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HotelInfo = (function () {
    function HotelInfo() {
    }
    __decorate([
        Required, 
        __metadata('design:type', String)
    ], HotelInfo.prototype, "name");
    __decorate([
        MinValue(0, "Min: 3"),
        MaxValue(7, "Max: 7"), 
        __metadata('design:type', Number)
    ], HotelInfo.prototype, "ranking");
    HotelInfo = __decorate([
        Validate(function (h) { return h.minPrice <= h.maxPrice; }, "min < max"), 
        __metadata('design:paramtypes', [])
    ], HotelInfo);
    return HotelInfo;
})();
var Validator = (function () {
    function Validator() {
    }
    Validator.validate = function (obj) {
        var errMessages = [];
        if (!obj || !obj.__validators)
            return errMessages;
        for (var _i = 0, _a = obj.__validators; _i < _a.length; _i++) {
            var fn = _a[_i];
            var errMessage = fn(obj);
            if (errMessage) {
                errMessages.push(errMessage);
            }
        }
        return errMessages;
    };
    return Validator;
})();
function Deco(target) {
    target.decoratedClass = true;
    target.prototype.decoratedObject = true;
}
function Deco2(target) {
    var someClass = function () { };
    someClass.prototype = target;
    someClass.decoratedClass = true;
    someClass.prototype.decoratedObject = true;
    return someClass;
}
function Required(target, name) {
    var val = function (obj) {
        return obj[name] !== null && typeof obj[name] !== "undefined";
    };
    var errorMessage = name + " is required!";
    addValidator(target, val, errorMessage);
}
function MinValue(min, errorMessage) {
    return function (target, name) {
        var val = function (obj) { return obj[name] >= min; };
        addValidator(target, val, errorMessage);
    };
}
function MaxValue(max, errorMessage) {
    return function (target, name) {
        var val = function (obj) { return obj[name] <= max; };
        addValidator(target, val, errorMessage);
    };
}
function Validate(fn, errorMessage) {
    return function (target) {
        addValidator(target.prototype, function (obj) { return fn(obj); }, errorMessage);
    };
}
function addValidator(target, validatorFn, errorMessage) {
    if (!target.__validators) {
        target.__validators = [];
    }
    var extFn = function (obj) { return !validatorFn(obj) ? errorMessage : null; };
    target.__validators.push(extFn);
}
var hotel = new HotelInfo();
hotel.name = "Test";
hotel.ranking = 3;
hotel.minPrice = 800;
hotel.maxPrice = 100;
var err = Validator.validate(hotel);
if (err.length > 0) {
    console.log(err.join("\n"));
}
else {
    console.log("No errors!");
}
//# sourceMappingURL=validation.js.map