import dev from './development';
import prod from './production';
import test from './test';

let getConfig = (env) => {
    switch(env){
        case 'development':
            return dev;

        case 'production':
            return prod;

        case 'test':
            return test;

        default:
            return {};
    }
};

export default getConfig(process.env.NODE_ENV);