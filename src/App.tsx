import { ReactElement } from "react";
import { Logo } from "./components/Logo";
import { RepositoryList } from "./components/RepositoryList";
import "./styles/global.scss";

export function App(): ReactElement {
  console.log(process.env.NODE_ENV)
  return (
    <section className="container">
      <Logo />
      <RepositoryList />
    </section>
  );
}
