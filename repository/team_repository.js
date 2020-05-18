const connection = require('./connection');

class TeamRepository{

   async createTeam(team){
     let newTeam = await connection('team').insert({
      name: team.name,
      player_one: team.player_one,
      player_two: team.player_two,
      points: team.points
    })
    .then(()=>{
      return {success: true, message: 'Success to Create a Team'}
    },
    
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });

    return newTeam;
    
  }

  async listTeams(){
    let teams = await connection('team').select('*')
      .then((resolve)=>{
        return {success: true, message: 'Success to Create a Team', data: resolve}
      },
      
      (reject)=>{
        return {success: false, message: reject.sqlMessage}
      }).catch(err=>{
        return {success: false, message: err.sqlMessage}
      });

    return teams;
  }

  async listSpecificTeam(id){
    let team = await connection('team').select('*').where('id', '=', id)
      .then((resolve)=>{
        return {success: true, message: 'Success to Create a Team', data: resolve}
      },
      
      (reject)=>{
        return {success: false, message: reject.sqlMessage}
      }).catch(err=>{
        return {success: false, message: err.sqlMessage}
      });

    return team;
  }
};

module.exports = TeamRepository;