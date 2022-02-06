const redirect = (location: string) => {
  return {
    status: 302,
    headers: { Location: location },
  };
};

export default redirect;
