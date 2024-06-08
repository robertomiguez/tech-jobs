import { Link } from 'react-router-dom';

const Card = ({
  title,
  subtitle,
  href,
  label,
  bg,
}: {
  title: string;
  subtitle: string;
  href: string;
  label: string;
  bg: string;
}) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{subtitle}</p>
      <Link
        to={href}
        className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
      >
        {label}
      </Link>
    </div>
  );
};
export default Card;
