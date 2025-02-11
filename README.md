## Installation


Clone the repo:

```bash
git clone --depth 1 https://github.com/lilhamad/event-booking-api.git
npx rimraf ./.git
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env



# open .env and modify the environment variables (if needed)
```

Running locally:

```bash
yarn dev
```

Migrating to db:

```bash
npx sequelize db:migrate
```

Seeding db:

```bash
npx sequelize db:seed:all
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch


## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# DATABSE
DATABASE=sqlite
PORT=80

# ENVIRONMENT
NODE_ENV=development

# PORT
PORT=80

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
 |--app.js          # Application/Node Js Stuff
 |--server.js        # App entry point , Express related Stuff
```

### API Endpoints

List of available routes:

**Event routes**:\
`POST api/v1/initialize` - create an event\
`POST api/v1/book` - book an event\
`POST api/v1/cancel` - cancel an event\
`GET /status/:eventId` - viewevent info\

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

Race condition is handles using sequelize transaction to make sure
a unit is locked when change is happening for data integrity and to make sure change in the database either happens fully or doesn’t happen

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

