import LinkImage from "../assets/link.png";

export default function LinkItem({ item }) {
  const { name, link, difficulty } = item;
  return (
    <div className="link-item">
      <img src={LinkImage} alt="video" />
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
