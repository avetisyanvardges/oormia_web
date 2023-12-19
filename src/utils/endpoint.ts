const endpoint = (method: string, route: string) => ({
    endpoint: `${method} ${route}`,
    url: route,
});

export default endpoint;