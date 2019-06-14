/*const {
  GraphQLServer
} = require('graphql-yoga')

const typeDefs =
  `type Query{
info:String!
}`

const resolvers={
  Query:{
    info:()=> null, `This is API of Hackernews Clone`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
*/

/*const {
  GraphQLServer
} = require('graphql-yoga')

const typeDefs =
  `type Query{
info:String!
feed:[Link!]!
}
type Link{
  id:ID!
  description:String!
  url:String!
}
`
let links=[{
  id:'link-0',
  url:'www.howtographql.com',
  description:'Fullstack tutorial for GraphQLServer'
}]

const resolvers={
  Query:{
    info:()=> `This is API of Hackernews Clone`,
    feed:() =>links
  },

  Link:{
    id:(parent) => parent.id,
    description:(parent) => parent.description,
    url:(parent) => parent.url
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
*/

/*
const {
  GraphQLServer
} = require('graphql-yoga')


let links=[{
  id:'link-0',
  url:'www.howtographql.com',
  description:'Fullstack tutorial for GraphQLServer'
}]

let idCount = links.length

const resolvers={
  Query:{
    info:()=> `This is API of Hackernews Clone`,
    feed:() =>links
  },

  Mutation: {
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
}

const server = new GraphQLServer({
  typeDefs:'./src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))*/



const {
  prisma
} = require('./generated/prisma-client')

const {
  GraphQLServer
} = require('graphql-yoga')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
