interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
    watchers: number;
  };
}
export function RepositoryItem(props: RepositoryItemProps) {
  return (
    <div className="repositoryItem">
      <span>⭐ {props.repository.watchers}</span>
      <strong>{props.repository.name}</strong>
      <p>{props.repository.description}</p>
      <a href={props.repository.html_url} target="_blank">
        Acessar repositório
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M0.590088 10.59L5.17009 6L0.590088 1.41L2.00009 0L8.00009 6L2.00009 12L0.590088 10.59Z" fill="#180000" />
        </svg>
      </a>
    </div>
  );
}
