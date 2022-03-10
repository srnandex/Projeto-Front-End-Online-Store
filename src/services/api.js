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

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}
