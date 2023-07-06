import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { loadFiles } from "@graphql-tools/load-files";
import resolversArray from "./schema/schema";
import resolvers from "./schema/schema";

const __filenaem = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenaem);
// console.log(path.join(__dirname, "/schema/movie/schema.graphql"));

console.log(__dirname);
const typeDefs = await loadFiles(`${__dirname}/**/**/*.graphql`);
// const typeDefs = readFileSync("./schema.graphql", "utf-8");
console.log(typeDefs);

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
