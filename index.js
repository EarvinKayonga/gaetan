// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const mongoURL = process.env.MONGO_URL|| 'mongodb://mongo/mydb'
const port = process.env.PORT || 3000

fastify.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: mongoURL, 
})
fastify.get('/user/:id', async function (req, reply) {
  // Or this.mongo.client.db('mydb').collection('users')
  const users = this.mongo.db.collection('users')

  // if the id is an ObjectId format, you need to create a new ObjectId
  const id = this.mongo.ObjectId(req.params.id)
  try {
    const user = await users.findOne({ id })
    return user
  } catch (err) {
    return err
  }
})

// Run the server!
fastify.listen({ port }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
