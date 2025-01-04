// 🐨 move all this to a new file at ./filter-cities.worker.ts 👇

// 🐨 move all that to a new file at ./filter-cities.worker.ts 👆

// 🐨 🛑 finish the instructions in ./filter-cities.worker.ts before continuing here...

// 🐨 you're going to want this:
import * as Comlink from 'comlink'
// 🐨 import the Exposed type from './fitler-cities.worker'
import type { Exposed } from './filter-cities.worker'
// 🐨 create a new Worker object out of the ./filter-cities.worker.ts module
const filterCities = new Worker(new URL('./filter-cities.worker', import.meta.url), { type: 'module' })
// 🐨 create a filterCities object by calling Comlink.wrap with the worker
const filterCitiesApi = Comlink.wrap<Exposed>(filterCities)
// 🦺 you can use the Exposed type as the generic for some type safety

// 🐨 export a new searchCities that calls the filterCities.searchCities API with a given input
export const searchCities = (filter: string) => filterCitiesApi.searchCities(filter)