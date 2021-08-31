import APP from './app';
const PORT = process.env.PORT!;

APP.listen(PORT, () => console.log(`Server listen in http://localhost:${PORT}/api`));
