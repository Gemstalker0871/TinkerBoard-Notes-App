import 'dotenv/config'
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";


//create a rate limiter that allows 100 requests per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:(Ratelimit.slidingWindow(100, "20 s"))
})


export default ratelimit