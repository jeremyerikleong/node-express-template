export default function notFound(req, res, next) {
    const error = new Error(`Endpoint Not Found`);
    error.status = 404;
    return next(error);
}