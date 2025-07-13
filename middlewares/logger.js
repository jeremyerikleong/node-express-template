import colors from 'colors';

export default function logger(req, res, next) {
    const methodColors = {
        GET: 'cyan',
        POST: 'green',
        PUT: 'orange',
        PATCH: 'yellow',
        DELETE: 'red'
    }

    const color = methodColors[req.method] || 'white';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
}