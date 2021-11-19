import UrlService from './url-shortener.service';

const service = () => {

    return Object.freeze({
        url: UrlService,
    });
}

const exposeService = async(req, res, next) => {
req.service = service();
next();
}

export default exposeService;