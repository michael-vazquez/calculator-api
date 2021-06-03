//import sql from 'msnodesqlv8'
import { Sequelize } from "sequelize";

// const connectionString =
//   "server=localhost;Database=calculator;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const sequelize = new Sequelize("calculator", "ppx_user", "W0v3nw@r3", {
  dialect: "mssql",
  host: "localhost",
  dialectOptions: {
    encrypt: true,
    options: {
      useUTC: false,
      dateFirst: 1,
    },
  },
});

class ResultsController {

  async getResults(req, res) {
    const [rows, , metadata] = await sequelize.query(
      `SELECT id, result FROM dbo.results`
    );

      let results = rows.map(object => {return object.result });
      console.log(results);
      res.status(200);
      res.send(results);
  }

  async deleteResults(req, res) {
    
    //verify first if rows are more than 5
    const [rows, metadata] = await sequelize.query(
      `DELETE FROM dbo.results`
    );

      res.status(200)
      res.send("deleted");
  }

  async addResult(req, res) {
    try {
      if (req.body.result) {
        
        //verify first if rows are more than 5
        const [totalRows, totalMetadata] = await sequelize.query(
          `SELECT count(*) as total FROM dbo.results`
        );

        if(totalRows[0].total >= 5) {
          res.status(400)
          res.send("Amount of results saved exceeds 5")
          return;
        }

        //await sequelize.authenticate();
        const [results, metadata] = await sequelize.query(
          `INSERT INTO [dbo].[results] (result) VALUES ('${req.body.result}')`
        );

        if (metadata === 1) {
          //metadata contains rows affected
          res.status(201); //created
          res.send("result created");
        } else {
          res.status(500);
          res.send("error creating result");
        }
      } else {
        res.status(400); //bad request
        res.send("result is required");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new ResultsController();
export default controller;
