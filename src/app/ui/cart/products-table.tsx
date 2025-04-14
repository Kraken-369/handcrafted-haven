// this component will have a table with all the products in the cart
// it will get the products from the local storage and display them in a table

function ProductsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Map through the products in the cart and display them here */}
          {/* Example row, replace with dynamic data */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Product 1
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              2
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              $10.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              $20.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button className="text-red-600 hover:text-red-900">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default ProductsTable;
