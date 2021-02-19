const pageStub = (name) => `function ${name}() {
  // Implement something for Nextjs's page.
  return (
      <></>
  );
}

/*
 * For Server-Side-Rendering with Nextjs
 */
export async function getServerSideProps() {
  return { props: {} };
}

export default ${name};
`

const page = (name) => {
    return pageStub(name);
}

module.exports = {
  page
}