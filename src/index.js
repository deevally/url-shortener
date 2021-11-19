import cluster from 'cluster';
import { cpus } from 'os';
import app  from "./app";
import log from "./utils/logger";


const numCPUs = cpus().length;

/**
 * Normalize a port into a number, string, or false.
 */
 const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

if(cluster.isPrimary){
    log.info(`Primary ${process.pid} is running`);
   
    //Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        log.info(`worker ${worker.process.pid} died`);
        cluster.fork();
    }
    )

}else{
  const port = normalizePort(process.env.PORT || 9000);
  // Listen to port
  app.listen(port, () => {
    log.info(`Server started on Port ${port} in ${process.env.NODE_ENV} mode.`);
  });

  log.info(`Worker ${process.pid} started`);

  process.on('SIGTERM', () => {
    app.close(() => {
      log.info('Process terminated')
    })
  });
}



