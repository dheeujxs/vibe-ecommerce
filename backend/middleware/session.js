const sessionMiddleware = (req, res, next) => {
    let sessionId = req.headers['x-session-id'];
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    req.sessionId = sessionId;
    res.setHeader('X-Session-ID', sessionId);
    next();
  };
  
  module.exports = sessionMiddleware;