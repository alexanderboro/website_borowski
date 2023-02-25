import express from "express";
import { logger } from './middlewares/logger.js'



const app = express ()
const PORT = 3000

const cookieString = [
  "Chocolate Chip",
  "Banana",
  "Strawberry"
]

app.set('view engine', 'ejs')
app.use('/assets', express.static('public'))
app.use(logger)
app.use(express.urlencoded({ extended: true }))


app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`)
})

app.get('/', (request, response) => {
  const numberOfCookiesInStock = 40
  response.render('index', {
    nameOfThePage: "Cookieshop",
    numberOfCookiesInStock: numberOfCookiesInStock,
    numberOfCookiesSold: 3283
  })
})

// About 
app.get('/about', (request, response) => {
  const number1 = 5
  const number2 = 10
  const average = (number1 + number2) / 2
  response.send(`The average of ${number1} and ${number2} is ${average}`)
})

app.post('/about', (request, repsonse) => {
  response.send("Thanks.")
  })

// Contact
app.get('/contact', (request, response) => {
  const number1 = 5
  const number2 = 10
  const average = (number1 + number2) / 2
  response.send(`The average of ${number1} and ${number2} is ${average}`)
})


app.post('/contact', (request, response) => {
  console.log('Contact form submission: ', request.body)
  response.send('Thank you for your message. We will be in touch soon.')
})

// Search
app.get('/search', (request, response) => {
  console.log(request.query)
})

// Cookies
app.get('/cookies', (request, response) => {
  console.log("Hey Alex")
})