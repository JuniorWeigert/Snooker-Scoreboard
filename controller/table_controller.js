const TableService = require('../service/table_service')

class TableController{  
  constructor(){
    this.tableService = new TableService();
  }

  createTable(req,res){
    console.log(!req.body)
    if(!req.body){
      res.status(400).send('This Request Needs a Body');
    }    
    this.tableService.createTable(req,res);
  }

  listTables(req,res){
    this.tableService.listTables(req,res);
  }

  listSpecificTable(req,res){
    console.log(req.params.id)
    if(!req.params.id || !(Number.isInteger(parseInt(req.params.id)))){
      return res.status(400).json('Invalid ID');
    }
    return this.tableService.listSpecificTable(req,res);
  }

  insertTeam(req,res){
    if(!req.body){
      console.log('caiu aqui')
      res.status(400).send('This Request Needs a Body');
    }

    this.tableService.insertTeam(req,res);
  }

  addPointsToTable(req,res){
    if(!req.body){
      res.status(400).send('This Request Needs a Body');
    }

    this.tableService.addTeamPoints(req,res);
  }

}


module.exports = TableController;