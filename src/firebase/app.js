import config from './config.json'
import init from './init'

const { projectId, ...rest } = config

const app = init(projectId, rest)

export default app
