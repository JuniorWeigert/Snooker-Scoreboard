let url = window.location.toString();
let path = url.replace('http://localhost:3000/link-team/', '')
let root = document.querySelector('#root');

window.onload = ()=>{
  axios({
    method: 'GET',
    url: '/get-teams'

  }).then(resolve =>{
    console.log(resolve);
    root.insertAdjacentHTML('beforebegin', mountHtml(resolve));
  })
}


const mountHtml = (res)=>{
  return `
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Nome</th>
          <th>ID</th>
        </tr>
      </thead>
      ${res.data.map(team=>{
        return `
        <tr onclick="LinkToTable(${team.id})">
          <td>${team.name}</td>
          <td>${team.id}</td>
        </tr>
        `
      })}
    </ul>
  `
}

function LinkToTable(teamId){
  console.log(teamId,parseInt(path))
  axios({
    method: 'POST',
    url: '/link-team',
    data: {
      teamId,
      tableId: parseInt(path)
    }
  })
}