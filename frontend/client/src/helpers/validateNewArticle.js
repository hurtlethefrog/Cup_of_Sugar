export function validateNewArticle(article) {
  let response = "";

  if (article.title === null) {
    response += `Please enter a title. `;
  }
  if (article.description === null) {
    response += `Please enter a description.`;
  }
  if (response) return response;
  return true;
}

export function validateNewEvent(article) {
  let response = "";

  if (article.title === null) {
    response += `Please enter a title.`;
  }
  if (article.description === null) {
    response += `Please enter a description.`;
  }
  if (article.start === null) {
    response += `Please set your event times`;
  } else if (article.end === null) {
    response += `Please set your event times`;
  }
  if (response) return response;
  return true;
}
