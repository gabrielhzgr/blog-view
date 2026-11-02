import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  const env = import.meta.env.VITE_ENV;
  return (
    <section>
      <h1>{error.name}</h1>
      <p>{error.message}</p>
      {env == "dev" ? error.stack : null}
    </section>
  );
}

export default ErrorPage;
