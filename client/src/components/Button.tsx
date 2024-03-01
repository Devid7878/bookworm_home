import React from 'react';

function Button({ text }: { text: String }) {
  return (
    <div className="flex flex-wrap gap-4 mt-10">
      <button
        type="button"
        className="min-w-[200px] px-4 py-3 bg-[#333] hover:shadow-lg border border-black text-black text-sm font-bold rounded"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
