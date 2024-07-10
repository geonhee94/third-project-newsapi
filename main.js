const API_KEY=`9d28b9131a0d4ce6bde7508053fd0bbd`
let newsList=[]
const getLatestNews = async ()=>{
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&apiKey=${API_KEY}`
    ) ;
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render()
    console.log("ddd",newsList)
};

  const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };
const render=()=>{
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src="${news.urlToImage || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}"/>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                
                <p>${
              news.description == null || news.description == ""
                ? "내용없음"
                : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            }</p>
                <div>${news.rights || "no source"}  ${moment().startOf('hour').fromNow()}</div>
            </div>
        </div>`
    )
    .join('');
    document.getElementById("news-board").innerHTML=newsHTML
}
const openNav = () => {
    document.getElementById("hamburgerNav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("hamburgerNav").style.width = "0";
  };
getLatestNews();