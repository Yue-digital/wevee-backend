import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Edge } from 'edge.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const edge = new Edge({ cache: false })
edge.mount(join(__dirname, 'views'))

export default edge;
