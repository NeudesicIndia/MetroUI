(function () {

    var namespace = function (path, context) {
        var result,
            arg,
            args,
            i,
            length,
            segments,
            module,
            parent,
            contextIsFunction;

        contextIsFunction = typeof context == 'function';

        if (contextIsFunction || arguments.length == 1) {
            result = lookUpOrCreate(path);

            if (arguments.length > 2) {
                args = Array.prototype.slice.call(arguments, 2);

                for (i = 0, length = args.length; i < length; ++i) {
                    arg = args[i];

                    if (typeof arg == 'string') {
                        args[i] = lookUpOrCreate(arg);
                    } else {
                        args[i] = arg;
                    }
                }
            }

            if (contextIsFunction) {
                context.apply(result, [result].concat(args));
            }
        } else {
            segments = path.split('.');
            module = segments.pop();
            parent = lookUpOrCreate(segments.join('.'));

            parent[module] = result = context;
        }

        return result;
    };

    var lookUpOrCreate = function (path) {
        var segments = path.split('.'),
            cursor = window,
            length = segments.length,
            segment,
            i;

        for (i = 0; i < length; ++i) {
            segment = segments[i];
            cursor = cursor[segment] = cursor[segment] || {};
        }

        return cursor;
    };

    namespace('Neudesic.utilities', function (exports) {
        exports.namespace = namespace;
    });
})();