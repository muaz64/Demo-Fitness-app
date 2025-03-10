export function Button({ children, className, ...props }) {
    return <button className={`p-2 bg-blue-500 text-white rounded ${className}`} {...props}>{children}</button>;
  }
  