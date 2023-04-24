import fs from 'fs';
import sqlite3 from 'sqlite3';

const db = new sqlite3('articles.db');

const Home = () => {
  const articles = db.query('SELECT * FROM articles');

  // Write the articles to a file
  const articlesFile = fs.createWriteStream('articles.json');
  articlesFile.write(JSON.stringify(articles, null, 2));
  articlesFile.close();

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>- {article.title}</h2>
            <p>{article.content}</p>
            <img src={article.photo} alt={article.title} />
            <p>{article.date}</p>
            <a href={article.link}>{article.site}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;