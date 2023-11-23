const User = require('./models/User')
const Curent = require('./models/Curent')
const Role = require('./models/Role')
const Elev = require('./models/Elev')
const Elev2 = require('./models/Elev2')
const ElevM1 = require('./models/ElevMed1')
const ElevM2 = require('./models/ElevMed2')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
} 

class authController{
    async registration(req, res){ 
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) { 
                return res.status(400).json({message: "A user with the same name already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: "User successfully registered !!!"})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Reg eror'})
        }

    }
    
    async login(req, res){
        try {
          //delet user at previeus sesion
            await Curent.deleteMany();
            const {username, password} = req.body
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const userC = new Curent({username, password: hashPassword, roles: [userRole.value]})
            await userC.save()
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Wrong password entered`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Login eror'})

        }
    }

    async getUsers(req, res){
      try {
            const users = await Curent.findOne()
            res.json(users)
            res.json("server user")
        } catch (e) {
            console.log(e)
        }
    }


    async getCurent (req, res)  {
      try {
        const { username: selectedClass } = req.query;
        let query = {};
      
        if (selectedClass) {
          query.Class = selectedClass;
        }
      
        // Assuming you have a data source or database
        // Retrieve the students based on the selected class
        const students = await Curent.find(query);

        if (students.length > 0) {
          res.status(200).json(students); // Return the students data as JSON response
        } else {
          res.status(404).json({ message: 'No students found' });
        }
      } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Failed to retrieve user' });
      }
    };

    async ClearDB (req, res) {
      try {
        const students = await Elev.find();
        for (const student of students) {
          if (student.Class < 9) {
            student.Class += 1;
            student.Romana = null;
            student.Engleza = null;
            student.Rusa = null;
            student.Mate = null;
            student.Istoria = null;
            student.Geografia = null;
            student.Biologia = null;
            student.Fizica = null;
            student.Ed_Fiz = null;
            student.Tehnologica = null;
            student.Muzica = null;
            student.Plastica = null;
            student.MSV = null;
            student.Chimia = null;
            student.Info = null;
            student.Stiinte = null;
            student.Optional = null;
            await student.save();
          } else if (student.Class === 9) {
            await Elev.deleteOne(student);
          }
        }
    
        const students2 = await Elev2.find();
        for (const student of students2) {
          if (student.Class < 9) {
            student.Class += 1;
            student.Romana = null;
            student.Engleza = null;
            student.Rusa = null;
            student.Mate = null;
            student.Istoria = null;
            student.Geografia = null;
            student.Biologia = null;
            student.Fizica = null;
            student.Ed_Fiz = null;
            student.Tehnologica = null;
            student.Muzica = null;
            student.Plastica = null;
            student.MSV = null;
            student.Chimia = null;
            student.Info = null;
            student.Stiinte = null;
            student.Optional = null;
            await student.save();
          } else if (student.Class === 9) {
            await Elev2.deleteOne(student);
          }
        }
    
        const studentsM1 = await ElevM1.find();
        for (const student of studentsM1) {
          if (student.Class < 9) {
            student.Class += 1;
            student.Romana = null;
            student.Engleza = null;
            student.Rusa = null;
            student.Mate = null;
            student.Istoria = null;
            student.Geografia = null;
            student.Biologia = null;
            student.Fizica = null;
            student.Ed_Fiz = null;
            student.Tehnologica = null;
            student.Muzica = null;
            student.Plastica = null;
            student.MSV = null;
            student.Chimia = null;
            student.Info = null;
            student.Stiinte = null;
            student.Optional = null;
            await student.save();
          } else if (student.Class === 9) {
            await ElevM1.deleteOne(student);
          }
        }
    
        const studentsM2 = await ElevM2.find();
        for (const student of studentsM2) {
          if (student.Class < 9) {
            student.Class += 1;
            student.Romana = null;
            student.Engleza = null;
            student.Rusa = null;
            student.Mate = null;
            student.Istoria = null;
            student.Geografia = null;
            student.Biologia = null;
            student.Fizica = null;
            student.Ed_Fiz = null;
            student.Tehnologica = null;
            student.Muzica = null;
            student.Plastica = null;
            student.MSV = null;
            student.Chimia = null;
            student.Info = null;
            student.Stiinte = null;
            student.Optional = null;
            await student.save();
          } else if (student.Class === 9) {
            await ElevM2.deleteOne(student);
          }
        }
        console.log("ok");
        res.json({ message: 'Database cleared successfully' });
      } catch (error) {
        console.error('Error clearing database:', error);
        res.status(500).json({ error: 'Server error' });
      }
    };
    

    //   ------------------------------------------------------------
   async addstudent (req, res) {
    try {
        const {IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Tehnologica, Muzica, Plastica, MSV, Ed_Fiz, Stiinte, Engleza, Biologia, Rusa, Optional } = req.body;
                  const existingStudent = await Elev.findOne({IDNP});
                  if (existingStudent) {
                    return res.status(400).json({ error: 'Student '+`${Name+' '+Surname}` +' with idnp '+ `${IDNP}` + ' already exists '  });
                  }
                  const student = new Elev({IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Tehnologica, Muzica, Plastica, MSV, Ed_Fiz, Stiinte, Engleza, Biologia, Rusa, Optional});
                  await student.save();
                  return res.json({message: "Elev succes aded !!!"})
    }catch (error) {
        console.error('Error adding student:', error);
    }
  };
 

  async addMed(req, res) {
    async function GetMedia(str) {
      if (!str) {
        return 0; 
      }
      let numberPattern = /\d+/g; 
      let numbers = str.match(numberPattern); 
      let sum = 0;

      if (numbers) {
        for (var i = 0; i < numbers.length; i++) {
          sum += parseInt(numbers[i]); // Convert each number to an integer and add to the sum
        }
        sum /= i; // Calculate the average
        sum = sum.toString();
        sum = sum.slice(0, (sum.indexOf(".")) + 2 + 1);
      }
      return sum;
    }
    
    try {
      const oldStudents = await Elev.find(); // Get all students from the old database
      
      if (!oldStudents || oldStudents.length === 0) {
        return res.status(404).json({ message: 'No students found in the old database' });
      }
      
      for (const oldStudent of oldStudents) {
        const existingStudent = await ElevM1.findOne({ IDNP: oldStudent.IDNP }); // Check if student already exists in the new database

      if (existingStudent) {
        existingStudent.Name = oldStudent.Name;
        existingStudent.Surname = oldStudent.Surname;
        existingStudent.Class = oldStudent.Class;
        existingStudent.Romana = await GetMedia(oldStudent.Romana);
        existingStudent.Mate = await GetMedia(oldStudent.Mate);
        existingStudent.Info = await GetMedia(oldStudent.Info);
        existingStudent.Istoria = await GetMedia(oldStudent.Istoria);
        existingStudent.Geografia = await GetMedia(oldStudent.Geografia);
        existingStudent.Chimia = await GetMedia(oldStudent.Chimia);
        existingStudent.Fizica = await GetMedia(oldStudent.Fizica);
        existingStudent.Ed_Fiz = await GetMedia(oldStudent.Ed_Fiz);
        existingStudent.Tehnologica = await GetMedia(oldStudent.Tehnologica);
        existingStudent.Muzica = await GetMedia(oldStudent.Muzica);
        existingStudent.Plastica = await GetMedia(oldStudent.Plastica);
        existingStudent.MSV = await GetMedia(oldStudent.MSV);
        existingStudent.Stiinte = await GetMedia(oldStudent.Stiinte);
        existingStudent.Engleza = await GetMedia(oldStudent.Engleza);
        existingStudent.Biologia = await GetMedia(oldStudent.Biologia);
        existingStudent.Rusa = await GetMedia(oldStudent.Rusa);
        existingStudent.Optional = await GetMedia(oldStudent.Optional);

        await existingStudent.save();
        console.log(`Student with IDNP ${oldStudent.IDNP} updated in the new database.`);

      }else{
        const romanaMedia = await GetMedia(oldStudent.Romana);
        const mateMedia = await GetMedia(oldStudent.Mate);
        const infoMedia = await GetMedia(oldStudent.Info);
        const istoriaMedia = await GetMedia(oldStudent.Istoria);
        const geografiaMedia = await GetMedia(oldStudent.Geografia);
        const chimiaMedia = await GetMedia(oldStudent.Chimia);
        const fizicaMedia = await GetMedia(oldStudent.Fizica);
        const Ed_FizMedia = await GetMedia(oldStudent.Ed_Fiz);
        const TehnologicaMedia = await GetMedia(oldStudent.Tehnologica);
        const MuzicaMedia = await GetMedia(oldStudent.Muzica);
        const PlasticaMedia = await GetMedia(oldStudent.Plastica);
        const MSVMedia = await GetMedia(oldStudent.MSV);
        const edFizMedia = await GetMedia(oldStudent.Ed_Fiz);
        const francezaMedia = await GetMedia(oldStudent.Stiinte);
        const englezaMedia = await GetMedia(oldStudent.Engleza);
        const biologiaMedia = await GetMedia(oldStudent.Biologia);
        const rusaMedia = await GetMedia(oldStudent.Rusa);
        const OptMedia = await GetMedia(oldStudent.Optional);

        const newElev = new ElevM1({
          IDNP: oldStudent.IDNP,
          Name: oldStudent.Name,
          Surname: oldStudent.Surname,
          Class: oldStudent.Class,
          Romana: romanaMedia,
          Mate: mateMedia,
          Info: infoMedia,
          Istoria: istoriaMedia,
          Geografia: geografiaMedia,
          Chimia: chimiaMedia,
          Fizica: fizicaMedia,
          Ed_Fiz: edFizMedia,
          Tehnologica: TehnologicaMedia,
          Muzica: MuzicaMedia,
          Plastica: PlasticaMedia,
          MSV: MSVMedia,
          Stiinte: francezaMedia,
          Engleza: englezaMedia,
          Biologia: biologiaMedia,
          Rusa: rusaMedia,
          Optional: OptMedia
        });

        await newElev.save();
        console.log(`Student with IDNP ${oldStudent.IDNP} added to the new database.`);
        }
      }
      return res.json({ message: "Students successfully copied to the new database!" });
    } catch (error) {
      console.error('Error copying students:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
 
  async postElev(req, res) {
    try {
      const { idnp } = req.params;
      const { Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Ed_Fiz, Tehnologica, Muzica, Plastica, MSV, Stiinte, Engleza, Biologia, Rusa, Optional } = req.body;
  
      const existingStudent = await Elev.findOne({ IDNP: idnp });
  
      if (!existingStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      existingStudent.Name = Name;
      existingStudent.Surname = Surname;
      existingStudent.Class = Class;
      existingStudent.Romana = Romana;
      existingStudent.Mate = Mate;
      existingStudent.Info = Info;
      existingStudent.Istoria = Istoria;
      existingStudent.Geografia = Geografia;
      existingStudent.Chimia = Chimia;
      existingStudent.Fizica = Fizica;
      existingStudent.Ed_Fiz = Ed_Fiz;
      existingStudent.Tehnologica = Tehnologica;
      existingStudent.Muzica = Muzica;
      existingStudent.Plastica = Plastica;
      existingStudent.MSV = MSV;
      existingStudent.Stiinte = Stiinte;
      existingStudent.Engleza = Engleza;
      existingStudent.Biologia = Biologia;
      existingStudent.Rusa = Rusa;
      existingStudent.Optional = Optional;
      
      const updatedStudent = await existingStudent.save();
  
      return res.status(200).json(updatedStudent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }


  async getElevi(req, res){
    try {
        const users = await Elev.find()
        res.json(users)
    } catch (e) {
        console.log(e)
        }
    }
  
    async getElev(req, res){
    try {
    const {idnp} = req.params;
              const existingStudent = await Elev.findOne({IDNP: idnp});
            if (existingStudent) {
                return res.status(200).json(existingStudent);
                  }
            else {
                return res.status(404).json({ message: 'Student not found' });
              }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Server error' });
        }
    }
    
    async deleteElev(req, res) {
        try {
          const { idnp } = req.params;
      
          const existingStudent = await Elev.findOne({ IDNP: idnp });
      
          if (!existingStudent) {
            return res.status(404).json({ message: 'Elev not found' });
          }
      
          await Elev.deleteOne(existingStudent);
      
          return res.status(200).json({ message: 'Elev deleted successfully' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Server error' });
        }
      }
      
      async getClass(req, res) {
      try {
        const { class: selectedClass } = req.query;
        let query = {};
      
        if (selectedClass) {
          query.Class = selectedClass;
        }
      
        // Assuming you have a data source or database
        // Retrieve the students based on the selected class
        const students = await Elev.find(query);

        if (students.length > 0) {
          res.status(200).json(students); // Return the students data as JSON response
        } else {
          res.status(404).json({ message: 'No students found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      };

      async getClassMed1(req, res) {
      try {
        const { class: selectedClass } = req.query;
        let query = {};
      
        if (selectedClass) {
          query.Class = selectedClass;
        }
        const students = await ElevM1.find(query);

        if (students.length > 0) {
          res.status(200).json(students);
        } else {
          res.status(404).json({ message: 'No students found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      };


// ----------------------------------------------------------------------------------------------------------sem2
async addstudent2 (req, res) {
  try {
      const {IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Ed_Fiz, Tehnologica, Muzica, Plastica, MSV, Stiinte, Engleza, Biologia, Rusa, Optional } = req.body;
                const existingStudent = await Elev2.findOne({IDNP});
                if (existingStudent) {
                  return res.status(400).json({ error: 'Student '+`${Name+' '+Surname}` +' with idnp '+ `${IDNP}` + ' already exists '  });
                }
                const student = new Elev2({IDNP, Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Ed_Fiz, Tehnologica, Muzica, Plastica, MSV, Stiinte, Engleza, Biologia, Rusa, Optional});
                await student.save();
                return res.json({message: "Elev succes aded !!!"})
  }catch (error) {
      console.error('Error adding student:', error);
  }
};

async postElev2(req, res) {
  try {
    const { idnp } = req.params;
    const { Name, Surname, Class, Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Ed_Fiz, Tehnologica, Muzica, Plastica, MSV, Stiinte, Engleza, Biologia, Rusa, Optional } = req.body;

    const existingStudent = await Elev2.findOne({ IDNP: idnp });

    if (!existingStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    existingStudent.Name = Name;
    existingStudent.Surname = Surname;
    existingStudent.Class = Class;
    existingStudent.Romana = Romana;
    existingStudent.Mate = Mate;
    existingStudent.Info = Info;
    existingStudent.Istoria = Istoria;
    existingStudent.Geografia = Geografia;
    existingStudent.Chimia = Chimia;
    existingStudent.Fizica = Fizica;
    existingStudent.Tehnologica = Tehnologica;
    existingStudent.Muzica = Muzica;
    existingStudent.Plastica = Plastica;
    existingStudent.MSV = MSV;
    existingStudent.Ed_Fiz = Ed_Fiz;
    existingStudent.Stiinte = Stiinte;
    existingStudent.Engleza = Engleza;
    existingStudent.Biologia = Biologia;
    existingStudent.Rusa = Rusa;
    existingStudent.Optional = Optional;
    
    // Romana, Mate, Info, Istoria, Geografia, Chimia, Fizica, Ed_Fiz, Stiinte, Engleza, Bio, Rusa

    const updatedStudent = await existingStudent.save();

    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}


async getElevi2(req, res){
  try {
      const users = await Elev2.find()
      res.json(users)
  } catch (e) {
      console.log(e)
      }
  }

  async getElev2(req, res){
  try {
  const {idnp} = req.params;
            const existingStudent = await Elev2.findOne({IDNP: idnp});
          if (existingStudent) {
              return res.status(200).json(existingStudent);
                }
          else {
              return res.status(404).json({ message: 'Student not found' });
            }
  } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Server error' });
      }
  }
  
  async deleteElev2(req, res) {
      try {
        const { idnp } = req.params;
    
        const existingStudent = await Elev2.findOne({ IDNP: idnp });
    
        if (!existingStudent) {
          return res.status(404).json({ message: 'Elev not found' });
        }
    
        await Elev2.deleteOne(existingStudent);
    
        return res.status(200).json({ message: 'Elev deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    }
    
    async getClass2(req, res) {
    try {
      const { class: selectedClass } = req.query;
      let query = {};
    
      if (selectedClass) {
        query.Class = selectedClass;
      }
    
      // Assuming you have a data source or database
      // Retrieve the students based on the selected class
      const students = await Elev2.find(query);

      if (students.length > 0) {
        res.status(200).json(students); // Return the students data as JSON response
      } else {
        res.status(404).json({ message: 'No students found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
    };

    async getClassMed2(req, res) {
    try {
      const { class: selectedClass } = req.query;
      let query = {};
    
      if (selectedClass) {
        query.Class = selectedClass;
      }
      const students = await ElevM2.find(query);

      if (students.length > 0) {
        res.status(200).json(students); // Return the students data as JSON response
      } else {
        res.status(404).json({ message: 'No students found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
    };

    async addMed2 (req, res) {
   
      async function GetMedia(str) {
        if (!str) {
          return 0; 
        }
        let numberPattern = /\d+/g; 
        let numbers = str.match(numberPattern);
        let sum = 0;

        if (numbers) {
          for (var i = 0; i < numbers.length; i++) {
            sum += parseInt(numbers[i]); 
          }
          sum /= i;
          sum = sum.toString();
          sum = sum.slice(0, (sum.indexOf(".")) + 2 + 1);
        }
        return sum;
        
      }
      
      try {
        const oldStudents = await Elev2.find(); 
        
        if (!oldStudents || oldStudents.length === 0) {
          return res.status(404).json({ message: 'No students found in the old database' });
        }
        
        for (const oldStudent of oldStudents) {
          const existingStudent = await ElevM2.findOne({ IDNP: oldStudent.IDNP }); // Check if student already exists in the new database
  
        if (existingStudent) {
          existingStudent.Name = oldStudent.Name;
          existingStudent.Surname = oldStudent.Surname;
          existingStudent.Class = oldStudent.Class;
          existingStudent.Romana = await GetMedia(oldStudent.Romana);
          existingStudent.Mate = await GetMedia(oldStudent.Mate);
          existingStudent.Info = await GetMedia(oldStudent.Info);
          existingStudent.Istoria = await GetMedia(oldStudent.Istoria);
          existingStudent.Geografia = await GetMedia(oldStudent.Geografia);
          existingStudent.Chimia = await GetMedia(oldStudent.Chimia);
          existingStudent.Fizica = await GetMedia(oldStudent.Fizica);
          existingStudent.Tehnologica = await GetMedia(oldStudent.Tehnologica);
          existingStudent.Muzica = await GetMedia(oldStudent.Muzica);
          existingStudent.Plastica = await GetMedia(oldStudent.Plastica);
          existingStudent.MSV = await GetMedia(oldStudent.MSV);
          existingStudent.Ed_Fiz = await GetMedia(oldStudent.Ed_Fiz);
          existingStudent.Stiinte = await GetMedia(oldStudent.Stiinte);
          existingStudent.Engleza = await GetMedia(oldStudent.Engleza);
          existingStudent.Biologia = await GetMedia(oldStudent.Biologia);
          existingStudent.Rusa = await GetMedia(oldStudent.Rusa);
          existingStudent.Optional = await GetMedia(oldStudent.Optional);
  
          await existingStudent.save();
          console.log(`Student with IDNP ${oldStudent.IDNP} updated in the new database.`);
  
        }else{
          const romanaMedia = await GetMedia(oldStudent.Romana);
          const mateMedia = await GetMedia(oldStudent.Mate);
          const infoMedia = await GetMedia(oldStudent.Info);
          const istoriaMedia = await GetMedia(oldStudent.Istoria);
          const geografiaMedia = await GetMedia(oldStudent.Geografia);
          const chimiaMedia = await GetMedia(oldStudent.Chimia);
          const fizicaMedia = await GetMedia(oldStudent.Fizica);
          const tehnologicaMedia = await GetMedia(oldStudent.Tehnologica);
          const muzicaMedia = await GetMedia(oldStudent.Muzica);
          const plasticaMedia = await GetMedia(oldStudent.Plastica);
          const MSVMedia = await GetMedia(oldStudent.MSV);
          const edFizMedia = await GetMedia(oldStudent.Ed_Fiz);
          const francezaMedia = await GetMedia(oldStudent.Stiinte);
          const englezaMedia = await GetMedia(oldStudent.Engleza);
          const biologiaMedia = await GetMedia(oldStudent.Biologia);
          const rusaMedia = await GetMedia(oldStudent.Rusa);
          const OptMedia = await GetMedia(oldStudent.Optional);
  
          const newElev = new ElevM2({
            IDNP: oldStudent.IDNP,
            Name: oldStudent.Name,
            Surname: oldStudent.Surname,
            Class: oldStudent.Class,
            Romana: romanaMedia,
            Mate: mateMedia,
            Info: infoMedia,
            Istoria: istoriaMedia,
            Geografia: geografiaMedia,
            Chimia: chimiaMedia,
            Fizica: fizicaMedia,
            Ed_Fiz: edFizMedia,
            Tehnologica: tehnologicaMedia,
            Muzica: muzicaMedia,
            Plastica: plasticaMedia,
            MSV: MSVMedia,
            Stiinte: francezaMedia,
            Engleza: englezaMedia,
            Biologia: biologiaMedia,
            Rusa: rusaMedia,
            Optional: OptMedia
          });
  
          await newElev.save();
          console.log(`Student with IDNP ${oldStudent.IDNP} added to the new database.`);
          }
        }
        return res.json({ message: "Students successfully copied to the new database!" });
      } catch (error) {
        console.error('Error copying students:', error);
        return res.status(500).json({ message: 'Server error' });
      }
    };




}



  

module.exports = new authController()
