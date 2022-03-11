export async function getCategories() {
  // Implemente aqui
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe;
  // query eh igual ao produto de pesquisa da API
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}
