import {
  addMovie,
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
  type TMovie,
} from '../db';

// queries
export const home = (req: any, res: { render: (arg0: string, {}) => any; }) => {
  const movies = getMovies();
  return res.render('movie_list', { pageTitle: 'Movies!', movies });
};
export const detail = (req: { params: { id: any; }}, res: { render: (arg0: string, {}) => any; }) => {
  const movie = getMovieById(req.params.id);
  return res.render('movie_detail', { pageTitle: movie.title, movie });
};
export const filter = (req: any, res: { render: (arg0: string, {}) => any; }) => {
  const year = req.query.year;
  if (year) {
    const movies = getMovieByMinimumYear(year);
    return res.render('movie_list', {
      pageTitle: `Filter by year: ${year}`,
      movies,
    });
  }
  const rating = req.query.rating;
  if (rating) {
    const movies = getMovieByMinimumRating(rating);
    return res.render('movie_list', {
      pageTitle: `Filter by rating: ${rating}`,
      movies,
    });
  }
};

// mutations
export const getAdd = (req: any, res: { render: (arg0: string, {}) => any; }) => {
  return res.render('movie_add', { pageTitle: 'Add Movie' });
};
export const postAdd = (req: any, res: { redirect: (arg0: string) => any; }) => {
  const { title, synopsis, genres } = req.body;
  addMovie({ title, synopsis, genres: genres.split(',') });
  return res.redirect('/');
};
export const getEdit = (req: any, res: { render: (arg0: string, {}) => any; }) => {
  return res.render('movie_edit', { pageTitle: 'Edit Movie' });
};
export const postEdit = (req: any, res: { status: (code: number) => any; redirect: (arg0: string) => any; }) => {
  const { id } = req.params;
  if (!getMovieById(id)) {
    return res.status(404).send('Movie not found');
  }
  const { title } = req.body;
  getMovies().map((movie: TMovie) => {
    if (movie.id === parseInt(id, 10)) {
      return { ...movie, title };
    }
    return movie;
  });
  return res.redirect('/movies');
};
