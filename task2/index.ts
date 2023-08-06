// How it works:
// Insert a function, and defaults,
// then produce an object named wrappedFunction,
// which organize and override defined defaults
// Example:
// wrappedFunction: {
//    originalFunc: function(a, b),
//    paramName: [a, b]
//    defaults: { a: 1, b: 2 }
// }

export function defaultArguments(func: any, newDefaults: any) {
  // If the func, is originalFunc, use originalFunc
  // else just use the input function
  const originalFunc = func.originalFunc || func;

  const paramNames =
    func.paramNames ||
    originalFunc
      .toString()
      .match(/(?:function\s*.*\(([^)]*)\))/)?.[1] // get the part inside parenthesis
      .split(",") // split the string to array
      .map((param: string) => param.trim());

  const mergedDefaults = { ...(func.defaults || {}), ...newDefaults };

  const wrappedFunc = function (...args: any[]) {
    const extendedArgs = paramNames.map((name: string, index: number) =>
      args[index] !== undefined ? args[index] : mergedDefaults[name]
    );
    return originalFunc(...extendedArgs);
  };

  // Store the original function, parameter names, and merged defaults
  wrappedFunc.originalFunc = originalFunc;
  wrappedFunc.paramNames = paramNames;
  wrappedFunc.defaults = mergedDefaults;

  return wrappedFunc;
}
