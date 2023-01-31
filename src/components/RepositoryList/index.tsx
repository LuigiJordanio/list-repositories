import { ReactElement, useEffect, useState } from "react";
import { Loading } from "../Loading";
import { RepositoryItem } from "../RepositoryItem";
interface Repository {
  name: string;
  description: string;
  html_url: string;
  updated_at: string;
  watchers: number;
}

export function RepositoryList():ReactElement {
  let [repositories, setRepositories] = useState<Repository[]>([]);
  let [page, setPage] = useState<number>(1);
  let [gitUser, setGitUser] = useState<string>('luigiJordanio');
  let [per_page, setPerPage] = useState<number>(3);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [hasNextPage, setHasNextPage] = useState<boolean>(true);


  const updateRepositories = (gitUser: string, isNewsUser: boolean) => {
    setIsLoading(true)
    const parameters = {
      page: String(page),
      per_page: String(per_page),
      type: 'all'
    }

    fetch(`https://api.github.com/users/${gitUser}/repos?${new URLSearchParams(parameters).toString()}`)
      .then((response) => response.json())
      .then((data) => {

        if (isNewsUser) {
          repositories = [];
          setPage(1)
        }
        setHasNextPage(!(data.length < per_page))

        repositories.push(...data)
        setRepositories(repositories)
        setIsLoading(false)

      }).catch((error) => {
        setRepositories([])
        setIsLoading(false)
        console.error(error)
      });
  }


  useEffect(() => {
    updateRepositories(gitUser, false)
  }, [page, per_page]);

  useEffect(() => {
    console.log(gitUser)
    updateRepositories(gitUser, true)
  }, [gitUser]);

  return (
    <div className="repositoryList">
      <header>
        <h2>Repositórios</h2>
        <input type="text" placeholder="Usuário Git" onBlur={(e) => setGitUser(e.target.value)} />
      </header>
      <div className="containerRepository">
        {isLoading ? <Loading /> :
          repositories.map((repository) => {
            return (
              <RepositoryItem key={repository.name} repository={repository} />
            );
          })
        }

        {!repositories.length && !isLoading &&
          <p className="emptyRepositories">Nenhum repositório encontrado, faça uma nova pesquisa com outro usuário.</p>
        }
      </div>
      {
        hasNextPage &&
        <button onClick={() => {
          setPage(page + 1)
        }}>Carregar mais</button>
      }
    </div>
  );
}
