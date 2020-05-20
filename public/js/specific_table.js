let url = window.location.toString();
let path = url.replace('http://localhost:3000/table', '');
let root = document.querySelector('#root');
let response;

console.log(path);

window.onload = ()=>{
  localStorage.clear();
  response = axios({
    method: 'GET',
    url: '/get-table' + path
  }).then(res=>{
    console.log(res);
    root.insertAdjacentHTML('beforebegin', moutnHtml(res));
  })  
}

const moutnHtml = (res)=>{
  let teams = res.data.tableTeams.data;
  let table = res.data.table.data[0];
  localStorage.setItem('table', JSON.stringify(table));
  return `
    <div class="container">
      <div class="row">
        <h1>${table.name}</h1>
        <hr/>
      </div>
      <div className="row">
        <div class="col-md-6">
          <br />
          Descrição: ${table.description}
          <br />
          Premiação: ${table.reward}
          <br />
          Maximo de pontos: ${table.max_points}
          <br />
          Premiação: ${table.points_rule}
          <br />
        </div>
        <div class="col-md-6">
          <a href="/link-team/${table.id}" class="btn btn-outline-success">
            Adicionar Times
          </a>
        </div>
      </div>
      <div class="row">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            ${
              teams.map((team, index)=>{
                if(team.team_points >= table.max_points){
                  return `
                    <tr class="bg-success" onclick="goToAddPoints(${team.id}, ${team.team_points})">
                      <td>${index + 1}</td>
                      <td>${team.name}</td>
                      <td>${team.team_points}</td>
                    </tr>
                  `
                }
                return `
                  <tr onclick="goToAddPoints(${team.id}, ${team.team_points})">
                    <td>${index + 1}</td>
                    <td>${team.name}</td>
                    <td>${team.team_points}</td>
                  </tr>
                `
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  `
}

function goToAddPoints(teamId,teamPoints){
  localStorage.setItem('teamPoints', teamPoints);
  window.location = '/add-points/' + teamId;
}

