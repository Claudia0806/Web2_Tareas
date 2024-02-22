const responseStatus = require('../../utils/statusapi');

const adminUser ={
    id: 1,
    role: 'admin',
    name: 'Celeste'
}

const userUser = {
    id: 2,
    role: 'user',
    name: 'Claudia'
}

const middleware = (req, res, next) => {
    const {token} = req.query;
    if(token && token === '12345'){
        req.user = {...adminUser};
        next();
    } else{
        res.status(401).send({ message: "Token inválido"});;
    }
};

function hasRole(req, res, next) {
    if (req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).send({ message: "Acceso denegado: No tienes permiso" });
    }
}

module.exports = {
    authenticateMiddleware: middleware,
    authorizeMiddleware: hasRole
};