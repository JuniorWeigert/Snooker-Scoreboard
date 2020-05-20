const connection = require('./connection');

class TableRepository{

   async createTable(table){
    return await connection('tabela').insert({
      name: table.name,
      description: table.desciption,
      reward: table.reward,
      max_points: table.max_points,
      points_rule: table.points_rule
    })
    .then(()=>{
      return {success: true, message: 'Success to Create a Table'}
    },
    
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }).catch(err=>{
      return {success: false, message: err.sqlMessage}
    }); 
  }

  async deleteTable(tableId){
    return await connection('table').where('id', '=', tableId).del()
    .then(()=>{
      return {success: true, message: 'Success to Remove a Table'}
    },
    
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }).catch(err=>{
      return {success: false, message: err.sqlMessage}
    })
  }

  async getTables(){
    return await connection('tabela').select('*')
      .then((resolve)=>{
        return {success: true, message: 'Success to get Tables', data: resolve}
      },
      (reject)=>{
        return {success: false, message: reject.sqlMessage}
      }).catch(err=>{
        return {success: false, message: err.sqlMessage}
      });
  }

  async getSpecificTable(id){
    return await connection('tabela').select('*').where('id', '=', id)
      .then((resolve)=>{
        return {success: true, message: 'Success to get a specific table', data: resolve}
      },
      (reject)=>{
        return {success: false, message: reject.sqlMessage}
      }).catch(err=>{
        return {success: false, message: err.sqlMessage}
      });
  }

  async getTeamsByTable(tableId){
    return await connection('tabela')
    .join('team_tabela', 'tabela.id', 'team_tabela.tabela_id')
    .join('team', 'team_tabela.team_id', 'team.id').where('tabela.id', '=', tableId)
    .select('team.name','team.id', 'team_tabela.team_points').orderBy('team_points', 'desc')
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

  async getTeamsForTable(tableId){
    let qtdeTeams = await connection('team')
    .join('team_tabela', 'team.id','team_tabela.team_id')
    .join('tabela', 'team_tabela.tabela_id', 'tabela.id')
    .where('tabela.id', '=', tableId).count('team.id', {as: 'quantity'})
    .then((resolve)=>{
      return {success: true, message: 'Success to get a specific table', data: resolve}
    },
    
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });
    console.log(qtdeTeams.data[0].quantity)
    return qtdeTeams.data[0].quantity;
  }

  async insertTeamOnTable(teamId, tableId){    
    return await connection('team_tabela').insert({
      team_id: teamId,
      tabela_id: tableId
    }).then((resolve)=>{
      return {success: true, message: 'Success to insert team on table'};
    },
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });
  }

  async getTeamPoints(teamId, tableId){
    return await connection('team_tabela')
    .join('team', 'team_tabela.team_id','team.id')
    .join('tabela', 'team_tabela.tabela_id', 'tabela.id')
    .where('tabela.id', '=', tableId, ).andWhere('team.id', '=', teamId).select('team_points').first()
    .then((resolve)=>{
      return {success: true, message: 'Success to insert team on table', data: resolve};
    },
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }
    ).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });

  }

  async getTableMaxPoint(tableId){
    return await connection('tabela').select('max_points').where('tabela.id', '=', tableId).first()
    .then((resolve)=>{
      return {success: true, message: 'Success to insert team on table', data: resolve};
    },
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }
    ).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });
  }

  async addPointForTeam(teamId, tableId, teamPoints){
    return connection('team_tabela').update({team_points: teamPoints })
    .where('team_tabela.team_id', '=', teamId).andWhere('team_tabela.tabela_id', '=', tableId)
    .then(()=>{
      return {success: true, message: 'Inserted Point'};
    },
    (reject)=>{
      return {success: false, message: reject.sqlMessage}
    }
    ).catch(err=>{
      return {success: false, message: err.sqlMessage}
    });
  }
};

module.exports = TableRepository;