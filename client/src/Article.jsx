function Article({title,summary,image}){
    return(
        <div className="article">
            <h2 className="articletitle">{title}</h2>
            <img className="articleimg" src = {image} alt="article pic"/>
            <p className="articletext">{summary}</p>
        </div>
    );
}
export default Article