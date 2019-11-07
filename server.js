const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const path = require('path')
var cors = require('cors')
const users = require("./routes/api/users")
const payment = require("./routes/api/payment")
const store = require("./routes/api/store")
const account = require("./routes/api/account")
const images = require("./routes/api/images")
const company = require("./routes/api/company")
const employee = require("./routes/api/employee")
const salesform = require("./routes/api/salesform")
const orders = require("./routes/api/orders")

require("dotenv").config()

const app = express();

const publicOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: "GET"
}


app.use(cors())
app.use('/public', cors(publicOptions))
// Bodyparser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// DB Config
const db = process.env.MONGODB_URI || require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { 
      useCreateIndex: true,
      useNewUrlParser: true 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/payment", payment)
app.use("/api/store", store)
app.use("/api/account", account)
app.use("/api/images", images)
app.use("/api/company", company)
app.use("/api/employee", employee)
app.use("/api/salesform", salesform)
app.use("/api/orders", orders)

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')))


const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
  app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
