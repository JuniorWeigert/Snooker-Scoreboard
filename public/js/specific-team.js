let url = window.location.toString();
let path = url.replace('http://localhost:3000/team', '');
let root = document.querySelector('#root');
let response;

console.log(path.replace('http://localhost:3000/team/', ''));

window.onload = ()=>{
  response = axios({
    method: 'GET',
    url: '/get-team' + path
  }).then(res=>{
    console.log(res);
    root.insertAdjacentHTML('beforebegin', moutnHtml(res));
  }) 
}

const moutnHtml = (res)=>{
  return `
    <div class="container">
      <div class="row">
        <h1>${res.data.team.data[0].name}</h1>
        <hr/>
      </div>
      <div className="row">
        <br />
        Jogador Um: ${res.data.team.data[0].player_one}
        <br />
        Jogador Dois: ${res.data.team.data[0].player_two}
        <br />
        <br />
      </div>
      <div class="row">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th>Campeonatos Cadastrados</th>
            </tr>
          </thead>
          <tbody>
            ${
              res.data.teamTables.data.map((table)=>{
                return `
                  <tr onclick="goToAddPoints(${table.id},${table.id})">
                    <td>${table.name}</td>
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

function goToAddPoints(teamId,tableId){
  console.log('clicou')
  window.location = '/table/' + tableId;
}

