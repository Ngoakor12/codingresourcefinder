import React, { useEffect, useRef } from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function EditBookmarkGroupModal({
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
      heading={"Edit bookmark group"}
      handleClickCloseModal={handleClickCancel}
    >
      <form className="bookmark-group-modal-form" onSubmit={handleClickSubmit}>
        <div className="bookmark-group-modal-form-fields">
          <div className="bookmark-group-modal-form-field">
            <label htmlFor="bookmark-group">Group name *</label>
            <input
              type="text"
              id="bookmark-group"
              value={input}
              onChange={handleChangeInput}
              ref={ref}
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
            Save group
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
