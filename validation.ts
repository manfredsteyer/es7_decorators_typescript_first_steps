@Validate(h => h.minPrice <= h.maxPrice, "min < max")
class HotelInfo {

    @Required
    name: string;

    @MinValue(0, "Min: 3")
    @MaxValue(7, "Max: 7")
    ranking: number;

    minPrice: number;
    maxPrice: number;
}


class Validator {

    static validate(obj) {

        var errMessages = [];

        if (!obj || !obj.__validators) return errMessages;

        for (var fn of obj.__validators) {
            var errMessage = fn(obj);

            if (errMessage) {
                errMessages.push(errMessage);
            }
        }

        return errMessages;
    }
}

function Deco(target) {
    target.decoratedClass = true;
    target.prototype.decoratedObject = true;
}

function Deco2(target) {
    var someClass: any = function () { };
    someClass.prototype = target;
    someClass.decoratedClass = true;
    someClass.prototype.decoratedObject = true;
    return someClass;
}

function Required(target, name) {
    var val = function(obj) {
        return obj[name] !== null && typeof obj[name] !== "undefined";
    }
    var errorMessage = name + " is required!";
    addValidator(target, val, errorMessage);
}

function MinValue(min, errorMessage) {

    return function (target, name) {
        var val = (obj) => obj[name] >= min;
        addValidator(target, val, errorMessage);
    };
}

function MaxValue(max, errorMessage) {
    return function (target, name) {
        var val = (obj) => obj[name] <= max;
        addValidator(target, val, errorMessage);
    };
}

function Validate(fn, errorMessage) {
    return function (target) {
        addValidator(target.prototype, (obj) => fn(obj), errorMessage);
    };
}

function addValidator(target, validatorFn, errorMessage) {
    if (!target.__validators) {
        target.__validators = [];
    }
    var extFn = (obj) => !validatorFn(obj) ? errorMessage : null;
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