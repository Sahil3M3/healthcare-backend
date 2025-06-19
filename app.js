const express=require("express");
const { sequelize } = require('./models/index');
const authRoutes=require('./routes/authRoutes')
const patientRoutes=require("./routes/patientRoutes")
const doctorRoutes = require('./routes/doctorRoutes');

const PORT = process.env.PORT || 5000;
const app=express();


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);


sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});