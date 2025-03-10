export function Card({ children, className }) {
    return <div className={`p-4 bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }) {
    return <div className={className}>{children}</div>;
  }