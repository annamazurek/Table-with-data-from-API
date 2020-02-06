"use strict"

const table = document.querySelector('.table--js');
const pagination = document.querySelector('.pagination--js');

let options = {
  sort_column: 'id',
  sort_order: 'asc',
  filter: '',
  page_size: 5,
  page: 1,
};

function handleChange(id, value){
  options[id]= value;
  console.log(options);
  fetchData();
}

function handleClick(i) {
  options.page = i;
  console.log(1234);
  
}

function fetchData(){
  const {sort_column, sort_order, filter, page_size, page} = options;
  fetch(`http://rt.ex7.pl/get-data?sort_column=${sort_column}&sort_order=${sort_order}&filter=${filter}&page_size=${page_size}&page=${page}`, {method: 'POST'})  
  .then(res => res.json())
  .then(data => {

    const tableRows = Array.from(data.map(row => {
      return (
        `<tr>
          <td>${row.id}</td>
          <td>${row.acronym}</td>
          <td>${row.name}</td>
        </tr>`
      )
    })).join('');

    table.innerHTML = `
          <tr class="table__header">
            <th class="table__id scope="col">Id</th>
            <th class="table__acronym scope="col">Acronym</th>
            <th class="table__name scope="col">Name</th>
          </tr>
          ${ tableRows }
    `;


//     var paramsString = `q=URLUtils.searchParams&page_size=${page_size}&page=${page}`;
// var searchParams = new URLSearchParams(paramsString);

// //Iterate the search parameters.
// for (let p of searchParams) {
//   console.log(p);
// }

    fetch("http://rt.ex7.pl/get-data?page_size=1000", {method: 'POST'})
      .then(res => res.json())
      .then(data => {
        const pagesAmount = Math.ceil(data.length/options.page_size);
        console.log(options.page)

        for(let i = 1; i <= pagesAmount; i++){
          pagination.innerHTML = pagination.innerHTML + `
            <button  class="pagination__button" onclick="${() => handleClick(i)}">${i}</button>
          `;
        }
      })

  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

fetchData();