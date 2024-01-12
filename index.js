// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const mongoURL = process.env.MONGO_URL|| 'mongodb://localhost:27017/mydb'
const port = process.env.PORT || 3000

fastify.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: mongoURL, 
})
fastify.get('/', async (request, reply) => {
  return { message: 'Hello world!' }
})

fastify.get('/users/:id', async function (req, reply) {
  // Or this.mongo.client.db('mydb').collection('users')
  const users = this.mongo.db.collection('users')

  // if the id is an ObjectId format, you need to create a new ObjectId
  const id = new this.mongo.ObjectId(req.params.id)
  try {
    const user = await users.findOne({ id })
    return user
  } catch (err) {
    return { message: 'Hello world! et', err }
  }
})
/*
fastify.get('/users/:id', async (request, reply) => {
  const UsersId = request.params.id;

  const db = fastify.mongo.db;
  const collection = db.collection('users');

  const user = await collection.findOne({ _id: new fastify.mongo.ObjectId(UsersId) });

  if (!user) {
    reply.code(404).send({ message: 'User non trouvée' });
    return;
  }

  reply.send(user);
});
*/
// Run the server!
fastify.listen({ port, host:"0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
