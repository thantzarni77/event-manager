type Props = {
  message: string | undefined;
};

const FormError = ({ message }: Props) => {
  return (
    <div className="my-2 flex items-center gap-3 text-sm text-red-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 22 22"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default FormError;
