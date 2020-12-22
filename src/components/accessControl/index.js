import React from "react";

const AccessControl = ({
  userPermissions,
  allowedPermissions,
  children,
  renderNoAccess,
}) => {
  // checkPermissions function verifies that one of the userPermissions is in the set of allowedPermissions
  const permitted = checkPermissions(userPermissions, allowedPermissions);

  if (permitted) {
    return children;
  }
  return renderNoAccess();
};

export default AccessControl;


