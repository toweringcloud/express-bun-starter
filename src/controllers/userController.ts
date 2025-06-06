export const list = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>User List</h1>');
export const info = (req: { params: { id: any; }; }, res: { send: (arg0: string) => any; }) => res.send(`<h1>User Info: ${req.params.id}</h1>`);
export const edit = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>User Edit</h1>');
export const signUp = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>Join</h1>');
export const signIn = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>Login</h1>');
export const signOut = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>Logout</h1>');
