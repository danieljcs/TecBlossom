// src/middleware/requestLogger.js

const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const query = req.body.query ? JSON.stringify(req.body.query, null, 2) : 'N/A';
      const variables = req.body.variables ? JSON.stringify(req.body.variables, null, 2) : 'N/A';
  
      const logMessage = `
            Method: ${req.method}
            URL: ${req.originalUrl}
            Status: ${res.statusCode}
            Response Time: ${duration}ms
            Query: ${query}
            Variables: ${variables}
        `;
      console.log(logMessage);
    });
  
    next();
  };
  
  module.exports = requestLogger;
  