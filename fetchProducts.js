export async function fetchProducts() {
  try {
    // const response = await fetch("https://fakestoreapi.com/products");
    const response = await fetch(
      "https://fakestoreapiserver.reactbd.com/nextamazon"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}
