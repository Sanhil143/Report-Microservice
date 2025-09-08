import './configs/env.config'
import Server from './api/server';
import routes from './routes';

export default new Server().router(routes).listen(process.env.PORT);