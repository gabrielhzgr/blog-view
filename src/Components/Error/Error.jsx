function Error({ error }) {
  return (
    <section>
      <h1>{error.name}</h1>
      <p>{error.message}</p>
    </section>
  );
}

export default Error;
