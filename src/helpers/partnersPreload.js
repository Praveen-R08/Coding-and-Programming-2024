const { readJSON, writeJSON } = require('../helpers//helpers.js');
const path = require('path');

const DATABASE_FILEPATH = path.join(__dirname, '../assets/partners.json')

function updatePartners() {
   const partners = readJSON(DATABASE_FILEPATH);
   const partnerList = document.getElementById('partner__list');
   output = '';
   for (let partner of partners) {
      output += `
         <tr>
            <td contenteditable="true">${partner.name}</td>
            <td contenteditable="true">${partner.type}</td>
            <td contenteditable="true">${partner.resources}</td>
            <td contenteditable="true">${partner.email}</td>
            <td contenteditable="true">${partner.mobile}</td>
            <td class="spread fit">
               <input type="button" class="btn" value="delete" onclick="deleteRow(this)">
            </td>
         </tr>
      `
   }
   partnerList.innerHTML = `
      <tr>
         <th>Name</th>
         <th>Type</th>
         <th>Resources</th>
         <th>Email</th>
         <th>Mobile</th>
         <th class="fit">Actions</th>
      </tr>
   `
   partnerList.innerHTML += output;

   partnerList.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
      cell.addEventListener('input', () => {
         const rowIndex = cell.parentElement.rowIndex - 1;
         const colIndex = cell.cellIndex;
         partners[rowIndex][Object.keys(partners[rowIndex])[colIndex]] = cell.textContent;
         writeJSON(DATABASE_FILEPATH, partners);
      });
   });




   document.querySelector('.count').innerHTML = partners.length;
}

updatePartners();

function addPartner() {

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (
      document.getElementById('name').value === '' ||
      // document.getElementById('type').value === '' ||
      document.getElementById('resources').value === '' ||
      document.getElementById('email').value === '' ||
      !emailRegex.test(document.getElementById('email').value) ||
      document.getElementById('mobile').value === '' ||
      document.getElementById('mobile').value.length > 10 ||
      document.getElementById('mobile').value.length < 10
   ) {
      console.log('Fill out all fields');
   } else {
      const partner = {
         name: document.getElementById('name').value,
         type: document.getElementById('type').value,
         resources: document.getElementById('resources').value,
         email: document.getElementById('email').value,
         mobile: document.getElementById('mobile').value
      }
      let partners = readJSON(DATABASE_FILEPATH);
      partners.push(partner);
      writeJSON(DATABASE_FILEPATH, partners);
      updatePartners();
   }
}

function searchName() {
   let search = document.getElementById("search__n");
   let key = search.value.toUpperCase();
   let table = document.getElementById("partner__list");
   let rows = table.getElementsByTagName("tr");

   for (let i = 0; i < rows.length; i++) {
      let index = rows[i].getElementsByTagName("td")[0];
      if (index) {
         let text = index.textContent || index.innerText;
         if (text.toUpperCase().indexOf(key) > -1) rows[i].style.display = "";
         else rows[i].style.display = "none";
      }
   }
}

function searchType() {
   let search = document.getElementById("search__t");
   let key = search.value.toUpperCase().trim().replace(/\s/g, '');
   let table = document.getElementById("partner__list");
   let rows = table.getElementsByTagName("tr");

   for (let i = 0; i < rows.length; i++) {
      let index = rows[i].getElementsByTagName("td")[1];
      if (index) {
         let text = index.textContent || index.innerText;
         if (text.toUpperCase().indexOf(key) > -1) rows[i].style.display = "";
         else rows[i].style.display = "none";
      }
   }
}

function deleteRow(target) {
   let parent = target.parentNode.parentNode;
   let str = parent.innerHTML.split('\n')[1].trim();
   let trim = str.substring(27, str.length - 5);
   let data = readJSON(DATABASE_FILEPATH);
   removed = data.filter(item => item['name'] !== trim);
   writeJSON(DATABASE_FILEPATH, removed)
   updatePartners();
}