const TeamRepository = require('../repository/team_repository');

class TeamService {
  constructor(){
    this.teamRepository = new TeamRepository();
  }

  async createTeam(req,res){
    let newTeam = await this.teamRepository.createTeam(req.body);
    
    if(!newTeam.success){
      res.status(400).json(newTeam.message);
      return;
    }

    res.status(200).json(newTeam.message);
    
    
  }

  async listTeams(req,res){
    let teams = await this.teamRepository.getTeams()

    if(!teams.success){
    res.status(400).send(teams.message);
    return;
    }

    res.status(200).send(teams.data);
    
  }

  async listSpecificTeam(req,res){
    let team = await this.teamRepository.getSpecificTeam(req.params.id);
    let teamTables = await this.teamRepository.getTablesByTeam(req.params.id);
    if(!team.success){
      res.status(400).send(team.message);
      return;
    }

    let data = {
      team,
      teamTables
    }
    res.status(200).json(data);
  }
}

module.exports = TeamService;