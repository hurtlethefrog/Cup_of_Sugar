import React from "react";
import Event from "./Event";
import Notice from "./Notice";
import Offer from "./Offer";
import Wanted from "./Want";

export default function Articles(props) {
  const parsedArticles = props.articles.map(article => {
    switch (article.type) {
      case "event":
        return (
          <Event key={article.type + "_" + article.id} article={article} />
        );
      case "notice":
        return (
          <Notice key={article.type + "_" + article.id} article={article} />
        );
      case "request":
        return (
          <Wanted key={article.type + "_" + article.id} article={article} />
        );
      case "offer":
        return (
          <Offer key={article.type + "_" + article.id} article={article} />
        );
      default:
        return <div className="box">No type here boss</div>;
    }
  });
// sorting the components by date created then placing on page
  return (
    <div className="articles">
      {parsedArticles
        .sort((a, b) => {
          const date1 = new Date(a.created_at);
          const date2 = new Date(b.created_at);
          return date1 - date2;
        })
        .reverse()}
    </div>
  );
}
