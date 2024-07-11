const API_KEY=`9d28b9131a0d4ce6bde7508053fd0bbd`
let newsList=[]
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))


const getLatestNews = async ()=>{
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
    ) ;
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render()
    
};

const getNewsByCategory = async (event)=>{
  const category = event.target.textContent.toLowerCase()
  console.log("category",category)
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json()
  
  newsList = data.articles
  render()
}

const searchNews= async ()=>{
  const keyword = document.getElementById("search-input").value
  console.log("keyword",keyword);
  const url = new URL (`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json()
  
  newsList = data.articles
  render()
}

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
                <div>${news.rights || "no source"}  ${moment(news.published_date).fromNow()}</div>
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

//1. 버튼들에 클릭 이벤트를 줘야한다. 
//2. 카테고리별 뉴스 가져오기 
//3. 그 뉴스를 보여주기 