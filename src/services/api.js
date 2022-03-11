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

export async function getProductsFromCategoryAndQuery(categories, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe;
  // query eh igual ao produto de pesquisa da API
  try {
    const url = ` https://api.mercadolibre.com/sites/MLB/search?category=${categories}_ID&q=${query}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getProductsCategories(categories) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categories}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getProducts(id) {
  try {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}
