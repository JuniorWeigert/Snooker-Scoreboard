const TableService = require('../service/table_service')

class TableController{  
  constructor(){
    this.tableService = new TableService();
  }

  createTable(req,res){
    if(!req.body){
      res.status(400).send('This Request Needs a Body');
    }
    
    this.tableService.createTable(req,res);
  }

  listTables(req,res){
    this.tableService.listTables(req,res);
  }

  listSpecificTable(req,res){
    if(!req.params.id || Number.isInteger(req.params.id) ){
      res.status(400).send('Invalid ID')
    }
    this.tableService.listSpecificTable(req,res);
  }

  insertTeam(req,res){
    if(!req.body){
      res.status(400).send('This Request Needs a Body');
    }

    this.tableService.insertTeam(req,res);
  }

}


module.exports = TableController;