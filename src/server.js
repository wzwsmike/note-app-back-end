const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    const { uri } = server.info;
    console.log(`Server berjalan pada ${uri}`);
};

init();
