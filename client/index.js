const getData = async () => {
  const res = await fetch('http://localhost:3000/db');
  const json = await res.json();
  console.log(json);
};

getData();
