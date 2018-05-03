


/// <dependency type="js" file="array.js" />

(function(global, undefined) {
    "use strict";

    function getKeys(obj) {
        var array = [],
            prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                array.push(prop);
            }
        }
        return array;
    }

    function initializeProperties(target, members) {
        var keys = getKeys(members),
            len = keys.length,
            i,
            key;
        for (i = 0; i < len; i++) {
            key = keys[i];
            target[key] = members[key];
        }
    }

    function itemExists(context, path, defaultValue) {
        if (!context || !path) {
            return defaultValue;
        }

        var currentContext = context,
            pathFragments = path.split("."),
            len = pathFragments.length,
            i,
            namespaceName;

        for (i = 0; i < len; i++) {
            namespaceName = pathFragments[i];
            currentContext = currentContext[namespaceName];
            if (!currentContext) {
                return defaultValue;
            }
        }

        return currentContext;
    }

    // Establish the "ML.Namespace" object
    (function(rootNamespace) {
        // Create the rootNamespace in the global namespace
        if (!global[rootNamespace]) {
            global[rootNamespace] = {};
        }

        // Cache the rootNamespace we just created in a local variable
        var _rootNamespace = global[rootNamespace];
        if (!_rootNamespace.Namespace) {
            _rootNamespace.Namespace = {};
        }

        function defineWithParent(parentNamespace, name, members) {
            /// <summary>
            /// Defines a new namespace with the specified name, under the specified parent namespace.
            /// </summary>
            /// <param name="parentNamespace" type="Object">
            /// The parent namespace which will contain the new namespace.
            /// </param>
            /// <param name="name" type="String">
            /// Name of the new namespace.
            /// </param>
            /// <param name="members" type="Object">
            /// Members in the new namespace.
            /// </param>
            /// <returns>
            /// The newly defined namespace.
            /// </returns>
            var currentNamespace = parentNamespace,
                namespaceFragments = name.split("."),
                i,
                len,
                namespaceName;

            for (i = 0, len = namespaceFragments.length; i < len; i++) {
                namespaceName = namespaceFragments[i];
                if (!currentNamespace[namespaceName]) {
                    currentNamespace[namespaceName] = {};
                }
                currentNamespace = currentNamespace[namespaceName];
            }

            if (members) {
                initializeProperties(currentNamespace, members);
            }

            return currentNamespace;
        }

        function define(name, members) {
            /// <summary>
            /// Defines a new namespace with the specified name.
            /// </summary>
            /// <param name="name" type="String">
            /// Name of the namespace.  This could be a dot-separated nested name.
            /// </param>
            /// <param name="members" type="Object">
            /// Members in the new namespace.
            /// </param>
            /// <returns>
            /// The newly defined namespace.
            /// </returns>
            return defineWithParent(global, name, members);
        }

        function exists(path, defaultValue) {
            /// <summary>
            /// Checks if the namespace or function exists on the root namespace and returns it.
            /// &#10;Returns null if it doesn't exist or the provided default value.
            /// </summary>
            /// <param name="path" type="String">Namespace or function to verify its existence</param>
            /// <param name="defaultValue" type="Object">Value returned in case the path is not found</param>
            /// <returns type="Object" />

            return itemExists(_rootNamespace, path, defaultValue);
        }

        initializeProperties(_rootNamespace, {
            exists: exists
        });

        initializeProperties(_rootNamespace.Namespace, {
            defineWithParent: defineWithParent,
            define: define
        });
    })("ML");

    // Establish the ML.Class object
    (function(ml) {
        function define(constructor, instanceMembers, staticMembers) {
            /// <summary>
            /// Defines a class using the given constructor and with the specified instance members.
            /// </summary>
            /// <param name="constructor" type="Function">
            /// A constructor function that will be used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object">
            /// The set of instance fields, properties and methods to be made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object">
            /// The set of static fields, properties and methods to be made available on the class.
            /// </param>
            /// <returns type="Function">
            /// The newly defined class.
            /// </returns>
            constructor = constructor || function() { };
            if (instanceMembers) {
                initializeProperties(constructor.prototype, instanceMembers);
            }
            if (staticMembers) {
                initializeProperties(constructor, staticMembers);
            }
            return constructor;
        }

        function derive(baseClass, constructor, instanceMembers, staticMembers) {
            /// <summary>
            /// Uses prototypal inheritance to create a sub-class based on the supplied baseClass parameter.
            /// </summary>
            /// <param name="baseClass" type="Function">
            /// The class to inherit from.
            /// </param>
            /// <param name="constructor" type="Function">
            /// A constructor function that will be used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object">
            /// The set of instance fields, properties and methods to be made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object">
            /// The set of static fields, properties and methods to be made available on the class.
            /// </param>
            /// <returns type="Function">
            /// The newly defined class.
            /// </returns>
            if (baseClass) {
                constructor = constructor || function() { };
                var basePrototype = baseClass.prototype,
                    /// <disable>JS2076.IdentifierIsMiscased</disable> // Constructor is a class name
                    Constructor = function() { };
                    /// <enable>JS2076.IdentifierIsMiscased</enable>
                Constructor.prototype = basePrototype;
                constructor.prototype = new Constructor();
                constructor.prototype._super = basePrototype;
                constructor.prototype.constructor = constructor;
                if (instanceMembers) {
                    initializeProperties(constructor.prototype, instanceMembers);
                }
                if (staticMembers) {
                    initializeProperties(constructor, staticMembers);
                }
                return constructor;
            } else {
                return define(constructor, instanceMembers, staticMembers);
            }
        }

        function mix(constructor) {
            /// <summary>
            /// Defines a class using the given constructor and the union of the set of instance members
            /// specified by all the mixin objects.  The mixin parameter list can be of variable length.
            /// </summary>
            /// <param name="constructor">
            /// A constructor function that will be used to instantiate this class.
            /// </param>
            /// <returns>
            /// The newly defined class.
            /// </returns>
            constructor = constructor || function() { };
            var i, len;
            for (i = 0, len = arguments.length; i < len; i++) {
                initializeProperties(constructor.prototype, arguments[i]);
            }
            return constructor;
        }

        ml.Namespace.define("ML.Class", {
            define: define,
            derive: derive,
            mix: mix
        });
    })(ML);
})(this);









