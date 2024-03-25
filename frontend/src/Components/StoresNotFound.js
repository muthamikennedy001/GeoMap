import React from "react";

function StoresNotFound() {
  return (
    <div class="text-center">
      <h1 class="mb-4 text-6xl font-semibold text-red-500">No Maps Yet</h1>
      <p class="mt-4 mb-4 text-lg text-gray-600">
        Seems the Extension Officer is still yet to collect your data.
      </p>
      <div class="animate-bounce">
        <svg
          class="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p class="mt-4 text-gray-600">
        Be Patient the officer Will Visit You{" "}
        {/* <a href="/" class="text-blue-500">
          home
        </a> */}
        .
      </p>
    </div>
  );
}

export default StoresNotFound;
