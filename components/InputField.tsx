// "use client";

// export default function InputField({ value, onChange, error }) {
//   return (
//     <div>
//       <input
//         value={value}
//         onChange={onChange}
//         type="text"
//         placeholder="Nombre"
//         className={`input ${
//           error
//             ? "placeholder:text-primary-red border-primary-red bg-secondary-red"
//             : "border-[#d6d6d6] bg-[hsla(0,0%,100%,.8)]"
//         }`}
//       />
//       {error && (
//         <div className="flex items-center mt-2 text-xs text-primary-red">
//           <i className="fi fi-rr-exclamation flex items-center mx-1"></i>
//           <span>{error}</span>
//         </div>
//       )}
//     </div>
//   );
// }
