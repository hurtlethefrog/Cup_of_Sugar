export default function validateNewArticle(article) {
  let response = "";

  if (article.title === null) {
    response += `Please enter a title for your ${article.type}. `;
  }
  if (article.description === null) {
    response += `Please enter a description for your ${article.type}.`
  }
  if (response) return response
  return true
};
