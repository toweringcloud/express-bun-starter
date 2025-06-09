export const home = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('home', { pageTitle: 'Home'});
export const info = (req: { params: { id: any; }; }, res: { render: (arg0: string, {}) => any; }) => res.render('story_info', { pageTitle: 'Story Info', storyId: req.params.id });
export const edit = (req: { params: { id: any; }; }, res: { render: (arg0: string, {}) => any; }) => res.render('story_edit', { pageTitle: 'Story Edit', storyId: req.params.id });
export const remove = (req: { params: { id: any; }; }, res: { render: (arg0: string, {}) => any; }) => res.render('story_remove', { pageTitle: 'Story Remove', storyId: req.params.id });
export const trending = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('story_trending', { pageTitle: 'Trending Stories' });
export const newStory = (_req: any, res: { render: (arg0: string, {}) => any; }) => res.render('story_new', { pageTitle: 'New Story' });