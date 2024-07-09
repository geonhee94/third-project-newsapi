const API_KEY=`9d28b9131a0d4ce6bde7508053fd0bbd`
let news=[]
const getLatestNews = async ()=>{
    const url = new URL(
        `https://geonhee-newsapi-third-project.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
    ) ;
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("ddd",news)
};
getLatestNews();