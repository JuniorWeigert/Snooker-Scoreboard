const TeamService = require('../service/team_service');


class TeamController{
  constructor(){
    this.teamService = new TeamService();
  }

  createTeam(req,res){
    if(!req.body){
      res.status(400).send('This Request Needs a Body');
    }
    
    this.teamService.createTeam(req,res);
  }

  listTeams(req,res){
    this.teamService.listTeams(req,res);
  }

  listSpecificTeam(req,res){
    this.teamService.listSpecificTeam(req,res);
  }

}

module.exports = TeamController;