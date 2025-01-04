// 🐨 you're gonna need this:
import * as Comlink from 'comlink'
// 🐨 move the stuff that's in index.ts into this file.
import { matchSorter } from 'match-sorter'
import cities from './us-cities.json'

const allCities = cities.map((city, index) => ({ ...city, id: String(index) }))

export function searchCities(filter: string) {
    return matchSorter(allCities, filter, { keys: ['name'] })
}
// 🐨 create an object called "exposed" that has searchCities in it
const exposed = {searchCities}
// 🐨 call Comlink.expose with the exposed object
Comlink.expose(exposed)
// 🦺 create and export a type called "Exposed" that is "typeof exposed"
//   (you'll need this to get nice type safety in the main thread)
// 💰 export type Exposed = typeof exposed
export type Exposed = typeof exposed
