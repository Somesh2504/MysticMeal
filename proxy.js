const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set up the proxy middleware
app.use('/api', createProxyMiddleware({
    target: 'http://www.themealdb.com/api/json/v1/1',
    changeOrigin: true,
    logLevel: 'debug'
}));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
