import FileImage from "../assets/file.png";

export default function FileItem({ item }) {
  const { name, link, difficulty } = item;
  return (
    <div className="file-item">
      <img src={FileImage} alt="bluefile" />
      <div className="item-name">
        <a href={link} target="_blank" rel="noreferrer noopener">
          <span>{name}</span>
        </a>
        <span>
          Level:
          <label> {difficulty}</label>
        </span>
      </div>
    </div>
  );
}
