import { createClient } from 'redis' 
import { Elysia } from "elysia"


const dragonFly = createClient({
  url: 'redis://87.106.135.145:8020'
})

dragonFly.on('error', (err) => console.error('Dragonfly Error:', err))
await dragonFly.connect()


export const dragonFlyCache = new Elysia({name: "dragonfly-cache"})
.state('cache', {
    get: async <T = any>(key: string): Promise<T | null> => {
      try{
        const data = await dragonFly.get(key);
        return data ? JSON.parse(data) : null
      }catch(error){
        console.log("Cache error", error);
        return null;
      }
    },
  set: async (key: string, data: any, ttlSeconds : number = 600)=>{
    try{
      await dragonFly.setEx(key, ttlSeconds, JSON.stringify(data))
      return true;
    }catch(error){
      console.log("Error while setting ttl", error)
      return false;
    }
  },
  del: async(key: string) =>{
    try{
      await dragonFly.del(key)
      return true;
    }catch(error){
      console.log("Error while deleting key" ,error)
      return false;
    }
  }
})