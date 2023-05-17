import React, { useState } from 'react';



export default function Example() {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const submit = e => {
    e.preventDefault()
    fetch(`http://127.0.0.1:8000/api/${search}`, {
      method: 'GET',
    })
    .then(async response => {
      if (response.ok) {
      const data = await response.json();
      console.log(data);
      setProducts(data.data);
    }})
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.tickettruth.co.uk/wp-content/uploads/2013/07/ATT-Logo-CMYK.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Search product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
                SearchBar
              </label>
              <div className="mt-2">
                <input
                  id="search"
                  name="search"
                  type="input"
                  onChange={e => setSearch(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <ul role="list" className="divide-y divide-gray-100 sm:mx-auto">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <img className="h-30 w-60 flex-none bg-gray-50" src={product.img_sml}/>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{product.dest}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.title}</p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-lg leading-6 text-gray-900">£{product.price_from_adult}</p>
              </div>
            </li>
          ))}
          <p className="text-lg leading-6 text-gray-900">{ products == 0 ? "No results found" : "" }</p>
        </ul>
      </div>
    </>
  )
}