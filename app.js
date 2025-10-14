var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { expressjwt: jwt } = require('express-jwt');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

var indexRouter = require('./routes/index');
var goalsRouter = require('./routes/goals');
var accountsRouter = require('./routes/accounts');


var app = express();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'; 

// CLAVE DE DEBUG: Agrega esta línea
console.log(`CORS ORIGIN CONFIGURADO A: ${frontendURL}`); 

const corsOptions = {
    origin: frontendURL, // ¡Usando la variable!
    optionsSuccessStatus: 200,
    credentials: true, // Si usas cookies o sesiones
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(logger('dev'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  jwt({
    secret: "secret",
    algorithms: ["HS256"],
  }).unless({ 
      path: ["/api/signup", "/api/login"],
      method: 'OPTIONS' // <-- CLAVE: Ignorar peticiones OPTIONS
  })
);

app.use('/', indexRouter);
app.use('/api/goals', goalsRouter);
app.use('/api', accountsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ error: 'Server Error', message: err.message, details: res.locals.error });
});

module.exports = app;
