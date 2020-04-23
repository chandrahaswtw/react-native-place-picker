const variables = {
    development: {
        googleApiKey: 'AIzaSyAnhyzA_r2N8ZfwsQXE0mCIUz7dHYOfUfs'
    },
    production: {
        googleApiKey: 'xyz'
    }
};
 
const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};
 
export default getEnvVariables; // export a reference to the function