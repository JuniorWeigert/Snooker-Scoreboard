const dotenv = require('dotenv');
dotenv.config();
const TableRepository = require('../repository/table_repository');

class TabelaService {
  constructor(){
    this.tableRepository = new TableRepository();
    this.maxTeamOnTable = process.env.TABLE_MAX_PLAYER;
  }

  async createTable(req,res){
    let newTable = await this.tableRepository.createTeam(req.body);
    
    if(!newTable.success){
      res.status(400).send(newTable.message);
    }
    res.status(200).send(newTable.message);
  }

  async listTables(req,res){
    let tables = await this.tableRepository.getTables()
    if(!tables.success){
      res.status(400).send(tables.message);
    }

    res.status(200).send(tables.data);
    
  }

  async listSpecificTable(req,res){
    let table = await this.tableRepository.getSpecificTable(req.params.id);
    let tableTeams = await this.tableRepository.getTeamsByTable(req.params.id);

   let data = {
      table,
      tableTeams
    }
    
    if(!table.success){
      res.status(400).send(table.message);
    }
    res.status(200).send(data);
  }

  async listTeamsByTable(req,res){
    let teams = await this.tableRepository.getTeamsByTable(req.body.tableId);

    if(!teams.success){
      res.status(400).send(teams.message);
    }

    res.status(200).json(teams)
  }


  async insertTeam(req,res){
    let {teamId, tableId} = req.body;

    if(!teamId || !tableId){
      res.status(400).send('Invalid Parameters');
    }
    let teamsQuantity = await this.tableRepository.getTeamsForTable(tableId);

    if(teamsQuantity >= this.maxTeamOnTable){
      res.status(400).send('Table with max teams');
    }
    console.log(teamsQuantity)
    let insertedTeam = await this.tableRepository.insertTeamOnTable(teamId,tableId);

    if(!insertedTeam.success){
      res.status(400).send(insertedTeam.message);
    }

    res.status(200).send(insertedTeam.message);

    
  }

  async addTeamPoints(req, res){
    let {teamId, tableId} = req.body;

    if(!teamId || !tableId){
      res.status(400).send('Invalid Parameters');
    }

    let teamsPoints = await this.tableRepository.getTeamsForTable(teamId, tableId);
    let maxPoints = await this.tableRepository.getTableMaxPoint(tableId);

    if(teamsPoints >= maxPoints){
      res.status(400).send('Team with Max points');
    }
    
    let insertedTeam = await this.tableRepository.insertTeamOnTable(teamId, tableId, teamPoints);

    if(!insertedTeam.success){
      res.status(400).send(insertedTeam.message);
    }
    
    res.status(200).send(insertedTeam.message);
  }
}

module.exports = TabelaService;