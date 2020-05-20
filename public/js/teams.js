let root = document.querySelector('#root');
let teamName = document.querySelector('#name');
let playerOne = document.querySelector('#player-one')
let playerTwo = document.querySelector('#player-two')
let btnRegister = document.querySelector('#btn-register');
let response;

window.onload = ()=>{
  console.log('fazendo request')
  response = axios({
    method: 'GET',
    url: '/get-teams'
  }).then(res=>{
    console.log(res)
    
    root.insertAdjacentHTML('beforebegin', moutnHtml(res)); ;
  })

  
}

const moutnHtml = (res)=>{
  console.log(res);
  return `
  <ul class="list-group">
    ${res.data.map(team=>{
      return `
        <a href="/team/${team.id}" class="list-group-item list-group-item-action">
        ${team.name}
        </a>
      `
    })}
  </ul>
  `
}

btnRegister.addEventListener('click', (event)=>{
  axios({
    method: 'POST',
    url: '/teams',
    data: {
      name: teamName.value,
      player_one: playerOne.value,
      player_two: playerTwo.value
    }
  }).then(response =>{
    if(response.status != 200){
      alert('Houve um erro ao cadastrar Tabela, Tente novamente mais tarde');
    } 

    if(response.status >= 400){
      alert('Houve um erro ao cadastrar Tabela, Tente novamente mais tarde');
    }

    alert(response.data)
    location.reload();
  },
  (reject)=>{
    alert(reject.data)
  }
  ).catch(error=>{
    alert('erro ao cadastrar, tente novamente mais tarde');
    location.reload();
  })
})