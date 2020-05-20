let root = document.querySelector('#root');
let tableName = document.querySelector('#name');
let reward = document.querySelector('#reward')
let maxPoints = document.querySelector('#max-points')
let rule = document.querySelector('#rule')
let btnRegister = document.querySelector('#btn-register');
let response;

window.onload = ()=>{
  console.log('fazendo request')
  response = axios({
    method: 'GET',
    url: '/get-tables'
  }).then(res=>{
    if(!res){
      return;
    }
    root.insertAdjacentHTML('beforebegin', moutnHtml(res)); ;
  })

  
}

const moutnHtml = (res)=>{
  return `
  <ul class="list-group">
    ${res.data.data.map(camp=>{
      return `
        <a href="/table/${camp.id}" class="list-group-item list-group-item-action">
        ${camp.name}
        </a>
      `
    })}
  </ul>
  `
}

btnRegister.addEventListener('click', (event)=>{
  event.preventDefault();
  axios({
    method: 'POST',
    url: '/table?',
    data: {
      name: tableName.value,
      reward: reward.value,
      desciption: 'mama o bonde',
      max_points: maxPoints.value,
      points_rule: rule.value
    }
  }).then(response =>{
    console.log(response.status);
    if(response.status != 200){
      alert('Houve um erro ao cadastrar Tabela, Tente novamente mais tarde');
    } 

    alert(response.data)
    location.reload();
  }).catch(error=>{
    console.log(error.message)
  })
})