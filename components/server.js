require('./conn');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const uploadLogin = require('./Login');
const Farm = require('./Farm');
const Variety = require('./Variety');
const Plot = require('./Plot');
const Category = require('./Category'); 
const Product = require('./Product');
const Irrigationsr = require('./Irrigationsr');
const Job = require('./Job');
const DailyEntry = require('./DailyEntry');
const Vehicle = require('./Vehicle');


const PORT = process.env.PORT || 3000;

app.use(express.json());



 app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API...' })
  })

  app.post("/login", async (req,res)=>{
    console.log(req.body);
    const user = new uploadLogin(req.body);
     await  user.save().then(()=>{
      res.status(201).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    })
  
  })

  app.get("/login", async (req,res)=>{
   
    try{ const user1 = await uploadLogin.find().sort({_id:-1});
     
       res.status(201).send(user1);
   }catch(e){
       res.status(400).send(e);
     }
   
   });

  
app.delete("/login/:id", async (req, res)=>{
  try{

    const user = await uploadLogin.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("Data not found");
    }

if(!req.params.id){
      res.status(201).send();
    }
  }catch(e){
     res.status(400).send(e);
  }
})


app.patch("/login/:id", async (req, res)=>{
    try{
      const _id = req.params.id;
      const updateCategory = await uploadLogin.findByIdAndUpdate(_id, req.body,{
      new: true
      });
      res.send(updateCategory);
    }
    catch(e)
    {
      res.status(400).send(e);  
    }
  });

  app.get('/farm', async (req, res) => {
    try {
      const farms = await Farm.find();
      res.json(farms);
    } catch (error) {
      console.error('Error fetching farms', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // GET farm by email
  app.get('/farm/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const farms = await Farm.find({ email: email });
      res.json(farms);
    } catch (error) {
      console.error('Error fetching farm', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // POST create farm
  app.post('/farm', async (req, res) => {
    try {
      const { email, farm, date } = req.body;
      const newFarm = new Farm({ email, farm, date });
      await newFarm.save();
      res.status(201).json(newFarm);
    } catch (error) {
      console.error('Error creating farm', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // DELETE farm
  app.delete('/farm', async (req, res) => {
    try {
      const { farm } = req.body;
      const deletedFarm = await Farm.findOneAndDelete(farm);
      if (!deletedFarm) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.json({ message: 'Record deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting farm', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/variety', async (req, res) => {
    try {
      const varieties = await Variety.find();
      res.json(varieties);
    } catch (error) {
      console.error('Error fetching varieties', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // GET variety by email
  app.get('/variety/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const varieties = await Variety.find({ email: email });
      res.json(varieties);
    } catch (error) {
      console.error('Error fetching variety', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // POST create variety
  app.post('/variety', async (req, res) => {
    try {
      const { email, variety, date } = req.body;
      const newVariety = new Variety({ email, variety, date });
      await newVariety.save();
      res.status(201).json(newVariety);
    } catch (error) {
      console.error('Error creating variety', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // DELETE variety
  app.delete('/variety/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedVariety = await Variety.findByIdAndDelete(id);
      if (!deletedVariety) {
        res.status(404).json({ message: 'Record not found' });
      } else {
        res.json({ message: 'Record deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting variety', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.get('/plot', async (req, res) => {
  try {
    const plots = await Plot.find();
    res.json(plots);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/plot/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const plots = await Plot.find({ email: email });
    res.json(plots);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/plot/:email/:farm/:block/:plot', async (req, res) => {
  try {
    const { email, farm, block, plot } = req.params;
    const plots = await Plot.findOne({ email: email, farm: farm, block: block, plot: plot });
    res.json(plot);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/plot', async (req, res) => {
  try {
    const { farm, block, plot, area, season, rowspace, variety, email, date } = req.body;
    const newPlot = new Plot({ farm, block, plot, area, season, rowspace, variety, email, date });
    await newPlot.save();
    res.json(newPlot);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/plot/:email/:block/:plot', async (req, res) => {
  try {
    const { email, block, plot } = req.params;
    const deletedPlot = await Plot.findOneAndDelete({ email: email, block: block, plot: plot });
    if (!deletedPlot) {
      res.status(404).json({ message: 'Record not found' });
    } else {
      res.json({ message: 'Record deleted successfully' });
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/plot', async (req, res) => {
  try {
    const { farm, block, plot, area, season, rowspace, variety, email } = req.body;
    const updatedPlot = await Plot.findOneAndUpdate(
      { email: email, farm: farm, block: block, plot: plot },
      { $set: { area: area, season: season, rowspace: rowspace, variety: variety } },
      { new: true }
    );
    res.json(updatedPlot);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});


// GET all categories
app.get('/category', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET categories by email
app.get('/category/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const categories = await Category.find({ email: email });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories by email', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create category
app.post('/category', async (req, res) => {
  try {
    const { email, category, date } = req.body;
    const newCategory = new Category({ email, category, date });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE category
app.delete('/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting category', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create product
app.post('/product', async (req, res) => {
  try {
    const { email, category, product, qty, unit, date } = req.body;
    const newProduct = new Product({ email, category, product, qty, unit, date });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/implements', async (req, res) => {
  try {
    const implementsList = await Implements.find();
    res.json(implementsList);
  } catch (error) {
    console.error('Error fetching implements', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET implements by email
app.get('/implements/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const implementsList = await Implements.find({ email: email });
    res.json(implementsList);
  } catch (error) {
    console.error('Error fetching implements by email', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create implement
app.post('/implements', async (req, res) => {
  try {
    const { id, email, name, date, stageid, stage } = req.body;
    const newImplement = new Implements({ id, email, name, date, stageid, stage });
    await newImplement.save();
    res.status(201).json(newImplement);
  } catch (error) {
    console.error('Error creating implement', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE implement
app.delete('/implements/:email/:name/:id', async (req, res) => {
  try {
    const { email, name, id } = req.params;
    const deletedImplement = await Implements.findOneAndDelete({ email: email, name: name, id: id });
    if (!deletedImplement) {
      res.status(404).json({ message: 'Implement not found' });
    } else {
      res.json({ message: 'Implement deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting implement', error);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH update implement
app.patch('/implements', async (req, res) => {
  try {
    const { id, email, name } = req.body;
    const updatedImplement = await Implements.findOneAndUpdate(
      { email: email, id: id },
      { $set: { name: name } },
      { new: true }
    );
    res.json(updatedImplement);
  } catch (error) {
    console.error('Error updating implement', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/irrigationsr', async (req, res) => {
  try {
    const irrigationsrList = await Irrigationsr.find();
    res.json(irrigationsrList);
  } catch (error) {
    console.error('Error fetching irrigationsr', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET irrigationsr by email
app.get('/irrigationsr/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const irrigationsrList = await Irrigationsr.find({ email: email });
    res.json(irrigationsrList);
  } catch (error) {
    console.error('Error fetching irrigationsr by email', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create irrigationsr
app.post('/irrigationsr', async (req, res) => {
  try {
    const { id, email, source, date } = req.body;
    const newIrrigationsr = new Irrigationsr({ id, email, source, date });
    await newIrrigationsr.save();
    res.status(201).json(newIrrigationsr);
  } catch (error) {
    console.error('Error creating irrigationsr', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE irrigationsr
app.delete('/irrigationsr/:email/:source/:id', async (req, res) => {
  try {
    const { email, source, id } = req.params;
    const deletedIrrigationsr = await Irrigationsr.findOneAndDelete({ email: email, source: source, id: id });
    if (!deletedIrrigationsr) {
      res.status(404).json({ message: 'Irrigationsr not found' });
    } else {
      res.json({ message: 'Irrigationsr deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting irrigationsr', error);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH update irrigationsr
app.patch('/irrigationsr', async (req, res) => {
  try {
    const { id, email, source } = req.body;
    const updatedIrrigationsr = await Irrigationsr.findOneAndUpdate(
      { email: email, id: id },
      { $set: { source: source } },
      { new: true }
    );
    res.json(updatedIrrigationsr);
  } catch (error) {
    console.error('Error updating irrigationsr', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET all job
app.get('/job', async (req, res) => {
  try {
    const jobList = await Job.find();
    res.json(jobList);
  } catch (error) {
    console.error('Error fetching job', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET job by email
app.get('/job/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const jobList = await Job.find({ email: email });
    res.json(jobList);
  } catch (error) {
    console.error('Error fetching job by email', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/job', async (req, res) => {
  try {
    const { email, job, date } = req.body;
    const newJob = new Job({ email, job, date });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating irrigationsr', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/dailyentry/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const entries = await DailyEntry.find({ email: email });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching daily entries', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create daily entry
app.post('/dailyentry', async (req, res) => {
  try {
    const { id, farm, plot, area, stage, type, deal, time, mean, fuel, person, quantity, moga, units, email, date } = req.body;
    const newEntry = new DailyEntry({ id, farm, plot, area, stage, type, deal, time, mean, fuel, person, quantity, moga, units, email, date });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error creating daily entry', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE daily entry
app.delete('/dailyentry/:email/:plot/:id/:stage', async (req, res) => {
  try {
    const { email, plot, id, stage } = req.params;
    const deletedEntry = await DailyEntry.findOneAndDelete({ email: email, plot: plot, id: id, stage: stage });
    if (!deletedEntry) {
      res.status(404).json({ message: 'Entry not found' });
    } else {
      res.json({ message: 'Entry deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting daily entry', error);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH update daily entry
app.patch('/dailyentry', async (req, res) => {
  try {
    const { email, plot, id, stage } = req.body;
    const updatedEntry = await DailyEntry.findOneAndUpdate(
      { email: email, plot: plot, id: id, stage: stage },
      { $set: req.body }, // Update with the entire body
      { new: true } // Return the updated document
    );
    res.json(updatedEntry);
  } catch (error) {
    console.error('Error updating daily entry', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/vehicle', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET vehicles by email
app.get('/vehicle/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const vehicles = await Vehicle.find({ email: email });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles by email', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST create vehicle
app.post('/vehicle', async (req, res) => {
  try {
    const { email, vehicle, date } = req.body;
    const newVehicle = new Vehicle({ email, vehicle, date });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Error creating vehicle', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE vehicle
app.delete('/vehicle', async (req, res) => {
  try {
    const { email, vehicle } = req.body;
    const deletedVehicle = await Vehicle.findOneAndDelete({ email: email, vehicle: vehicle });
    if (!deletedVehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
    } else {
      res.json({ message: 'Vehicle deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting vehicle', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });