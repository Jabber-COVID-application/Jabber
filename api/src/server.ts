import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import StatsRoute from './routes/stats.route';
import VenuesRoute from './routes/venues.route';
import VisitsRoute from './routes/visits.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new StatsRoute(),
  new VenuesRoute(),
  new VisitsRoute(),
]);

app.listen();
