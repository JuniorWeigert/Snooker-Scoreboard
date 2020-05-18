const TeamRepository = require('../repository/team_repository');

class TeamService {
  constructor(){
    this.teamRepository = new TeamRepository();
  }

  async createTeam(req,res){
    let newTeam = await this.teamRepository.createTeam(req.body);
    
    if(!newTeam.success){
      res.status(400).send(newTeam.message);
    }
    res.status(200).send(newTeam.message);
  }

  async listTeams(req,res){
    let teams = await this.teamRepository.listTeams()
    console.log(teams)
    if(!teams.success){
      res.status(400).send(teams.message);
    }

    res.status(200).send(teams.data);
    
  }

  async listSpecificTeam(req,res){
    let team = await this.teamRepository.listSpecificTeam(req.params.id);
    
    if(!team.success){
      res.status(400).send(team.message);
    }
    res.status(200).send(team.message);
  }
}

module.exports = TeamService;