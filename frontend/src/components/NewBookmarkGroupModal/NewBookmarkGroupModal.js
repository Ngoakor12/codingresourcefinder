import React, { useEffect, useRef } from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function NewBookmarkGroupModal({
  handleClickCancel,
  handleClickSubmit,
  open,
  input,
  handleChangeInput,
}) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [open]);

  return (
    <BaseModal
      heading={"New bookmark group"}
      handleClickCloseModal={handleClickCancel}
    >
      <form className="bookmark-group-modal-form" onSubmit={handleClickSubmit}>
        <div className="bookmark-group-modal-form-fields">
          <div className="bookmark-group-modal-form-field">
            <label htmlFor="bookmark-group">Group name *</label>
            <input
              type="text"
              id="bookmark-group"
              ref={ref}
              required
              onChange={handleChangeInput}
              value={input}
            />
          </div>
        </div>
        <div className="bookmark-group-modal-buttons">
          <button
            type="button"
            className="new-bookmark-group-form-cancel"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
          <button type="submit" className="new-bookmark-group-form-submit">
            Add group
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
