const connection = require('./connection');

class TeamRepository{

   async createTeam(team){
     let newTeam = await connection('team').insert({
      name: team.name,
      player_one: team.player_one,
      player_two: team.player_two
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

  async getTeams(){
    return await connection('team').select('*')
      .then((resolve)=>{
        return {success: true, message: 'Success to Create a Team', data: resolve}
      },
      
      (reject)=>{
        return {success: false, message: reject.sqlMessage}
      }).catch(err=>{
        return {success: false, message: err.sqlMessage}
      });

  }

  async getSpecificTeam(id){
    return await connection('team').select('*').where('id', '=', id)
      .then((resolve)=>{
        return {success: true, message: 'Success to Create a Team', data: resolve}
      },
      
      (reject)=>{
        return {success: false, message: reject.sqlMessage}
      }).catch(err=>{
        return {success: false, message: err.sqlMessage}
      });
  }

  async getTablesByTeam(teamId){
    return await connection('team')
    .join('team_tabela', 'team_tabela.team_id', 'team.id')
    .join('tabela', 'tabela.id', 'team_tabela.tabela_id').where('team.id', '=', teamId)
    .select('team.name', 'tabela.name', 'tabela.id')
    .then((resolve)=>{
      console.log(resolve);
      return {success: true, message: 'Success to get a specific table', data: resolve}
    },
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });
  }
};

module.exports = TeamRepository;