
// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const helmet = require('helmet');
// const { rateLimitMiddleware } = require('./utils/rateLimiter');
// require('dotenv').config();

// const connectDB = require('./config/database');
// const { initRateLimiter } = require('./utils/rateLimiter');

// const app = express();
// const server = http.createServer(app);

// // Connect to MongoDB
// connectDB().then(() => {
//   initRateLimiter();
// });

// const cors = require('cors');



// // Middleware
// app.use(helmet());
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Rate limiting (dynamic, admin configurable)
// app.use('/api', rateLimitMiddleware);

// // Professional logging middleware
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// // Uncomment and implement these routes for full functionality
// app.use('/api/users', require('./routes/users'));
// app.use('/api/links', require('./routes/links'));
// app.use('/api/submissions', require('./routes/submissions'));
// app.use('/api/analytics', require('./routes/analytics'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/audit', require('./routes/audit'));
// app.use('/api/export', require('./routes/export'));

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date() });
// });

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Not Found' });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
// const { rateLimitMiddleware } = require('./utils/rateLimiter'); // COMMENTED OUT FOR DEMO SAFETY
require('dotenv').config();

const connectDB = require('./config/database');
// const { initRateLimiter } = require('./utils/rateLimiter'); // COMMENTED OUT

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB().then(() => {
  // initRateLimiter(); // COMMENTED OUT
  console.log("✅ Database Connected");
});

// Middleware
app.use(helmet());

// --- MODIFIED CORS FOR DEMO SUCCESS ---
app.use(cors({
  origin: '*', // ALLOW ALL (Safest for demo. Change back to specific URL for production later)
  credentials: true // Note: credentials true might conflict with origin '*', but for many configs it passes. 
                    // If you face issues, remove credentials: true OR set specific origins.
}));
// --------------------------------------

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting disabled for College Wi-Fi safety
// app.use('/api', rateLimitMiddleware); 

// Professional logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/links', require('./routes/links'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/audit', require('./routes/audit'));
app.use('/api/export', require('./routes/export'));

// Health check (Important for Render to know app is alive)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.get('/', (req, res) => {
    res.send("Backend is Running!"); 
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});