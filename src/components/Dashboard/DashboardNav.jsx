import { Link } from 'react-router-dom';

export default function DashboardNav({ mainRoutes, userRoutes, adminRoutes }) {
  const isAdmin = true;

  

  return (
    <>
      <ul>
        {mainRoutes?.map(({ name, path, scrollId }) => (
          <li key={name} className="py-2 border-b border-gray-600">
            <Link to={path} scroll={scrollId}>
              {name}
            </Link>
          </li>
        ))}

        {isAdmin
          ? adminRoutes?.map(({ name, path }) => (
              <li key={name} className="py-2 border-b border-gray-600">
                <Link to={path}>{name}</Link>
              </li>
            ))
          : userRoutes?.map(({ name, path }) => (
              <li key={name} className="py-2 border-b border-gray-600">
                <Link to={path}>{name}</Link>
              </li>
            ))}
      </ul>
    </>
  );
}
