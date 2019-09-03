import React, { state, useState } from "react";
import Event from "./Event";
import Notice from "./Notice";
import Offer from "./Offer";
import Want from "./Want";

export default function Article(props) {

  const parsedArticles = props.articles.map(article => {
    switch (article.type) {
      case "event":
        return(
          <Event title={article.title} description={article.description} />
        );
      case "notice":
        return(
          <Notice article={article} />
        );
      case "wanted":
        return(<Want />);
      case "offer":
        return(<Offer />);
        default:
          return(<div className="box">Why you no type ?</div>)
    }
  });
  return <div className="articles">{parsedArticles}</div>;
}
