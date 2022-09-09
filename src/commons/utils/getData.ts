interface IGetData {
  url:string
}

const getData = async({url}:IGetData) => {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response;
}

export default getData;