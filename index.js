const express = require('express');
const path = require('path');
const { shopRouter } = require('./routes/shopRoutes.js')
const { mainRouter } = require('./routes/mainRoutes.js')
const { adminRouter } = require('./routes/adminRoutes.js')
const { authRouter } = require('./routes/authRoutes.js')

//const { adminRouter } = require('./routes/admin.routes.js')

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')


// Configuro las vistas para conectar el controller con la carpeta view.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.static(path.join(__dirname, 'public'), {extensions: ['html']}  ) );

// agrego el cors y express json. 
app.use(cors())
app.use(express.json());

app.use('/', mainRouter)
app.use('/shop', shopRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

//app.use('/admin', adminRouter)

app.use((req, res) => {
	res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

