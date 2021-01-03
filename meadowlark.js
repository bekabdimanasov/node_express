const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)

// Установка механизма представления handlebars
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Промежуточное ПО static
app.use(express.static(__dirname + '/public'))

// Пользовательская страница Home Page
app.get('/', function(req, res) {
  res.render('home')
})

const fortune = require('./lib/fortune.js')
// Пользовательская страница About Page
app.get('/about', function(req, res) {
  res.render('about', {fortune: fortune.getFortune()})
})

// Пользовательская страница 404 (промежуточное ПО)
app.use(function(req, res) {
  res.status(404)
  res.render('404')
})

// Пользовательская страница 500 (промежуточное ПО)
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  res.render('505')
})

app.listen(app.get('port'), function() {
  console.log('Express запущен на http://localhost:' + app.get('port') + '; нажмите Ctrl+C для заверщения.')
})