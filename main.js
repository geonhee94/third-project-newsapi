const API_KEY=`9d28b9131a0d4ce6bde7508053fd0bbd`
let newsList=[]

const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`)

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5


const getNews = async() => {
    try{
      url.searchParams.set("page",page) // => &page=page
      url.searchParams.set("pageSize",pageSize)
      const response = await fetch(url);
      const data = await response.json();
      if(response.status==200){
        if(data.articles.length==0){
          throw new Error("검색어와 일치하는 결과가 없습니다.");
        }
        newsList = data.articles;
        totalResults = data.totalResults
        render();
        paginationRender();
      }else{
        throw new Error(data.message)
      }
    }catch(error){
      errorRender(error.message)
    }
  
}

const getLatestNews = async ()=>{
     url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${API_KEY}`
        
    ) ;
    
    getNews()
    
};


const getNewsByCategory = async (event)=>{
  const category = event.target.textContent.toLowerCase()
   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
   getNews()
}

const searchNews= async ()=>{
  const keyword = document.getElementById("search-input").value
   url = new URL (`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
   getNews()
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
                <div>${news.rights || "no source"}  ${moment(news.publishedAt).fromNow()}</div>
            </div>
        </div>`
    )
    .join('');
    document.getElementById("news-board").innerHTML=newsHTML
}

const errorRender = (errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML = errorHTML;
}

const paginationRender=()=>{
  //우리가 정하는 값
  //totalResult
  //page
  //pageSize
  //groupSize
let paginationHTML = ``
  //우리가 계산해야할 값
  const totalPages = Math.ceil(totalResults/pageSize)
  //pageGroup
  const pageGroup = Math.ceil(page/groupSize);
  let last = pageGroup * 5
  if(last>totalPages){

  }
  //lastPage
  const lastPage = pageGroup * groupSize;
  //마지막 페이지 그룹이 그룹사이즈보다 작다? > lastpage = totalpage
  if(lastPage > totalPages){
    lastPage = totalPages
  }
  let first = last - 4 <= 0 ? 1 : last-4 ;
  //firstPage
  const firstPage = lastPage - (groupSize-1)<=0? 1: lastPage - (groupSize-1)
 
if(page>1){
   paginationHTML = `<li class="page-item " onclick="moveToPage(1)"><a class="page-link" href='#js-bottom'>&lt;&lt;</a></li>
  <li class="page-item " onclick="moveToPage(${page-1})"><a class="page-link" href='#js-bottom'>&lt;</a></li>`;
}
  for(let i=firstPage;i<=lastPage;i++ ){
    paginationHTML += `<li class="page-item ${i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link" href='#js-bottom' onclick="pageClick(${i})" >${i}</a></li>`
  }

 if(page<totalPages) {
  paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href='#js-program-detail-bottom'>&gt;</a></li>
  <li class="page-item " onclick="moveToPage(${totalPages})"><a class="page-link" href='#js-bottom'>&gt;&gt;</a></li>`}
  document.querySelector(".pagination").innerHTML = paginationHTML;

}


const moveToPage=(pageNum)=>{
  page = pageNum
  getNews()
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