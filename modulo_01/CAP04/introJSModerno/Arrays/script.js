window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

function doMap() {
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    }
  })
  console.log(nameEmailArray);
  return nameEmailArray;
}

function doFilter() {
  const olderthan50 = people.results.filter(person => {
    return person.dob.age > 50;
  });
  console.log(olderthan50);
}

function doForEach() {
  const mappedPeople = doMap();
  mappedPeople.forEach(person => {
    person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
  });
  console.log(mappedPeople);
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  console.log(totalAges);
}

function doFind() {
  const found = people.results.find(person => {
    return person.location.state === 'Minas Gerais';
  })
  console.log(found);
}

function doSome() {
  const found = people.results.some(person => {
    return person.location.state === 'Amazonas';
  })
  console.log(found);
}

function doEvery() {
  const every = people.results.every(person => {
    return person.nat === 'BR';
  })
  console.log(every);
}

function doSort() {
  const mappedNames = people.results
    .map(person => {
      return person.name.first;
    }).filter(name => name.startsWith('A'))
    .sort();
  console.log(mappedNames);
}
