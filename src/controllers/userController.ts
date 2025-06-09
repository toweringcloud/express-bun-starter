export const list = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('user_list', { pageTitle: 'User List' });
export const info = (req: { params: { id: any; }; }, res: { render: (arg0: string, {}) => any; }) => res.render('user_info', { pageTitle: 'User Info', userId: req.params.id });
export const edit = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('user_edit', { pageTitle: 'User Edit' });
export const signUp = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('user_signup', { pageTitle: 'Join' });
export const signIn = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('user_signin', { pageTitle: 'Login' });
export const signOut = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('user_signout', { pageTitle: 'Logout' });