import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/tripby'),
})

export default client
