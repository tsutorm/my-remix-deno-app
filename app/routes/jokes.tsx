import type {
  LinksFunction,
  LoaderFunction
} from "@remix-run/deno";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/deno";
import * as React from "react";
import { findManyJokes } from "../utils/db/jokes.ts";
import stylesUrl from "../styles/jokes.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  jokeListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokeListItems: await findManyJokes(),
  };

  return json(data);
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();
  console.dir(data);
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to="/"
              title="Remix Jokes"
              aria-label="Remix Jokes"
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokeListItems.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}