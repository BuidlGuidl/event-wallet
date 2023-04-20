type TModalInputs = {
  id?: string;
  button?: React.ReactNode;
  title?: string;
  content?: React.ReactNode;
};

/**
 * GENERIC modal which lets you send ETH to any address.
 */
export const Modal = ({ id, button, title, content }: TModalInputs) => {
  return (
    <div>
      {button}
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* dummy input to capture event onclick on modal box */}
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <label htmlFor={id} className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
            ✕
          </label>
          {content}
        </label>
      </label>
    </div>
  );
};
