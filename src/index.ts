import server from './server'

import { config } from './shared/environments/environments'

server.listen(config.port, () => {
    console.log(`Server is running ${config.port}`)
})


