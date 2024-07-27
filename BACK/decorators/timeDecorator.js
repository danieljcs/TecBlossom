function logExecutionTime(asyncFunc) {
  return async function (...args) {
    const start = Date.now();
    const result = await asyncFunc.apply(this, args);
    const end = Date.now();
    console.log(`Query executed in ${end - start}ms`);
    return result;
  };
}

module.exports = logExecutionTime;
