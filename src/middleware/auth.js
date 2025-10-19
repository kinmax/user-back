require('dotenv').config({ path: '../config/.env' });

const authenticateAdmin = (req, res, next) => {
    const apiKey = req.header('x-api-key') || req.header('X-API-KEY') || req.header('X-Api-Key') || req.header('X-API-Key');
    if (!apiKey) {
        return res.status(401).json({ message: 'API key is missing' });
    }

    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: 'Invalid API key' });
    }
    
    next();
}

module.exports = {
    authenticateAdmin
};