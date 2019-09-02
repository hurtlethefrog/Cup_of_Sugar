import React, { state, useState } from "react";
import Event from "./Event";
import Notice from "./Notice";
import Offer from "./Offer";
import Want from "./Want";

export default function Article(props) {
  props.articles.map(article => {
    const parsedArticles = article[type].map(articleItem => {
      // console.log("ARTICLE ITEM" + JSON.stringify(articleItem))
      switch (articleItem.type) {
        case "events":
          return (
            <Event
              title={articleItem.title}
              description={articleItem.description}
            />
          );
        case "notices":
          return (
            <Notice
              title={articleItem.title}
              description={articleItem.description}
            />
          );
        default:
          return null;
      }
    });
    return <div>{parsedArticles}</div>;
  });
}
