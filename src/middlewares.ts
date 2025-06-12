export const localsMiddleware = (req: any, res: any, next: any) => {
  res.locals.siteTitle = 'Nomad Movies';
  next();
};
