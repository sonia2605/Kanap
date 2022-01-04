//----------- main function -------------// 
(async () => {
  const canapes = await getArticles();
})();

//---- subfunction : first, get the articles-----//
function getArticles() {
  return fetch("http://localhost:3000/api/products")
    .then(function (response) {
      console.log("response :" + response);
      console.log(response);
      return response.json();
    })
    .then(function (responseJson) {
      console.log("article :" +responseJson);
      console.log(responseJson);
      return responseJson;
    })
    .catch(function (error) {
      alert(error);
    });
}

