export default function FileItem({ item }) {
  const { name, link, difficulty } = item;
  return (
    <div>
      <span>{name}</span>
      <span>Level:{difficulty}</span>
    </div>
  );
}
