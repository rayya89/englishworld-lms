export default function FileItem({ item }) {
  const { name, link, difficulty } = item;
  return (
    <div>
      <a href={link} target="_blank" rel="noreferrer noopener">
        <span>{name}</span>
      </a>
      <span>Level:{difficulty}</span>
    </div>
  );
}
