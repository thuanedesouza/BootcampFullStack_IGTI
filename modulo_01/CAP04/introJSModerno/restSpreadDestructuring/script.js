window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(person => (person.name.title === 'Mr'));
  const marriedWomen = people.results.filter(person => (person.name.title === 'Ms'));
  console.log(marriedMen);
  console.log(marriedWomen);

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'Oi' }];
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2));

  function infiniteSum(...numbers) {
    console.log(numbers);
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }
}

function doDestructuring() {
  const first = people.results[0];
  // antes do JS moderno
  // const username = first.login.username;
  // const password = first.login.password;

  //depois do JS modernoa 
  const { username, password } = first.login;

  console.log(username, password);
}