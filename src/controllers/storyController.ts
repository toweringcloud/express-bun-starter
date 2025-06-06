export const info = (req: { params: { id: any; }; }, res: { send: (arg0: string) => any; }) => res.send(`<h1>Story Info: ${req.params.id}</h1>`);
export const edit = (req: { params: { id: any; }; }, res: { send: (arg0: string) => any; }) => res.send(`<h1>Story Edit: ${req.params.id}</h1>`);
export const remove = (req: { params: { id: any; }; }, res: { send: (arg0: string) => any; }) => res.send(`<h1>Story Remove: ${req.params.id}</h1>`);
export const trending = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>Trending Story</h1>');
export const newStory = (_req: any, res: { send: (arg0: string) => any; }) => res.send('<h1>New Story</h1>');